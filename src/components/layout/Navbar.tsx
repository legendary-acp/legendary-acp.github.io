import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import clsx from "classnames";
import { Typewriter } from "react-simple-typewriter";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Reading Log", to: "/reading-log" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand */}
        <NavLink
          to="/"
          className="flex items-center gap-2 sm:gap-3 font-mono text-[15px] leading-none"
        >
          <span className="text-blue-600 font-semibold">{">"}</span>
          <span className="font-semibold text-slate-900 tracking-tight">
            pradyuman&nbsp;|&nbsp;
            <span className="text-slate-700">
              <Typewriter
                words={["systems", "backend", "architecture"]}
                loop={0} // infinite
                cursor
                cursorStyle="▌"
                typeSpeed={100}
                deleteSpeed={100}
                delaySpeed={1500}
              />
            </span>
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(
                  "transition hover:text-blue-700",
                  isActive ? "text-blue-700" : "text-slate-700"
                )
              }
            >
              {label}
            </NavLink>
          ))}

          {/* Say hi button */}
          <a
            href="#contact"
            onClick={handleSayHi}
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

          {/* Say hi button */}
          <a
            href="#contact"
            onClick={handleSayHi}
            className="mt-1 inline-flex items-center justify-center rounded-lg bg-blue-600 text-white font-medium px-3 py-2 hover:bg-blue-700"
          >
            Say hi
          </a>
        </nav>
      </div>
    </header>
  );
}
