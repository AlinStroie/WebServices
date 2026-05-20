import { z } from "zod";

// Schema pentru formularul de contact.
// Aici controlăm ce date acceptă backendul.
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Numele este prea scurt.")
    .max(100, "Numele este prea lung."),

  email: z
    .string()
    .trim()
    .email("Email invalid.")
    .max(160, "Emailul este prea lung."),

  phone: z
    .string()
    .trim()
    .min(7, "Numărul este prea scurt.")
    .max(30, "Numărul este prea lung.")
    .optional()
    .or(z.literal("")),

  selectedPlan: z.string().trim().max(40).optional(),

  message: z
    .string()
    .trim()
    .min(10, "Mesajul este prea scurt.")
    .max(3000, "Mesajul este prea lung."),

  gdprAccepted: z.boolean(),

  sourcePage: z.string().trim().max(300).optional(),

  // Honeypot anti-spam.
  // Câmpul acesta va fi ascuns în frontend.
  // Utilizatorii reali nu îl completează, boții da.
  website: z.string().optional().default(""),

  sessionId: z.string().trim().max(120).optional(),

  utmSource: z.string().trim().max(120).optional(),
  utmMedium: z.string().trim().max(120).optional(),
  utmCampaign: z.string().trim().max(160).optional(),
  utmContent: z.string().trim().max(160).optional(),
  utmTerm: z.string().trim().max(160).optional(),

  consentAnalytics: z.boolean().optional(),
});