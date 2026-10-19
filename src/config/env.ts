import { config as loadDotenv } from 'dotenv';
import { z } from 'zod';

loadDotenv();

const envSchema = z.object({
  SERVICE_NAME: z.string(),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  const problems = result.error.issues
    .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
    .join('\n');
  throw new Error(`Invalid environment configuration:\n${problems}`);
}

const env = result.data;

export const config = Object.freeze({
  port: env.PORT,
  serviceName: env.SERVICE_NAME,
});

export type Config = typeof config;