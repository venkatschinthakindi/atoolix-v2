import { ShieldCheck } from "lucide-react";
import { DropZone } from "@/components/ui/DropZone";
import { FeatureBadge } from "../imageToolUI/featureBadge";

interface QuickOverviewStat {
  label: string;
  value: string;
  color?: "white" | "emerald" | "blue"; // extend as needed
}

interface Badge {
  label: string;
  color: "blue" | "green" | "purple";
}

interface ToolHeroProps<TConfig> {
  config: TConfig;
  processing: boolean;
  file: File | null;
  dropzoneKey: number;
  handleFiles: (files: File[]) => void;
  validFileTypes: string;

  // New, optional — every one of these defaults to the original convert copy,
  // so the convert page needs ZERO changes.
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  description?: React.ReactNode;
  badges?: Badge[];
  stats?: QuickOverviewStat[]; // drives the "Quick Overview" panel rows
}

export function ToolHero<TConfig>({
  config,
  processing,
  file,
  dropzoneKey,
  handleFiles,
  validFileTypes,
  eyebrow = "Private • Browser Based • Secure",
  title = "Convert Images",
  titleAccent = "in Seconds",
  description,
  badges = [
    { label: "⚡ Instant Conversion", color: "blue" },
    { label: "🔒 100% Private", color: "green" },
    { label: "📤 No Upload", color: "purple" },
  ],
  stats,
}: ToolHeroProps<TConfig>) {
  // Fallback stats replicate the original convert-only behavior when the
  // caller doesn't pass its own (keeps convert page working unmodified).
  const anyConfig = config as any;
  const resolvedStats: QuickOverviewStat[] =
    stats ?? [
      { label: "Input", value: (anyConfig.inputFormats ?? []).join(", ").toUpperCase() },
      { label: "Output", value: (anyConfig.outputFormats?.[0] ?? "").toUpperCase() },
      { label: "Processing", value: "Local Browser", color: "emerald" },
      {
        label: "Status",
        value: processing ? "Processing" : file ? "Ready" : "Waiting",
        color: "blue",
      },
    ];

  const resolvedDescription =
    description ?? (
      <>
        Convert{" "}
        <strong className="text-white">
          {(anyConfig.inputFormats ?? []).join(", ").toUpperCase()}
        </strong>{" "}
        to <strong className="text-white">{(anyConfig.outputFormats?.[0] ?? "").toUpperCase()}</strong>.
        Everything happens securely inside your browser. No uploads. No waiting. No registration.
      </>
    );

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0">
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-violet-600/10 blur-3xl" />
      </div>

      <div className="relative px-6 py-8 lg:px-12 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_420px]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300">
              <ShieldCheck className="h-4 w-4" />
              {eyebrow}
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white lg:text-6xl">
              {title}
              <span className="block bg-gradient-to-r from-blue-400 via-white to-violet-400 bg-clip-text text-transparent">
                {titleAccent}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{resolvedDescription}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {badges.map((b) => (
                <FeatureBadge key={b.label} color={b.color}>
                  {b.label}
                </FeatureBadge>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/20 p-4 backdrop-blur">
            <div className="text-lg font-semibold text-white">Quick Overview</div>

            <div className="mt-6 space-y-4">
              {resolvedStats.map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="text-slate-400">{s.label}</span>
                  <span
                    className={
                      s.color === "emerald"
                        ? "text-emerald-300"
                        : s.color === "blue"
                        ? "text-blue-300"
                        : "font-medium text-white"
                    }
                  >
                    {s.value}
                  </span>
                </div>
              ))}
            </div>

            <DropZone
              key={dropzoneKey}
              allowMultiple={false}
              onFiles={handleFiles}
              validFileTypes={validFileTypes}
            />
          </div>
        </div>
      </div>
    </section>
  );
}