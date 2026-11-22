import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import {
  education,
  experience,
  profile,
  projects,
  publication,
  skills,
} from "@/data/resume";

export const metadata = {
  title: "Résumé",
  // Open to everyone, but kept out of the index so it doesn't compete with the
  // portfolio pages, which carry the same content, in search results.
  robots: { index: false, follow: true },
};

function SectionTitle({ children }) {
  return (
    <h2 className="border-fg/10 text-fg/40 mb-8 border-b pb-3 font-mono text-xs tracking-[0.24em] uppercase">
      {children}
    </h2>
  );
}

function Bullets({ items }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((bullet) => (
        <li
          key={bullet.slice(0, 48)}
          className="text-fg/65 flex gap-3 text-sm leading-relaxed"
        >
          <span className="text-accent-2 mt-[0.45em] block h-1 w-1 shrink-0 rounded-full bg-current" />
          {bullet}
        </li>
      ))}
    </ul>
  );
}

export default function ResumePage() {
  return (
    <main className="relative min-h-svh overflow-hidden">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-10 lg:px-10">
        <header className="mb-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-fg/50 hover:text-fg font-mono text-xs tracking-[0.14em] uppercase transition-colors"
          >
            ← Portfolio
          </Link>
          <ThemeToggle />
        </header>

        <div className="mb-12">
          <h1 className="text-[clamp(2.2rem,6vw,4rem)] leading-[1] font-semibold tracking-[-0.04em]">
            {profile.name}
          </h1>
          <p className="text-accent mt-3 font-mono text-sm tracking-[0.12em] uppercase">
            {profile.headline}
          </p>
          <div className="text-fg/50 mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href={`mailto:${profile.email}`} className="hover:text-accent">
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone.replace(/[^\d+]/g, "")}`}
              className="hover:text-accent"
            >
              {profile.phone}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent"
            >
              LinkedIn
            </a>
            <span>{profile.location}</span>
          </div>
          <p className="text-fg/60 mt-6 max-w-3xl text-sm leading-relaxed">
            {profile.summaryResume}
          </p>

          {/* The actual file. Generated from the same resume data by
              `npm run generate:resume`, so it can't drift from this page. */}
          <a
            href="/resume.pdf"
            download="Maheshwar-Rao-Bandi-Resume.pdf"
            className="group text-bg bg-fg mt-8 inline-flex items-center gap-3 rounded-full px-7 py-3.5 font-mono text-xs tracking-[0.16em] uppercase transition-transform duration-300 hover:scale-[1.03]"
          >
            Download PDF
            <span className="transition-transform duration-300 group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
        </div>

        <section className="mb-14">
          <SectionTitle>Technical skills</SectionTitle>
          <div className="grid gap-6 sm:grid-cols-2">
            {skills.map((group) => (
              <div key={group.title}>
                <h3 className="text-fg mb-2 text-sm font-semibold">
                  {group.title}
                </h3>
                <p className="text-fg/50 text-xs leading-relaxed">
                  {group.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <SectionTitle>Experience</SectionTitle>
          <div className="space-y-10">
            {experience.map((job) => (
              <article key={`${job.company}-${job.period}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold tracking-[-0.02em]">
                    {job.role} —{" "}
                    <span className="text-accent">{job.company}</span>
                  </h3>
                  <span className="text-fg/40 font-mono text-[11px] tracking-[0.1em]">
                    {job.period}
                  </span>
                </div>
                <p className="text-fg/35 mt-1 text-xs">{job.location}</p>
                <Bullets items={job.bullets} />
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <SectionTitle>Projects</SectionTitle>
          <div className="space-y-10">
            {projects.map((project) => (
              <article key={project.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold tracking-[-0.02em]">
                    {project.title}{" "}
                    <span className="text-fg/40 text-sm font-normal">
                      · {project.org}
                    </span>
                  </h3>
                  <span className="text-fg/40 font-mono text-[11px] tracking-[0.1em]">
                    {project.period}
                  </span>
                </div>
                <Bullets items={project.bullets} />
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <SectionTitle>Education</SectionTitle>
          <div className="space-y-6">
            {education.map((school) => (
              <div
                key={school.degree}
                className="flex flex-wrap items-baseline justify-between gap-2"
              >
                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.02em]">
                    {school.degree}
                  </h3>
                  <p className="text-fg/50 mt-1 text-sm">
                    {school.school} · GPA {school.gpa}
                  </p>
                </div>
                <span className="text-fg/40 font-mono text-[11px] tracking-[0.1em]">
                  {school.period}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-20">
          <SectionTitle>Publication</SectionTitle>
          <p className="text-fg/70 text-sm leading-relaxed">
            <span className="text-fg font-semibold">{publication.title}</span>,{" "}
            {publication.venue}, {publication.role.toLowerCase()},{" "}
            {publication.year}; {publication.note.toLowerCase()}
          </p>
        </section>
      </div>
    </main>
  );
}
