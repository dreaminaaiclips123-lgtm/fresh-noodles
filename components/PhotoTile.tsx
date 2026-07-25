"use client";

import Image from "next/image";
import { IconFlame, IconPlus } from "@tabler/icons-react";
import { useCart } from "./CartProvider";
import PriceTag from "./PriceTag";
import type { MenuItem } from "@/lib/menu";

export default function PhotoTile({ item }: { item: MenuItem }) {
  const { add } = useCart();

  return (
    <div className="menu-card flex flex-col overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="flex items-start justify-between gap-3 p-5 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          {item.tag && (
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              {item.tag}
            </span>
          )}
          {item.spicy && (
            <span className="flex items-center" aria-label={`Spice level ${item.spicy} of 3`}>
              {Array.from({ length: item.spicy }).map((_, i) => (
                <IconFlame key={i} size={13} className="text-accent" fill="currentColor" aria-hidden />
              ))}
            </span>
          )}
        </div>
        <PriceTag item={item} align="end" size="xl" />
      </div>

      <div className="px-5 pb-2">
        <h3 className="text-lg font-semibold text-ink">{item.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
      </div>

      <div className="relative mt-3 aspect-[4/3] w-full">
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        )}
        <button
          type="button"
          onClick={() => add(item)}
          aria-label={`Add ${item.name} to order`}
          className="pressable absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-ink shadow-lg"
        >
          <IconPlus size={18} stroke={2.5} aria-hidden />
        </button>
      </div>
    </div>
  );
}
