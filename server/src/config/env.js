// Încarcă automat variabilele din .env
import "dotenv/config";

// Zod este folosit pentru validare.
// Verificăm ca PORT să fie număr, emailul să fie email valid etc.
import { z } from "zod";

// Schema variabilelor obligatorii din .env
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  // z.coerce.number() transformă "5000" din .env în număr 5000
  PORT: z.coerce.number().default(5000),

  CLIENT_URL: z.string().url(),
  API_URL: z.string().url().optional(),

  DATABASE_URL: z.string().min(1),

  // Secret general, păstrat pentru eventuale funcții viitoare.
  JWT_SECRET: z.string().min(32),

  // Secret separat pentru autentificarea admin.
  // Trebuie să fie lung și greu de ghicit.
 ADMIN_JWT_SECRET: z.string().min(32),
  ADMIN_COOKIE_NAME: z.string().default("asquared_admin_token"),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string().min(8),
  ADMIN_LOGIN_RATE_LIMIT_MAX: z.coerce.number().default(5),

  // Emailul firmei.
  COMPANY_EMAIL: z.string().email(),

  // Config SMTP pentru trimiterea emailurilor.
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.coerce.number().default(465),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1),
  SMTP_FROM: z.string().min(1),

  // Rate limit general.
  RATE_LIMIT_WINDOW_MINUTES: z.coerce.number().default(15),
  RATE_LIMIT_MAX: z.coerce.number().default(300),

  // Rate limit special pentru formular.
  CONTACT_RATE_LIMIT_MAX: z.coerce.number().default(5),

  // Rate limit pentru analytics.
  ANALYTICS_RATE_LIMIT_MAX: z.coerce.number().default(120),

  // Rate limit pentru login admin.
  ADMIN_LOGIN_RATE_LIMIT_MAX: z.coerce.number().default(5),
});

// Verificăm process.env față de schema de mai sus.
const parsed = envSchema.safeParse(process.env);

// Dacă există erori, le afișăm și oprim serverul.
// E mai bine să pice la pornire decât să ruleze configurat greșit.
if (!parsed.success) {
  console.error("Invalid environment variables:");
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

// Exportăm env ca obiect validat.
export const env = parsed.data;

// Variabilă utilă pentru a ascunde erorile detaliate în producție.
export const isProduction = env.NODE_ENV === "production";