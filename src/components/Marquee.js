import { marquee } from "@/data/resume";

export default function Marquee() {
  const items = [...marquee, ...marquee];

  return (
    <div className="border-fg/10 bg-fg/[0.02] relative border-y py-5">
      <div className="from-bg pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r to-transparent" />
      <div className="from-bg pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l to-transparent" />
      <div className="flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="text-fg/40 flex shrink-0 items-center gap-10 font-mono text-sm tracking-[0.18em] whitespace-nowrap uppercase"
            >
              {item}
              <span aria-hidden="true" className="text-accent/40">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
