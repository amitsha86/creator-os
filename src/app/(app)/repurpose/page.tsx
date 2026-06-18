import { repurposeTargets, content } from "@/lib/data";
import { Card, Badge, PageHeader } from "@/components/ui/primitives";
import { PlatformIcon } from "@/components/ui/platform";
import { Repeat, ArrowRight, Scissors } from "lucide-react";

export default function RepurposePage() {
  const source = content.find((c) => c.stage === "Analyze") ?? content[0];
  const totalOut = repurposeTargets.reduce((a, t) => a + t.count, 0);
  return (
    <div>
      <PageHeader icon={<Repeat size={18} />} title="AI Repurposing Engine" subtitle="Turn one long-form video into a week of platform-native content — automatically." />

      <div className="grid items-center gap-4 lg:grid-cols-[1fr_auto_1.4fr]">
        <Card>
          <div className="label">Source</div>
          <div className="mt-2 aspect-video rounded-lg bg-gradient-to-br from-brand/30 to-bg-soft" />
          <div className="mt-3 flex items-center gap-2">
            <PlatformIcon platform={source.platform} size={15} />
            <span className="text-sm text-ink">{source.title}</span>
          </div>
          <div className="mt-3 rounded-lg border border-line bg-bg-soft p-2.5 text-xs text-ink-muted">
            <div className="flex items-center gap-1.5 text-ink"><Scissors size={12} /> 5 high-retention moments detected</div>
            <div className="mt-1">Best clip: 2:14–2:41 (quotable payoff)</div>
          </div>
        </Card>

        <div className="hidden lg:block"><ArrowRight size={20} className="text-ink-faint" /></div>

        <Card>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-ink">{totalOut} pieces ready to schedule</span>
            <button className="btn-primary h-8 px-3 text-xs">Generate pack</button>
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
          <p className="mt-3 text-xs text-ink-faint">Outputs land in your Calendar as schedulable drafts with captions, reframing, and hooks.</p>
        </Card>
      </div>
    </div>
  );
}
