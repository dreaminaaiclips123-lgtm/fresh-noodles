# Product

## Register

brand

## Platform

web

## Users

Hungry locals in New Cairo (Sunset Compound and nearby) browsing on their phone at dinnertime, deciding what to order in the next 60 seconds. They arrive from an Instagram/Facebook link or a friend's recommendation. Secondary user: the owners, sending this link to reference/pitch what "FN online" should feel like before a real backend exists.

## Product Purpose

A demo site for Fresh Noodles (FN), a Korean/Chinese-fusion noodle delivery concept at Sunset Mall, Sunset Compound, Cairo. It exists to make a visitor hungry within one scroll and get them to order — via a mock cart that hands off to WhatsApp, or a direct call. Success is a visitor building an order and hitting "Send to WhatsApp."

## Positioning

FN already has a loud, confident night-market brand (chili red, black marble, a grinning mascot, "Asia closer than ever"). The site should feel like that energy translated into a clean, fast, premium product — not a Canva flyer, not a generic restaurant template.

## Conversion & proof

- Primary CTA: build an order → send via WhatsApp. Secondary: call to order, follow on Instagram/Facebook.
- The line a visitor remembers: "Asia closer than ever."
- Belief ladder: real food (real menu, real prices), real people (Mr Nang + the FN team), easy to order (two taps to WhatsApp).
- Proof on hand: their own posted menu prices, team photo, founder photo.

## Brand Personality

Bold, appetite-driving, a little cheeky (the grinning chef mascot), night-market energy — chili red and charcoal black, gold heat accents, confident condensed type. Never delicate, never pastel.

## Anti-references

- AI-slop landing pages: purple gradients, glassmorphism everywhere, generic serif-italic editorial affectation.
- Generic "modern restaurant" template: stock hero photo, Inter font, beige-and-sage palette.
- Literally recreating their Canva graphics (spray-paint text, stock photo collages) — steal the energy, not the assets.

## Design Principles

1. Make it hungry-making: food photography language (steam, char, close crops) does more work than copy.
2. One CTA, everywhere: ordering (WhatsApp) is never more than a scroll away.
3. Real over generic: real menu, real prices, real people, real address — placeholders are marked, not hidden.
4. Motion earns its place: one signature device (hero steam), tactile hovers on menu items, nothing decorative on loop.

## Accessibility & Inclusion

WCAG AA contrast (cream text on charcoal, chili red reserved for large/bold elements). Full keyboard navigation, visible focus states, alt text on all dish imagery, prefers-reduced-motion collapses steam/parallax to static.

## Concrete direction

- **Palette** (Tailwind v4 `@theme` tokens): `--color-bg` charcoal black (#12100E), `--color-ink` warm cream (#F5EDE1), `--color-accent` chili red (#D7301F), `--color-accent-2` warm gold (#E8A33D), `--color-support` jade (#2F5C4C, sparing use), `--color-surface` deep marble gray (#1C1917).
- **Typography**: display — a bold condensed Google variable font (Big Shoulders or Anton-style) for headlines, echoing FN's spray-paint branding; body — a clean geometric sans (Plus Jakarta Sans) for menu/copy. Never Inter-only.
- **Signature interaction**: steam wisps rising off the hero noodle bowl, subtly cursor-reactive (canvas), degrades to a gentle static loop under `prefers-reduced-motion`.
- **Sections**: Nav (logo, links, Order CTA) → Hero (bowl + steam + tagline) → Story (Mr Nang + FN team) → Menu (Noodle Bowls / Mains / Appetizers, real prices, "ask in-store" flagged where unposted) → Order (mock cart → WhatsApp handoff) → Location & Hours → Footer (socials as Tabler icons).

## Known placeholders (flagged for the owner to correct)

- Beef Bulgogi / Chicken Noodles bowls: no posted price — marked "ask in-store" until confirmed.
- Appetizers (spring rolls, dumplings, wings): no posted prices — marked "ask in-store" until confirmed.
- Hours: Facebook shows "Open now" with no posted schedule — using a plausible delivery-hours placeholder (12pm–1am daily), flagged for correction.
