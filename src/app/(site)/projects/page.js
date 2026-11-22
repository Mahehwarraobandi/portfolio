import PageHero from "@/components/PageHero";
import Projects from "@/components/Projects";

export const metadata = {
  title: "Projects",
  description:
    "Full-stack AI builds end to end — a help-desk RAG platform in progress, an AI-powered career navigator with RAG, and an employee skill-prediction platform.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="03 / Projects"
        title="Selected projects"
        lead="Full-stack AI products built end to end — from the interface and API through the model and deployment. One of them is still in progress."
      />
      <Projects showHeading={false} />
    </>
  );
}
