"use client";
import { useState } from "react";
import { Loader2, Mail, FileText } from "lucide-react";

export function SponsorAgent({ niche }: { niche: string }) {
  const [loading, setLoading] = useState<null | "outreach" | "mediakit">(null);
  const [label, setLabel] = useState<string | null>(null);
  const [output, setOutput] = useState<string | null>(null);

  async function run(type: "outreach" | "mediakit", title: string) {
    setLoading(type);
    setLabel(title);
    setOutput(null);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type, topic: niche }),
      });
      const { text } = await res.json();
      setOutput(text ?? "Couldn't generate — try again.");
    } catch {
      setOutput("Couldn't generate — try again.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div>
      <div className="text-sm font-medium text-ink">Sponsor agent</div>
      <p className="mt-1 text-sm text-ink-muted">3 brands match your niche &amp; audience. Draft personalized outreach and a live media kit in one click.</p>
      <div className="mt-2 flex gap-2">
        <button onClick={() => run("outreach", "Outreach email")} disabled={!!loading} className="btn-primary h-8 px-3 text-xs">
          {loading === "outreach" ? <><Loader2 size={13} className="animate-spin" /> Drafting…</> : <><Mail size={13} /> Draft outreach</>}
        </button>
        <button onClick={() => run("mediakit", "Media kit")} disabled={!!loading} className="btn-ghost h-8 px-3 text-xs">
          {loading === "mediakit" ? <><Loader2 size={13} className="animate-spin" /> Building…</> : <><FileText size={13} /> Generate media kit</>}
        </button>
      </div>
      {output && (
        <div className="mt-3 rounded-lg border border-line bg-bg-soft p-3">
          <div className="mb-1 text-xs font-medium text-brand-soft">{label} · live from Claude</div>
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-ink-muted">{output}</pre>
        </div>
      )}
    </div>
  );
}
