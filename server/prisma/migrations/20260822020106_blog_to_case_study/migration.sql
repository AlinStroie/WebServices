-- CreateEnum
CREATE TYPE "CaseStudyStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- DeleteData
-- Blog is being fully retired; these events tracked views of the now-removed
-- blog pages and have no valid value in the new enum, so they are dropped
-- along with the rest of the Blog data.
DELETE FROM "AnalyticsEvent" WHERE "type" = 'BLOG_VIEW';

-- AlterEnum
BEGIN;
CREATE TYPE "AnalyticsEventType_new" AS ENUM ('PAGE_VIEW', 'CASE_STUDY_VIEW', 'SCROLL_DEPTH', 'TIME_ON_PAGE', 'CTA_CLICK', 'PRICING_VIEW', 'PRICING_CLICK', 'CONTACT_OPEN', 'CONTACT_START', 'CONTACT_SUBMIT', 'CONTACT_SUCCESS', 'CONTACT_ERROR', 'OUTBOUND_CLICK', 'ERROR');
ALTER TABLE "AnalyticsEvent" ALTER COLUMN "type" TYPE "AnalyticsEventType_new" USING ("type"::text::"AnalyticsEventType_new");
ALTER TYPE "AnalyticsEventType" RENAME TO "AnalyticsEventType_old";
ALTER TYPE "AnalyticsEventType_new" RENAME TO "AnalyticsEventType";
DROP TYPE "public"."AnalyticsEventType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "BlogPostTag" DROP CONSTRAINT "BlogPostTag_postId_fkey";

-- DropForeignKey
ALTER TABLE "BlogPostTag" DROP CONSTRAINT "BlogPostTag_tagId_fkey";

-- DropTable
DROP TABLE "BlogCategory";

-- DropTable
DROP TABLE "BlogPost";

-- DropTable
DROP TABLE "BlogPostTag";

-- DropTable
DROP TABLE "BlogTag";

-- DropEnum
DROP TYPE "BlogStatus";

-- CreateTable
CREATE TABLE "CaseStudy" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "status" "CaseStudyStatus" NOT NULL DEFAULT 'DRAFT',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "kicker" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "timeline" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "challengeIntro" TEXT NOT NULL,
    "challengePoints" JSONB NOT NULL,
    "approach" JSONB NOT NULL,
    "solution" TEXT NOT NULL,
    "results" TEXT NOT NULL,
    "gallery" JSONB NOT NULL,
    "stats" JSONB NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaseStudy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CaseStudy_slug_key" ON "CaseStudy"("slug");

-- CreateIndex
CREATE INDEX "CaseStudy_status_publishedAt_idx" ON "CaseStudy"("status", "publishedAt");

-- CreateIndex
CREATE INDEX "CaseStudy_featured_idx" ON "CaseStudy"("featured");

