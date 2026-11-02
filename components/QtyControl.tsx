"use client";

import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useCart } from "./CartProvider";
import OfferPicker from "./OfferPicker";
import type { MenuItem } from "@/lib/menu";

/**
 * "Add" button that turns into a -/qty/+ stepper once the item is in the
 * cart, so a visitor can bump quantity right from the tile/row instead of
 * only seeing a total on the nav's Order Now badge. Offers with choices open
 * the OfferPicker instead; in the cart, lineVariant steps that exact line.
 */
export default function QtyControl({
  item,
  size = "md",
  lineVariant,
}: {
  item: MenuItem;
  size?: "sm" | "md";
  lineVariant?: string;
}) {
  if (item.options && lineVariant === undefined) return <OfferPicker item={item} />;
  return <Stepper item={item} size={size} variant={lineVariant} />;
}

function Stepper({
  item,
  size,
  variant,
}: {
  item: MenuItem;
  size: "sm" | "md";
  variant?: string;
}) {
  const { add, setQty, qtyFor } = useCart();
  const key = variant ? `${item.id}::${variant}` : item.id;
  const qty = qtyFor(item, variant);

  const btnSize = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const iconSize = size === "sm" ? 14 : 18;

  return (
    <div className="flex items-center gap-2">
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
