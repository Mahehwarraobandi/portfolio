import Ambient from "@/components/Ambient";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { education, skills } from "@/data/resume";

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-28 lg:px-10 lg:py-36"
    >
      <Ambient variant="top" />
      <SectionHeading
        index="04"
        title="Capabilities"
        lead="The stack I build with, end to end."
      />

      <div className="border-fg/10 bg-fg/10 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, index) => (
          <Reveal
            key={group.title}
            delay={0.04 * index}
            className="group bg-bg hover:bg-fg/[0.035] p-7 transition-colors duration-500"
          >
            <h3 className="text-fg/45 group-hover:text-fg font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-300">
              {group.title}
            </h3>
            <span className="bg-fg/20 group-hover:from-accent group-hover:to-accent-2 mt-4 mb-5 block h-px w-8 transition-all duration-500 group-hover:w-16 group-hover:bg-gradient-to-r" />
            <ul className="flex flex-wrap gap-x-3 gap-y-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="text-fg/50 hover:text-accent text-sm transition-colors duration-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-6">
        <div className="border-fg/10 hover:border-accent/40 flex flex-wrap items-baseline justify-between gap-4 rounded-2xl border p-7 transition-colors duration-500">
          <div>
            <span className="text-fg/40 font-mono text-[11px] tracking-[0.18em] uppercase">
              Education
            </span>
            <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em]">
              {education.degree}
            </h3>
            <p className="text-fg/50 mt-1">{education.school}</p>
          </div>
          <div className="text-fg/40 text-right font-mono text-xs tracking-[0.14em] uppercase">
            <div>{education.date}</div>
            <div className="mt-1">GPA {education.gpa}</div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
