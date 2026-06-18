import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getContent } from "@/lib/store";

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
