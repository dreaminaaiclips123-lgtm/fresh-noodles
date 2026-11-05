"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const PULSE_MS = 5_000;
// Slower checks on a screen nobody is touching, and a full reload now and then
// so average time stays current.
const IDLE_AFTER_MS = 20 * 60_000;
const IDLE_EVERY_TICKS = 6;
const FULL_LOAD_EVERY_TICKS = 12;
const NEW_ORDER_BANNER_MS = 15_000;

type Day = {
  day: string;
  visits: number;
  seconds: number;
  orders: number;
  revenue: number;
  home: number;
  order: number;
};
type Totals = { visits: number; seconds: number; orders: number; revenue: number };
type Stats = {
  live: number;
  today: Day;
  thisWeek: Totals;
  days: Day[];
  week: string;
  weeks: string[];
  items: { name: string; qty: number }[];
  recent: {
    at: number;
    total: number;
    lines: { name: string; variant?: string; qty: number }[];
  }[];
  telegram: { tokenSet: boolean; linked: boolean };
};

const shortDate = (day: string) =>
  new Date(`${day}T12:00:00Z`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });

const orderTime = (at: number) =>
  new Date(at).toLocaleString("en-GB", {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Cairo",
  });

function avgTime({ visits, seconds }: { visits: number; seconds: number }) {
  if (!visits) return "–";
  const avg = Math.round(seconds / visits);
  return `${Math.floor(avg / 60)}m ${String(avg % 60).padStart(2, "0")}s`;
}

