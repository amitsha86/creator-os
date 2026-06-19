import { content } from "@/lib/data";
import { Card, PageHeader } from "@/components/ui/primitives";
import { PlatformIcon } from "@/components/ui/platform";
import { RepurposePack } from "@/components/repurpose-pack";
import { Repeat, ArrowRight, Scissors } from "lucide-react";

export default function RepurposePage() {
  const source = content.find((c) => c.stage === "Analyze") ?? content[0];
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

        <RepurposePack source={source.title} />
      </div>
    </div>
  );
}
