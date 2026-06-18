import { NextResponse } from "next/server";
import { generate } from "@/lib/ai";

export async function POST() {
  const prompt = `Act as the AI Growth Coach. Using the creator's recent performance (last 3 winners used budget/contrarian hooks; "Productivity hacks" hook scored 58; TikTok engagement is higher at 18:00; competitor @deskdaily is growing 14%/mo), write a weekly growth memo: a one-line headline insight, then the 3 highest-leverage moves (numbered, specific), then one watch-out.`;
  const { text, live } = await generate(prompt, { maxTokens: 700 });
  return NextResponse.json({ text, live });
}
