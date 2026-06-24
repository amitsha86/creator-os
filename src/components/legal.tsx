import Link from "next/link";
import { Check } from "lucide-react";

export type LegalSection = { heading: string; body?: string; bullets?: string[] };

export function Legal({ title, intro, sections, updated = "June 2026" }: { title: string; intro: string; sections: LegalSection[]; updated?: string }) {
  return (
    <div className="creora-root min-h-screen">
      <header className="mx-auto flex max-w-3xl items-center px-5 py-4">
        <Link href="/" className="creora-display text-xl text-[#0F172A]">Creora</Link>
        <Link href="/audit" className="creora-btn creora-btn-blue ml-auto !py-2.5 !px-4 text-sm">Get Free Channel Audit</Link>
      </header>

      <article className="mx-auto max-w-3xl px-5 py-8">
        <h1 className="creora-display text-[clamp(30px,5vw,48px)] text-[#0F172A]">{title}</h1>
        <p className="mt-3 text-[#64748B]">{intro}</p>
        <p className="mt-1 text-xs text-[#64748B]">Last updated: {updated}</p>

        <div className="mt-8 space-y-5">
          {sections.map((s) => (
            <div key={s.heading} className="creora-card p-6">
              <h2 className="font-semibold text-[#0F172A]">{s.heading}</h2>
              {s.body && <p className="mt-2 text-[15px] leading-relaxed text-[#64748B]">{s.body}</p>}
              {s.bullets && (
                <ul className="mt-3 space-y-2 text-[15px] text-[#0F172A]">
                  {s.bullets.map((b) => <li key={b} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[#2463EB]" /> {b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-sm text-[#64748B]">
          <Link href="/privacy" className="hover:text-[#0F172A]">Privacy</Link>
          <Link href="/terms" className="hover:text-[#0F172A]">Terms</Link>
          <Link href="/data-deletion" className="hover:text-[#0F172A]">Data deletion</Link>
          <Link href="/security" className="hover:text-[#0F172A]">Security</Link>
          <Link href="/" className="ml-auto hover:text-[#0F172A]">← Home</Link>
        </div>
      </article>
    </div>
  );
}
