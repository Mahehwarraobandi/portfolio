import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { profile } from "@/data/resume";

export const metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name} — email, phone, and LinkedIn.`,
  alternates: { canonical: "/contact" },
};

const CHANNELS = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    note: "Best for role enquiries — I reply within a day.",
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/[^\d+]/g, "")}`,
    note: "Available during US Central business hours.",
  },
  {
    label: "LinkedIn",
    value: profile.linkedinHandle,
    href: profile.linkedin,
    note: "Full career history and recommendations.",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="05 / Contact"
        title="Get in touch"
        lead="Open to Generative AI, Machine Learning, and Data Science roles. The fastest way to reach me is email — or take the résumé with you."
      />

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
        <div className="border-fg/10 bg-fg/10 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-3">
          {CHANNELS.map((channel, index) => (
            <Reveal
              key={channel.label}
              delay={0.07 * index}
              className="group bg-bg hover:bg-fg/[0.04] p-7 transition-colors duration-500 sm:p-8"
            >
              <span className="text-fg/35 font-mono text-[10px] tracking-[0.2em] uppercase">
                {channel.label}
              </span>
              <a
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
                className="text-fg/80 group-hover:text-accent mt-4 block text-base break-words transition-colors duration-300"
              >
                {channel.value}
              </a>
              <p className="text-fg/35 mt-3 text-xs leading-relaxed">
                {channel.note}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Résumé download. Routed through the sign-in gate so every download
            is attributed to a named visitor on the /visitors page. */}
        <Reveal delay={0.15} className="mt-8">
          <div className="border-fg/10 bg-fg/[0.02] relative overflow-hidden rounded-3xl border p-8 sm:p-10">
            <div className="from-accent/[0.08] pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent" />

            <div className="relative flex flex-wrap items-center justify-between gap-8">
              <div className="max-w-xl">
                <span className="text-fg/40 font-mono text-[10px] tracking-[0.2em] uppercase">
                  Résumé
                </span>
                <h2 className="mt-4 text-2xl leading-tight font-semibold tracking-[-0.03em] sm:text-3xl">
                  Download the full résumé
                </h2>
                <p className="text-fg/50 mt-3 text-sm leading-relaxed">
                  A short sign-in first — name, email, and company — then the
                  PDF is yours. It lets me know who&apos;s reading and follow up
                  properly.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/login?next=%2Fresume"
                  className="group from-accent to-accent-2 relative overflow-hidden rounded-full bg-gradient-to-r px-8 py-4 text-center font-mono text-xs tracking-[0.16em] text-white uppercase transition-transform duration-300 hover:scale-[1.03]"
                >
                  <span className="from-accent-2 to-accent-3 absolute inset-0 -translate-x-full bg-gradient-to-r transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  <span className="relative z-10 inline-flex items-center gap-3">
                    Download résumé
                    <span className="transition-transform duration-300 group-hover:translate-y-0.5">
                      ↓
                    </span>
                  </span>
                </Link>
                <span className="text-fg/30 text-center font-mono text-[10px] tracking-[0.14em] uppercase">
                  PDF · No account needed
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
