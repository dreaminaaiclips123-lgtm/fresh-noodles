"use client";

import { IconTruckDelivery } from "@tabler/icons-react";
import { useCart } from "./CartProvider";
import { SITE } from "@/lib/site";

export default function FreeDeliveryProgress() {
  const { total, amountToFreeDelivery } = useCart();
  const progress = Math.min(1, total / SITE.freeDeliveryThreshold);
  const unlocked = amountToFreeDelivery === 0;

  return (
    <div className="rounded-xl border border-line bg-bg/40 p-4">
      <p className="flex items-center gap-2 text-sm font-semibold text-ink">
        <IconTruckDelivery
          size={18}
          aria-hidden
          className={unlocked ? "text-gold" : "text-muted"}
        />
        {unlocked ? (
          <span>
            You unlocked <span className="text-gold">free delivery</span>
          </span>
        ) : (
          <span>
            Add <span className="text-gold">{amountToFreeDelivery} EGP</span> more for free
            delivery
          </span>
        )}
      </p>
      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-surface-2"
        role="progressbar"
        aria-label="Progress to free delivery"
        aria-valuemin={0}
        aria-valuemax={SITE.freeDeliveryThreshold}
        aria-valuenow={Math.min(total, SITE.freeDeliveryThreshold)}
      >
        <div
          className={`h-full origin-left rounded-full transition-transform duration-500 ease-out ${
            unlocked ? "bg-gold" : "bg-accent"
          }`}
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      <p className="mt-2 text-xs text-muted">
        Free delivery on orders of {SITE.freeDeliveryThreshold} EGP or more
      </p>
    </div>
  );
}
