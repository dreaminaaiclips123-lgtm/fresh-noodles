"use client";

import { useEffect } from "react";
import { IconBrandWhatsapp, IconMinus, IconPlus, IconX } from "@tabler/icons-react";
import { useCart } from "./CartProvider";
import { SITE } from "@/lib/site";

function buildWhatsAppMessage(
  lines: { item: { name: string; price: number | null }; qty: number }[],
  subtotal: number,
  hasUnpriced: boolean
) {
  const itemLines = lines
    .map((l) => {
      const price = l.item.price === null ? "price to confirm" : `${l.item.price} EGP`;
      return `• ${l.qty}x ${l.item.name} (${price})`;
    })
    .join("\n");

  const total = hasUnpriced
    ? `Subtotal: ${subtotal} EGP + items to confirm`
    : `Subtotal: ${subtotal} EGP`;

  return `Hi Fresh Noodles! I'd like to order:\n\n${itemLines}\n\n${total}\n\nDelivery address: `;
}

export default function CartDrawer() {
  const { lines, count, subtotal, hasUnpriced, isOpen, close, remove, setQty } =
    useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const waHref = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
    buildWhatsAppMessage(lines, subtotal, hasUnpriced)
  )}`;

  return (
    <>
      <div
        aria-hidden={!isOpen}
        onClick={close}
        className={`fixed inset-0 z-[60] bg-bg/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your order"
        className={`drawer-panel fixed inset-y-0 right-0 z-[70] flex w-[min(100%,26rem)] flex-col border-l border-line bg-surface ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-display text-2xl tracking-wide text-ink">
            Your order
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close order tray"
            className="pressable flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-surface-2"
          >
            <IconX size={20} aria-hidden />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {lines.length === 0 ? (
            <p className="mt-10 text-center text-muted">
              Your tray is empty. Add something spicy.
            </p>
          ) : (
            <ul className="flex flex-col gap-5">
              {lines.map((l) => (
                <li key={l.item.id} className="flex gap-3">
                  <div className="flex-1">
                    <p className="font-semibold text-ink">{l.item.name}</p>
                    <p className="text-sm text-muted">
                      {l.item.price === null
                        ? "Ask in-store"
                        : `${l.item.price} EGP`}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setQty(l.item.id, l.qty - 1)}
                        aria-label={`Decrease ${l.item.name} quantity`}
                        className="pressable flex h-7 w-7 items-center justify-center rounded-full border border-line text-ink hover:border-gold"
                      >
                        <IconMinus size={14} aria-hidden />
                      </button>
                      <span className="w-4 text-center text-sm font-semibold">
                        {l.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(l.item.id, l.qty + 1)}
                        aria-label={`Increase ${l.item.name} quantity`}
                        className="pressable flex h-7 w-7 items-center justify-center rounded-full border border-line text-ink hover:border-gold"
                      >
                        <IconPlus size={14} aria-hidden />
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(l.item.id)}
                        className="sweep-link ml-auto text-sm font-semibold text-muted hover:text-accent"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-line px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold uppercase tracking-wide text-muted">
                Subtotal ({count} {count === 1 ? "item" : "items"})
              </span>
              <span className="font-display text-2xl text-gold">
                {subtotal} EGP
              </span>
            </div>
            {hasUnpriced && (
              <p className="mt-2 text-xs text-muted">
                Some items don&apos;t have a posted price yet — we&apos;ll confirm those over WhatsApp.
              </p>
            )}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="pressable mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-base font-bold text-accent-ink"
            >
              <IconBrandWhatsapp size={22} aria-hidden />
              Send order on WhatsApp
            </a>
            <p className="mt-3 text-center text-xs text-muted">
              This is a demo checkout — it opens WhatsApp with your order pre-filled. No payment is taken on this site.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
