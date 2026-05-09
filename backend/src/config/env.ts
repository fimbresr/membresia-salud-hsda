import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  API_PREFIX: z.string().default('/api/v1'),
  FRONTEND_ORIGIN: z.string().url().default('http://127.0.0.1:4173'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL es obligatoria'),
  GOOGLE_SHEETS_SCRIPT_URL: z.string().url().optional().or(z.literal('')),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  API_PREFIX: process.env.API_PREFIX,
  FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN,
  DATABASE_URL: process.env.DATABASE_URL,
  GOOGLE_SHEETS_SCRIPT_URL: process.env.GOOGLE_SHEETS_SCRIPT_URL,
});
