import { isAdmin } from "@/lib/analytics/auth";
import { LIVE_WINDOW_MS, cairoDay, keys, run } from "@/lib/analytics/store";

// A small check the dashboard can repeat often. The full stats load only when
// this says something changed, which keeps database use low.
export async function GET() {
  if (!(await isAdmin())) return Response.json({ error: "Sign in again." }, { status: 401 });

  const now = Date.now();
  const day = cairoDay(now);
  const [live, orders, visits] = await run([
    ["ZCOUNT", keys.live, now - LIVE_WINDOW_MS, now],
    ["HGET", keys.daily(day), "orders"],
    ["PFCOUNT", keys.visits(day)],
  ]);

  return Response.json(
    { live: Number(live) || 0, stamp: `${day}:${Number(orders) || 0}:${Number(visits) || 0}` },
    { headers: { "Cache-Control": "no-store" } }
  );
}
