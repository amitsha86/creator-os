import type { YouTubeStats, YouTubeVideo } from "@/lib/youtube";

// A transparent, deterministic Growth Score computed from a channel's REAL public
// stats — no LLM, so it's fast enough to run on a dashboard load. It's an estimate
// (the ScoreExplainer says so), built from three observable signals:
//   • Reach        — subscriber base (log-scaled)
//   • Consistency  — how many recent uploads we can see
//   • Momentum     — recent average views vs. the channel's lifetime average
// Replace/extend with richer signals (CTR, watch time) once OAuth analytics exist.

export interface ChannelGrowth {
  score: number; // 1–99
  trend: string;
  avgViews: number;
  topVideo: { title: string; views: number } | null;
  momentumMultiple: number; // recent avg ÷ lifetime avg
  mainOpportunity: string;
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

function truncate(s: string, n: number) {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

export function computeGrowth(stats: YouTubeStats, videos: YouTubeVideo[]): ChannelGrowth {
  const subs = stats.subscribers ?? 0;
  const lifetimeAvg = stats.videos > 0 ? stats.views / stats.videos : 0;
  const recent = videos.filter((v) => Number.isFinite(v.views));
  const recentAvg = recent.length ? recent.reduce((s, v) => s + v.views, 0) / recent.length : lifetimeAvg;
  const topVideo = recent.length ? recent.reduce((a, b) => (b.views > a.views ? b : a)) : null;
  const momentumMultiple = lifetimeAvg > 0 ? recentAvg / lifetimeAvg : 1;

  const reach = clamp(Math.log10(subs + 1) * 5.5, 0, 40); // ~1M subs ≈ full
  const consistency = clamp((recent.length / 10) * 25, 0, 25); // 10 visible uploads ≈ full
  const momentum = clamp(momentumMultiple * 17.5, 0, 35); // 2× lifetime avg ≈ full
  const score = Math.round(clamp(reach + consistency + momentum, 1, 99));

  const trend =
    momentumMultiple >= 1.2 ? "trending upward" : momentumMultiple >= 0.85 ? "holding steady" : "losing momentum lately";

  const topMult = topVideo && lifetimeAvg > 0 ? topVideo.views / lifetimeAvg : 0;
  const mainOpportunity =
    topVideo && topMult >= 1.3
      ? `"${truncate(topVideo.title, 46)}" did ${topMult.toFixed(1)}x your average — make more like it.`
      : "Recent uploads cluster near your average — test a sharper hook or a new format.";

  return {
    score,
    trend,
    avgViews: Math.round(recentAvg || lifetimeAvg),
    topVideo,
    momentumMultiple,
    mainOpportunity,
  };
}
