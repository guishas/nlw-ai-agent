import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';

export const createRoomRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms',
    {
      schema: {
        body: z.object({
          name: z.string(),
          description: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { name, description } = request.body;

      const insertedRoom = await db
        .insert(schema.rooms)
        .values({ name, description })
        .returning();

      const room = insertedRoom[0];

      if (!room) {
        throw new Error('Failed to create room');
      }

      return reply.status(201).send({ roomId: room.id });
    }
  );
};
