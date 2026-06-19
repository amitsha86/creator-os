import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Use the pooled connection in pgbouncer-compatible mode (no prepared statements).
// This avoids "cached plan must not change result type" errors after a column
// type change, and is the recommended setup for serverless + a connection pooler.
const rawUrl = process.env.POSTGRES_PRISMA_URL;
const pooledUrl =
  rawUrl && !rawUrl.includes("pgbouncer=true")
    ? rawUrl + (rawUrl.includes("?") ? "&" : "?") + "pgbouncer=true"
    : rawUrl;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    ...(pooledUrl ? { datasources: { db: { url: pooledUrl } } } : {}),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
