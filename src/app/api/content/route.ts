import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getContent, createContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ content: [] }, { status: 401 });
  try {
    return NextResponse.json({ content: await getContent(userId) });
  } catch (e: any) {
    return NextResponse.json({ content: [], error: e?.message ?? "db error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json();
  if (!body?.title?.trim()) return NextResponse.json({ error: "title required" }, { status: 400 });
  try {
    const item = await createContent(userId, body);
    return NextResponse.json({ item });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "db error" }, { status: 500 });
  }
}
