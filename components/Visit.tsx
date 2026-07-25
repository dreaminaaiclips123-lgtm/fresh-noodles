import {
  IconArrowRight,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconPhone,
} from "@tabler/icons-react";
import Reveal from "./Reveal";
import { SITE, BRANCHES } from "@/lib/site";

export default function Visit() {
  return (
    <section id="visit" className="scroll-mt-24 px-5 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">
            Visit Us
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] tracking-wide text-ink">
            Find us in New Cairo.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {BRANCHES.map((branch, i) => {
            const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${branch.name}, ${branch.area}`
            )}`;
            return (
              <Reveal key={branch.id} delay={i * 80}>
                <div className="h-full rounded-2xl border border-line px-8 py-9">
                  <h3 className="font-display text-2xl tracking-wide text-accent">
                    {branch.name}
                  </h3>
                  <p className="mt-3 text-ink">{branch.area}</p>
                  <p className="mt-2 text-muted">{SITE.hours}</p>
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sweep-link mt-5 inline-flex items-center gap-1 font-semibold text-accent"
                  >
                    Open in Maps <IconArrowRight size={16} aria-hidden />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={160} className="mt-6">
          <div className="rounded-2xl border border-line px-8 py-9">
            <h3 className="font-display text-2xl tracking-wide text-ink">
              Order &amp; Follow
            </h3>
            <ul className="mt-4 flex flex-col gap-3 text-ink">
              <li>
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sweep-link inline-flex items-center gap-2"
                >
                  <IconBrandInstagram size={18} aria-hidden />
                  @freshnoodles.eg
                </a>
              </li>
              <li>
                <a
                  href={SITE.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sweep-link inline-flex items-center gap-2"
                >
                  <IconBrandFacebook size={18} aria-hidden />
                  Facebook page
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${SITE.orderWhatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sweep-link inline-flex items-center gap-2"
                >
                  <IconBrandWhatsapp size={18} aria-hidden />
                  Order on WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`tel:+${SITE.whatsappNumber}`}
                  className="sweep-link inline-flex items-center gap-2"
                >
                  <IconPhone size={18} aria-hidden />
                  {SITE.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
