import Link from "next/link";
import Image from "next/image";
import Counter from "@/components/Counter";
import Magnetic from "@/components/Magnetic";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/SpotlightCard";
import {
  achievements,
  education,
  experience,
  profile,
  publication,
  stats,
} from "@/data/resume";

export const metadata = {
  title: "About",
  description: `About ${profile.name} — full stack AI engineer: achievements, education, and career history across web, AI, and data science.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="01 / About" title="About me" lead={profile.summary} />

      {/* Portrait + narrative */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_1.4fr]">
          <Reveal from="up" className="lg:sticky lg:top-28">
            <div className="border-spin border-fg/10 relative aspect-square w-full overflow-hidden rounded-3xl">
              <div className="absolute inset-[1px] overflow-hidden rounded-[calc(1.5rem-1px)]">
                <Image
                  src="/portrait.jpg"
                  alt={`Portrait of ${profile.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 30rem"
                  className="object-cover grayscale transition-all duration-700 hover:scale-105 hover:grayscale-0"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} from="up">
            <p className="text-fg/70 text-lg leading-relaxed">
              I&apos;m a {profile.headline} based in {profile.location}. I build
              the whole product: the interface people use, the API and data
              behind it, and the AI features that make it useful.
            </p>
            <p className="text-fg/60 mt-6 leading-relaxed">
              At <span className="text-shimmer font-medium">Nimbus Teck</span>,
              I build Next.js and React front ends, FastAPI back ends on
              PostgreSQL, and streaming LLM features on Gemini via Vertex AI —
              deployed on Google Cloud with Cloud Build CI/CD. Automating
              reporting, data prep, and document handling there cut about 40% of
              our weekly manual work.
            </p>
            <p className="text-fg/60 mt-6 leading-relaxed">
              Before that I was a Data Scientist at Ajanta Pharma, where my
              forecasting models informed $50M+ in annual inventory and pricing
              decisions and 15+ models went to production. I care more about
              solving the real problem than about the tool.
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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((item, index) => (
            <Reveal key={item.label} delay={0.04 * index} className="h-full">
              <SpotlightCard className="border-fg/10 bg-fg/[0.02] h-full rounded-3xl border p-7">
                <div className="text-shimmer text-3xl font-semibold tracking-[-0.03em]">
                  {item.metric}
                </div>
                <h3 className="text-fg/80 mt-4 text-sm leading-snug font-medium">
                  {item.label}
                </h3>
                <p className="text-fg/45 mt-2 text-xs leading-relaxed">
                  {item.context}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Career at a glance */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
        <SectionHeading
          index="03"
          title="Career at a glance"
          lead="Two companies, two disciplines, one throughline."
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
      </section>

      {/* Education + publication */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
        <SectionHeading
          index="04"
          title="Education"
          lead="Data science by degree, computer science by training."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {education.map((school, index) => (
            <Reveal key={school.degree} delay={0.06 * index} className="h-full">
              <SpotlightCard className="border-fg/10 h-full rounded-3xl border p-7">
                <span className="text-fg/40 font-mono text-[10px] tracking-[0.2em] uppercase">
                  {school.period}
                </span>
                <h3 className="mt-4 text-xl leading-snug font-semibold tracking-[-0.02em]">
                  {school.degree}
                </h3>
                <p className="text-fg/55 mt-2 text-sm">{school.school}</p>
                <p className="text-fg/40 mt-5 font-mono text-xs tracking-[0.14em] uppercase">
                  GPA {school.gpa}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
          <Reveal delay={0.12} className="h-full">
            <SpotlightCard className="border-fg/10 h-full rounded-3xl border p-7">
              <span className="text-fg/40 font-mono text-[10px] tracking-[0.2em] uppercase">
                Publication · {publication.year}
              </span>
              <h3 className="mt-4 text-xl leading-snug font-semibold tracking-[-0.02em]">
                {publication.title}
              </h3>
              <p className="text-fg/55 mt-2 text-sm">
                {publication.venue} · {publication.role}
              </p>
              <p className="text-fg/40 mt-5 font-mono text-xs tracking-[0.14em] uppercase">
                {publication.note}
              </p>
            </SpotlightCard>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-12">
          <Magnetic>
            <Link
              href="/experience"
              className="group from-accent to-accent-2 inline-flex items-center gap-3 rounded-full bg-gradient-to-r px-7 py-3.5 font-mono text-xs tracking-[0.16em] text-white uppercase shadow-[0_10px_40px_-10px_var(--accent-1)]"
            >
              Read the full experience
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Magnetic>
        </Reveal>
      </section>
    </>
  );
}
