"use client";
import { useState } from "react";
import Link from "next/link";
import { auditResult } from "@/data/mockCreoraData";
import { Sparkles, ArrowRight, Check, X, TrendingUp, Loader2, Target, Calendar } from "lucide-react";

type Stage = "form" | "loading" | "result";

function Pill({ children, tone = "cream" }: { children: React.ReactNode; tone?: "lime" | "purple" | "cream" }) {
  return <span className={`creora-pill creora-pill-${tone}`}>{children}</span>;
}

export default function AuditPage() {
  const [stage, setStage] = useState<Stage>("form");
  const [url, setUrl] = useState("");

  function run(e: React.FormEvent) {
    e.preventDefault();
    setStage("loading");
    setTimeout(() => setStage("result"), 1900);
  }

  return (
    <div className="creora-root min-h-screen">
      {/* nav */}
      <header className="mx-auto flex max-w-5xl items-center px-5 py-4">
        <Link href="/" className="creora-display text-xl text-[#3B1722]">Creora</Link>
        <Link href="/sign-in" className="ml-auto text-sm font-medium text-[#3B1722] hover:opacity-70">Login</Link>
      </header>

      {stage === "form" && (
        <section className="mx-auto max-w-2xl px-5 py-12 text-center">
          <Pill tone="lime"><Sparkles size={13} /> Free Creator Growth Audit</Pill>
          <h1 className="creora-display mt-5 text-[clamp(34px,6vw,56px)] text-[#3B1722]">Discover your next best video.</h1>
          <p className="mx-auto mt-4 max-w-lg text-[#7A6B6B]">Drop your channel and Creora scores your growth, finds your opportunities, and hands you 10 ready-to-make ideas.</p>

          <form onSubmit={run} className="creora-card mt-9 space-y-4 p-6 text-left md:p-8">
            <Field label="YouTube channel URL">
              <input required value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://youtube.com/@yourchannel" className="creora-input" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Niche">
                <input placeholder="e.g. AI & productivity" className="creora-input" />
              </Field>
              <Field label="Primary goal">
                <select className="creora-input">
                  <option>Grow subscribers</option>
                  <option>More views</option>
                  <option>Monetize / sponsors</option>
                  <option>Build authority</option>
                </select>
              </Field>
            </div>
            <Field label="Competitors (optional)">
              <input placeholder="@competitor1, @competitor2" className="creora-input" />
            </Field>
            <button type="submit" className="creora-btn creora-btn-blue w-full">Generate My Free Audit <ArrowRight size={16} /></button>
            <p className="text-center text-xs text-[#7A6B6B]">No card required · We never post without your permission.</p>
          </form>
        </section>
      )}

      {stage === "loading" && (
        <section className="mx-auto grid max-w-2xl place-items-center px-5 py-32 text-center">
          <Loader2 size={40} className="animate-spin text-[#2463EB]" />
          <div className="creora-display mt-6 text-2xl text-[#3B1722]">Analyzing your channel…</div>
          <div className="mt-2 space-y-1 text-sm text-[#7A6B6B]">
            <div>Scoring growth signals</div>
            <div>Finding viral opportunities</div>
            <div>Generating your 30-day content plan</div>
          </div>
        </section>
      )}

      {stage === "result" && <AuditReport />}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-[#7A6B6B]">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function AuditReport() {
  const a = auditResult;
  return (
    <section className="mx-auto max-w-5xl px-5 py-10">
      <div className="flex items-center gap-2"><Pill tone="lime"><Sparkles size={13} /> Your audit is ready</Pill></div>

      {/* Score */}
      <div className="creora-card mt-5 flex flex-col items-center gap-6 p-8 md:flex-row md:p-10">
        <div className="grid h-36 w-36 shrink-0 place-items-center rounded-full" style={{ background: "#3B1722" }}>
          <div className="text-center">
            <div className="creora-display text-5xl text-[#B9FF1D]">{a.score}</div>
            <div className="text-xs text-[#CDBDB6]">/ 100</div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2"><TrendingUp size={18} className="text-[#2463EB]" /><span className="creora-display text-2xl text-[#3B1722]">Your channel is {a.trend}.</span></div>
          <p className="mt-2 text-[#7A6B6B]">Here's exactly what's working, what's holding you back, and the 10 videos to make next.</p>
        </div>
      </div>

      {/* Working / Not working */}
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="creora-card p-6">
          <div className="flex items-center gap-2 font-semibold text-[#3B1722]"><Check size={18} className="text-[#2463EB]" /> What's working</div>
          <ul className="mt-3 space-y-2 text-[15px] text-[#3B1722]">
            {a.working.map((w) => <li key={w} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[#2463EB]" /> {w}</li>)}
          </ul>
        </div>
        <div className="creora-card p-6">
          <div className="flex items-center gap-2 font-semibold text-[#3B1722]"><X size={18} className="text-[#7A6B6B]" /> What's holding you back</div>
          <ul className="mt-3 space-y-2 text-[15px] text-[#3B1722]">
            {a.notWorking.map((w) => <li key={w} className="flex gap-2"><X size={16} className="mt-0.5 shrink-0 text-[#7A6B6B]" /> {w}</li>)}
          </ul>
        </div>
      </div>

      {/* Opportunities */}
      <div className="creora-card mt-5 p-6">
        <div className="flex items-center gap-2 font-semibold text-[#3B1722]"><Target size={18} className="text-[#2463EB]" /> Top opportunities</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {a.opportunities.map((o) => <span key={o} className="creora-pill creora-pill-lime">{o}</span>)}
        </div>
      </div>

      {/* 10 ideas */}
      <h2 className="creora-display mt-10 text-[clamp(24px,4vw,36px)] text-[#3B1722]">Your next 10 videos.</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {a.ideas.map((idea, i) => (
          <div key={i} className="creora-card p-5">
            <div className="flex items-start justify-between gap-3">
              <span className="text-sm font-semibold leading-snug text-[#3B1722]">{idea.title}</span>
              <span className="creora-pill creora-pill-lime shrink-0">Viral {idea.viralScore}</span>
            </div>
            <p className="mt-2 text-[13px] text-[#7A6B6B]">{idea.why}</p>
            <div className="mt-3 rounded-[14px] p-2.5 text-[13px] text-[#3B1722]" style={{ background: "#DDD0C9" }}><span className="font-semibold">Hook:</span> {idea.hook}</div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Pill tone="cream">{idea.format}</Pill>
              <Pill tone="purple">{idea.repurpose}</Pill>
            </div>
          </div>
        ))}
      </div>

      {/* 30-day plan */}
      <h2 className="creora-display mt-10 text-[clamp(24px,4vw,36px)] text-[#3B1722]">Your 30-day plan.</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {a.plan.map((p) => (
          <div key={p.week} className="creora-card p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#2463EB]"><Calendar size={15} /> {p.week}</div>
            <div className="mt-2 font-semibold text-[#3B1722]">{p.focus}</div>
            <div className="mt-1 text-[13px] text-[#7A6B6B]">{p.note}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="creora-card mt-10 p-8 text-center md:p-12" style={{ background: "linear-gradient(135deg, #2463EB, #1d3fb0)" }}>
        <h2 className="creora-display text-[clamp(26px,4vw,42px)] text-white">Turn this audit into published videos.</h2>
        <p className="mx-auto mt-3 max-w-lg text-white/85">Create a free account to generate scripts, repurpose content, and track your growth.</p>
        <Link href="/sign-up" className="creora-btn mt-7 bg-[#B9FF1D] text-[#2a2208] hover:bg-[#a9ee10]">Create Free Account <ArrowRight size={16} /></Link>
      </div>
    </section>
  );
}
