import { Chips } from "../shared/Chip";
import SectionHeader from "../shared/SectionHeader";
import ViewAllLink from "../shared/ViewAllLink";

export default function LatestPaperSection() {
  const paper = {
    title: "FlowHFT — hazard notes that finally clicked",
    date: "2025-10-10",
    minutes: 6,
    tags: ["hft", "systems"],
    summary:
      "What “probability path” really means in practice, plus a tiny Rust snippet I used to sanity-check it.",
    link: "/notes",
  };

  return (
    <section>
      <div className="flex items-end justify-between gap-6 mb-4">
        <SectionHeader
          label="Learn in the public"
          title="Latest paper"
          subtitle="Fresh notes from what I’m reading and testing."
        />
        <ViewAllLink href="/logs" align="end" label="All papers" />
      </div>

      <article className="group rounded-2xl bg-white border border-slate-200 p-5 hover:shadow-soft hover:border-slate-300 transition">
        <div className="text-xs text-slate-500 font-mono">
          <time dateTime={new Date(paper.date).toISOString()}>
            {new Date(paper.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}
          </time>
          {" · "}
          {paper.minutes} min read
        </div>
        <a href={paper.link} className="mt-2 block">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 group-hover:text-slate-950">
            {paper.title}
          </h3>
        </a>

        <p className="mt-2 text-sm leading-relaxed text-slate-700 line-clamp-3">
          {paper.summary}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Chips items={paper.tags} />
        </div>
        <ViewAllLink href={paper.link} label="Read notes" />
      </article>
    </section>
  );
}
