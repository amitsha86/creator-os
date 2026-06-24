// ============================================================
// Creora — in-memory data layer (seed + store)
// Production target is PostgreSQL + ClickHouse + Pinecone (see PRD);
// this module provides a typed, seeded store so the app runs with zero setup.
// ============================================================

export type Platform = "youtube" | "instagram" | "tiktok" | "linkedin" | "x" | "facebook";
export type Stage = "Idea" | "Research" | "Script" | "Shoot" | "Edit" | "Thumbnail" | "Review" | "Publish" | "Analyze";
export const STAGES: Stage[] = ["Idea", "Research", "Script", "Shoot", "Edit", "Thumbnail", "Review", "Publish", "Analyze"];

export interface KpiPoint { label: string; value: number; delta: number; suffix?: string; spark: number[]; }
export interface PlatformStat { platform: Platform; followers: number; views: number; delta: number; }

export interface Opportunity {
  id: string; title: string; niche: string;
  viral: number; opportunity: number; saturation: number;
  momentum: "Emerging" | "Rising" | "Peaking" | "Declining";
  why: string; examples: string[]; format: "Long-form" | "Short"; spark: number[];
}
export interface Competitor {
  id: string; handle: string; platform: Platform; subs: number; growth: number;
  cadence: string; topVideo: string; topViews: number; thumbStyle: string;
}
export interface ContentItem {
  id: string; title: string; type: "Long-form" | "Short" | "Podcast"; stage: Stage;
  assignee: string; priority: "Low" | "Med" | "High"; due: string;
  scores?: { retention: number; hook: number; emotional: number; viral: number };
  predictedCtr?: number; platform: Platform;
}
export interface ScriptDoc {
  id: string; contentId: string; title: string; framework: string;
  scores: { retention: number; hook: number; emotional: number; viral: number };
  blocks: { kind: string; time: string; body: string; note?: string }[];
}
export interface Deal {
  id: string; brand: string; stage: "Prospect" | "Outreach" | "Negotiation" | "Booked" | "Delivered" | "Paid";
  value: number; contact: string; deliverables: string; health: "On track" | "At risk" | "Stalled";
}
export interface RevenueStream { stream: string; amount: number; delta: number; color: string; }
export interface VaultItem { id: string; kind: "Hook" | "Script" | "Framework" | "Thumbnail" | "Template" | "SOP"; title: string; perf: number; tags: string[]; }
export interface ResearchItem { id: string; kind: "Article" | "Video" | "Note" | "Thread"; title: string; source: string; summary: string; collection: string; }
export interface TeamMember { name: string; role: string; initials: string; color: string; }
export interface CalendarPost { id: string; title: string; platform: Platform; day: number; time: string; }
export interface Recommendation { id: string; action: string; impact: number; effort: "Low" | "Med" | "High"; module: string; }

// ---------------- Seed ----------------
const spark = (a: number[]) => a;

export const channel = {
  name: "Maya Builds",
  handle: "@mayabuilds",
  niche: "Tech & maker / studio setups",
  avatarColor: "#2463EB",
  growthScore: 78,
  goal: { label: "250k subscribers by Dec", current: 85200, target: 250000, pace: "On pace · Nov" },
};

export const kpis: KpiPoint[] = [
  { label: "Revenue", value: 4210, delta: 12.0, suffix: "$", spark: spark([2.9, 3.1, 3.0, 3.4, 3.6, 3.9, 4.21]) },
  { label: "Subscribers", value: 85200, delta: 3.1, spark: spark([77, 78, 79.5, 81, 82, 84, 85.2]) },
  { label: "Views (28d)", value: 1230000, delta: 8.0, spark: spark([0.9, 1.0, 0.95, 1.1, 1.15, 1.2, 1.23]) },
  { label: "Watch time (h)", value: 41200, delta: 5.0, spark: spark([34, 35, 36, 38, 39, 40, 41.2]) },
  { label: "Engagement", value: 7.4, delta: 0.6, suffix: "%", spark: spark([6.4, 6.6, 6.8, 7.0, 7.1, 7.3, 7.4]) },
  { label: "Growth Score", value: 78, delta: 4.0, spark: spark([68, 70, 71, 73, 75, 76, 78]) },
];

export const platforms: PlatformStat[] = [
  { platform: "youtube", followers: 85200, views: 1230000, delta: 8.0 },
  { platform: "instagram", followers: 31400, views: 540000, delta: 11.2 },
  { platform: "tiktok", followers: 62800, views: 2100000, delta: 19.4 },
  { platform: "linkedin", followers: 9200, views: 88000, delta: 6.1 },
  { platform: "x", followers: 14300, views: 210000, delta: -2.3 },
  { platform: "facebook", followers: 7600, views: 64000, delta: 1.4 },
];

