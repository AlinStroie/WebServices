import { z } from "zod";

const caseStudyStatusSchema = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);

const statPointSchema = z.object({
  value: z.string().trim().min(1).max(20),
  label: z.string().trim().min(1).max(160),
});

const approachItemSchema = z.object({
  title: z.string().trim().min(1).max(120),
  text: z.string().trim().min(1).max(600),
});

const galleryItemSchema = z.object({
  src: z.string().trim().min(1).max(500),
  caption: z.string().trim().min(1).max(300),
});

export const createCaseStudySchema = z.object({
  slug: z.string().trim().min(2).max(220),

  kicker: z.string().trim().min(3).max(220),
  title: z.string().trim().min(3).max(180),
  description: z.string().trim().min(10).max(600),

  role: z.string().trim().min(2).max(120),
  timeline: z.string().trim().min(2).max(160),
  overview: z.string().trim().min(10).max(2000),

  challengeIntro: z.string().trim().min(10).max(600),
  challengePoints: z.array(z.string().trim().min(1).max(400)).min(1).max(10),

  approach: z.array(approachItemSchema).min(1).max(10),

  solution: z.string().trim().min(10).max(2000),
  results: z.string().trim().min(10).max(2000),

  gallery: z.array(galleryItemSchema).min(0).max(20),
  stats: z.array(statPointSchema).min(0).max(8),

  status: caseStudyStatusSchema.default("DRAFT"),
  featured: z.boolean().optional().default(false),

  metaTitle: z.string().trim().max(180).optional().nullable(),
  metaDescription: z.string().trim().max(300).optional().nullable(),

  publishedAt: z.string().datetime().optional().nullable(),
});

export const updateCaseStudySchema = createCaseStudySchema.partial();

export const updateCaseStudyStatusSchema = z.object({
  status: caseStudyStatusSchema,
});
