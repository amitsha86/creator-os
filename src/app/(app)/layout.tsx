"use client";
import { useState } from "react";
import { Sidebar } from "@/components/shell/sidebar";
import { Topbar } from "@/components/shell/topbar";
import { AIPanel } from "@/components/shell/ai-panel";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [aiOpen, setAiOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onToggleAI={() => setAiOpen((v) => !v)} />
        <main className="flex-1 overflow-y-auto scroll-thin bg-grid">
          <div className="mx-auto max-w-6xl px-6 py-6">{children}</div>
        </main>
      </div>
      <AIPanel open={aiOpen} onClose={() => setAiOpen(false)} />
    </div>
  );
}
