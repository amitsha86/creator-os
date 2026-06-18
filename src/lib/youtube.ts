// YouTube Data API v3 — public channel statistics via API key (no OAuth).
// Returns subscriber/view/video counts for a channel handle (@name) or channel ID (UC...).

export interface YouTubeStats {
  title: string;
  thumbnail: string;
  subscribers: number | null; // null if the channel hides its subscriber count
  views: number;
  videos: number;
  handle: string;
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
