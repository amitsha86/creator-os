import { NextRequest, NextResponse } from "next/server";
import { moveContent } from "@/lib/store";
import { STAGES, type Stage } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { stage } = await req.json();
  if (!STAGES.includes(stage as Stage)) {
    return NextResponse.json({ error: "invalid stage" }, { status: 400 });
  }
  try {
    const item = await moveContent(id, stage as Stage);
    return NextResponse.json({ item });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "db error" }, { status: 500 });
  }
}
