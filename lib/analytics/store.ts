// Thin client for the Upstash Redis REST API, plus the key names and dates the
// analytics share. Everything here is server-only and holds no personal data.

const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

export const storeReady = () => Boolean(url && token);

type Command = (string | number)[];

/** Runs commands in order and returns each result, or null if a command failed. */
export async function run(commands: Command[]): Promise<unknown[]> {
  if (!url || !token) throw new Error("Analytics store is not configured");
  const res = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
    cache: "no-store",
    signal: AbortSignal.timeout(4000),
  });
  if (!res.ok) throw new Error(`Analytics store returned ${res.status}`);
  const data = (await res.json()) as { result?: unknown; error?: string }[];
  return data.map((d) => (d.error ? null : (d.result ?? null)));
}

/** Redis returns hashes as a flat [field, value, ...] list. */
export function hashToNumbers(flat: unknown): Record<string, number> {
  const out: Record<string, number> = {};
  if (!Array.isArray(flat)) return out;
  for (let i = 0; i + 1 < flat.length; i += 2) out[String(flat[i])] = Number(flat[i + 1]) || 0;
  return out;
}

const DAY_MS = 86_400_000;
export const DAY_TTL = 120 * 86_400;
export const WEEK_TTL = 400 * 86_400;

export const cairoDay = (at = Date.now()) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Cairo" }).format(at);

const dayToUtc = (day: string) => Date.parse(`${day}T00:00:00Z`);
const utcToDay = (ms: number) => new Date(ms).toISOString().slice(0, 10);

export const addDays = (day: string, n: number) => utcToDay(dayToUtc(day) + n * DAY_MS);

/** Weeks run Sunday to Saturday, named by their Sunday. */
export const weekOf = (day: string) => addDays(day, -new Date(dayToUtc(day)).getUTCDay());

export const keys = {
  live: "fn:live",
  recentOrders: "fn:orders:recent",
  telegramChat: "fn:telegram:chat",
  loginFails: "fn:login:fails",
  visits: (day: string) => `fn:visits:${day}`,
  daily: (day: string) => `fn:daily:${day}`,
  weekItems: (week: string) => `fn:items:${week}`,
  beatGate: (sid: string) => `fn:beat:${sid}`,
  orderGate: (sid: string) => `fn:ordergate:${sid}`,
  alertHour: (hour: number) => `fn:alerts:${hour}`,
};

export const LIVE_WINDOW_MS = 45_000;
export const BEAT_SECONDS = 20;

/** Rejects posts from other websites; a browser always sends Origin on POST. */
export function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

export const validSid = (sid: unknown): sid is string =>
  typeof sid === "string" && /^[a-z0-9-]{8,40}$/.test(sid);
