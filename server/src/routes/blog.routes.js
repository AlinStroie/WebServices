import express from "express";

import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = express.Router();

// GET /api/blog
// Lista articolelor, fără content complet
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const posts = await prisma.blogPost.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: {
        publishedAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        featured: true,
        publishedAt: true,
        readingMinutes: true,
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: posts,
    });
  })
);

// GET /api/blog/recent
// Cele mai recente 3 articole
router.get(
  "/recent",
  asyncHandler(async (req, res) => {
    const posts = await prisma.blogPost.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: {
        publishedAt: "desc",
      },
      take: 3,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        featured: true,
        publishedAt: true,
        readingMinutes: true,
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: posts,
    });
  })
);

// GET /api/blog/:slug
// Articol complet, cu content
router.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const post = await prisma.blogPost.findUnique({
      where: {
        slug: req.params.slug,
      },
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!post || post.status !== "PUBLISHED") {
      return res.status(404).json({
        success: false,
        message: "Articolul nu a fost găsit.",
      });
    }

    res.json({
      success: true,
      data: post,
    });
  })
);

export default router;