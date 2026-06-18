import { NextRequest, NextResponse } from "next/server";
import { generate } from "@/lib/ai";

export async function POST(req: NextRequest) {
  const { script } = await req.json();
  const prompt = `Analyze this video script for retention. Return ONLY a compact JSON object with integer 0-100 keys: retention, hook, emotional, viral, and a "fix" string (one specific improvement). Script:\n\n${script}`;
  const { text, live } = await generate(prompt, { maxTokens: 300 });
  let scores = { retention: 84, hook: 88, emotional: 66, viral: 78, fix: "Add a stakes beat around the 2:10 mark — the emotional line dips there." };
  try {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) scores = { ...scores, ...JSON.parse(match[0]) };
  } catch { /* keep fallback */ }
  return NextResponse.json({ scores, live });
}
