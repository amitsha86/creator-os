import type { Metadata } from "next";
import { Legal } from "@/components/legal";

export const metadata: Metadata = { title: "Data Deletion — Creora", description: "How to request deletion of your Creora data." };

export default function DataDeletionPage() {
  return (
    <Legal
      title="Delete your Creora data"
      intro="You can request deletion of your account data, connected channel data, generated content, and saved audit outputs at any time."
      sections={[
        { heading: "How to request deletion", bullets: ["Email support@creora.pro from your account email", "Use the subject line: Data Deletion Request", "Tell us what you want deleted: account, channel data, generated outputs, or all data", "We'll process the request according to our policy and confirm when complete"] },
        { heading: "What gets deleted", body: "Your account profile, connected channel data, saved audits, and generated content. Some records may be retained where required for legal or security reasons." },
        { heading: "Disconnecting accounts", body: "You can disconnect any connected platform at any time from Settings, which stops further data access immediately." },
      ]}
    />
  );
}
