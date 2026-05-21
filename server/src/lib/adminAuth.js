import jwt from "jsonwebtoken";

import { env, isProduction } from "../config/env.js";

const ADMIN_COOKIE_NAME = env.ADMIN_COOKIE_NAME || "asquared_admin_token";

export function signAdminToken(admin) {
  return jwt.sign(
    {
      sub: admin.id,
      email: admin.email,
      role: admin.role,
    },
    env.ADMIN_JWT_SECRET,
    {
      expiresIn: "8h",
    }
  );
}

export function verifyAdminToken(token) {
  return jwt.verify(token, env.ADMIN_JWT_SECRET);
}

export function getAdminCookieName() {
  return ADMIN_COOKIE_NAME;
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
    path: "/",
    maxAge: 8 * 60 * 60 * 1000,
  };
}

export function clearAdminCookieOptions() {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
    path: "/",
  };
}