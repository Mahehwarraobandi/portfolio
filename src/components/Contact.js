import Ambient from "@/components/Ambient";
import Magnetic from "@/components/Magnetic";
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
      <div className="grid-lines mask-radial pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-10 lg:px-10 lg:pt-36">
        <Reveal>
          <span className="text-fg/40 font-mono text-xs tracking-[0.24em] uppercase">
            Get in touch
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-8 text-[clamp(2.2rem,7vw,5.5rem)] leading-[0.98] font-semibold tracking-[-0.04em]">
            Let&apos;s build something
            <br />
            <span className="text-shimmer">that ships.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <Magnetic className="mt-12">
            <a
              href={`mailto:${profile.email}`}
              className="group from-accent to-accent-2 relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-gradient-to-r px-8 py-4 font-mono text-xs tracking-[0.16em] text-white uppercase shadow-[0_10px_40px_-10px_var(--accent-1)]"
            >
              <span className="from-accent-2 to-accent-3 absolute inset-0 -translate-x-full bg-gradient-to-r transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative z-10">{profile.email}</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </a>
          </Magnetic>
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
                className="text-fg/70 hover:text-fg mt-3 block break-words transition-colors duration-300"
              >
                {link.value}
              </a>
            </Reveal>
          ))}
        </div>

        {/* Oversized wordmark — fills with the accent gradient on hover. */}
        <Reveal delay={0.1} className="mt-24">
          <p
            aria-hidden="true"
            className="group text-outline hover:from-accent hover:via-accent-2 hover:to-accent-3 cursor-default bg-clip-text text-center text-[clamp(2rem,9vw,7.25rem)] leading-none font-semibold tracking-[-0.06em] whitespace-nowrap transition-all duration-700 select-none hover:bg-gradient-to-r hover:[-webkit-text-stroke:0px]"
          >
            {profile.name}
          </p>
        </Reveal>

        <div className="border-fg/10 mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-8">
          <span className="text-fg/30 font-mono text-[11px] tracking-[0.16em] uppercase">
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span className="text-fg/25 font-mono text-[11px] tracking-[0.16em] uppercase">
            Built with Next.js · Running on Cloudflare
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
