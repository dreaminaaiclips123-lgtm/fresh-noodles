import {
  BEAT_SECONDS,
  DAY_TTL,
  cairoDay,
  keys,
  run,
  sameOrigin,
  storeReady,
  validSid,
} from "@/lib/analytics/store";

const done = () => new Response(null, { status: 204 });
const KNOWN_PATHS = new Set(["/", "/order"]);

export async function POST(req: Request) {
  if (!storeReady() || !sameOrigin(req)) return done();
  try {
    const body = JSON.parse(await req.text());
    if (!validSid(body?.sid)) return done();
    const { sid } = body;
    const now = Date.now();
    const day = cairoDay(now);
    const daily = keys.daily(day);
    const seenNow: (string | number)[][] = [
      ["ZADD", keys.live, now, sid],
      ["ZREMRANGEBYSCORE", keys.live, 0, now - 300_000],
    ];

    if (body.type === "view") {
      const path = KNOWN_PATHS.has(body.path) ? body.path : "other";
      await run([
        ...seenNow,
        ["PFADD", keys.visits(day), sid],
        ["EXPIRE", keys.visits(day), DAY_TTL],
        ["HINCRBY", daily, `views:${path}`, 1],
        ["EXPIRE", daily, DAY_TTL],
      ]);
    } else if (body.type === "beat") {
      // A session can only earn one beat's worth of time every 15 seconds.
      const [gate] = await run([["SET", keys.beatGate(sid), 1, "NX", "EX", 15]]);
      if (gate) {
        await run([
          ...seenNow,
          ["HINCRBY", daily, "seconds", BEAT_SECONDS],
          ["EXPIRE", daily, DAY_TTL],
        ]);
      }
    }
  } catch {
    // Tracking failures stay invisible to visitors.
  }
  return done();
}
