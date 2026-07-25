"use client";

import { useState } from "react";
import {
  IconBrandWhatsapp,
  IconFlame,
  IconMinus,
  IconPhone,
  IconPlus,
} from "@tabler/icons-react";
import { useCart } from "./CartProvider";
import PriceTag from "./PriceTag";
import { MENU, type MenuItem } from "@/lib/menu";
import { SITE } from "@/lib/site";

function buildWhatsAppMessage(
  lines: { item: { name: string; price: number }; variant?: string; qty: number }[],
  subtotal: number
) {
  const itemLines = lines
    .map((l) => {
      const variant = l.variant ? ` (${l.variant})` : "";
      return `• ${l.qty}x ${l.item.name}${variant} (${l.item.price} EGP)`;
    })
    .join("\n");

  return `Hi Fresh Noodles! I'd like to order:\n\n${itemLines}\n\nSubtotal: ${subtotal} EGP\n\nDelivery address: \n(Please send us your location to ensure a smooth delivery process.)`;
}

function QtyControl({ item }: { item: MenuItem }) {
  const { add, setQty, qtyFor } = useCart();
  const [choice, setChoice] = useState(item.options?.choices[0] ?? "");
  const variant = item.options ? choice : undefined;
  const key = item.options ? `${item.id}::${choice}` : item.id;
  const qty = qtyFor(item, variant);

  return (
    <div className="flex items-center gap-3">
      {item.options && (
        <select
          value={choice}
          onChange={(e) => setChoice(e.target.value)}
          className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-sm text-ink"
        >
          {item.options.choices.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      )}

      {qty === 0 ? (
        <button
          type="button"
          onClick={() => add(item, variant)}
          className="pressable rounded-full border border-line px-4 py-1.5 text-sm font-bold text-ink hover:border-accent"
        >
          Add
        </button>
      ) : (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQty(key, qty - 1)}
            aria-label={`Decrease ${item.name} quantity`}
            className="pressable flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink hover:border-accent"
          >
            <IconMinus size={14} aria-hidden />
          </button>
          <span className="w-4 text-center font-semibold text-ink">{qty}</span>
          <button
            type="button"
            onClick={() => add(item, variant)}
            aria-label={`Increase ${item.name} quantity`}
            className="pressable flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink hover:border-accent"
          >
            <IconPlus size={14} aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}

function OrderRow({ item }: { item: MenuItem }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line py-4">
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <h4 className="font-semibold text-ink">{item.name}</h4>
          {item.spicy && (
            <span className="flex items-center" aria-label={`Spice level ${item.spicy} of 3`}>
              {Array.from({ length: item.spicy }).map((_, i) => (
                <IconFlame key={i} size={12} className="text-accent" fill="currentColor" aria-hidden />
              ))}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-muted">{item.description}</p>
        <div className="mt-1">
          <PriceTag item={item} />
        </div>
      </div>
      <QtyControl item={item} />
    </div>
  );
}

export default function OrderMenu() {
  const { lines, count, subtotal, remove } = useCart();

  const waHref = `https://wa.me/${SITE.orderWhatsappNumber}?text=${encodeURIComponent(
    buildWhatsAppMessage(lines, subtotal)
  )}`;

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px]">
      <div>
        {MENU.map((category) => (
          <div key={category.id} className="mb-12">
            <h3 className="font-display text-2xl tracking-wide text-ink">
              {category.title}
            </h3>
            <div className="mt-2">
              {category.items.map((item) => (
                <OrderRow key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <aside className="h-fit rounded-2xl border border-line bg-surface p-6 lg:sticky lg:top-24">
        <h3 className="font-display text-2xl tracking-wide text-ink">
          Your Order
        </h3>

        {lines.length === 0 ? (
          <p className="mt-4 text-muted">
            Nothing yet — add something spicy from the menu.
          </p>
        ) : (
          <ul className="mt-4 flex flex-col gap-3">
            {lines.map((l) => (
              <li key={l.key} className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {l.qty}x {l.item.name}
                    {l.variant && <span className="text-muted"> ({l.variant})</span>}
                  </p>
                  <p className="text-xs text-muted">{l.item.price} EGP each</p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(l.key)}
                  className="sweep-link text-xs font-semibold text-muted hover:text-accent"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        {lines.length > 0 && (
          <div className="mt-5 flex items-baseline justify-between border-t border-line pt-4">
            <span className="text-sm font-semibold uppercase tracking-wide text-muted">
              Subtotal ({count})
            </span>
            <span className="font-display text-2xl text-gold">{subtotal} EGP</span>
          </div>
        )}

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={lines.length === 0}
          onClick={(e) => {
            if (lines.length === 0) e.preventDefault();
          }}
          className={`pressable mt-5 flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-bold ${
            lines.length === 0
              ? "cursor-not-allowed bg-surface-2 text-muted"
              : "bg-accent text-accent-ink"
          }`}
        >
          <IconBrandWhatsapp size={22} aria-hidden />
          Send order on WhatsApp
        </a>
        <a
          href={`tel:+${SITE.whatsappNumber}`}
          className="pressable mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-line px-6 py-4 text-base font-bold text-ink hover:border-gold"
        >
          <IconPhone size={20} aria-hidden />
          Call to order — {SITE.phoneDisplay}
        </a>
        <p className="mt-3 text-center text-xs text-muted">
          No payment is taken on this site — orders are confirmed over WhatsApp or by phone.
        </p>
      </aside>
    </div>
  );
}
