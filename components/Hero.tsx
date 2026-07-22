import Link from "next/link";
import { IconArrowDown, IconBrandWhatsapp } from "@tabler/icons-react";
import HeroSteam from "./HeroSteam";
import BowlMark from "./BowlMark";
import { SITE } from "@/lib/site";

const WORDS = [
  "FRESH NOODLES",
  "BOLD FLAVORS",
  "MADE FOR YOU",
  "ASIA CLOSER THAN EVER",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative flex min-h-[100dvh] flex-col justify-center px-5 pb-20 pt-32 sm:px-10">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60vh]">
          <BowlMark className="absolute bottom-[-4rem] left-1/2 w-[min(120vw,900px)] -translate-x-1/2 opacity-90" />
          <HeroSteam />
        </div>

        <div className="relative">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold">
            Korean &amp; Chinese Fusion · Sunset Compound, Cairo
          </p>
          <h1 className="font-display mt-4 text-[clamp(3rem,12vw,7.5rem)] leading-[0.92] tracking-wide text-ink">
            ASIA
            <br />
            CLOSER
            <br />
            <span className="text-accent">THAN EVER</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg font-medium leading-relaxed text-muted sm:text-xl">
            Fresh noodles, wok-fired mains and crispy appetizers — made to
            order and sent straight to your door in Sunset Compound.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/#menu"
              className="pressable inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-base font-bold text-accent-ink"
            >
              See the menu
              <IconArrowDown aria-hidden className="h-5 w-5" stroke={2.75} />
            </Link>
            <a
              href={`https://wa.me/${SITE.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pressable inline-flex items-center gap-3 rounded-full border border-line px-7 py-3.5 text-base font-bold text-ink hover:border-gold"
            >
              <IconBrandWhatsapp aria-hidden className="h-5 w-5" />
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="relative border-y border-line bg-surface py-3">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[...WORDS, ...WORDS, ...WORDS].map((w, i) => (
            <span
              key={i}
              className="font-display text-sm tracking-[0.25em] text-muted"
            >
              {w} ·
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
