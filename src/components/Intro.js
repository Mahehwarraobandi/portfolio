import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/SpotlightCard";
import { education, profile, publication } from "@/data/resume";

/**
 * The home page's introduction — who I am, plus education and the
 * publication. The deeper achievement and experience detail lives on /about
 * and /experience.
 */
export default function Intro() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <SectionHeading
        index="01"
        title="Introduction"
        lead="I build the whole product — the interface, the API and data behind it, and the AI that makes it useful."
      />

      <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr]">
        <Reveal from="up">
          <p className="text-fg/65 text-lg leading-relaxed">
            {profile.summary}
          </p>
          <p className="text-fg/65 mt-6 text-lg leading-relaxed">
            {profile.summaryLong}
          </p>

          <Link
            href="/about"
            className="group text-accent mt-8 inline-flex items-center gap-2 font-mono text-xs tracking-[0.16em] uppercase"
          >
            More about me
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>

        <Reveal delay={0.12} from="up">
          <SpotlightCard className="border-fg/10 bg-fg/[0.02] rounded-3xl border p-8">
            <span className="text-fg/40 font-mono text-[10px] tracking-[0.24em] uppercase">
              Education
            </span>

            <ol className="border-fg/10 relative mt-6 space-y-7 border-l pl-6">
              {education.map((school) => (
                <li key={school.degree} className="relative">
                  <span className="bg-accent absolute top-1.5 -left-[29px] h-2.5 w-2.5 rounded-full" />
                  <h3 className="text-lg leading-snug font-semibold tracking-[-0.02em]">
                    {school.degree}
                  </h3>
                  <p className="text-fg/55 mt-1 text-sm">{school.school}</p>
                  <p className="text-fg/40 mt-2 font-mono text-[10px] tracking-[0.16em] uppercase">
                    {school.period} · GPA {school.gpa}
                  </p>
                </li>
              ))}
            </ol>

            <div className="border-fg/10 mt-8 border-t pt-6">
              <span className="text-fg/35 font-mono text-[10px] tracking-[0.18em] uppercase">
                Publication · {publication.year}
              </span>
              <p className="text-fg/80 mt-2 text-sm font-medium">
                {publication.title}
              </p>
              <p className="text-fg/45 mt-1 text-xs">
                {publication.venue} · {publication.role} · {publication.note}
              </p>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
