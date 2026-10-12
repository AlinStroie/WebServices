import { prisma } from "./prisma.js";

/**
 * Store pentru express-rate-limit care ține contoarele în Postgres.
 *
 * Pe Vercel fiecare instanță a funcției are propria memorie, deci
 * MemoryStore-ul implicit nu limitează nimic între instanțe. Un singur
 * upsert atomic per request: dacă fereastra a expirat, contorul repornește
 * de la 1.
 */
export class PostgresRateLimitStore {
  localKeys = false;

  constructor(prefix) {
    this.prefix = `${prefix}:`;
  }

  init(options) {
    this.windowMs = options.windowMs;
  }

  async increment(key) {
    const [row] = await prisma.$queryRaw`
      INSERT INTO "RateLimit" ("key", "hits", "resetAt")
      VALUES (${this.prefix + key}, 1, now() + ${this.windowMs} * interval '1 millisecond')
      ON CONFLICT ("key") DO UPDATE SET
        "hits" = CASE WHEN "RateLimit"."resetAt" <= now() THEN 1 ELSE "RateLimit"."hits" + 1 END,
        "resetAt" = CASE WHEN "RateLimit"."resetAt" <= now() THEN EXCLUDED."resetAt" ELSE "RateLimit"."resetAt" END
      RETURNING "hits", "resetAt"
    `;

    return { totalHits: row.hits, resetTime: row.resetAt };
  }

  async decrement(key) {
    await prisma.$executeRaw`
      UPDATE "RateLimit" SET "hits" = GREATEST("hits" - 1, 0)
      WHERE "key" = ${this.prefix + key}
    `;
  }

  async resetKey(key) {
    await prisma.rateLimit.deleteMany({ where: { key: this.prefix + key } });
  }
}

// Rândurile cu fereastra expirată nu mai blochează pe nimeni; le curățăm
// din jobul zilnic ca tabela să nu crească la infinit.
export async function deleteExpiredRateLimits() {
  const result = await prisma.rateLimit.deleteMany({
    where: { resetAt: { lt: new Date() } },
  });

  return result.count;
}
