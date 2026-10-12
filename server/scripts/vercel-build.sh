#!/bin/sh
# Rulat de Vercel ca "vercel-build" (Prisma Client e deja generat în
# postinstall). Doar pe producție aplicăm migrările și seed-urile, ca un
# deploy de preview al unui PR să nu modifice baza de date live.
set -e

if [ "$VERCEL_ENV" != "production" ]; then
  echo "Preview build: skipping migrations and seeds."
  exit 0
fi

# Migrările au nevoie de conexiunea directă; integrarea Neon din Vercel o
# expune ca DATABASE_URL_UNPOOLED.
export DATABASE_URL="${DATABASE_URL_UNPOOLED:-$DATABASE_URL}"

npx prisma migrate deploy
node prisma/seedAdmin.js --if-missing
node prisma/seedCaseStudies.js
