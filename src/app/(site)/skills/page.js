import PageHero from "@/components/PageHero";
import Skills from "@/components/Skills";

export const metadata = {
  title: "Skills",
  description:
    "Front end, back end and APIs, cloud and DevOps, databases, AI and automation, and SEO and analytics.",
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  return (
    <>
      <PageHero
        eyebrow="04 / Skills"
        title="Capabilities"
        lead="The stack I build with, end to end — from the interface and the API to the database, the model, and the pipeline that ships it."
      />
      <Skills showHeading={false} />
    </>
  );
}
