"use client";
import { useState } from "react";
import { repurposeTargets } from "@/lib/data";
import { PlatformIcon } from "@/components/ui/platform";
import { Badge } from "@/components/ui/primitives";
import { Loader2, Sparkles } from "lucide-react";

export function RepurposePack({ source }: { source: string }) {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const total = repurposeTargets.reduce((a, t) => a + t.count, 0);

  async function generate() {
    setLoading(true);
    setOutput(null);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type: "repurpose", topic: source }),
      });
      const { text } = await res.json();
      setOutput(text ?? "Couldn't generate the pack — try again.");
    } catch {
      setOutput("Couldn't generate the pack — try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-line bg-bg-panel p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-ink">{total} pieces ready to schedule</span>
        <button onClick={generate} disabled={loading} className="btn-primary h-8 px-3 text-xs">
          {loading ? <><Loader2 size={13} className="animate-spin" /> Generating…</> : <><Sparkles size={13} /> Generate pack</>}
        </button>
      </div>
      <div className="space-y-2">
        {repurposeTargets.map((t) => (
          <div key={t.label} className="flex items-center gap-3 rounded-lg border border-line bg-bg-soft p-2.5">
            <PlatformIcon platform={t.platform} size={16} />
            <div className="min-w-0 flex-1">
              <div className="text-sm text-ink">{t.label}</div>
              <div className="text-xs text-ink-faint">{t.desc}</div>
            </div>
            <Badge tone="brand">×{t.count}</Badge>
          </div>
        ))}
      </div>
      {output ? (
        <div className="mt-3 rounded-lg border border-line bg-bg-soft p-3">
          <div className="mb-1 text-xs font-medium text-brand-soft">Generated pack · live from Claude</div>
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-ink-muted">{output}</pre>
        </div>
      ) : (
        <p className="mt-3 text-xs text-ink-faint">Outputs land in your Calendar as schedulable drafts with captions, reframing, and hooks.</p>
      )}
    </div>
  );
}
