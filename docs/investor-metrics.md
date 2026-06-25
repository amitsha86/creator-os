# Investor Metrics

Definitions of the funnel and retention metrics Creora tracks to prove creator
willingness-to-pay and investor readiness. These are **measurement definitions
only** — Creora never displays fabricated numbers publicly. Values are populated
from real analytics events (see `src/lib/analytics.ts`) once a provider is wired
up. The typed catalogue lives in `src/types/metrics.ts` (`INVESTOR_METRICS`).

## Acquisition & activation
- **Visitors** — unique homepage/public-page viewers.
- **Audit start rate** — `audit_started / homepage_viewed`.
- **Audit completion rate** — `audit_partial_result_viewed / audit_form_submitted`.
- **Partial result view rate** — share of audit submissions that reach a rendered partial result.
- **Time to first value** — median time from landing to first partial audit result.

## Conversion
- **Signup-after-audit rate** — `signup_started / audit_partial_result_viewed`.
- **Upgrade click rate** — `upgrade_clicked / signup_completed`.
- **Paid conversion rate** — `paid_conversion / signup_completed`.

## Retention & engagement
- **7-day return rate** — users who return within 7 days of first audit.
- **30-day retention** — users active 30 days after signup.
- **Weekly active creators** — distinct creators taking a core action in a 7-day window.
- **Average audits per user.**
- **Average scripts generated per user.**
- **Average repurpose packs generated per user.**
- **Average competitors tracked per user.**

## Why these matter
Together these prove the two things investors need to see: (1) creators get value
fast and come back (activation + retention), and (2) that value converts to revenue
(signup → upgrade → paid). They are required to substantiate willingness-to-pay
before raising. Do not report any metric until it is measured from real events.
