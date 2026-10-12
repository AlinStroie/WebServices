-- Tabelele portalului au fost adăugate în schema.prisma fără migrare.
-- Scris idempotent: o bază creată cu `prisma db push` le are deja,
-- una nouă (Neon) nu.

-- CreateEnum
DO $$ BEGIN
    CREATE TYPE "PortalProjectStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'ARCHIVED');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- CreateTable
CREATE TABLE IF NOT EXISTS "PortalProject" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "PortalProjectStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PortalProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "PortalProjectFile" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "r2Key" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "uploadedByClerkId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PortalProjectFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "PortalProject_clerkUserId_idx" ON "PortalProject"("clerkUserId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "PortalProjectFile_projectId_idx" ON "PortalProjectFile"("projectId");

-- AddForeignKey
DO $$ BEGIN
    ALTER TABLE "PortalProjectFile" ADD CONSTRAINT "PortalProjectFile_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "PortalProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;
