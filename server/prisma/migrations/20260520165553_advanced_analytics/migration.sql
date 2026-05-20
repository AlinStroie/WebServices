/*
  Warnings:

  - The values [FORM_OPEN,FORM_SUBMIT,PORTFOLIO_VIEW] on the enum `AnalyticsEventType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `ipAddress` on the `AnalyticsEvent` table. All the data in the column will be lost.
  - You are about to drop the column `referrer` on the `AnalyticsEvent` table. All the data in the column will be lost.
  - You are about to drop the column `userAgent` on the `AnalyticsEvent` table. All the data in the column will be lost.
  - Made the column `sessionId` on table `AnalyticsEvent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AnalyticsEventType_new" AS ENUM ('PAGE_VIEW', 'BLOG_VIEW', 'SCROLL_DEPTH', 'TIME_ON_PAGE', 'CTA_CLICK', 'PRICING_VIEW', 'PRICING_CLICK', 'CONTACT_OPEN', 'CONTACT_START', 'CONTACT_SUBMIT', 'CONTACT_SUCCESS', 'CONTACT_ERROR', 'OUTBOUND_CLICK', 'ERROR');
ALTER TABLE "AnalyticsEvent" ALTER COLUMN "type" TYPE "AnalyticsEventType_new" USING ("type"::text::"AnalyticsEventType_new");
ALTER TYPE "AnalyticsEventType" RENAME TO "AnalyticsEventType_old";
ALTER TYPE "AnalyticsEventType_new" RENAME TO "AnalyticsEventType";
DROP TYPE "public"."AnalyticsEventType_old";
COMMIT;

-- AlterTable
ALTER TABLE "AnalyticsEvent" DROP COLUMN "ipAddress",
DROP COLUMN "referrer",
DROP COLUMN "userAgent",
ADD COLUMN     "metadata" JSONB,
ALTER COLUMN "sessionId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ContactSubmission" ADD COLUMN     "consentAnalytics" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sessionId" TEXT,
ADD COLUMN     "utmCampaign" TEXT,
ADD COLUMN     "utmContent" TEXT,
ADD COLUMN     "utmMedium" TEXT,
ADD COLUMN     "utmSource" TEXT,
ADD COLUMN     "utmTerm" TEXT;

-- CreateTable
CREATE TABLE "AnalyticsSession" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "consentAnalytics" BOOLEAN NOT NULL DEFAULT false,
    "firstPath" TEXT,
    "lastPath" TEXT,
    "referrer" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmContent" TEXT,
    "utmTerm" TEXT,
    "deviceType" TEXT,
    "browser" TEXT,
    "ipHash" TEXT,
    "userAgentHash" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "convertedAt" TIMESTAMP(3),

    CONSTRAINT "AnalyticsSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnalyticsSession_sessionId_key" ON "AnalyticsSession"("sessionId");

-- CreateIndex
CREATE INDEX "AnalyticsSession_startedAt_idx" ON "AnalyticsSession"("startedAt");

-- CreateIndex
CREATE INDEX "AnalyticsSession_lastSeenAt_idx" ON "AnalyticsSession"("lastSeenAt");

-- CreateIndex
CREATE INDEX "AnalyticsSession_convertedAt_idx" ON "AnalyticsSession"("convertedAt");

-- CreateIndex
CREATE INDEX "AnalyticsSession_utmSource_idx" ON "AnalyticsSession"("utmSource");

-- CreateIndex
CREATE INDEX "AnalyticsSession_utmCampaign_idx" ON "AnalyticsSession"("utmCampaign");

-- CreateIndex
CREATE INDEX "ContactSubmission_sessionId_idx" ON "ContactSubmission"("sessionId");

-- CreateIndex
CREATE INDEX "ContactSubmission_utmSource_idx" ON "ContactSubmission"("utmSource");

-- CreateIndex
CREATE INDEX "ContactSubmission_utmCampaign_idx" ON "ContactSubmission"("utmCampaign");

-- AddForeignKey
ALTER TABLE "AnalyticsEvent" ADD CONSTRAINT "AnalyticsEvent_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "AnalyticsSession"("sessionId") ON DELETE CASCADE ON UPDATE CASCADE;
