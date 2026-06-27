import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto py-20 px-4 text-center">
      <p className="font-mono text-sm text-brand">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-primary">
        Page not found
      </h1>
      <p className="mt-3 text-muted">
        The page you’re looking for doesn’t exist or may have moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl border border-brand/70 px-4 py-2 text-sm font-medium text-brand hover:bg-brand-subtle transition focus-ring group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">
          ←
        </span>
        Back home
      </Link>
    </div>
  );
}
