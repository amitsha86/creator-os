import type { Metadata } from "next";
import { Legal } from "@/components/legal";

export const metadata: Metadata = { title: "Delete your data — Creora", description: "How to request deletion of your Creora data." };

export default function DataDeletionPage() {
  return (
    <Legal
      title="Delete your Creora data"
      intro="You can request deletion of your account data, connected channel data, and generated content at any time."
      sections={[
        { heading: "How to request deletion", bullets: ["Email support@creora.pro from your account email", "Include the email address tied to your account", "Tell us you'd like your data deleted", "We'll process your request according to our policy and confirm when complete"] },
        { heading: "What gets deleted", body: "Your account profile, connected channel data, saved audits, and generated content. Some records may be retained where required for legal or security reasons." },
        { heading: "Disconnecting accounts", body: "You can disconnect any connected platform at any time from Settings, which stops further data access immediately." },
      ]}
    />
  );
}
