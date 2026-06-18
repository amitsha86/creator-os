"use client";
import { useEffect, useState } from "react";
import { STAGES, type Stage, type ContentItem } from "@/lib/data";
import { Badge, PageHeader } from "@/components/ui/primitives";
import { PlatformIcon } from "@/components/ui/platform";
import { KanbanSquare, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const prioTone: Record<string, any> = { High: "rose", Med: "amber", Low: "default" };

export default function PipelinePage() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dragId, setDragId] = useState<string | null>(null);
  const [over, setOver] = useState<Stage | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((d) => setItems(d.content ?? []))
      .finally(() => setLoading(false));
  }, []);

  async function addContent(stage: Stage) {
    const title = window.prompt(`New content title (${stage}):`);
    if (!title?.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title: title.trim(), stage }),
      });
      const data = await res.json();
      if (data.item) setItems((it) => [...it, data.item]);
    } finally {
      setSaving(false);
    }
  }

  async function drop(stage: Stage) {
    setOver(null);
    if (!dragId) return;
    const id = dragId;
    setDragId(null);
    const prev = items;
    const moved = items.find((c) => c.id === id);
    if (!moved || moved.stage === stage) return;
    // optimistic update
    setItems((it) => it.map((c) => (c.id === id ? { ...c, stage } : c)));
    setSaving(true);
    try {
      const res = await fetch(`/api/content/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ stage }),
      });
      if (!res.ok) throw new Error("save failed");
    } catch {
      setItems(prev); // rollback on failure
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <PageHeader icon={<KanbanSquare size={18} />} title="Content Pipeline"
        subtitle="Idea → Analyze. Drag cards across stages — changes are saved to your database and persist across reloads."
        actions={saving ? <span className="flex items-center gap-1.5 text-xs text-ink-faint"><Loader2 size={12} className="animate-spin" /> Saving…</span> : <button onClick={() => addContent("Idea")} className="btn-primary">+ New content</button>} />

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-20 text-sm text-ink-muted"><Loader2 size={16} className="animate-spin" /> Loading pipeline…</div>
      ) : (
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
                  <button onClick={() => addContent(stage)} className="w-full rounded-lg border border-dashed border-line py-1.5 text-xs text-ink-faint hover:text-ink-muted">+ Add</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
