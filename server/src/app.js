import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import compression from "compression";
import hpp from "hpp";
import adminRoutes from "./routes/admin/index.js";

import blogRoutes from "./routes/blog.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";

import { env, isProduction } from "./config/env.js";
import { globalLimiter } from "./middleware/rateLimiters.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import seoRoutes from "./routes/seo.routes.js";

export const app = express();

app.set("trust proxy", 1);

// Headere de securitate
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// Permitem frontendul pe 5173 și 5174
const allowedOrigins = [
  env.CLIENT_URL,
  "https://asquaredstudio.ro",
  "https://www.asquaredstudio.ro",
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Comprimă răspunsurile
app.use(compression());

// Cookie parser
app.use(cookieParser());

// JSON body
app.use(express.json({ limit: "1mb" }));

// Form body
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Protecție împotriva HTTP Parameter Pollution
app.use(hpp());

// Rate limit global
app.use(globalLimiter);

// Loguri doar în development
if (!isProduction) {
  app.use(morgan("dev"));
}

// Test root
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "WebServices API is running.",
    health: "/api/health",
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "ok",
    message: "Backend is running.",
  });
});

// SEO routes
app.use("/", seoRoutes);

// Rute API
app.use("/api/blog", blogRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/admin", adminRoutes);

// 404
app.use(notFound);

// Error handler
app.use(errorHandler);