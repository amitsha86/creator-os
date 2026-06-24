// Creora's long-term moat is creator-performance intelligence — learning which
// recommendations creators choose, which generated ideas become published content,
// and how predicted scores map to real performance. These types prepare for that
// data capture. They are NOT wired to storage yet.
// TODO(api): persist these via Prisma + an analytics store once infra is ready.
// Do not collect sensitive data without consent. Do not claim performance impact
// until it is actually measured.

/** A single observed link between a Creora recommendation and real-world results. */
export interface CreatorPerformanceSignal {
  creatorId: string;
  niche: string;
  platform: string;
  generatedIdeaId: string;
  selectedIdea: string;
  publishedUrl?: string;
  title: string;
  hook?: string;
  thumbnailDirection?: string;
  contentFormat?: string;
  repurposeOutputsCreated?: number;
  competitorPatternUsed?: string;
  predictedViralScore?: number;
  actualViews?: number;
  actualCtr?: number;
  actualWatchTime?: number;
  actualEngagement?: number;
  subscribersGained?: number;
  publishedAt?: string; // ISO
  measuredAt?: string; // ISO
}

/** How a creator responded to a specific recommendation — trains relevance over time. */
export interface RecommendationFeedback {
  recommendationId: string;
  userId: string;
  accepted: boolean;
  dismissed: boolean;
  edited: boolean;
  reason?: string;
  rating?: number; // 1–5
  createdAt: string; // ISO
}

/** Aggregated, niche-level patterns Creora learns from many signals. */
export interface ContentPattern {
  niche: string;
  format: string;
  titlePattern: string;
  hookPattern: string;
  thumbnailPattern: string;
  averageScore: number;
  usageCount: number;
  observedPerformance?: number;
}
