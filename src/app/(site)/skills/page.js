import PageHero from "@/components/PageHero";
import Skills from "@/components/Skills";

export const metadata = {
  title: "Skills",
  description:
    "Generative AI, LLM tooling, vector databases, deep learning, NLP, data engineering, cloud and MLOps, programming, and visualization.",
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  return (
    <>
      <PageHero
        eyebrow="04 / Skills"
        title="Capabilities"
        lead="The stack I build with, end to end — from retrieval and fine-tuning through to the pipelines and platforms that keep it running."
      />
      <Skills showHeading={false} />
    </>
  );
}
