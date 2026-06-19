"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Lightbulb, Briefcase, PenLine, Swords, Loader2 } from "lucide-react";

export function NewMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  async function newContent() {
    setOpen(false);
    const title = window.prompt("New content idea — give it a working title:");
    if (!title?.trim()) return;
    setBusy(true);
    try {
      await fetch("/api/content", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title: title.trim(), stage: "Idea" }),
      });
      router.push("/pipeline");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  const items = [
    { label: "Content idea", hint: "→ Pipeline", Icon: Lightbulb, onClick: newContent },
    { label: "Brand deal", hint: "→ Creator CRM", Icon: Briefcase, onClick: () => { setOpen(false); router.push("/crm"); } },
    { label: "Script", hint: "→ Script Studio", Icon: PenLine, onClick: () => { setOpen(false); router.push("/scripts"); } },
    { label: "Track competitor", hint: "→ Competitors", Icon: Swords, onClick: () => { setOpen(false); router.push("/competitors"); } },
  ];

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((v) => !v)} disabled={busy} className="btn-ghost">
        {busy ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />} New
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-line bg-bg-soft p-1.5 shadow-2xl">
          <div className="px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-faint">Create</div>
          {items.map((it) => (
            <button key={it.label} onClick={it.onClick} className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm text-ink-muted hover:bg-bg-hover hover:text-ink">
              <it.Icon size={15} className="text-brand-soft" />
              <span>{it.label}</span>
              <span className="ml-auto text-[10px] text-ink-faint">{it.hint}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
