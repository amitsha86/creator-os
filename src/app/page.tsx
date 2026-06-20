"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Sparkles, Play, ArrowRight, Search, Brain, PenLine, Repeat, LineChart, Rocket,
  Youtube, Instagram, Linkedin, Check, ChevronDown, ShieldCheck, Zap, Target,
} from "lucide-react";
import { features, pricingPlans, faqs } from "@/data/mockCreoraData";

const workflow = [
  { icon: Target, label: "Audit", desc: "Score your channel" },
  { icon: Search, label: "Discover", desc: "Find what to make" },
  { icon: PenLine, label: "Create", desc: "Scripts & titles" },
  { icon: Repeat, label: "Repurpose", desc: "One video, 30 posts" },
  { icon: LineChart, label: "Analyze", desc: "See what worked" },
  { icon: Rocket, label: "Grow", desc: "Compound weekly" },
];

const featureIcons = [Search, Brain, Target, PenLine, Repeat, Sparkles];

const problems = [
  "Too many disconnected tools",
  "Manual competitor research",
  "Slow script writing",
  "Weak titles and thumbnails",
  "Content wasted after publishing",
  "Analytics without action",
];

function Pill({ children, tone = "cream" }: { children: React.ReactNode; tone?: "lime" | "purple" | "cream" }) {
  return <span className={`creora-pill creora-pill-${tone}`}>{children}</span>;
}

