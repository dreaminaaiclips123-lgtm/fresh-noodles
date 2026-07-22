import Image from "next/image";
import Reveal from "./Reveal";
import MenuItemCard from "./MenuItemCard";
import { MENU } from "@/lib/menu";

export default function MenuSection() {
  return (
    <section
      id="menu"
      className="scroll-mt-24 bg-surface px-5 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold">
            The Menu
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-[clamp(2.25rem,6vw,4rem)] leading-[0.95] tracking-wide text-ink">
            Tap to build your order.
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Prices are pulled straight from our posted menu. A few items
            don&apos;t have a listed price yet — we&apos;ll confirm those
            with you over WhatsApp.
          </p>
        </Reveal>

        <div className="mt-16 flex flex-col gap-20">
          {MENU.map((category) => (
            <div key={category.id}>
              <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="font-display text-3xl tracking-wide text-ink">
                    {category.title}
                  </h3>
                  <p className="mt-1 text-muted">{category.subtitle}</p>
                </div>
                <div className="h-24 w-full max-w-[10rem] overflow-hidden rounded-2xl border border-line sm:h-20">
                  <Image
                    src={category.image}
                    alt={category.imageAlt}
                    width={414}
                    height={414}
                    className="h-full w-full object-cover"
                    sizes="160px"
                  />
                </div>
              </Reveal>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {category.items.map((item, i) => (
                  <Reveal key={item.id} delay={(i % 4) * 60}>
                    <MenuItemCard item={item} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
