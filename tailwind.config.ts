import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
      },
      boxShadow: {
        panel: "0 18px 50px rgba(21, 24, 28, 0.08), 0 2px 8px rgba(21, 24, 28, 0.05)",
        card: "0 24px 42px rgba(23, 25, 28, 0.08), 0 1px 0 rgba(23, 25, 28, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
