// src/app/core/schemas/server.schema.ts
import { z } from 'zod';

export const ServerSchema = z.object({
  name: z.string().min(3),
  ip: z.string().regex(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/, 'IPv4 non valido'),
  status: z.enum(['online', 'offline', 'maintenance'])
});

export type Server = z.infer<typeof ServerSchema>;