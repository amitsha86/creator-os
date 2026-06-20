import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-grid px-4">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-md bg-brand text-base font-bold text-white">C</div>
          <span className="text-lg font-semibold tracking-tight text-ink">CreatorOS</span>
        </div>
        <p className="text-sm text-ink-muted">The operating system for creators. Sign in to continue.</p>
        <SignIn routing="hash" signUpUrl="/sign-up" forceRedirectUrl="/dashboard" />
      </div>
    </div>
  );
}
