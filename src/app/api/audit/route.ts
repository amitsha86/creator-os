import { NextRequest, NextResponse } from "next/server";
import { runAudit, type AuditInput } from "@/lib/audit";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  let body: AuditInput = {};
  try {
    body = await req.json();
  } catch {
    // ignore — runAudit handles empty input gracefully
  }
  const result = await runAudit({
    url: body.url,
    niche: body.niche,
    goal: body.goal,
    competitors: body.competitors,
  });
  return NextResponse.json(result);
}
