import rateLimit from "express-rate-limit";
import { env } from "../config/env.js";

// Limitare globală pentru tot API-ul.
// Exemplu: maxim 300 requesturi în 15 minute.
export const globalLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MINUTES * 60 * 1000,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Prea multe requesturi. Încearcă din nou mai târziu.",
  },
});

// Limitare mai strictă pentru formularul de contact.
// Ajută contra spamului.
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: env.CONTACT_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Ai trimis prea multe cereri. Încearcă din nou mai târziu.",
  },
});

// Limitare pentru analytics.
// Analytics poate trimite mai multe requesturi decât formularul,
// dar tot trebuie limitat.
export const analyticsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.ANALYTICS_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Prea multe evenimente trimise.",
  },
});

export const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Prea multe încercări de autentificare. Încearcă din nou mai târziu.",
  },
});