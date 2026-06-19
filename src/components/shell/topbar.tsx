"use client";
import { useEffect, useState } from "react";
import { Search, Bell, Command } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { CommandPalette } from "@/components/command-palette";
import { NewMenu } from "@/components/new-menu";

export function Topbar({ onToggleAI }: { onToggleAI: () => void }) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-line bg-bg-soft/80 px-5 backdrop-blur">
      <button onClick={() => setPaletteOpen(true)} className="flex w-72 items-center gap-2 rounded-lg border border-line bg-bg-soft px-3 py-1.5 text-sm text-ink-faint transition-colors hover:border-line hover:bg-bg-elevated">
        <Search size={15} />
        <span>Search or jump to…</span>
        <span className="ml-auto flex items-center gap-0.5 rounded border border-line px-1 text-[10px]"><Command size={10} />K</span>
      </button>
      <div className="ml-auto flex items-center gap-2">
        <NewMenu />
        <button className="btn-subtle h-9 w-9 !px-0"><Bell size={16} /></button>
        <button onClick={onToggleAI} className="btn-primary">Ask AI</button>
        <div className="ml-1 flex items-center"><UserButton afterSignOutUrl="/sign-in" /></div>
      </div>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </header>
  );
}
