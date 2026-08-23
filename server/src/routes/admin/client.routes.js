import express from "express";
import { clerkClient } from "@clerk/express";

import { prisma } from "../../lib/prisma.js";
import { createAuditLog } from "../../lib/auditLog.js";
import { validate } from "../../middleware/validate.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { requireAdmin } from "../../middleware/requireAdmin.js";
import {
  inviteClientSchema,
  createClientProjectSchema,
} from "../../validators/admin/client.schema.js";

const router = express.Router();

router.use(requireAdmin);

// GET /api/admin/clients — clienți activi (Clerk, rol "client") + invitații pending
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const [userList, invitationList] = await Promise.all([
      clerkClient.users.getUserList({ limit: 200 }),
      clerkClient.invitations.getInvitationList({ status: "pending", limit: 100 }),
    ]);

    const clientUsers = userList.data.filter(
      (user) => user.publicMetadata?.role === "client"
    );

    const projectCounts = await prisma.portalProject.groupBy({
      by: ["clerkUserId"],
      _count: { _all: true },
      where: {
        clerkUserId: { in: clientUsers.map((user) => user.id) },
      },
    });

    const countByUserId = Object.fromEntries(
      projectCounts.map((row) => [row.clerkUserId, row._count._all])
    );

    const activeClients = clientUsers.map((user) => ({
      id: user.id,
      status: "ACTIVE",
      email: user.emailAddresses?.[0]?.emailAddress,
      name: [user.firstName, user.lastName].filter(Boolean).join(" ") || null,
      projectCount: countByUserId[user.id] || 0,
      createdAt: user.createdAt,
    }));

    const pendingClients = invitationList.data
      .filter((invitation) => invitation.publicMetadata?.role === "client")
      .map((invitation) => ({
        id: invitation.id,
        status: "PENDING",
        email: invitation.emailAddress,
        name: null,
        projectCount: 0,
        createdAt: invitation.createdAt,
      }));

    return res.json({
      success: true,
      data: [...pendingClients, ...activeClients].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ),
    });
  })
);

// POST /api/admin/clients/invite — invită un client nou (fără parolă, fără self-signup)
router.post(
  "/invite",
  validate(inviteClientSchema),
  asyncHandler(async (req, res) => {
    const { email, name } = req.validatedBody;

    const invitation = await clerkClient.invitations.createInvitation({
      emailAddress: email,
      publicMetadata: { role: "client", name: name || null },
      notify: true,
    });

    await createAuditLog({
      req,
      action: "CLIENT_INVITED",
      entity: "ClerkInvitation",
      entityId: invitation.id,
      metadata: { email },
    });

    return res.status(201).json({
      success: true,
      data: { id: invitation.id, email, status: "PENDING" },
    });
  })
);

// POST /api/admin/clients/:clerkUserId/projects — creează un proiect vizibil pentru un client activ
router.post(
  "/:clerkUserId/projects",
  validate(createClientProjectSchema),
  asyncHandler(async (req, res) => {
    const { clerkUserId } = req.params;
    const { name, description } = req.validatedBody;

    const user = await clerkClient.users.getUser(clerkUserId).catch(() => null);

    if (!user || user.publicMetadata?.role !== "client") {
      return res.status(404).json({
        success: false,
        message: "Client negăsit.",
      });
    }

    const project = await prisma.portalProject.create({
      data: { clerkUserId, name, description },
    });

    await createAuditLog({
      req,
      action: "CLIENT_PROJECT_CREATED",
      entity: "PortalProject",
      entityId: project.id,
      metadata: { clerkUserId, name },
    });

    return res.status(201).json({
      success: true,
      data: project,
    });
  })
);

export default router;
