"use client";
import { Search, Bell, Plus, Command } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export function Topbar({ onToggleAI }: { onToggleAI: () => void }) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-line bg-bg-soft/80 px-5 backdrop-blur">
      <button className="flex w-72 items-center gap-2 rounded-lg border border-line bg-bg-soft px-3 py-1.5 text-sm text-ink-faint transition-colors hover:border-line hover:bg-bg-elevated">
        <Search size={15} />
        <span>Search or jump to…</span>
        <span className="ml-auto flex items-center gap-0.5 rounded border border-line px-1 text-[10px]"><Command size={10} />K</span>
      </button>
      <div className="ml-auto flex items-center gap-2">
        <button className="btn-ghost"><Plus size={15} /> New</button>
        <button className="btn-subtle h-9 w-9 !px-0"><Bell size={16} /></button>
        <button onClick={onToggleAI} className="btn-primary">Ask AI</button>
        <div className="ml-1 flex items-center"><UserButton afterSignOutUrl="/sign-in" /></div>
      </div>
    </header>
  );
}
