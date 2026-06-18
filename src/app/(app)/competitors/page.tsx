import { competitors } from "@/lib/data";
import { Card, Badge, PageHeader } from "@/components/ui/primitives";
import { PlatformIcon } from "@/components/ui/platform";
import { compact } from "@/lib/utils";
import { Swords, TrendingUp, Lightbulb } from "lucide-react";

export default function CompetitorsPage() {
  return (
    <div>
      <PageHeader icon={<Swords size={18} />} title="Competitor Intelligence" subtitle="Track channels, decode why videos win, and find where rivals are exposed."
        actions={<button className="btn-primary">+ Track channel</button>} />

      <Card className="!p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-ink-faint">
              <th className="px-4 py-3 font-medium">Channel</th>
              <th className="px-4 py-3 font-medium">Subs</th>
              <th className="px-4 py-3 font-medium">Growth</th>
              <th className="px-4 py-3 font-medium">Cadence</th>
              <th className="px-4 py-3 font-medium">Top video</th>
              <th className="px-4 py-3 font-medium">Thumbnail style</th>
            </tr>
          </thead>
          <tbody>
            {[...competitors].sort((a, b) => b.growth - a.growth).map((c) => (
              <tr key={c.id} className="border-b border-line/60 last:border-0 hover:bg-bg-hover">
                <td className="px-4 py-3"><div className="flex items-center gap-2"><PlatformIcon platform={c.platform} size={15} /><span className="text-ink">{c.handle}</span></div></td>
                <td className="px-4 py-3 text-ink-muted">{compact(c.subs)}</td>
                <td className="px-4 py-3">{c.growth >= 10 ? <Badge tone="mint"><TrendingUp size={11} /> +{c.growth}%</Badge> : <span className="text-ink-muted">+{c.growth}%</span>}</td>
                <td className="px-4 py-3 text-ink-muted">{c.cadence}</td>
                <td className="px-4 py-3"><span className="text-ink">{c.topVideo}</span><span className="ml-2 text-xs text-ink-faint">{compact(c.topViews)}</span></td>
                <td className="px-4 py-3 text-ink-muted">{c.thumbStyle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <div className="flex items-center gap-2 text-sm font-medium text-ink"><Lightbulb size={15} className="text-amber" /> Why “Desk tour 2026” went viral</div>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li>· <span className="text-ink">Cold open hook (0–6s)</span> — reveals the end result first. Weight: 28%</li>
            <li>· <span className="text-ink">Clean product-hero thumbnail</span> with one focal object. Weight: 22%</li>
            <li>· <span className="text-ink">Pattern interrupt every ~40s</span> keeps retention above 55%. Weight: 19%</li>
            <li>· <span className="text-ink">Title specificity</span> (“2026”) signals freshness. Weight: 16%</li>
            <li>· <span className="text-ink">Posted Tue 9am</span> — channel's best slot. Weight: 15%</li>
          </ul>
        </Card>
        <Card>
          <div className="flex items-center gap-2 text-sm font-medium text-ink"><Swords size={15} className="text-rose" /> Untapped opportunities</div>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li>· <span className="text-ink">@gearghost is stalling</span> (+1.1%) on a 540k base — their “regret buying” format is tired.</li>
            <li>· <span className="text-ink">“Used gear” demand</span> is high but no tracked competitor serves it — open lane.</li>
            <li>· <span className="text-ink">@deskdaily owns 3/wk cadence</span> but thin scripting — outscript them on retention.</li>
          </ul>
          <button className="btn-ghost mt-3">Generate full report</button>
        </Card>
      </div>
    </div>
  );
}
