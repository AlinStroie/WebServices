import { prisma } from "../lib/prisma.js";
import {
  getAdminCookieName,
  verifyAdminToken,
} from "../lib/adminAuth.js";

export async function requireAdmin(req, res, next) {
  try {
    const cookieName = getAdminCookieName();
    const token = req.cookies?.[cookieName];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Nu ești autentificat.",
      });
    }

    const payload = verifyAdminToken(token);

    const admin = await prisma.adminUser.findUnique({
      where: {
        id: payload.sub,
      },
      select: {
        id: true,
        email: true,
        role: true,
        active: true,
      },
    });

    if (!admin || !admin.active) {
      return res.status(401).json({
        success: false,
        message: "Cont admin invalid sau inactiv.",
      });
    }

    req.admin = admin;

    return next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Sesiune expirată sau invalidă.",
    });
  }
}

export function requireRole(...roles) {
  return function roleMiddleware(req, res, next) {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        message: "Nu ești autentificat.",
      });
    }

    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({
        success: false,
        message: "Nu ai permisiunea necesară.",
      });
    }

    return next();
  };
}