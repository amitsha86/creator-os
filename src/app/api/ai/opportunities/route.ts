import { NextRequest, NextResponse } from "next/server";
import { generate } from "@/lib/ai";

export async function POST(req: NextRequest) {
  const { niche } = await req.json().catch(() => ({ niche: "tech & maker" }));
  const prompt = `As the Research agent, suggest 3 fresh video opportunities for a ${niche || "tech & maker"} creator. For each: a title, a one-line "why now", and rough Viral/Opportunity/Saturation scores (0-100). Keep it tight.`;
  const { text, live } = await generate(prompt, { maxTokens: 600 });
  return NextResponse.json({ text, live });
}
