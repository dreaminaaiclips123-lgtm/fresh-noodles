"use client";

import { IconFlame } from "@tabler/icons-react";
import PriceTag from "./PriceTag";
import QtyControl from "./QtyControl";
import { MENU, type MenuItem } from "@/lib/menu";

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
      <QtyControl item={item} size="sm" />
    </div>
  );
}

export default function OrderMenu() {
  return (
    <div className="mx-auto max-w-3xl">
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
  );
}