export default function CreoraHome() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="creora-root min-h-screen">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur-md" style={{ background: "rgba(242,240,234,0.72)", borderBottom: "1px solid rgba(59,23,34,0.08)" }}>
        <nav className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-3.5">
          <Link href="/" className="creora-display text-xl text-[#3B1722]">Creora</Link>
          <div className="ml-4 hidden items-center gap-6 text-sm text-[#7A6B6B] md:flex">
            <a href="#features" className="hover:text-[#3B1722]">Product</a>
            <a href="#how" className="hover:text-[#3B1722]">How it Works</a>
            <a href="#pricing" className="hover:text-[#3B1722]">Pricing</a>
            <Link href="/demo" className="hover:text-[#3B1722]">Demo</Link>
          </div>
          <div className="ml-auto flex items-center gap-2.5">
            <Link href="/sign-in" className="hidden text-sm font-medium text-[#3B1722] hover:opacity-70 sm:block">Login</Link>
            <Link href="/audit" className="creora-btn creora-btn-blue !py-2.5 !px-4 text-sm">Get Free Audit</Link>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-5 pt-16 pb-10 md:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <Pill tone="lime"><Sparkles size={13} /> AI growth copilot for creators</Pill>
            <h1 className="creora-display mt-5 text-[clamp(40px,7vw,76px)] text-[#3B1722]">
              Know what to create next.<br /><span className="text-[#2463EB]">Grow faster with AI.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[#7A6B6B]">
              Creora analyzes your channel, competitors, and trends to generate video ideas, scripts, thumbnails, and repurposed content — all in one workspace.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/audit" className="creora-btn creora-btn-blue">Get Free Channel Audit <ArrowRight size={16} /></Link>
              <Link href="/demo" className="creora-btn creora-btn-cream"><Play size={15} /> Try Demo Dashboard</Link>
              <Link href="/sample-audit" className="text-sm font-medium text-[#2463EB] hover:underline">View Sample Audit →</Link>
            </div>
            <div className="mt-7 flex items-center gap-5 text-sm text-[#7A6B6B]">
              <span className="flex items-center gap-1.5"><Check size={15} className="text-[#2463EB]" /> No card needed</span>
              <span className="flex items-center gap-1.5"><Youtube size={15} /> <Instagram size={15} /> <Linkedin size={15} /> Works where you create</span>
            </div>
          </div>

          {/* HERO DASHBOARD MOCKUP */}
          <HeroMockup />
        </div>
      </section>

      {/* AUDIT INPUT */}
      <section className="mx-auto max-w-4xl px-5 pb-6">
        <div className="creora-card p-6 md:p-8">
          <h2 className="creora-display text-[clamp(22px,3vw,32px)] text-[#3B1722]">Start with your free Creator Growth Audit.</h2>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input placeholder="Paste your YouTube channel URL" className="creora-input flex-1" />
            <Link href="/audit" className="creora-btn creora-btn-blue shrink-0">Analyze My Channel <ArrowRight size={16} /></Link>
          </div>
          <p className="mt-3 text-xs text-[#7A6B6B]">No credit card required. Sample audit available without login — <Link href="/sample-audit" className="text-[#2463EB] hover:underline">see an example</Link>.</p>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="creora-display text-[clamp(28px,4vw,44px)] text-[#3B1722]">Creators are guessing what to post next.</h2>
        <p className="mt-3 max-w-xl text-[#7A6B6B]">Too many tabs. Too much manual work. No clear answer to the only question that matters.</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p) => (
            <div key={p} className="creora-card creora-card-tight flex items-center gap-3 p-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full" style={{ background: "rgba(59,23,34,0.06)" }}>✕</span>
              <span className="text-[15px] text-[#3B1722]">{p}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SOLUTION WORKFLOW */}
      <section id="how" className="mx-auto max-w-6xl px-5 py-16">
        <div className="creora-card p-8 md:p-12">
          <Pill tone="purple">One workflow</Pill>
          <h2 className="creora-display mt-4 text-[clamp(28px,4vw,46px)] text-[#3B1722]">One AI workflow for creator growth.</h2>
          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {workflow.map((w, i) => (
              <div key={w.label} className="rounded-[20px] p-4 text-center" style={{ background: "#DDD0C9" }}>
                <div className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-[#F2F0EA] text-[#2463EB]"><w.icon size={20} /></div>
                <div className="mt-3 font-semibold text-[#3B1722]">{w.label}</div>
                <div className="mt-0.5 text-xs text-[#7A6B6B]">{w.desc}</div>
                {i < workflow.length - 1 && <ArrowRight size={14} className="mx-auto mt-2 hidden text-[#CDBDB6] lg:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE AI OUTPUT */}
      <section id="demo" className="mx-auto max-w-6xl px-5 py-16">
        <div className="text-center">
          <Pill tone="lime"><Zap size={13} /> The wow moment</Pill>
          <h2 className="creora-display mt-4 text-[clamp(28px,4vw,46px)] text-[#3B1722]">See what Creora gives you.</h2>
        </div>
        <div className="creora-card mx-auto mt-9 max-w-3xl overflow-hidden">
          <div className="flex items-center gap-2 border-b px-6 py-4" style={{ borderColor: "rgba(59,23,34,0.08)" }}>
            <Sparkles size={16} className="text-[#2463EB]" />
            <span className="font-semibold text-[#3B1722]">AI Growth Recommendation</span>
            <span className="ml-auto"><Pill tone="lime">Viral 91</Pill></span>
          </div>
          <div className="p-6 md:p-8">
            <div className="text-xs font-semibold uppercase tracking-wide text-[#7A6B6B]">Create this next</div>
            <div className="creora-display mt-1 text-2xl text-[#3B1722]">"How I Automated My Content Workflow With AI"</div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-[#7A6B6B]">Why this can work</div>
                <ul className="mt-2 space-y-1.5 text-[15px] text-[#3B1722]">
                  <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[#2463EB]" /> Similar topics get 2.8x more views</li>
                  <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[#2463EB]" /> Your audience loves AI productivity</li>
                  <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[#2463EB]" /> Competitor activity is increasing</li>
                  <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[#2463EB]" /> Saturation is still low in your niche</li>
                </ul>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-[#7A6B6B]">Suggested hook</div>
                  <div className="mt-1.5 rounded-[16px] p-3 text-[15px] text-[#3B1722]" style={{ background: "#DDD0C9" }}>"I replaced my entire content workflow with AI for 7 days."</div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-[#7A6B6B]">Suggested thumbnail</div>
                  <div className="mt-1.5 rounded-[16px] p-3 text-[15px] text-[#3B1722]" style={{ background: "#DDD0C9" }}>Split-screen: creator face + laptop dashboard + bold text "7 AI Tools"</div>
                </div>
              </div>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/audit" className="creora-btn creora-btn-blue">Get this for your channel <ArrowRight size={16} /></Link>
              <Pill tone="cream">Effort: Medium</Pill>
              <Pill tone="cream">Long-form + 5 Shorts</Pill>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="creora-display text-[clamp(28px,4vw,46px)] text-[#3B1722]">Everything in one command center.</h2>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = featureIcons[i] ?? Sparkles;
            return (
              <div key={f.name} className="creora-card p-6 transition-transform hover:-translate-y-1">
                <div className="grid h-11 w-11 place-items-center rounded-[14px]" style={{ background: "#B9FF1D" }}><Icon size={20} className="text-[#2a2208]" /></div>
                <div className="mt-4 text-lg font-semibold text-[#3B1722]">{f.name}</div>
                <div className="mt-1.5 text-[15px] leading-relaxed text-[#7A6B6B]">{f.desc}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRODUCT PROOF */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="creora-display text-[clamp(28px,4vw,46px)] text-[#3B1722]">Built for real creator workflows.</h2>
        <p className="mt-2 text-[#7A6B6B]">No fake testimonials — just real sample outputs you can explore right now.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Sample Audit Report", d: "See what's working, what's not, and what to create next.", cta: "View Sample Audit", href: "/sample-audit" },
            { t: "Example 30-Day Plan", d: "Turn one goal into a weekly publishing plan across platforms.", cta: "See Demo Dashboard", href: "/demo" },
            { t: "Script Generated by Creora", d: "Go from idea to hook, structure, scenes, and CTA.", cta: "Try Demo", href: "/demo" },
            { t: "Repurposing Preview", d: "Turn one video into Shorts, posts, newsletters, and more.", cta: "Explore Demo", href: "/demo" },
          ].map((c) => (
            <div key={c.t} className="creora-card flex flex-col p-6">
              <div className="text-lg font-semibold text-[#3B1722]">{c.t}</div>
              <div className="mt-1.5 flex-1 text-[15px] leading-relaxed text-[#7A6B6B]">{c.d}</div>
              <Link href={c.href} className="mt-4 text-sm font-medium text-[#2463EB] hover:underline">{c.cta} →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="creora-card p-8 md:p-12" style={{ background: "#3B1722" }}>
          <h2 className="creora-display text-[clamp(28px,4vw,46px)] text-[#F2F0EA]">Not another AI writing tool.</h2>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[["ChatGPT", "helps you write"], ["vidIQ", "helps with research"], ["Notion", "helps you organize"], ["Buffer", "helps you schedule"]].map(([t, d]) => (
              <div key={t} className="rounded-[18px] p-4" style={{ background: "rgba(242,240,234,0.06)" }}>
                <div className="font-semibold text-[#F2F0EA]">{t}</div>
                <div className="text-sm text-[#CDBDB6]">{d}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-lg text-[#F2F0EA]">
            <span className="text-[#B9FF1D]">Creora</span> connects strategy, creation, workflow, and growth — so you stop stitching tools together.
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-6xl px-5 py-16">
        <div className="text-center">
          <Pill tone="purple">Pricing</Pill>
          <h2 className="creora-display mt-4 text-[clamp(28px,4vw,46px)] text-[#3B1722]">Start free. Grow into it.</h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {pricingPlans.map((p) => (
            <div key={p.name} className={`creora-card flex flex-col p-6 ${p.highlight ? "ring-2 ring-[#2463EB]" : ""}`}>
              {p.highlight && <span className="mb-2"><Pill tone="lime">Most popular</Pill></span>}
              <div className="text-sm font-semibold text-[#7A6B6B]">{p.name}</div>
              <div className="mt-1 flex items-end gap-1">
                <span className="creora-display text-3xl text-[#3B1722]">{p.price}</span>
                {p.per && <span className="mb-1 text-sm text-[#7A6B6B]">{p.per}</span>}
              </div>
              <div className="mt-1 text-sm text-[#7A6B6B]">{p.tagline}</div>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-[#3B1722]">
                {p.features.map((f) => <li key={f} className="flex gap-2"><Check size={15} className="mt-0.5 shrink-0 text-[#2463EB]" /> {f}</li>)}
              </ul>
              <Link href="/audit" className={`creora-btn mt-6 w-full ${p.highlight ? "creora-btn-blue" : "creora-btn-cream"}`}>{p.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="creora-card flex flex-col gap-6 p-8 md:flex-row md:items-center md:p-12">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-[20px]" style={{ background: "#B9FF1D" }}><ShieldCheck size={30} className="text-[#2a2208]" /></div>
          <div>
            <h2 className="creora-display text-2xl text-[#3B1722]">Your channel stays yours.</h2>
            <div className="mt-3 grid gap-x-8 gap-y-2 text-[15px] text-[#3B1722] sm:grid-cols-2">
              {["We never post without your permission", "Your channel data stays private", "Disconnect accounts anytime", "Secure OAuth-based integrations", "Read-only analytics unless publishing is enabled"].map((t) => (
                <div key={t} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[#2463EB]" /> {t}</div>
              ))}
            </div>
            <div className="mt-4 flex gap-4 text-sm font-medium text-[#2463EB]">
              <Link href="/security" className="hover:underline">Security →</Link>
              <Link href="/privacy" className="hover:underline">Privacy →</Link>
              <Link href="/data-deletion" className="hover:underline">Data deletion →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-5 py-16">
        <h2 className="creora-display text-center text-[clamp(28px,4vw,44px)] text-[#3B1722]">Questions, answered.</h2>
        <div className="mt-9 space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="creora-card creora-card-tight overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left">
                <span className="font-medium text-[#3B1722]">{f.q}</span>
                <ChevronDown size={18} className={`shrink-0 text-[#7A6B6B] transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <div className="px-5 pb-5 text-[15px] leading-relaxed text-[#7A6B6B]">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="creora-card overflow-hidden p-10 text-center md:p-16" style={{ background: "linear-gradient(135deg, #2463EB, #1d3fb0)" }}>
          <h2 className="creora-display text-[clamp(30px,5vw,56px)] text-white">Stop guessing what to create next.</h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] text-white/85">Get your free Creator Growth Audit and discover your next best video idea.</p>
          <Link href="/audit" className="creora-btn mt-8 bg-[#B9FF1D] text-[#2a2208] hover:bg-[#a9ee10]">Analyze My Channel <ArrowRight size={16} /></Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t px-5 py-12" style={{ borderColor: "rgba(59,23,34,0.08)" }}>
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
            <div>
              <span className="creora-display text-lg text-[#3B1722]">Creora</span>
              <p className="mt-1 max-w-xs text-sm text-[#7A6B6B]">Know what to create next. Grow faster with AI.</p>
            </div>
            <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm text-[#7A6B6B] sm:grid-cols-3">
              <Link href="/audit" className="hover:text-[#3B1722]">Free Audit</Link>
              <Link href="/sample-audit" className="hover:text-[#3B1722]">Sample Audit</Link>
              <Link href="/demo" className="hover:text-[#3B1722]">Demo</Link>
              <Link href="/privacy" className="hover:text-[#3B1722]">Privacy</Link>
              <Link href="/terms" className="hover:text-[#3B1722]">Terms</Link>
              <Link href="/data-deletion" className="hover:text-[#3B1722]">Data deletion</Link>
              <Link href="/security" className="hover:text-[#3B1722]">Security</Link>
              <Link href="/sign-in" className="hover:text-[#3B1722]">Login</Link>
              <a href="#pricing" className="hover:text-[#3B1722]">Pricing</a>
            </div>
          </div>
          <div className="mt-8 text-xs text-[#7A6B6B]">© 2026 Creora · AI Growth Copilot for Creators</div>
        </div>
      </footer>
    </div>
  );
}

function HeroMockup() {
  return (
    <div className="creora-card relative p-5" style={{ boxShadow: "0 30px 80px rgba(20,10,10,0.22)" }}>
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-[#3B1722]">Good morning, Maya</div>
        <Pill tone="lime"><Sparkles size={12} /> Growth 82</Pill>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[20px] p-4" style={{ background: "#3B1722" }}>
          <div className="text-xs text-[#CDBDB6]">Growth Score</div>
          <div className="creora-display mt-1 text-4xl text-[#B9FF1D]">82<span className="text-xl text-[#CDBDB6]">/100</span></div>
          <div className="mt-1 text-xs text-[#DDD0C9]">Trending upward · AI productivity</div>
        </div>
        <div className="rounded-[20px] p-4" style={{ background: "#DDD0C9" }}>
          <div className="text-xs text-[#7A6B6B]">Next Best Idea</div>
          <div className="mt-1 text-sm font-semibold leading-snug text-[#3B1722]">"I Tried 7 AI Tools So You Don't Have To"</div>
          <div className="mt-2 flex gap-1.5"><Pill tone="lime">Viral 91</Pill><Pill tone="cream">Med</Pill></div>
        </div>
      </div>

      <div className="mt-3 rounded-[20px] p-4" style={{ background: "#F2F0EA", border: "1px solid rgba(59,23,34,0.08)" }}>
        <div className="flex items-center gap-1.5 text-sm font-semibold text-[#3B1722]"><Sparkles size={14} className="text-[#2463EB]" /> AI Growth Coach</div>
        <div className="mt-1.5 text-[13px] leading-relaxed text-[#7A6B6B]">This week: publish one AI tutorial, improve thumbnail contrast, and repurpose your latest video into 4 Shorts.</div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        {["Idea", "Script", "Edit", "Scheduled"].map((s, i) => (
          <div key={s} className="flex-1 rounded-pill px-2 py-1.5 text-center text-[11px] font-medium" style={{ background: i === 0 ? "#B9FF1D" : "#DDD0C9", color: "#3B1722" }}>{s}</div>
        ))}
      </div>
    </div>
  );
}
