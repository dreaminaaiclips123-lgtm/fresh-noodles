import { isAdmin } from "@/lib/analytics/auth";
import {
  LIVE_WINDOW_MS,
  addDays,
  cairoDay,
  hashToNumbers,
  keys,
  run,
  weekOf,
} from "@/lib/analytics/store";
import { telegramReady } from "@/lib/analytics/telegram";

const WEEKS_SHOWN = 8;

export async function GET(req: Request) {
  if (!(await isAdmin())) return Response.json({ error: "Sign in again." }, { status: 401 });

  const now = Date.now();
  const today = cairoDay(now);
  const thisWeek = weekOf(today);
  const weeks = Array.from({ length: WEEKS_SHOWN }, (_, i) => addDays(thisWeek, -7 * i));
  const asked = new URL(req.url).searchParams.get("week");
  const week = asked && weeks.includes(asked) ? asked : thisWeek;
  const days = Array.from({ length: 7 }, (_, i) => addDays(today, -i));
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(thisWeek, i)).filter((d) => d <= today);

  const results = await run([
    ["ZCOUNT", keys.live, now - LIVE_WINDOW_MS, now],
    ["HGETALL", keys.weekItems(week)],
    ["LRANGE", keys.recentOrders, 0, 19],
    ["GET", keys.telegramChat],
    ["PFCOUNT", ...weekDays.map(keys.visits)],
    ...days.flatMap((d) => [["PFCOUNT", keys.visits(d)], ["HGETALL", keys.daily(d)]]),
    ...weekDays.map((d) => ["HGETALL", keys.daily(d)]),
  ]);

  const [live, items, recent, chat, weekVisits] = results;
  const dayResults = results.slice(5, 5 + days.length * 2);
  const weekDailies = results.slice(5 + days.length * 2).map(hashToNumbers);

  const dayRows = days.map((day, i) => {
    const daily = hashToNumbers(dayResults[i * 2 + 1]);
    return {
      day,
      visits: Number(dayResults[i * 2]) || 0,
      seconds: daily.seconds ?? 0,
      orders: daily.orders ?? 0,
      revenue: daily.revenue ?? 0,
      home: daily["views:/"] ?? 0,
      order: daily["views:/order"] ?? 0,
    };
  });
  const sum = (field: string) => weekDailies.reduce((n, d) => n + (d[field] ?? 0), 0);

  return Response.json(
    {
      live: Number(live) || 0,
      today: dayRows[0],
      thisWeek: {
        visits: Number(weekVisits) || 0,
        seconds: sum("seconds"),
        orders: sum("orders"),
        revenue: sum("revenue"),
      },
      days: dayRows,
      week,
      weeks,
      items: Object.entries(hashToNumbers(items))
        .map(([name, qty]) => ({ name, qty }))
        .sort((a, b) => b.qty - a.qty),
      recent: (Array.isArray(recent) ? recent : []).map((r) => JSON.parse(String(r))),
      telegram: { tokenSet: telegramReady(), linked: Boolean(chat) },
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
