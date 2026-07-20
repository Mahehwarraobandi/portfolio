import Ambient from "@/components/Ambient";
import Reveal from "@/components/Reveal";
import { profile } from "@/data/resume";

const links = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/[^\d+]/g, "")}`,
  },
  {
    label: "LinkedIn",
    value: profile.linkedinHandle,
    href: profile.linkedin,
  },
];

export default function Contact() {
  return (
    <footer
      id="contact"
      className="border-fg/10 relative scroll-mt-24 overflow-hidden border-t"
    >
      <Ambient variant="bottom" />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
        <Reveal>
          <span className="text-fg/40 font-mono text-xs tracking-[0.24em] uppercase">
            Get in touch
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-8 text-[clamp(2.2rem,7vw,5.5rem)] leading-[0.98] font-semibold tracking-[-0.04em]">
            Let&apos;s build something
            <br />
            <span className="from-accent via-accent-2 to-accent-3 bg-gradient-to-r bg-clip-text text-transparent">
              that ships.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <a
            href={`mailto:${profile.email}`}
            className="group from-accent to-accent-2 mt-12 inline-flex items-center gap-4 rounded-full bg-gradient-to-r px-8 py-4 font-mono text-xs tracking-[0.16em] text-white uppercase transition-transform duration-300 hover:scale-[1.03]"
          >
            {profile.email}
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </a>
        </Reveal>

        <div className="border-fg/10 bg-fg/10 mt-20 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-3">
          {links.map((link, index) => (
            <Reveal
              key={link.label}
              delay={0.06 * index}
              className="bg-bg hover:bg-fg/[0.04] p-6 transition-colors duration-500"
            >
              <span className="text-fg/35 font-mono text-[10px] tracking-[0.2em] uppercase">
                {link.label}
              </span>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="text-fg/70 hover:text-fg mt-3 block transition-colors duration-300"
              >
                {link.value}
              </a>
            </Reveal>
          ))}
        </div>

        <div className="border-fg/10 mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-8">
          <span className="text-fg/30 font-mono text-[11px] tracking-[0.16em] uppercase">
            © {new Date().getFullYear()} {profile.name}
          </span>
          <a
            href="#top"
            className="group text-fg/30 hover:text-fg font-mono text-[11px] tracking-[0.16em] uppercase transition-colors"
          >
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">
              ↑
            </span>{" "}
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
