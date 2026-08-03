"use client";

import { useState } from "react";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useCart } from "./CartProvider";
import type { MenuItem } from "@/lib/menu";

/**
 * "Add" button that turns into a -/qty/+ stepper once the item is in the
 * cart, so a visitor can bump quantity right from the tile/row instead of
 * only seeing a total on the nav's Order Now badge.
 */
export default function QtyControl({
  item,
  size = "md",
}: {
  item: MenuItem;
  size?: "sm" | "md";
}) {
  const { add, setQty, qtyFor } = useCart();
  const [choice, setChoice] = useState(item.options?.choices[0] ?? "");
  const variant = item.options ? choice : undefined;
  const key = item.options ? `${item.id}::${choice}` : item.id;
  const qty = qtyFor(item, variant);

  const btnSize = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const iconSize = size === "sm" ? 14 : 18;

  return (
    <div className="flex items-center gap-2">
      {item.options && (
        <select
          value={choice}
          onChange={(e) => setChoice(e.target.value)}
          onClick={(e) => e.stopPropagation()}
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
          aria-label={`Add ${item.name} to order`}
          className={`pressable flex ${btnSize} items-center justify-center rounded-full bg-accent text-accent-ink shadow-lg`}
        >
          <IconPlus size={iconSize} stroke={2.5} aria-hidden />
        </button>
      ) : (
        <div className="flex items-center gap-2 rounded-full bg-accent px-1 py-1 text-accent-ink shadow-lg">
          <button
            type="button"
            onClick={() => setQty(key, qty - 1)}
            aria-label={`Decrease ${item.name} quantity`}
            className={`pressable flex ${btnSize} items-center justify-center rounded-full`}
          >
            <IconMinus size={iconSize} stroke={2.5} aria-hidden />
          </button>
          <span className="min-w-[1.25rem] text-center text-sm font-bold">{qty}</span>
          <button
            type="button"
            onClick={() => add(item, variant)}
            aria-label={`Increase ${item.name} quantity`}
            className={`pressable flex ${btnSize} items-center justify-center rounded-full`}
          >
            <IconPlus size={iconSize} stroke={2.5} aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}
