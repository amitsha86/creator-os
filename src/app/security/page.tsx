import type { Metadata } from "next";
import { Legal } from "@/components/legal";

export const metadata: Metadata = { title: "Security — Creora", description: "How Creora keeps your channel data under your control." };

export default function SecurityPage() {
  return (
    <Legal
      title="Your channel data stays under your control."
      intro="Security and permissions at a glance."
      sections={[
        { heading: "What Creora can use", body: "Creora can start with a public channel URL. If you connect an account later, Creora may use permitted channel analytics, content metadata, and creator-provided inputs to generate audits, content ideas, scripts, repurposing suggestions, and growth recommendations." },
        { heading: "What Creora does not do", bullets: ["We never post without your permission.", "We do not sell your channel data.", "We do not ask for permissions that are not needed for the product experience.", "You can disconnect connected accounts anytime.", "AI scores are estimates and do not guarantee views, revenue, or growth."] },
        { heading: "Account permissions", body: "Where OAuth or platform integrations are supported, Creora uses secure authorization flows and requests only the permissions required for the selected feature. Read-only analytics access is used unless publishing or posting features are explicitly enabled by the user." },
        { heading: "Data deletion", body: "You can request deletion of your account data, connected channel data, and generated content by following the data deletion process. See the Data Deletion page." },
        { heading: "Contact", body: "Questions or a security concern? Email support@creora.pro." },
      ]}
    />
  );
}
