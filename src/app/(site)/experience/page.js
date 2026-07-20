import Experience from "@/components/Experience";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Experience",
  description:
    "Five years shipping machine learning and generative AI across financial services, logistics, pharmaceuticals, and insurance.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        eyebrow="02 / Experience"
        title="Experience"
        lead="Five years shipping ML and GenAI across finance, logistics, pharma, and insurance — every role, every outcome, in full."
      />
      <Experience showHeading={false} />
    </>
  );
}
