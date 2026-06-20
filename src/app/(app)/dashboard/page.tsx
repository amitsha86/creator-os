import { kpis, platforms, channel } from "@/lib/data";
import { getContent, getRecommendations, getSettings } from "@/lib/store";
import { fetchChannelStats, youtubeEnabled } from "@/lib/youtube";
import { ConnectChannel } from "@/components/connect-channel";
import { StatCard, Card, Spark, Badge } from "@/components/ui/primitives";
import { PlatformIcon, platformLabel } from "@/components/ui/platform";
import { compact, money } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Target, Sparkles, Youtube } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const content = await getContent(userId);
  const recommendations = await getRecommendations();
  const { youtubeHandle } = await getSettings(userId);
  const ytEnabled = youtubeEnabled();
  const yt = youtubeHandle ? await fetchChannelStats(youtubeHandle) : null;
  const goalPct = Math.round((channel.goal.current / channel.goal.target) * 100);
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Good morning, Maya</h1>
          <p className="mt-1 text-sm text-ink-muted">Here's your business at a glance — {channel.niche}.</p>
        </div>
        <Badge tone="brand"><Sparkles size={12} /> Growth Score {channel.growthScore}</Badge>
      </div>

      {/* YouTube live */}
      <Card>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-ink">
            <Youtube size={16} className="text-rose" /> YouTube {yt && <Badge tone="mint">live</Badge>}
          </div>
          <ConnectChannel current={youtubeHandle} />
        </div>
        {yt ? (
          <>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {([["Subscribers", yt.subscribers], ["Total views", yt.views], ["Videos", yt.videos]] as const).map(([k, v]) => (
                <div key={k} className="rounded-lg border border-line bg-bg-soft p-3">
                  <div className="text-xs text-ink-faint">{k}</div>
                  <div className="mt-1 text-2xl font-semibold text-ink">{v == null ? "Hidden" : compact(Number(v))}</div>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-ink-faint">{yt.title} · {yt.handle} · live from YouTube</p>
          </>
        ) : youtubeHandle && !ytEnabled ? (
          <p className="mt-3 text-sm text-amber">Channel saved ({youtubeHandle}), but no YouTube API key is set yet. Add YOUTUBE_API_KEY in Vercel to pull live stats.</p>
        ) : youtubeHandle ? (
          <p className="mt-3 text-sm text-ink-faint">Couldn&apos;t fetch stats for {youtubeHandle} — double-check the handle or channel ID.</p>
        ) : (
          <p className="mt-3 text-sm text-ink-faint">Connect your channel above to see live subscriber, view, and video counts.</p>
        )}
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {kpis.map((k) => <StatCard key={k.label} {...k} />)}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Goal */}
        <Card className="lg:col-span-1">
          <div className="flex items-center gap-2 text-sm font-medium text-ink"><Target size={15} className="text-brand-soft" /> Goal</div>
          <p className="mt-3 text-sm text-ink-muted">{channel.goal.label}</p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-ink">{compact(channel.goal.current)}</span>
            <span className="text-sm text-ink-faint">/ {compact(channel.goal.target)}</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-bg-elevated">
            <div className="h-full rounded-full bg-brand" style={{ width: `${goalPct}%` }} />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-ink-faint">{goalPct}% complete</span>
            <Badge tone="mint">{channel.goal.pace}</Badge>
          </div>
        </Card>

        {/* Platforms */}
        <Card className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-ink">Platforms</span>
            <span className="text-xs text-ink-faint">followers · 28-day views</span>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-3">
            {platforms.map((p) => (
              <div key={p.platform} className="flex items-center gap-3">
                <PlatformIcon platform={p.platform} size={18} />
                <div className="min-w-0">
                  <div className="text-sm text-ink">{compact(p.followers)}</div>
                  <div className="text-xs text-ink-faint">{compact(p.views)} views</div>
                </div>
                <span className={p.delta >= 0 ? "ml-auto text-xs text-mint" : "ml-auto text-xs text-rose"}>{p.delta > 0 ? "+" : ""}{p.delta}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Coach recommendations + In production */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-medium text-ink"><Sparkles size={15} className="text-brand-soft" /> This week's moves</span>
            <Link href="/coach" className="flex items-center gap-1 text-xs text-brand-soft hover:underline">Open Coach <ArrowRight size={12} /></Link>
          </div>
          <div className="space-y-2.5">
            {recommendations.slice(0, 3).map((r) => (
              <div key={r.id} className="rounded-lg border border-line bg-bg-soft p-3">
                <p className="text-sm text-ink">{r.action}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge tone="brand">Impact {r.impact}</Badge>
                  <Badge>Effort {r.effort}</Badge>
                  <span className="ml-auto text-xs text-ink-faint">{r.module}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-ink">In production</span>
            <Link href="/pipeline" className="flex items-center gap-1 text-xs text-brand-soft hover:underline">Pipeline <ArrowRight size={12} /></Link>
          </div>
          <div className="space-y-1.5">
            {content.filter((c) => !["Idea", "Analyze"].includes(c.stage)).slice(0, 6).map((c) => (
              <div key={c.id} className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-bg-hover">
                <PlatformIcon platform={c.platform} size={14} />
                <span className="truncate text-sm text-ink">{c.title}</span>
                <Badge>{c.stage}</Badge>
                <span className="ml-auto text-xs text-ink-faint">{c.assignee}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
