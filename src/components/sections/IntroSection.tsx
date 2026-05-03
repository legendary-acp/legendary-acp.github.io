import type { CSSProperties } from "react";
import nowData from "../../data/now.json";
import Chips from "../shared/Chips";
import Button from "../shared/Button";

export default function IntroSection() {
  const keySkills: string[] = ["Go", "Rust", "C++", "Linux", "Cloud"];

  return (
    <section className="grid md:grid-cols-[1.3fr_.7fr] gap-8 items-start">
      <div className="flex items-start gap-6">
        <img
          src="/profile.jpg"
          alt="Pradyuman"
          className="w-24 h-24 rounded-2xl ring-4 border border-default object-cover"
          style={{ "--tw-ring-color": "var(--color-ring-img)" } as CSSProperties}
        />
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
            Hi, I'm <span className="text-brand-hover">Pradyuman</span>.
          </h1>
          <p className="mt-3 text-secondary max-w-2xl leading-relaxed">
            I'm a <span className="font-medium">Software Engineer at Microsoft Security</span>, 
            where I design and build high-performance, resilient infrastructure at global scale. 
            With a deep focus on <span className="font-medium">systems programming and distributed 
            architectures</span>, I leverage <span className="font-mono">Go, Rust, and C++</span> to 
            solve complex cloud-scale observability and security challenges. I am passionate 
            about <span className="font-medium">architectural integrity, performance,</span> and the 
            rigorous craft of turning intricate infrastructure into robust, dependable software.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Chips items={keySkills} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm items-center">
            <Button href="/Resume.pdf" variant="primary" size="md">
              Resume
            </Button>

            <div className="flex items-center gap-2 ml-1">
              <Button
                href="https://github.com/legendary-acp"
                variant="icon"
                size="md"
                external
                aria-label="GitHub"
                className="!px-2.5 aspect-square"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-primary"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.727-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.729.082-.729 1.205.086 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.107-.776.418-1.305.76-1.605-2.665-.305-5.466-1.334-5.466-5.933 0-1.31.47-2.382 1.236-3.22-.124-.304-.535-1.524.118-3.176 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0 1 12 5.8c1.02.004 2.045.138 3.004.403 2.29-1.552 3.296-1.23 3.296-1.23.655 1.652.244 2.872.12 3.176.77.838 1.236 1.91 1.236 3.22 0 4.61-2.805 5.625-5.475 5.922.43.372.813 1.102.813 2.222v3.293c0 .322.217.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>

              <Button
                href="https://linkedin.com/in/ppradyu"
                variant="icon"
                size="md"
                external
                aria-label="LinkedIn"
                className="!px-2.5 aspect-square"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#0A66C2"
                  className="w-6 h-6"
                >
                  <path d="M19 0h-14a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5v-14a5 5 0 0 0-5-5ZM7 20h-3v-11h3v11Zm-1.5-12.3a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4ZM21 20h-3v-5.6c0-1.34-.03-3.06-1.86-3.06s-2.14 1.45-2.14 2.96v5.7h-3v-11h2.88v1.5h.04a3.17 3.17 0 0 1 2.85-1.56c3.05 0 3.63 2.01 3.63 4.63v6.43Z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <NowSection />
    </section>
  );
}

function NowSection() {
  return (
    <aside
      className="group relative rounded-2xl overflow-hidden bg-surface border border-default"
      aria-label="Currently working on"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-500 to-brand-700 group-hover:w-2 transition-all duration-300" />

      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-fluent-red animate-pulse" />
            <h3 className="text-xs uppercase tracking-widest text-secondary font-semibold">
              Now
            </h3>
          </div>
          {nowData?.lastUpdated && (
            <time
              dateTime={nowData.lastUpdated}
              className="text-xs text-tertiary font-mono"
            >
              {nowData.lastUpdated}
            </time>
          )}
        </div>

        <div className="h-px bg-border" />
        <ul className="space-y-3">
          {nowData.items.map((item, idx) => (
            <li
              key={idx}
              className="flex gap-3 text-sm text-secondary leading-relaxed group/item"
              style={{
                animation: `slideIn 0.4s ease-out ${idx * 50}ms both`,
              }}
            >
              <span className="text-brand font-semibold flex-shrink-0">
                →
              </span>
              <span className="group-hover/item:text-primary transition-colors duration-300">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
