"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { MenuItem } from "@/lib/menu";

type CartLine = { item: MenuItem; qty: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  hasUnpriced: boolean;
  add: (item: MenuItem) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

// Front-end-only cart: nothing is persisted or sent anywhere until the
// visitor taps "Send order on WhatsApp" or calls in on the /order page.
// No backend, no payment.
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const add = (item: MenuItem) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.item.id === item.id);
      if (existing) {
        return prev.map((l) =>
          l.item.id === item.id ? { ...l, qty: l.qty + 1 } : l
        );
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const remove = (id: string) => {
    setLines((prev) => prev.filter((l) => l.item.id !== id));
  };

  const setQty = (id: string, qty: number) => {
    if (qty <= 0) return remove(id);
    setLines((prev) =>
      prev.map((l) => (l.item.id === id ? { ...l, qty } : l))
    );
  };

  const clear = () => setLines([]);

  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);
  const subtotal = useMemo(
    () => lines.reduce((n, l) => n + (l.item.price ?? 0) * l.qty, 0),
    [lines]
  );
  const hasUnpriced = useMemo(
    () => lines.some((l) => l.item.price === null),
    [lines]
  );

  return (
    <CartContext.Provider
      value={{ lines, count, subtotal, hasUnpriced, add, remove, setQty, clear }}
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
