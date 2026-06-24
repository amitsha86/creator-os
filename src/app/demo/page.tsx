import type { Metadata } from "next";
import { DemoBoard } from "@/components/demo-board";

export const metadata: Metadata = {
  title: "Creora Demo Dashboard — AI Growth Copilot for Creators",
  description: "Explore a demo creator dashboard with growth score, viral opportunities, script ideas, competitor radar, and repurposing previews.",
};

export default function DemoPage() {
  return <DemoBoard />;
}
