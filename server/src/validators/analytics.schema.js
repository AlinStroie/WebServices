import { z } from "zod";

// Schema pentru evenimente analytics.
// Salvăm doar tipuri controlate, nu orice text trimis din frontend.
export const analyticsSchema = z.object({
  type: z.enum([
    "PAGE_VIEW",
    "CTA_CLICK",
    "FORM_OPEN",
    "FORM_SUBMIT",
    "BLOG_VIEW",
    "PORTFOLIO_VIEW",
  ]),

  path: z.string().trim().max(300).optional(),
  label: z.string().trim().max(160).optional(),
  value: z.string().trim().max(300).optional(),
  sessionId: z.string().trim().max(120).optional(),
  referrer: z.string().trim().max(500).optional(),
});