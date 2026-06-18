import { type Deal } from "@/lib/data";
import { getDeals } from "@/lib/store";
import { Card, Badge, PageHeader } from "@/components/ui/primitives";
import { money } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Briefcase } from "lucide-react";
import { NewDealButton } from "@/components/new-deal-button";

const STAGES: Deal["stage"][] = ["Prospect", "Outreach", "Negotiation", "Booked", "Delivered", "Paid"];
const healthTone: Record<string, any> = { "On track": "mint", "At risk": "amber", Stalled: "rose" };

export const dynamic = "force-dynamic";

export default async function CRMPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const deals = await getDeals(userId);
  const pipelineValue = deals.filter((d) => !["Paid"].includes(d.stage)).reduce((a, d) => a + d.value, 0);
  return (
    <div>
      <PageHeader icon={<Briefcase size={18} />} title="Creator CRM" subtitle="Manage sponsors, brand deals, and partnerships — a HubSpot built for creator revenue."
        actions={<NewDealButton />} />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[["Open pipeline", money(pipelineValue)], ["Booked", money(deals.filter(d=>d.stage==="Booked").reduce((a,d)=>a+d.value,0))], ["This quarter", money(38800)], ["Win rate", "42%"]].map(([k, v]) => (
          <Card key={k as string} className="!p-4">
            <div className="text-xs text-ink-faint">{k}</div>
            <div className="mt-1 text-xl font-semibold text-ink">{v}</div>
          </Card>
        ))}
      </div>

      <div className="flex gap-3 overflow-x-auto scroll-thin pb-3">
        {STAGES.map((stage) => {
          const col = deals.filter((d) => d.stage === stage);
          const sum = col.reduce((a, d) => a + d.value, 0);
          return (
            <div key={stage} className="w-56 shrink-0 rounded-xl border border-line bg-bg-soft/60 p-2">
              <div className="flex items-center justify-between px-2 py-1.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{stage}</span>
                <span className="text-xs text-ink-faint">{money(sum)}</span>
              </div>
              <div className="space-y-2">
                {col.map((d) => (
                  <div key={d.id} className="rounded-lg border border-line bg-bg-panel p-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-ink">{d.brand}</span>
                      <span className="text-sm text-ink">{money(d.value)}</span>
                    </div>
                    <div className="mt-1 text-xs text-ink-faint">{d.deliverables}</div>
                    <div className="mt-2"><Badge tone={healthTone[d.health]}>{d.health}</Badge></div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Card className="mt-4 border-brand/30 bg-gradient-to-br from-brand/10 to-transparent">
        <div className="text-sm font-medium text-ink">Sponsor agent</div>
        <p className="mt-1 text-sm text-ink-muted">3 brands match your niche &amp; audience. Draft personalized outreach and a live media kit in one click.</p>
        <div className="mt-2 flex gap-2"><button className="btn-primary h-8 px-3 text-xs">Draft outreach</button><button className="btn-ghost h-8 px-3 text-xs">Generate media kit</button></div>
      </Card>
    </div>
  );
}
