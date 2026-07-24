import Image from "next/image";
import Link from "next/link";
import { IconArrowRight, IconBrandWhatsapp } from "@tabler/icons-react";
import { SITE } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-40 sm:px-10 sm:pt-48">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-gold">
            <span className="h-px w-6 bg-gold" aria-hidden />
            Asian Fusion · New Cairo
          </p>
          <h1 className="font-display mt-5 text-[clamp(3rem,8vw,5.5rem)] leading-[0.92] tracking-wide text-ink">
            Noodles so <span className="text-accent">fresh</span>,
            <br />
            you&apos;ll slurp <span className="italic text-gold">twice.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            Fresh noodles, wok-fired mains and crispy appetizers — tossed to
            order at Agora Mall and Arabella Plaza.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/#menu"
              className="pressable inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-bold text-accent-ink"
            >
              See the Menu
            </Link>
            <a
              href={`https://wa.me/${SITE.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pressable inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-base font-bold text-ink hover:border-gold"
            >
              <IconBrandWhatsapp aria-hidden className="h-5 w-5" />
              Order on WhatsApp
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-8">
            <div>
              <p className="font-display text-3xl text-ink">Asian Fusion</p>
              <p className="text-sm text-muted">Menu</p>
            </div>
            <div className="h-10 w-px bg-line" aria-hidden />
            <div>
              <p className="font-display text-3xl text-ink">Grand Opening</p>
              <p className="text-sm text-muted">20% off this month</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-line">
            <Image
              src="/menu/hero-bowls.jpg"
              alt="Fresh Noodles' Beef Bulgogi and Chicken Noodles bowls"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 45vw"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 shadow-xl">
            <Image
              src="/brand/logo.jpg"
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 rounded-full border border-line"
            />
            <div>
              <p className="font-display text-sm tracking-wide text-ink">
                FRESH NOODLES
              </p>
              <Link
                href="/#visit"
                className="flex items-center gap-1 text-xs font-semibold text-gold"
              >
                Find us <IconArrowRight size={12} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
