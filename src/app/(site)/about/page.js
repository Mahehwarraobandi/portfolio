import Link from "next/link";
import Image from "next/image";
import Counter from "@/components/Counter";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { achievements, experience, profile, stats } from "@/data/resume";

export const metadata = {
  title: "About",
  description: `About ${profile.name} — achievements, accomplishments, and career history across generative AI, machine learning, and data science.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="01 / About"
        title="About me"
        lead={profile.summaryLong}
      />

      {/* Portrait + narrative */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_1.4fr]">
          <Reveal from="up">
            <div className="border-fg/10 relative aspect-square w-full overflow-hidden rounded-3xl border">
              <Image
                src="/portrait.jpg"
                alt={`Portrait of ${profile.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 30rem"
                className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} from="up">
            <p className="text-fg/65 text-lg leading-relaxed">
              I&apos;m a {profile.roles[0]} based in {profile.location}, with 5+
              years across applied ML, deep learning, and analytics — including
              2+ years shipping production generative AI in financial services,
              logistics, pharmaceuticals, and insurance.
            </p>
            <p className="text-fg/55 mt-6 leading-relaxed">
              My work sits where research meets operations: retrieval systems
              that stay fast at 500K+ documents, fine-tuned open models that
              beat their base checkpoints on domain data, and the evaluation and
              observability layers that make it safe to put any of it in front
              of customers.
            </p>
            <p className="text-fg/55 mt-6 leading-relaxed">
              Currently building enterprise GenAI at{" "}
              <span className="from-accent to-accent-2 bg-gradient-to-r bg-clip-text font-medium text-transparent">
                JP Morgan Chase
              </span>
              , where a dozen production agents run against hybrid retrieval,
              tracked end to end for token cost, hallucination rate, and prompt
              drift.
            </p>

            <div className="border-fg/10 bg-fg/10 mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border">
              {stats.map((stat, index) => (
                <Reveal
                  key={stat.label}
                  delay={0.06 * index}
                  className="bg-bg hover:bg-fg/[0.04] p-6 transition-colors duration-500"
                >
                  <div className="text-gradient text-[clamp(1.6rem,3.2vw,2.4rem)] leading-none font-semibold tracking-[-0.03em]">
                    <Counter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="text-fg/40 mt-3 font-mono text-[10px] leading-relaxed tracking-[0.14em] uppercase">
                    {stat.label}
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Achievements */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <SectionHeading
          index="02"
          title="Achievements"
          lead="Outcomes that shipped and stayed shipped."
        />

        <div className="border-fg/10 bg-fg/10 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((item, index) => (
            <Reveal
              key={item.label}
              delay={0.04 * index}
              className="group bg-bg hover:bg-fg/[0.04] p-7 transition-colors duration-500"
            >
              <div className="from-accent to-accent-2 bg-gradient-to-r bg-clip-text text-3xl font-semibold tracking-[-0.03em] text-transparent">
                {item.metric}
              </div>
              <h3 className="text-fg/80 mt-4 text-sm leading-snug font-medium">
                {item.label}
              </h3>
              <p className="text-fg/40 mt-2 text-xs leading-relaxed">
                {item.context}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Career at a glance */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
        <SectionHeading
          index="03"
          title="Career at a glance"
          lead="Four companies, four industries, one throughline."
        />

        <div className="border-fg/10 overflow-hidden rounded-2xl border">
          {experience.map((job, index) => (
            <Reveal
              key={`${job.company}-${job.period}`}
              delay={0.05 * index}
              className="border-fg/10 hover:bg-fg/[0.03] flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b p-6 transition-colors duration-500 last:border-0 sm:p-7"
            >
              <div className="min-w-[16rem] flex-1">
                <h3 className="text-lg font-semibold tracking-[-0.02em]">
                  {job.company}
                  {job.current ? (
                    <span className="border-accent/40 text-accent ml-3 rounded-full border px-2.5 py-0.5 align-middle font-mono text-[9px] tracking-[0.16em] uppercase">
                      Current
                    </span>
                  ) : null}
                </h3>
                <p className="text-fg/55 mt-1 text-sm">{job.role}</p>
              </div>
              <div className="text-fg/40 text-right font-mono text-[11px] tracking-[0.12em] uppercase">
                <div>{job.period}</div>
                <div className="mt-1">{job.location}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-12">
          <Link
            href="/experience"
            className="group from-accent to-accent-2 inline-flex items-center gap-3 rounded-full bg-gradient-to-r px-7 py-3.5 font-mono text-xs tracking-[0.16em] text-white uppercase transition-transform duration-300 hover:scale-[1.03]"
          >
            Read the full experience
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
