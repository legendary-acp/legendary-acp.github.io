import { useParams, useNavigate } from "react-router-dom";
import { getPaperNotesBySlug } from "../lib/posts";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  if (!slug) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-semibold text-slate-900">
          Invalid post URL
        </h1>
        <p className="mt-2 text-slate-600">
          The note you’re looking for doesn’t exist.
        </p>
      </div>
    );
  }

  const postRecord = getPaperNotesBySlug(slug);

  if (!postRecord) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-semibold text-slate-900">
          Post not found
        </h1>
        <p className="mt-2 text-slate-600">
          Could not find a note with slug:{" "}
          <span className="font-mono">{slug}</span>
        </p>
        <button
          onClick={() => navigate("/notes")}
          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          ← Back to notes
        </button>
      </div>
    );
  }

  const { Component, meta } = postRecord;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 lg:py-12">
      <button
        onClick={() => navigate("/notes")}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">
          ←
        </span>
        Back to notes
      </button>
      <div className="bg-white text-slate-900 rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-10 mx-auto max-w-4xl">
        <header className="mb-10">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6">
            {meta.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-slate-500">
            <img
              src="/profile~2.jpg"
              alt="Author"
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="font-medium text-slate-700">Pradyuman</span>
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
        </header>
        <hr className="border-t border-slate-200 mb-10" />
        {/* content */}
        <article
          className="
    prose prose-slate max-w-none leading-relaxed
    prose-headings:text-slate-950 prose-headings:font-extrabold
    prose-h1:text-4xl prose-h1:mt-12 prose-h1:mb-6
    prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
    prose-p:text-slate-800 prose-p:leading-relaxed prose-p:my-5
    prose-ul:my-5 prose-ol:my-5 prose-li:leading-relaxed
    prose-a:text-slate-900 prose-a:no-underline hover:prose-a:underline hover:prose-a:decoration-slate-400
    prose-strong:text-slate-900
    prose-blockquote:border-l-4 prose-blockquote:border-slate-300 prose-blockquote:pl-4 prose-blockquote:text-slate-700 prose-blockquote:italic
    prose-code:bg-slate-100 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5
  "
        >
          <Component />
        </article>
      </div>
    </div>
  );
}
