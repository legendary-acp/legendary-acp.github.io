import IntroSection from "../components/sections/IntroSection";
import LatestPaperSection from "../components/sections/LatestPaperSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import CareerTimelineSection from "../components/sections/CareerTimelineSection";
import SkillsSection from "../components/sections/SkillsSection";
import ContactSection from "../components/sections/ContactSection";

export default function HomePage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      <IntroSection />
      <section id="papers">
        <LatestPaperSection />
      </section>
      <section id="oss">
        <ProjectsSection />
      </section>
      <section id="timeline">
        <CareerTimelineSection />
      </section>
      <section id="skills">
        <SkillsSection />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
    </main>
  );
}
