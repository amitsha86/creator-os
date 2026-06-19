"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Loader2 } from "lucide-react";

export function TrackChannelButton() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function add() {
    const handle = window.prompt("Track a YouTube channel — enter its @handle or channel ID:");
    if (!handle?.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/competitors", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ handle: handle.trim() }),
      });
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: "" }));
        window.alert(`Couldn't track that channel${error ? `: ${error}` : "."}`);
        return;
      }
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <button onClick={add} disabled={saving} className="btn-primary">
      {saving ? <><Loader2 size={14} className="animate-spin" /> Adding…</> : <><Plus size={14} /> Track channel</>}
    </button>
  );
}
