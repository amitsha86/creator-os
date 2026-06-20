import { cn, compact, pct } from "@/lib/utils";
import type { ReactNode } from "react";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("card p-5", className)}>{children}</div>;
}

export function PageHeader({ title, subtitle, icon, actions }: { title: string; subtitle?: string; icon?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        {icon && <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg border border-line bg-bg-elevated text-brand-soft">{icon}</div>}
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-ink">{title}</h1>
          {subtitle && <p className="mt-0.5 text-sm text-ink-muted">{subtitle}</p>}
        </div>
      </div>
      {actions}
    </div>
  );
}

export function Badge({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "brand" | "mint" | "amber" | "rose" | "sky" }) {
  const tones: Record<string, string> = {
    default: "border-line bg-bg-elevated text-ink-muted",
    brand: "border-brand/30 bg-brand/10 text-brand-soft",
    mint: "border-mint/30 bg-mint/10 text-mint",
    amber: "border-amber/30 bg-amber/10 text-amber",
    rose: "border-rose/30 bg-rose/10 text-rose",
    sky: "border-sky/30 bg-sky/10 text-sky",
  };
  return <span className={cn("inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium", tones[tone])}>{children}</span>;
}

export function Spark({ data, color = "#2463EB", className }: { data: number[]; color?: string; className?: string }) {
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${28 - ((v - min) / range) * 26}`).join(" ");
  return (
    <svg viewBox="0 0 100 28" preserveAspectRatio="none" className={cn("h-8 w-full", className)}>
      <defs>
        <linearGradient id={`g-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={`0,28 ${pts} 100,28`} fill={`url(#g-${color})`} stroke="none" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function StatCard({ label, value, delta, suffix, spark }: { label: string; value: number; delta: number; suffix?: string; spark: number[] }) {
  const display = suffix === "$" ? `$${compact(value)}` : suffix === "%" ? `${value}%` : compact(value);
  const up = delta >= 0;
  return (
    <div className="card card-hover p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-ink-faint">{label}</span>
        <span className={cn("text-xs font-medium", up ? "text-mint" : "text-rose")}>{pct(delta)}</span>
      </div>
      <div className="mt-1 text-2xl font-semibold tracking-tight text-ink">{display}</div>
      <div className="mt-2"><Spark data={spark} color={up ? "#10b981" : "#f43f5e"} /></div>
    </div>
  );
}

export function ScoreRing({ value, size = 56, label }: { value: number; size?: number; label?: string }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const color = value >= 80 ? "#10b981" : value >= 60 ? "#0ea5e9" : value >= 40 ? "#f59e0b" : "#f43f5e";
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(15,23,42,0.10)" strokeWidth="5" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={circ - (value / 100) * circ} />
        <text x="50%" y="50%" dy="0.35em" textAnchor="middle" className="rotate-90" style={{ transformOrigin: "center" }} fill="#0F172A" fontSize="14" fontWeight="600">{value}</text>
      </svg>
      {label && <span className="text-[10px] uppercase tracking-wide text-ink-faint">{label}</span>}
    </div>
  );
}

export function ScoreBar({ label, value }: { label: string; value: number }) {
  const color = value >= 80 ? "bg-mint" : value >= 60 ? "bg-sky" : value >= 40 ? "bg-amber" : "bg-rose";
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-ink-muted">{label}</span>
        <span className="font-medium text-ink">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-bg-elevated">
        <div className={cn("h-full rounded-full", color)} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function EmptyHint({ children }: { children: ReactNode }) {
  return <div className="rounded-lg border border-dashed border-line bg-bg-soft px-4 py-6 text-center text-sm text-ink-faint">{children}</div>;
}
