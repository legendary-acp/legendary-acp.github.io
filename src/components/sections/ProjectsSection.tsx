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
  return (
    <article className="rounded-2xl bg-white border border-slate-200 p-6 hover:shadow-md hover:border-slate-300 transition-all duration-200">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-slate-900 leading-tight tracking-tight">
          {project.name}
        </h3>
        <span className="text-[11px] font-mono text-slate-500 whitespace-nowrap ml-4">
          {`{ ${project.stack} }`}
        </span>
      </div>
      <p className="text-sm text-slate-700 leading-relaxed">{project.desc}</p>
      <Chips items={project.chips} />
      {project.repo && (
        <ViewAllLink
          label="View repo"
          href={project.repo}
          className="text-xs pt-2"
        />
      )}
    </article>
  );
}
