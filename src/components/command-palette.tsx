"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search, LayoutDashboard, Flame, Swords, BookOpen, Brain, PenLine,
  Image as ImageIcon, KanbanSquare, CalendarDays, Repeat, Briefcase,
  TrendingUp, Users, Sparkles, Library, CornerDownLeft,
} from "lucide-react";

type Item = { href: string; label: string; group: string; Icon: any };

const ITEMS: Item[] = [
  { href: "/dashboard", label: "Dashboard", group: "Intelligence", Icon: LayoutDashboard },
  { href: "/viral", label: "Viral Intelligence", group: "Intelligence", Icon: Flame },
  { href: "/competitors", label: "Competitors", group: "Intelligence", Icon: Swords },
  { href: "/research", label: "Research", group: "Intelligence", Icon: BookOpen },
  { href: "/brain", label: "Content Brain", group: "Create", Icon: Brain },
  { href: "/scripts", label: "Script Studio", group: "Create", Icon: PenLine },
  { href: "/thumbnails", label: "Thumbnails", group: "Create", Icon: ImageIcon },
  { href: "/pipeline", label: "Pipeline", group: "Produce", Icon: KanbanSquare },
  { href: "/calendar", label: "Calendar", group: "Produce", Icon: CalendarDays },
  { href: "/repurpose", label: "Repurpose", group: "Produce", Icon: Repeat },
  { href: "/crm", label: "Creator CRM", group: "Business", Icon: Briefcase },
  { href: "/revenue", label: "Revenue", group: "Business", Icon: TrendingUp },
  { href: "/team", label: "Team", group: "Business", Icon: Users },
  { href: "/coach", label: "Growth Coach", group: "Grow", Icon: Sparkles },
  { href: "/vault", label: "Knowledge Vault", group: "Grow", Icon: Library },
];

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return ITEMS;
    return ITEMS.filter((i) => i.label.toLowerCase().includes(term) || i.group.toLowerCase().includes(term));
  }, [q]);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => { setActive(0); }, [q]);

  function go(href: string) {
    onClose();
    router.push(href);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); const r = results[active]; if (r) go(r.href); }
    else if (e.key === "Escape") { e.preventDefault(); onClose(); }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[12vh] backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-xl overflow-hidden rounded-xl border border-line bg-bg-soft shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 border-b border-line px-4">
          <Search size={16} className="text-ink-faint" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search modules or jump to…"
            className="w-full bg-transparent py-3.5 text-sm text-ink outline-none placeholder:text-ink-faint"
          />
          <span className="rounded border border-line px-1.5 py-0.5 text-[10px] text-ink-faint">Esc</span>
        </div>
        <div className="max-h-80 overflow-y-auto scroll-thin p-2">
          {results.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-ink-faint">No matches for “{q}”.</div>
          ) : (
            results.map((r, i) => (
              <button
                key={r.href}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(r.href)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm ${i === active ? "bg-bg-elevated text-ink" : "text-ink-muted hover:bg-bg-hover"}`}
              >
                <r.Icon size={16} className={i === active ? "text-brand-soft" : "text-ink-faint"} />
                <span>{r.label}</span>
                <span className="ml-auto text-[10px] uppercase tracking-wide text-ink-faint">{r.group}</span>
                {i === active && <CornerDownLeft size={13} className="text-ink-faint" />}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
