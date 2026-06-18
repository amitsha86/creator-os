// DB-backed store for user-mutated data (content, deals, vault).
// Seeds Postgres from the seed module on first use, then reads/writes the DB.
import { prisma } from "@/lib/db";
import {
  content as seedContent,
  deals as seedDeals,
  vault as seedVault,
  type ContentItem,
  type Deal,
  type VaultItem,
  type Stage,
} from "@/lib/data";

let seedPromise: Promise<void> | null = null;

async function ensureSeeded() {
  if (!seedPromise) {
    seedPromise = (async () => {
      const count = await prisma.content.count();
      if (count > 0) return;
      await prisma.$transaction([
        prisma.content.createMany({
          data: seedContent.map((c) => ({
            id: c.id, title: c.title, type: c.type, stage: c.stage,
            assignee: c.assignee, priority: c.priority, due: c.due, platform: c.platform,
            retention: c.scores?.retention ?? null, hook: c.scores?.hook ?? null,
            emotional: c.scores?.emotional ?? null, viral: c.scores?.viral ?? null,
            predictedCtr: c.predictedCtr ?? null,
          })),
          skipDuplicates: true,
        }),
        prisma.deal.createMany({ data: seedDeals.map((d) => ({ ...d })), skipDuplicates: true }),
        prisma.vaultItem.createMany({ data: seedVault.map((v) => ({ ...v })), skipDuplicates: true }),
      ]);
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

export async function getContent(): Promise<ContentItem[]> {
  await ensureSeeded();
  const rows = await prisma.content.findMany({ orderBy: { createdAt: "asc" } });
  return rows.map(toContentItem);
}

export async function moveContent(id: string, stage: Stage): Promise<ContentItem | null> {
  await ensureSeeded();
  const row = await prisma.content.update({ where: { id }, data: { stage } });
  return toContentItem(row);
}

export async function getDeals(): Promise<Deal[]> {
  await ensureSeeded();
  const rows = await prisma.deal.findMany({ orderBy: { createdAt: "asc" } });
  return rows.map((d: any) => ({
    id: d.id, brand: d.brand, stage: d.stage as Deal["stage"], value: d.value,
    contact: d.contact, deliverables: d.deliverables, health: d.health as Deal["health"],
  }));
}

export async function getVault(): Promise<VaultItem[]> {
  await ensureSeeded();
  const rows = await prisma.vaultItem.findMany({ orderBy: { perf: "desc" } });
  return rows.map((v: any) => ({ id: v.id, kind: v.kind as VaultItem["kind"], title: v.title, perf: v.perf, tags: v.tags }));
}
