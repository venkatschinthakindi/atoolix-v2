"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/utility/cn";

/**
 * "Aurora Eclipse" theme toggle.
 *
 * A pill switch whose track is tinted with this app's own aurora glow
 * tokens (--aurora-purple / --aurora-cyan - the same ones used for the
 * background glow effects elsewhere), so it reads as part of this app's
 * visual language rather than a generic imported icon-swap toggle. The
 * knob morphs between a crescent moon (built from two overlapping
 * circles, no image/SVG needed) with a soft cyan glow, and a sun disc
 * with a warm gradient and two small sparkle accents, sliding between
 * the two ends of the track. A few star flecks fade in on the track in
 * dark mode.
 *
 * Sizing is fixed (44 x 24px hit target aside from padding) so the
 * mounted-guard placeholder below reserves identical space - no layout
 * shift when it swaps in the real control after hydration.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Standard next-themes hydration guard: resolvedTheme is unknown
    // during SSR (the server can't know the client's stored/system
    // preference), so we render a neutral placeholder until mounted,
    // then switch to the real theme-aware icon. This one-time,
    // dependency-free effect is the documented way to detect "has
    // mounted on the client" - there's no alternative that avoids a
    // setState here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "inline-block h-6 w-11 rounded-full bg-surface-raised",
          className
        )}
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "group relative inline-flex h-6 w-11 shrink-0 items-center rounded-full",
        "border border-border-strong/40 transition-colors duration-300",
        "motion-reduce:transition-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        className
      )}
      style={{
        background: isDark
          ? "linear-gradient(135deg, rgb(var(--aurora-purple) / 30%), rgb(var(--aurora-cyan) / 25%))"
          : "linear-gradient(135deg, rgb(var(--aurora-cyan) / 18%), rgb(255 200 120 / 25%))",
      }}
    >
      {/* Star flecks - only visible in dark mode */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-1.5 top-1.5 h-[3px] w-[3px] rounded-full bg-white/80 transition-opacity duration-300",
          isDark ? "opacity-70" : "opacity-0"
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-3 top-3.5 h-[2px] w-[2px] rounded-full bg-white/60 transition-opacity duration-300",
          isDark ? "opacity-60" : "opacity-0"
        )}
      />

      {/* Sliding knob */}
      <span
        aria-hidden="true"
        className={cn(
          "relative z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full",
          "transition-transform duration-300 ease-out motion-reduce:transition-none",
          isDark ? "translate-x-[3px]" : "translate-x-[23px]"
        )}
      >
        {isDark ? (
          // Crescent moon: a light disc with a second, offset disc in the
          // track's own background colour "biting" into it to carve the
          // crescent shape - no image or mask needed.
          <span
            className="relative block h-[18px] w-[18px] rounded-full shadow-[0_0_6px_1px_rgb(var(--aurora-cyan)/45%)]"
            style={{ background: "oklch(0.94 0.02 250)" }}
          >
            <span
              className="absolute -right-1 -top-0.5 h-[16px] w-[16px] rounded-full"
              style={{
                background:
                  "linear-gradient(135deg, rgb(var(--aurora-purple) / 100%), rgb(var(--aurora-cyan) / 100%))",
              }}
            />
          </span>
        ) : (
          // Sun disc with a warm gradient and two tiny sparkle accents.
          <span
            className="relative block h-[18px] w-[18px] rounded-full shadow-[0_0_6px_1px_rgb(255_180_60/55%)]"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, oklch(0.92 0.12 90), oklch(0.75 0.16 55))",
            }}
          >
            <span className="absolute -right-[3px] -top-[3px] h-[3px] w-[3px] rounded-full bg-white/90" />
            <span className="absolute -bottom-[2px] -left-[2px] h-[2px] w-[2px] rounded-full bg-white/70" />
          </span>
        )}
      </span>
    </button>
  );
}
