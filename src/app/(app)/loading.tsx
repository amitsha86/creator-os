import { LoadingState } from "@/components/ui/states";

export default function Loading() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="h-9 w-9 animate-pulse rounded-lg bg-bg-elevated" />
        <div className="space-y-2">
          <div className="h-5 w-52 animate-pulse rounded bg-bg-elevated" />
          <div className="h-3 w-72 animate-pulse rounded bg-bg-elevated" />
        </div>
      </div>
      <LoadingState rows={6} />
    </div>
  );
}
