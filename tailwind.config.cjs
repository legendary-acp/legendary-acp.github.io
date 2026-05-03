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
        // Microsoft Fluent communication-blue ramp
        brand: {
          50:  "#eff6fc",
          100: "#deecf9",
          200: "#c7e0f4",
          300: "#a9d3f2",
          400: "#71afe5",
          500: "#2b88d8",
          600: "#0078d4",
          700: "#106ebe",
          800: "#005a9e",
          900: "#004578",
        },
        // Microsoft logo accent palette — used sparingly for category/status accents
        fluent: {
          red:    "#f25022",
          green:  "#7fba00",
          blue:   "#00a4ef",
          yellow: "#ffb900",
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
