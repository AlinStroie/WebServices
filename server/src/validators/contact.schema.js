import { z } from "zod";

// Transformă "", null și undefined în undefined.
// Bun pentru câmpuri opționale.
const emptyToUndefined = (value) => {
  if (value === null || value === undefined) return undefined;

  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
  }

  return value;
};

const optionalTrimmedString = (max = 160) =>
  z.preprocess(emptyToUndefined, z.string().max(max).optional());

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

  // Telefon opțional.
  // Acceptă: lipsă, "", null sau string valid.
  phone: z.preprocess(
    emptyToUndefined,
    z
      .string()
      .min(7, "Numărul este prea scurt.")
      .max(30, "Numărul este prea lung.")
      .optional()
  ),

  selectedPlan: optionalTrimmedString(40),

  message: z
    .string()
    .trim()
    .min(10, "Mesajul este prea scurt.")
    .max(3000, "Mesajul este prea lung."),

  // Trebuie să fie true, nu doar boolean.
  gdprAccepted: z.literal(true, {
    error: "Trebuie să accepți prelucrarea datelor.",
  }),

  sourcePage: optionalTrimmedString(300),

  // Honeypot anti-spam.
  website: z.preprocess(
    (value) => {
      if (value === null || value === undefined) return "";
      return String(value);
    },
    z.string().optional().default("")
  ),

  sessionId: optionalTrimmedString(120),

  utmSource: optionalTrimmedString(120),
  utmMedium: optionalTrimmedString(120),
  utmCampaign: optionalTrimmedString(160),
  utmContent: optionalTrimmedString(160),
  utmTerm: optionalTrimmedString(160),

  consentAnalytics: z.boolean().optional().default(false),
});