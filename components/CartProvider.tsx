"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { cartUnitPrice, type MenuItem } from "@/lib/menu";
import { SITE } from "@/lib/site";

type CartLine = { key: string; item: MenuItem; variant?: string; qty: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  /** Sum of full (original) prices. */
  subtotal: number;
  discount: number;
  discountPercent: number;
  /** Food total after discount, before delivery. */
  total: number;
  deliveryFee: number;
  /** How much more food total unlocks free delivery (0 once unlocked). */
  amountToFreeDelivery: number;
  grandTotal: number;
  isOpen: boolean;
  add: (item: MenuItem, variant?: string) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  qtyFor: (item: MenuItem, variant?: string) => number;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const lineKey = (id: string, variant?: string) => (variant ? `${id}::${variant}` : id);

// Front-end-only cart: nothing is persisted or sent anywhere until the
// visitor taps "Send order on WhatsApp" or calls in from the cart drawer.
// No backend, no payment.
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

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
  const { subtotal, discount, discountPercent, total } = useMemo(() => {
    const subtotal = lines.reduce((n, l) => n + l.item.originalPrice * l.qty, 0);
    const total = lines.reduce((n, l) => n + cartUnitPrice(l.item) * l.qty, 0);
    const discount = subtotal - total;
    const linePercents = new Set(
      lines.map((l) =>
        Math.round((1 - cartUnitPrice(l.item) / l.item.originalPrice) * 100)
      )
    );
    const discountPercent =
      linePercents.size === 1
        ? [...linePercents][0]
        : subtotal > 0
          ? Math.round((discount / subtotal) * 100)
          : 0;
    return { subtotal, discount, discountPercent, total };
  }, [lines]);

  const amountToFreeDelivery = Math.max(0, SITE.freeDeliveryThreshold - total);
  const deliveryFee = lines.length > 0 && amountToFreeDelivery > 0 ? SITE.deliveryFee : 0;
  const grandTotal = total + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        lines,
        count,
        subtotal,
        discount,
        discountPercent,
        total,
        deliveryFee,
        amountToFreeDelivery,
        grandTotal,
        isOpen,
        add,
        remove,
        setQty,
        qtyFor,
        clear,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
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
