import { cookies } from "next/headers";
import { ADMIN_COOKIE, passwordMatches, sessionValue } from "@/lib/analytics/auth";
import { keys, run, sameOrigin, storeReady } from "@/lib/analytics/store";

const MAX_FAILS = 10;
const LOCK_SECONDS = 900;

export async function POST(req: Request) {
  if (!sameOrigin(req)) return Response.json({ error: "Not allowed." }, { status: 403 });
  // The lockout lives in the store, so login stays closed until it is connected.
  if (!storeReady()) return Response.json({ error: "Setup is not finished." }, { status: 503 });

  const [fails] = await run([["GET", keys.loginFails]]);
  if (Number(fails) >= MAX_FAILS) {
    return Response.json({ error: "Too many tries. Wait 15 minutes." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  if (typeof body?.password !== "string" || !passwordMatches(body.password)) {
    await run([
      ["INCR", keys.loginFails],
      ["EXPIRE", keys.loginFails, LOCK_SECONDS],
    ]);
    return Response.json({ error: "Wrong password." }, { status: 401 });
  }

  await run([["DEL", keys.loginFails]]);
  (await cookies()).set(ADMIN_COOKIE, sessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 30 * 86_400,
  });
  return Response.json({ ok: true });
}
