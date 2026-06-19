// DB-backed store.
// - User-owned data (content, deals, vault) is scoped per Clerk user (ownerId) and
//   seeded for each user on first use.
// - Reference/intelligence data (research, calendar, competitors, opportunities,
//   team, recommendations) is shared across the workspace, seeded once globally.
// Every getter falls back to seed data if the DB is briefly unavailable.
import { prisma } from "@/lib/db";
import {
  content as seedContent,
  deals as seedDeals,
  vault as seedVault,
  research as seedResearch,
  calendarPosts as seedCalendar,
  competitors as seedCompetitors,
  opportunities as seedOpportunities,
  team as seedTeam,
  recommendations as seedRecs,
  type ContentItem, type Deal, type VaultItem, type ResearchItem,
  type CalendarPost, type Competitor, type Opportunity, type TeamMember,
  type Recommendation, type Stage,
} from "@/lib/data";
import { fetchChannelStats } from "@/lib/youtube";

// ---------------- shared (global) reference data ----------------
let globalSeedPromise: Promise<void> | null = null;
async function seedTable(count: () => Promise<number>, create: () => Promise<unknown>) {
  if ((await count()) === 0) await create();
}
async function ensureGlobalSeeded() {
  if (!globalSeedPromise) {
    globalSeedPromise = (async () => {
      await seedTable(() => prisma.research.count(), () => prisma.research.createMany({ data: seedResearch.map((r) => ({ ...r })), skipDuplicates: true }));
      await seedTable(() => prisma.calendarPost.count(), () => prisma.calendarPost.createMany({ data: seedCalendar.map((c) => ({ ...c })), skipDuplicates: true }));
      await seedTable(() => prisma.competitor.count(), () => prisma.competitor.createMany({ data: seedCompetitors.map((c) => ({ ...c })), skipDuplicates: true }));
      await seedTable(() => prisma.opportunity.count(), () => prisma.opportunity.createMany({ data: seedOpportunities.map((o) => ({ ...o })), skipDuplicates: true }));
      await seedTable(() => prisma.teamMember.count(), () => prisma.teamMember.createMany({ data: seedTeam.map((t) => ({ id: t.name, ...t })), skipDuplicates: true }));
      await seedTable(() => prisma.recommendation.count(), () => prisma.recommendation.createMany({ data: seedRecs.map((r) => ({ ...r })), skipDuplicates: true }));
    })().catch((e) => { globalSeedPromise = null; throw e; });
  }
  return globalSeedPromise;
}

// ---------------- per-user owned data ----------------
async function ensureUserSeeded(ownerId: string) {
  const count = await prisma.content.count({ where: { ownerId } });
  if (count > 0) return;
  await prisma.$transaction([
    prisma.content.createMany({ data: seedContent.map((c) => ({
      ownerId, title: c.title, type: c.type, stage: c.stage, assignee: c.assignee,
      priority: c.priority, due: c.due, platform: c.platform,
      retention: c.scores?.retention ?? null, hook: c.scores?.hook ?? null,
      emotional: c.scores?.emotional ?? null, viral: c.scores?.viral ?? null,
      predictedCtr: c.predictedCtr ?? null,
    })) }),
    prisma.deal.createMany({ data: seedDeals.map((d) => ({ ownerId, brand: d.brand, stage: d.stage, value: d.value, contact: d.contact, deliverables: d.deliverables, health: d.health })) }),
    prisma.vaultItem.createMany({ data: seedVault.map((v) => ({ ownerId, kind: v.kind, title: v.title, perf: v.perf, tags: v.tags })) }),
  ]);
}

function toContentItem(row: any): ContentItem {
  return {
    id: row.id, title: row.title, type: row.type, stage: row.stage as Stage,
    assignee: row.assignee, priority: row.priority, due: row.due, platform: row.platform,
    predictedCtr: row.predictedCtr ?? undefined,
    scores: row.retention != null
      ? { retention: row.retention, hook: row.hook, emotional: row.emotional, viral: row.viral }
      : undefined,
  };
}

export async function getContent(ownerId: string): Promise<ContentItem[]> {
  try {
    await ensureUserSeeded(ownerId);
    const rows = await prisma.content.findMany({ where: { ownerId }, orderBy: { createdAt: "asc" } });
    return rows.map(toContentItem);
  } catch { return seedContent; }
}
export async function moveContent(id: string, ownerId: string, stage: Stage): Promise<boolean> {
  const res = await prisma.content.updateMany({ where: { id, ownerId }, data: { stage } });
  return res.count > 0;
}
export async function createContent(ownerId: string, data: { title: string; type?: string; stage?: Stage; platform?: string; priority?: string }): Promise<ContentItem> {
  const row = await prisma.content.create({
    data: {
      ownerId, title: data.title, type: data.type ?? "Long-form", stage: data.stage ?? "Idea",
      assignee: "Maya", priority: data.priority ?? "Med", due: "", platform: data.platform ?? "youtube",
    },
  });
  return toContentItem(row);
}
export async function createDeal(ownerId: string, data: { brand: string; value?: number; contact?: string; deliverables?: string }): Promise<Deal> {
  const d = await prisma.deal.create({
    data: {
      ownerId, brand: data.brand, stage: "Prospect", value: data.value ?? 0,
      contact: data.contact ?? "", deliverables: data.deliverables ?? "", health: "On track",
    },
  });
  return { id: d.id, brand: d.brand, stage: d.stage as Deal["stage"], value: d.value, contact: d.contact, deliverables: d.deliverables, health: d.health as Deal["health"] };
}
export async function createVaultItem(ownerId: string, data: { kind: string; title: string; tags?: string[] }): Promise<VaultItem> {
  const v = await prisma.vaultItem.create({
    data: { ownerId, kind: data.kind, title: data.title, perf: 0, tags: data.tags ?? [] },
  });
  return { id: v.id, kind: v.kind as VaultItem["kind"], title: v.title, perf: v.perf, tags: v.tags };
}
export async function getDeals(ownerId: string): Promise<Deal[]> {
  try {
    await ensureUserSeeded(ownerId);
    const rows = await prisma.deal.findMany({ where: { ownerId }, orderBy: { createdAt: "asc" } });
    return rows.map((d: any) => ({ id: d.id, brand: d.brand, stage: d.stage, value: d.value, contact: d.contact, deliverables: d.deliverables, health: d.health }));
  } catch { return seedDeals; }
}
export async function getVault(ownerId: string): Promise<VaultItem[]> {
  try {
    await ensureUserSeeded(ownerId);
    const rows = await prisma.vaultItem.findMany({ where: { ownerId }, orderBy: { perf: "desc" } });
    return rows.map((v: any) => ({ id: v.id, kind: v.kind, title: v.title, perf: v.perf, tags: v.tags }));
  } catch { return seedVault; }
}

