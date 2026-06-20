import { getCalendarPosts } from "@/lib/store";
import { Card, Badge, PageHeader } from "@/components/ui/primitives";
import { CalendarBoard } from "@/components/calendar-board";
import { CalendarDays, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CalendarPage() {
  const calendarPosts = await getCalendarPosts();
  return (
    <div>
      <PageHeader icon={<CalendarDays size={18} />} title="Content Calendar" subtitle="Plan and schedule across every platform. Drag to reschedule; best-time slots are suggested."
        actions={<div className="flex gap-2"><button className="btn-ghost">Month</button><button className="btn-primary">Week</button></div>} />

      <CalendarBoard initial={calendarPosts} />

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
