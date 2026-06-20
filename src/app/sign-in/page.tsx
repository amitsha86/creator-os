import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="creora-root grid min-h-screen lg:grid-cols-2">
      {/* brand side */}
      <div className="hidden flex-col justify-between p-12 lg:flex" style={{ background: "#0F172A" }}>
        <Link href="/" className="creora-display text-2xl text-[#FFFFFF]">Creora</Link>
        <div>
          <div className="creora-display text-[clamp(28px,3vw,40px)] text-[#FFFFFF]">Know what to create next.<br />Grow faster with AI.</div>
          <ul className="mt-6 space-y-2 text-[#E7EDF6]">
            <li>· Find your next best video idea</li>
            <li>· Generate scripts in your voice</li>
            <li>· Repurpose one video into 20 assets</li>
            <li>· Track what actually works</li>
          </ul>
        </div>
        <div className="flex gap-4 text-sm text-[#CBD5E1]">
          <Link href="/sample-audit" className="hover:text-[#BEF264]">Sample audit</Link>
          <Link href="/demo" className="hover:text-[#BEF264]">Demo dashboard</Link>
        </div>
      </div>

      {/* form side */}
      <div className="grid place-items-center p-6">
        <div className="flex flex-col items-center gap-5">
          <Link href="/" className="creora-display text-2xl text-[#0F172A] lg:hidden">Creora</Link>
          <div className="text-center">
            <h1 className="creora-display text-2xl text-[#0F172A]">Welcome back to Creora.</h1>
            <p className="mt-1 text-sm text-[#64748B]">Continue building your creator growth system.</p>
          </div>
          <SignIn routing="hash" signUpUrl="/sign-up" forceRedirectUrl="/dashboard" />
          <Link href="/" className="text-sm text-[#64748B] hover:text-[#0F172A]">← Back to homepage</Link>
        </div>
      </div>
    </div>
  );
}
