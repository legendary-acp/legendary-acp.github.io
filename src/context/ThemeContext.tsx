import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const mq = () => window.matchMedia("(prefers-color-scheme: dark)");

const getSystemTheme = (): Theme => (mq().matches ? "dark" : "light");

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    // No explicit user choice — follow OS
    return getSystemTheme();
  });

  // If the user has no explicit override, keep in sync with OS changes live
  useEffect(() => {
    if (localStorage.getItem("theme")) return; // user has made a choice — don't override

    const listener = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    mq().addEventListener("change", listener);
    return () => mq().removeEventListener("change", listener);
  }, []);

  // Apply the class + only persist when the user has made an explicit choice
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggle = () => {
    setTheme((t) => {
      const next = t === "light" ? "dark" : "light";
      localStorage.setItem("theme", next); // explicit override
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
