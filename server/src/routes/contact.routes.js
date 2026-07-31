import express from "express";

import { prisma } from "../lib/prisma.js";
import { sendContactEmail } from "../lib/mailer.js";
import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { contactLimiter } from "../middleware/rateLimiters.js";
import { contactSchema } from "../validators/contact.schema.js";

const router = express.Router();

router.post(
  "/",
  contactLimiter,
  validate(contactSchema),
  asyncHandler(async (req, res) => {
    const data = req.validatedBody;

    // Honeypot anti-spam.
    if (data.website) {
      return res.json({
        success: true,
        message: "Cererea a fost trimisă cu succes.",
      });
    }

    // GDPR obligatoriu
    if (!data.gdprAccepted) {
      return res.status(400).json({
        success: false,
        message: "Trebuie să accepți prelucrarea datelor.",
      });
    }

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

    // 1. Salvăm cererea în baza de date
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

    // 2. Marcăm conversia analytics
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

    // 3. RĂSPUNDEM IMEDIAT CLIENTULUI (Trimite instant în Frontend!)
    res.json({
      success: true,
      message: "Cererea a fost trimisă cu succes.",
    });

    // 4. TRIMITEREA EMAIL-ULUI SE FACE ÎN FUNDAL (fără `await` care să blocheze)
    sendContactEmail(submission)
      .then(async () => {
        await prisma.contactSubmission.update({
          where: { id: submission.id },
          data: { emailSent: true, emailError: null },
        });
      })
      .catch(async (error) => {
        console.error("Eroare trimitere email pe fundal:", error);
        await prisma.contactSubmission.update({
          where: { id: submission.id },
          data: { emailSent: false, emailError: error.message },
        });
      });
  })
);

export default router;