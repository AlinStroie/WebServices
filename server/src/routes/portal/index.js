import express from "express";

import projectRoutes from "./project.routes.js";
import { requireClientAuth } from "../../middleware/requireClientAuth.js";
import { getAuth, clerkClient } from "@clerk/express";
import { asyncHandler } from "../../middleware/asyncHandler.js";

const router = express.Router();

router.get(
  "/auth/me",
  requireClientAuth,
  asyncHandler(async (req, res) => {
    const { userId } = getAuth(req);
    const user = await clerkClient.users.getUser(userId);

    return res.json({
      success: true,
      data: {
        id: user.id,
        email: user.emailAddresses?.[0]?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  })
);

router.use("/projects", requireClientAuth, projectRoutes);

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Portal API is running.",
  });
});

export default router;
