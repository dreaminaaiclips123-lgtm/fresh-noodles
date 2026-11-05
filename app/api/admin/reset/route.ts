import { isAdmin } from "@/lib/analytics/auth";
import { keys, run, sameOrigin } from "@/lib/analytics/store";

const KEEP = new Set<string>([keys.telegramChat, keys.loginFails]);

export async function POST(req: Request) {
  if (!sameOrigin(req) || !(await isAdmin())) {
    return Response.json({ error: "Sign in again." }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  if (body?.confirm !== "RESET") {
    return Response.json({ error: "Reset wasn't confirmed." }, { status: 400 });
  }
  try {
    let cursor = "0";
    do {
      const [page] = await run([["SCAN", cursor, "MATCH", "fn:*", "COUNT", 500]]);
      const [next, found] = page as [string, string[]];
      cursor = String(next);
      const stats = found.filter((key) => !KEEP.has(key));
      if (stats.length) await run([["DEL", ...stats]]);
    } while (cursor !== "0");
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Stats reset failed:", err instanceof Error ? err.message : "unknown");
    return Response.json({ error: "Reset didn't finish. Try again." }, { status: 502 });
  }
}
