import { useEffect, useMemo, useState } from "react";
import papers from "../../data/papers.json";
import Chip from "../shared/Chip";
import PDFViewer from "../shared/PDFViewer";

export type ReadingLogItem = {
  id: string;
  title: string;
  date: string;
  status: "read" | "queue" | "reading";
  category: string;
  description: string;
  tags: string[];
  blogUrl?: string;
  pdfPath?: string;
};

type StatusFilter = "all" | "read" | "reading" | "queue";

const STATUS_CONFIG: Record<StatusFilter, string> = {
  all: "All",
  read: "Read",
  reading: "Currently Reading",
  queue: "To Read",
};

const normalize = (raw: any[]): ReadingLogItem[] =>
  raw.map((p) => ({
    id: String(p.id),
    title: String(p.title),
    date: String(p.date),
    status: p.status || "queue",
    category: String(p.category),
    description: String(p.description),
    tags: Array.isArray(p.tags) ? p.tags.map(String) : [],
    blogUrl: typeof p.blogUrl === "string" ? p.blogUrl : undefined,
    pdfPath: typeof p.pdfPath === "string" ? p.pdfPath : undefined,
  }));

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
  onClick,
}: {
  paper: ReadingLogItem;
  onClick: () => void;
}) {
  const statusColor =
    paper.status === "read"
      ? "bg-emerald-100 text-emerald-700"
      : paper.status === "reading"
        ? "bg-blue-100 text-blue-700"
        : "bg-amber-100 text-amber-800";

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
      className="cursor-pointer rounded-2xl bg-white border border-slate-200 p-6 hover:shadow-md hover:border-slate-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600/50"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-slate-900 leading-tight tracking-tight">
          {paper.title}
        </h3>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold whitespace-nowrap ml-4 ${statusColor}`}
        >
          {statusLabel}
        </span>
      </div>

      <time className="text-xs text-slate-500">{formatDate(paper.date)}</time>

      <p className="mt-3 text-sm text-slate-700 leading-relaxed">
        {paper.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {paper.tags.map((tag) => (
          <Chip key={tag} text={tag} />
        ))}
      </div>
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
      className="flex gap-2 border-b border-slate-200"
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
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
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
      <span className="text-sm font-semibold text-slate-800">Categories:</span>
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
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
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
    <div className="mt-6 grid place-items-center rounded-lg border border-dashed border-slate-300 p-10 text-center">
      <div>
        <h3 className="text-sm font-semibold text-slate-700">
          No papers match your filters
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          Try changing status or category.
        </p>
      </div>
    </div>
  );
}

export default function ReadingLogMain() {
  const [items, setItems] = useState<ReadingLogItem[]>([]);
  const [status, setStatus] = useState<StatusFilter>("all");
  const [category, setCategory] = useState("all");
  const [selectedPaper, setSelectedPaper] = useState<ReadingLogItem | null>(
    null
  );

  useEffect(() => {
    setItems(normalize(papers as unknown[]));
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
