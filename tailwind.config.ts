import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Creora light theme (semantic tokens reused across the whole app)
        bg: {
          DEFAULT: "#EEF2F8",
          soft: "#FFFFFF",
          panel: "#FFFFFF",
          elevated: "#E2E8F0",
          hover: "#E8EEF6",
        },
        line: { DEFAULT: "rgba(15,23,42,0.12)", soft: "rgba(15,23,42,0.07)" },
        ink: { DEFAULT: "#0F172A", muted: "#64748B", faint: "#94A3B8" },
        brand: { DEFAULT: "#2463EB", soft: "#4f86f2", dim: "#1d54cf" },
        sky: "#2463EB",
        mint: "#15a34a",
        amber: "#c2740a",
        rose: "#d12c4f",
        // Creora premium creator palette (warm, light)
        creora: {
          bg: "#0F172A",
          surface: "#FFFFFF",
          soft: "#E7EDF6",
          muted: "#CBD5E1",
          text: "#0F172A",
          subtext: "#64748B",
          blue: "#2463EB",
          lime: "#BEF264",
          purple: "#D8B4FE",
          border: "rgba(15,23,42,0.12)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: { xl: "0.85rem", "2xl": "1.1rem", card: "28px", pill: "999px" },
      boxShadow: {
        card: "0 10px 34px -16px rgba(15,23,42,0.16)",
        glow: "0 0 0 1px rgba(36,99,235,0.35), 0 8px 30px -8px rgba(36,99,235,0.30)",
        creora: "0 18px 60px rgba(15,23,42,0.18)",
        "creora-sm": "0 8px 28px rgba(15,23,42,0.10)",
      },
      keyframes: {
        "fade-in": { from: { opacity: "0", transform: "translateY(4px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        shimmer: { "100%": { transform: "translateX(100%)" } },
      },
      animation: { "fade-in": "fade-in 0.3s ease-out both" },
    },
  },
  plugins: [],
};

export default config;
