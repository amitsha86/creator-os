import { calendarPosts } from "@/lib/data";
import { Card, Badge, PageHeader } from "@/components/ui/primitives";
import { PlatformIcon, platformColor } from "@/components/ui/platform";
import { CalendarDays, Clock } from "lucide-react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CalendarPage() {
  return (
    <div>
      <PageHeader icon={<CalendarDays size={18} />} title="Content Calendar" subtitle="Plan and schedule across every platform. Drag to reschedule; best-time slots are suggested."
        actions={<div className="flex gap-2"><button className="btn-ghost">Month</button><button className="btn-primary">Week</button></div>} />

      <div className="grid grid-cols-7 gap-2">
        {days.map((d, i) => {
          const posts = calendarPosts.filter((p) => p.day === i);
          const isToday = i === 1;
          return (
            <div key={d} className={`min-h-[260px] rounded-xl border bg-bg-soft/60 p-2 ${isToday ? "border-brand/40" : "border-line"}`}>
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="text-xs font-medium text-ink-muted">{d}</span>
                <span className={`text-xs ${isToday ? "text-brand-soft" : "text-ink-faint"}`}>{15 + i}</span>
              </div>
              <div className="space-y-1.5">
                {posts.map((p) => (
                  <div key={p.id} className="rounded-lg border border-line bg-bg-panel p-2" style={{ borderLeft: `3px solid ${platformColor(p.platform)}` }}>
                    <div className="flex items-center gap-1.5">
                      <PlatformIcon platform={p.platform} size={11} />
                      <span className="text-xs leading-tight text-ink">{p.title}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-ink-faint"><Clock size={9} /> {p.time}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Card className="mt-4">
        <div className="flex items-center gap-2 text-sm font-medium text-ink"><Clock size={15} className="text-brand-soft" /> Best-time insights</div>
        <div className="mt-2 grid gap-2 text-sm text-ink-muted sm:grid-cols-3">
          <div>· <Badge tone="mint">TikTok</Badge> 18:00 — +31% engagement</div>
          <div>· <Badge tone="rose">YouTube</Badge> Tue 9:00 — your best CTR window</div>
          <div>· <Badge tone="sky">LinkedIn</Badge> 8:00 weekdays</div>
        </div>
      </Card>
    </div>
  );
}
