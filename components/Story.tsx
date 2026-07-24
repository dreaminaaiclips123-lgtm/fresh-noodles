import Image from "next/image";
import Reveal from "./Reveal";

const STATS = [
  { value: "Korean ×", label: "Chinese fusion" },
  { value: "Tossed", label: "To order" },
  { value: "Grand", label: "Opening special" },
] as const;

export default function Story() {
  return (
    <section id="story" className="scroll-mt-24 px-5 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">
            Our Story
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] tracking-wide text-ink">
            One team, one passion, one bowl at a time.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Fresh Noodles started with a simple idea: bring the Korean and
            Chinese flavors of a real night market into Sunset Compound —
            bold sauces, real spice, nothing frozen longer than it has to
            be.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Every bowl is tossed to order by the FN team, right before it
            leaves the kitchen. Fresh ingredients, bold flavors, made for
            you — that&apos;s the whole idea.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="rounded-2xl border border-line px-6 py-8 text-center">
                <p className="font-display text-3xl tracking-wide text-accent">
                  {s.value}
                </p>
                <p className="mt-1 text-sm uppercase tracking-wide text-muted">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <div className="overflow-hidden rounded-[1.75rem] border border-line">
            <Image
              src="/story/fn-team.jpg"
              alt="The Fresh Noodles kitchen team standing together"
              width={1086}
              height={1448}
              className="max-h-[520px] w-full object-cover"
              sizes="(max-width: 640px) 100vw, 1024px"
            />
          </div>
          <p className="mt-3 text-sm font-bold uppercase tracking-widest text-muted">
            The FN Team
          </p>
        </Reveal>
      </div>
    </section>
  );
}
