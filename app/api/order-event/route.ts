import { ALL_ITEMS, cartUnitPrice, type MenuItem } from "@/lib/menu";
import { SITE } from "@/lib/site";
import {
  DAY_TTL,
  WEEK_TTL,
  cairoDay,
  keys,
  run,
  sameOrigin,
  storeReady,
  validSid,
  weekOf,
} from "@/lib/analytics/store";
import { sendTelegram, telegramReady } from "@/lib/analytics/telegram";

const MAX_ALERTS_PER_HOUR = 30;
const done = () => new Response(null, { status: 204 });

// A choice must be one the menu offers, so nobody can put their own text in the alert.
function validVariant(item: MenuItem, variant: unknown) {
  if (!item.options) return variant === undefined;
  if (typeof variant !== "string" || variant.length > 500) return false;
  const parts = variant.split(", ");
  if (parts.length !== item.options.length) return false;
  return item.options.every((option, i) => {
    const prefix = `${option.label}: `;
    if (!parts[i].startsWith(prefix)) return false;
    const value = parts[i].slice(prefix.length);
    if (!option.pick) return option.choices.includes(value);
    const picks = value.split(" + ").map((p) => p.match(/^(\d+)x (.+)$/));
    const total = picks.reduce((n, m) => n + Number(m?.[1] ?? 0), 0);
    return total === option.pick && picks.every((m) => m && option.choices.includes(m[2]));
  });
}

type Line = { item: MenuItem; variant?: string; qty: number };

function parseLines(raw: unknown): Line[] | null {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > 40) return null;
  const lines: Line[] = [];
  for (const entry of raw) {
    const item = ALL_ITEMS.find((i) => i.id === entry?.id);
    const qty = entry?.qty;
    if (!item || !Number.isInteger(qty) || qty < 1 || qty > 50) return null;
    if (!validVariant(item, entry.variant)) return null;
    lines.push({ item, variant: entry.variant, qty });
  }
  return lines;
}

function alertText(lines: Line[], food: number, delivery: number) {
  const items = lines
    .map((l) => {
      const choices = l.variant ? `\n${l.variant.split(", ").map((c) => `   ${c}`).join("\n")}` : "";
      return `${l.qty}x ${l.item.name}${choices}`;
    })
    .join("\n");
  return [
    "New website order (Send pressed)",
    "",
    items,
    "",
    `Food: ${food} EGP`,
    `Delivery: ${delivery ? `${delivery} EGP` : "Free"}`,
    `Total: ${food + delivery} EGP`,
    "",
    "The customer should message on WhatsApp next.",
  ].join("\n");
}

export async function POST(req: Request) {
  if (!storeReady() || !sameOrigin(req)) return done();
  try {
    const body = JSON.parse(await req.text());
    const lines = parseLines(body?.lines);
    if (!validSid(body?.sid) || !lines) return done();

    // A double tap on the button counts as one order.
    const [gate] = await run([["SET", keys.orderGate(body.sid), 1, "NX", "EX", 5]]);
    if (!gate) return done();

    const now = Date.now();
    const day = cairoDay(now);
    const daily = keys.daily(day);
    const weekItems = keys.weekItems(weekOf(day));
    const food = lines.reduce((n, l) => n + cartUnitPrice(l.item) * l.qty, 0);
    const delivery = food >= SITE.freeDeliveryThreshold ? 0 : SITE.deliveryFee;
    const record = {
      at: now,
      total: food + delivery,
      lines: lines.map((l) => ({ name: l.item.name, variant: l.variant, qty: l.qty })),
    };
    const hour = Math.floor(now / 3_600_000);

    const results = await run([
      ["LPUSH", keys.recentOrders, JSON.stringify(record)],
      ["LTRIM", keys.recentOrders, 0, 99],
      ["HINCRBY", daily, "orders", 1],
      ["HINCRBY", daily, "revenue", food + delivery],
      ["EXPIRE", daily, DAY_TTL],
      ...lines.map((l) => ["HINCRBY", weekItems, l.item.name, l.qty]),
      ["EXPIRE", weekItems, WEEK_TTL],
      ["GET", keys.telegramChat],
      ["INCR", keys.alertHour(hour)],
      ["EXPIRE", keys.alertHour(hour), 7200],
    ]);
    const chatId = results.at(-3);
    const alertsThisHour = Number(results.at(-2));

    if (telegramReady() && chatId && alertsThisHour <= MAX_ALERTS_PER_HOUR) {
      await sendTelegram(String(chatId), alertText(lines, food, delivery));
    }
  } catch {
    // The customer is already on their way to WhatsApp; nothing to show them.
  }
  return done();
}
