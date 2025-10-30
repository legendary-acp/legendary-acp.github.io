import { useParams, useNavigate } from "react-router-dom";
import { getPaperNotesBySlug } from "../lib/posts";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  if (!slug) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Invalid post URL</h1>
      </div>
    );
  }

  const postRecord = getPaperNotesBySlug(slug);

  if (!postRecord) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Post Not Found</h1>
        <p className="text-gray-600 mb-6">
          Could not find a blog post with slug: {slug}
        </p>
        <button
          onClick={() => navigate("/notes")}
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← Back to Notes
        </button>
      </div>
    );
  }

  const { Component, meta } = postRecord;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <button
        onClick={() => navigate("/notes")}
        className="text-blue-600 hover:text-blue-800 text-sm font-semibold mb-8"
      >
        ← Back to Notes
      </button>

      <div className="mb-8">
        <div className="text-sm text-slate-500 mb-2">
          {meta.date} • {meta.readTime} min read
        </div>
        <h1 className="text-5xl font-extrabold mb-4 text-slate-900">
          {meta.title}
        </h1>
        {meta.tags && meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <article className="prose prose-slate max-w-none dark:prose-invert prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800">
        <Component />
      </article>
    </div>
  );
}
