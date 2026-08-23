import express from "express";

import { prisma } from "../../lib/prisma.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";

const router = express.Router();

// GET /api/portal/projects — proiectele clientului autentificat
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const projects = await prisma.portalProject.findMany({
      where: { clerkUserId: req.client.id },
      orderBy: { createdAt: "desc" },
      include: {
        files: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return res.json({
      success: true,
      data: projects,
    });
  })
);

// GET /api/portal/projects/:id — un proiect al clientului autentificat
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const project = await prisma.portalProject.findFirst({
      where: { id: req.params.id, clerkUserId: req.client.id },
      include: {
        files: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Proiect negăsit.",
      });
    }

    return res.json({
      success: true,
      data: project,
    });
  })
);

export default router;
