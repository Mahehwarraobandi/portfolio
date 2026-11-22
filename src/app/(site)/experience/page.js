import Experience from "@/components/Experience";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Experience",
  description:
    "Full stack engineering at Nimbus Teck and data science at Ajanta Pharma — every role and every outcome, in full.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        eyebrow="02 / Experience"
        title="Experience"
        lead="Full stack engineering today — Next.js, FastAPI, PostgreSQL, and LLM features on Google Cloud — and data science before it. Every role, every outcome, in full."
      />
      <Experience showHeading={false} />
    </>
  );
}
