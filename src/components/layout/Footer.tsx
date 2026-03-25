export default function Footer() {
  return (
    <footer className="py-10 border-t border-default bg-surface">
      <div className="max-w-5xl mx-auto px-4 text-sm text-muted flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} Pradyuman</div>

        <div className="font-mono text-xs sm:text-sm text-muted">
          {`{ built with React · Tailwind · `}
          <span className="inline-block w-[56px] text-center opacity-20 hover:opacity-100 transition-opacity duration-300">
            {"Claude"}
          </span>
          {" }"}
        </div>
      </div>
    </footer>
  );
}
