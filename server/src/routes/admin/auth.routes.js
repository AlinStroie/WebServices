import bcrypt from "bcrypt";
import express from "express";

import { prisma } from "../../lib/prisma.js";
import {
  clearAdminCookieOptions,
  getAdminCookieName,
  getAdminCookieOptions,
  signAdminToken,
} from "../../lib/adminAuth.js";
import { createAuditLog } from "../../lib/auditLog.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { requireAdmin } from "../../middleware/requireAdmin.js";
import { adminLoginSchema } from "../../validators/admin/auth.schema.js";
import { adminLoginLimiter } from "../../middleware/rateLimiters.js";

const router = express.Router();

router.post(
  "/login",
  adminLoginLimiter,
  validate(adminLoginSchema),
  asyncHandler(async (req, res) => {
    const { email, password } = req.validatedBody;

    const admin = await prisma.adminUser.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (!admin || !admin.active) {
      return res.status(401).json({
        success: false,
        message: "Email sau parolă incorectă.",
      });
    }

    const passwordValid = await bcrypt.compare(password, admin.passwordHash);

    if (!passwordValid) {
      return res.status(401).json({
        success: false,
        message: "Email sau parolă incorectă.",
      });
    }

    await prisma.adminUser.update({
      where: {
        id: admin.id,
      },
      data: {
        lastLoginAt: new Date(),
      },
    });

    const token = signAdminToken(admin);

    res.cookie(getAdminCookieName(), token, getAdminCookieOptions());

    req.admin = {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    };

    await createAuditLog({
      req,
      action: "ADMIN_LOGIN",
      entity: "AdminUser",
      entityId: admin.id,
    });

    return res.json({
      success: true,
      data: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
    });
  })
);

router.post(
  "/logout",
  requireAdmin,
  asyncHandler(async (req, res) => {
    await createAuditLog({
      req,
      action: "ADMIN_LOGOUT",
      entity: "AdminUser",
      entityId: req.admin.id,
    });

    res.clearCookie(getAdminCookieName(), clearAdminCookieOptions());

    return res.json({
      success: true,
      message: "Te-ai delogat cu succes.",
    });
  })
);

router.get(
  "/me",
  requireAdmin,
  asyncHandler(async (req, res) => {
    return res.json({
      success: true,
      data: req.admin,
    });
  })
);

export default router;