"use client";

import { IconShoppingBag } from "@tabler/icons-react";
import { useCart } from "./CartProvider";
import { SITE } from "@/lib/site";

// Persistent bar so a visitor can jump straight to checkout from anywhere
// on the page, at any scroll position, instead of scrolling back down
// through the whole menu to find the cart.
export default function FloatingCartBar() {
  const { count, total, grandTotal, amountToFreeDelivery, isOpen, open } = useCart();
  const progress = Math.min(1, total / SITE.freeDeliveryThreshold);

  if (count === 0 || isOpen) return null;

  return (
    <button
      type="button"
      onClick={open}
      className="pressable fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-md flex-col gap-2 overflow-hidden rounded-3xl bg-accent px-5 pb-3 pt-4 text-left text-accent-ink shadow-2xl sm:inset-x-auto sm:right-6 sm:w-96"
    >
      <span className="flex w-full items-center justify-between gap-3">
        <span className="flex items-center gap-2 font-bold">
          <IconShoppingBag size={20} aria-hidden />
          View Order ({count})
        </span>
        <span className="font-display text-lg tracking-wide">{grandTotal} EGP</span>
      </span>
      <span className="w-full">
        <span className="block h-1.5 overflow-hidden rounded-full bg-black/25">
          <span
            className="block h-full origin-left rounded-full bg-accent-ink transition-transform duration-500 ease-out"
            style={{ transform: `scaleX(${progress})` }}
          />
        </span>
        <span className="mt-1.5 block text-xs font-semibold">
          {amountToFreeDelivery > 0
            ? `${amountToFreeDelivery} EGP away from free delivery`
            : "Free delivery unlocked"}
        </span>
      </span>
    </button>
  );
}