export const opportunities: Opportunity[] = [
  { id: "op1", title: "Budget studio setups under $200", niche: "maker", viral: 84, opportunity: 82, saturation: 31, momentum: "Rising", format: "Long-form", why: "3 breakouts this week in adjacent maker niches; demand outpacing supply.", examples: ["$187 desk build (1.2M)", "DIY soundproofing (840k)"], spark: [10, 14, 18, 22, 30, 41, 55] },
  { id: "op2", title: "I tested viral productivity hacks", niche: "productivity", viral: 79, opportunity: 61, saturation: 68, momentum: "Peaking", format: "Long-form", why: "High virality but crowded — differentiate with a contrarian result.", examples: ["I tried 7 hacks (3.1M)"], spark: [40, 55, 60, 62, 61, 58, 54] },
  { id: "op3", title: "AI tools that replaced my $5k gear", niche: "tech", viral: 88, opportunity: 85, saturation: 24, momentum: "Emerging", format: "Long-form", why: "Fresh angle, low saturation, strong audience fit with your last 3 winners.", examples: ["AI camera test (660k)"], spark: [4, 6, 9, 14, 21, 33, 48] },
  { id: "op4", title: "30-day creator studio glow-up (Shorts series)", niche: "maker", viral: 72, opportunity: 70, saturation: 38, momentum: "Rising", format: "Short", why: "Serialized shorts compound; strong save-rate signal.", examples: ["studio reveal (900k)"], spark: [8, 12, 15, 20, 27, 35, 44] },
  { id: "op5", title: "Why your B-roll looks cheap (and the fix)", niche: "filmmaking", viral: 81, opportunity: 76, saturation: 42, momentum: "Rising", format: "Long-form", why: "Pain-point hook with clear payoff; high comment intent.", examples: ["cinematic b-roll (1.4M)"], spark: [12, 16, 19, 24, 30, 38, 47] },
  { id: "op6", title: "I rebuilt my setup with only used gear", niche: "maker", viral: 76, opportunity: 79, saturation: 22, momentum: "Emerging", format: "Long-form", why: "Sustainability + budget angle is under-served in your niche.", examples: ["used gear haul (520k)"], spark: [3, 5, 8, 12, 18, 28, 40] },
];

export const competitors: Competitor[] = [
  { id: "c1", handle: "@studiorev", platform: "youtube", subs: 412000, growth: 4.2, cadence: "2/wk", topVideo: "My $300 dream studio", topViews: 2400000, thumbStyle: "Face + big number" },
  { id: "c2", handle: "@makermind", platform: "youtube", subs: 188000, growth: 9.8, cadence: "1/wk", topVideo: "I quit my job to build", topViews: 1800000, thumbStyle: "Before/after split" },
  { id: "c3", handle: "@deskdaily", platform: "youtube", subs: 96000, growth: 14.1, cadence: "3/wk", topVideo: "Desk tour 2026", topViews: 980000, thumbStyle: "Clean product hero" },
  { id: "c4", handle: "@gearghost", platform: "youtube", subs: 540000, growth: 1.1, cadence: "1/wk", topVideo: "Tech I regret buying", topViews: 3100000, thumbStyle: "Shocked face + red X" },
];

export let content: ContentItem[] = [
  { id: "ct1", title: "AI tools that replaced my $5k gear", type: "Long-form", stage: "Idea", assignee: "Maya", priority: "High", due: "2026-06-22", platform: "youtube" },
  { id: "ct2", title: "Budget studio under $200", type: "Long-form", stage: "Script", assignee: "Maya", priority: "High", due: "2026-06-20", scores: { retention: 88, hook: 91, emotional: 64, viral: 76 }, platform: "youtube" },
  { id: "ct3", title: "Why your B-roll looks cheap", type: "Long-form", stage: "Shoot", assignee: "Leo", priority: "Med", due: "2026-06-24", platform: "youtube" },
  { id: "ct4", title: "Studio glow-up — ep.3", type: "Short", stage: "Edit", assignee: "Leo", priority: "Med", due: "2026-06-19", platform: "tiktok" },
  { id: "ct5", title: "Used-gear haul", type: "Long-form", stage: "Thumbnail", assignee: "Sam", priority: "Low", due: "2026-06-26", predictedCtr: 9.4, platform: "youtube" },
  { id: "ct6", title: "Productivity hacks tested", type: "Long-form", stage: "Review", assignee: "Dev", priority: "Med", due: "2026-06-21", platform: "youtube" },
  { id: "ct7", title: "Desk cable management guide", type: "Long-form", stage: "Publish", assignee: "Maya", priority: "High", due: "2026-06-18", predictedCtr: 10.1, platform: "youtube" },
  { id: "ct8", title: "My 2026 studio reveal", type: "Long-form", stage: "Analyze", assignee: "Maya", priority: "High", due: "2026-06-10", scores: { retention: 82, hook: 86, emotional: 71, viral: 79 }, platform: "youtube" },
  { id: "ct9", title: "3 mic myths (Short)", type: "Short", stage: "Idea", assignee: "Sam", priority: "Low", due: "2026-06-28", platform: "instagram" },
];

