"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function NewDealButton() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  async function add() {
    const brand = window.prompt("Brand / sponsor name:");
    if (!brand?.trim()) return;
    const valueStr = window.prompt("Deal value (USD):", "5000");
    setSaving(true);
    try {
      await fetch("/api/deals", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ brand: brand.trim(), value: Number(valueStr) || 0 }),
      });
      router.refresh();
    } finally {
      setSaving(false);
    }
  }
  return (
    <button onClick={add} disabled={saving} className="btn-primary">
      {saving ? "Adding…" : "+ New deal"}
    </button>
  );
}
