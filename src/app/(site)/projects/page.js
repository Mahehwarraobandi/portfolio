import PageHero from "@/components/PageHero";
import Projects from "@/components/Projects";

export const metadata = {
  title: "Projects",
  description:
    "Agentic GenAI systems and fine-tuned models built end to end — multi-agent financial research and a domain-tuned medical QA chatbot.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="03 / Projects"
        title="Selected projects"
        lead="Agentic systems and fine-tuned models built end to end — from retrieval design and evaluation through to deployment."
      />
      <Projects showHeading={false} />
    </>
  );
}
