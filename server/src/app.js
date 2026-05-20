import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import compression from "compression";
import hpp from "hpp";
import blogRoutes from "./routes/blog.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";

import { env, isProduction } from "./config/env.js";
import { globalLimiter } from "./middleware/rateLimiters.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Creăm aplicația Express.
export const app = express();

// Important când aplicația rulează în spatele unui proxy,
// cum se întâmplă pe hostinguri precum Render/Railway/Vercel etc.
app.set("trust proxy", 1);

// Helmet adaugă headere de securitate.
// Ajută la protecție împotriva unor atacuri comune.
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// CORS controlează cine are voie să facă requesturi către backend.
// Aici permitem doar frontendul nostru.
app.use(
  cors({
    origin: env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Comprimă răspunsurile pentru performanță.
app.use(compression());

// Permite citirea cookie-urilor.
// Va fi util pentru admin auth mai târziu.
app.use(cookieParser());

// Permite backendului să citească JSON din body.
// Limităm la 1mb ca să evităm requesturi foarte mari.
app.use(express.json({ limit: "1mb" }));

// Permite și form-urlencoded, dacă va fi nevoie.
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Protecție împotriva HTTP Parameter Pollution.
// Exemplu: ?id=1&id=2
app.use(hpp());

// Rate limit global pe tot API-ul.
app.use(globalLimiter);

// Morgan afișează requesturile în terminal,
// dar doar în development.
if (!isProduction) {
  app.use(morgan("dev"));
}

// Rută simplă pentru verificare.
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "WebServices API is running.",
    health: "/api/health",
  });
});

// Rută de health check.
// O folosim ca să verificăm rapid dacă backendul merge.
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "ok",
    message: "Backend is running.",
  });
});

// Rutele reale ale aplicației.
app.use("/api/blog", blogRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/analytics", analyticsRoutes);

// Dacă nicio rută nu s-a potrivit, ajunge aici.
app.use(notFound);

// Dacă apare o eroare, ajunge aici.
app.use(errorHandler);