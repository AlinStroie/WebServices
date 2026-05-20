// Încarcă variabilele din .env
import "dotenv/config";

// defineConfig configurează Prisma CLI.
// env("DATABASE_URL") citește linkul bazei de date din .env.
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // Unde se află schema bazei de date.
  schema: "prisma/schema.prisma",

  // Unde vor fi salvate migrările.
  migrations: {
    path: "prisma/migrations",
  },

  // Conexiunea la baza de date.
  datasource: {
    url: env("DATABASE_URL"),
  },
});