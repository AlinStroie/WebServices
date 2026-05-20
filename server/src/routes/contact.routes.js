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
// Face 4 lucruri:
// 1. validează datele;
// 2. salvează cererea în PostgreSQL;
// 3. marchează sesiunea de analytics ca fiind convertită;
// 4. trimite email către firmă.
router.post(
  "/",
  contactLimiter,
  validate(contactSchema),
  asyncHandler(async (req, res) => {
    const data = req.validatedBody;

    // Honeypot anti-spam.
    // Câmpul "website" nu este vizibil pentru utilizator.
    // Dacă este completat, probabil este bot.
    // Răspundem cu success ca să nu afle botul că a fost blocat.
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

    // Salvăm cererea în baza de date.
    // Aici sunt date personale: nume, email, telefon, mesaj.
    // Acestea rămân separate de analytics.
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

        // Legătură opțională cu sesiunea anonimă de analytics.
        sessionId: data.sessionId || null,

        // UTM-uri pentru campanii.
        utmSource: data.utmSource || null,
        utmMedium: data.utmMedium || null,
        utmCampaign: data.utmCampaign || null,
        utmContent: data.utmContent || null,
        utmTerm: data.utmTerm || null,

        consentAnalytics: Boolean(data.consentAnalytics),
      },
    });

    // Dacă există sessionId, marcăm sesiunea ca fiind convertită.
    // Asta ne ajută să calculăm conversii în dashboard.
    if (data.sessionId) {
      await prisma.analyticsSession.updateMany({
        where: {
          sessionId: data.sessionId,
        },
        data: {
          convertedAt: new Date(),
          lastSeenAt: new Date(),
          lastPath: data.sourcePage || undefined,
        },
      });
    }

    // Salvăm și un eveniment CONTACT_SUCCESS în analytics.
    // Nu punem date personale aici.
    if (data.sessionId) {
      await prisma.analyticsEvent.create({
        data: {
          sessionId: data.sessionId,
          type: "CONTACT_SUCCESS",
          path: data.sourcePage || null,
          label: data.selectedPlan || "Nespecificat",
          value: data.selectedPlan || "Nespecificat",
          metadata: data.consentAnalytics
            ? {
                source: "contact_form",
                hasUtm: Boolean(
                  data.utmSource ||
                    data.utmMedium ||
                    data.utmCampaign ||
                    data.utmContent ||
                    data.utmTerm
                ),
              }
            : undefined,
        },
      });
    }

    try {
      // Trimitem email către firmă.
      await sendContactEmail(submission);

      // Marcăm în DB că emailul a fost trimis.
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
      // Dacă emailul pică, cererea rămâne salvată în DB.
      // Utilizatorul poate vedea tot succes, pentru că leadul nu s-a pierdut.
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