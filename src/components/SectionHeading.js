import Reveal from "@/components/Reveal";

export default function SectionHeading({ index, title, lead }) {
  return (
    <div className="mb-16 lg:mb-20">
      <Reveal from="left">
        <div className="flex items-center gap-4">
          <span className="from-accent to-accent-2 bg-gradient-to-r bg-clip-text font-mono text-xs tracking-[0.24em] text-transparent">
            {index}
          </span>
          <span className="rule-gradient h-px w-12" />
          <span className="text-fg/50 font-mono text-xs tracking-[0.24em] uppercase">
            {title}
          </span>
        </div>
      </Reveal>
      {lead ? (
        <Reveal delay={0.1}>
          <h2 className="text-balance-tight mt-6 max-w-4xl text-[clamp(1.9rem,4.6vw,3.6rem)] leading-[1.08] font-semibold tracking-[-0.035em]">
            {lead}
          </h2>
        </Reveal>
      ) : null}
    </div>
  );
}
