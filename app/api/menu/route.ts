import { createHash } from "node:crypto";
import { MENU, cartUnitPrice } from "@/lib/menu";

const ORIGIN = "https://www.fresh-noodles.com";

// Read-only menu for the staff portal. Delivery uses the price the website
// cart charges; Talabat uses the menu price, which matches Talabat while the
// sync's EXTRA_PERCENT is 0. If that changes, Talabat prices need their own field.
export function GET() {
  const items = MENU.flatMap((category) =>
    category.items.map((item) => ({
      id: item.id,
      name: item.name,
      category: category.id,
      categoryTitle: category.title,
      originalPrice: item.originalPrice,
      price: cartUnitPrice(item),
      talabatPrice: item.price,
      image: item.image ? `${ORIGIN}${item.image}` : null,
      options: item.options ?? null,
    }))
  );
  const version = createHash("sha1").update(JSON.stringify(items)).digest("hex").slice(0, 12);
  return Response.json(
    { version, items },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
  );
}
