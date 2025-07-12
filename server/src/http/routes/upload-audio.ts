import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';
import { generateEmbedding, transcribeAudio } from '../../services/gemini.ts';

export const uploadAudioRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/audio',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { roomId } = request.params;

      const audio = await request.file();

      if (!audio) {
        throw new Error('No audio file uploaded');
      }

      const audioBuffer = await audio.toBuffer();
      const audioAsBase64 = audioBuffer.toString('base64');

      const transcription = await transcribeAudio(
        audioAsBase64,
        audio.mimetype
      );

      const embedding = await generateEmbedding(transcription);

      const result = await db
        .insert(schema.audioChunks)
        .values({
          roomId,
          transcription,
          embedding,
        })
        .returning();

      const audioChunk = result[0];

      if (!audioChunk) {
        throw new Error('Failed to insert audio chunk');
      }

      return reply.status(201).send({ chunkId: audioChunk.id });
    }
  );
};
