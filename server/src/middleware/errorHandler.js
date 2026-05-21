import { isProduction } from "../config/env.js";

// Middleware global pentru erori.
// În development afișează și stack trace.
// În production ascunde detaliile tehnice.
export function errorHandler(err, req, res, next) {
  console.error(err);

  const statusCode = err.statusCode || err.status || 500;

  const message =
    isProduction && statusCode === 500
      ? "A apărut o eroare internă."
      : err.message || "A apărut o eroare.";

  return res.status(statusCode).json({
    success: false,
    message,
    ...(!isProduction && {
      stack: err.stack,
    }),
  });
}