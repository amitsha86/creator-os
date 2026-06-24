import Anthropic from "@anthropic-ai/sdk";

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

export function aiEnabled() {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

const SYSTEM = `You are the Creora AI engine — a team of expert content strategists for a YouTube/creator business.
The creator is "Maya Builds": a tech & maker channel (studio setups, budget gear), 85k YouTube subs, growing ~3%/mo, witty and practical voice.
Be specific, concrete, and useful. Prefer punchy, high-retention language. Never pad. Output clean text the creator can use immediately.`;

/**
 * Calls Anthropic if a key is present; otherwise returns a high-quality
 * deterministic fallback so the product is fully usable with zero setup.
 */
export async function generate(prompt: string, opts: { maxTokens?: number; system?: string; model?: string; timeoutMs?: number } = {}) {
  if (!aiEnabled()) return { text: fallback(prompt), live: false };
  try {
    // No retries + an explicit timeout below the serverless function limit, so a
    // slow call degrades to the deterministic fallback instead of a 504.
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
      maxRetries: 0,
      timeout: opts.timeoutMs ?? 22000,
    });
    const msg = await client.messages.create({
      model: opts.model ?? MODEL,
      max_tokens: opts.maxTokens ?? 1024,
      system: opts.system ?? SYSTEM,
      messages: [{ role: "user", content: prompt }],
    });
    const text = msg.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n");
    return { text, live: true };
  } catch (e: any) {
    return { text: `${fallback(prompt)}\n\n(Note: live AI call failed — ${e?.message ?? "unknown error"}. Showing fallback.)`, live: false };
  }
}

// ---------------- Fallback content (used when no API key) ----------------
function fallback(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes("title")) {
    return [
      "1. I Built a Pro Studio for $187 (And You Can't Tell)",
      "2. Everyone's Wrong About Expensive Camera Gear",
      "3. The $5,000 Setup vs My $187 One — Same Result?",
      "4. Why Your Studio Looks Cheap (3 Fixes Under $50)",
      "5. I Replaced My Whole Rig With AI Tools",
    ].join("\n");
  }
  if (p.includes("hook")) {
    return [
      "• Everyone says you need $5,000 to look pro. I did it for $187 — and most people can't tell.",
      "• Stop buying expensive gear. This $24 light just beat my $400 one in a blind test.",
      "• I gave myself one rule: nothing on this desk costs over $50. Here's what happened.",
    ].join("\n");
  }
  if (p.includes("script") || p.includes("outline")) {
    return `HOOK (0:00–0:15)\nEveryone says you need $5,000 to make videos look pro. I built this entire studio for $187 — and by the end of this video, you won't be able to tell the difference.\n\nSETUP (0:15–1:00)\nHere's the problem with every "budget setup" video: they secretly use a $2,000 camera. Not this one. My rules: nothing over $50, everything fits on this desk.\n\nBUILD (1:00–4:30)\nStart with lighting — the thing that actually makes footage look expensive. A $24 panel vs the "free" window everyone recommends. Watch this side-by-side test...\n\nPAYOFF (4:30–6:00)\nThe reveal: $187 setup vs $5,000 rig, same shot. The difference was never the budget — it's three techniques I'll show you now.`;
  }
  if (p.includes("coach") || p.includes("growth") || p.includes("recommend")) {
    return `This week's headline: your last 3 winners all used a budget/contrarian hook — lean into it.\n\nTop 3 moves:\n1. Make "AI tools that replaced my $5k gear" next (Opportunity 85, Saturation 24). It matches your winning pattern with fresh, uncrowded demand.\n2. Re-cut the first 15s of "Productivity hacks tested" — its hook scored 58, well below your 80 baseline. A stakes-forward open should recover ~15% retention.\n3. Move Shorts to 18:00 — your TikTok engagement runs 31% higher in that window.\n\nWatch-out: @deskdaily is growing 14%/mo with a 3/week cadence in your exact niche. Defend the "studio setup" topic before it saturates.`;
  }
  if (p.includes("tweet") || p.includes("thread")) {
    return "1/ I built a pro studio for $187. Here's the exact gear + the 3 techniques that matter more than money 🧵\n2/ Lighting first. A $24 panel beat my old $400 one in a blind test...\n3/ ...";
  }
  if (p.includes("linkedin")) {
    return "I spent two years thinking better gear would make better videos.\n\nThen I built a studio for $187 that most people can't tell apart from a $5,000 setup.\n\nThe lesson: technique compounds, gear depreciates. Here's what actually moved the needle 👇";
  }
  return "Here's a strong, on-brand draft tailored to Maya Builds. Add your Anthropic API key in .env.local to generate live, fully-customized output.";
}
