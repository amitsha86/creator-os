import type { Metadata } from "next";
import { Legal } from "@/components/legal";

export const metadata: Metadata = { title: "Security — Creora", description: "How Creora keeps your channel data under your control." };

export default function SecurityPage() {
  return (
    <Legal
      title="Your channel data stays under your control."
      intro="Security and permissions at a glance."
      sections={[
        { heading: "Permissions & trust", bullets: ["We never post without your permission", "You can disconnect accounts anytime", "We use secure OAuth where supported", "We request only the permissions needed for the product experience", "Read-only analytics access is used unless publishing is explicitly enabled"] },
        { heading: "OAuth scopes", body: "We request the minimum scopes required for audits and recommendations. (TODO: list exact OAuth scopes once platform integrations are finalized.)" },
        { heading: "Reporting an issue", body: "Found a security concern? Email security@creora.pro and we'll look into it." },
      ]}
    />
  );
}