// ---------------- per-user settings ----------------
export async function getSettings(ownerId: string): Promise<{ youtubeHandle: string | null }> {
  try {
    const s = await prisma.userSettings.findUnique({ where: { ownerId } });
    return { youtubeHandle: s?.youtubeHandle ?? null };
  } catch {
    return { youtubeHandle: null };
  }
}
export async function setYoutubeHandle(ownerId: string, handle: string | null): Promise<void> {
  const value = handle?.trim() || null;
  await prisma.userSettings.upsert({
    where: { ownerId },
    create: { ownerId, youtubeHandle: value },
    update: { youtubeHandle: value },
  });
}

// ---------------- shared getters ----------------
export async function getResearch(): Promise<ResearchItem[]> {
  try { await ensureGlobalSeeded(); const rows = await prisma.research.findMany({ orderBy: { createdAt: "asc" } });
    return rows.map((r: any) => ({ id: r.id, kind: r.kind, title: r.title, source: r.source, summary: r.summary, collection: r.collection }));
  } catch { return seedResearch; }
}
export async function getCalendarPosts(): Promise<CalendarPost[]> {
  try { await ensureGlobalSeeded(); const rows = await prisma.calendarPost.findMany();
    return rows.map((c: any) => ({ id: c.id, title: c.title, platform: c.platform, day: c.day, time: c.time }));
  } catch { return seedCalendar; }
}
export async function getCompetitors(ownerId?: string): Promise<Competitor[]> {
  try {
    await ensureGlobalSeeded();
    const where = ownerId ? { OR: [{ ownerId: null }, { ownerId }] } : {};
    const rows = await prisma.competitor.findMany({ where, orderBy: { growth: "desc" } });
    return rows.map((c: any) => ({ id: c.id, handle: c.handle, platform: c.platform, subs: c.subs, growth: c.growth, cadence: c.cadence, topVideo: c.topVideo, topViews: c.topViews, thumbStyle: c.thumbStyle }));
  } catch { return seedCompetitors; }
}
export async function createCompetitor(ownerId: string, data: { handle: string }): Promise<Competitor> {
  const raw = data.handle.trim();
  const handle = raw.startsWith("@") || /^UC[\w-]{22}$/.test(raw) ? raw : `@${raw}`;
  const stats = await fetchChannelStats(raw);
  const row = await prisma.competitor.create({
    data: {
      id: globalThis.crypto?.randomUUID?.() ?? `${ownerId}-${Date.now()}`,
      ownerId,
      handle: stats?.handle ?? handle,
      platform: "youtube",
      subs: stats?.subscribers ?? 0,
      growth: 0,
      cadence: "Tracking",
      topVideo: stats?.title ?? "—",
      topViews: stats?.views ?? 0,
      thumbStyle: "—",
    },
  });
  return { id: row.id, handle: row.handle, platform: row.platform as Competitor["platform"], subs: row.subs, growth: row.growth, cadence: row.cadence, topVideo: row.topVideo, topViews: row.topViews, thumbStyle: row.thumbStyle };
}
export async function getOpportunities(): Promise<Opportunity[]> {
  try { await ensureGlobalSeeded(); const rows = await prisma.opportunity.findMany();
    return rows.map((o: any) => ({ id: o.id, title: o.title, niche: o.niche, viral: o.viral, opportunity: o.opportunity, saturation: o.saturation, momentum: o.momentum, why: o.why, examples: o.examples, format: o.format, spark: o.spark }));
  } catch { return seedOpportunities; }
}
export async function getTeam(): Promise<TeamMember[]> {
  try { await ensureGlobalSeeded(); const rows = await prisma.teamMember.findMany();
    return rows.map((t: any) => ({ name: t.name, role: t.role, initials: t.initials, color: t.color }));
  } catch { return seedTeam; }
}
export async function getRecommendations(): Promise<Recommendation[]> {
  try { await ensureGlobalSeeded(); const rows = await prisma.recommendation.findMany({ orderBy: { impact: "desc" } });
    return rows.map((r: any) => ({ id: r.id, action: r.action, impact: r.impact, effort: r.effort, module: r.module }));
  } catch { return seedRecs; }
}
