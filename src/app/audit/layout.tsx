import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Creator Growth Audit — Creora",
  description: "Paste your YouTube channel and get AI-powered content ideas, growth insights, and a 30-day creator plan.",
};

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
