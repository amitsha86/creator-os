"use client";
import { useEffect, useRef, useState } from "react";
import { Info } from "lucide-react";

// Plain-language explanations for every score Creora shows. Each makes clear the
// score is an ESTIMATE, not a guarantee.
export const SCORE_EXPLAINERS = {
  growth:
    "Growth Score combines content consistency, topic-market fit, packaging quality, repurposing potential, and competitor opportunity signals. It's an estimate, not a guarantee.",
  viral:
    "Viral Score estimates potential based on trend momentum, title strength, audience fit, competitor patterns, and repurposing potential. It does not guarantee performance.",
  opportunity:
    "Opportunity Score is based on trend momentum, competitor activity, topic saturation, and fit with the creator's channel or niche.",
  trend: "Trend Score reflects visible topic momentum and demand signals.",
  saturation:
    "Saturation estimates how crowded a topic appears based on competing content and repeated formats.",
} as const;

export type ScoreType = keyof typeof SCORE_EXPLAINERS;

const LABELS: Record<ScoreType, string> = {
  growth: "Growth Score",
  viral: "Viral Score",
  opportunity: "Opportunity Score",
  trend: "Trend Score",
  saturation: "Saturation",
};

/**
 * Accessible "how this is calculated" affordance. It's a real <button> (keyboard
 * focusable, Enter/Space toggles), toggles on click/tap (works on touch — not
 * hover-only), and closes on outside click or Escape.
 */
export function ScoreExplainer({ type, className = "" }: { type: ScoreType; className?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <span ref={ref} className={`relative inline-flex align-middle ${className}`}>
      <button
        type="button"
        aria-label={`How ${LABELS[type]} is calculated`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="grid h-4 w-4 place-items-center rounded-full text-[#94A3B8] transition-colors hover:text-[#0F172A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2463EB]"
      >
        <Info size={13} />
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute left-1/2 top-6 z-50 w-64 max-w-[80vw] -translate-x-1/2 rounded-[14px] border border-[rgba(15,23,42,0.12)] bg-white p-3.5 text-[12px] leading-relaxed text-[#475569]"
          style={{ boxShadow: "0 18px 60px rgba(20,10,10,0.18)" }}
        >
          <span className="mb-1 block font-semibold text-[#0F172A]">{LABELS[type]}</span>
          {SCORE_EXPLAINERS[type]}
        </span>
      )}
    </span>
  );
}
