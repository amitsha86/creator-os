import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Creora light theme (semantic tokens reused across the whole app)
        bg: {
          DEFAULT: "#E9E3D9",
          soft: "#F2F0EA",
          panel: "#FBFAF6",
          elevated: "#E5DAD2",
          hover: "#ECE2DA",
        },
        line: { DEFAULT: "rgba(59,23,34,0.12)", soft: "rgba(59,23,34,0.07)" },
        ink: { DEFAULT: "#3B1722", muted: "#7A6B6B", faint: "#A8988F" },
        brand: { DEFAULT: "#2463EB", soft: "#4f86f2", dim: "#1d54cf" },
        sky: "#2463EB",
        mint: "#15a34a",
        amber: "#c2740a",
        rose: "#d12c4f",
        // Creora premium creator palette (warm, light)
        creora: {
          bg: "#5B5656",
          surface: "#F2F0EA",
          soft: "#DDD0C9",
          muted: "#CDBDB6",
          text: "#3B1722",
          subtext: "#7A6B6B",
          blue: "#2463EB",
          lime: "#B9FF1D",
          purple: "#D8B4FE",
          border: "rgba(59,23,34,0.12)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: { xl: "0.85rem", "2xl": "1.1rem", card: "28px", pill: "999px" },
      boxShadow: {
        card: "0 10px 34px -16px rgba(20,10,10,0.16)",
        glow: "0 0 0 1px rgba(36,99,235,0.35), 0 8px 30px -8px rgba(36,99,235,0.30)",
        creora: "0 18px 60px rgba(20,10,10,0.18)",
        "creora-sm": "0 8px 28px rgba(20,10,10,0.10)",
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
