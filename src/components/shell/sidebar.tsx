"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Flame, Swords, BookOpen, Brain, PenLine, Image as ImageIcon,
  KanbanSquare, CalendarDays, Repeat, Briefcase, TrendingUp, Users, Sparkles, Library,
} from "lucide-react";

const groups: { label: string; items: { href: string; label: string; Icon: any }[] }[] = [
  {
    label: "Intelligence",
    items: [
      { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
      { href: "/viral", label: "Viral Intelligence", Icon: Flame },
      { href: "/competitors", label: "Competitors", Icon: Swords },
      { href: "/research", label: "Research", Icon: BookOpen },
    ],
  },
  {
    label: "Create",
    items: [
      { href: "/brain", label: "Content Brain", Icon: Brain },
      { href: "/scripts", label: "Script Studio", Icon: PenLine },
      { href: "/thumbnails", label: "Thumbnails", Icon: ImageIcon },
    ],
  },
  {
    label: "Produce",
    items: [
      { href: "/pipeline", label: "Pipeline", Icon: KanbanSquare },
      { href: "/calendar", label: "Calendar", Icon: CalendarDays },
      { href: "/repurpose", label: "Repurpose", Icon: Repeat },
    ],
  },
  {
    label: "Business",
    items: [
      { href: "/crm", label: "Creator CRM", Icon: Briefcase },
      { href: "/revenue", label: "Revenue", Icon: TrendingUp },
      { href: "/team", label: "Team", Icon: Users },
    ],
  },
  {
    label: "Grow",
    items: [
      { href: "/coach", label: "Growth Coach", Icon: Sparkles },
      { href: "/vault", label: "Knowledge Vault", Icon: Library },
    ],
  },
];

export function Sidebar() {
  const path = usePathname();
  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-line bg-bg-soft">
      <div className="flex h-14 items-center gap-2 px-4">
        <div className="grid h-7 w-7 place-items-center rounded-md bg-brand text-sm font-bold text-white">C</div>
        <span className="text-sm font-semibold tracking-tight text-ink">Creora</span>
        <span className="ml-auto rounded border border-line px-1.5 py-0.5 text-[10px] text-ink-faint">v0.1</span>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto scroll-thin px-3 py-2">
        {groups.map((g) => (
          <div key={g.label}>
            <div className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-faint">{g.label}</div>
            <div className="space-y-0.5">
              {g.items.map(({ href, label, Icon }) => {
                const active = path === href || path.startsWith(href + "/");
                return (
                  <Link key={href} href={href} className={cn("nav-link", active && "nav-link-active")}>
                    <Icon size={16} className={active ? "text-brand-soft" : ""} />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-line p-3">
        <div className="flex items-center gap-2.5 rounded-lg px-2 py-1.5">
          <div className="grid h-7 w-7 place-items-center rounded-full bg-brand text-xs font-bold text-white">MB</div>
          <div className="min-w-0">
            <div className="truncate text-sm text-ink">Maya Builds</div>
            <div className="truncate text-xs text-ink-faint">@mayabuilds · Pro</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
