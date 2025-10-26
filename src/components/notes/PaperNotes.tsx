import { Chips } from "../shared/Chip";
import ViewAllLink from "../shared/ViewAllLink";
import type { PaperNote } from "./d";
import paperNotes from "../../data/paperNotes.json";

export default function PaperNotes() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-12">
      <div className="inline-block text-[11px] uppercase tracking-wider font-mono text-slate-600 border border-slate-300 rounded-md px-2 py-0.5 mb-1.5">
        Notes
      </div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-semibold text-slate-900 tracking-tight">
          My Notes
        </h1>
        <ViewAllLink href="#" label="View all notes" align="end" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {paperNotes.map((note) => (
          <PaperNoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

function PaperNoteCard({ note }: { note: PaperNote }) {
  return (
    <a
      href={note.link}
      className="group block border border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 hover:shadow-md bg-white transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2 transition-colors">
              {note.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {note.date} • {note.readTime}
            </p>
          </div>
          <span className="inline-block bg-blue-100 text-blue-700 px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap flex-shrink-0">
            Note
          </span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {note.summary}
        </p>

        {note.tags.length > 0 && <Chips items={note.tags}></Chips>}

        <ViewAllLink label="Read notes" href="/writing" />
      </div>
    </a>
  );
}
