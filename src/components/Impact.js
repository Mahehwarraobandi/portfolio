import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/SpotlightCard";
import { stats } from "@/data/resume";

/** Home-page "by the numbers" band — the headline figures, counted up. */
export default function Impact() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-8 lg:px-10">
      <SectionHeading
        index="02"
        title="Impact"
        lead="Measured in outcomes, not in tools."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={0.08 * index} from="up">
            <SpotlightCard className="border-fg/10 bg-fg/[0.02] h-full rounded-3xl border p-8">
              <span className="text-fg/25 font-mono text-[10px] tracking-[0.24em]">
                0{index + 1}
              </span>
              <div className="text-gradient mt-8 text-[clamp(2.6rem,5vw,3.8rem)] leading-none font-semibold tracking-[-0.045em]">
                <Counter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <span className="rule-gradient mt-6 block h-px w-10 transition-all duration-500 group-hover:w-24" />
              <p className="text-fg/50 mt-4 font-mono text-[11px] leading-relaxed tracking-[0.14em] uppercase">
                {stat.label}
              </p>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
