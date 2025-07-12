import { and, eq, sql } from 'drizzle-orm';
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';
import { generateAnswer, generateEmbedding } from '../../services/gemini.ts';

export const createQuestionRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/questions',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
        body: z.object({
          question: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { roomId } = request.params;
      const { question } = request.body;

      const embedding = await generateEmbedding(question);

      const embeddingAsString = `[${embedding.join(',')}]`;

      const chunks = await db
        .select({
          id: schema.audioChunks.id,
          transcription: schema.audioChunks.transcription,
          similarity: sql<number>`1 - (${schema.audioChunks.embedding} <-> ${embeddingAsString}::vector)`,
        })
        .from(schema.audioChunks)
        .where(
          and(
            eq(schema.audioChunks.roomId, roomId),
            sql`1 - (${schema.audioChunks.embedding} <-> ${embeddingAsString}::vector) > 0.4`
          )
        )
        .orderBy(
          sql`1 - (${schema.audioChunks.embedding} <-> ${embeddingAsString}::vector)`
        )
        .limit(5);

      let answer: string | null = null;

      if (chunks.length > 0) {
        answer = await generateAnswer(
          question,
          chunks.map((chunk) => chunk.transcription)
        );
      }

      const insertedQuestion = await db
        .insert(schema.questions)
        .values({ roomId, question, answer })
        .returning();

      const returnedQuestion = insertedQuestion[0];

      if (!returnedQuestion) {
        throw new Error('Failed to create question');
      }

      return reply
        .status(201)
        .send({ questionId: returnedQuestion.id, answer });
    }
  );
};
