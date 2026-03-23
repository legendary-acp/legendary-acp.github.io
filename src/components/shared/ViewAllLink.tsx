import { Link } from "react-router-dom";

type ViewAllLinkProps = {
  href: string;
  label: string;
  align?: "start" | "center" | "end";
  className?: string;
  bordered?: boolean;
};

export default function ViewAllLink({
  href,
  label,
  align = "end",
  className = "",
  bordered = true,
}: ViewAllLinkProps) {
  const justifyMap: Record<NonNullable<ViewAllLinkProps["align"]>, string> = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
  };

  const baseClasses =
    "group inline-flex items-center gap-2 text-blue-600 text-sm md:text-base font-medium hover:text-blue-700 transition-colors";

  const isInternal = href.startsWith("/");
  const isAnchor = href.startsWith("#");
  const containerClasses = `flex items-center ${justifyMap[align]} ${bordered ? "pt-3 border-t border-default" : ""} ${className}`;

  return (
    <div className={containerClasses}>
      {isInternal ? (
        <Link to={href} className={baseClasses}>
          {label}
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      ) : isAnchor ? (
        <a href={href} className={baseClasses}>
          {label}
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </a>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
        >
          {label}
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </a>
      )}
    </div>
  );
}
