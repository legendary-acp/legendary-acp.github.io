import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import clsx from "classnames";
import { Typewriter } from "react-simple-typewriter";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Notes", to: "/notes" },
  { label: "Log", to: "/logs" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const handleSayHi = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const contactId = "contact";
    const scrollToContact = () => {
      const el = document.getElementById(contactId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (location.pathname === "/") {
      scrollToContact();
    } else {
      navigate("/#contact");
      setTimeout(scrollToContact, 300);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      {/* ── Desktop: 3-zone grid ─────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 h-14 hidden md:grid md:grid-cols-3 items-center">

        {/* Zone 1 — Brand */}
        <NavLink
          to="/"
          className="flex items-center gap-2 font-mono text-[15px] leading-none"
        >
          <span className="text-blue-600 font-semibold">{">"}</span>
          <span className="font-semibold text-slate-900 tracking-tight">
            pradyuman&nbsp;|&nbsp;
            <span className="text-slate-700">
              <Typewriter
                words={["systems", "backend", "architecture"]}
                loop={0}
                cursor
                cursorStyle="▌"
                typeSpeed={100}
                deleteSpeed={100}
                delaySpeed={1500}
              />
            </span>
          </span>
        </NavLink>

        {/* Zone 2 — Navigation (centred) */}
        <nav className="flex items-center justify-center gap-6 text-sm font-medium">
          {LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(
                  "transition hover:text-blue-700",
                  isActive ? "text-blue-700" : "text-slate-600"
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3 — Actions (right-aligned) */}
        <div className="flex items-center justify-end gap-3">
          {/* HIDDEN — dark mode toggle (re-enable when ready)
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="inline-flex items-center justify-center w-8 h-8 text-slate-400 hover:text-slate-700 active:scale-95 transition"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          */}

          <a
            href="#contact"
            onClick={handleSayHi}
            className="inline-flex items-center gap-1.5 rounded-xl border border-blue-500/70 text-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-50 hover:shadow-[0_0_8px_rgba(37,99,235,0.15)] active:scale-95 active:bg-blue-100 transition"
          >
            Say hi →
          </a>
        </div>
      </div>

      {/* ── Mobile: brand + actions + hamburger ─────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 h-14 flex md:hidden items-center justify-between">
        <NavLink
          to="/"
          className="flex items-center gap-2 font-mono text-[15px] leading-none"
        >
          <span className="text-blue-600 font-semibold">{">"}</span>
          <span className="font-semibold text-slate-900 tracking-tight">pradyuman</span>
        </NavLink>

        {/* Right: dark toggle + Say hi + hamburger */}
        <div className="flex items-center gap-2">
          {/* HIDDEN — dark mode toggle (re-enable when ready)
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="inline-flex items-center justify-center w-8 h-8 text-slate-400 hover:text-slate-700 active:scale-95 transition"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          */}

          <a
            href="#contact"
            onClick={handleSayHi}
            className="inline-flex items-center gap-1 rounded-xl border border-blue-500/70 text-blue-600 px-3 py-1.5 text-sm font-medium hover:bg-blue-50 active:scale-95 active:bg-blue-100 transition"
          >
            Say hi →
          </a>

          <button
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-300 text-slate-700"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
          {open ? (
            <svg
              fill="#000000"
              viewBox="-204.8 -204.8 1433.60 1433.60"
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(0)"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#CCCCCC"
                strokeWidth="8.192"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M697.4 759.2l61.8-61.8L573.8 512l185.4-185.4-61.8-61.8L512 450.2 326.6 264.8l-61.8 61.8L450.2 512 264.8 697.4l61.8 61.8L512 573.8z"></path>
              </g>
            </svg>
          ) : (
            <svg
              fill="#000000"
              viewBox="0 0 1024.00 1024.00"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000000"
              strokeWidth="0.01024"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#CCCCCC"
                strokeWidth="2.048"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <title>Artboard</title>
                <path
                  d="M768 306.2V383H256v-76.8h512zM256 536.6h512v-76.8H256v76.8zm0 153.6h512v-76.8H256v76.8z"
                  fillRule="evenodd"
                ></path>
              </g>
            </svg>
          )}
        </button>
        </div>
      </div>

      <div
        className={clsx(
          "md:hidden border-t border-slate-200 bg-white/95 backdrop-blur px-4 overflow-hidden transition-all duration-200 ease-in-out",
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="py-3 flex flex-col gap-1 text-sm">
          {LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(
                  "rounded-lg px-3 py-2 hover:bg-slate-100",
                  isActive && "bg-slate-100 text-blue-700 font-medium"
                )
              }
            >
              {label}
            </NavLink>
          ))}

        </nav>
      </div>
    </header>
  );
}
