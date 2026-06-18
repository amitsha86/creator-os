import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { moveContent } from "@/lib/store";
import { STAGES, type Stage } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  const { stage } = await req.json();
  if (!STAGES.includes(stage as Stage)) {
    return NextResponse.json({ error: "invalid stage" }, { status: 400 });
  }
  try {
    const ok = await moveContent(id, userId, stage as Stage);
    return NextResponse.json({ ok });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "db error" }, { status: 500 });
  }
}
