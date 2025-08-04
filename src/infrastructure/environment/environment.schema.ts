import { z } from 'zod';

export const environmentSchema = z.object({
  // General
  NODE_ENV: z.enum(['development', 'staging', 'production']),

  // Application
  NAME: z.string(),
  DESCRIPTION: z.string(),
  PORT: z.coerce.number().min(0).max(65535).optional().default(3001),
});

export type Environment = z.infer<typeof environmentSchema>;
