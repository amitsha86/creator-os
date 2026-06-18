import { NextResponse } from "next/server";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const content = await getContent();
    return NextResponse.json({ content });
  } catch (e: any) {
    return NextResponse.json({ content: [], error: e?.message ?? "db error" }, { status: 500 });
  }
}
