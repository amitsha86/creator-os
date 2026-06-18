"use client";
import { useState } from "react";
import { recommendations, agents } from "@/lib/data";
import { Card, Badge, PageHeader } from "@/components/ui/primitives";
import { Sparkles, Loader2, RefreshCw } from "lucide-react";

export default function CoachPage() {
  const [memo, setMemo] = useState<string | null>(null);
  const [live, setLive] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/coach", { method: "POST" });
      const data = await res.json();
      setMemo(data.text); setLive(data.live);
    } finally { setLoading(false); }
  }

  return (
    <div>
      <PageHeader icon={<Sparkles size={18} />} title="AI Growth Coach" subtitle="A virtual strategist that reviews your data weekly and tells you exactly what to do next."
        actions={<button onClick={run} disabled={loading} className="btn-primary">{loading ? <><Loader2 size={15} className="animate-spin" /> Generating…</> : <><RefreshCw size={14} /> Generate memo</>}</button>} />

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <div className="text-sm font-medium text-ink">Weekly growth memo</div>
          {!memo && !loading && (
            <div className="mt-3 space-y-3">
              <p className="text-sm text-ink-muted">Headline: your last 3 winners all used a budget/contrarian hook — lean into that pattern.</p>
              {recommendations.map((r) => (
                <div key={r.id} className="rounded-lg border border-line bg-bg-soft p-3">
                  <p className="text-sm text-ink">{r.action}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge tone="brand">Impact {r.impact}</Badge>
                    <Badge>Effort {r.effort}</Badge>
                    <span className="ml-auto text-xs text-brand-soft">{r.module} →</span>
                  </div>
                </div>
              ))}
              <p className="text-xs text-ink-faint">Hit “Generate memo” for a fresh, AI-written strategist briefing.</p>
            </div>
          )}
          {loading && <div className="mt-6 flex items-center gap-2 text-sm text-ink-muted"><Loader2 size={16} className="animate-spin" /> Reviewing analytics, competitors, and content performance…</div>}
          {memo && (
            <div className="mt-3 rounded-lg border border-line bg-bg-soft p-4">
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink">{memo}</p>
              {live === false && <span className="mt-3 block text-[10px] text-ink-faint">· fallback mode — add ANTHROPIC_API_KEY for live AI</span>}
              {live === true && <span className="mt-3 block text-[10px] text-mint">· live · written by Claude</span>}
            </div>
          )}
        </Card>

        <Card>
          <div className="mb-3 text-sm font-medium text-ink">Agent activity</div>
          <div className="space-y-2">
            {agents.map((a) => (
              <div key={a.name} className="flex items-center gap-2.5 rounded-lg border border-line bg-bg-soft p-2.5">
                <span className="h-2 w-2 rounded-full" style={{ background: a.color }} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-ink">{a.name} agent</div>
                  <div className="text-xs text-ink-faint">{a.desc}</div>
                </div>
                <span className="text-xs text-ink-faint">{a.status}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
