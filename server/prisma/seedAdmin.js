import bcrypt from "bcrypt";

import { prisma } from "../src/lib/prisma.js";
import { env } from "../src/config/env.js";

async function main() {
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) {
    throw new Error("ADMIN_EMAIL și ADMIN_PASSWORD trebuie setate în .env");
  }

  const email = env.ADMIN_EMAIL.toLowerCase();
  const passwordHash = await bcrypt.hash(env.ADMIN_PASSWORD, 12);

  const admin = await prisma.adminUser.upsert({
    where: {
      email,
    },
    update: {
      passwordHash,
      active: true,
      role: "OWNER",
    },
    create: {
      email,
      passwordHash,
      role: "OWNER",
      active: true,
    },
  });

  console.log(`Admin pregătit: ${admin.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });