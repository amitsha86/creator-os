import type { Metadata } from "next";
import { Legal } from "@/components/legal";

export const metadata: Metadata = { title: "Privacy — Creora", description: "How Creora collects, uses, and protects your data." };

export default function PrivacyPage() {
  return (
    <Legal
      title="Privacy"
      intro="Plain-language overview of what Creora collects and how it's used. (This is a general policy and not legal advice.)"
      sections={[
        { heading: "What we may collect", bullets: ["Channel URL and inputs you provide (niche, goals, competitors)", "Connected account information if you use OAuth integrations", "Analytics data from connected platforms, where you grant access", "Account details such as your email"] },
        { heading: "How we use your data", body: "We use your data to generate audits, ideas, scripts, and repurposed content, and to improve your recommendations. We do not sell your personal data." },
        { heading: "Requesting deletion", body: "You can request deletion of your account and associated data at any time. See the Data Deletion page for steps." },
        { heading: "Contact", body: "Questions about privacy? Email support@creora.pro. (TODO: confirm support address.)" },
      ]}
    />
  );
}
