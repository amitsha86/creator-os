import type { ReactNode } from "react";
import Link from "next/link";

/** Polished empty state for any module page. Pass either action (node) or actionLabel+actionHref. */
export function EmptyState({
  icon, title, description, action, actionLabel, actionHref,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="card flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
      {icon && <div className="grid h-12 w-12 place-items-center rounded-full bg-bg-elevated text-brand">{icon}</div>}
      <div>
        <div className="text-base font-semibold text-ink">{title}</div>
        {description && <p className="mx-auto mt-1 max-w-sm text-sm text-ink-muted">{description}</p>}
      </div>
      {action ? <div className="mt-1">{action}</div> : actionLabel && actionHref ? (
        <Link href={actionHref} className="btn-primary mt-1">{actionLabel}</Link>
      ) : null}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="card p-5">
      <div className="h-4 w-1/3 animate-pulse rounded bg-bg-elevated" />
      <div className="mt-3 h-3 w-full animate-pulse rounded bg-bg-elevated" />
      <div className="mt-2 h-3 w-4/5 animate-pulse rounded bg-bg-elevated" />
      <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-bg-elevated" />
    </div>
  );
}

/** Generic loading skeleton — used by route loading.tsx fallbacks. */
export function LoadingState({ rows = 4 }: { rows?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: rows }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );
}
