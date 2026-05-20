import express from "express";

import { prisma } from "../lib/prisma.js";
import { sendContactEmail } from "../lib/mailer.js";
import { validate } from "../middleware/validate.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { contactLimiter } from "../middleware/rateLimiters.js";
import { contactSchema } from "../validators/contact.schema.js";

const router = express.Router();

// POST /api/contact
// Primește datele din formular, le salvează în DB și trimite email.
router.post(
  "/",
  contactLimiter,
  validate(contactSchema),
  asyncHandler(async (req, res) => {
    const data = req.validatedBody;

    // Honeypot anti-spam.
    // Dacă acest câmp este completat, probabil e bot.
    // Răspundem cu success fals pozitiv ca să nu afle botul.
    if (data.website) {
      return res.json({
        success: true,
        message: "Cererea a fost trimisă cu succes.",
      });
    }

    if (!data.gdprAccepted) {
      return res.status(400).json({
        success: false,
        message: "Trebuie să accepți prelucrarea datelor.",
      });
    }

    // Salvăm cererea în baza de date.
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
      },
    });

    try {
      // Trimitem email către firmă.
      await sendContactEmail(submission);

      // Marcăm în DB că emailul a fost trimis.
      await prisma.contactSubmission.update({
        where: { id: submission.id },
        data: {
          emailSent: true,
          emailError: null,
        },
      });
    } catch (error) {
      // Dacă emailul pică, cererea rămâne salvată în DB.
      await prisma.contactSubmission.update({
        where: { id: submission.id },
        data: {
          emailSent: false,
          emailError: error.message,
        },
      });

      return res.status(500).json({
        success: false,
        message:
          "Cererea a fost salvată, dar emailul nu a putut fi trimis momentan.",
      });
    }

    return res.json({
      success: true,
      message: "Cererea a fost trimisă cu succes.",
    });
  })
);

export default router;