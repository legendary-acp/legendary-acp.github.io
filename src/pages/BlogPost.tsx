import { useParams, useNavigate } from "react-router-dom";
import { getPaperNotesBySlug } from "../lib/posts";
import readingLog from "../data/readingLog.json";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  if (!slug) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-semibold text-primary">
          Invalid post URL
        </h1>
        <p className="mt-2 text-muted">
          The note you’re looking for doesn’t exist.
        </p>
      </div>
    );
  }

  const postRecord = getPaperNotesBySlug(slug);

  if (!postRecord) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-semibold text-primary">Post not found</h1>
        <p className="mt-2 text-muted">
          Could not find a note with slug:{" "}
          <span className="font-mono">{slug}</span>
        </p>
        <button
          onClick={() => navigate("/notes")}
          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-hover"
        >
          ← Back to notes
        </button>
      </div>
    );
  }

  const { Component, meta } = postRecord;

  const linkedPaper = meta.paperId
    ? (readingLog as { id: string; title: string; pdfPath?: string }[]).find(
        (p) => p.id === meta.paperId
      )
    : undefined;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 lg:py-12">
      <button
        onClick={() => navigate("/notes")}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-brand hover:text-brand-hover group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">
          ←
        </span>
        Back to notes
      </button>
      <div className="bg-surface text-primary rounded-2xl shadow-sm border border-default p-8 sm:p-10 mx-auto max-w-4xl">
        <header className="mb-10">
          <h1 className="text-5xl font-extrabold tracking-tight text-primary leading-tight mb-6">
            {meta.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-tertiary">
            <img
              src="/profile.jpg"
              alt="Pradyuman"
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="font-medium text-secondary">Pradyuman</span>
            <span>·</span>
            <span>{meta.readTime} min read</span>
            <span>·</span>
            <time>
              {new Date(meta.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </time>
          </div>
          {meta.tags && meta.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {meta.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-block rounded-full border border-default bg-page px-3 py-1 text-xs font-medium text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {linkedPaper?.pdfPath && (
            <a
              href={linkedPaper.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-default bg-page px-4 py-2 text-sm font-medium text-brand hover:text-brand-hover hover:border-default-2 transition-colors"
            >
              <span aria-hidden="true">📄</span>
              Read the original paper
            </a>
          )}
        </header>
        <hr className="border-t border-default mb-10" />
        <article
          className="
            prose font-sans max-w-none leading-relaxed
            prose-headings:text-primary 
            prose-headings:cursor-auto
            prose-h1:text-4xl prose-h1:mt-12 prose-h1:mb-6
            prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-secondary prose-p:leading-relaxed prose-p:my-5
            prose-ul:my-5 prose-ol:my-5 prose-li:text-secondary prose-li:leading-relaxed
            prose-a:text-brand prose-a:no-underline hover:prose-a:underline
            prose-strong:text-primary
            prose-blockquote:border-l-4 prose-blockquote:border-default-2 prose-blockquote:pl-4 prose-blockquote:text-secondary prose-blockquote:italic
            prose-code:font-mono prose-code:text-sm prose-code:bg-surface-2
            prose-code:rounded-lg prose-code:px-1.5 prose-code:py-0.5 prose-code:text-primary
            prose-pre:bg-surface-2 prose-pre:text-primary prose-pre:font-mono prose-pre:rounded-xl prose-pre:p-4 prose-pre:overflow-x-auto
            prose-img:mx-auto prose-img:rounded-xl prose-img:shadow-sm prose-img:my-6
          "
        >
          <Component />
        </article>
      </div>
    </div>
  );
}
