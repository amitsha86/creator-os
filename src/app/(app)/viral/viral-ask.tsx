"use client";
import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/primitives";

export function ViralAsk() {
  const [niche, setNiche] = useState("tech & maker");
  const [out, setOut] = useState<string | null>(null);
  const [live, setLive] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true); setOut(null);
    try {
      const res = await fetch("/api/ai/opportunities", { method: "POST", body: JSON.stringify({ niche }) });
      const data = await res.json();
      setOut(data.text); setLive(data.live);
    } finally { setLoading(false); }
  }

  return (
    <Card className="border-brand/30 bg-gradient-to-br from-brand/10 to-transparent">
      <div className="flex items-center gap-2 text-sm font-medium text-ink"><Sparkles size={15} className="text-brand-soft" /> Ask the Research agent: “What should I create next?”</div>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input value={niche} onChange={(e) => setNiche(e.target.value)} className="input flex-1" placeholder="Your niche…" />
        <button onClick={run} disabled={loading} className="btn-primary sm:w-40">
          {loading ? <><Loader2 size={15} className="animate-spin" /> Scanning…</> : "Generate ideas"}
        </button>
      </div>
      {out && (
        <div className="mt-3 rounded-lg border border-line bg-bg-soft p-3">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink">{out}</p>
          {live === false && <span className="mt-2 block text-[10px] text-ink-faint">· fallback mode — add ANTHROPIC_API_KEY for live AI</span>}
        </div>
      )}
    </Card>
  );
}
