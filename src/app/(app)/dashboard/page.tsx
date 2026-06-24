import { channel } from "@/lib/data";
import { getContent, getRecommendations, getCompetitors, getSettings } from "@/lib/store";
import { fetchChannelStats, youtubeEnabled } from "@/lib/youtube";
import { ConnectChannel } from "@/components/connect-channel";
import { Card, Badge } from "@/components/ui/primitives";
import { PlatformIcon } from "@/components/ui/platform";
import { nextBestIdea, viralOpportunities, growth, weeklyMetrics } from "@/data/mockCreoraData";
import { compact } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Sparkles, Swords, Flame, Youtube, Repeat } from "lucide-react";

export const dynamic = "force-dynamic";

function Spark({ data }: { data: number[] }) {
  const max = Math.max(...data, 1);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${30 - (v / max) * 26}`).join(" ");
  return (
    <svg viewBox="0 0 100 30" className="mt-2 h-8 w-full" preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke="#2463EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const repurposeChips = ["5 Shorts", "3 LinkedIn posts", "5 X posts", "1 newsletter", "1 blog post", "1 community post"];

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  const firstName = user?.firstName?.trim() || "there";

  const [content, recommendations, competitors, settings] = await Promise.all([
    getContent(userId),
    getRecommendations(),
    getCompetitors(userId),
    getSettings(userId),
  ]);
  const { youtubeHandle } = settings;
  const ytEnabled = youtubeEnabled();
  const yt = youtubeHandle ? await fetchChannelStats(youtubeHandle) : null;

  const rivals = competitors.filter((c) => !c.owned);
  const outperforming = rivals.filter((c) => c.growth >= 5).length || rivals.length;
  const topMover = [...rivals].sort((a, b) => b.growth - a.growth)[0];
  const inProduction = content.filter((c) => !["Idea", "Analyze"].includes(c.stage)).slice(0, 6);
  const coach = recommendations.slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">Hello {firstName} — here&apos;s what to create next.</h1>
          <p className="mt-1.5 text-sm text-ink-muted">{youtubeHandle ? `Your Creora command center for ${channel.niche}.` : "Connect your channel to see your real growth score and next ideas."}</p>
        </div>
        {youtubeHandle && <Badge tone="brand"><Sparkles size={12} /> Growth Score {channel.growthScore}</Badge>}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {youtubeHandle ? (
          <>
            {/* Growth Score */}
            <div className="rounded-[20px] p-6 shadow-card" style={{ background: "#0F172A" }}>
              <div className="text-sm text-[#CBD5E1]">Creator Growth Score</div>
              <div className="font-display mt-2 text-5xl font-semibold text-[#BEF264]">{channel.growthScore}<span className="text-xl text-[#CBD5E1]">/100</span></div>
              <div className="mt-2 text-sm text-[#E7EDF6]">{growth.trend}</div>
              <div className="mt-1 text-sm text-[#E7EDF6]">Main opportunity: <span className="text-[#FFFFFF]">{growth.opportunity}</span></div>
              <Link href="/coach" className="btn mt-4 w-full bg-[#BEF264] text-[#1A2E05] hover:bg-[#a3e635]">Open Growth Coach <ArrowRight size={15} /></Link>
            </div>

            {/* Next Best Idea */}
            <Card className="p-6 lg:col-span-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-ink"><Sparkles size={16} className="text-brand" /> Next Best Idea</div>
              <div className="font-display mt-2 text-2xl font-semibold text-ink">&ldquo;{nextBestIdea.title}&rdquo;</div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge tone="brand">Viral {nextBestIdea.viralScore}</Badge>
                <Badge>{nextBestIdea.format}</Badge>
              </div>
              <p className="mt-3 text-sm text-ink-muted">{nextBestIdea.why}</p>
              <Link href="/scripts" className="btn-primary mt-4">Generate Script <ArrowRight size={15} /></Link>
            </Card>
          </>
        ) : (
          /* Onboarding — no channel connected yet */
          <Card className="p-6 lg:col-span-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink"><Youtube size={16} className="text-rose" /> Connect your channel</div>
            <h2 className="font-display mt-2 text-2xl font-semibold text-ink">See your real Growth Score and next best idea.</h2>
            <p className="mt-2 max-w-2xl text-sm text-ink-muted">Add your YouTube channel and Creora pulls your real stats, then scores your growth and writes your next video. The cards below show sample data until you connect.</p>
            <div className="mt-4"><ConnectChannel current={youtubeHandle} /></div>
            <div className="mt-3"><Link href="/audit" className="text-sm font-medium text-brand hover:underline">Or run a full free audit →</Link></div>
          </Card>
        )}

        {/* Viral Opportunities */}
        <Card className="p-6 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-semibold text-ink"><Flame size={16} className="text-brand" /> Viral Opportunities</span>
            <Link href="/viral" className="flex items-center gap-1 text-xs text-brand hover:underline">Open Viral <ArrowRight size={12} /></Link>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {viralOpportunities.map((o) => (
              <div key={o.topic} className="rounded-2xl border border-line bg-bg-soft p-3">
                <div className="text-sm font-medium text-ink">{o.topic}</div>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  <Badge tone="mint">Trend {o.trend}</Badge>
                  <Badge>{o.saturation} saturation</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Competitor Radar (real data) */}
        <Card className="p-6">
          <div className="mb-1 flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-semibold text-ink"><Swords size={16} className="text-brand" /> Competitor Radar</span>
            <Link href="/competitors" className="flex items-center gap-1 text-xs text-brand hover:underline">Open <ArrowRight size={12} /></Link>
          </div>
          {rivals.length ? (
            <>
              <div className="font-display mt-2 text-3xl font-semibold text-ink">{outperforming}</div>
              <div className="text-sm text-ink-muted">competitors gaining fast this week</div>
              {topMover && (
                <div className="mt-3 rounded-2xl border border-line bg-bg-soft p-3 text-[13px]">
                  <div className="flex items-center gap-2 text-ink">
                    <PlatformIcon platform={topMover.platform} size={14} />
                    <span className="font-medium">{topMover.handle}</span>
                    <span className="ml-auto text-mint">+{topMover.growth}%</span>
                  </div>
                  <p className="mt-1.5 text-ink-muted">Top video: &ldquo;{topMover.topVideo}&rdquo; · {compact(topMover.topViews)} views</p>
                </div>
              )}
            </>
          ) : (
            <p className="mt-3 text-sm text-ink-faint">No competitors tracked yet. Add channels in Competitors to see who&apos;s gaining in your niche.</p>
          )}
        </Card>

        {/* AI Growth Coach (real recommendations) */}
        <Card className="p-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-semibold text-ink"><Sparkles size={16} className="text-brand" /> AI Growth Coach</span>
            <Link href="/coach" className="flex items-center gap-1 text-xs text-brand hover:underline">Open <ArrowRight size={12} /></Link>
          </div>
          <ul className="space-y-2 text-[14px] text-ink">
            {coach.map((r, i) => (
              <li key={r.id} className="flex gap-2">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#BEF264] text-[11px] font-bold text-[#1A2E05]">{i + 1}</span>
                {r.action}
              </li>
            ))}
          </ul>
        </Card>

        {/* Content Pipeline (real content) */}
        <Card className="p-6 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-ink">In Production</span>
            <Link href="/pipeline" className="flex items-center gap-1 text-xs text-brand hover:underline">Pipeline <ArrowRight size={12} /></Link>
          </div>
          {inProduction.length ? (
            <div className="grid gap-2 sm:grid-cols-2">
              {inProduction.map((c) => (
                <div key={c.id} className="flex items-center gap-2.5 rounded-2xl border border-line bg-bg-soft p-3">
                  <PlatformIcon platform={c.platform} size={14} />
                  <span className="truncate text-sm text-ink">{c.title}</span>
                  <Badge>{c.stage}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-ink-faint">Nothing in production yet — turn an idea into a script to get started.</p>
          )}
        </Card>

        {/* Repurpose */}
        <Card className="p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-ink"><Repeat size={16} className="text-brand" /> Repurpose Engine</div>
          <div className="mt-2 text-[13px] text-ink-muted">One video becomes:</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {repurposeChips.map((r) => <span key={r} className="chip">{r}</span>)}
          </div>
          <Link href="/repurpose" className="btn-ghost mt-4 w-full">Open Repurpose <ArrowRight size={14} /></Link>
        </Card>

        {/* YouTube live (real) */}
        <Card className="p-6 lg:col-span-3">
          <div id="connect" className="flex scroll-mt-20 flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <Youtube size={16} className="text-rose" /> YouTube {yt && <Badge tone="mint">live</Badge>}
            </div>
            <ConnectChannel current={youtubeHandle} />
          </div>
          {yt ? (
            <>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {([["Subscribers", yt.subscribers], ["Total views", yt.views], ["Videos", yt.videos]] as const).map(([k, v]) => (
                  <div key={k} className="rounded-2xl border border-line bg-bg-soft p-3">
                    <div className="text-xs text-ink-faint">{k}</div>
                    <div className="font-display mt-1 text-2xl font-semibold text-ink">{v == null ? "Hidden" : compact(Number(v))}</div>
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

        {/* Weekly Performance */}
        <Card className="p-6 lg:col-span-3">
          <div className="text-sm font-semibold text-ink">Weekly Performance</div>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {weeklyMetrics.map((m) => (
              <div key={m.label} className="rounded-2xl border border-line bg-bg-soft p-4">
                <div className="text-xs text-ink-faint">{m.label}</div>
                <div className="font-display mt-0.5 flex items-baseline gap-2 text-2xl font-semibold text-ink">{m.value}<span className="text-xs font-medium text-mint">{m.delta}</span></div>
                <Spark data={m.spark} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
