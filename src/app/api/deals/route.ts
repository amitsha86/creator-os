import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getDeals, createDeal } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ deals: [] }, { status: 401 });
  try {
    return NextResponse.json({ deals: await getDeals(userId) });
  } catch (e: any) {
    return NextResponse.json({ deals: [], error: e?.message ?? "db error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json();
  if (!body?.brand?.trim()) return NextResponse.json({ error: "brand required" }, { status: 400 });
  try {
    const deal = await createDeal(userId, body);
    return NextResponse.json({ deal });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "db error" }, { status: 500 });
  }
}
