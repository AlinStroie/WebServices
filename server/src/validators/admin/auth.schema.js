import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().trim().email("Email invalid."),
  password: z.string().min(8, "Parola trebuie să aibă minimum 8 caractere."),
});