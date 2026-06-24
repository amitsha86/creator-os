import { generate } from "@/lib/ai";
import { fetchChannelStats, fetchRecentVideos, type YouTubeVideo } from "@/lib/youtube";

export interface AuditIdea {
  title: string;
  viralScore: number;
  why: string;
  hook: string;
  format: string;
  repurpose: string;
}

export interface AuditChannel {
  title: string;
  subscribers: number | null;
  views: number;
  videos: number;
  handle: string;
}

export interface AuditResult {
  score: number;
  trend: string;
  opportunity: string;
  why: string[];
  nextVideo: string;
  hook: string;
  thumbnail: string;
  repurposePlan: string[];
  working: string[];
  notWorking: string[];
  opportunities: string[];
  ideas: AuditIdea[];
  channel: AuditChannel | null;
  grounded: boolean; // a real channel's videos informed the audit
  live: boolean; // a live AI call produced it (vs. deterministic fallback)
}

export interface AuditInput {
  url?: string;
  niche?: string;
  goal?: string;
  competitors?: string;
}

/** Extract a YouTube handle (@name) or channel id (UC...) from a URL or raw string. */
export function parseHandle(input?: string): string {
  if (!input) return "";
  const s = input.trim();
  const at = s.match(/@[\w.-]+/);
  if (at) return at[0];
  const chan = s.match(/UC[\w-]{22}/);
  if (chan) return chan[0];
  const cOrUser = s.match(/(?:\/c\/|\/user\/)([\w.-]+)/);
  if (cOrUser) return cOrUser[1];
  // Bare token like "yourchannel" → treat as a handle.
  if (/^[\w.-]+$/.test(s)) return s.startsWith("@") ? s : `@${s}`;
  return "";
}

function fmt(n: number | null): string {
  if (n === null) return "hidden";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function buildPrompt(input: AuditInput, channel: AuditChannel | null, videos: YouTubeVideo[]): string {
  const niche = input.niche?.trim() || "their niche";
  const goal = input.goal?.trim() || "grow the channel";
  const competitors = input.competitors?.trim();

  let context = `Creator handle: ${channel?.handle || parseHandle(input.url) || "unknown"}\nNiche: ${niche}\nPrimary goal: ${goal}`;
  if (competitors) context += `\nNamed competitors: ${competitors}`;
  if (channel) {
    context += `\nReal channel data — ${channel.title}: ${fmt(channel.subscribers)} subscribers, ${fmt(channel.views)} total views across ${channel.videos} videos.`;
  }
  if (videos.length) {
    const list = videos
      .slice(0, 10)
      .map((v) => `- "${v.title}" — ${fmt(v.views)} views`)
      .join("\n");
    context += `\nRecent uploads (newest first), with view counts:\n${list}\nUse the view-count spread to identify which FORMATS and TOPICS actually outperform for this creator. Cite real patterns, not guesses.`;
  } else {
    context += `\nNo live video data is available, so reason from the stated niche and goal. Frame the "why" as sharp strategic hypotheses a creator in this niche would recognize as true.`;
  }

  return `Analyze this YouTube creator and produce a punchy, specific growth audit that feels custom-made.

${context}

Respond with ONLY valid JSON (no markdown, no code fences, no commentary) matching this exact schema:
{
  "score": <integer 0-100, an honest growth-readiness score>,
  "trend": "<3-5 word phrase, e.g. 'trending upward' or 'plateauing on views'>",
  "opportunity": "<ONE specific sentence naming a concrete content lane this creator should own>",
  "why": ["<4 short evidence-style bullets, each referencing their videos, niche, audience, or competitors>"],
  "nextVideo": "<one concrete, clickable video title>",
  "hook": "<1-2 sentence spoken hook for that video>",
  "thumbnail": "<short visual description: subject + text + style>",
  "repurposePlan": ["<4-6 short items like '5 Shorts', '1 LinkedIn post', '1 X thread', '1 newsletter intro'>"],
  "working": ["<3 short things working for this creator>"],
  "notWorking": ["<3 short things holding them back>"],
  "opportunities": ["<3-4 short content-lane tags>"],
  "ideas": [
    { "title": "<clickable title>", "viralScore": <int 70-95>, "why": "<one line>", "hook": "<one line>", "format": "<e.g. 'Long-form + 5 Shorts'>", "repurpose": "<e.g. 'Shorts, X thread, newsletter'>" }
  ]
}
Return exactly 5 ideas, sorted by viralScore descending. Keep every field tight — one line each. Be concrete and specific to THIS creator — never generic. Output JSON only.`;
}

function coerce(raw: any, channel: AuditChannel | null, grounded: boolean, live: boolean): AuditResult | null {
  if (!raw || typeof raw !== "object") return null;
  const arr = (v: any, n: number): string[] =>
    Array.isArray(v) ? v.map((x) => String(x)).filter(Boolean).slice(0, n) : [];
  const ideas: AuditIdea[] = Array.isArray(raw.ideas)
    ? raw.ideas
        .map((i: any) => ({
          title: String(i?.title ?? "").trim(),
          viralScore: Math.max(0, Math.min(100, Math.round(Number(i?.viralScore ?? 80)))),
          why: String(i?.why ?? "").trim(),
          hook: String(i?.hook ?? "").trim(),
          format: String(i?.format ?? "").trim(),
          repurpose: String(i?.repurpose ?? "").trim(),
        }))
        .filter((i: AuditIdea) => i.title)
        .slice(0, 8)
    : [];

  const opportunity = String(raw.opportunity ?? "").trim();
  if (!opportunity || ideas.length === 0) return null; // not usable — let caller fall back

  return {
    score: Math.max(0, Math.min(100, Math.round(Number(raw.score ?? 80)))),
    trend: String(raw.trend ?? "trending upward").trim(),
    opportunity,
    why: arr(raw.why, 5),
    nextVideo: String(raw.nextVideo ?? ideas[0]?.title ?? "").trim(),
    hook: String(raw.hook ?? ideas[0]?.hook ?? "").trim(),
    thumbnail: String(raw.thumbnail ?? "").trim(),
    repurposePlan: arr(raw.repurposePlan, 6),
    working: arr(raw.working, 4),
    notWorking: arr(raw.notWorking, 4),
    opportunities: arr(raw.opportunities, 5),
    ideas,
    channel,
    grounded,
    live,
  };
}

/** Pull the first balanced {...} block out of a model response and parse it. */
function extractJson(text: string): any | null {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end <= start) return null;
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return null;
  }
}

