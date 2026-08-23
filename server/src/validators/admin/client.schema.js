import { z } from "zod";

export const inviteClientSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(160),
  name: z.string().trim().min(1).max(120).optional(),
});

export const createClientProjectSchema = z.object({
  name: z.string().trim().min(2).max(160),
  description: z.string().trim().max(600).optional(),
});
