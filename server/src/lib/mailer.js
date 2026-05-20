import nodemailer from "nodemailer";

import { env } from "../config/env.js";

// Transporterul SMTP.
// Pentru Outlook folosim port 587 + STARTTLS.
const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: false,
  requireTLS: true,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

// Funcție mică de protecție.
// Evită injectarea de HTML în email.
function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Trimite email către firmă când cineva completează formularul.
export async function sendContactEmail(submission) {
  const safe = {
    name: escapeHtml(submission.name),
    email: escapeHtml(submission.email),
    phone: escapeHtml(submission.phone || "-"),
    selectedPlan: escapeHtml(submission.selectedPlan || "-"),
    message: escapeHtml(submission.message),
  };

  return transporter.sendMail({
    from: env.SMTP_FROM,
    to: env.COMPANY_EMAIL,
    replyTo: submission.email,
    subject: `Cerere ofertă website - ${safe.selectedPlan}`,
    html: `
      <h2>Cerere nouă de ofertă</h2>

      <p><strong>Nume:</strong> ${safe.name}</p>
      <p><strong>Email:</strong> ${safe.email}</p>
      <p><strong>Telefon:</strong> ${safe.phone}</p>
      <p><strong>Pachet:</strong> ${safe.selectedPlan}</p>

      <hr />

      <p><strong>Mesaj:</strong></p>
      <p>${safe.message.replaceAll("\n", "<br />")}</p>

      <hr />

      <p><strong>GDPR:</strong> ${
        submission.gdprAccepted ? "Acceptat" : "Neacceptat"
      }</p>
    `,
  });
}