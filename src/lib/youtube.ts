// YouTube Data API v3 — public channel statistics via API key (no OAuth).
// Returns subscriber/view/video counts for a channel handle (@name) or channel ID (UC...).

export interface YouTubeStats {
  id: string;
  title: string;
  thumbnail: string;
  subscribers: number | null; // null if the channel hides its subscriber count
  views: number;
  videos: number;
  handle: string;
}

export interface YouTubeVideo {
  title: string;
  views: number;
  published: string; // ISO date
}

export function youtubeEnabled() {
  return Boolean(process.env.YOUTUBE_API_KEY);
}

export async function fetchChannelStats(handleOrId: string): Promise<YouTubeStats | null> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key || !handleOrId?.trim()) return null;
  const input = handleOrId.trim();
  const isId = /^UC[\w-]{22}$/.test(input);
  const param = isId
    ? `id=${encodeURIComponent(input)}`
    : `forHandle=${encodeURIComponent(input.replace(/^@/, ""))}`;
  const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&${param}&key=${key}`;
  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const data = await res.json();
    const item = data.items?.[0];
    if (!item) return null;
    const s = item.statistics ?? {};
    return {
      id: item.id ?? "",
      title: item.snippet?.title ?? input,
      thumbnail: item.snippet?.thumbnails?.default?.url ?? "",
      subscribers: s.hiddenSubscriberCount ? null : Number(s.subscriberCount ?? 0),
      views: Number(s.viewCount ?? 0),
      videos: Number(s.videoCount ?? 0),
      handle: input.startsWith("@") || isId ? input : `@${input}`,
    };
  } catch {
    return null;
  }
}

/**
 * Recent uploads for a channel ID (UC...), newest first, with view counts.
 * Used to ground the audit in the creator's actual videos. Returns [] if the
 * API key is missing or the calls fail — callers must degrade gracefully.
 */
export async function fetchRecentVideos(channelId: string, max = 10): Promise<YouTubeVideo[]> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key || !channelId) return [];
  try {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${encodeURIComponent(channelId)}&order=date&type=video&maxResults=${max}&key=${key}`;
    const sRes = await fetch(searchUrl, { next: { revalidate: 600 } });
    if (!sRes.ok) return [];
    const sData = await sRes.json();
    const items: any[] = sData.items ?? [];
    const ids = items.map((i) => i.id?.videoId).filter(Boolean);
    if (ids.length === 0) return [];

    // Pull view counts in one batched call.
    const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${ids.join(",")}&key=${key}`;
    const vRes = await fetch(statsUrl, { next: { revalidate: 600 } });
    const vData = vRes.ok ? await vRes.json() : { items: [] };
    return (vData.items ?? []).map((v: any) => ({
      title: v.snippet?.title ?? "",
      views: Number(v.statistics?.viewCount ?? 0),
      published: v.snippet?.publishedAt ?? "",
    }));
  } catch {
    return [];
  }
}
