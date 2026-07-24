import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import Reveal from "./Reveal";
import PhotoTile from "./PhotoTile";
import MenuItemCard from "./MenuItemCard";
import { FEATURED, MENU } from "@/lib/menu";

export default function MenuSection() {
  return (
    <section
      id="menu"
      className="scroll-mt-24 px-5 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">
            The Menu
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] tracking-wide text-ink">
            Slurp-worthy favorites
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Real dishes, real photos, real prices from our posted menu. A
            couple of items don&apos;t have a listed price yet — we&apos;ll
            confirm those with you over WhatsApp.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {FEATURED.map((item, i) => (
            <Reveal key={item.id} delay={(i % 2) * 80}>
              <PhotoTile item={item} />
            </Reveal>
          ))}
        </div>

        {MENU.map((category) => {
          const rest = category.items.filter((item) => !item.featured);
          if (rest.length === 0) return null;
          return (
            <div key={category.id} className="mt-20">
              <Reveal>
                <h3 className="font-display text-3xl tracking-wide text-ink">
                  {category.title}
                </h3>
              </Reveal>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {rest.map((item, i) => (
                  <Reveal key={item.id} delay={(i % 4) * 60}>
                    <MenuItemCard item={item} />
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}

        <Reveal className="mt-16 flex justify-center">
          <Link
            href="/order"
            className="pressable inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-bold text-accent-ink"
          >
            Order online
            <IconArrowRight size={18} aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
