import cron from "node-cron";

import { prisma } from "../lib/prisma.js";

const RETENTION_MONTHS = 3;

/**
 * Politica de confidențialitate, secțiunea 8: cererile care nu se
 * finalizează printr-un contract sunt păstrate 3 luni de la ultimul
 * contact, apoi șterse automat. `contractSigned` este flag-ul manual din
 * admin care exclude o cerere de la această ștergere.
 */
export async function deleteExpiredContactSubmissions() {
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - RETENTION_MONTHS);

  const result = await prisma.contactSubmission.deleteMany({
    where: {
      contractSigned: false,
      updatedAt: {
        lt: cutoff,
      },
    },
  });

  if (result.count > 0) {
    await prisma.adminAuditLog.create({
      data: {
        action: "CONTACT_RETENTION_AUTO_DELETE",
        entity: "ContactSubmission",
        metadata: {
          count: result.count,
          cutoff: cutoff.toISOString(),
        },
      },
    });
  }

  return result.count;
}

export function startContactRetentionCron() {
  // Zilnic la 03:00 — trafic minim, nu concurează cu request-uri reale.
  cron.schedule("0 3 * * *", async () => {
    try {
      const count = await deleteExpiredContactSubmissions();

      if (count > 0) {
        console.log(`[contact-retention] Șterse ${count} cereri expirate.`);
      }
    } catch (error) {
      console.error("[contact-retention] Ștergerea automată a eșuat:", error);
    }
  });
}
