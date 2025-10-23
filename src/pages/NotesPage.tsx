import MediumBlogCards from "../components/notes/MediumBlog";
import PaperNotes from "../components/notes/PaperNotes";
import PageHeader from "../components/shared/PageHeader";

export default function NotesPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      <PageHeader
        title="Writing & Research"
        subtitle="Essays, technical notes, and reflections from my exploration of systems, performance, and reliability — distilled from papers, experiments, and long nights of debugging."
      />
      <MediumBlogCards />
      <PaperNotes />
    </main>
  );
}
