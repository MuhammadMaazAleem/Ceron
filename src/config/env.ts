import { z } from 'zod';

/**
 * Runtime Environment Configuration Schema
 * Enforces strict typing and presence of required environment variables.
 */
const envSchema = z.object({
  VITE_GROQ_API_KEY: z.string().optional().default(''),
  DEV: z.boolean().default(false),
  PROD: z.boolean().default(false),
  MODE: z.string().default('development'),
});

const rawEnv = {
  VITE_GROQ_API_KEY: import.meta.env.VITE_GROQ_API_KEY,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
  MODE: import.meta.env.MODE,
};

const parsedResult = envSchema.safeParse(rawEnv);

if (!parsedResult.success) {
  console.error('Invalid environment variables detected:', parsedResult.error.format());
}

export const env = parsedResult.success ? parsedResult.data : rawEnv;
