import Reveal from "@/components/Reveal";
import WordReveal from "@/components/WordReveal";

export default function SectionHeading({ index, title, lead }) {
  return (
    <div className="mb-16 lg:mb-20">
      <Reveal from="left">
        <div className="flex items-center gap-4">
          <span className="text-accent font-mono text-xs tracking-[0.24em]">
            {index}
          </span>
          <span className="bg-accent h-px w-12" />
          <span className="text-fg/50 font-mono text-xs tracking-[0.24em] uppercase">
            {title}
          </span>
        </div>
      </Reveal>
      {lead ? (
        <WordReveal
          as="h2"
          text={lead}
          className="text-balance-tight mt-6 max-w-4xl text-[clamp(1.9rem,4.6vw,3.6rem)] leading-[1.08] font-semibold tracking-[-0.035em]"
        />
      ) : null}
    </div>
  );
}
