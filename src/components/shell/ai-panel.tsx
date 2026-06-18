"use client";
import { useState } from "react";
import { Sparkles, X, CornerDownLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Msg { role: "user" | "ai"; text: string; live?: boolean }

const SUGGESTIONS = [
  "What should I make next?",
  "Why are my views down?",
  "Draft a hook about budget studios",
  "Summarize my week",
];

export function AIPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", text: "Hi Maya 👋 I'm your CreatorOS assistant. Ask me what to make next, why a metric moved, or to draft anything. I see your channel data." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai/chat", { method: "POST", body: JSON.stringify({ message: text }) });
      const data = await res.json();
      setMsgs((m) => [...m, { role: "ai", text: data.text, live: data.live }]);
    } catch {
      setMsgs((m) => [...m, { role: "ai", text: "Something went wrong reaching the AI service." }]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;
  return (
    <aside className="flex h-full w-[360px] shrink-0 flex-col border-l border-line bg-bg-soft animate-fade-in">
      <div className="flex h-14 items-center gap-2 border-b border-line px-4">
        <Sparkles size={16} className="text-brand-soft" />
        <span className="text-sm font-semibold text-ink">AI Assistant</span>
        <button onClick={onClose} className="btn-subtle ml-auto h-7 w-7 !px-0"><X size={15} /></button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto scroll-thin p-4">
        {msgs.map((m, i) => (
          <div key={i} className={cn("rounded-xl px-3.5 py-2.5 text-sm", m.role === "user" ? "ml-6 bg-brand text-white" : "mr-2 border border-line bg-bg-panel text-ink")}>
            <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
            {m.role === "ai" && m.live === false && <span className="mt-1.5 block text-[10px] text-ink-faint">· fallback mode — add an API key for live AI</span>}
          </div>
        ))}
        {loading && <div className="mr-2 flex items-center gap-2 rounded-xl border border-line bg-bg-panel px-3.5 py-2.5 text-sm text-ink-muted"><Loader2 size={14} className="animate-spin" /> Thinking…</div>}
        {msgs.length <= 1 && (
          <div className="space-y-1.5 pt-2">
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => send(s)} className="block w-full rounded-lg border border-line bg-bg-panel px-3 py-2 text-left text-sm text-ink-muted transition-colors hover:border-brand/40 hover:text-ink">{s}</button>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-line p-3">
        <div className="flex items-end gap-2 rounded-xl border border-line bg-bg-panel p-2 focus-within:border-brand-soft">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
            rows={1}
            placeholder="Ask anything…"
            className="max-h-28 flex-1 resize-none bg-transparent px-1 text-sm text-ink outline-none placeholder:text-ink-faint"
          />
          <button onClick={() => send(input)} disabled={loading} className="btn-primary h-8 w-8 !px-0"><CornerDownLeft size={15} /></button>
        </div>
      </div>
    </aside>
  );
}
