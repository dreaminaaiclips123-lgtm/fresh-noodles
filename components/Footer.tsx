import Image from "next/image";
import { IconPhone } from "@tabler/icons-react";
import SocialLinks from "./SocialLinks";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer id="visit" className="scroll-mt-24 px-5 pb-10 pt-24 sm:px-10">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-line bg-surface px-6 py-12 sm:px-12 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl tracking-wide text-ink sm:text-4xl">
              Visit or order in
            </h2>
            <p className="mt-4 max-w-xs text-muted">{SITE.address}</p>
            <p className="mt-1 text-muted">{SITE.hours}</p>
            <a
              href={`tel:+${SITE.whatsappNumber}`}
              className="pressable mt-6 inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-bold text-ink hover:border-gold"
            >
              <IconPhone size={18} aria-hidden />
              {SITE.phoneDisplay}
            </a>
          </div>
          <div className="flex flex-col items-start gap-4 sm:items-end">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="pressable inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-ink"
            >
              Follow @freshnoodles.eg
            </a>
            <SocialLinks size="lg" />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2.5 text-ink">
          <Image
            src="/brand/logo.jpg"
            alt="Fresh Noodles logo"
            width={28}
            height={28}
            className="h-7 w-7 rounded-full border border-line"
          />
          <span className="font-display text-sm tracking-wide">
            FRESH NOODLES
          </span>
        </div>
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Fresh Noodles · Demo site, built for review
        </p>
      </div>
    </footer>
  );
}
