import { useEffect, useState } from "react";
import { ThemeContext } from "./theme";
import type { Theme } from "./theme";

const mq = () => window.matchMedia("(prefers-color-scheme: dark)");
const getSystemTheme = (): Theme => (mq().matches ? "dark" : "light");

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return getSystemTheme();
  });

  // If the user has no explicit override, keep in sync with OS changes live
  useEffect(() => {
    if (localStorage.getItem("theme")) return;

    const listener = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    mq().addEventListener("change", listener);
    return () => mq().removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggle = () => {
    setTheme((t) => {
      const next = t === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
