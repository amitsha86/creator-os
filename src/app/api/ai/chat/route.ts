import { NextRequest, NextResponse } from "next/server";
import { generate } from "@/lib/ai";

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const prompt = `The creator asks the Creora assistant: "${message}". Answer concisely and helpfully, grounded in their channel context. If they ask what to make, recommend from their opportunity feed.`;
  const { text, live } = await generate(prompt, { maxTokens: 700 });
  return NextResponse.json({ text, live });
}
