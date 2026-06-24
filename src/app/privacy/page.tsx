import type { Metadata } from "next";
import { Legal } from "@/components/legal";

export const metadata: Metadata = { title: "Privacy Policy — Creora", description: "How Creora collects, uses, and protects your data." };

export default function PrivacyPage() {
  return (
    <Legal
      title="Privacy Policy"
      intro="A plain-language overview of what Creora collects and how it's used. This is a general policy, not legal advice."
      sections={[
        { heading: "Data we may collect", bullets: ["Account information such as your name, email, and login details", "Channel URLs and creator-provided inputs", "Content preferences, niche, goals, and competitor inputs", "Generated audits, scripts, ideas, and repurposing outputs", "Analytics data if you connect supported platforms", "Product usage events used to improve the experience"] },
        { heading: "How we use your data", bullets: ["Generate creator audits", "Personalize content recommendations", "Improve product quality", "Maintain account access", "Provide support", "Understand product usage and conversion"] },
        { heading: "What we do not do", bullets: ["We do not post without your permission", "We do not sell creator channel data", "We do not guarantee growth outcomes"] },
        { heading: "Data deletion", body: "You can request deletion of your account and associated data at any time. See the Data Deletion page for the steps." },
        { heading: "Contact", body: "Questions about privacy? Email support@creora.pro." },
      ]}
    />
  );
}
