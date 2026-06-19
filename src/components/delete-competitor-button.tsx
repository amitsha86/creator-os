"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

export function DeleteCompetitorButton({ id, handle }: { id: string; handle: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (!window.confirm(`Stop tracking ${handle}?`)) return;
    setBusy(true);
    try {
      await fetch(`/api/competitors?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={remove}
      disabled={busy}
      title="Stop tracking"
      className="rounded-md p-1.5 text-ink-faint transition-colors hover:bg-bg-hover hover:text-rose"
    >
      {busy ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
    </button>
  );
}
