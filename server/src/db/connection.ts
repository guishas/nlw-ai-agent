import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { env } from '../env.ts';
import { schema } from './schema/index.ts';

export const connection = postgres(env.DATABASE_URL);
export const db = drizzle(connection, { schema, casing: 'snake_case' });
