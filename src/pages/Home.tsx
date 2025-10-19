import Intro from "../components/sections/Intro";
import LatestPaper from "../components/sections/LatestPaper";
import OpenSource from "../components/sections/OpenSource";
import Timeline from "../components/sections/Timeline";
import Skills from "../components/sections/Skills";
import Contact from "../components/sections/Contact";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* 2) INTRO */}
      <Intro />

      {/* 3) LATEST PAPER */}
      <section id="papers">
        <LatestPaper />
      </section>

      {/* 4) OPEN SOURCE PROJECTS */}
      <section id="oss">
        <OpenSource />
      </section>

      {/* 5) CAREER TIMELINE */}
      <section id="timeline">
        <Timeline />
      </section>

      {/* 6) SKILLS */}
      <section id="skills">
        <Skills />
      </section>

      {/* 7) CONTACT */}
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}
