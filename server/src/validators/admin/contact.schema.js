import { z } from "zod";

export const updateContactStatusSchema = z.object({
  status: z.enum(["NEW", "READ", "REPLIED", "ARCHIVED"]),
});