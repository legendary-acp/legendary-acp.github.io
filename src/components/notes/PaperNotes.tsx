import { getAllPaperNotes } from "../../lib/posts";
import PaperNoteCard from "../shared/PaperNoteCard";

export default function PaperNotes() {
  const paperNotes = getAllPaperNotes();
  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-12">
      <div className="inline-block text-[11px] uppercase tracking-wider font-mono text-slate-600 border border-slate-300 rounded-md px-2 py-0.5 mb-1.5">
        Notes
      </div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl font-semibold text-slate-900 tracking-tight">
          My Notes
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {paperNotes.map((note) => (
          <PaperNoteCard key={note.slug} note={note} />
        ))}
      </div>
    </div>
  );
}