export async function runAudit(input: AuditInput): Promise<AuditResult> {
  const handle = parseHandle(input.url);

  // Optional real-channel grounding (only when YOUTUBE_API_KEY is configured).
  let channel: AuditChannel | null = null;
  let videos: YouTubeVideo[] = [];
  if (handle) {
    const stats = await fetchChannelStats(handle);
    if (stats) {
      channel = {
        title: stats.title,
        subscribers: stats.subscribers,
        views: stats.views,
        videos: stats.videos,
        handle: stats.handle,
      };
      if (stats.id) videos = await fetchRecentVideos(stats.id);
    }
  }
  const grounded = videos.length > 0;

  const prompt = buildPrompt(input, channel, videos);
  const system = `You are Creora's lead growth strategist for a creator in the "${input.niche?.trim() || "content"}" niche. You are specific, evidence-driven, and never generic. You output exactly what is asked — here, strict JSON only.`;
  // Haiku + a trimmed budget keeps the call well under the serverless time limit.
  const { text, live } = await generate(prompt, {
    maxTokens: 1500,
    system,
    model: process.env.ANTHROPIC_AUDIT_MODEL || "claude-haiku-4-5-20251001",
    timeoutMs: 20000,
  });

  const parsed = coerce(extractJson(text), channel, grounded, live);
  return parsed ?? fallbackAudit(input, channel, grounded);
}

/** Deterministic, niche-aware result so the audit always returns something strong. */
export function fallbackAudit(input: AuditInput, channel: AuditChannel | null = null, grounded = false): AuditResult {
  const niche = input.niche?.trim() || "your niche";
  const Niche = niche.charAt(0).toUpperCase() + niche.slice(1);
  return {
    score: 78,
    trend: "trending upward",
    opportunity: `Personal "I tried it" experiments in ${niche} — you turn ${niche} into stories, not lectures.`,
    why: [
      `Your hands-on ${niche} videos outperform broad opinion pieces.`,
      "Challenge-style formats are pulling the strongest engagement in your space.",
      `Your audience responds to "I tried X" titles over generic tutorials.`,
      "You're under-repurposing long-form into Shorts and posts.",
    ],
    nextVideo: `I Let AI Run My ${Niche} Workflow for 7 Days`,
    hook: "I gave AI control of my ideas, scripts, titles, and repurposing for one week. Here's what actually worked.",
    thumbnail: `Creator reaction face + dashboard + bold text "AI RAN MY CHANNEL"`,
    repurposePlan: ["5 Shorts", "1 LinkedIn post", "1 X thread", "1 newsletter intro"],
    working: [
      "Practical, experiment-led videos beat broad opinion videos",
      "Number + outcome titles get higher CTR",
      "Challenge framing keeps retention high",
    ],
    notWorking: [
      "Thumbnails lack clear contrast at small sizes",
      "First 10 seconds open too slowly",
      "Long-form isn't repurposed consistently",
    ],
    opportunities: [`${Niche} experiments`, "Beginner-friendly tutorials", "Tool comparisons", "Behind-the-scenes workflow"],
    ideas: [
      { title: `I Tried 7 ${Niche} Tools So You Don't Have To`, viralScore: 91, why: "High demand, low saturation, trusted format.", hook: "I tested 7 tools so you can skip the bad ones.", format: "Long-form + 5 Shorts", repurpose: "Shorts, X thread, newsletter" },
      { title: `I Built a Business With Only ${Niche} for 30 Days`, viralScore: 89, why: "Challenge format outperforms in your niche.", hook: "$0 to launch using only this — 30-day challenge.", format: "Vlog series", repurpose: "Daily Shorts, newsletter" },
      { title: `The ${Niche} Stack Every Creator Needs in 2026`, viralScore: 86, why: "Evergreen, searchable, sponsor-friendly.", hook: "These 6 tools run my entire channel.", format: "Listicle + demo", repurpose: "Shorts, IG carousel" },
      { title: `I Let AI Plan My ${Niche} for a Week`, viralScore: 85, why: "Experiment + relatable workflow pain.", hook: "I gave AI full control of my calendar.", format: "Experiment", repurpose: "Shorts, LinkedIn" },
      { title: `Free ${Niche} Tools Better Than Paid Ones`, viralScore: 84, why: "'Free' + comparison drives high CTR.", hook: "Stop paying for these — the free versions win.", format: "Comparison", repurpose: "Shorts, carousel" },
      { title: `5 ${Niche} Mistakes That Kill Your Growth`, viralScore: 81, why: "Mistake framing drives strong retention.", hook: "You're probably making mistake #3 right now.", format: "Listicle", repurpose: "X thread, Shorts" },
    ],
    channel,
    grounded,
    live: false,
  };
}
