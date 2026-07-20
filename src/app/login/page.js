import Link from "next/link";
import Ambient from "@/components/Ambient";
import LoginForm from "@/components/LoginForm";
import NeuralArt from "@/components/NeuralArt";
import ThemeToggle from "@/components/ThemeToggle";
import { marquee, profile, stats } from "@/data/resume";

export const metadata = {
  title: "Sign in",
  description:
    "Sign in with your details to unlock the full résumé and case studies.",
  // A gate has nothing useful to index, and indexing it would compete with the
  // portfolio itself in search results.
  robots: { index: false, follow: true },
};

const HIGHLIGHTS = stats.slice(0, 3);

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const rawNext = params?.next;
  // Only ever hand our own paths to the form's hidden field.
  const next =
    typeof rawNext === "string" &&
    rawNext.startsWith("/") &&
    !rawNext.startsWith("//")
      ? rawNext
      : "/resume";

  return (
    <main className="relative flex min-h-svh flex-col overflow-hidden">
      <Ambient variant="top" />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link
          href="/"
          className="group text-fg font-mono text-sm tracking-[0.2em] uppercase"
        >
          MRB
          <span className="from-accent to-accent-2 ml-1 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-br align-middle transition-transform duration-500 group-hover:scale-150" />
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-fg/50 hover:text-fg font-mono text-xs tracking-[0.14em] uppercase transition-colors"
          >
            ← Back to portfolio
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-16 px-6 py-10 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-24 lg:px-10">
        {/* Left: the AI panel. Hidden on small screens, where the form matters more. */}
        <section className="hidden lg:block">
          <div className="border-fg/10 bg-fg/[0.02] relative overflow-hidden rounded-3xl border p-10 backdrop-blur-sm">
            <div className="pointer-events-none absolute inset-0 bg-[conic-gradient(from_140deg,var(--wash-1),var(--wash-2),var(--wash-3),var(--wash-1))] opacity-40 blur-3xl" />

            <div className="relative">
              <span className="text-fg/40 font-mono text-[10px] tracking-[0.24em] uppercase">
                Recruiter access
              </span>

              <h1 className="mt-6 text-[clamp(2rem,3.4vw,3.2rem)] leading-[1.05] font-semibold tracking-[-0.035em]">
                Built with
                <br />
                <span className="from-accent via-accent-2 to-accent-3 bg-gradient-to-r bg-clip-text text-transparent">
                  production AI.
                </span>
              </h1>

              <p className="text-fg/55 mt-5 max-w-md text-sm leading-relaxed">
                {profile.summary}
              </p>

              <div className="mx-auto my-8 aspect-[5/3] w-full max-w-lg">
                <NeuralArt />
              </div>

              <dl className="border-fg/10 grid grid-cols-3 gap-6 border-t pt-7">
                {HIGHLIGHTS.map((item) => (
                  <div key={item.label}>
                    <dt className="from-accent to-accent-2 bg-gradient-to-r bg-clip-text font-mono text-xl font-semibold text-transparent">
                      {item.prefix ?? ""}
                      {item.value}
                      {item.suffix ?? ""}
                    </dt>
                    <dd className="text-fg/40 mt-1.5 text-[11px] leading-snug">
                      {item.label}
                    </dd>
                  </div>
                ))}
              </dl>

              <ul className="mt-8 flex flex-wrap gap-2">
                {marquee.slice(0, 8).map((tech) => (
                  <li
                    key={tech}
                    className="border-fg/10 bg-fg/[0.03] text-fg/45 rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.1em]"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Right: the form. */}
        <section className="w-full">
          <div className="border-fg/10 bg-bg/60 rounded-3xl border p-8 backdrop-blur-xl sm:p-10">
            <div className="mb-8">
              <span className="text-fg/40 font-mono text-[10px] tracking-[0.24em] uppercase">
                Sign in
              </span>
              <h2 className="mt-4 text-2xl leading-tight font-semibold tracking-[-0.03em] sm:text-3xl">
                Who&apos;s visiting?
              </h2>
              <p className="text-fg/50 mt-3 text-sm leading-relaxed">
                Tell me a little about you and I&apos;ll unlock the full résumé,
                detailed case studies, and my direct contact details.
              </p>
            </div>

            <LoginForm next={next} />
          </div>

          <p className="text-fg/30 mt-6 text-center text-[11px]">
            Just want to look around?{" "}
            <Link href="/" className="text-fg/50 hover:text-accent underline">
              The portfolio is open to everyone.
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
