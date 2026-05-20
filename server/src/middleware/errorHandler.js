import { isProduction } from "../config/env.js";

// Middleware central pentru erori.
// Dacă apare o eroare într-o rută, ajunge aici.
export function errorHandler(error, req, res, next) {
  // În terminal păstrăm eroarea pentru debug.
  console.error(error);

  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,

    // În producție nu arătăm detalii tehnice utilizatorului.
    message: isProduction
      ? "A apărut o eroare pe server."
      : error.message || "Server error.",

    // Stack trace doar local, nu în production.
    ...(isProduction ? {} : { stack: error.stack }),
  });
}