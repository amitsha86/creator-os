import { opportunities } from "@/lib/data";
import { Card, Badge, Spark, PageHeader } from "@/components/ui/primitives";
import { Flame } from "lucide-react";
import { ViralAsk } from "./viral-ask";

const momentumTone: Record<string, any> = { Emerging: "mint", Rising: "sky", Peaking: "amber", Declining: "rose" };

export default function ViralPage() {
  return (
    <div>
      <PageHeader icon={<Flame size={18} />} title="Viral Intelligence" subtitle="Ranked opportunities for your niche — what to make next, before the trend peaks." />
      <ViralAsk />

      <div className="mt-5 mb-2 flex items-center gap-2 text-xs text-ink-faint">
        <span>Filters:</span>
        <span className="chip">Niche: maker</span>
        <span className="chip">Saturation &lt; 40</span>
        <span className="chip">Momentum ↑</span>
        <span className="ml-auto">Sorted by Opportunity Score</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {[...opportunities].sort((a, b) => b.opportunity - a.opportunity).map((o) => (
          <Card key={o.id} className="card-hover">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-medium leading-snug text-ink">{o.title}</h3>
              <Badge tone={momentumTone[o.momentum]}>{o.momentum}</Badge>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[["Viral", o.viral], ["Opportunity", o.opportunity], ["Saturation", o.saturation]].map(([k, v]) => (
                <div key={k as string} className="rounded-lg border border-line bg-bg-soft px-2 py-1.5 text-center">
                  <div className="text-lg font-semibold text-ink">{v as number}</div>
                  <div className="text-[10px] uppercase tracking-wide text-ink-faint">{k as string}</div>
                </div>
              ))}
            </div>
            <div className="mt-3"><Spark data={o.spark} color="#6366f1" /></div>
            <p className="mt-2 text-sm text-ink-muted"><span className="text-ink-faint">Why now:</span> {o.why}</p>
            <div className="mt-3 flex items-center gap-2">
              <button className="btn-primary">Turn into idea</button>
              <button className="btn-ghost">Draft script</button>
              <span className="ml-auto text-xs text-ink-faint">{o.format}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
