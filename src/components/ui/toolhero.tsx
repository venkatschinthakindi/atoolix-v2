import { ShieldCheck } from "lucide-react";
import { DropZone } from "@/components/ui/DropZone";
import { FeatureBadge } from "./featureBadge";

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
        <strong className="text-foreground">
          {(anyConfig.inputFormats ?? []).join(", ").toUpperCase()}
        </strong>{" "}
        to <strong className="text-foreground">{(anyConfig.outputFormats?.[0] ?? "").toUpperCase()}</strong>.
        Everything happens securely inside your browser. No uploads. No waiting. No registration.
      </>
    );

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-border bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="absolute inset-0">
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-violet-600/10 blur-3xl" />
      </div>

      <div className="relative px-6 py-8 lg:px-12 lg:py-12">
        {/* 
          Fixes vs. the original:
          - lg:grid-cols-[1.4fr_420px] -> lg:grid-cols-[1.4fr_minmax(300px,420px)]
            so the right column has a floor instead of a hard 420px that fights
            the left column for space on narrower "lg" widths.
          - min-w-0 added to BOTH children below. Without this, grid items default
            to min-width:auto, so unbreakable text (".jpg,.jpeg,.png,.webp") forces
            the track wider than its fr/px value instead of wrapping inside it.
        */}
        <div className="grid gap-10 lg:grid-cols-[1.4fr_minmax(300px,420px)]">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300">
              <ShieldCheck className="h-4 w-4" />
              {eyebrow}
            </div>

            {/* break-words (overflow-wrap: break-word) lets long unbroken
                tokens like ".jpg,.jpeg,.png,.webp" wrap instead of overflowing */}
            <h2 className="mt-6 max-w-2xl break-words text-4xl font-bold tracking-tight text-foreground lg:text-6xl">
              {title}
              <span className="block bg-gradient-to-r from-blue-600 via-slate-900 to-violet-600 dark:from-blue-400 dark:via-white dark:to-violet-400 bg-clip-text text-transparent">
                {titleAccent}
              </span>
            </h2>

            <p className="mt-6 max-w-2xl break-words text-lg leading-8 text-foreground-secondary">
              {resolvedDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {badges.map((b) => (
                <FeatureBadge key={b.label} color={b.color}>
                  {b.label}
                </FeatureBadge>
              ))}
            </div>
          </div>

          <div className="min-w-0 rounded-3xl border border-border bg-surface-sunken p-4 backdrop-blur">
            <div className="text-lg font-semibold text-foreground">Quick Overview</div>

            <div className="mt-6 space-y-4">
              {resolvedStats.map((s) => (
                <div key={s.label} className="flex items-start justify-between gap-3">
                  <span className="shrink-0 text-foreground-secondary">{s.label}</span>
                  {/* text-right + break-words so a long stat value wraps onto
                      a second line instead of getting clipped by the parent */}
                  <span
                    className={
                      "min-w-0 break-words text-right " +
                      (s.color === "emerald"
                        ? "text-emerald-300"
                        : s.color === "blue"
                        ? "text-blue-300"
                        : "font-medium text-foreground")
                    }
                  >
                    {s.value}
                  </span>
                </div>
              ))}
            </div>

            <DropZone
              key={dropzoneKey}
              allowMultiple={anyConfig?.allowMultiple?? false}
              onFiles={handleFiles}
              validFileTypes={validFileTypes}
            />
          </div>
        </div>
      </div>
    </section>
  );
}