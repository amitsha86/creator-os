import { NextRequest, NextResponse } from "next/server";
import { runAudit, type AuditInput } from "@/lib/audit";
import { rateLimit } from "@/lib/rate-limit";

export const maxDuration = 30;

// Public, LLM-backed endpoint — throttle per client so a single IP can't rack up
// YouTube-quota + model-generation cost. 5 audits per 10 minutes is plenty for
// legitimate use (auditing a few channels) while blocking scripted abuse.
const AUDIT_LIMIT = 5;
const AUDIT_WINDOW_MS = 10 * 60 * 1000;

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip")?.trim() || "anon";
}

export async function POST(req: NextRequest) {
  const { ok, retryAfter } = rateLimit(`audit:${clientIp(req)}`, AUDIT_LIMIT, AUDIT_WINDOW_MS);
  if (!ok) {
    return NextResponse.json(
      { error: "rate_limited", retryAfter },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

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
