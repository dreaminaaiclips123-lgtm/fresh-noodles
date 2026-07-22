"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "./CartProvider";

const LINKS = [
  { href: "/#menu", label: "Menu" },
  { href: "/#story", label: "Our Story" },
  { href: "/#visit", label: "Visit" },
  { href: "https://www.instagram.com/freshnoodles.eg", label: "Instagram", external: true },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { count, open: openCart } = useCart();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-xl">
      <nav
        aria-label="Main"
        className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-10"
      >
        <Link href="/" className="pressable flex items-center gap-3" aria-label="Fresh Noodles, home">
          <Image
            src="/brand/logo.jpg"
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 rounded-full border border-line"
            priority
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-wide text-accent">
              FRESH NOODLES
            </span>
            <span className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-muted sm:block">
              Asian Food · Egypt
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 sm:flex">
          {LINKS.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="sweep-link text-sm font-semibold text-ink"
              >
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} className="sweep-link text-sm font-semibold text-ink">
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            className="pressable relative inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink sm:px-5"
          >
            Order Now
            {count > 0 && (
              <span
                key={count}
                className="badge-pop flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-bold text-gold-ink"
              >
                {count}
              </span>
            )}
          </button>

          <button
            type="button"
            className="pressable relative flex h-10 w-10 items-center justify-center sm:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`absolute h-0.5 w-5 bg-ink transition-transform duration-300 ease-[var(--ease-out-strong)] ${
                open ? "rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 bg-ink transition-transform duration-300 ease-[var(--ease-out-strong)] ${
                open ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 top-[73px] z-40 flex flex-col gap-1 bg-bg/95 px-8 pt-6 backdrop-blur-2xl transition-opacity duration-300 sm:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {LINKS.map((link, i) =>
          link.external ? (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="overflow-hidden py-2"
              tabIndex={open ? 0 : -1}
            >
              <span
                className={`font-display block text-4xl tracking-wide text-ink transition-[transform,opacity] duration-500 ease-[var(--ease-out-strong)] ${
                  open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
              >
                {link.label}
              </span>
            </a>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="overflow-hidden py-2"
              tabIndex={open ? 0 : -1}
            >
              <span
                className={`font-display block text-4xl tracking-wide text-ink transition-[transform,opacity] duration-500 ease-[var(--ease-out-strong)] ${
                  open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
              >
                {link.label}
              </span>
            </Link>
          )
        )}
      </div>
    </header>
  );
}
