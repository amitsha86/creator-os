# Creator Performance Intelligence (the moat)

Creora's long-term advantage is **not** generic AI writing — every tool can do that.
The moat is a feedback loop that learns which recommendations creators actually
choose, which generated ideas become published content, and how Creora's predicted
scores compare to real-world performance.

## What we capture (over time)

- **Recommendation choices** — which ideas, hooks, titles, and thumbnails creators
  accept, edit, or dismiss (`RecommendationFeedback`).
- **Published outcomes** — which generated ideas become real uploads, and how they
  perform: views, CTR, watch time, engagement, subscribers gained
  (`CreatorPerformanceSignal`).
- **Niche patterns** — aggregated title/hook/thumbnail/format patterns and their
  observed performance per niche (`ContentPattern`).

Types live in `src/types/creator-performance.ts`.

## Why it compounds

1. Creora should learn which recommendations creators choose.
2. Creora should track which generated ideas become published content.
3. Creora should connect predicted scores to actual performance later.
4. Each loop makes the next recommendation sharper — a data advantage competitors
   without this loop cannot copy.

## Principles

- Do **not** collect sensitive data without consent.
- Do **not** claim performance impact until it is actually measured.
- Predicted scores are estimates and must be labeled as such until validated
  against real outcomes.

## Status / TODO

- [ ] Persist `CreatorPerformanceSignal`, `RecommendationFeedback`, `ContentPattern`
      via Prisma (+ an analytics store) — see `TODO(api)` in the types file.
- [ ] Backfill predicted-vs-actual once channel analytics are connected.
- [ ] Surface niche-level `ContentPattern` insights into the recommendation engine.
