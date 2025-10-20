import ReadingLogIntro from "../components/reading-log/ReadingLogIntro";
import ReadingLogList from "../components/reading-log/ReadingLogList";

export default function ReadingLogPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      <ReadingLogIntro />
      <ReadingLogList />
    </main>
  );
}
