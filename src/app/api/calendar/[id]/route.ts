import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { moveCalendarPost } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  const { day } = await req.json();
  if (typeof day !== "number" || day < 0 || day > 6) {
    return NextResponse.json({ error: "invalid day" }, { status: 400 });
  }
  try {
    const ok = await moveCalendarPost(id, day);
    return NextResponse.json({ ok });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "db error" }, { status: 500 });
  }
}
