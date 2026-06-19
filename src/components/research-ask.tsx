"use client";
import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

export function ResearchAsk() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);

  async function ask() {
    if (!q.trim()) return;
    setLoading(true);
    setAnswer(null);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type: "research", topic: q.trim() }),
      });
      const { text } = await res.json();
      setAnswer(text ?? "Couldn't answer — try again.");
    } catch {
      setAnswer("Couldn't answer — try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-brand/30 bg-gradient-to-br from-brand/10 to-transparent p-4">
      <div className="text-sm font-medium text-ink">Ask your research</div>
      <div className="mt-2 flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") ask(); }}
          className="input flex-1"
          placeholder="e.g. What do all my saved hook teardowns have in common?"
        />
        <button onClick={ask} disabled={loading} className="btn-primary px-3">
          {loading ? <Loader2 size={14} className="animate-spin" /> : <><Sparkles size={14} /> Ask</>}
        </button>
      </div>
      {answer ? (
        <div className="mt-3 rounded-lg border border-line bg-bg-soft p-3">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-ink-muted">{answer}</pre>
          <div className="mt-2 text-xs text-ink-faint">Grounded in creator-growth best practices · live from Claude</div>
        </div>
      ) : (
        <p className="mt-2 text-xs text-ink-faint">Answers are grounded in your saved items (RAG over your workspace).</p>
      )}
    </div>
  );
}
