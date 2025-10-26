import { Chips } from "../shared/Chip";
import SectionHeader from "../shared/SectionHeader";
import ViewAllLink from "../shared/ViewAllLink";
import type { PaperNote } from "../notes/d";
import papers from "../../data/paperNotes.json";
export default function LatestPaperSection() {
  const latestPapers = papers
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  return (
    <section>
      <div className="flex items-end justify-between gap-6 mb-4">
        <SectionHeader
          label="Learn in the public"
          title="Latest paper notes"
          subtitle="Fresh notes from what I’m reading and testing."
        />
        <ViewAllLink href="/logs" align="end" label="All papers" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {latestPapers.map((paper) => (
          <PaperCard key={paper.id} paper={paper} />
        ))}
      </div>
    </section>
  );
}

function PaperCard({ paper }: { paper: PaperNote }) {
  return (
    <article className="rounded-2xl bg-white border border-slate-200 p-6 hover:shadow-md hover:border-slate-300 transition-all duration-200">
      <div className="text-xs text-slate-500 font-mono">
        <time dateTime={new Date(paper.date).toISOString()}>
          {new Date(paper.date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })}
        </time>
        {" · "}
        {paper.readTime}
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
  );
}
