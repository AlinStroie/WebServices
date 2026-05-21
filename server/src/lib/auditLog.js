import crypto from "crypto";

import { prisma } from "./prisma.js";

function hashValue(value) {
  if (!value) return null;

  return crypto
    .createHash("sha256")
    .update(String(value))
    .digest("hex");
}

export async function createAuditLog({
  req,
  action,
  entity = null,
  entityId = null,
  metadata = undefined,
}) {
  try {
    await prisma.adminAuditLog.create({
      data: {
        adminId: req.admin?.id || null,
        action,
        entity,
        entityId,
        metadata,
        ipHash: hashValue(req.ip),
        userAgent: req.headers["user-agent"] || null,
      },
    });
  } catch {
    // Audit log nu trebuie să blocheze acțiunea principală.
  }
}