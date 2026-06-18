import { NextResponse } from "next/server";
import { getRecommendations } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json({ recommendations: await getRecommendations() });
  } catch (e: any) {
    return NextResponse.json({ recommendations: [], error: e?.message ?? "db error" }, { status: 500 });
  }
}
