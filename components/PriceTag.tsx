type PricedItem = { price: number; originalPrice: number };

export default function PriceTag({
  item,
  align = "start",
  size = "lg",
}: {
  item: PricedItem;
  align?: "start" | "end";
  size?: "lg" | "xl";
}) {
  const hasDiscount = item.originalPrice > item.price;
  const priceClass = size === "xl" ? "text-xl" : "text-lg";

  return (
    <div className={`flex flex-col ${align === "end" ? "items-end" : "items-start"}`}>
      {hasDiscount && (
        <span className="text-xs text-muted line-through">
          {item.originalPrice} EGP
        </span>
      )}
      <span className={`font-display ${priceClass} tracking-wide text-gold`}>
        {item.price} EGP
      </span>
    </div>
  );
}
