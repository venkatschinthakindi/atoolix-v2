import type { ComponentType, ReactNode } from "react";
import { StatCard } from "@/components/tools/financeSuite/savings/core/statCard";

export interface CompactHeroFeature {
  /** Full label including the leading emoji, e.g. "🔒 100% Private" */
  label: string;
  body: string;
}

export interface DetailedHeroFeature {
  icon: string;
  /** Tailwind classes for the icon's background + border, e.g. "bg-blue-500/20 border-blue-400/30" */
  iconBg: string;
  title: string;
  body: string;
}

export interface HeroPreviewStat {
  label: string;
  value: string;
  icon: string;
}

interface CalculatorHeroProps {
  /** Icon shown in the small pill badge at the top of the hero. */
  badgeIcon: ComponentType<{ className?: string }>;
  badgeText?: string;
  /** Tailwind color classes for the badge accent (glow / border / bg / text). */
  accentGlow: string;
  accentBorder: string;
  accentBg: string;
  accentText: string;

  title: string;
  description: ReactNode;

  /**
   * "compact" = 3-column emoji + one-line label/body strip (compound interest,
   * fixed deposit, recurring deposit calculators).
   * "detailed" = 2-column icon-box cards with title + body (simple interest
   * calculator's richer feature callouts).
   */
  variant?: "compact" | "detailed";
  compactFeatures?: CompactHeroFeature[];
  detailedFeatures?: DetailedHeroFeature[];

  /** Tailwind gradient stop classes for the live-preview panel's glow, e.g. "from-blue-500/10 via-violet-500/10 to-fuchsia-500/10" */
  gradientClass: string;

  previewTitle: string;
  previewLabel?: string;
  previewValue: string;
  previewNote: string;
  previewStats: HeroPreviewStat[];

  /** Slot for the currency selector rendered under the preview stat cards. */
  children?: ReactNode;
}

/**
 * The calculator landing hero: badge, title, description, feature callouts,
 * and a live-preview panel. Markup extracted verbatim (per-variant) from the
 * four near-identical hero sections previously duplicated across the savings
 * calculators, unified behind props so both the "basic" 3-item strip and the
 * "advanced" icon-box layout are served by the same component.
 */
export function CalculatorHero({
  badgeIcon: BadgeIcon,
  badgeText = "Private finance workspace",
  accentGlow,
  accentBorder,
  accentBg,
  accentText,
  title,
  description,
  variant = "compact",
  compactFeatures = [],
  detailedFeatures = [],
  gradientClass,
  previewTitle,
  previewLabel = "Live preview",
  previewValue,
  previewNote,
  previewStats,
  children,
}: CalculatorHeroProps) {
  return (
    <section className="mb-5 px-5 py-6 sm:px-6 lg:px-8 rounded-3xl border border-border bg-card">
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2">
            <div className="relative">
              <div className={`absolute inset-0 ${accentGlow} blur-md rounded-full animate-pulse`} />

              <div
                className={`relative inline-flex items-center gap-2 rounded-full border ${accentBorder} ${accentBg} px-3 py-1.5 text-xs font-medium ${accentText}`}
              >
                <BadgeIcon className="h-3.5 w-3.5" />
                <span>{badgeText}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
              {title}
            </h1>

            <p className="text-base sm:text-lg text-foreground-secondary leading-relaxed max-w-xl">
              {description}
            </p>
          </div>

          {variant === "compact" ? (
            <div className="grid sm:grid-cols-2 gap-3">
              {compactFeatures.map((f) => (
                <div
                  key={f.label}
                  className="rounded-2xl border border-border bg-surface-raised p-4"
                >
                  <div className="text-sm font-semibold text-foreground">
                    {f.label}
                  </div>
                  <div className="text-xs text-foreground-faint mt-1">{f.body}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              {detailedFeatures.map((f) => (
                <div
                  key={f.title}
                  className="group rounded-2xl border border-border bg-surface-raised p-4"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`shrink-0 w-10 h-10 rounded-xl ${f.iconBg} flex items-center justify-center text-lg`}
                    >
                      {f.icon}
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        {f.title}
                      </div>

                      <div className="text-xs text-foreground-faint mt-0.5">
                        {f.body}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative min-w-0">
          <div
            className={`absolute inset-0 bg-gradient-to-tr ${gradientClass} rounded-3xl blur-2xl`}
          />

          <div className="relative rounded-3xl border border-border bg-surface-sunken backdrop-blur-xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-foreground-faint uppercase tracking-wide">
                  {previewLabel}
                </div>

                <div className="text-sm font-semibold text-foreground">
                  {previewTitle}
                </div>
              </div>

              <div className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-xs text-foreground-faint">Maturity value</div>

              <div className="text-2xl sm:text-3xl font-bold text-foreground mt-2">
                {previewValue}
              </div>

              <div className="text-xs text-status-success mt-2">
                {previewNote}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {previewStats.map((s) => (
                <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} />
              ))}
            </div>

            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
