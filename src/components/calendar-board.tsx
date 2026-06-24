"use client";
import { useEffect, useState } from "react";
import type { CalendarPost } from "@/lib/data";
import { PlatformIcon, platformColor } from "@/components/ui/platform";
import { Clock, Loader2 } from "lucide-react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function computeWeek(today: Date) {
  const dow = (today.getDay() + 6) % 7; // Mon = 0 … Sun = 6
  const monday = new Date(today);
  monday.setDate(today.getDate() - dow);
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.getDate();
  });
  return { todayIdx: dow, dates };
}

export function CalendarBoard({ initial }: { initial: CalendarPost[] }) {
  const [posts, setPosts] = useState<CalendarPost[]>(initial);
  const [dragId, setDragId] = useState<string | null>(null);
  const [over, setOver] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  // Computed after mount to anchor the week to today without an SSR/client mismatch.
  const [week, setWeek] = useState<{ todayIdx: number; dates: number[] } | null>(null);
  useEffect(() => setWeek(computeWeek(new Date())), []);

  async function drop(day: number) {
    setOver(null);
    if (!dragId) return;
    const id = dragId;
    setDragId(null);
    const moved = posts.find((p) => p.id === id);
    if (!moved || moved.day === day) return;
    const prev = posts;
    setPosts((ps) => ps.map((p) => (p.id === id ? { ...p, day } : p)));
    setSaving(true);
    try {
      const res = await fetch(`/api/calendar/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ day }),
      });
      if (!res.ok) throw new Error("save failed");
    } catch {
      setPosts(prev);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-2 h-4">
        {saving && <span className="flex items-center gap-1.5 text-xs text-ink-faint"><Loader2 size={12} className="animate-spin" /> Saving…</span>}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((d, i) => {
          const dayPosts = posts.filter((p) => p.day === i);
          const isToday = week ? i === week.todayIdx : false;
          return (
            <div
              key={d}
              onDragOver={(e) => { e.preventDefault(); setOver(i); }}
              onDragLeave={() => setOver((o) => (o === i ? null : o))}
              onDrop={() => drop(i)}
              className={`min-h-[260px] rounded-xl border p-2 transition-colors ${over === i ? "border-brand/50 bg-brand/5" : isToday ? "border-brand/40 bg-bg-soft/60" : "border-line bg-bg-soft/60"}`}
            >
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="text-xs font-medium text-ink-muted">{d}</span>
                <span className={`text-xs ${isToday ? "text-brand-soft" : "text-ink-faint"}`}>{week ? week.dates[i] : ""}</span>
              </div>
              <div className="space-y-1.5">
                {dayPosts.map((p) => (
                  <div
                    key={p.id}
                    draggable
                    onDragStart={() => setDragId(p.id)}
                    className="cursor-grab rounded-lg border border-line bg-bg-panel p-2 transition-shadow hover:border-brand/40 active:cursor-grabbing"
                    style={{ borderLeft: `3px solid ${platformColor(p.platform)}` }}
                  >
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
    </div>
  );
}