export const scripts: ScriptDoc[] = [
  {
    id: "sc1", contentId: "ct2", title: "Budget studio under $200", framework: "Open Loop → Build → Payoff",
    scores: { retention: 88, hook: 91, emotional: 64, viral: 76 },
    blocks: [
      { kind: "HOOK", time: "0:00–0:15", body: "Everyone says you need $5,000 to make videos look pro. I built this entire studio for $187 — and most people can't tell the difference." },
      { kind: "SETUP", time: "0:15–1:00", body: "Here's the exact problem with 'budget setup' videos: they secretly use $2k cameras. Not this one. Rules: nothing over $50, all of it on this desk.", note: "B-roll: desk build timelapse" },
      { kind: "BUILD", time: "1:00–4:30", body: "Item one — lighting. A $24 panel beats the window everyone tells you to use, and here's the test that proves it...", note: "Show side-by-side test" },
      { kind: "PAYOFF", time: "4:30–6:00", body: "Final reveal: the $187 setup vs the $5,000 rig. Same thumbnail-worthy shot. The difference is technique, not budget." },
    ],
  },
];

export const deals: Deal[] = [
  { id: "d1", brand: "FrameForge", stage: "Prospect", value: 3000, contact: "alex@frameforge.io", deliverables: "1 integration", health: "On track" },
  { id: "d2", brand: "DeskPro", stage: "Outreach", value: 5500, contact: "media@deskpro.com", deliverables: "1 dedicated + 2 shorts", health: "On track" },
  { id: "d3", brand: "LumaLight", stage: "Negotiation", value: 8000, contact: "partners@lumalight.co", deliverables: "2 integrations", health: "At risk" },
  { id: "d4", brand: "NovaMics", stage: "Booked", value: 12000, contact: "deals@novamics.com", deliverables: "Series sponsor (4)", health: "On track" },
  { id: "d5", brand: "PixelDesk", stage: "Delivered", value: 6500, contact: "team@pixeldesk.com", deliverables: "1 dedicated", health: "On track" },
  { id: "d6", brand: "CableCo", stage: "Paid", value: 2800, contact: "ar@cableco.com", deliverables: "1 short", health: "On track" },
];

export const revenueStreams: RevenueStream[] = [
  { stream: "Sponsorships", amount: 18500, delta: 14, color: "#2463EB" },
  { stream: "Ad revenue", amount: 6200, delta: 8, color: "#0ea5e9" },
  { stream: "Affiliate", amount: 3100, delta: 22, color: "#10b981" },
  { stream: "Products / merch", amount: 2400, delta: -4, color: "#f59e0b" },
  { stream: "Memberships", amount: 1800, delta: 11, color: "#f43f5e" },
];

export const vault: VaultItem[] = [
  { id: "v1", kind: "Hook", title: "Everyone says you need $X — I did it for $Y", perf: 94, tags: ["budget", "contrarian"] },
  { id: "v2", kind: "Framework", title: "Open Loop → Build → Payoff", perf: 88, tags: ["retention", "structure"] },
  { id: "v3", kind: "Thumbnail", title: "Face + big number, high contrast", perf: 91, tags: ["ctr", "style"] },
  { id: "v4", kind: "Script", title: "2026 studio reveal (top performer)", perf: 86, tags: ["winner"] },
  { id: "v5", kind: "SOP", title: "Short-form repurposing checklist", perf: 80, tags: ["ops", "team"] },
  { id: "v6", kind: "Template", title: "Sponsor outreach — first touch", perf: 77, tags: ["crm", "deals"] },
];

