"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IconCheck, IconMinus, IconPlus, IconX } from "@tabler/icons-react";
import { useCart } from "./CartProvider";
import { choiceImage, type MenuItem, type MenuOption } from "@/lib/menu";

function ChoiceThumb({ name }: { name: string }) {
  const src = choiceImage(name);
  if (!src) return null;
  return (
    <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg">
      <Image src={src} alt="" fill className="object-cover" sizes="44px" />
    </span>
  );
}

function SingleChoice({
  option,
  value,
  onChange,
}: {
  option: MenuOption;
  value: string;
  onChange: (choice: string) => void;
}) {
  return (
    <div className="mt-3 grid grid-cols-2 gap-2">
      {option.choices.map((choice) => {
        const selected = choice === value;
        return (
          <label
            key={choice}
            className={`offer-choice flex min-h-14 cursor-pointer items-center gap-2.5 rounded-xl border p-2 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold ${
              selected ? "border-accent bg-accent/15" : "border-line bg-surface-2"
            }`}
          >
            <input
              type="radio"
              name={option.label}
              checked={selected}
              onChange={() => onChange(choice)}
              className="sr-only"
            />
            <ChoiceThumb name={choice} />
            <span className="min-w-0 flex-1 text-sm leading-snug font-medium text-ink">
              {choice}
            </span>
            {selected && (
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink">
                <IconCheck size={13} stroke={3} aria-hidden />
              </span>
            )}
          </label>
        );
      })}
    </div>
  );
}

function CountedChoice({
  option,
  counts,
  onChange,
}: {
  option: MenuOption;
  counts: Record<string, number>;
  onChange: (choice: string, count: number) => void;
}) {
  const total = Object.values(counts).reduce((n, c) => n + c, 0);
  return (
    <ul className="mt-3 flex flex-col gap-2">
      {option.choices.map((choice) => {
        const count = counts[choice] ?? 0;
        return (
          <li
            key={choice}
            className={`offer-choice flex items-center gap-2.5 rounded-xl border p-2 ${
              count > 0 ? "border-accent bg-accent/15" : "border-line bg-surface-2"
            }`}
          >
            <ChoiceThumb name={choice} />
            <span className="min-w-0 flex-1 text-sm leading-snug font-medium text-ink">
              {choice}
            </span>
            <button
              type="button"
              onClick={() => onChange(choice, count - 1)}
              disabled={count === 0}
              aria-label={`Remove one ${choice}`}
              className="pressable flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink disabled:opacity-30"
            >
              <IconMinus size={15} stroke={2.5} aria-hidden />
            </button>
            <span className="w-4 text-center text-sm font-bold text-ink">{count}</span>
            <button
              type="button"
              onClick={() => onChange(choice, count + 1)}
              disabled={total >= (option.pick ?? 1)}
              aria-label={`Add one ${choice}`}
              className="pressable flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink disabled:bg-surface disabled:text-muted"
            >
              <IconPlus size={15} stroke={2.5} aria-hidden />
            </button>
          </li>
        );
      })}
    </ul>
  );
}

// Starts with one of each choice, in menu order, up to the number to pick.
const defaultCounts = (option: MenuOption) =>
  Object.fromEntries(
    option.choices.map((c, i) => [c, i < (option.pick ?? 0) ? 1 : 0])
  );

function OfferSheet({
  item,
  onClose,
}: {
  item: MenuItem;
  onClose: () => void;
}) {
  const { add } = useCart();
  const options = item.options ?? [];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [singles, setSingles] = useState(() =>
    options.map((o) => o.choices[0])
  );
  const [counts, setCounts] = useState(() => options.map(defaultCounts));

  // showModal puts the sheet in the top layer, so the transformed cards around
  // it can't trap it (see the Safari note in CartDrawer).
  useEffect(() => {
    dialogRef.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const picked = (i: number) =>
    Object.values(counts[i]).reduce((n, c) => n + c, 0);
  const missing = options.reduce(
    (n, o, i) => n + (o.pick ? o.pick - picked(i) : 0),
    0
  );

  const variant = options
    .map((o, i) =>
      o.pick
        ? `${o.label}: ${o.choices
            .filter((c) => counts[i][c] > 0)
            .map((c) => `${counts[i][c]}x ${c}`)
            .join(" + ")}`
        : `${o.label}: ${singles[i]}`
    )
    .join(", ");

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) dialogRef.current?.close();
      }}
      aria-label={`Choose your ${item.name}`}
      className="offer-sheet border-line bg-surface text-ink"
    >
      <div className="flex max-h-[inherit] flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div className="min-w-0">
            <h2 className="font-display text-3xl leading-none tracking-wide text-ink">
              {item.name}
            </h2>
            <p className="mt-1.5 text-sm text-muted">{item.description}</p>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close"
            className="pressable flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink hover:bg-surface-2"
          >
            <IconX size={20} aria-hidden />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6">
          {options.map((option, i) => (
            <section key={option.label} role="group" aria-label={option.label} className="mt-5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-xl tracking-wide text-ink">
                  {option.label}
                </h3>
                <p aria-live="polite" className="text-xs font-semibold text-gold">
                  {option.pick
                    ? `${picked(i)} of ${option.pick} chosen`
                    : "Choose 1"}
                </p>
              </div>
              {option.pick ? (
                <CountedChoice
                  option={option}
                  counts={counts[i]}
                  onChange={(choice, count) =>
                    setCounts((prev) =>
                      prev.map((c, j) => (j === i ? { ...c, [choice]: count } : c))
                    )
                  }
                />
              ) : (
                <SingleChoice
                  option={option}
                  value={singles[i]}
                  onChange={(choice) =>
                    setSingles((prev) =>
                      prev.map((s, j) => (j === i ? choice : s))
                    )
                  }
                />
              )}
            </section>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-line px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="shrink-0">
            <p className="text-xs text-muted line-through">{item.originalPrice} EGP</p>
            <p className="font-display text-2xl leading-none tracking-wide text-gold">
              {item.price} EGP
            </p>
          </div>
          <button
            type="button"
            disabled={missing > 0}
            onClick={() => {
              add(item, variant);
              dialogRef.current?.close();
            }}
            className="pressable min-h-12 flex-1 rounded-full bg-accent px-5 text-sm font-bold text-accent-ink disabled:bg-surface-2 disabled:text-muted"
          >
            {missing > 0 ? `Choose ${missing} more` : "Add to order"}
          </button>
        </div>
      </div>
    </dialog>
  );
}

/** Replaces the plain add button on offers where the customer chooses items. */
export default function OfferPicker({ item }: { item: MenuItem }) {
  const { lines } = useCart();
  const [open, setOpen] = useState(false);
  const inOrder = lines
    .filter((l) => l.item.id === item.id)
    .reduce((n, l) => n + l.qty, 0);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Choose your ${item.name}${inOrder ? `, ${inOrder} in your order` : ""}`}
        className="pressable inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full bg-accent px-4 text-sm font-bold text-accent-ink shadow-lg"
      >
        Choose
        {inOrder > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-ink px-1 text-xs text-accent-2">
            {inOrder}
          </span>
        )}
      </button>
      {open && <OfferSheet item={item} onClose={() => setOpen(false)} />}
    </>
  );
}
