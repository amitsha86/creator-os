import { getVault } from "@/lib/store";
import { Card, PageHeader } from "@/components/ui/primitives";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { VaultBrowser } from "@/components/vault-browser";
import { Library } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function VaultPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const vault = await getVault(userId);
  return (
    <div>
      <PageHeader icon={<Library size={18} />} title="Knowledge Vault" subtitle="Your compounding brain — every winning hook, framework, and SOP, semantically searchable. This is the moat."
        actions={<button className="btn-primary">+ Save to Vault</button>} />

      <VaultBrowser items={vault} />

      <Card className="mt-4 border-brand/30 bg-gradient-to-br from-brand/10 to-transparent">
        <p className="text-sm text-ink-muted"><span className="text-ink">Performance-weighted retrieval:</span> every agent pulls from the Vault, favoring artifacts that historically performed — so your AI gets sharper the longer you use CreatorOS.</p>
      </Card>
    </div>
  );
}
