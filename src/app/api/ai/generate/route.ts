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
  };
  const prompt = map[type] ?? `Generate ${type} content for: "${topic}".`;
  const { text, live } = await generate(prompt, { maxTokens: 900 });
  return NextResponse.json({ text, live });
}
