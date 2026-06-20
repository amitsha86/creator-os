import Link from "next/link";
import { Check } from "lucide-react";

export type LegalSection = { heading: string; body?: string; bullets?: string[] };

export function Legal({ title, intro, sections, updated = "June 2026" }: { title: string; intro: string; sections: LegalSection[]; updated?: string }) {
  return (
    <div className="creora-root min-h-screen">
      <header className="mx-auto flex max-w-3xl items-center px-5 py-4">
        <Link href="/" className="creora-display text-xl text-[#3B1722]">Creora</Link>
        <Link href="/audit" className="creora-btn creora-btn-blue ml-auto !py-2.5 !px-4 text-sm">Get Free Audit</Link>
      </header>

      <article className="mx-auto max-w-3xl px-5 py-8">
        <h1 className="creora-display text-[clamp(30px,5vw,48px)] text-[#3B1722]">{title}</h1>
        <p className="mt-3 text-[#7A6B6B]">{intro}</p>
        <p className="mt-1 text-xs text-[#7A6B6B]">Last updated: {updated}</p>

        <div className="mt-8 space-y-5">
          {sections.map((s) => (
            <div key={s.heading} className="creora-card p-6">
              <h2 className="font-semibold text-[#3B1722]">{s.heading}</h2>
              {s.body && <p className="mt-2 text-[15px] leading-relaxed text-[#7A6B6B]">{s.body}</p>}
              {s.bullets && (
                <ul className="mt-3 space-y-2 text-[15px] text-[#3B1722]">
                  {s.bullets.map((b) => <li key={b} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-[#2463EB]" /> {b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-sm text-[#7A6B6B]">
          <Link href="/privacy" className="hover:text-[#3B1722]">Privacy</Link>
          <Link href="/terms" className="hover:text-[#3B1722]">Terms</Link>
          <Link href="/data-deletion" className="hover:text-[#3B1722]">Data deletion</Link>
          <Link href="/security" className="hover:text-[#3B1722]">Security</Link>
          <Link href="/" className="ml-auto hover:text-[#3B1722]">← Home</Link>
        </div>
      </article>
    </div>
  );
}
