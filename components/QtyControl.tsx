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
  lineVariant,
}: {
  item: MenuItem;
  size?: "sm" | "md";
  /** Set in the cart: steps this exact line, with no selectors. */
  lineVariant?: string;
}) {
  const { add, setQty, qtyFor } = useCart();
  const [picks, setPicks] = useState(
    () => item.options?.map((o) => o.choices[0]) ?? []
  );
  const showOptions = item.options && lineVariant === undefined;
  const variant =
    lineVariant ??
    item.options?.map((o, i) => `${o.label}: ${picks[i]}`).join(", ");
  const key = variant ? `${item.id}::${variant}` : item.id;
  const qty = qtyFor(item, variant);

  const btnSize = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const iconSize = size === "sm" ? 14 : 18;

  return (
    <div
      className={
        showOptions
          ? "flex w-full flex-wrap items-end justify-end gap-3"
          : "flex items-center gap-2"
      }
    >
      {showOptions && (
        <div className="grid min-w-0 flex-1 basis-full grid-cols-1 gap-2 sm:grid-cols-2">
          {item.options!.map((option, i) => (
            <label key={option.label} className="min-w-0 text-xs font-semibold text-muted">
              {option.label}
              <select
                value={picks[i]}
                onChange={(e) =>
                  setPicks((prev) =>
                    prev.map((p, j) => (j === i ? e.target.value : p))
                  )
                }
                onClick={(e) => e.stopPropagation()}
                className="mt-1 block w-full min-w-0 truncate rounded-full border border-line bg-surface-2 px-3 py-1.5 text-sm font-normal text-ink"
              >
                {option.choices.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
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
