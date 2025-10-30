/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: { brand: { blue: "#1976d2" } },
      borderRadius: { "2xl": "1rem" },
      boxShadow: {
        soft: "0 6px 24px rgba(16,24,40,.08), 0 2px 4px rgba(16,24,40,.06)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
