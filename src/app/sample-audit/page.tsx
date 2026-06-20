import Link from "next/link";
import type { Metadata } from "next";
import { sampleAudit } from "@/data/mockCreoraData";
import { Sparkles, ArrowRight, Check, X, Target, Calendar, FileText, Repeat, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Sample Creator Growth Audit — Creora",
  description: "Preview how Creora analyzes creator channels and generates content opportunities, scripts, and 30-day content plans.",
};

function Pill({ children, tone = "cream" }: { children: React.ReactNode; tone?: "lime" | "purple" | "cream" }) {
  return <span className={`creora-pill creora-pill-${tone}`}>{children}</span>;
}

export default function SampleAuditPage() {
  const a = sampleAudit;
  return (
    <div className="creora-root min-h-screen">
      <header className="mx-auto flex max-w-5xl items-center px-5 py-4">
        <Link href="/" className="creora-display text-xl text-[#3B1722]">Creora</Link>
        <Link href="/audit" className="creora-btn creora-btn-blue ml-auto !py-2.5 !px-4 text-sm">Get Free Audit</Link>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-8">
        <Pill tone="lime"><Sparkles size={13} /> Sample audit · demo data</Pill>
        <h1 className="creora-display mt-4 text-[clamp(32px,5vw,52px)] text-[#3B1722]">Sample Creator Growth Audit</h1>
        <p className="mt-3 max-w-2xl text-[#7A6B6B]">See how Creora turns channel data, competitor patterns, and trends into clear content opportunities. This is a sample for an {a.creator.toLowerCase()} — not a real customer result.</p>

        {/* summary */}
        <div className="creora-card mt-7 flex flex-col items-center gap-6 p-8 md:flex-row md:p-10">
          <div className="grid h-36 w-36 shrink-0 place-items-center rounded-full" style={{ background: "#3B1722" }}>
            <div className="text-center"><div className="creora-display text-5xl text-[#B9FF1D]">{a.score}</div><div className="text-xs text-[#CDBDB6]">/ 100</div></div>
          </div>
          <div>
            <div className="flex items-center gap-2"><TrendingUp size={18} className="text-[#2463EB]" /><span className="creora-display text-2xl text-[#3B1722]">Growth Score</span></div>
            <div className="mt-2 text-[15px] text-[#3B1722]"><span className="font-semibold">Main opportunity:</span> {a.opportunity}</div>
            <p className="mt-2 text-[#7A6B6B]">{a.summary}</p>
          </div>
        </div>

        {/* working / not working */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="creora-card p-6">
            <div className="flex items-center gap-2 font-semibold text-[#3B1722]"><Check size={18} className="text-[#2463EB]" /> What's working</div>
            <ul className="mt-3 space-y-2 text-[15px] text-[#3B1722]">{a.working.map((w) => <li key={w} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[#2463EB]" /> {w}</li>)}</ul>
          </div>
          <div className="creora-card p-6">
            <div className="flex items-center gap-2 font-semibold text-[#3B1722]"><X size={18} className="text-[#7A6B6B]" /> What's not working</div>
            <ul className="mt-3 space-y-2 text-[15px] text-[#3B1722]">{a.notWorking.map((w) => <li key={w} className="flex gap-2"><X size={16} className="mt-0.5 shrink-0 text-[#7A6B6B]" /> {w}</li>)}</ul>
          </div>
        </div>

        {/* opportunities */}
        <h2 className="creora-display mt-10 text-[clamp(22px,4vw,34px)] text-[#3B1722]">Top opportunities</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {a.opportunities.map((o) => (
            <div key={o.topic} className="creora-card p-5">
              <div className="font-semibold text-[#3B1722]">{o.topic}</div>
              <div className="mt-3 flex items-center justify-between text-sm"><span className="text-[#7A6B6B]">Trend</span><Pill tone="lime">{o.trend}</Pill></div>
              <div className="mt-1.5 flex items-center justify-between text-sm"><span className="text-[#7A6B6B]">Saturation</span><Pill tone="cream">{o.saturation}</Pill></div>
              <div className="mt-3 text-[13px] text-[#7A6B6B]">{o.format}</div>
            </div>
          ))}
        </div>

        {/* 10 ideas */}
        <h2 className="creora-display mt-10 text-[clamp(22px,4vw,34px)] text-[#3B1722]"><Target size={24} className="mb-1 mr-1 inline text-[#2463EB]" /> Your next 10 video ideas</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {a.ideas.map((idea, i) => (
            <div key={i} className="creora-card p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="text-sm font-semibold leading-snug text-[#3B1722]">{idea.title}</span>
                <span className="creora-pill creora-pill-lime shrink-0">Viral {idea.viralScore}</span>
              </div>
              <p className="mt-2 text-[13px] text-[#7A6B6B]">{idea.why}</p>
              <div className="mt-3 rounded-[14px] p-2.5 text-[13px] text-[#3B1722]" style={{ background: "#DDD0C9" }}><span className="font-semibold">Hook:</span> {idea.hook}</div>
              <div className="mt-2 text-[12px] text-[#7A6B6B]"><span className="font-semibold text-[#3B1722]">Thumbnail:</span> {idea.thumbnail}</div>
              <div className="mt-2"><Pill tone="purple">Repurpose: {idea.repurpose}</Pill></div>
            </div>
          ))}
        </div>

        {/* 30 day plan */}
        <h2 className="creora-display mt-10 text-[clamp(22px,4vw,34px)] text-[#3B1722]"><Calendar size={24} className="mb-1 mr-1 inline text-[#2463EB]" /> 30-day content plan</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {a.plan.map((p) => (
            <div key={p.week} className="creora-card p-5">
              <div className="text-sm font-semibold text-[#2463EB]">{p.week}</div>
              <div className="mt-2 font-semibold text-[#3B1722]">{p.focus}</div>
              <div className="mt-1 text-[13px] text-[#7A6B6B]">{p.note}</div>
            </div>
          ))}
        </div>

        {/* script preview */}
        <h2 className="creora-display mt-10 text-[clamp(22px,4vw,34px)] text-[#3B1722]"><FileText size={24} className="mb-1 mr-1 inline text-[#2463EB]" /> Script preview</h2>
        <div className="creora-card mt-5 p-6 md:p-8">
          <div className="font-semibold text-[#3B1722]">{a.scriptPreview.title}</div>
          <div className="mt-3 rounded-[16px] p-4 text-[15px] text-[#3B1722]" style={{ background: "#DDD0C9" }}><span className="font-semibold">Opening hook:</span> {a.scriptPreview.hook}</div>
          <ul className="mt-4 space-y-1.5 text-[14px] text-[#3B1722]">{a.scriptPreview.structure.map((s) => <li key={s} className="flex gap-2"><span className="text-[#2463EB]">→</span> {s}</li>)}</ul>
        </div>

        {/* repurpose preview */}
        <h2 className="creora-display mt-10 text-[clamp(22px,4vw,34px)] text-[#3B1722]"><Repeat size={24} className="mb-1 mr-1 inline text-[#2463EB]" /> Repurpose preview</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {a.repurpose.map((r) => (
            <div key={r.kind} className="creora-card p-5">
              <div className="text-xs font-semibold uppercase tracking-wide text-[#2463EB]">{r.kind}</div>
              <div className="mt-2 text-[14px] text-[#3B1722]">{r.text}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="creora-card mt-10 p-8 text-center md:p-12" style={{ background: "linear-gradient(135deg, #2463EB, #1d3fb0)" }}>
          <h2 className="creora-display text-[clamp(26px,4vw,42px)] text-white">Want this for your channel?</h2>
          <p className="mx-auto mt-3 max-w-lg text-white/85">Run your own free audit and get a growth score, opportunities, and 10 ready-to-make ideas.</p>
          <Link href="/audit" className="creora-btn mt-7 bg-[#B9FF1D] text-[#2a2208] hover:bg-[#a9ee10]">Get Free Channel Audit <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
