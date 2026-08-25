import { z } from "zod";

export const analyticsSchema = z.object({
  type: z.enum([
    "PAGE_VIEW",
    "CASE_STUDY_VIEW",
    "SCROLL_DEPTH",
    "TIME_ON_PAGE",
    "CTA_CLICK",
    "PRICING_VIEW",
    "PRICING_CLICK",
    "CONTACT_OPEN",
    "CONTACT_START",
    "CONTACT_SUBMIT",
    "CONTACT_SUCCESS",
    "CONTACT_ERROR",
    "OUTBOUND_CLICK",
    "ERROR",
  ]),

  // Frontend-ul generează sessionId cu crypto.randomUUID() (lib/analytics.js)
  // — validăm exact acel format, nu orice string, ca să nu accepte valori
  // arbitrare drept "sessionId".
  sessionId: z.string().uuid(),

  path: z.string().trim().max(300).optional(),
  label: z.string().trim().max(160).optional(),
  value: z.string().trim().max(500).optional(),

  referrer: z.string().trim().max(500).optional(),

  utmSource: z.string().trim().max(120).optional(),
  utmMedium: z.string().trim().max(120).optional(),
  utmCampaign: z.string().trim().max(160).optional(),
  utmContent: z.string().trim().max(160).optional(),
  utmTerm: z.string().trim().max(160).optional(),

  consentAnalytics: z.boolean().optional(),

  metadata: z.record(z.any()).optional(),
});