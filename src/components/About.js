import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { profile, stats } from "@/data/resume";

export default function About() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-28 lg:px-10 lg:py-36"
    >
      <SectionHeading
        index="01"
        title="About"
        lead="I turn ambiguous business problems into production AI systems with measurable outcomes."
      />

      <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
        <Reveal from="up">
          <p className="text-fg/60 text-lg leading-relaxed">
            {profile.summaryLong}
          </p>
          <p className="text-fg/60 mt-6 text-lg leading-relaxed">
            Currently building enterprise GenAI at{" "}
            <span className="from-accent to-accent-2 bg-gradient-to-r bg-clip-text font-medium text-transparent">
              JP Morgan Chase
            </span>{" "}
            — retrieval over 500K+ documents, fine-tuned open models, and the
            observability layer that keeps a dozen production agents honest.
          </p>
        </Reveal>

        <div className="border-fg/10 bg-fg/10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={0.08 * index}
              className="group bg-bg hover:bg-fg/[0.04] p-6 transition-colors duration-500 sm:p-8"
            >
              <div className="text-gradient text-[clamp(1.9rem,4vw,3rem)] leading-none font-semibold tracking-[-0.03em]">
                <Counter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-fg/40 mt-3 font-mono text-[11px] leading-relaxed tracking-[0.14em] uppercase">
                {stat.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
