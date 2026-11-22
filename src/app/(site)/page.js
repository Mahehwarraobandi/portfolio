import Domains from "@/components/Domains";
import Hero from "@/components/Hero";
import Impact from "@/components/Impact";
import Intro from "@/components/Intro";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Intro />
      <Impact />
      <Domains />
      <Projects />
    </>
  );
}
