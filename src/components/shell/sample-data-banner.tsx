"use client";
import { useState } from "react";
import Link from "next/link";
import { Sparkles, X } from "lucide-react";

export function SampleDataBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div className="flex items-center gap-3 border-b border-line bg-bg-soft px-6 py-2.5 text-sm">
      <Sparkles size={15} className="shrink-0 text-brand-soft" />
      <span className="min-w-0 text-ink-muted">
        You&apos;re exploring Creora with{" "}
        <span className="font-medium text-ink">sample data</span> — connect your
        channel to see your own numbers.
      </span>
      <Link href="/dashboard#connect" className="btn-primary ml-auto h-7 shrink-0">
        Connect channel
      </Link>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="btn-subtle h-7 w-7 shrink-0 !px-0"
      >
        <X size={14} />
      </button>
    </div>
  );
}
