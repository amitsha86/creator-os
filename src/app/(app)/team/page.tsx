import { getTeam } from "@/lib/store";
import { Card, Badge, PageHeader } from "@/components/ui/primitives";
import { Users, MessageSquare, CheckCircle2, AtSign } from "lucide-react";

const activity = [
  { who: "Dev", icon: AtSign, text: "mentioned you on “Budget studio” script", time: "12m" },
  { who: "Leo", icon: CheckCircle2, text: "moved “Studio glow-up ep.3” to Edit", time: "1h" },
  { who: "Ria", icon: MessageSquare, text: "commented on Variant A thumbnail", time: "3h" },
  { who: "Sam", icon: CheckCircle2, text: "submitted “Used-gear haul” for review", time: "5h" },
];

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const team = await getTeam();
  return (
    <div>
      <PageHeader icon={<Users size={18} />} title="Team Collaboration" subtitle="Roles, comments, approvals, and shared files — your whole content business, multiplayer."
        actions={<button className="btn-primary">+ Invite</button>} />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="mb-3 text-sm font-medium text-ink">Members &amp; roles</div>
          <div className="space-y-2">
            {team.map((m) => (
              <div key={m.name} className="flex items-center gap-3 rounded-lg border border-line bg-bg-soft p-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-full text-xs font-bold text-white" style={{ background: m.color }}>{m.initials}</div>
                <div className="min-w-0">
                  <div className="text-sm text-ink">{m.name}</div>
                  <div className="text-xs text-ink-faint">{m.role}</div>
                </div>
                <Badge>{m.role.split(" ")[0]}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-3 text-sm font-medium text-ink">Activity</div>
          <div className="space-y-2.5">
            {activity.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line bg-bg-elevated text-ink-muted"><Icon size={13} /></div>
                  <div className="text-sm text-ink-muted"><span className="text-ink">{a.who}</span> {a.text}<span className="ml-2 text-xs text-ink-faint">{a.time} ago</span></div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 rounded-lg border border-line bg-bg-soft p-3">
            <div className="text-xs font-medium text-ink">Pending approval</div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-ink-muted">“Used-gear haul” → Publish</span>
              <div className="flex gap-1.5"><button className="btn-primary h-7 px-2.5 text-xs">Approve</button><button className="btn-ghost h-7 px-2.5 text-xs">Changes</button></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
