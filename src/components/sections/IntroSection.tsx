import nowData from "../../data/introNow.json";
import { Chips } from "../shared/Chip";

export default function IntroSection() {
  const keySkills = ["Go", "Rust", "C++", "Linux", "Cloud"];

  return (
    <section className="grid md:grid-cols-[1.3fr_.7fr] gap-8 items-start">
      <div className="flex items-start gap-6">
        <img
          src="/profile.jpg"
          alt="Pradyuman"
          className="w-24 h-24 rounded-2xl ring-4 ring-white border border-slate-200 object-cover"
        />
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            Hi, I’m <span className="text-blue-700">Pradyuman</span>.
          </h1>
          <p className="mt-3 text-slate-700 max-w-2xl leading-relaxed">
            I’m a{" "}
            <span className="font-medium">Backend & Systems Engineer</span>{" "}
            working with
            <span className="font-mono"> Rust, C++, and Go</span>. I lead
            engineering at
            <span className="font-medium"> CtrlB</span>, building scalable
            observability and control-plane systems for cloud workloads. I focus
            on <span className="font-medium">reliability, performance,</span>{" "}
            and the craft of turning complex infrastructure into simple, robust
            software.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Chips items={keySkills} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm items-center">
            {/* Primary CTA */}
            <a
              href="#contact"
              className="inline-flex items-center rounded-xl bg-blue-600 text-white font-medium px-4 py-2 hover:bg-blue-700 transition"
            >
              Say hi
            </a>

            {/* Secondary CTA */}
            <a
              href="/Resume.pdf"
              className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2 font-medium hover:border-blue-300 hover:text-blue-700 transition"
            >
              Resume
            </a>

            {/* Social icons (same height, brand colors) */}
            <div className="flex items-center gap-2 ml-1">
              {/* GitHub */}
              <a
                href="https://github.com/legendary-acp"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 hover:border-slate-400 transition"
                style={{ width: "40px", height: "40px" }}
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#181717"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.727-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.729.082-.729 1.205.086 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.107-.776.418-1.305.76-1.605-2.665-.305-5.466-1.334-5.466-5.933 0-1.31.47-2.382 1.236-3.22-.124-.304-.535-1.524.118-3.176 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0 1 12 5.8c1.02.004 2.045.138 3.004.403 2.29-1.552 3.296-1.23 3.296-1.23.655 1.652.244 2.872.12 3.176.77.838 1.236 1.91 1.236 3.22 0 4.61-2.805 5.625-5.475 5.922.43.372.813 1.102.813 2.222v3.293c0 .322.217.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/ppradyu"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 hover:border-slate-400 transition"
                style={{ width: "40px", height: "40px" }}
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#0A66C2"
                  className="w-6 h-6"
                >
                  <path d="M19 0h-14a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5v-14a5 5 0 0 0-5-5ZM7 20h-3v-11h3v11Zm-1.5-12.3a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4ZM21 20h-3v-5.6c0-1.34-.03-3.06-1.86-3.06s-2.14 1.45-2.14 2.96v5.7h-3v-11h2.88v1.5h.04a3.17 3.17 0 0 1 2.85-1.56c3.05 0 3.63 2.01 3.63 4.63v6.43Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <aside className="relative rounded-2xl bg-slate-50/80 border border-slate-200 p-5 shadow-sm backdrop-blur-sm">
        <div className="text-[11px] uppercase tracking-wider text-slate-500 font-mono">
          Now — <span className="text-slate-600">{nowData.lastUpdated}</span>
        </div>
        <div className="h-px bg-slate-200/70 my-3" />
        <ul className="space-y-1.5 text-sm text-slate-700 leading-snug">
          {nowData.items.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
