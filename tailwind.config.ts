import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0a0b0f",
          soft: "#0e1016",
          panel: "#12141c",
          elevated: "#171a23",
          hover: "#1c1f2a",
        },
        line: { DEFAULT: "#23262f", soft: "#1a1d26" },
        ink: { DEFAULT: "#e7e9ee", muted: "#9aa1ad", faint: "#6b7280" },
        brand: { DEFAULT: "#6366f1", soft: "#818cf8", dim: "#4f46e5" },
        sky: "#0ea5e9",
        mint: "#10b981",
        amber: "#f59e0b",
        rose: "#f43f5e",
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
        card: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,0.6)",
        glow: "0 0 0 1px rgba(99,102,241,0.4), 0 8px 30px -8px rgba(99,102,241,0.35)",
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
