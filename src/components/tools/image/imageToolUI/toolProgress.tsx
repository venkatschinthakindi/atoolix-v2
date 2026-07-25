import { Loader2 } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function ToolProgress({ progress, processingMessage }: { progress: number, processingMessage: string }) {
  return (
    <div className="rounded-[24px] border border-blue-500/20 bg-gradient-to-br from-blue-950/40 to-slate-900">
      <div className="p-5">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-blue-500/10 p-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">{processingMessage}</h2>
            <p className="mt-1 text-slate-400">Everything happens locally inside your browser.</p>
          </div>
        </div>

        <div className="mt-8">
          <ProgressBar value={progress} />
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="rounded-2xl bg-slate-950/60 p-2 text-sm text-emerald-300">Reading File</div>
          <div className="rounded-2xl bg-blue-500/10 p-2 text-sm font-medium text-blue-300">Processing File</div>
          <div className="rounded-2xl bg-slate-950/60 p-2 text-sm text-slate-400">Preparing Download</div>
        </div>
      </div>
    </div>
  );
}