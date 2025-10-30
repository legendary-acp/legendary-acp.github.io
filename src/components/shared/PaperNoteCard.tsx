import type { PaperNote } from "../notes/d";
import Chips from "./Chips";
import ViewAllLink from "./ViewAllLink";

export default function PaperNoteCard({ note }: { note: PaperNote }) {
  return (
    <article className="rounded-2xl bg-white border border-slate-200 p-6 hover:shadow-md hover:border-slate-300 transition-all duration-200">
      <div className="text-xs text-slate-500 font-mono">
        <time dateTime={new Date(note.date).toISOString()}>
          {new Date(note.date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })}
        </time>
        {" · "}
        {note.readTime} mins
      </div>
      <a href={`#/notes/${note.slug}`} className="mt-2 block">
        <h3 className="text-lg font-semibold tracking-tight text-slate-900 group-hover:text-slate-950">
          {note.title}
        </h3>
      </a>
      <p className="mt-2 text-sm leading-relaxed text-slate-700 line-clamp-3">
        {note.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-2 items-center justify-between text-sm text-slate-600">
        <Chips items={note.tags ?? []} />
        <ViewAllLink
          href={`#/notes/${note.slug}`}
          label="Read notes"
          className="text-slate-500 hover:text-slate-800"
        />
      </div>
    </article>
  );
}
