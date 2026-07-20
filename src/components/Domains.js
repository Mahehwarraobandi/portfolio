import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { domains } from "@/data/resume";

/**
 * The three practice areas on the home page — one card each for Generative AI,
 * Machine Learning, and Data Science, naming the company, the work, and the
 * period so a recruiter gets the shape of the career without leaving the page.
 */
export default function Domains() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <SectionHeading
        index="02"
        title="What I do"
        lead="Three practice areas, five years, four industries."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {domains.map((domain, index) => (
          <Reveal key={domain.key} delay={0.1 * index} from="up">
            <article className="group border-fg/10 bg-fg/[0.02] hover:border-accent/40 relative flex h-full flex-col overflow-hidden rounded-3xl border p-8 transition-colors duration-500">
              <div className="from-accent/[0.07] pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative flex flex-1 flex-col">
                <span className="from-accent to-accent-2 bg-gradient-to-r bg-clip-text font-mono text-[10px] tracking-[0.24em] text-transparent uppercase">
                  {domain.period}
                </span>

                <h3 className="mt-4 text-2xl leading-tight font-semibold tracking-[-0.03em]">
                  {domain.title}
                </h3>

                <p className="text-fg/45 mt-2 font-mono text-[11px] tracking-[0.1em]">
                  {domain.company}
                </p>

                <span className="bg-fg/15 group-hover:from-accent group-hover:to-accent-2 my-6 block h-px w-10 transition-all duration-500 group-hover:w-20 group-hover:bg-gradient-to-r" />

                <p className="text-fg/55 flex-1 text-sm leading-relaxed">
                  {domain.blurb}
                </p>

                <ul className="border-fg/10 mt-7 space-y-2.5 border-t pt-6">
                  {domain.points.map((point) => (
                    <li
                      key={point}
                      className="text-fg/65 flex items-start gap-3 text-sm"
                    >
                      <span className="bg-accent-2 mt-[0.5em] block h-1 w-1 shrink-0 rounded-full" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-12 text-center">
        <Link
          href="/experience"
          className="group border-fg/20 text-fg hover:border-accent/60 hover:text-accent inline-flex items-center gap-3 rounded-full border px-7 py-3.5 font-mono text-xs tracking-[0.16em] uppercase transition-colors duration-300"
        >
          See the full experience
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
