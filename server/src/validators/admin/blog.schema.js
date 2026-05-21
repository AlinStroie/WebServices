import { z } from "zod";

const blogStatusSchema = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);

export const createBlogPostSchema = z.object({
  title: z.string().trim().min(3).max(180),
  slug: z.string().trim().min(3).max(220).optional(),

  excerpt: z.string().trim().min(10).max(500),
  content: z.union([z.string(), z.array(z.any())]),

  coverImage: z.string().trim().max(500).optional().nullable(),

  status: blogStatusSchema.default("DRAFT"),
  featured: z.boolean().optional().default(false),

  readingMinutes: z.coerce.number().int().min(1).max(60).default(4),

  metaTitle: z.string().trim().max(180).optional().nullable(),
  metaDescription: z.string().trim().max(300).optional().nullable(),

  publishedAt: z.string().datetime().optional().nullable(),

  categoryId: z.string().trim().optional().nullable(),
});

export const updateBlogPostSchema = createBlogPostSchema.partial();

export const updateBlogStatusSchema = z.object({
  status: blogStatusSchema,
});