"use client";
import { useState } from "react";
import { scripts } from "@/lib/data";
import { Card, ScoreBar, Badge, PageHeader } from "@/components/ui/primitives";
import { PenLine, Loader2, Wand2, AlertTriangle } from "lucide-react";

export default function ScriptStudioPage() {
  const doc = scripts[0];
  const [blocks, setBlocks] = useState(doc.blocks);
  const [scores, setScores] = useState(doc.scores);
  const [fix, setFix] = useState<string>("Emotional score dips around 2:10 — add a stakes beat before the build.");
  const [loading, setLoading] = useState(false);
  const [live, setLive] = useState<boolean | null>(null);

  function update(i: number, body: string) {
    setBlocks((b) => b.map((blk, idx) => (idx === i ? { ...blk, body } : blk)));
  }
  async function score() {
    setLoading(true);
    try {
      const full = blocks.map((b) => `${b.kind} ${b.time}\n${b.body}`).join("\n\n");
      const res = await fetch("/api/ai/score", { method: "POST", body: JSON.stringify({ script: full }) });
      const data = await res.json();
      const s = data.scores;
      setScores({ retention: s.retention, hook: s.hook, emotional: s.emotional, viral: s.viral });
      if (s.fix) setFix(s.fix);
      setLive(data.live);
    } finally { setLoading(false); }
  }

  const heat = blocks.flatMap((b) => b.body.split(/[.!?]/).filter(Boolean).map((_, i) => 40 + ((b.body.length * (i + 3)) % 55)));

  return (
    <div>
      <PageHeader icon={<PenLine size={18} />} title="Script Studio" subtitle={doc.title}
        actions={<Badge tone="brand">{doc.framework}</Badge>} />

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        {/* Editor */}
        <div className="space-y-3">
          {blocks.map((b, i) => (
            <Card key={i} className="!p-0 overflow-hidden">
              <div className="flex items-center gap-2 border-b border-line bg-bg-soft px-4 py-2">
                <span className="text-xs font-semibold tracking-wide text-brand-soft">{b.kind}</span>
                <span className="text-xs text-ink-faint">{b.time}</span>
                {b.note && <span className="ml-auto text-xs italic text-ink-faint">{b.note}</span>}
              </div>
              <textarea value={b.body} onChange={(e) => update(i, e.target.value)} rows={Math.max(2, Math.ceil(b.body.length / 70))}
                className="w-full resize-none bg-transparent px-4 py-3 text-sm leading-relaxed text-ink outline-none" />
            </Card>
          ))}
          <button className="btn-ghost w-full">+ Add scene</button>
        </div>

        {/* Scores */}
        <div className="space-y-3">
          <Card>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-ink">Live scores</span>
              <button onClick={score} disabled={loading} className="btn-primary h-8 px-3 text-xs">
                {loading ? <><Loader2 size={13} className="animate-spin" /> Scoring…</> : <><Wand2 size={13} /> Score with AI</>}
              </button>
            </div>
            <div className="space-y-3">
              <ScoreBar label="Retention" value={scores.retention} />
              <ScoreBar label="Hook strength" value={scores.hook} />
              <ScoreBar label="Emotional" value={scores.emotional} />
              <ScoreBar label="Viral potential" value={scores.viral} />
            </div>
            {live === true && <span className="mt-3 block text-[10px] text-mint">· scored live by Claude</span>}
            {live === false && <span className="mt-3 block text-[10px] text-ink-faint">· fallback mode — add an API key for live scoring</span>}
          </Card>

          <Card className="border-amber/30 bg-amber/5">
            <div className="flex items-start gap-2">
              <AlertTriangle size={15} className="mt-0.5 shrink-0 text-amber" />
              <div>
                <div className="text-sm font-medium text-ink">Suggested fix</div>
                <p className="mt-1 text-sm text-ink-muted">{fix}</p>
                <button className="btn-ghost mt-2 h-7 px-2 text-xs">Apply fix</button>
              </div>
            </div>
          </Card>

          <Card>
            <div className="mb-2 text-sm font-medium text-ink">Retention heat</div>
            <div className="flex h-12 items-end gap-0.5">
              {heat.map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: h >= 70 ? "#10b981" : h >= 50 ? "#0ea5e9" : "#f59e0b" }} />
              ))}
            </div>
            <p className="mt-2 text-xs text-ink-faint">Predicted attention across the script. Dips flag re-write candidates.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
