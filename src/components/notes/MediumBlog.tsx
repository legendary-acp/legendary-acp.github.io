import React, { useEffect, useState } from "react";
import ViewAllLink from "../shared/ViewAllLink";
import { Chips } from "../shared/Chip";
import type { MediumBlogItem, RssResponse } from "./d";
import {
  calculateReadTime,
  extractFirstImage,
  formatDate,
  getExcerpt,
} from "../../utils/content";

function BlogCard({ blog }: { blog: MediumBlogItem }) {
  return (
    <a
      href={blog.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Read ${blog.title} on Medium`}
      className="group border border-gray-200 rounded-lg overflow-hidden hover:border-blue-500 hover:shadow-lg transition-all duration-300 bg-white flex flex-col"
    >
      {blog.image && (
        <div className="h-48 w-full overflow-hidden bg-gray-100">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1">
            {blog.title}
          </h3>
        </div>

        <p className="text-sm text-gray-500 mb-3">{blog.pubDate}</p>

        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
          {blog.summary}
        </p>

        {blog.categories.length > 0 && (
          <Chips items={blog.categories.slice(0, 3)} />
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">{blog.readTime}</span>
          <span className="text-blue-600 font-medium text-sm group-hover:text-blue-700 flex items-center gap-1">
            Read on Medium
            <span className="group-hover:translate-x-1 transition-transform">
              ↗
            </span>
          </span>
        </div>
      </div>
    </a>
  );
}

export default function MediumBlogCards(): React.ReactElement {
  const [blogs, setBlogs] = useState<MediumBlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        const rssUrl = "https://medium.com/feed/debugging-diaries";
        const corsProxy = "https://api.rss2json.com/v1/api.json?rss_url=";
        const res = await fetch(`${corsProxy}${encodeURIComponent(rssUrl)}`, {
          signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as RssResponse;

        const items = data.items ?? [];
        const parsed = items.slice(0, 3).map((item) => ({
          title: item.title,
          link: item.link,
          pubDate: formatDate(item.pubDate),
          content: item.content,
          image: extractFirstImage(item.content),
          summary: getExcerpt(item.content, 20),
          readTime: calculateReadTime(item.content),
          categories: item.categories ?? [],
        }));

        setBlogs(parsed);
      } catch (err: unknown) {
        if ((err as DOMException)?.name !== "AbortError") {
          console.error("Error fetching Medium feed:", err);
          setError("Failed to load Medium articles");
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-7">
      <div className="inline-block text-[11px] uppercase tracking-wider font-mono text-slate-600 border border-slate-300 rounded-md px-2 py-0.5 mb-1.5">
        Blogs
      </div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-semibold text-slate-900 tracking-tight">
          From My Medium
        </h1>
        <ViewAllLink
          href="https://medium.com/debugging-diaries"
          label="All articles on Medium"
          align="end"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
        </div>
      ) : error ? (
        <div className="mx-auto max-w-2xl flex items-center gap-2 rounded-lg border border-red-200 bg-red-50/70 px-3 py-2 text-sm text-red-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 flex-shrink-0 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M12 19a7 7 0 110-14 7 7 0 010 14z"
            />
          </svg>
          <span className="leading-tight">
            Unable to load Medium posts right now. Please try again later.
          </span>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-sm text-slate-600 border border-slate-200 bg-white rounded-lg p-4">
          No posts found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.link} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}
