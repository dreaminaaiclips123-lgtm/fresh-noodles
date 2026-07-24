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
- Belief ladder: real food (real menu, real prices), real people (the FN team), easy to order (two taps to WhatsApp).
- Proof on hand: their own posted menu prices and team photo.

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

Revised after the client shared a reference build (fresh-noodles.lovable.app) as the target look — that reference uses placeholder menu items (ramen, bao buns), fabricated branches, and a fake star rating (its own footer admits "Demo site · Not the official website"). We matched its visual system exactly but kept FN's real menu, prices, single real location, and real photos rather than copying its invented content.

- **Palette** (Tailwind v4 `@theme` tokens, oklch): `--color-bg` oklch(14% .02 30), `--color-surface` oklch(19% .025 30), `--color-ink` oklch(98% .01 80), `--color-muted` oklch(72% .02 80), `--color-accent` oklch(66% .22 32) chili red, `--color-gold` oklch(75% .19 65).
- **Typography**: display — Bebas Neue (condensed, all-caps) for headlines; body — Inter. Matches the reference exactly.
- **Photo strategy**: real dish photos, but the source images are compilation shots from FN's Facebook posts with baked-in marketing text — every image used on-site is pre-cropped (via PIL, see git history) to an honest, text-free region that actually matches the labeled dish. No image is used as a stand-in for a dish it doesn't show.
- **Sections**: Nav (logo, links, Order Now → opens cart) → Hero (headline + real bowl photo + honest stat row) → Menu (featured photo tiles for every item with a real matching photo, plain list for the rest, real prices, "Ask in-store" flagged where unposted) → full-bleed banner photo break → Story (stat cards + FN team photo) → Visit (real Sunset Compound address/hours/Maps link + Order & Follow) → Footer.
- Dropped from the original direction: the canvas steam effect and jade support color (not in the matched reference); kept the WhatsApp mock-cart ordering flow since it's a genuine functional upgrade over the reference's plain anchor-link button.

## Known placeholders (flagged for the owner to correct)

- Beef Bulgogi / Chicken Noodles bowls: no posted price — marked "ask in-store" until confirmed.
- Appetizers (spring rolls, dumplings, wings): no posted prices — marked "ask in-store" until confirmed.
- Hours: Facebook shows "Open now" with no posted schedule — using a plausible delivery-hours placeholder (12pm–1am daily), flagged for correction.
