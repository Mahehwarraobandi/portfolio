import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/SpotlightCard";
import { education, publication, skills } from "@/data/resume";

// Bento layout on large screens: front end + back end share the first row,
// cloud / databases / AI the second, then SEO & analytics beside the
// operating systems.
const SPANS = [
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-4",
  "lg:col-span-2",
];

/** See the note on `Experience` — `showHeading` avoids a duplicate title. */
export default function Skills({ showHeading = true }) {
  return (
    <section
      id="skills"
      className={`relative mx-auto max-w-7xl scroll-mt-24 px-6 lg:px-10 ${
        showHeading ? "py-28 lg:py-36" : "pt-8 pb-28 lg:pb-36"
      }`}
    >
      {showHeading ? (
        <SectionHeading
          index="05"
          title="Capabilities"
          lead="The stack I build with, end to end."
        />
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {skills.map((group, index) => (
          <Reveal
            key={group.title}
            delay={0.05 * index}
            className={SPANS[index] ?? "lg:col-span-2"}
          >
            <SpotlightCard className="border-fg/10 bg-fg/[0.02] h-full rounded-3xl border p-7">
              <div className="flex items-center justify-between">
                <h3 className="text-fg/55 group-hover:text-fg font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-300">
                  {group.title}
                </h3>
                <span className="text-fg/15 font-mono text-[11px]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <span className="bg-fg/20 group-hover:bg-accent mt-4 mb-6 block h-px w-8 transition-all duration-500 group-hover:w-16" />
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-fg/10 text-fg/65 hover:border-accent/50 hover:text-accent bg-bg/40 rounded-full border px-3 py-1.5 text-sm transition-colors duration-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {education.map((school, index) => (
          <Reveal key={school.degree} delay={0.08 * index}>
            <SpotlightCard className="border-fg/10 h-full rounded-3xl border p-7">
              <span className="text-fg/40 font-mono text-[11px] tracking-[0.18em] uppercase">
                Education
              </span>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em]">
                {school.degree}
              </h3>
              <p className="text-fg/55 mt-1">{school.school}</p>
              <p className="text-fg/40 mt-4 font-mono text-xs tracking-[0.14em] uppercase">
                {school.period} · GPA {school.gpa}
              </p>
            </SpotlightCard>
          </Reveal>
        ))}
        <Reveal delay={0.16}>
          <SpotlightCard className="border-fg/10 h-full rounded-3xl border p-7">
            <span className="text-fg/40 font-mono text-[11px] tracking-[0.18em] uppercase">
              Publication · {publication.year}
            </span>
            <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em]">
              {publication.title}
            </h3>
            <p className="text-fg/55 mt-1">
              {publication.venue} · {publication.role}
            </p>
            <p className="text-fg/40 mt-4 font-mono text-xs tracking-[0.14em] uppercase">
              {publication.note}
            </p>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
