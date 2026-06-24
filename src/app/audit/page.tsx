"use client";
import { useState } from "react";
import Link from "next/link";
import type { AuditResult } from "@/lib/audit";
import { Sparkles, ArrowRight, Check, X, TrendingUp, Loader2, Target, Calendar, Lock, Lightbulb, Repeat, PenLine, Film } from "lucide-react";

type Stage = "form" | "loading" | "result";

function Pill({ children, tone = "cream" }: { children: React.ReactNode; tone?: "lime" | "purple" | "cream" }) {
  return <span className={`creora-pill creora-pill-${tone}`}>{children}</span>;
}

function fmt(n: number | null): string {
  if (n === null) return "hidden";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

const previewCards = [
  { Icon: TrendingUp, title: "Your Growth Score", desc: "A 0–100 score with exactly what's working and what's holding you back." },
  { Icon: Lightbulb, title: "Your next best video", desc: "The exact title, hook, and thumbnail to make next — tailored to your channel." },
  { Icon: Calendar, title: "30-day content plan", desc: "A week-by-week plan so you always know what to publish next." },
  { Icon: Repeat, title: "Repurpose angles", desc: "Turn each idea into Shorts, posts, threads, and a newsletter." },
];

export default function AuditPage() {
  const [stage, setStage] = useState<Stage>("form");
  const [url, setUrl] = useState("");
  const [niche, setNiche] = useState("");
  const [goal, setGoal] = useState("Grow subscribers");
  const [competitors, setCompetitors] = useState("");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setStage("loading");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url, niche, goal, competitors }),
      });
      if (res.status === 429) {
        const data = await res.json().catch(() => ({}));
        const mins = Math.max(1, Math.ceil((data?.retryAfter ?? 600) / 60));
        setErrorMsg(`You've run a few audits already. Try again in about ${mins} minute${mins === 1 ? "" : "s"}.`);
        return;
      }
      if (!res.ok) throw new Error("audit failed");
      const data: AuditResult = await res.json();
      setResult(data);
    } catch {
      setErrorMsg("We couldn't reach the audit engine. Give it another try.");
    } finally {
      setStage("result");
    }
  }

  return (
    <div className="creora-root min-h-screen">
      {/* nav */}
      <header className="mx-auto flex max-w-5xl items-center px-5 py-4">
        <Link href="/" className="creora-display text-xl text-[#0F172A]">Creora</Link>
        <Link href="/sign-in" className="ml-auto text-sm font-medium text-[#0F172A] hover:opacity-70">Login</Link>
      </header>

      {stage === "form" && (
        <section className="mx-auto max-w-2xl px-5 py-12 text-center">
          <Pill tone="lime"><Sparkles size={13} /> Free Creator Growth Audit</Pill>
          <h1 className="creora-display mt-5 text-[clamp(34px,6vw,56px)] text-[#0F172A]">Discover your next best video.</h1>
          <p className="mx-auto mt-4 max-w-lg text-[#64748B]">Drop your channel and Creora scores your growth, finds the one opportunity you should own, and writes your next video — title, hook, thumbnail, and repurpose plan.</p>

          <form onSubmit={run} className="creora-card mt-9 space-y-4 p-6 text-left md:p-8">
            <Field label="YouTube channel URL">
              <input required value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://youtube.com/@yourchannel" className="creora-input" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Niche">
                <input value={niche} onChange={(e) => setNiche(e.target.value)} placeholder="e.g. AI & productivity" className="creora-input" />
              </Field>
              <Field label="Primary goal">
                <select value={goal} onChange={(e) => setGoal(e.target.value)} className="creora-input">
                  <option>Grow subscribers</option>
                  <option>More views</option>
                  <option>Monetize / sponsors</option>
                  <option>Build authority</option>
                </select>
              </Field>
            </div>
            <Field label="Competitors (optional)">
              <input value={competitors} onChange={(e) => setCompetitors(e.target.value)} placeholder="@competitor1, @competitor2" className="creora-input" />
            </Field>
            <button type="submit" className="creora-btn creora-btn-blue w-full">Generate My Free Audit <ArrowRight size={16} /></button>
            <p className="text-center text-xs text-[#64748B]">No card required · We never post without your permission.</p>
          </form>

          {/* What you'll get */}
          <div className="mt-12 text-left">
            <div className="text-center text-xs font-semibold uppercase tracking-wide text-[#64748B]">What you&apos;ll get</div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {previewCards.map(({ Icon, title, desc }) => (
                <div key={title} className="creora-card creora-card-tight flex gap-3 p-5">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full" style={{ background: "#BEF264" }}><Icon size={17} className="text-[#1A2E05]" /></div>
                  <div>
                    <div className="font-semibold text-[#0F172A]">{title}</div>
                    <div className="mt-0.5 text-[13px] text-[#64748B]">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {stage === "loading" && (
        <section className="mx-auto grid max-w-2xl place-items-center px-5 py-32 text-center">
          <Loader2 size={40} className="animate-spin text-[#2463EB]" />
          <div className="creora-display mt-6 text-2xl text-[#0F172A]">Analyzing your channel…</div>
          <div className="mt-2 space-y-1 text-sm text-[#64748B]">
            <div>Reading your recent uploads</div>
            <div>Finding the lane you should own</div>
            <div>Writing your next best video</div>
          </div>
        </section>
      )}

      {stage === "result" && result && <AuditReport a={result} />}
      {stage === "result" && !result && (
        <section className="mx-auto grid max-w-md place-items-center px-5 py-32 text-center">
          <div className="creora-display text-2xl text-[#0F172A]">Hold on a moment.</div>
          <p className="mt-2 text-sm text-[#64748B]">{errorMsg ?? "We couldn't reach the audit engine. Give it another try."}</p>
          <button onClick={() => setStage("form")} className="creora-btn creora-btn-blue mt-5">Back to form</button>
        </section>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] font-semibold uppercase tracking-wide text-[#64748B]">{children}</div>;
}

function AuditReport({ a }: { a: AuditResult }) {
  const previewIdeas = a.ideas.slice(0, 3);
  const lockedCount = Math.max(0, a.ideas.length - previewIdeas.length);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const sourceLine = a.grounded && a.channel
    ? `Analyzed ${a.channel.title} · ${fmt(a.channel.subscribers)} subscribers · last ${a.channel.videos ? Math.min(a.channel.videos, 10) : "10"} uploads`
    : a.channel
      ? `Analyzed ${a.channel.title} · ${fmt(a.channel.subscribers)} subscribers`
      : "Based on your niche — connect your channel in-app for a video-level breakdown.";

  return (
    <section className="mx-auto max-w-5xl px-5 py-10">
      <div className="flex flex-wrap items-center gap-2">
        <Pill tone="lime"><Sparkles size={13} /> Your free audit</Pill>
        {a.live && <Pill tone="purple">Generated live for you</Pill>}
      </div>
      <p className="mt-2 text-xs text-[#64748B]">{sourceLine}</p>

      {/* THE OPPORTUNITY — the magical headline */}
      <div className="creora-card mt-4 p-7 md:p-9">
        <div className="inline-flex"><Pill tone="lime"><Target size={13} /> Your channel opportunity</Pill></div>
        <h1 className="creora-display mt-3 text-[clamp(24px,4vw,38px)] leading-tight text-[#0F172A]">{a.opportunity}</h1>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <Label>Why</Label>
            <ul className="mt-2 space-y-2 text-[15px] text-[#0F172A]">
              {a.why.map((w) => <li key={w} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[#2463EB]" /> {w}</li>)}
            </ul>
          </div>
          <div className="space-y-4">
            <div>
              <Label>Next best video</Label>
              <div className="mt-1 flex items-start gap-2 text-[17px] font-semibold text-[#0F172A]"><Film size={17} className="mt-0.5 shrink-0 text-[#2463EB]" /> {a.nextVideo}</div>
            </div>
            <div className="rounded-[14px] p-3.5 text-[14px] text-[#0F172A]" style={{ background: "#E7EDF6" }}>
              <span className="font-semibold">Hook:</span> {a.hook}
            </div>
            <div>
              <Label>Suggested thumbnail</Label>
              <div className="mt-1 text-[14px] text-[#0F172A]">{a.thumbnail}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-[rgba(15,23,42,0.08)] pt-5">
          <Label>Repurpose plan</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {a.repurposePlan.map((r) => <Pill key={r} tone="purple"><Repeat size={12} /> {r}</Pill>)}
          </div>
        </div>
      </div>

      {/* Score */}
      <div className="creora-card mt-5 flex flex-col items-center gap-6 p-8 md:flex-row md:p-10">
        <div className="grid h-36 w-36 shrink-0 place-items-center rounded-full" style={{ background: "#0F172A" }}>
          <div className="text-center">
            <div className="creora-display text-5xl text-[#BEF264]">{a.score}</div>
            <div className="text-xs text-[#CBD5E1]">/ 100</div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2"><TrendingUp size={18} className="text-[#2463EB]" /><span className="creora-display text-2xl text-[#0F172A]">Your channel is {a.trend}.</span></div>
          <p className="mt-2 text-[#64748B]">Here&apos;s what&apos;s working, what&apos;s holding you back, and your first few ideas. Unlock the full audit free to see all {a.ideas.length}.</p>
        </div>
      </div>

      {/* Working / Not working */}
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="creora-card p-6">
          <div className="flex items-center gap-2 font-semibold text-[#0F172A]"><Check size={18} className="text-[#2463EB]" /> What&apos;s working</div>
          <ul className="mt-3 space-y-2 text-[15px] text-[#0F172A]">
            {a.working.map((w) => <li key={w} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[#2463EB]" /> {w}</li>)}
          </ul>
        </div>
        <div className="creora-card p-6">
          <div className="flex items-center gap-2 font-semibold text-[#0F172A]"><X size={18} className="text-[#64748B]" /> What&apos;s holding you back</div>
          <ul className="mt-3 space-y-2 text-[15px] text-[#0F172A]">
            {a.notWorking.map((w) => <li key={w} className="flex gap-2"><X size={16} className="mt-0.5 shrink-0 text-[#64748B]" /> {w}</li>)}
          </ul>
        </div>
      </div>

      {/* Opportunities */}
      {a.opportunities.length > 0 && (
        <div className="creora-card mt-5 p-6">
          <div className="flex items-center gap-2 font-semibold text-[#0F172A]"><Target size={18} className="text-[#2463EB]" /> Top opportunities</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {a.opportunities.map((o) => <span key={o} className="creora-pill creora-pill-lime">{o}</span>)}
          </div>
        </div>
      )}

      {/* Preview ideas */}
      <div className="mt-10 flex items-end justify-between">
        <h2 className="creora-display text-[clamp(24px,4vw,36px)] text-[#0F172A]">Your first 3 ideas.</h2>
        {lockedCount > 0 && <span className="text-sm text-[#64748B]">{lockedCount} more in the full audit</span>}
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {previewIdeas.map((idea, i) => (
          <div key={i} className="creora-card p-5">
            <div className="flex items-start justify-between gap-3">
              <span className="text-sm font-semibold leading-snug text-[#0F172A]">{idea.title}</span>
              <span className="creora-pill creora-pill-lime shrink-0">Viral {idea.viralScore}</span>
            </div>
            <p className="mt-2 text-[13px] text-[#64748B]">{idea.why}</p>
            <div className="mt-3 rounded-[14px] p-2.5 text-[13px] text-[#0F172A]" style={{ background: "#E7EDF6" }}><span className="font-semibold">Hook:</span> {idea.hook}</div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {idea.format && <Pill tone="cream">{idea.format}</Pill>}
              {idea.repurpose && <Pill tone="purple">{idea.repurpose}</Pill>}
            </div>
          </div>
        ))}
      </div>

      {/* Locked / unlock + email capture */}
      <div className="creora-card relative mt-6 overflow-hidden p-8 text-center md:p-12" style={{ background: "linear-gradient(135deg, #2463EB, #1d3fb0)" }}>
        <div className="grid h-12 w-12 mx-auto place-items-center rounded-full bg-white/15"><Lock size={22} className="text-white" /></div>
        <h2 className="creora-display mt-4 text-[clamp(24px,4vw,38px)] text-white">Unlock your full audit — free.</h2>
        <p className="mx-auto mt-3 max-w-md text-white/85">Get all {a.ideas.length} ideas, your 30-day content plan, script previews, and repurpose packs.</p>

        <div className="mx-auto mt-5 flex max-w-md flex-col gap-2">
          <Link href="/sign-up" className="creora-btn bg-[#BEF264] text-[#1A2E05] hover:bg-[#a3e635]">Unlock Full Audit Free <ArrowRight size={16} /></Link>
          {!sent ? (
            <form onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }} className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Or email me the full audit" className="creora-input flex-1 !bg-white/95" />
              <button type="submit" className="creora-btn creora-btn-cream whitespace-nowrap">Email it to me</button>
            </form>
          ) : (
            <p className="mt-2 flex items-center justify-center gap-2 text-sm text-white"><Check size={16} className="text-[#BEF264]" /> Done — we&apos;ll send your full audit to {email}.</p>
          )}
          <p className="mt-1 text-xs text-white/70">No card required · Unsubscribe anytime.</p>
        </div>
      </div>

      {/* Locked teaser: what's inside */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { Icon: Lightbulb, label: `${lockedCount} more video ideas`, sub: "With hooks, formats & viral scores" },
          { Icon: Calendar, label: "Full 30-day plan", sub: "Week-by-week, ready to publish" },
          { Icon: PenLine, label: "Script + repurpose previews", sub: "Turn ideas into finished assets" },
        ].map(({ Icon, label, sub }) => (
          <div key={label} className="creora-card creora-card-tight flex items-center gap-3 p-5 opacity-90">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full" style={{ background: "#E7EDF6" }}><Icon size={17} className="text-[#0F172A]" /></div>
            <div>
              <div className="flex items-center gap-1.5 text-sm font-semibold text-[#0F172A]"><Lock size={12} className="text-[#64748B]" /> {label}</div>
              <div className="text-[12px] text-[#64748B]">{sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
