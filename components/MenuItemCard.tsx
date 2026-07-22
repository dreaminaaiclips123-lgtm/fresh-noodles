"use client";

import { IconFlame, IconPlus } from "@tabler/icons-react";
import { useCart } from "./CartProvider";
import type { MenuItem } from "@/lib/menu";

export default function MenuItemCard({ item }: { item: MenuItem }) {
  const { add } = useCart();

  return (
    <div className="menu-card flex items-start justify-between gap-4 rounded-2xl border border-line bg-surface p-5">
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <h3 className="font-semibold text-ink">{item.name}</h3>
          {item.nameKr && (
            <span className="text-sm text-muted">{item.nameKr}</span>
          )}
          {item.spicy && (
            <span className="flex items-center" aria-label={`Spice level ${item.spicy} of 3`}>
              {Array.from({ length: item.spicy }).map((_, i) => (
                <IconFlame
                  key={i}
                  size={13}
                  className="text-accent"
                  fill="currentColor"
                  aria-hidden
                />
              ))}
            </span>
          )}
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {item.description}
        </p>
        <p className="mt-3 font-display text-lg tracking-wide text-gold">
          {item.price === null ? "Ask in-store" : `${item.price} EGP`}
        </p>
      </div>

      <button
        type="button"
        onClick={() => add(item)}
        aria-label={`Add ${item.name} to order`}
        className="pressable flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink"
      >
        <IconPlus size={18} stroke={2.5} aria-hidden />
      </button>
    </div>
  );
}
