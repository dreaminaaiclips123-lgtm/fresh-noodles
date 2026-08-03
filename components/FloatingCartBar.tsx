"use client";

import { IconShoppingBag } from "@tabler/icons-react";
import { useCart } from "./CartProvider";

// Persistent bar so a visitor can jump straight to checkout from anywhere
// on the page, at any scroll position, instead of scrolling back down
// through the whole menu to find the cart.
export default function FloatingCartBar() {
  const { count, subtotal, isOpen, open } = useCart();

  if (count === 0 || isOpen) return null;

  return (
    <button
      type="button"
      onClick={open}
      className="pressable fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-md items-center justify-between gap-3 rounded-full bg-accent px-5 py-4 text-accent-ink shadow-2xl sm:inset-x-auto sm:right-6"
    >
      <span className="flex items-center gap-2 font-bold">
        <IconShoppingBag size={20} aria-hidden />
        View Order ({count})
      </span>
      <span className="font-display text-lg tracking-wide">{subtotal} EGP</span>
    </button>
  );
}
