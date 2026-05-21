import { prisma } from "../lib/prisma.js";
import { getAdminCookieName, verifyAdminToken } from "../lib/adminAuth.js";

export async function requireAdmin(req, res, next) {
  try {
    const cookieName = getAdminCookieName();
    const token = req.cookies?.[cookieName];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Neautorizat.",
      });
    }

    const decoded = verifyAdminToken(token);

    const admin = await prisma.adminUser.findUnique({
      where: {
        id: decoded.id,
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
        message: "Sesiune invalidă.",
      });
    }

    req.admin = {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    };

    return next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Sesiune invalidă sau expirată.",
    });
  }
}