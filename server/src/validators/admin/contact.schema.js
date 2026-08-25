import { z } from "zod";

export const updateContactStatusSchema = z.object({
  status: z.enum(["NEW", "READ", "REPLIED", "ARCHIVED"]),
});

export const updateContractSignedSchema = z.object({
  contractSigned: z.boolean(),
});