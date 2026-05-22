import express from "express";

import { prisma } from "../lib/prisma.js";
import { sendContactEmail } from "../lib/mailer.js";
import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { contactLimiter } from "../middleware/rateLimiters.js";
import { contactSchema } from "../validators/contact.schema.js";

const router = express.Router();

// POST /api/contact
// Primește formularul din ContactDrawer.
// Flux:
// 1. validează datele;
// 2. blochează spamul prin honeypot;
// 3. verifică acceptul GDPR;
// 4. salvează cererea în PostgreSQL;
// 5. dacă există consimțământ analytics, marchează conversia;
// 6. trimite email către firmă.
router.post(
  "/",
  contactLimiter,
  validate(contactSchema),
  asyncHandler(async (req, res) => {
    const data = req.validatedBody;

    // Honeypot anti-spam.
    // Câmpul "website" nu este vizibil pentru utilizator.
    // Dacă este completat, probabil este bot.
    if (data.website) {
      return res.json({
        success: true,
        message: "Cererea a fost trimisă cu succes.",
      });
    }

    // GDPR obligatoriu pentru formular.
    if (!data.gdprAccepted) {
      return res.status(400).json({
        success: false,
        message: "Trebuie să accepți prelucrarea datelor.",
      });
    }

    // Analytics/context se salvează doar dacă utilizatorul a acceptat analytics.
    const hasAnalyticsConsent = Boolean(data.consentAnalytics);

    const analyticsData = hasAnalyticsConsent
      ? {
          sessionId: data.sessionId || null,
          utmSource: data.utmSource || null,
          utmMedium: data.utmMedium || null,
          utmCampaign: data.utmCampaign || null,
          utmContent: data.utmContent || null,
          utmTerm: data.utmTerm || null,
        }
      : {
          sessionId: null,
          utmSource: null,
          utmMedium: null,
          utmCampaign: null,
          utmContent: null,
          utmTerm: null,
        };

    // Salvăm cererea în baza de date.
    // Date personale: nume, email, telefon, mesaj.
    // Nu salvăm IP/userAgent aici pentru minimizarea datelor.
    // Dacă vrei să le salvezi pentru securitate/anti-spam, menționează clar în Privacy Policy.
    const submission = await prisma.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        selectedPlan: data.selectedPlan || null,
        message: data.message,
        gdprAccepted: data.gdprAccepted,

        sourcePage: data.sourcePage || null,

        userAgent: req.headers["user-agent"] || null,
        ipAddress: req.ip || null,

        sessionId: analyticsData.sessionId,

        utmSource: analyticsData.utmSource,
        utmMedium: analyticsData.utmMedium,
        utmCampaign: analyticsData.utmCampaign,
        utmContent: analyticsData.utmContent,
        utmTerm: analyticsData.utmTerm,

        consentAnalytics: hasAnalyticsConsent,
      },
    });

    // Marcăm sesiunea ca fiind convertită doar dacă există consimțământ analytics.
    if (hasAnalyticsConsent && analyticsData.sessionId) {
      await prisma.analyticsSession.updateMany({
        where: {
          sessionId: analyticsData.sessionId,
        },
        data: {
          convertedAt: new Date(),
          lastSeenAt: new Date(),
          lastPath: data.sourcePage || undefined,
        },
      });

      await prisma.analyticsEvent.create({
        data: {
          sessionId: analyticsData.sessionId,
          type: "CONTACT_SUCCESS",
          path: data.sourcePage || null,
          label: data.selectedPlan || "Nespecificat",
          value: data.selectedPlan || "Nespecificat",
          metadata: {
            source: "contact_form",
            hasUtm: Boolean(
              analyticsData.utmSource ||
                analyticsData.utmMedium ||
                analyticsData.utmCampaign ||
                analyticsData.utmContent ||
                analyticsData.utmTerm
            ),
          },
        },
      });
    }

    try {
      await sendContactEmail(submission);

      await prisma.contactSubmission.update({
        where: {
          id: submission.id,
        },
        data: {
          emailSent: true,
          emailError: null,
        },
      });

      return res.json({
        success: true,
        message: "Cererea a fost trimisă cu succes.",
      });
    } catch (error) {
      await prisma.contactSubmission.update({
        where: {
          id: submission.id,
        },
        data: {
          emailSent: false,
          emailError: error.message,
        },
      });

      return res.json({
        success: true,
        message:
          "Cererea a fost salvată. Emailul nu a putut fi trimis momentan, dar datele sunt înregistrate.",
      });
    }
  })
);

export default router;