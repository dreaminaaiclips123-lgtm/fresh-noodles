import Image from "next/image";
import Reveal from "./Reveal";

export default function Story() {
  return (
    <section id="story" className="scroll-mt-24 px-5 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold">
            Our Story
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-[clamp(2.25rem,6vw,4rem)] leading-[0.95] tracking-wide text-ink">
            One team, one passion,
            <br />
            one bowl at a time.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-12">
          <Reveal className="sm:col-span-5">
            <div className="overflow-hidden rounded-[1.75rem] border border-line">
              <Image
                src="/story/mr-nang.jpg"
                alt="Mr Nang, chef and founder of Fresh Noodles, smiling"
                width={414}
                height={414}
                className="w-full"
                sizes="(max-width: 640px) 100vw, 40vw"
              />
            </div>
            <p className="mt-4 text-sm font-bold uppercase tracking-widest text-muted">
              Mr Nang, Chef &amp; Founder
            </p>
          </Reveal>

          <Reveal delay={100} className="sm:col-span-7">
            <p className="text-lg font-medium leading-relaxed text-ink sm:text-xl">
              Fresh Noodles started with Mr Nang bringing the Korean and
              Chinese flavors he grew up on into a small kitchen inside
              Sunset Compound — bold sauces, real spice, nothing frozen
              longer than it has to be.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Every bowl is tossed to order by the FN team, right before it
              leaves the kitchen. Fresh ingredients, bold flavors, made for
              you — that&apos;s the whole idea.
            </p>
            <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-line">
              <Image
                src="/story/fn-team.jpg"
                alt="The Fresh Noodles kitchen team standing together"
                width={414}
                height={414}
                className="w-full"
                sizes="(max-width: 640px) 100vw, 60vw"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
