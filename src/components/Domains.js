import Link from "next/link";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/SpotlightCard";
import { domains } from "@/data/resume";

/** Line glyphs per practice area — inline SVG so they theme via currentColor. */
const ICONS = {
  web: (
    <path d="M4 5h16v11H4zM8 20h8M12 16v4M8 9l-2 2 2 2M16 9l2 2-2 2M13 8l-2 6" />
  ),
  ai: (
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M6.3 17.7l2.1-2.1M15.6 8.4l2.1-2.1M12 9a3 3 0 100 6 3 3 0 000-6z" />
  ),
  ds: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2M4 10l6-6 6 9 5-5" />,
};

/**
 * The three practice areas on the home page — full stack web, AI &
 * automation, and data science — naming the company, the work, and the period
 * so a recruiter gets the shape of the career without leaving the page.
 */
export default function Domains() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <SectionHeading
        index="03"
        title="What I do"
        lead="Three practice areas, one throughline: ship it, then prove it worked."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {domains.map((domain, index) => (
          <Reveal key={domain.key} delay={0.1 * index} from="up">
            <SpotlightCard className="border-fg/10 bg-fg/[0.02] flex h-full flex-col rounded-3xl border p-8">
              <div className="flex h-full flex-col">
                <div className="flex items-start justify-between">
                  <span className="border-fg/15 text-accent group-hover:border-accent/50 flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-500 group-hover:rotate-[-8deg]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                      aria-hidden="true"
                    >
                      {ICONS[domain.key]}
                    </svg>
                  </span>
                  <span className="text-fg/10 group-hover:text-fg/20 text-5xl font-semibold tracking-[-0.05em] transition-colors duration-500">
                    0{index + 1}
                  </span>
                </div>

                <span className="text-accent mt-8 font-mono text-[10px] tracking-[0.24em] uppercase">
                  {domain.period}
                </span>

                <h3 className="mt-3 text-2xl leading-tight font-semibold tracking-[-0.03em]">
                  {domain.title}
                </h3>

                <p className="text-fg/45 mt-2 font-mono text-[11px] tracking-[0.1em]">
                  {domain.company}
                </p>

                <span className="bg-fg/15 group-hover:bg-accent my-6 block h-px w-10 transition-all duration-500 group-hover:w-20" />

                <p className="text-fg/60 flex-1 text-sm leading-relaxed">
                  {domain.blurb}
                </p>

                <ul className="border-fg/10 mt-7 space-y-2.5 border-t pt-6">
                  {domain.points.map((point) => (
                    <li
                      key={point}
                      className="text-fg/70 flex items-start gap-3 text-sm"
                    >
                      <span className="bg-accent-2 mt-[0.5em] block h-1 w-1 shrink-0 rounded-full" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-12 text-center">
        <Magnetic>
          <Link
            href="/experience"
            className="group border-fg/20 text-fg hover:border-accent/60 hover:text-accent glass inline-flex items-center gap-3 rounded-full border px-7 py-3.5 font-mono text-xs tracking-[0.16em] uppercase transition-colors duration-300"
          >
            See the full experience
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Magnetic>
      </Reveal>
    </section>
  );
}
