// Investor-grade funnel + retention metrics Creora needs to prove creator
// willingness to pay and investor readiness. These are DEFINITIONS for future
// measurement — they are computed from the analytics events in `src/lib/analytics.ts`.
// Do not surface fabricated values publicly; only show metrics backed by real data.

export interface InvestorMetric {
  key: string;
  label: string;
  description: string;
  /** "funnel" | "retention" | "usage" | "revenue" — for grouping in a future dashboard. */
  group: "funnel" | "retention" | "usage" | "revenue";
  /** How it's expressed once measured. */
  unit: "count" | "percent" | "ratio" | "duration";
}

export const INVESTOR_METRICS: InvestorMetric[] = [
  { key: "visitors", label: "Visitors", description: "Unique visitors to public pages.", group: "funnel", unit: "count" },
  { key: "audit_conversion_rate", label: "Audit conversion rate", description: "Share of visitors who start an audit.", group: "funnel", unit: "percent" },
  { key: "audit_completion_rate", label: "Audit completion rate", description: "Share of started audits that finish loading and show a result.", group: "funnel", unit: "percent" },
  { key: "partial_result_view_rate", label: "Partial result view rate", description: "Share of audits where the partial result is viewed.", group: "funnel", unit: "percent" },
  { key: "signup_after_audit_rate", label: "Signup after audit rate", description: "Share of audit viewers who create an account.", group: "funnel", unit: "percent" },
  { key: "upgrade_click_rate", label: "Upgrade click rate", description: "Share of users who click an upgrade CTA.", group: "revenue", unit: "percent" },
  { key: "paid_conversion_rate", label: "Paid conversion rate", description: "Share of users who become paying customers.", group: "revenue", unit: "percent" },
  { key: "return_rate_7d", label: "7-day return rate", description: "Share of users who return within 7 days.", group: "retention", unit: "percent" },
  { key: "retention_30d", label: "30-day retention", description: "Share of users still active after 30 days.", group: "retention", unit: "percent" },
  { key: "avg_audits_per_user", label: "Average audits per user", description: "Mean audits generated per user.", group: "usage", unit: "ratio" },
  { key: "avg_scripts_per_user", label: "Average scripts per user", description: "Mean scripts generated per user.", group: "usage", unit: "ratio" },
  { key: "avg_repurpose_packs_per_user", label: "Average repurpose packs per user", description: "Mean repurpose packs generated per user.", group: "usage", unit: "ratio" },
  { key: "avg_competitors_per_user", label: "Average competitors tracked per user", description: "Mean competitor channels tracked per user.", group: "usage", unit: "ratio" },
  { key: "time_to_first_value", label: "Time to first value", description: "Time from landing to first audit result.", group: "funnel", unit: "duration" },
  { key: "weekly_active_creators", label: "Weekly active creators", description: "Distinct creators active in a 7-day window.", group: "retention", unit: "count" },
];

// NOTE: These metrics are required to prove creator willingness to pay and investor
// readiness. Build the computation layer (from analytics events) before exposing any
// dashboard. Never display placeholder/fake numbers publicly.
