"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Youtube, Loader2, Check } from "lucide-react";

export function ConnectChannel({ current }: { current: string | null }) {
  const router = useRouter();
  const [handle, setHandle] = useState(current ?? "");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  async function save() {
    setSaving(true);
    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ youtubeHandle: handle.trim() }),
      });
      setDone(true);
      setTimeout(() => setDone(false), 1500);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <div className="flex items-center gap-2">
        <Youtube size={16} className="text-rose" />
        <input
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") save(); }}
          placeholder="@yourchannel or channel ID"
          className="input w-64"
        />
      </div>
      <button onClick={save} disabled={saving} className="btn-primary">
        {saving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : done ? <><Check size={14} /> Saved</> : current ? "Update channel" : "Connect channel"}
      </button>
    </div>
  );
}
