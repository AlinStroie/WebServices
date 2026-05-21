import express from "express";

import authRoutes from "./auth.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import contactRoutes from "./contact.routes.js";
import analyticsRoutes from "./analytics.routes.js";
import blogRoutes from "./blog.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/contact-submissions", contactRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/blog", blogRoutes);

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Admin API is running.",
  });
});

export default router;