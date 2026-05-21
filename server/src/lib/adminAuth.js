import jwt from "jsonwebtoken";

import { env, isProduction } from "../config/env.js";

const ADMIN_TOKEN_EXPIRES_IN = "8h";
const ADMIN_COOKIE_MAX_AGE = 1000 * 60 * 60 * 8;

export function getAdminCookieName() {
  return env.ADMIN_COOKIE_NAME || "asquared_admin_token";
}

export function signAdminToken(admin) {
  return jwt.sign(
    {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    },
    env.ADMIN_JWT_SECRET,
    {
      expiresIn: ADMIN_TOKEN_EXPIRES_IN,
    }
  );
}

export function verifyAdminToken(token) {
  return jwt.verify(token, env.ADMIN_JWT_SECRET);
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: ADMIN_COOKIE_MAX_AGE,
    path: "/",
  };
}

export function clearAdminCookieOptions() {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
  };
}