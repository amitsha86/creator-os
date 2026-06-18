import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getVault, createVaultItem } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ vault: [] }, { status: 401 });
  try {
    return NextResponse.json({ vault: await getVault(userId) });
  } catch (e: any) {
    return NextResponse.json({ vault: [], error: e?.message ?? "db error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json();
  if (!body?.title?.trim()) return NextResponse.json({ error: "title required" }, { status: 400 });
  try {
    const item = await createVaultItem(userId, { kind: body.kind ?? "Hook", title: body.title, tags: body.tags });
    return NextResponse.json({ item });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "db error" }, { status: 500 });
  }
}
