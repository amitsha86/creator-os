import { NextRequest, NextResponse } from "next/server";
import { generate } from "@/lib/ai";

export async function POST(req: NextRequest) {
  const { type, topic } = await req.json();
  const map: Record<string, string> = {
    titles: `Write 5 high-CTR YouTube titles for a video about: "${topic}". One per line, numbered.`,
    hooks: `Write 3 punchy 0–15s video hooks for: "${topic}". One per line, start each with "• ".`,
    script: `Write a tight, high-retention long-form video outline (HOOK, SETUP, BUILD, PAYOFF) for: "${topic}".`,
    tweet: `Write the opening of an engaging X thread for: "${topic}".`,
    linkedin: `Write an engaging LinkedIn post for: "${topic}".`,
    blog: `Write a blog intro + section outline for: "${topic}".`,
    repurpose: `Repurpose a long-form video titled "${topic}" into a platform-native content pack. Output clearly labeled sections: TikTok/Reels (3 hook lines), Instagram (1 caption + 3 hashtags), X thread (5 tweets), LinkedIn (1 short post), Blog (title + 3 section headers). Keep each piece tight and ready to post.`,
    outreach: `Write a personalized brand-sponsorship outreach email from a creator in the "${topic}" niche to a relevant brand. Warm, specific, and credible, with a clear call to action and a [rate placeholder]. Keep it under 160 words.`,
    mediakit: `Create a creator media-kit one-pager in markdown for a "${topic}" creator. Sections: Audience snapshot, Top platforms, Engagement highlights, Past brand wins, Partnership options & rates. Use [bracketed placeholders] where real metrics go.`,
    research: `You are the creator's research assistant. Below is their question followed by their saved research items. Answer concisely with 2-4 bullet takeaways, citing the relevant saved items by title where useful. If the saved items don't cover it, say so briefly and add your best general guidance.\n\n${topic}`,
  };
  const prompt = map[type] ?? `Generate ${type} content for: "${topic}".`;
  const { text, live } = await generate(prompt, { maxTokens: 900 });
  return NextResponse.json({ text, live });
}
