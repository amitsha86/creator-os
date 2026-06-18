import { Card, Badge, PageHeader } from "@/components/ui/primitives";
import { Image as ImageIcon, Zap } from "lucide-react";

const variants = [
  { id: "A", ctr: 10.1, label: "Face + “$187” big number", contrast: 92, faces: 1, hue: "#6366f1", best: true },
  { id: "B", ctr: 8.7, label: "Product hero, clean", contrast: 78, faces: 0, hue: "#0ea5e9", best: false },
  { id: "C", ctr: 9.2, label: "Before / after split", contrast: 85, faces: 1, hue: "#10b981", best: false },
  { id: "D", ctr: 6.4, label: "Text-heavy, low contrast", contrast: 54, faces: 0, hue: "#f59e0b", best: false },
];

export default function ThumbnailsPage() {
  return (
    <div>
      <PageHeader icon={<ImageIcon size={18} />} title="Thumbnail Intelligence" subtitle="Generate, analyze, and A/B test thumbnails with predicted CTR — before you publish."
        actions={<button className="btn-primary">+ Generate</button>} />

      <Card className="mb-4 border-brand/30 bg-gradient-to-br from-brand/10 to-transparent">
        <div className="text-sm font-medium text-ink">Generate from a prompt</div>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <input className="input flex-1" defaultValue="Budget studio, surprised face, bold $187 text, high contrast" />
          <button className="btn-primary sm:w-40"><Zap size={15} /> Generate 4</button>
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {variants.map((v) => (
          <Card key={v.id} className={`!p-3 ${v.best ? "ring-1 ring-mint/40" : ""}`}>
            <div className="relative aspect-video overflow-hidden rounded-lg" style={{ background: `linear-gradient(135deg, ${v.hue}, #0a0b0f)` }}>
              <div className="absolute inset-0 grid place-items-center text-2xl font-black text-white/90">{v.id === "A" || v.id === "C" ? "$187" : "STUDIO"}</div>
              <span className="absolute left-2 top-2 rounded bg-black/50 px-1.5 py-0.5 text-xs text-white">Variant {v.id}</span>
              {v.best && <span className="absolute right-2 top-2 rounded bg-mint px-1.5 py-0.5 text-[10px] font-semibold text-black">BEST</span>}
            </div>
            <div className="mt-2.5 flex items-center justify-between">
              <span className="text-xs text-ink-muted">{v.label}</span>
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-xl font-semibold text-ink">{v.ctr}%</span>
              <span className="text-xs text-ink-faint">predicted CTR</span>
            </div>
            <div className="mt-2 space-y-1 text-xs text-ink-faint">
              <div className="flex justify-between"><span>Contrast</span><span className="text-ink-muted">{v.contrast}/100</span></div>
              <div className="flex justify-between"><span>Faces</span><span className="text-ink-muted">{v.faces}</span></div>
            </div>
            <div className="mt-2.5 flex gap-1.5">
              <button className="btn-ghost h-7 flex-1 px-2 text-xs">Edit</button>
              <button className="btn-subtle h-7 flex-1 px-2 text-xs">A/B</button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-4">
        <div className="text-sm font-medium text-ink">Analyzer notes (Variant A)</div>
        <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
          <li>· Strong focal clarity — single subject, rule-of-thirds face placement.</li>
          <li>· High contrast (92) reads well at mobile size. <Badge tone="mint">+0.9% vs niche avg</Badge></li>
          <li>· Suggestion: bump the “$187” 8% larger for sub-200px legibility.</li>
        </ul>
      </Card>
    </div>
  );
}
