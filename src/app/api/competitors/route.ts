import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getCompetitors, createCompetitor } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ competitors: [] }, { status: 401 });
  try {
    return NextResponse.json({ competitors: await getCompetitors(userId) });
  } catch (e: any) {
    return NextResponse.json({ competitors: [], error: e?.message ?? "db error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json();
  if (!body?.handle?.trim()) return NextResponse.json({ error: "handle required" }, { status: 400 });
  try {
    const competitor = await createCompetitor(userId, { handle: body.handle });
    return NextResponse.json({ competitor });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "db error" }, { status: 500 });
  }
}
