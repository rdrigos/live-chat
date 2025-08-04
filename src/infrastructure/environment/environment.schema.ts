import { z } from 'zod';

export const environmentSchema = z.object({
  // General
  NODE_ENV: z.enum(['development', 'staging', 'production']),

  // Application
  NAME: z.string(),
  DESCRIPTION: z.string(),
  VERSION: z.string().optional().default('1.0.0'),
  PORT: z.coerce.number().min(0).max(65535).optional().default(3001),

  // Database
  DATABASE_URL: z.url(),
});

export type Environment = z.infer<typeof environmentSchema>;
