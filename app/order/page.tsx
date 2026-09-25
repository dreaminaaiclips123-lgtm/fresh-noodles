import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import OrderMenu from "@/components/OrderMenu";
import { DISCOUNT_NOTICE } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Order Online",
  description:
    "Build your Fresh Noodles order and send it straight to us on WhatsApp, or call the restaurant.",
};

export default function OrderPage() {
  return (
    <section className="px-5 pb-32 pt-32 sm:px-10 sm:pb-24 sm:pt-40">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="sweep-link inline-flex items-center gap-2 text-sm font-semibold text-muted"
        >
          <IconArrowLeft size={16} aria-hidden />
          Back to home
        </Link>
        <h1 className="font-display mt-4 text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] tracking-wide text-ink">
          Order Online
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          Add what you&apos;re craving, then send your order straight to
          Fresh Noodles on WhatsApp — or just call it in.
        </p>

        <div className="mt-12">
          <div className="mx-auto max-w-3xl">
            <p className="mb-8 inline-block rounded-lg border border-gold px-4 py-2 text-sm font-semibold text-gold">
              {DISCOUNT_NOTICE}
            </p>
          </div>
          <OrderMenu />
        </div>
      </div>
    </section>
  );
}
