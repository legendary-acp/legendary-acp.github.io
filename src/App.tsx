import Navbar from "./components/nav/Navbar";
import Intro from "./components/sections/Intro";
import LatestPaper from "./components/sections/LatestPaper";
import OpenSource from "./components/sections/OpenSource";
import Timeline from "./components/sections/Timeline";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import "./styles/globals.css";

export default function App() {
  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-12">
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
      </main>

      <footer className="py-10 border-t border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-sm text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Pradyuman</div>

          <div className="font-mono text-xs sm:text-sm text-slate-500">
            {`{ built with React · Tailwind · `}
            <span className="inline-block w-[75px] text-center opacity-20 hover:opacity-100 transition-opacity duration-300">
              {"ChatGPT"}
            </span>
            {" }"}
          </div>
        </div>
      </footer>
    </div>
  );
}
