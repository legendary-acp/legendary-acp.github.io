import SectionHeader from "../SectionHeader";

export default function LatestPaper() {
  const paper = {
    title: "FlowHFT — hazard notes that finally clicked",
    date: "2025-10-10",
    minutes: 6,
    tags: ["hft", "systems"],
    summary:
      "What “probability path” really means in practice, plus a tiny Rust snippet I used to sanity-check it.",
    link: "/writing/flowhft", // later route
  };

  return (
    <section>
      <div className="flex items-end justify-between gap-6 mb-4">
        <SectionHeader
          label="Learn in the public"
          title="Latest paper"
          subtitle="Fresh notes from what I’m reading and testing."
        />
        <a href="/writing" className="text-blue-700 text-sm hover:underline">
          All papers →
        </a>
      </div>

      <article className="rounded-2xl bg-white border border-slate-200 p-5 hover:shadow-soft transition">
        <div className="text-xs text-slate-500 font-mono">
          {new Date(paper.date).toLocaleDateString()} · {paper.minutes} min
        </div>
        <h3 className="mt-1 font-medium">{paper.title}</h3>
        <p className="mt-2 text-sm text-slate-700">{paper.summary}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {paper.tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full px-2.5 py-1 text-xs border border-slate-200 text-slate-600"
            >
              {t}
            </span>
          ))}
        </div>
        <a
          href={paper.link}
          className="mt-4 inline-block text-blue-700 text-sm font-medium"
        >
          Read notes →
        </a>
      </article>
    </section>
  );
}
