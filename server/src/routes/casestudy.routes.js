import express from "express";

import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = express.Router();

const listSelect = {
  id: true,
  slug: true,
  kicker: true,
  title: true,
  description: true,
  featured: true,
  publishedAt: true,
};

// GET /api/case-studies
// Lista studiilor de caz publicate, fără conținutul complet.
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const items = await prisma.caseStudy.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
      select: listSelect,
    });

    res.json({
      success: true,
      data: items,
    });
  })
);

// GET /api/case-studies/:slug
// Studiul de caz complet.
router.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const item = await prisma.caseStudy.findUnique({
      where: {
        slug: req.params.slug,
      },
    });

    if (!item || item.status !== "PUBLISHED") {
      return res.status(404).json({
        success: false,
        message: "Studiul de caz nu a fost găsit.",
      });
    }

    res.json({
      success: true,
      data: item,
    });
  })
);

export default router;
