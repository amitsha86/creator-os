import { vault } from "@/lib/data";
import { Card, Badge, PageHeader } from "@/components/ui/primitives";
import { Library, Search, Quote, FileText, Layers, Image as ImageIcon, FileCode, BookMarked } from "lucide-react";

const kindIcon: Record<string, any> = { Hook: Quote, Script: FileText, Framework: Layers, Thumbnail: ImageIcon, Template: FileCode, SOP: BookMarked };

export default function VaultPage() {
  const kinds = Array.from(new Set(vault.map((v) => v.kind)));
  return (
    <div>
      <PageHeader icon={<Library size={18} />} title="Knowledge Vault" subtitle="Your compounding brain — every winning hook, framework, and SOP, semantically searchable. This is the moat."
        actions={<button className="btn-primary">+ Save to Vault</button>} />

      <div className="mb-4 flex items-center gap-2 rounded-lg border border-line bg-bg-soft px-3 py-2">
        <Search size={15} className="text-ink-faint" />
        <input className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint" placeholder="Semantic search — e.g. “a hook like my best video”" />
        <span className="text-xs text-ink-faint">vector search</span>
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        <span className="chip text-ink">All</span>
        {kinds.map((k) => <span key={k} className="chip">{k}</span>)}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[...vault].sort((a, b) => b.perf - a.perf).map((v) => {
          const Icon = kindIcon[v.kind];
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

      <Card className="mt-4 border-brand/30 bg-gradient-to-br from-brand/10 to-transparent">
        <p className="text-sm text-ink-muted"><span className="text-ink">Performance-weighted retrieval:</span> every agent pulls from the Vault, favoring artifacts that historically performed — so your AI gets sharper the longer you use CreatorOS.</p>
      </Card>
    </div>
  );
}
