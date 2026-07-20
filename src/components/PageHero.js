import Ambient from "@/components/Ambient";
import Reveal from "@/components/Reveal";

/**
 * The masthead every sub-page opens with. Keeps /about, /experience,
 * /projects, /skills, and /contact visually consistent with the home hero
 * without repeating its full-height treatment.
 */
export default function PageHero({ eyebrow, title, lead }) {
  return (
    // `id="top"` gives the footer's "back to top" link a target on every
    // sub-page, the way the home hero does.
    <section
      id="top"
      className="relative overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-20"
    >
      <Ambient variant="top" />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal from="left">
          <span className="text-fg/45 font-mono text-xs tracking-[0.24em] uppercase">
            {eyebrow}
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="text-gradient mt-6 text-[clamp(2.4rem,7vw,5rem)] leading-[0.98] font-semibold tracking-[-0.04em]">
            {title}
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="rule-gradient mt-8 h-px w-40 origin-left" />
        </Reveal>

        {lead ? (
          <Reveal delay={0.22}>
            <p className="text-balance-tight text-fg/60 mt-8 max-w-3xl text-base leading-relaxed sm:text-lg">
              {lead}
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
