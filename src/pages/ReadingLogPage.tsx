import ReadingLogList from "../components/logs/LogsList";
import PageHeader from "../components/shared/PageHeader";

export default function LogPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      <PageHeader
        title="Reading Log"
        subtitle="A curated log of research papers, systems write-ups, and design notes that shaped how I think about reliability, performance, and architecture."
      />
      <ReadingLogList />
    </main>
  );
}
