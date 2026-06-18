import { revenueStreams } from "@/lib/data";
import { Card, Badge, PageHeader, Spark } from "@/components/ui/primitives";
import { money } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

export default function RevenuePage() {
  const total = revenueStreams.reduce((a, s) => a + s.amount, 0);
  const forecast = Math.round(total * 1.12);
  return (
    <div>
      <PageHeader icon={<TrendingUp size={18} />} title="Revenue Intelligence" subtitle="Every stream unified, with forecasting you can plan the business around."
        actions={<button className="btn-ghost">Export report</button>} />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xs text-ink-faint">This month (blended)</div>
              <div className="mt-1 text-3xl font-semibold text-ink">{money(total)}</div>
            </div>
            <Badge tone="mint"><TrendingUp size={12} /> +13% MoM</Badge>
          </div>
          <div className="mt-4 space-y-3">
            {revenueStreams.map((s) => {
              const wpct = Math.round((s.amount / total) * 100);
              return (
                <div key={s.stream}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-ink">{s.stream}</span>
                    <span className="text-ink-muted">{money(s.amount)} <span className={s.delta >= 0 ? "text-mint" : "text-rose"}>({s.delta > 0 ? "+" : ""}{s.delta}%)</span></span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-bg-elevated">
                    <div className="h-full rounded-full" style={{ width: `${wpct}%`, background: s.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <div className="text-sm font-medium text-ink">Forecast</div>
          <div className="mt-3 rounded-lg border border-line bg-bg-soft p-3">
            <div className="text-xs text-ink-faint">Next month (projected)</div>
            <div className="mt-1 text-2xl font-semibold text-ink">{money(forecast)}</div>
            <div className="mt-1 text-xs text-ink-muted">Confidence band {money(Math.round(forecast*0.9))}–{money(Math.round(forecast*1.1))}</div>
            <div className="mt-2"><Spark data={[28, 30, 29, 32, 34, 37, 40]} color="#10b981" /></div>
          </div>
          <div className="mt-3 rounded-lg border border-line bg-bg-soft p-3">
            <div className="text-xs text-ink-faint">Quarter (projected)</div>
            <div className="mt-1 text-2xl font-semibold text-ink">{money(forecast * 3 + 9000)}</div>
            <div className="mt-1 text-xs text-ink-muted">Includes {money(25500)} booked sponsorships</div>
          </div>
          <p className="mt-3 text-xs text-ink-faint">Forecast blends recurring revenue + booked CRM pipeline + seasonality.</p>
        </Card>
      </div>
    </div>
  );
}
