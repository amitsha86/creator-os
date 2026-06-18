// DB-backed store. Seeds Postgres from the seed module on first use (per table),
// then reads/writes the DB. Each getter falls back to seed data if the DB is
// briefly unavailable, so pages always render.
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

let seedPromise: Promise<void> | null = null;

async function seedTable(count: () => Promise<number>, create: () => Promise<unknown>) {
  if ((await count()) === 0) await create();
}

async function ensureSeeded() {
  if (!seedPromise) {
    seedPromise = (async () => {
      await seedTable(() => prisma.content.count(), () => prisma.content.createMany({
        data: seedContent.map((c) => ({
          id: c.id, title: c.title, type: c.type, stage: c.stage, assignee: c.assignee,
          priority: c.priority, due: c.due, platform: c.platform,
          retention: c.scores?.retention ?? null, hook: c.scores?.hook ?? null,
          emotional: c.scores?.emotional ?? null, viral: c.scores?.viral ?? null,
          predictedCtr: c.predictedCtr ?? null,
        })), skipDuplicates: true }));
      await seedTable(() => prisma.deal.count(), () => prisma.deal.createMany({ data: seedDeals.map((d) => ({ ...d })), skipDuplicates: true }));
      await seedTable(() => prisma.vaultItem.count(), () => prisma.vaultItem.createMany({ data: seedVault.map((v) => ({ ...v })), skipDuplicates: true }));
      await seedTable(() => prisma.research.count(), () => prisma.research.createMany({ data: seedResearch.map((r) => ({ ...r })), skipDuplicates: true }));
      await seedTable(() => prisma.calendarPost.count(), () => prisma.calendarPost.createMany({ data: seedCalendar.map((c) => ({ ...c })), skipDuplicates: true }));
      await seedTable(() => prisma.competitor.count(), () => prisma.competitor.createMany({ data: seedCompetitors.map((c) => ({ ...c })), skipDuplicates: true }));
      await seedTable(() => prisma.opportunity.count(), () => prisma.opportunity.createMany({ data: seedOpportunities.map((o) => ({ ...o })), skipDuplicates: true }));
      await seedTable(() => prisma.teamMember.count(), () => prisma.teamMember.createMany({ data: seedTeam.map((t) => ({ id: t.name, ...t })), skipDuplicates: true }));
      await seedTable(() => prisma.recommendation.count(), () => prisma.recommendation.createMany({ data: seedRecs.map((r) => ({ ...r })), skipDuplicates: true }));
    })().catch((e) => { seedPromise = null; throw e; });
  }
  return seedPromise;
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

// ---- Content (read + write) ----
export async function getContent(): Promise<ContentItem[]> {
  try {
    await ensureSeeded();
    const rows = await prisma.content.findMany({ orderBy: { createdAt: "asc" } });
    return rows.map(toContentItem);
  } catch { return seedContent; }
}
export async function moveContent(id: string, stage: Stage): Promise<ContentItem | null> {
  await ensureSeeded();
  const row = await prisma.content.update({ where: { id }, data: { stage } });
  return toContentItem(row);
}

// ---- Read-only getters (seed fallback on error) ----
export async function getDeals(): Promise<Deal[]> {
  try {
    await ensureSeeded();
    const rows = await prisma.deal.findMany({ orderBy: { createdAt: "asc" } });
    return rows.map((d: any) => ({ id: d.id, brand: d.brand, stage: d.stage, value: d.value, contact: d.contact, deliverables: d.deliverables, health: d.health }));
  } catch { return seedDeals; }
}
export async function getVault(): Promise<VaultItem[]> {
  try {
    await ensureSeeded();
    const rows = await prisma.vaultItem.findMany({ orderBy: { perf: "desc" } });
    return rows.map((v: any) => ({ id: v.id, kind: v.kind, title: v.title, perf: v.perf, tags: v.tags }));
  } catch { return seedVault; }
}
export async function getResearch(): Promise<ResearchItem[]> {
  try {
    await ensureSeeded();
    const rows = await prisma.research.findMany({ orderBy: { createdAt: "asc" } });
    return rows.map((r: any) => ({ id: r.id, kind: r.kind, title: r.title, source: r.source, summary: r.summary, collection: r.collection }));
  } catch { return seedResearch; }
}
export async function getCalendarPosts(): Promise<CalendarPost[]> {
  try {
    await ensureSeeded();
    const rows = await prisma.calendarPost.findMany();
    return rows.map((c: any) => ({ id: c.id, title: c.title, platform: c.platform, day: c.day, time: c.time }));
  } catch { return seedCalendar; }
}
export async function getCompetitors(): Promise<Competitor[]> {
  try {
    await ensureSeeded();
    const rows = await prisma.competitor.findMany();
    return rows.map((c: any) => ({ id: c.id, handle: c.handle, platform: c.platform, subs: c.subs, growth: c.growth, cadence: c.cadence, topVideo: c.topVideo, topViews: c.topViews, thumbStyle: c.thumbStyle }));
  } catch { return seedCompetitors; }
}
export async function getOpportunities(): Promise<Opportunity[]> {
  try {
    await ensureSeeded();
    const rows = await prisma.opportunity.findMany();
    return rows.map((o: any) => ({ id: o.id, title: o.title, niche: o.niche, viral: o.viral, opportunity: o.opportunity, saturation: o.saturation, momentum: o.momentum, why: o.why, examples: o.examples, format: o.format, spark: o.spark }));
  } catch { return seedOpportunities; }
}
export async function getTeam(): Promise<TeamMember[]> {
  try {
    await ensureSeeded();
    const rows = await prisma.teamMember.findMany();
    return rows.map((t: any) => ({ name: t.name, role: t.role, initials: t.initials, color: t.color }));
  } catch { return seedTeam; }
}
export async function getRecommendations(): Promise<Recommendation[]> {
  try {
    await ensureSeeded();
    const rows = await prisma.recommendation.findMany({ orderBy: { impact: "desc" } });
    return rows.map((r: any) => ({ id: r.id, action: r.action, impact: r.impact, effort: r.effort, module: r.module }));
  } catch { return seedRecs; }
}
