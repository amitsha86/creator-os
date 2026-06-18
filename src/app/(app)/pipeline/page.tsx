"use client";
import { useState } from "react";
import { content as seed, STAGES, type Stage, type ContentItem } from "@/lib/data";
import { Badge, PageHeader } from "@/components/ui/primitives";
import { PlatformIcon } from "@/components/ui/platform";
import { KanbanSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const prioTone: Record<string, any> = { High: "rose", Med: "amber", Low: "default" };

export default function PipelinePage() {
  const [items, setItems] = useState<ContentItem[]>(seed);
  const [dragId, setDragId] = useState<string | null>(null);
  const [over, setOver] = useState<Stage | null>(null);

  function drop(stage: Stage) {
    if (dragId) setItems((it) => it.map((c) => (c.id === dragId ? { ...c, stage } : c)));
    setDragId(null); setOver(null);
  }

  return (
    <div>
      <PageHeader icon={<KanbanSquare size={18} />} title="Content Pipeline" subtitle="Idea → Analyze. Drag cards across stages — entering a stage can auto-trigger the right agent."
        actions={<button className="btn-primary">+ New content</button>} />

      <div className="flex gap-3 overflow-x-auto scroll-thin pb-4">
        {STAGES.map((stage) => {
          const col = items.filter((c) => c.stage === stage);
          return (
            <div key={stage}
              onDragOver={(e) => { e.preventDefault(); setOver(stage); }}
              onDrop={() => drop(stage)}
              className={cn("w-60 shrink-0 rounded-xl border bg-bg-soft/60 p-2 transition-colors", over === stage ? "border-brand/50 bg-brand/5" : "border-line")}>
              <div className="flex items-center justify-between px-2 py-1.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{stage}</span>
                <span className="rounded bg-bg-elevated px-1.5 text-xs text-ink-faint">{col.length}</span>
              </div>
              <div className="space-y-2">
                {col.map((c) => (
                  <div key={c.id} draggable onDragStart={() => setDragId(c.id)}
                    className="cursor-grab rounded-lg border border-line bg-bg-panel p-2.5 shadow-card transition-shadow hover:border-brand/40 active:cursor-grabbing">
                    <div className="flex items-start gap-2">
                      <PlatformIcon platform={c.platform} size={13} />
                      <span className="text-sm leading-snug text-ink">{c.title}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5">
                      <Badge tone={prioTone[c.priority]}>{c.priority}</Badge>
                      {c.predictedCtr && <Badge tone="mint">{c.predictedCtr}% CTR</Badge>}
                      {c.scores && <Badge tone="brand">R {c.scores.retention}</Badge>}
                      <span className="ml-auto grid h-5 w-5 place-items-center rounded-full bg-bg-elevated text-[10px] text-ink-muted">{c.assignee[0]}</span>
                    </div>
                  </div>
                ))}
                <button className="w-full rounded-lg border border-dashed border-line py-1.5 text-xs text-ink-faint hover:text-ink-muted">+ Add</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
