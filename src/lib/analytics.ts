// Lightweight, provider-agnostic analytics. Safe to call from any client component.
// - In development it logs to the console so funnel events are visible.
// - In production it forwards to PostHog or GA4 if either is present on `window`,
//   otherwise it no-ops. Missing analytics env/providers never breaks the app.
// Wire a real provider later by loading its snippet; no call sites need to change.

export type AnalyticsEvent =
  // Public funnel
  | "homepage_viewed"
  | "hero_cta_clicked"
  | "sample_audit_clicked"
  | "demo_dashboard_clicked"
  | "pricing_viewed"
  | "pricing_cta_clicked"
  | "trust_page_viewed"
  // Audit funnel
  | "audit_page_viewed"
  | "audit_started"
  | "audit_form_submitted"
  | "audit_loading_started"
  | "audit_partial_result_viewed"
  | "audit_unlock_clicked"
  | "audit_sample_clicked"
  | "audit_signup_clicked"
  // Demo
  | "demo_viewed"
  | "demo_generate_script_clicked"
  | "demo_script_preview_opened"
  | "demo_repurpose_clicked"
  | "demo_repurpose_preview_opened"
  | "demo_get_audit_clicked"
  // Sample audit
  | "sample_audit_viewed"
  | "sample_audit_get_audit_clicked"
  | "sample_audit_script_preview_viewed"
  // Conversion
  | "signup_started"
  | "signup_completed"
  | "upgrade_clicked"
  | "plan_selected"
  | "checkout_started"
  | "paid_conversion"
  // Retention / product usage
  | "content_idea_generated"
  | "script_generated"
  | "repurpose_pack_generated"
  | "competitor_added"
  | "calendar_plan_created"
  | "weekly_report_viewed";

export type AnalyticsProps = Record<string, string | number | boolean | null | undefined>;

// Never log credentials or secrets, even if a caller accidentally passes them.
const SENSITIVE_KEY = /token|secret|password|api[-_]?key|authorization|cookie/i;

function sanitize(props?: AnalyticsProps): AnalyticsProps {
  if (!props) return {};
  const out: AnalyticsProps = {};
  for (const [k, v] of Object.entries(props)) {
    if (SENSITIVE_KEY.test(k)) continue;
    out[k] = v;
  }
  return out;
}

export function trackEvent(event: AnalyticsEvent | (string & {}), properties?: AnalyticsProps): void {
  const props = sanitize(properties);
  try {
    if (typeof window === "undefined") return; // no-op during SSR
    const w = window as unknown as {
      posthog?: { capture?: (e: string, p?: AnalyticsProps) => void };
      gtag?: (...args: unknown[]) => void;
    };
    if (typeof w.posthog?.capture === "function") {
      w.posthog.capture(event, props);
      return;
    }
    if (typeof w.gtag === "function") {
      w.gtag("event", event, props);
      return;
    }
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.log(`[analytics] ${event}`, props);
    }
  } catch {
    // Analytics must never break the product experience.
  }
}
