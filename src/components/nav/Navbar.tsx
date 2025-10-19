import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "classnames";

const LINKS = [
  { label: "Papers", hash: "#papers" },
  { label: "Open Source", hash: "#oss" },
  { label: "Timeline", hash: "#timeline" },
  { label: "Skills", hash: "#skills" },
  { label: "Contact", hash: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route/hash change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Keep SPA-friendly hash scrolling working reliably
  const onHashClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    // Keep URL hash behavior but ensure we scroll even if already on "/"
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", hash); // update hash without jump
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600" />
          <span className="font-semibold tracking-tight">Pradyuman</span>
          <span className="hidden sm:inline text-slate-500 text-sm font-mono">
            {` { systems · obs · trading }`}
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5 text-sm">
          {LINKS.map(({ label, hash }) => (
            <a
              key={hash}
              href={hash}
              onClick={(e) => onHashClick(e, hash)}
              className="hover:text-blue-700"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => onHashClick(e, "#contact")}
            className="ml-2 inline-flex items-center rounded-xl bg-blue-600 text-white font-medium px-3 py-2 hover:bg-blue-700 transition"
          >
            Say hi
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-300 text-slate-700"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            {open ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={clsx(
          "md:hidden border-t border-slate-200 bg-white/95 backdrop-blur px-4",
          open ? "block" : "hidden"
        )}
      >
        <nav className="py-3 flex flex-col gap-1 text-sm">
          {LINKS.map(({ label, hash }) => (
            <a
              key={hash}
              href={hash}
              onClick={(e) => onHashClick(e, hash)}
              className="rounded-lg px-3 py-2 hover:bg-slate-100"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => onHashClick(e, "#contact")}
            className="mt-1 inline-flex items-center justify-center rounded-lg bg-blue-600 text-white font-medium px-3 py-2 hover:bg-blue-700"
          >
            Say hi
          </a>
        </nav>
      </div>
    </header>
  );
}
