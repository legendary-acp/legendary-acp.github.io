import React, { useState, useEffect } from "react";

// Types
interface MediumBlogItem {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  image?: string | null;
  excerpt: string;
  readTime: string;
  categories: string[];
}

// Function to extract first image from HTML content
function extractFirstImage(htmlContent: string): string | null {
  const imgMatch = htmlContent.match(/<img[^>]+src=["']([^"']+)["']/);
  return imgMatch ? imgMatch[1] : null;
}

function getExcerpt(htmlContent: string, wordLimit = 20): string {
  const plainText = htmlContent.replace(/<[^>]*>/g, "").trim();
  const words = plainText.split(/\s+/).slice(0, wordLimit).join(" ");
  return words + (plainText.length > words.length ? "..." : "");
}

function calculateReadTime(htmlContent: string): string {
  const plainText = htmlContent.replace(/<[^>]*>/g, "").trim();
  const wordCount = plainText ? plainText.split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));
  return `${readTime} min read`;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface RssItem {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  categories?: string[];
}

interface RssResponse {
  items: RssItem[];
}

export default function MediumBlogCards(): React.ReactElement {
  const [blogs, setBlogs] = useState<MediumBlogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMediumFeed = async () => {
      try {
        const rssUrl = "https://medium.com/feed/debugging-diaries";
        const corsProxy = "https://api.rss2json.com/v1/api.json?rss_url=";

        const response = await fetch(
          `${corsProxy}${encodeURIComponent(rssUrl)}`
        );
        const data = await response.json();

        if ((data as RssResponse).items) {
          const parsedBlogs = (data as RssResponse).items.slice(0, 3).map(
            (item: RssItem) =>
              ({
                title: item.title,
                link: item.link,
                pubDate: formatDate(item.pubDate),
                content: item.content,
                image: extractFirstImage(item.content),
                excerpt: getExcerpt(item.content, 20),
                readTime: calculateReadTime(item.content),
                categories: item.categories || [],
              }) as MediumBlogItem
          );
          setBlogs(parsedBlogs);
        }
      } catch (err) {
        console.error("Error fetching Medium feed:", err);
        setError("Failed to load Medium articles");
      } finally {
        setLoading(false);
      }
    };

    fetchMediumFeed();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <a
            key={index}
            href={blog.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-gray-200 rounded-lg overflow-hidden hover:border-blue-500 hover:shadow-lg transition-all duration-300 bg-white flex flex-col"
          >
            {/* Image */}
            {blog.image && (
              <div className="h-48 w-full overflow-hidden bg-gray-100">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              {/* Badge and title */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 flex-1">
                  {blog.title}
                </h3>
                <span className="inline-block bg-amber-100 text-amber-800 px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap flex-shrink-0">
                  Medium
                </span>
              </div>

              {/* Date */}
              <p className="text-sm text-gray-500 mb-3">{blog.pubDate}</p>

              {/* Excerpt */}
              <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                {blog.excerpt}
              </p>

              {/* Tags */}
              {blog.categories.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {blog.categories.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-gray-100 text-gray-700 px-2.5 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer */}
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
        ))}
      </div>

      {/* View all link */}
      <div className="mt-10 text-center">
        <a
          href="https://medium.com/debugging-diaries"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
        >
          All articles on Medium
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </a>
      </div>
    </div>
  );
}
