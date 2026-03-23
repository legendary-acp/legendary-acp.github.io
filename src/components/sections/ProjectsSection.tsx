import SectionHeader from "../shared/SectionHeader";
import projects from "../../data/ossProjects.json";
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
        <h3 className="text-lg font-semibold tracking-tight text-primary">
          {project.name}
        </h3>
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
