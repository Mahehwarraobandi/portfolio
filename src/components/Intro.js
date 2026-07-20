import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { education, profile } from "@/data/resume";

/**
 * The home page's introduction — who I am, plus education. The deeper
 * achievement and experience detail lives on /about and /experience.
 */
export default function Intro() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <SectionHeading
        index="01"
        title="Introduction"
        lead="I turn ambiguous business problems into production AI systems with measurable outcomes."
      />

      <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr]">
        <Reveal from="up">
          <p className="text-fg/60 text-lg leading-relaxed">
            {profile.summary}
          </p>
          <p className="text-fg/60 mt-6 text-lg leading-relaxed">
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
          <div className="border-fg/10 bg-fg/[0.02] rounded-3xl border p-8">
            <span className="text-fg/40 font-mono text-[10px] tracking-[0.24em] uppercase">
              Education
            </span>

            <h3 className="mt-5 text-xl leading-snug font-semibold tracking-[-0.02em]">
              {education.degree}
            </h3>
            <p className="text-fg/55 mt-2 text-sm">{education.school}</p>

            <dl className="border-fg/10 mt-6 grid grid-cols-2 gap-6 border-t pt-6">
              <div>
                <dt className="text-fg/35 font-mono text-[10px] tracking-[0.18em] uppercase">
                  Graduated
                </dt>
                <dd className="text-fg/75 mt-2 text-sm">{education.date}</dd>
              </div>
              <div>
                <dt className="text-fg/35 font-mono text-[10px] tracking-[0.18em] uppercase">
                  GPA
                </dt>
                <dd className="text-fg/75 mt-2 text-sm">{education.gpa}</dd>
              </div>
            </dl>

            <div className="border-fg/10 mt-6 border-t pt-6">
              <dt className="text-fg/35 font-mono text-[10px] tracking-[0.18em] uppercase">
                Based in
              </dt>
              <dd className="text-fg/75 mt-2 text-sm">{profile.location}</dd>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
