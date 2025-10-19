import Intro from "../components/sections/Intro";
import LatestPaper from "../components/sections/LatestPaper";
import OpenSource from "../components/sections/OpenSource";
import Timeline from "../components/sections/Timeline";
import Skills from "../components/sections/Skills";
import Contact from "../components/sections/Contact";

export default function Home() {
  return (
    <div className="space-y-12">
      <Intro />
      <section id="papers">
        <LatestPaper />
      </section>
      <section id="oss">
        <OpenSource />
      </section>
      <section id="timeline">
        <Timeline />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}
