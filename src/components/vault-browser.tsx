"use client";
import { useMemo, useState } from "react";
import type { VaultItem } from "@/lib/data";
import { Card, Badge } from "@/components/ui/primitives";
import { Search, Quote, FileText, Layers, Image as ImageIcon, FileCode, BookMarked } from "lucide-react";

const kindIcon: Record<string, any> = { Hook: Quote, Script: FileText, Framework: Layers, Thumbnail: ImageIcon, Template: FileCode, SOP: BookMarked };

export function VaultBrowser({ items }: { items: VaultItem[] }) {
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<string>("All");
  const kinds = useMemo(() => Array.from(new Set(items.map((v) => v.kind))), [items]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return [...items]
      .filter((v) => kind === "All" || v.kind === kind)
      .filter((v) => !term || v.title.toLowerCase().includes(term) || v.kind.toLowerCase().includes(term) || v.tags.some((t) => t.toLowerCase().includes(term)))
      .sort((a, b) => b.perf - a.perf);
  }, [items, q, kind]);

  return (
    <div>
      <div className="mb-4 flex items-center gap-2 rounded-lg border border-line bg-bg-soft px-3 py-2">
        <Search size={15} className="text-ink-faint" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
          placeholder="Search hooks, frameworks, SOPs, tags…"
        />
        <span className="text-xs text-ink-faint">{filtered.length} of {items.length}</span>
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {["All", ...kinds].map((k) => (
          <button key={k} onClick={() => setKind(k)} className={`chip ${kind === k ? "text-ink ring-1 ring-brand/40" : ""}`}>{k}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card><p className="py-6 text-center text-sm text-ink-faint">No matches{q ? ` for “${q}”` : ""}.</p></Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v) => {
            const Icon = kindIcon[v.kind] ?? FileText;
            return (
              <Card key={v.id} className="card-hover">
                <div className="flex items-start justify-between">
                  <div className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-bg-elevated text-brand-soft"><Icon size={15} /></div>
                  <Badge tone={v.perf >= 90 ? "mint" : v.perf >= 80 ? "sky" : "default"}>Perf {v.perf}</Badge>
                </div>
                <div className="mt-2.5 text-sm font-medium leading-snug text-ink">{v.title}</div>
                <div className="mt-1 text-xs text-ink-faint">{v.kind}</div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {v.tags.map((t) => <span key={t} className="rounded bg-bg-elevated px-1.5 py-0.5 text-[10px] text-ink-muted">#{t}</span>)}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
