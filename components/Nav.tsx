"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconShoppingBag } from "@tabler/icons-react";
import { useCart } from "./CartProvider";

const LINKS = [
  { href: "/#menu", label: "Menu" },
  { href: "/#story", label: "Our Story" },
  { href: "/#visit", label: "Visit" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { count, open: openCart } = useCart();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Main"
        className="relative z-50 mx-auto mt-4 flex w-[min(100%-2rem,72rem)] items-center justify-between rounded-full border border-line bg-bg/80 px-4 py-2 backdrop-blur-xl"
      >
        <Link
          href="/"
          className="pressable flex items-center gap-2.5 text-ink"
          aria-label="Fresh Noodles, home"
        >
          <Image
            src="/brand/logo.jpg"
            alt=""
            width={40}
            height={40}
            className="h-9 w-9 rounded-full border border-line"
            priority
          />
          <span className="font-display text-lg tracking-wide">
            FRESH NOODLES
          </span>
        </Link>

        <div className="hidden items-center gap-7 sm:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="sweep-link text-sm font-semibold text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open order tray, ${count} item${count === 1 ? "" : "s"}`}
            className="pressable relative flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink hover:border-gold"
          >
            <IconShoppingBag size={19} aria-hidden />
            {count > 0 && (
              <span
                key={count}
                className="badge-pop absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-accent-ink"
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
        className={`fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-bg/95 px-8 backdrop-blur-2xl transition-opacity duration-300 sm:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {LINKS.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="overflow-hidden py-2"
            tabIndex={open ? 0 : -1}
          >
            <span
              className={`font-display block text-5xl tracking-wide text-ink transition-[transform,opacity] duration-500 ease-[var(--ease-out-strong)] ${
                open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
            >
              {link.label}
            </span>
          </Link>
        ))}
      </div>
    </header>
  );
}
