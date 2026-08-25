import { app } from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./lib/prisma.js";
import { startContactRetentionCron } from "./jobs/contactRetention.js";

// Pornim serverul pe portul din .env.
const server = app.listen(env.PORT, () => {
  console.log(`Server running on http://localhost:${env.PORT}`);
});

startContactRetentionCron();

// Funcție pentru oprire corectă.
// Când închizi serverul, închidem și conexiunea Prisma.
async function shutdown(signal) {
  console.log(`${signal} received. Closing server...`);

  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

// Ascultăm semnale de oprire.
// CTRL + C trimite SIGINT.
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));