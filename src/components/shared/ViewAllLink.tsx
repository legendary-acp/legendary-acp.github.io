interface ViewAllLinkProps {
  href: string;
  label: string;
  external?: boolean;
  align?: "left" | "center" | "right" | "end";
  className?: string;
}

export default function ViewAllLink({
  href,
  label,
  external = false,
  align = "end",
  className = "",
}: ViewAllLinkProps) {
  return (
    <div
      className={`flex items-center justify-${align} pt-3 border-t border-gray-100 ${className}`}
    >
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group inline-flex items-center gap-2 text-blue-600 text-sm md:text-base font-medium hover:text-blue-700 transition-colors"
      >
        {label}
        <span className="group-hover:translate-x-1 transition-transform">
          →
        </span>
      </a>
    </div>
  );
}
