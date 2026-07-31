import { env } from "../config/env.js";

// Funcție mică de protecție pentru a evita injectarea de HTML
function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Trimite email folosind Brevo REST API (Ultra-rapid pe Vercel)
export async function sendContactEmail(submission) {
  const safe = {
    name: escapeHtml(submission.name),
    email: escapeHtml(submission.email),
    phone: escapeHtml(submission.phone || "-"),
    selectedPlan: escapeHtml(submission.selectedPlan || "-"),
    message: escapeHtml(submission.message),
  };

  // Structura cerută de API-ul Brevo
  const payload = {
    sender: {
      name: "A Squared Studio",
      email: "contact@asquaredstudio.ro", // Adresa confirmată!
    },
    to: [
      {
        email: env.COMPANY_EMAIL,
      },
    ],
    replyTo: {
      email: submission.email,
    },
    subject: `Cerere ofertă website - ${safe.selectedPlan}`,
    htmlContent: `
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
  };

  // Facem o cerere HTTP simplă, care durează o fracțiune de secundă
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "api-key": env.BREVO_API_KEY, // Cheia pe care o pui în Vercel
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Eroare Brevo API: ${JSON.stringify(errorData)}`);
  }

  return await response.json();
}