// PrismaClient este clientul generat de Prisma.
// Îl folosim ca să comunicăm cu baza de date.
import { PrismaClient } from "@prisma/client";

import { isProduction } from "../config/env.js";

// Creăm o singură instanță Prisma pentru tot backendul.
export const prisma = new PrismaClient({
  log: isProduction ? ["error"] : ["error", "warn"],
});