export const research: ResearchItem[] = [
  { id: "r1", kind: "Article", title: "Why retention beats CTR in 2026", source: "creatoreconomy.so", summary: "Watch-time signals now dominate ranking; first 30s decide distribution.", collection: "Algorithm" },
  { id: "r2", kind: "Video", title: "Teardown: how @studiorev structures hooks", source: "youtube.com", summary: "Cold open + stakes within 8s; pattern interrupt every 40s.", collection: "Hooks" },
  { id: "r3", kind: "Thread", title: "Budget gear that punches above its price", source: "x.com", summary: "Crowd-sourced list; the $24 light panel keeps recurring.", collection: "Gear" },
  { id: "r4", kind: "Note", title: "My audience asks for 'used gear' a lot", source: "comments", summary: "12 comments in 2 weeks requesting a used-gear build.", collection: "Audience" },
];

export const team: TeamMember[] = [
  { name: "Maya", role: "Owner / Creator", initials: "MB", color: "#2463EB" },
  { name: "Dev", role: "Strategist", initials: "DV", color: "#0ea5e9" },
  { name: "Sam", role: "Writer", initials: "SM", color: "#10b981" },
  { name: "Leo", role: "Editor", initials: "LO", color: "#f59e0b" },
  { name: "Ria", role: "Designer", initials: "RA", color: "#f43f5e" },
];

export const calendarPosts: CalendarPost[] = [
  { id: "cp1", title: "Cable mgmt guide", platform: "youtube", day: 1, time: "9:00" },
  { id: "cp2", title: "Studio glow-up ep.3", platform: "tiktok", day: 1, time: "17:00" },
  { id: "cp3", title: "3 mic myths", platform: "instagram", day: 3, time: "12:00" },
  { id: "cp4", title: "Budget studio teaser", platform: "x", day: 3, time: "15:30" },
  { id: "cp5", title: "Used-gear haul", platform: "youtube", day: 5, time: "9:00" },
  { id: "cp6", title: "B-roll tips short", platform: "tiktok", day: 5, time: "18:00" },
  { id: "cp7", title: "Behind the build", platform: "linkedin", day: 4, time: "8:00" },
];

export const recommendations: Recommendation[] = [
  { id: "rec1", action: "Make 'AI tools that replaced my $5k gear' next — Opportunity 85, Saturation 24.", impact: 92, effort: "Med", module: "Viral Intelligence" },
  { id: "rec2", action: "Re-cut the first 15s of 'Productivity hacks' — hook scored 58, below your 80 baseline.", impact: 74, effort: "Low", module: "Script Studio" },
  { id: "rec3", action: "Test a 'big number + face' thumbnail on the used-gear video — niche CTR winner.", impact: 68, effort: "Low", module: "Thumbnail Intelligence" },
  { id: "rec4", action: "Post Shorts at 18:00 — your TikTok engagement is 31% higher then.", impact: 61, effort: "Low", module: "Content Calendar" },
];

export const repurposeTargets = [
  { platform: "tiktok" as Platform, label: "TikTok / Reels", count: 3, desc: "9:16 clips with captions + hook overlay" },
  { platform: "instagram" as Platform, label: "Instagram Reels", count: 3, desc: "Vertical, cover frame auto-selected" },
  { platform: "x" as Platform, label: "X thread", count: 1, desc: "7-tweet breakdown of the key insight" },
  { platform: "linkedin" as Platform, label: "LinkedIn post", count: 1, desc: "Professional reframe + takeaway" },
  { platform: "youtube" as Platform, label: "Blog + Newsletter", count: 2, desc: "SEO article + email digest" },
];

export const agents = [
  { name: "Research", color: "#2463EB", desc: "Trends, competitor teardowns, evidence", status: "Ran 12m ago" },
  { name: "Script", color: "#0ea5e9", desc: "High-retention scripts + scoring", status: "Idle" },
  { name: "Thumbnail", color: "#10b981", desc: "Generate + predict CTR", status: "Idle" },
  { name: "SEO", color: "#f59e0b", desc: "Titles, tags, timing", status: "Ran 2h ago" },
  { name: "Growth", color: "#f43f5e", desc: "Weekly plan + ranked actions", status: "Ran 1d ago" },
  { name: "Repurposing", color: "#a855f7", desc: "One asset → many platforms", status: "Idle" },
  { name: "Sponsor", color: "#14b8a6", desc: "Pipeline + outreach", status: "Idle" },
  { name: "Analytics", color: "#eab308", desc: "Explain what happened & why", status: "Ran 12m ago" },
];

// ---------------- mutators (in-memory) ----------------
export function moveContent(id: string, stage: Stage) {
  const item = content.find((c) => c.id === id);
  if (item) item.stage = stage;
  return item;
}
