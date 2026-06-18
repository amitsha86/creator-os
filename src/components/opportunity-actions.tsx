"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function OpportunityActions({ title, format }: { title: string; format: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState<"" | "idea" | "script">("");

  async function create(target: "idea" | "script") {
    setBusy(target);
    try {
      await fetch("/api/content", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title,
          stage: target === "script" ? "Script" : "Idea",
          type: format === "Short" ? "Short" : "Long-form",
        }),
      });
      router.push(target === "script" ? "/scripts" : "/pipeline");
    } catch {
      setBusy("");
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => create("idea")} disabled={!!busy} className="btn-primary">
        {busy === "idea" ? "Adding…" : "Turn into idea"}
      </button>
      <button onClick={() => create("script")} disabled={!!busy} className="btn-ghost">
        {busy === "script" ? "Adding…" : "Draft script"}
      </button>
    </div>
  );
}
