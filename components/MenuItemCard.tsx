"use client";

import { IconFlame } from "@tabler/icons-react";
import PriceTag from "./PriceTag";
import QtyControl from "./QtyControl";
import type { MenuItem } from "@/lib/menu";

export default function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <div className="menu-card flex items-start justify-between gap-4 rounded-2xl border border-line bg-surface p-5">
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <h3 className="font-semibold text-ink">{item.name}</h3>
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
        <div className="mt-3">
          <PriceTag item={item} />
        </div>
      </div>

      <QtyControl item={item} size="sm" />
    </div>
  );
}
