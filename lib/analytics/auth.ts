import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "fn_admin";
const password = process.env.ADMIN_PASSWORD;

const safeEqual = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

/** Changing ADMIN_PASSWORD signs every device out. */
export const sessionValue = () =>
  createHmac("sha256", password ?? "").update("fn-admin-session-v1").digest("hex");

export const passwordMatches = (attempt: string) =>
  Boolean(password) && safeEqual(attempt, password ?? "");

export async function isAdmin() {
  if (!password) return false;
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  return Boolean(value) && safeEqual(value ?? "", sessionValue());
}
