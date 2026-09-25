// Syncs lib/menu.ts prices with the live Talabat listing.
// Rule: website discount = Talabat discount + EXTRA_PERCENT, applied to
// Talabat's original price. Prints a JSON report; writes only on --write.
import { readFileSync, writeFileSync } from "node:fs";

const TALABAT_URL = "https://www.talabat.com/egypt/restaurant/1000294/fresh-nodles?aid=9290";
const MENU_FILE = new URL("../lib/menu.ts", import.meta.url);
const EXTRA_PERCENT = 5;

// Talabat item name -> website item id.
const NAME_TO_ID = {
  "Beef Ramen with Korean Kimchi": "korean-beef-ramen-kimchi",
  "Chicken Ramen Soup": "chicken-ramen-soup",
  "Tom Yum Shrimp Soup": "tom-yum-shrimp-soup",
  "Chicken Laksa Soup": "chicken-laksa-soup",
  "Laksa Shrimp Soup": "laksa-shrimp-soup",
  "Chinese Vegetable Spring Roll": "chinese-vegetable-spring-roll",
  "Spicy Dynamite Chicken": "spicy-dynamite-chicken",
  "Beef Gyoza": "beef-gyoza",
  "Chicken Gyoza": "chicken-gyoza",
  "Shrimp Gyoza": "shrimp-gyoza",
  "Dynamite Shrimp": "shrimp-dynamite",
  "Teriyaki Fries": "teriyaki-fries",
  "Sweet and Sour Chicken": "sweet-and-sour-chicken",
  "Black Pepper Beef": "black-pepper-beef",
  "Sweet & Sour Chicken Bundle": "sweet-sour-chicken-bundle",
  "Beef with Black Pepper Bundle": "beef-black-pepper-bundle",
  "Shrimp with Teriyaki Sauce": "shrimp-teriyaki-sauce",
  "Teriyaki Chicken": "teriyaki-chicken",
  "Spicy Szechuan Chicken": "spicy-szechuan-chicken",
  "Spicy Szechuan Shrimp": "sichuan-spicy-shrimp",
  "Sichuan Spicy Shrimp": "sichuan-spicy-shrimp",
  "Sweet and Sour Shrimp": "sweet-and-sour-shrimp",
  "Indian Chicken Curry": "indian-chicken-curry",
  "Water": "water",
  "Fi Cola": "v-cola",
  "7 Up": "7-up",
  "Spicy Korean Beef Bulgogi": "spicy-korean-bulgogi-beef",
  "Chicken Noodles": "chicken-noodles",
  "Chicken Ramen with Spicy Korean Buldak Sauce": "chicken-ramen-buldak",
  "Japanese Curry Sauce Chicken Ramen": "japanese-curry-chicken-ramen",
  "Fresh Vegetable Noodles": "fresh-vegetable-noodles",
  "Spicy Shrimp Noodles": "spicy-shrimp-noodles",
  "Beef Bulgogi Bao": "beef-bulgogi-bao",
  "Chicken Katsu Bao": "chicken-katsu-bao",
  "Dynamite Shrimp Bao": "dynamite-bao-shrimp",
  "Fried Rice with Shrimp": "shrimp-fried-rice",
  "Steamed Rice": "steamed-rice",
  "Thai Beef Salad": "thai-beef-salad",
  "Korean Chicken Salad": "korean-chicken-salad",
};

function fail(msg) {
  console.log(JSON.stringify({ ok: false, error: msg }, null, 2));
  process.exit(1);
}

const res = await fetch(TALABAT_URL, {
  headers: {
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36",
  },
}).catch((e) => fail(`fetch failed: ${e.message}`));
if (!res.ok) fail(`Talabat returned HTTP ${res.status}`);
const html = await res.text();
const m = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
if (!m) fail("no __NEXT_DATA__ on page (layout changed or blocked)");

const categories = JSON.parse(m[1])?.props?.pageProps?.initialMenuState?.menuData?.categories;
if (!Array.isArray(categories)) fail("menuData.categories missing");

const talabat = new Map();
for (const c of categories) {
  for (const it of c.items ?? []) {
    const price = Number(it.price);
    const old = Number(it.oldPrice);
    if (!it.name || !(price > 0)) continue;
    const original = old > price ? old : price;
    talabat.set(it.name.trim(), { original, price });
  }
}
if (talabat.size < 20) fail(`only ${talabat.size} items parsed; refusing to update`);

let src = readFileSync(MENU_FILE, "utf8");
const changes = [];
const matchedIds = new Set();
const unmapped = [];

for (const [name, t] of talabat) {
  const id = NAME_TO_ID[name];
  if (!id) {
    unmapped.push({ name, original: t.original, price: t.price });
    continue;
  }
  matchedIds.add(id);
  const talabatPct = Math.round((1 - t.price / t.original) * 100);
  const sitePct = talabatPct + EXTRA_PERCENT;
  if (sitePct < 0 || sitePct > 90) fail(`bad discount ${sitePct}% for ${name}`);
  const sitePrice = Math.floor(t.original * (1 - sitePct / 100) + 0.5);

  const re = new RegExp(
    `(id: "${id}",[\\s\\S]*?originalPrice: )(\\d+(?:\\.\\d+)?)(,\\s*price: )(\\d+(?:\\.\\d+)?)(,)`
  );
  const hit = src.match(re);
  if (!hit) fail(`id ${id} not found in lib/menu.ts`);
  const [oldOrig, oldPrice] = [Number(hit[2]), Number(hit[4])];
  if (oldOrig !== t.original || oldPrice !== sitePrice) {
    changes.push({
      id,
      talabat: `${t.original} -> ${t.price} (${talabatPct}% off)`,
      website_before: `${oldOrig} -> ${oldPrice}`,
      website_after: `${t.original} -> ${sitePrice} (${sitePct}% off)`,
    });
    src = src.replace(re, `$1${t.original}$3${sitePrice}$5`);
  }
}

const siteIds = [...src.matchAll(/^\s+id: "([a-z0-9-]+)",\n\s+name:/gm)].map((x) => x[1]);
const missingOnTalabat = siteIds.filter((id) => !matchedIds.has(id));

if (process.argv.includes("--write") && changes.length) writeFileSync(MENU_FILE, src);

console.log(
  JSON.stringify(
    {
      ok: true,
      talabatItems: talabat.size,
      changed: changes.length,
      changes,
      newOnTalabatNotOnSite: unmapped,
      onSiteButMissingFromTalabat: missingOnTalabat,
    },
    null,
    2
  )
);
