import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F0F0F0",
        ink: "#1A1A1A",
        "ink-muted": "#6B6B6B",
        "ink-faint": "#9A9A9A",
        border: "#D8D8D8",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      /* ─── 12-Column Grid System ─── */
      gridTemplateColumns: {
        layout: "repeat(12, 1fr)",
      },
      gap: {
        gutter: "1rem",   /* 16px gutter */
      },
      maxWidth: {
        grid: "1440px",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
          xl: "2rem",
        },
        screens: {
          "2xl": "1440px",
        },
      },
      borderRadius: {
        lg: "0.625rem",
        md: "0.425rem",
        sm: "0.225rem",
      },
    },
  },
  plugins: [],
};

export default config;

