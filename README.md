# CreatorOS

The operating system for the creator economy — a Next.js 15 implementation of the CreatorOS product (see the Master PRD in the parent folder). All 15 modules are navigable, driven by a seeded data layer, with real Anthropic AI wired into the marquee flows.

## Quick start

```bash
cd creator-os
npm install
cp .env.example .env.local   # optional — add your key for live AI
npm run dev                  # http://localhost:3000
```

The app runs fully **without** an API key: AI features return high-quality, on-brand fallback responses. Add a key to go live:

```bash
# .env.local
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-sonnet-4-6   # optional override
```

## What's wired to live AI
- **Content Brain** — titles, hooks, scripts, threads, posts (`/api/ai/generate`)
- **Script Studio** — live retention/hook/emotional/viral scoring (`/api/ai/score`)
- **Growth Coach** — weekly strategist memo (`/api/ai/coach`)
- **Viral Intelligence** — "what should I create next?" (`/api/ai/opportunities`)
- **AI Assistant panel** — chat grounded in channel context (`/api/ai/chat`)

## The 15 modules
Dashboard · Viral Intelligence · Competitors · Research · Content Brain · Script Studio · Thumbnails · Pipeline (drag-and-drop) · Calendar · Repurpose · CRM · Revenue · Team · Growth Coach · Knowledge Vault

## Stack
Next.js 15 (App Router) · React 19 · TypeScript · Tailwind · Anthropic SDK · lucide-react. Dark-first, Linear/Stripe-inspired UI.

## Architecture notes
- `src/lib/data.ts` — typed seed + in-memory store. Production target is PostgreSQL + ClickHouse + Pinecone (see PRD §7–9). Swap this module for a real DB without touching the UI.
- `src/lib/ai.ts` — Anthropic wrapper with the model router stub and graceful fallback.
- `src/app/api/ai/*` — server route handlers (where real model calls happen; keys never reach the client).
- `src/app/(app)/*` — the 15 module pages; `src/components/shell/*` — sidebar, topbar, AI panel.

## Next steps to production
1. Replace the in-memory store with Postgres (Prisma) + the schema in PRD §7.
2. Add Clerk auth + org/workspace multi-tenancy.
3. Add platform OAuth connectors (YouTube first) + ingestion into ClickHouse.
4. Move heavy AI/media work to BullMQ workers; add the orchestrator (PRD §9).
