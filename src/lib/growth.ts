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
  /** Specific, honest coaching actions derived from this channel's real data. */
  coach: string[];
  /** Recent uploads that beat the channel's average — formats worth repeating. */
  formats: { title: string; views: number; multiple: number }[];
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

  // "Viral Opportunities" for a connected channel = the channel's OWN recent uploads
  // that beat its average. Honest, real-data formats worth repeating — no invented trends.
  const formats = recent
    .filter((v) => lifetimeAvg > 0 && v.views > lifetimeAvg * 1.1)
    .sort((a, b) => b.views - a.views)
    .slice(0, 4)
    .map((v) => ({ title: v.title, views: v.views, multiple: v.views / lifetimeAvg }));

  // AI Growth Coach: 4 specific, honest actions derived from this channel's real signals.
  const coach: string[] = [];
  coach.push(
    topVideo
      ? `Double down on "${truncate(topVideo.title, 40)}" — it's your strongest recent format.`
      : "Find your next winner — your recent uploads perform within a narrow band, so it's time to test something new."
  );
  coach.push(
    momentumMultiple >= 1.1
      ? "Momentum is up — keep your current cadence and lean harder into what's working."
      : momentumMultiple >= 0.85
        ? "You're holding steady — a sharper hook or stronger thumbnail could tip you into growth."
        : "Recent uploads are below your average — revisit what made your best videos click and repeat it."
  );
  coach.push(
    topVideo
      ? `Repurpose "${truncate(topVideo.title, 34)}" into 3–5 Shorts to extend its reach.`
      : "Repurpose your best long-form video into 3–5 Shorts to extend its reach."
  );
  coach.push("Test a sharper hook in the first 10 seconds — it's the highest-leverage retention fix.");

  return {
    score,
    trend,
    avgViews: Math.round(recentAvg || lifetimeAvg),
    topVideo,
    momentumMultiple,
    mainOpportunity,
    coach,
    formats,
  };
}
