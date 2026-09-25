"use client";

import { useEffect } from "react";
import { IconBrandWhatsapp, IconPhone, IconX } from "@tabler/icons-react";
import { useCart } from "./CartProvider";
import QtyControl from "./QtyControl";
import FreeDeliveryProgress from "./FreeDeliveryProgress";
import { SITE } from "@/lib/site";

function buildWhatsAppMessage(
  lines: { item: { name: string; originalPrice: number }; variant?: string; qty: number }[],
  totals: {
    subtotal: number;
    discount: number;
    discountPercent: number;
    deliveryFee: number;
    grandTotal: number;
  }
) {
  const itemLines = lines
    .map((l) => {
      const variant = l.variant ? ` (${l.variant})` : "";
      return `• ${l.qty}x ${l.item.name}${variant} (${l.item.originalPrice} EGP)`;
    })
    .join("\n");

  return `Hi Fresh Noodles! I'd like to order:\n\n${itemLines}\n\nSubtotal: ${totals.subtotal} EGP\nDiscount (${totals.discountPercent}%): -${totals.discount} EGP\nDelivery: ${totals.deliveryFee ? `${totals.deliveryFee} EGP` : "Free"}\nTotal: ${totals.grandTotal} EGP\n\nDelivery address: \n(Please send us your location to ensure a smooth delivery process.)`;
}

// Rendered at the top level (not nested inside the backdrop-blurred nav) so
// it isn't affected by Safari's containing-block quirk with backdrop-filter.
export default function CartDrawer() {
  const {
    lines,
    count,
    subtotal,
    discount,
    discountPercent,
    deliveryFee,
    grandTotal,
    isOpen,
    close,
    remove,
  } = useCart();

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

  const waHref = `https://wa.me/${SITE.orderWhatsappNumber}?text=${encodeURIComponent(
    buildWhatsAppMessage(lines, { subtotal, discount, discountPercent, deliveryFee, grandTotal })
  )}`;

  return (
    <>
      <div
        onClick={close}
        className={`fixed inset-0 z-[60] bg-bg/70 backdrop-blur-sm transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your order"
        className={`fixed inset-y-0 right-0 z-[70] flex w-[min(100%,26rem)] flex-col border-l border-line bg-surface transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-display text-2xl tracking-wide text-ink">
            Your Order
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close order"
            className="pressable flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-surface-2"
          >
            <IconX size={20} aria-hidden />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {lines.length === 0 ? (
            <p className="mt-10 text-center text-muted">
              Nothing yet — add something spicy from the menu.
            </p>
          ) : (
            <>
              <FreeDeliveryProgress />
              <ul className="mt-5 flex flex-col gap-5">
                {lines.map((l) => (
                  <li key={l.key} className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-ink">
                        {l.item.name}
                        {l.variant && <span className="text-muted"> ({l.variant})</span>}
                      </p>
                      <p className="mt-0.5 text-sm text-muted">{l.item.originalPrice} EGP each</p>
                      <button
                        type="button"
                        onClick={() => remove(l.key)}
                        className="sweep-link mt-1 text-xs font-semibold text-muted hover:text-accent"
                      >
                        Remove
                      </button>
                    </div>
                    <QtyControl item={l.item} size="sm" />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-line px-6 py-5">
            <div className="flex items-baseline justify-between text-sm text-muted">
              <span className="font-semibold uppercase tracking-wide">Subtotal ({count})</span>
              <span>{subtotal} EGP</span>
            </div>
            {discount > 0 && (
              <div className="mt-2 flex items-baseline justify-between text-sm font-semibold text-gold">
                <span>{discountPercent}% discount</span>
                <span>-{discount} EGP</span>
              </div>
            )}
            <div className="mt-2 flex items-baseline justify-between text-sm text-muted">
              <span>Delivery fee</span>
              {deliveryFee > 0 ? (
                <span>{deliveryFee} EGP</span>
              ) : (
                <span className="font-semibold text-gold">Free</span>
              )}
            </div>
            <div className="mt-3 flex items-baseline justify-between border-t border-line pt-3">
              <span className="text-sm font-semibold uppercase tracking-wide text-muted">
                Total
              </span>
              <span className="font-display text-2xl text-gold">{grandTotal} EGP</span>
            </div>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="pressable mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-base font-bold text-accent-ink"
            >
              <IconBrandWhatsapp size={22} aria-hidden />
              Send order on WhatsApp
            </a>
            <a
              href={`tel:+${SITE.whatsappNumber}`}
              className="pressable mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-line px-6 py-4 text-base font-bold text-ink hover:border-gold"
            >
              <IconPhone size={20} aria-hidden />
              Call to order — {SITE.phoneDisplay}
            </a>
            <p className="mt-3 text-center text-xs text-muted">
              No payment is taken on this site — orders are confirmed over WhatsApp or by phone.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
