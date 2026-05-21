import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email) {
    throw new Error("ADMIN_EMAIL lipsește din .env");
  }

  if (!password) {
    throw new Error("ADMIN_PASSWORD lipsește din .env");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.adminUser.upsert({
    where: {
      email,
    },
    update: {
      passwordHash,
      role: "OWNER",
      active: true,
    },
    create: {
      email,
      passwordHash,
      role: "OWNER",
      active: true,
    },
  });

  console.log("Admin resetat cu succes:", admin.email);
}

main()
  .catch((error) => {
    console.error("Eroare reset admin:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });