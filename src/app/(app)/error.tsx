"use client";
import { AlertTriangle, RotateCw } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="card flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-rose/10 text-rose"><AlertTriangle size={22} /></div>
      <div>
        <div className="text-base font-semibold text-ink">Something went wrong</div>
        <p className="mx-auto mt-1 max-w-sm text-sm text-ink-muted">We hit a snag loading this page. Try again — if it keeps happening, refresh or check back shortly.</p>
      </div>
      <button onClick={reset} className="btn-primary mt-1"><RotateCw size={14} /> Try again</button>
    </div>
  );
}
