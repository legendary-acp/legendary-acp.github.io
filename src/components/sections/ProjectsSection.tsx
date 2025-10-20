import SectionHeader from "../shared/SectionHeader";
import projects from "../../data/ossProjects.json";
import Chip from "../shared/Chip";

type Project = {
  name: string;
  stack: string;
  desc: string;
  chips: string[];
  metricLabel?: string;
  metricValue?: string;
  repo?: string;
};
export default function ProjectsSection() {
  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <SectionHeader
          label="Work in the open"
          title="Open-source projects"
          subtitle="Things I’m building, learning from, or maintaining."
        />
        <a
          className="text-blue-700 text-sm hover:underline whitespace-nowrap self-start md:self-end"
          href="https://github.com/legendary-acp"
          target="_blank"
          rel="noreferrer"
        >
          More on GitHub →
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} />
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
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.chips.map((c) => (
          <Chip text={c} />
        ))}
      </div>
      {project.repo && (
        <div className="mt-5">
          <a
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-800 hover:underline transition-colors"
            href={project.repo}
            target="_blank"
            rel="noreferrer"
          >
            <span>View repo</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      )}
    </article>
  );
}
