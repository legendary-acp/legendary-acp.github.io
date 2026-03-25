/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx,md,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      borderRadius: { "2xl": "1rem" },
      boxShadow: {
        soft: "0 6px 24px rgba(16,24,40,.08), 0 2px 4px rgba(16,24,40,.06)",
        xs:   "0 1px 2px rgba(16,24,40,.05)",
        sm:   "0 1px 3px rgba(16,24,40,.1), 0 1px 2px rgba(16,24,40,.06)",
        md:   "0 4px 8px -2px rgba(16,24,40,.1), 0 2px 4px -2px rgba(16,24,40,.06)",
        lg:   "0 12px 16px -4px rgba(16,24,40,.1), 0 4px 6px -2px rgba(16,24,40,.05)",
      },
      zIndex: {
        dropdown: "100",
        sticky:   "200",
        modal:    "400",
        tooltip:  "600",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
