"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AdminStrings } from "@/lib/admin-i18n";
import { LanguageButton, useAdminStrings } from "./AdminFrame";

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

const shortDate = (day: string, t: AdminStrings) =>
  new Date(`${day}T12:00:00Z`).toLocaleDateString(t.locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });

const orderTime = (at: number, t: AdminStrings) =>
  new Date(at).toLocaleString(t.locale, {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Cairo",
  });

const money = (amount: number, t: AdminStrings) =>
  `${amount.toLocaleString("en-US")} ${t.currency}`;

function avgTime({ visits, seconds }: { visits: number; seconds: number }, t: AdminStrings) {
  if (!visits) return "–";
  const avg = Math.round(seconds / visits);
  return `${Math.floor(avg / 60)}${t.minuteUnit} ${String(avg % 60).padStart(2, "0")}${t.secondUnit}`;
}

function Summary({ title, totals }: { title: string; totals: Totals }) {
  const { t } = useAdminStrings();
  const rows = [
    [t.visits, totals.visits.toLocaleString("en-US")],
    [t.averageTime, avgTime(totals, t)],
    [t.orders, totals.orders.toLocaleString("en-US")],
    [t.orderValue, money(totals.revenue, t)],
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
  const { t } = useAdminStrings();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const link = async () => {
    setBusy(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/telegram", { method: "POST" });
      const data = await res.json();
      setMessage(res.ok ? t.telegramDone : (t.serverErrors[data.error] ?? data.error));
      if (res.ok) onLinked();
    } catch {
      setMessage(t.connectionError);
    }
    setBusy(false);
  };

  return (
    <section className="border-t border-line pt-6">
      <h2 className="font-display text-2xl tracking-wide text-ink">{t.orderAlerts}</h2>
      <p className="mt-2 text-sm text-muted">
        {!telegram.tokenSet
          ? t.tokenMissing
          : telegram.linked
            ? t.alertsOn
            : t.alertsOff}
      </p>
      {telegram.tokenSet && !telegram.linked && (
        <button
          type="button"
          onClick={link}
          disabled={busy}
          className="pressable mt-4 min-h-11 rounded-full border border-line px-5 text-sm font-bold text-ink hover:border-gold disabled:opacity-60"
        >
          {t.connect}
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

function ResetPanel({ onReset }: { onReset: () => void }) {
  const { t } = useAdminStrings();
  const [asking, setAsking] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const reset = async () => {
    setBusy(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirm: "RESET" }),
      });
      const data = await res.json();
      setMessage(res.ok ? t.statsCleared : (t.serverErrors[data.error] ?? data.error));
      if (res.ok) onReset();
    } catch {
      setMessage(t.connectionError);
    }
    setAsking(false);
    setBusy(false);
  };

  return (
    <section className="mt-10 border-t border-line pt-6 pb-10">
      <h2 className="font-display text-2xl tracking-wide text-ink">{t.resetTitle}</h2>
      <p className="mt-2 text-sm text-muted">
        {t.resetNote}
      </p>
      {asking ? (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <p className="w-full text-sm font-semibold text-gold">{t.resetAsk}</p>
          <button
            type="button"
            onClick={reset}
            disabled={busy}
            className="pressable min-h-11 rounded-full bg-accent px-5 text-sm font-bold text-accent-ink disabled:opacity-60"
          >
            {busy ? t.resetBusy : t.resetYes}
          </button>
          <button
            type="button"
            onClick={() => setAsking(false)}
            disabled={busy}
            className="pressable min-h-11 rounded-full border border-line px-5 text-sm font-bold text-ink hover:border-gold"
          >
            {t.cancel}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            setMessage("");
            setAsking(true);
          }}
          className="pressable mt-4 min-h-11 rounded-full border border-line px-5 text-sm font-bold text-ink hover:border-gold"
        >
          {t.resetTitle}
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
  const { t } = useAdminStrings();
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
        <p className="font-display text-2xl tracking-wide text-accent">{t.dashboardTitle}</p>
        <div className="flex shrink-0 items-center gap-4">
          <LanguageButton />
          <button type="button" onClick={signOut} className="sweep-link text-sm font-semibold text-muted">
            {t.signOut}
          </button>
        </div>
      </header>

      {newOrder !== null && (
        <p role="status" className="mt-6 rounded-xl bg-gold px-4 py-3 text-sm font-bold text-gold-ink">
          {t.newOrder}: {money(newOrder, t)}
        </p>
      )}

      {failed && (
        <p role="alert" className="mt-6 rounded-xl border border-gold px-4 py-3 text-sm font-semibold text-gold">
          {t.loadFailed}
        </p>
      )}

      {!stats ? (
        !failed && <p className="mt-16 text-muted">{t.loading}</p>
      ) : (
        <>
          <section className="mt-10">
            <p className="font-display text-[clamp(5rem,20vw,9rem)] leading-none text-gold tabular-nums">
              {stats.live}
            </p>
            <h1 className="mt-1 text-lg font-semibold text-ink">{t.viewingNow}</h1>
            <p className="text-sm text-muted">{t.viewingNote}</p>
          </section>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <Summary title={t.today} totals={stats.today} />
            <Summary title={t.thisWeek} totals={stats.thisWeek} />
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <section>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl tracking-wide text-ink">{t.mostOrdered}</h2>
                <label className="text-sm text-muted">
                  <span className="sr-only">{t.weekStarting}</span>
                  <select
                    value={stats.week}
                    onChange={(e) => setWeek(e.target.value)}
                    className="rounded-lg border border-line bg-surface-2 px-3 py-2 text-sm text-ink"
                  >
                    {stats.weeks.map((w, i) => (
                      <option key={w} value={w}>
                        {i === 0 ? t.thisWeek : `${t.weekOf} ${shortDate(w, t)}`}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {stats.items.length === 0 ? (
                <p className="mt-4 border-t border-line pt-4 text-sm text-muted">{t.noOrdersThisWeek}</p>
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
              <h2 className="font-display text-2xl tracking-wide text-ink">{t.recentOrders}</h2>
              {stats.recent.length === 0 ? (
                <p className="mt-4 border-t border-line pt-4 text-sm text-muted">{t.noOrdersYet}</p>
              ) : (
                <ul className="mt-3 border-t border-line">
                  {stats.recent.map((order) => (
                    <li key={order.at} className="border-b border-line py-3">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-sm text-muted">{orderTime(order.at, t)}</span>
                        <span className="font-semibold tabular-nums text-ink">{money(order.total, t)}</span>
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
                {t.sendNote}
              </p>
            </section>
          </div>

          <section className="mt-14">
            <h2 className="font-display text-2xl tracking-wide text-ink">{t.last7Days}</h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[34rem] text-start text-sm">
                <thead className="text-muted">
                  <tr className="border-y border-line">
                    {[t.day, t.visits, t.avgTime, t.homeViews, t.orderPageViews, t.orders, t.value].map((h) => (
                      <th key={h} scope="col" className="py-2 pe-4 text-start font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="tabular-nums text-ink">
                  {stats.days.map((d) => (
                    <tr key={d.day} className="border-b border-line">
                      <th scope="row" className="py-2.5 pe-4 text-start font-medium">{shortDate(d.day, t)}</th>
                      <td className="pe-4">{d.visits}</td>
                      <td className="pe-4">{avgTime(d, t)}</td>
                      <td className="pe-4">{d.home}</td>
                      <td className="pe-4">{d.order}</td>
                      <td className="pe-4">{d.orders}</td>
                      <td>{money(d.revenue, t)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="mt-14">
            <TelegramPanel telegram={stats.telegram} onLinked={load} />
          </div>

          <ResetPanel onReset={load} />
        </>
      )}
    </div>
  );
}
