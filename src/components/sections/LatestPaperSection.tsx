import SectionHeader from "../shared/SectionHeader";
import ViewAllLink from "../shared/ViewAllLink";
import { getAllPaperNotes } from "../../lib/posts";
import PaperNoteCard from "../shared/PaperNoteCard";
export default function LatestPaperSection() {
  const latestNotes = getAllPaperNotes().slice(0, 4);

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
        {latestNotes.map((note) => (
          <PaperNoteCard key={note.slug} note={note} />
        ))}
      </div>
    </section>
  );
}
