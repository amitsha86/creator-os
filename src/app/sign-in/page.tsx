import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="creora-root grid min-h-screen lg:grid-cols-2">
      {/* brand side */}
      <div className="hidden flex-col justify-between p-12 lg:flex" style={{ background: "#3B1722" }}>
        <Link href="/" className="creora-display text-2xl text-[#F2F0EA]">Creora</Link>
        <div>
          <div className="creora-display text-[clamp(28px,3vw,40px)] text-[#F2F0EA]">Know what to create next.<br />Grow faster with AI.</div>
          <ul className="mt-6 space-y-2 text-[#DDD0C9]">
            <li>· Find your next best video idea</li>
            <li>· Generate scripts in your voice</li>
            <li>· Repurpose one video into 20 assets</li>
            <li>· Track what actually works</li>
          </ul>
        </div>
        <div className="flex gap-4 text-sm text-[#CDBDB6]">
          <Link href="/sample-audit" className="hover:text-[#B9FF1D]">Sample audit</Link>
          <Link href="/demo" className="hover:text-[#B9FF1D]">Demo dashboard</Link>
        </div>
      </div>

      {/* form side */}
      <div className="grid place-items-center p-6">
        <div className="flex flex-col items-center gap-5">
          <Link href="/" className="creora-display text-2xl text-[#3B1722] lg:hidden">Creora</Link>
          <div className="text-center">
            <h1 className="creora-display text-2xl text-[#3B1722]">Welcome back to Creora.</h1>
            <p className="mt-1 text-sm text-[#7A6B6B]">Continue building your creator growth system.</p>
          </div>
          <SignIn routing="hash" signUpUrl="/sign-up" forceRedirectUrl="/dashboard" />
          <Link href="/" className="text-sm text-[#7A6B6B] hover:text-[#3B1722]">← Back to homepage</Link>
        </div>
      </div>
    </div>
  );
}
