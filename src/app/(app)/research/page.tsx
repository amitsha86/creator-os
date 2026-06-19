import { getResearch } from "@/lib/store";
import { Card, Badge, PageHeader } from "@/components/ui/primitives";
import { ResearchAsk } from "@/components/research-ask";
import { BookOpen, FileText, Video, StickyNote, Hash } from "lucide-react";

const kindIcon: Record<string, any> = { Article: FileText, Video: Video, Note: StickyNote, Thread: Hash };

export const dynamic = "force-dynamic";

export default async function ResearchPage() {
  const research = await getResearch();
  const collections = Array.from(new Set(research.map((r) => r.collection)));
  return (
    <div>
      <PageHeader icon={<BookOpen size={18} />} title="AI Research Workspace" subtitle="Save anything, organize into collections, and ask questions across it — Perplexity meets Notion."
        actions={<button className="btn-primary">+ Save research</button>} />

      <div className="grid gap-4 lg:grid-cols-[200px_1fr]">
        <Card className="h-fit">
          <div className="label mb-2">Collections</div>
          <div className="space-y-1 text-sm">
            <div className="rounded-lg bg-bg-elevated px-2.5 py-1.5 text-ink">All ({research.length})</div>
            {collections.map((col) => (
              <div key={col} className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-ink-muted hover:bg-bg-hover">
                <span>{col}</span>
                <span className="text-xs text-ink-faint">{research.filter((r) => r.collection === col).length}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-3">
          <ResearchAsk />

          {research.map((r) => {
            const Icon = kindIcon[r.kind];
            return (
              <Card key={r.id} className="card-hover">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-bg-elevated text-ink-muted"><Icon size={15} /></div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-ink">{r.title}</h3>
                      <Badge>{r.kind}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-ink-muted">{r.summary}</p>
                    <div className="mt-1.5 text-xs text-ink-faint">{r.source} · {r.collection}</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
