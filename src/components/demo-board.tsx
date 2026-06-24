"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { demoDashboard, sampleAudit } from "@/data/mockCreoraData";
import { trackEvent } from "@/lib/analytics";
import { ScoreExplainer } from "@/components/score-explainer";
import { Sparkles, ArrowRight, Swords, Repeat, Flame, X, PenLine, Film } from "lucide-react";

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

type Modal = "script" | "repurpose" | null;

export function DemoBoard() {
  const d = demoDashboard;
  const [modal, setModal] = useState<Modal>(null);

  useEffect(() => {
    trackEvent("demo_viewed", { route: "/demo" });
  }, []);

  useEffect(() => {
    if (modal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

  function openScript() {
    trackEvent("demo_generate_script_clicked");
    setModal("script");
    trackEvent("demo_script_preview_opened");
  }
  function openRepurpose() {
    trackEvent("demo_repurpose_clicked");
    setModal("repurpose");
    trackEvent("demo_repurpose_preview_opened");
  }

  return (
    <div className="creora-root min-h-screen">
      <header className="sticky top-0 z-40 backdrop-blur-md" style={{ background: "rgba(244,246,251,0.72)", borderBottom: "1px solid rgba(15,23,42,0.08)" }}>
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-3.5">
          <Link href="/" className="creora-display text-xl text-[#0F172A]">Creora</Link>
          <Pill tone="purple"><Sparkles size={12} /> Demo · sample data</Pill>
          <Link href="/audit" onClick={() => trackEvent("demo_get_audit_clicked", { location: "nav" })} className="creora-btn creora-btn-blue ml-auto !py-2.5 !px-4 text-sm">Get Free Channel Audit</Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-8">
        <h1 className="creora-display text-[clamp(28px,4vw,44px)] text-[#0F172A]">Try the Creora Demo Dashboard</h1>
        <p className="mt-2 max-w-2xl text-[#64748B]">Explore how Creora helps a creator decide what to make next, generate scripts, repurpose content, and track growth.</p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-pill px-3 py-1.5 text-[13px]" style={{ background: "#E7EDF6", color: "#475569" }}>
          <Sparkles size={13} className="text-[#2463EB]" /> Demo data — explore how Creora works before connecting your channel.
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          {/* Growth Score */}
          <div className="creora-card p-6" style={{ background: "#0F172A" }}>
            <div className="flex items-center gap-1.5 text-sm text-[#CBD5E1]">Creator Growth Score <span className="text-[#CBD5E1]"><ScoreExplainer type="growth" /></span></div>
            <div className="creora-display mt-2 text-5xl text-[#BEF264]">{d.growth.score}<span className="text-xl text-[#CBD5E1]">/100</span></div>
            <div className="mt-2 text-sm text-[#E7EDF6]">{d.growth.trend}</div>
            <div className="mt-1 text-sm text-[#E7EDF6]">Main opportunity: <span className="text-[#FFFFFF]">{d.growth.opportunity}</span></div>
            <Link href="/sample-audit" className="creora-btn mt-4 w-full bg-[#BEF264] text-[#1A2E05] hover:bg-[#a3e635] !py-2.5 text-sm">View Sample Audit</Link>
          </div>

          {/* Next Best Idea */}
          <div className="creora-card p-6 lg:col-span-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]"><Sparkles size={16} className="text-[#2463EB]" /> Next Best Idea</div>
            <div className="creora-display mt-2 text-2xl text-[#0F172A]">&ldquo;{d.nextIdea.title}&rdquo;</div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1"><Pill tone="lime">Viral {d.nextIdea.viralScore}</Pill><ScoreExplainer type="viral" /></span>
              <Pill tone="cream">Effort: {d.nextIdea.effort}</Pill>
              <Pill tone="purple">{d.nextIdea.format}</Pill>
            </div>
            <p className="mt-3 text-[14px] text-[#64748B]">{d.nextIdea.why}</p>
            <button onClick={openScript} className="creora-btn creora-btn-blue mt-4 !py-2.5 text-sm">Generate Script <ArrowRight size={15} /></button>
          </div>

          {/* Viral Opportunities */}
          <div className="creora-card p-6 lg:col-span-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]"><Flame size={16} className="text-[#2463EB]" /> Viral Opportunities</div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {d.opportunities.map((o) => (
                <div key={o.topic} className="rounded-[16px] p-3" style={{ background: "#E7EDF6" }}>
                  <div className="text-sm font-medium text-[#0F172A]">{o.topic}</div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    <span className="inline-flex items-center gap-1"><Pill tone="lime">Trend {o.trend}</Pill><ScoreExplainer type="trend" /></span>
                    <span className="inline-flex items-center gap-1"><Pill tone="cream">{o.saturation}</Pill><ScoreExplainer type="saturation" /></span>
                  </div>
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
            <div className="mt-2 text-[11px] text-[#94A3B8]">Demo data — not a live competitor fetch.</div>
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
          <div className="creora-card flex flex-col p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#0F172A]"><Repeat size={16} className="text-[#2463EB]" /> Repurpose Engine</div>
            <div className="mt-2 text-[13px] text-[#64748B]">Turn one video into 20+ platform-ready assets.</div>
            <div className="mt-2 flex flex-wrap gap-1.5">{d.repurpose.map((r) => <Pill key={r} tone="cream">{r}</Pill>)}</div>
            <button onClick={openRepurpose} className="creora-btn creora-btn-cream mt-4 !py-2.5 text-sm">View Repurpose Preview <ArrowRight size={15} /></button>
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
            <Link href="/audit" onClick={() => trackEvent("demo_get_audit_clicked", { location: "footer" })} className="creora-btn creora-btn-blue">Get Free Channel Audit <ArrowRight size={16} /></Link>
            <Link href="/sample-audit" className="creora-btn creora-btn-cream">View Sample Audit</Link>
          </div>
        </div>
      </section>

      {/* Sticky CTA (mobile) */}
      <div className="sticky bottom-0 z-30 border-t bg-[rgba(244,246,251,0.92)] px-5 py-3 backdrop-blur-md md:hidden" style={{ borderColor: "rgba(15,23,42,0.08)" }}>
        <Link href="/audit" onClick={() => trackEvent("demo_get_audit_clicked", { location: "sticky" })} className="creora-btn creora-btn-blue w-full">Get Free Channel Audit <ArrowRight size={16} /></Link>
      </div>

      {modal && (
        <Modal onClose={() => setModal(null)}>
          {modal === "script" ? <ScriptPreview /> : <RepurposePreview />}
        </Modal>
      )}
    </div>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4" style={{ background: "rgba(15,23,42,0.45)" }} onClick={onClose}>
      <div className="creora-card relative max-h-[85vh] w-full max-w-lg overflow-y-auto p-6 md:p-8" onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-[#64748B] hover:bg-[#E7EDF6] hover:text-[#0F172A]"><X size={18} /></button>
      </div>
    </div>
  );
}

function ScriptPreview() {
  const s = sampleAudit.scriptPreview;
  return (
    <div className="relative">
      <div className="inline-flex"><Pill tone="lime"><PenLine size={12} /> Script preview · demo</Pill></div>
      <h2 className="creora-display mt-3 text-2xl text-[#0F172A]">{s.title}</h2>
      <div className="mt-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">Opening hook</div>
        <div className="mt-1.5 rounded-[14px] p-3.5 text-[14px] leading-relaxed text-[#0F172A]" style={{ background: "#E7EDF6" }}>{s.hook}</div>
      </div>
      <div className="mt-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">Structure</div>
        <ul className="mt-2 space-y-1.5 text-[14px] text-[#0F172A]">
          {s.structure.map((line, i) => <li key={line} className="flex gap-2"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#E7EDF6] text-[11px] font-bold text-[#0F172A]">{i + 1}</span> {line}</li>)}
        </ul>
      </div>
      <Link href="/audit" className="creora-btn creora-btn-blue mt-6 w-full">Get Free Channel Audit <ArrowRight size={16} /></Link>
    </div>
  );
}

function RepurposePreview() {
  return (
    <div className="relative">
      <div className="inline-flex"><Pill tone="purple"><Repeat size={12} /> Repurpose preview · demo</Pill></div>
      <h2 className="creora-display mt-3 text-2xl text-[#0F172A]">Turn one video into 20+ platform-ready assets.</h2>
      <div className="mt-4 space-y-2.5">
        {sampleAudit.repurpose.map((r) => (
          <div key={r.kind} className="rounded-[14px] p-3.5" style={{ background: "#E7EDF6" }}>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#64748B]"><Film size={12} /> {r.kind}</div>
            <div className="mt-1 text-[14px] leading-relaxed text-[#0F172A]">{r.text}</div>
          </div>
        ))}
      </div>
      <Link href="/audit" className="creora-btn creora-btn-blue mt-6 w-full">Get Free Channel Audit <ArrowRight size={16} /></Link>
    </div>
  );
}
