import SectionHeader from "../shared/SectionHeader";
import projects from "../../data/projects.json";
import Chips from "../shared/Chips";
import ViewAllLink from "../shared/ViewAllLink";
import type { Project } from "./d";

export default function ProjectsSection() {
  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <SectionHeader
          label="Work in the open"
          title="Open-source projects"
          subtitle="Things I’m building, learning from, or maintaining."
        />
        <ViewAllLink
          href="https://github.com/legendary-acp"
          label="More on Github"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const card = (
    <article className="rounded-2xl bg-surface border border-default p-6 hover:shadow-md hover:border-default-2 transition-all duration-200 h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold tracking-tight text-primary">
            {project.name}
          </h3>
          {project.repo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-tertiary flex-shrink-0 mt-0.5"
            >
              <path
                fillRule="evenodd"
                d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.727-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.729.082-.729 1.205.086 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.107-.776.418-1.305.76-1.605-2.665-.305-5.466-1.334-5.466-5.933 0-1.31.47-2.382 1.236-3.22-.124-.304-.535-1.524.118-3.176 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0 1 12 5.8c1.02.004 2.045.138 3.004.403 2.29-1.552 3.296-1.23 3.296-1.23.655 1.652.244 2.872.12 3.176.77.838 1.236 1.91 1.236 3.22 0 4.61-2.805 5.625-5.475 5.922.43.372.813 1.102.813 2.222v3.293c0 .322.217.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <span className="text-[12px] font-mono text-tertiary whitespace-nowrap ml-4">
          {`{ ${project.stack} }`}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-secondary line-clamp-3">
        {project.desc}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Chips items={project.chips.slice(0, 3)} />
      </div>
    </article>
  );

  if (project.repo) {
    return (
      <a
        href={project.repo}
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer"
      >
        {card}
      </a>
    );
  }

  return card;
}
