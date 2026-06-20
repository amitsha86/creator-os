import Link from "next/link";
import type { Metadata } from "next";
import { demoDashboard } from "@/data/mockCreoraData";
import { Sparkles, ArrowRight, Target, Swords, Repeat, Flame, Rocket } from "lucide-react";

export const metadata: Metadata = {
  title: "Creora Demo Dashboard — AI Growth Copilot for Creators",
  description: "Explore a demo creator dashboard with growth score, viral opportunities, script ideas, competitor radar, and repurposing previews.",
};

function Pill({ children, tone = "cream" }: { children: React.ReactNode; tone?: "lime" | "purple" | "cream" }) {
  return <span className={`creora-pill creora-pill-${tone}`}>{children}</span>;
}

function Spark({ data }: { data: number[] }) {
  const max = Math.max(...data, 1);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${30 - (v / max) * 26}`).join(" ");
  return (
    <svg viewBox="0 0 100 30" className="mt-2 h-8 w-full" preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke="#2463EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const stageTone: Record<string, "lime" | "purple" | "cream"> = { "Script ready": "lime", Editing: "purple", "Thumbnail needed": "cream", Scheduled: "cream" };

export default function DemoPage() {
  const d = demoDashboard;
  return (
    <div className="creora-root min-h-screen">
      <header className="sticky top-0 z-40 backdrop-blur-md" style={{ background: "rgba(244,246,251,0.72)", borderBottom: "1px solid rgba(15,23,42,0.08)" }}>
        <div className="mx-auto flex max-w-6xl items-center px-5 py-3.5">
          <Link href="/" className="creora-display text-xl text-[#0F172A]">Creora</Link>
          <Pill tone="purple"><span className="ml-1">Demo · sample data</span></Pill>
          <Link href="/audit" className="creora-btn creora-btn-blue ml-auto !py-2.5 !px-4 text-sm">Get Free Audit</Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-8">
        <h1 className="creora-display text-[clamp(28px,4vw,44px)] text-[#0F172A]">Hello — here's what to create next.</h1>
        <p className="mt-2 text-[#64748B]">A live demo of the Creora command center. Explore the experience, then run your own free audit.</p>

        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          {/* Growth Score */}
          <div className="creora-card p-6" style={{ background: "#0F172A" }}>
            <div className="text-sm text-[#CBD5E1]">Creator Growth Score</div>
            <div className="creora-display mt-2 text-5xl text-[#BEF264]">{d.growth.score}<span className="text-xl text-[#CBD5E1]">/100</span></div>
            <div className="mt-2 text-sm text-[#E7EDF6]">{d.growth.trend}</div>
            <div className="mt-1 text-sm text-[#E7EDF6]">Main opportunity: <span className="text-[#FFFFFF]">{d.growth.opportunity}</span></div>
            <Link href="/sample-audit" className="creora-btn mt-4 w-full bg-[#BEF264] text-[#1A2E05] hover:bg-[#a3e635] !py-2.5 text-sm">View Full Audit</Link>
          </div>

          {/* Next Best Idea */}
          <div className="creora-card p-6 lg:col-span-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]"><Sparkles size={16} className="text-[#2463EB]" /> Next Best Idea</div>
            <div className="creora-display mt-2 text-2xl text-[#0F172A]">"{d.nextIdea.title}"</div>
            <div className="mt-3 flex flex-wrap gap-2"><Pill tone="lime">Viral {d.nextIdea.viralScore}</Pill><Pill tone="cream">Effort: {d.nextIdea.effort}</Pill><Pill tone="purple">{d.nextIdea.format}</Pill></div>
            <p className="mt-3 text-[14px] text-[#64748B]">{d.nextIdea.why}</p>
            <Link href="/audit" className="creora-btn creora-btn-blue mt-4 !py-2.5 text-sm">Generate Script <ArrowRight size={15} /></Link>
          </div>

          {/* Viral Opportunities */}
          <div className="creora-card p-6 lg:col-span-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]"><Flame size={16} className="text-[#2463EB]" /> Viral Opportunities</div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {d.opportunities.map((o) => (
                <div key={o.topic} className="rounded-[16px] p-3" style={{ background: "#E7EDF6" }}>
                  <div className="text-sm font-medium text-[#0F172A]">{o.topic}</div>
                  <div className="mt-1.5 flex gap-1.5"><Pill tone="lime">Trend {o.trend}</Pill><Pill tone="cream">{o.saturation}</Pill></div>
                </div>
              ))}
            </div>
          </div>

          {/* Competitor Radar */}
          <div className="creora-card p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]"><Swords size={16} className="text-[#2463EB]" /> Competitor Radar</div>
            <div className="creora-display mt-3 text-3xl text-[#0F172A]">{d.competitor.outperforming}</div>
            <div className="text-sm text-[#64748B]">competitor videos outperforming this week</div>
            <div className="mt-3 text-[13px] text-[#0F172A]"><span className="font-semibold">Pattern:</span> {d.competitor.pattern}</div>
            <div className="mt-1 text-[13px] text-[#64748B]">{d.competitor.response}</div>
          </div>

          {/* AI Growth Coach */}
          <div className="creora-card p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]"><Sparkles size={16} className="text-[#2463EB]" /> AI Growth Coach</div>
            <ul className="mt-3 space-y-2 text-[14px] text-[#0F172A]">
              {d.coach.map((c, i) => <li key={c} className="flex gap-2"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#BEF264] text-[11px] font-bold text-[#1A2E05]">{i + 1}</span> {c}</li>)}
            </ul>
          </div>

          {/* Pipeline */}
          <div className="creora-card p-6 lg:col-span-2">
            <div className="text-sm font-semibold text-[#0F172A]">Content Pipeline</div>
            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-[#64748B]">Ideas <span>→</span> Scripts <span>→</span> Editing <span>→</span> Scheduled <span>→</span> Published</div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {d.pipeline.map((p) => (
                <div key={p.title} className="flex items-center justify-between rounded-[16px] p-3" style={{ background: "#E7EDF6" }}>
                  <span className="text-sm text-[#0F172A]">{p.title}</span>
                  <Pill tone={stageTone[p.stage] ?? "cream"}>{p.stage}</Pill>
                </div>
              ))}
            </div>
          </div>

          {/* Repurpose */}
          <div className="creora-card p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]"><Repeat size={16} className="text-[#2463EB]" /> Repurpose Engine</div>
            <div className="mt-2 text-[13px] text-[#64748B]">One video becomes:</div>
            <div className="mt-2 flex flex-wrap gap-1.5">{d.repurpose.map((r) => <Pill key={r} tone="cream">{r}</Pill>)}</div>
          </div>

          {/* Weekly metrics */}
          <div className="creora-card p-6 lg:col-span-3">
            <div className="text-sm font-semibold text-[#0F172A]">Weekly Performance</div>
            <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {d.metrics.map((m) => (
                <div key={m.label} className="rounded-[16px] p-4" style={{ background: "#E7EDF6" }}>
                  <div className="text-xs text-[#64748B]">{m.label}</div>
                  <div className="creora-display text-2xl text-[#0F172A]">{m.value}</div>
                  <Spark data={m.spark} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="creora-card mt-8 flex flex-col items-center gap-4 p-8 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <div className="creora-display text-2xl text-[#0F172A]">Ready for your own dashboard?</div>
            <div className="text-[#64748B]">Run a free audit and get your real growth score and next ideas.</div>
          </div>
          <div className="flex gap-3">
            <Link href="/audit" className="creora-btn creora-btn-blue">Get Free Audit <ArrowRight size={16} /></Link>
            <Link href="/sample-audit" className="creora-btn creora-btn-cream">View Sample Audit</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
