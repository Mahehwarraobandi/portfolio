/**
 * Layered gradient washes that sit behind a section. Purely decorative —
 * colours come from the theme tokens so they recolour with light/dark.
 */
export default function Ambient({ variant = "top" }) {
  const positions =
    variant === "bottom"
      ? [
          "left-[-10%] bottom-[-25%] h-[520px] w-[520px]",
          "right-[-5%] bottom-[-10%] h-[440px] w-[440px]",
          "left-[35%] bottom-[-30%] h-[600px] w-[600px]",
        ]
      : [
          "left-[-8%] top-[-15%] h-[560px] w-[560px]",
          "right-[-10%] top-[5%] h-[480px] w-[480px]",
          "left-[45%] top-[-25%] h-[620px] w-[620px]",
        ];

  const washes = [
    "bg-[radial-gradient(circle,var(--wash-1),transparent_70%)]",
    "bg-[radial-gradient(circle,var(--wash-2),transparent_70%)]",
    "bg-[radial-gradient(circle,var(--wash-3),transparent_72%)]",
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {positions.map((position, index) => (
        <div
          key={position}
          className={`animate-drift absolute rounded-full blur-3xl ${position} ${washes[index]}`}
          style={{ animationDelay: `${index * 2.5}s` }}
        />
      ))}
    </div>
  );
}