function Summary({ title, totals }: { title: string; totals: Totals }) {
  const rows = [
    ["Visits", totals.visits.toLocaleString()],
    ["Average time", avgTime(totals)],
    ["Orders", totals.orders.toLocaleString()],
    ["Order value", `${totals.revenue.toLocaleString()} EGP`],
  ];
  return (
    <section>
      <h2 className="font-display text-2xl tracking-wide text-ink">{title}</h2>
      <dl className="mt-3 border-t border-line">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
            <dt className="text-sm text-muted">{label}</dt>
            <dd className="text-lg font-semibold tabular-nums text-ink">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function TelegramPanel({ telegram, onLinked }: { telegram: Stats["telegram"]; onLinked: () => void }) {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const link = async () => {
    setBusy(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/telegram", { method: "POST" });
      const data = await res.json();
      setMessage(res.ok ? "Done. Check Telegram for a test message." : data.error);
      if (res.ok) onLinked();
    } catch {
      setMessage("Couldn't reach the site. Check your connection.");
    }
    setBusy(false);
  };

  return (
    <section className="border-t border-line pt-6">
      <h2 className="font-display text-2xl tracking-wide text-ink">Order alerts</h2>
      <p className="mt-2 text-sm text-muted">
        {!telegram.tokenSet
          ? "Telegram bot token isn't set yet."
          : telegram.linked
            ? "On. Telegram alerts are going to your chat."
            : "Off. Send your bot any message in Telegram, then press Connect."}
      </p>
      {telegram.tokenSet && (
        <button
          type="button"
          onClick={link}
          disabled={busy}
          className="pressable mt-4 min-h-11 rounded-full border border-line px-5 text-sm font-bold text-ink hover:border-gold disabled:opacity-60"
        >
          {telegram.linked ? "Reconnect and send test" : "Connect Telegram"}
        </button>
      )}
      {message && (
        <p role="status" className="mt-3 text-sm font-semibold text-gold">
          {message}
        </p>
      )}
    </section>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [week, setWeek] = useState("");
  const [failed, setFailed] = useState(false);
  const [newOrder, setNewOrder] = useState<number | null>(null);
  const lastStamp = useRef<string | null>(null);
  const newestOrderAt = useRef<number | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/stats${week ? `?week=${week}` : ""}`);
      if (res.status === 401) return window.location.reload();
      if (!res.ok) throw new Error();
      const data: Stats = await res.json();
      setStats(data);
      setFailed(false);
      const newest = data.recent[0];
      if (newestOrderAt.current !== null && newest && newest.at > newestOrderAt.current) {
        setNewOrder(newest.total);
      }
      newestOrderAt.current = newest?.at ?? newestOrderAt.current ?? 0;
    } catch {
      setFailed(true);
    }
  }, [week]);

  const pulse = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/pulse");
      if (res.status === 401) return window.location.reload();
      if (!res.ok) throw new Error();
      const { live, stamp }: { live: number; stamp: string } = await res.json();
      setStats((prev) => prev && { ...prev, live });
      setFailed(false);
      if (lastStamp.current !== null && lastStamp.current !== stamp) void load();
      lastStamp.current = stamp;
    } catch {
      setFailed(true);
    }
  }, [load]);

  useEffect(() => {
    let lastActive = Date.now();
    let ticks = 0;
    const markActive = () => {
      lastActive = Date.now();
    };
    const refreshNow = () => {
      if (document.visibilityState === "visible") {
        markActive();
        void load();
      }
    };

    const first = setTimeout(() => {
      void load();
      void pulse();
    }, 0);
    const timer = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      ticks += 1;
      const idle = Date.now() - lastActive > IDLE_AFTER_MS;
      if (idle && ticks % IDLE_EVERY_TICKS !== 0) return;
      if (ticks % FULL_LOAD_EVERY_TICKS === 0) void load();
      void pulse();
    }, PULSE_MS);

    document.addEventListener("visibilitychange", refreshNow);
    window.addEventListener("focus", refreshNow);
    window.addEventListener("pointerdown", markActive, { passive: true });
    window.addEventListener("keydown", markActive);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
      document.removeEventListener("visibilitychange", refreshNow);
      window.removeEventListener("focus", refreshNow);
      window.removeEventListener("pointerdown", markActive);
      window.removeEventListener("keydown", markActive);
    };
  }, [load, pulse]);

  useEffect(() => {
    if (newOrder === null) return;
    const clear = setTimeout(() => setNewOrder(null), NEW_ORDER_BANNER_MS);
    return () => clearTimeout(clear);
  }, [newOrder]);

  const signOut = async () => {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    window.location.reload();
  };

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-10">
      <header className="flex items-center justify-between gap-4">
        <p className="font-display text-2xl tracking-wide text-accent">Fresh Noodles Admin</p>
        <button type="button" onClick={signOut} className="sweep-link text-sm font-semibold text-muted">
          Sign out
        </button>
      </header>

      {newOrder !== null && (
        <p role="status" className="mt-6 rounded-xl bg-gold px-4 py-3 text-sm font-bold text-gold-ink">
          New order: {newOrder} EGP
        </p>
      )}

      {failed && (
        <p role="alert" className="mt-6 rounded-xl border border-gold px-4 py-3 text-sm font-semibold text-gold">
          Couldn&apos;t load new numbers. Retrying automatically.
        </p>
      )}

      {!stats ? (
        !failed && <p className="mt-16 text-muted">Loading</p>
      ) : (
        <>
          <section className="mt-10">
            <p className="font-display text-[clamp(5rem,20vw,9rem)] leading-none text-gold tabular-nums">
              {stats.live}
            </p>
            <h1 className="mt-1 text-lg font-semibold text-ink">Viewing the site now</h1>
            <p className="text-sm text-muted">Active in the last 45 seconds. Updates live.</p>
          </section>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <Summary title="Today" totals={stats.today} />
            <Summary title="This week" totals={stats.thisWeek} />
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <section>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl tracking-wide text-ink">Most ordered</h2>
                <label className="text-sm text-muted">
                  <span className="sr-only">Week starting</span>
                  <select
                    value={stats.week}
                    onChange={(e) => setWeek(e.target.value)}
                    className="rounded-lg border border-line bg-surface-2 px-3 py-2 text-sm text-ink"
                  >
                    {stats.weeks.map((w, i) => (
                      <option key={w} value={w}>
                        {i === 0 ? "This week" : `Week of ${shortDate(w)}`}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {stats.items.length === 0 ? (
                <p className="mt-4 border-t border-line pt-4 text-sm text-muted">No orders this week yet.</p>
              ) : (
                <ol className="mt-3 border-t border-line">
                  {stats.items.map((item, i) => (
                    <li key={item.name} className="flex items-baseline gap-3 border-b border-line py-3">
                      <span className="w-6 text-sm tabular-nums text-muted">{i + 1}</span>
                      <span className="min-w-0 flex-1 text-ink">{item.name}</span>
                      <span className="font-semibold tabular-nums text-gold">{item.qty}</span>
                    </li>
                  ))}
                </ol>
              )}
            </section>

            <section>
              <h2 className="font-display text-2xl tracking-wide text-ink">Recent orders</h2>
              {stats.recent.length === 0 ? (
                <p className="mt-4 border-t border-line pt-4 text-sm text-muted">No orders yet.</p>
              ) : (
                <ul className="mt-3 border-t border-line">
                  {stats.recent.map((order) => (
                    <li key={order.at} className="border-b border-line py-3">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-sm text-muted">{orderTime(order.at)}</span>
                        <span className="font-semibold tabular-nums text-ink">{order.total} EGP</span>
                      </div>
                      <ul className="mt-1 text-sm text-ink">
                        {order.lines.map((line, i) => (
                          <li key={i}>
                            {line.qty}x {line.name}
                            {line.variant && (
                              <span className="block text-xs text-muted">{line.variant}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-3 text-xs text-muted">
                Counts presses of Send on the website. A customer may still not send the WhatsApp message.
              </p>
            </section>
          </div>

          <section className="mt-14">
            <h2 className="font-display text-2xl tracking-wide text-ink">Last 7 days</h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[34rem] text-left text-sm">
                <thead className="text-muted">
                  <tr className="border-y border-line">
                    {["Day", "Visits", "Avg time", "Home views", "Order page views", "Orders", "Value"].map((h) => (
                      <th key={h} scope="col" className="py-2 pr-4 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="tabular-nums text-ink">
                  {stats.days.map((d) => (
                    <tr key={d.day} className="border-b border-line">
                      <th scope="row" className="py-2.5 pr-4 font-medium">{shortDate(d.day)}</th>
                      <td className="pr-4">{d.visits}</td>
                      <td className="pr-4">{avgTime(d)}</td>
                      <td className="pr-4">{d.home}</td>
                      <td className="pr-4">{d.order}</td>
                      <td className="pr-4">{d.orders}</td>
                      <td>{d.revenue.toLocaleString()} EGP</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="mt-14">
            <TelegramPanel telegram={stats.telegram} onLinked={load} />
          </div>
        </>
      )}
    </div>
  );
}
