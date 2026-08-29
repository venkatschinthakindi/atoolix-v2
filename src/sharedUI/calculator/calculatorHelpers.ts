/**
 * Shared helpers for the finance-suite calculators.
 * Extracted verbatim (no logic changes) from the duplicated copies that
 * previously existed in each individual calculator file.
 */

export function clamp(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export const inputCls =
  "w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition text-sm";
