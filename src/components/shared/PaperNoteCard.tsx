import type { PaperNote } from "../notes/d";
import Chips from "./Chips";
import ViewAllLink from "./ViewAllLink";

export default function PaperNoteCard({ note }: { note: PaperNote }) {
  return (
    <article className="rounded-2xl bg-surface border border-default p-6 hover:shadow-md hover:border-default-2 transition-all duration-200">
      <div className="text-xs text-tertiary font-mono">
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
        <h3 className="text-lg font-semibold tracking-tight text-primary">
          {note.title}
        </h3>
      </a>
      <p className="mt-2 text-sm leading-relaxed text-secondary line-clamp-3">
        {note.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-2 items-center justify-between text-sm text-muted">
        <Chips items={note.tags ?? []} />
        <ViewAllLink
          href={`#/notes/${note.slug}`}
          label="Read notes"
          className="text-tertiary hover:text-primary"
        />
      </div>
    </article>
  );
}
