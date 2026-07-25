"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { MenuItem } from "@/lib/menu";

type CartLine = { key: string; item: MenuItem; variant?: string; qty: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (item: MenuItem, variant?: string) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  qtyFor: (item: MenuItem, variant?: string) => number;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const lineKey = (id: string, variant?: string) => (variant ? `${id}::${variant}` : id);

// Front-end-only cart: nothing is persisted or sent anywhere until the
// visitor taps "Send order on WhatsApp" or calls in on the /order page.
// No backend, no payment.
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const add = (item: MenuItem, variant?: string) => {
    const key = lineKey(item.id, variant);
    setLines((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l));
      }
      return [...prev, { key, item, variant, qty: 1 }];
    });
  };

  const remove = (key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  };

  const setQty = (key: string, qty: number) => {
    if (qty <= 0) return remove(key);
    setLines((prev) => prev.map((l) => (l.key === key ? { ...l, qty } : l)));
  };

  const qtyFor = (item: MenuItem, variant?: string) => {
    const key = lineKey(item.id, variant);
    return lines.find((l) => l.key === key)?.qty ?? 0;
  };

  const clear = () => setLines([]);

  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);
  const subtotal = useMemo(
    () => lines.reduce((n, l) => n + l.item.price * l.qty, 0),
    [lines]
  );

  return (
    <CartContext.Provider
      value={{ lines, count, subtotal, add, remove, setQty, qtyFor, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
