import type { Metadata } from "next";
import { Legal } from "@/components/legal";

export const metadata: Metadata = { title: "Terms of Service — Creora", description: "Terms of using Creora." };

export default function TermsPage() {
  return (
    <Legal
      title="Terms of Service"
      intro="The basics of using Creora. This is a general summary, not legal advice."
      sections={[
        { heading: "Use of Creora", body: "Creora provides AI-assisted tools for content ideas, scripts, repurposing, and growth recommendations. You're responsible for how you use the outputs." },
        { heading: "Account responsibility", body: "You're responsible for keeping your account secure and for activity under your account." },
        { heading: "AI-generated outputs", body: "Creora provides AI-generated recommendations, scores, scripts, and content suggestions. These outputs are estimates and creative aids, not guarantees of views, subscribers, revenue, or platform performance. Review everything before publishing." },
        { heading: "No guaranteed results", body: "Creora does not guarantee growth, views, revenue, or any specific outcome." },
        { heading: "Subscriptions and billing", body: "Paid plans, billing terms, cancellations, and refunds follow the terms shown at checkout or in your billing settings." },
        { heading: "Acceptable use", body: "Don't use Creora to generate unlawful, deceptive, or abusive content, or to violate the terms of any connected platform." },
        { heading: "Service changes", body: "We may update, add, or remove features over time, and may revise these terms as the product evolves." },
        { heading: "Contact", body: "Questions? Email support@creora.pro." },
      ]}
    />
  );
}
