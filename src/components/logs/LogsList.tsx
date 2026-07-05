import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import readingLog from "../../data/readingLog.json";
import { getAllPaperNotes } from "../../lib/posts";
import Chips from "../shared/Chips";
import PDFViewer from "../shared/PDFViewer";

export type ReadingLogItem = {
  id: string;
  title: string;
  date: string;
  status: "read" | "queue" | "reading";
  category: string;
  description: string;
  tags: string[];
  pdfPath?: string;
};

type StatusFilter = "all" | "read" | "reading" | "queue";

const STATUS_CONFIG: Record<StatusFilter, string> = {
  all: "All",
  read: "Read",
  reading: "Currently Reading",
  queue: "To Read",
};

const normalize = (raw: unknown[]): ReadingLogItem[] =>
  raw.map((item) => {
    const p = item as Record<string, unknown>;
    return {
      id: String(p.id),
      title: String(p.title),
      date: String(p.date),
      status: (p.status as ReadingLogItem["status"]) || "queue",
      category: String(p.category),
      description: String(p.description),
      tags: Array.isArray(p.tags) ? p.tags.map(String) : [],
      pdfPath: typeof p.pdfPath === "string" ? p.pdfPath : undefined,
    };
  });

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

const getUniqueCategoryValues = (items: ReadingLogItem[]) => {
  const categories = new Set(items.map((p) => p.category));
  return Array.from(categories).sort();
};

const filterPapers = (
  items: ReadingLogItem[],
  status: StatusFilter,
  category: string
) => {
  const filtered = items.filter((p) => {
    const statusOk = status === "all" || p.status === status;
    const categoryOk = category === "all" || p.category === category;
    return statusOk && categoryOk;
  });

  if (status === "all") {
    const statusOrder = { reading: 0, read: 1, queue: 2 };
    return filtered.sort((a, b) => {
      const statusDiff =
        statusOrder[a.status as keyof typeof statusOrder] -
        statusOrder[b.status as keyof typeof statusOrder];
      if (statusDiff !== 0) return statusDiff;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  return filtered.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

function PaperCard({
  paper,
  noteSlug,
  onClick,
}: {
  paper: ReadingLogItem;
  noteSlug?: string;
  onClick: () => void;
}) {
  const statusColor =
    paper.status === "read"
      ? "bg-fluent-green-subtle text-fluent-green"
      : paper.status === "reading"
        ? "bg-fluent-blue-subtle text-fluent-blue"
        : "bg-fluent-yellow-subtle text-fluent-yellow";

  const statusLabel =
    paper.status === "read"
      ? "Read"
      : paper.status === "reading"
        ? "Reading"
        : "To Read";

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      className="cursor-pointer rounded-2xl bg-surface border border-default p-6 hover:shadow-md hover:border-default-2 transition-all duration-200 focus-ring"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-primary leading-tight tracking-tight">
          {paper.title}
        </h3>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold whitespace-nowrap ml-4 ${statusColor}`}
        >
          {statusLabel}
        </span>
      </div>

      <time className="text-xs text-tertiary">{formatDate(paper.date)}</time>

      <p className="mt-3 text-sm text-secondary leading-relaxed">
        {paper.description}
      </p>

      <div className="mt-4">
        <Chips items={paper.tags} />
      </div>

      {noteSlug && (
        <Link
          to={`/notes/${noteSlug}`}
          onClick={(e) => e.stopPropagation()}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-hover"
        >
          Read my notes
          <span aria-hidden="true" className="transition-transform">
            →
          </span>
        </Link>
      )}
    </article>
  );
}

function FilterTabs({
  active,
  onChange,
}: {
  active: StatusFilter;
  onChange: (status: StatusFilter) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Status"
      className="flex gap-2 border-b border-default"
    >
      {(Object.keys(STATUS_CONFIG) as StatusFilter[]).map((status) => {
        const isActive = active === status;
        return (
          <button
            key={status}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(status)}
            className={`relative -mb-px border-b-2 px-4 py-3 text-sm font-medium outline-none transition-colors ${
              isActive
                ? "border-brand text-brand"
                : "border-transparent text-tertiary hover:text-primary"
            }`}
          >
            {STATUS_CONFIG[status]}
          </button>
        );
      })}
    </div>
  );
}

function CategoryFilter({
  categories,
  active,
  onChange,
}: {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold text-secondary">Categories:</span>
      {["all", ...categories].map((category) => {
        const isActive = active === category;
        const label =
          category === "all"
            ? "All"
            : category.replace(/-/g, " ").toUpperCase();

        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              isActive
                ? "border-brand bg-brand text-white"
                : "border-default bg-surface text-tertiary hover:bg-surface-2"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-6 grid place-items-center rounded-lg border border-dashed border-default-2 p-10 text-center">
      <div>
        <h3 className="text-sm font-semibold text-secondary">
          No papers match your filters
        </h3>
        <p className="mt-1 text-xs text-tertiary">
          Try changing status or category.
        </p>
      </div>
    </div>
  );
}

export default function LogMain() {
  const [status, setStatus] = useState<StatusFilter>("all");
  const [category, setCategory] = useState("all");
  const [selectedPaper, setSelectedPaper] = useState<ReadingLogItem | null>(
    null
  );

  const items = useMemo(() => normalize(readingLog as unknown[]), []);

  const noteSlugByPaperId = useMemo(() => {
    const map = new Map<string, string>();
    for (const note of getAllPaperNotes()) {
      if (note.paperId) map.set(note.paperId, note.slug);
    }
    return map;
  }, []);

  const categories = useMemo(() => getUniqueCategoryValues(items), [items]);

  const filtered = useMemo(
    () => filterPapers(items, status, category),
    [items, status, category]
  );

  return (
    <section className="mx-auto max-w-6xl px-4 md:px-6 pb-12">
      <FilterTabs active={status} onChange={setStatus} />
      <CategoryFilter
        categories={categories}
        active={category}
        onChange={setCategory}
      />

      <div className="mt-6 grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(320px,1fr))]">
        {filtered.length > 0 ? (
          filtered.map((paper) => (
            <PaperCard
              key={paper.id}
              paper={paper}
              noteSlug={noteSlugByPaperId.get(paper.id)}
              onClick={() => setSelectedPaper(paper)}
            />
          ))
        ) : (
          <div className="col-span-full">
            <EmptyState />
          </div>
        )}
      </div>

      <PDFViewer
        isOpen={!!selectedPaper}
        pdfPath={selectedPaper?.pdfPath || ""}
        title={selectedPaper?.title || ""}
        onClose={() => setSelectedPaper(null)}
      />
    </section>
  );
}
