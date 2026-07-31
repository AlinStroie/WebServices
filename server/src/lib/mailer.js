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

// 1. Emailul care vine la FIRMĂ (pe Outlook) - Normal, cu datele din formular
export async function sendContactEmail(submission) {
  const safe = {
    name: escapeHtml(submission.name),
    email: escapeHtml(submission.email),
    phone: escapeHtml(submission.phone || "-"),
    selectedPlan: escapeHtml(submission.selectedPlan || "-"),
    message: escapeHtml(submission.message),
    gdprAccepted: submission.gdprAccepted ? "Acceptat" : "Neacceptat",
  };

  const payload = {
    sender: {
      name: "A Squared Studio",
      email: "contact@asquaredstudio.ro",
    },
    to: [
      {
        email: env.COMPANY_EMAIL, // Vine la voi pe Outlook
      },
    ],
    replyTo: {
      email: submission.email, // Poți da Reply direct clientului
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
      <p><strong>GDPR:</strong> ${safe.gdprAccepted}</p>
    `,
  };

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "api-key": env.BREVO_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Eroare Brevo API (Admin): ${JSON.stringify(errorData)}`);
  }

  return await response.json();
}

// 2. Emailul de confirmare care pleacă spre CLIENT - Folosește Template din Brevo
export async function sendConfirmationEmail(submission) {
  const safe = {
    name: escapeHtml(submission.name),
    selectedPlan: escapeHtml(submission.selectedPlan || "servicii web"),
  };

  const payload = {
    sender: {
      name: "A Squared Studio",
      email: "contact@asquaredstudio.ro",
    },
    to: [
      {
        email: submission.email, // Se duce la client
      },
    ],
    templateId: 2, // Înlocuiește cu ID-ul șablonului tău din Brevo creat pentru client
    params: {
      name: safe.name,
      selectedPlan: safe.selectedPlan,
    },
  };

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "api-key": env.BREVO_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Eroare Brevo API (Client): ${JSON.stringify(errorData)}`);
  }

  return await response.json();
}