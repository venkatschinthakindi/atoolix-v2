// Shared timezone helpers used by both the Timezone Converter and the
// Meeting Time Finder. These functions were previously duplicated
// byte-for-byte in both client components; they are extracted here verbatim
// (no logic changes) so both tools consume a single implementation.
//
// Note: `dayDifference` and `searchZones` are intentionally NOT included
// here — the Meeting Time Finder has a more advanced implementation of both
// (multi-day offset support and timezone-abbreviation search) than the
// Timezone Converter. See REFACTOR_PROGRESS.md for the plan to reconcile
// those behind a shared, parameterized implementation without changing
// either tool's current behavior.

import { formatInTimeZone, getTimezoneOffset } from "date-fns-tz";
import { TimeZone } from "@vvo/tzdb";

export const MAX_TARGETS = 10;

export type TargetRow = { id: string; zone: string };

export type ZoneOption = {
  value: string;
  city: string;
  country: string;
  countryCode: string;
  abbreviation: string;
  offset: string;
  label: string;
  searchKey: string;
  valueLower: string;
  cityLower: string;
  countryLower: string;
};

export type ParseReason = "ok" | "invalid" | "gap" | "ambiguous";

let fallbackIdCounter = 0;

export function isValidTz(value: string) {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: value });
    return true;
  } catch {
    return false;
  }
}

export function stableId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  fallbackIdCounter++;
  return `id_${fallbackIdCounter}`;
}

export function normalizeDate(v: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return "";
  const [y, m, d] = v.split("-").map(Number);
  if (y < 1 || m < 1 || m > 12) return "";
  const daysInMonth = new Date(y, m, 0).getDate();
  if (d < 1 || d > daysInMonth) return "";
  return v;
}

export function normalizeTime(v: string) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(v) ? v : "";
}

export function formatOffsetMinutes(totalMinutes: number) {
  const sign = totalMinutes >= 0 ? "+" : "-";
  const abs = Math.abs(totalMinutes);
  const hh = String(Math.floor(abs / 60)).padStart(2, "0");
  const mm = String(abs % 60).padStart(2, "0");
  return `UTC${sign}${hh}:${mm}`;
}

export function offsetText(date: Date, timeZone: string) {
  const mins = getTimezoneOffset(timeZone, date);
  if (!Number.isFinite(mins)) return "";
  return formatOffsetMinutes(Math.round(mins / 60000));
}

export function abbreviation(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "short",
  }).formatToParts(date);
  return parts.find((p) => p.type === "timeZoneName")?.value ?? "";
}

export function weekdayName(date: Date, timeZone: string) {
  return formatInTimeZone(date, timeZone, "EEEE");
}

export function localDateLabel(date: Date, timeZone: string) {
  return formatInTimeZone(date, timeZone, "MMM d");
}

export function resolveLocalTime(
  zone: string,
  dateStr: string,
  timeStr: string
): { instant: Date | null; reason: ParseReason } {
  const [y, m, d] = dateStr.split("-").map(Number);
  const [hh, mm] = timeStr.split(":").map(Number);
  const naiveUTC = new Date(Date.UTC(y, m - 1, d, hh, mm, 0));
  if (Number.isNaN(naiveUTC.getTime())) return { instant: null, reason: "invalid" };

  const original = `${dateStr} ${timeStr}`;

  const offset1 = getTimezoneOffset(zone, naiveUTC);
  const candidate1 = new Date(naiveUTC.getTime() - offset1);
  const offset2 = getTimezoneOffset(zone, candidate1);
  const candidate2 = new Date(naiveUTC.getTime() - offset2);

  const check1 = formatInTimeZone(candidate1, zone, "yyyy-MM-dd HH:mm") === original;
  const check2 = formatInTimeZone(candidate2, zone, "yyyy-MM-dd HH:mm") === original;

  if (check1 && check2) {
    if (candidate1.getTime() === candidate2.getTime()) {
      return { instant: candidate1, reason: "ok" };
    }
    return {
      instant: candidate1.getTime() <= candidate2.getTime() ? candidate1 : candidate2,
      reason: "ambiguous",
    };
  }

  if (check1) return { instant: candidate1, reason: "ok" };
  if (check2) return { instant: candidate2, reason: "ok" };
  return { instant: candidate2, reason: "gap" };
}

export function parseLocalTimeInZone(sourceZone: string, sourceDate: string, sourceTime: string) {
  if (!normalizeDate(sourceDate) || !normalizeTime(sourceTime) || !isValidTz(sourceZone)) {
    return {
      instant: null as Date | null,
      valid: false,
      reason: "invalid" as ParseReason,
      warning: "Enter a valid date and time.",
    };
  }

  const { instant, reason } = resolveLocalTime(sourceZone, sourceDate, sourceTime);

  if (reason === "ok") {
    return { instant, valid: true, reason, warning: "" };
  }
  if (reason === "gap") {
    return {
      instant,
      valid: false,
      reason,
      warning:
        "This local time is invalid in the selected source zone because of a DST spring-forward transition.",
    };
  }
  if (reason === "ambiguous") {
    return {
      instant,
      valid: true,
      reason,
      warning:
        "This local time is ambiguous in the selected source zone because of a DST fall-back transition (it occurs twice). The earlier occurrence is shown.",
    };
  }
  return { instant: null, valid: false, reason: "invalid", warning: "Enter a valid date and time." };
}

export function copyToClipboard(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  }

  return new Promise<boolean>((resolve) => {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      resolve(ok);
    } catch {
      resolve(false);
    }
  });
}

export function buildZoneOptions(date: Date, getTimeZones: TimeZone[]): ZoneOption[] {
  return getTimeZones
    .filter((z) => isValidTz(z.name))
    .map((z) => {
      const city =
        z.mainCities?.[0] ??
        z.name.split("/").pop()?.replace(/_/g, " ") ??
        z.name;

      const country = z.countryName;
      const countryCode = z.countryCode;
      const offset = offsetText(date, z.name);
      const abbreviationValue = abbreviation(date, z.name);
      const label = `${city}, ${country}`;
      const searchKey = [
        z.name,
        city,
        country,
        countryCode,
        abbreviationValue,
        offset,
      ]
        .join(" ")
        .toLowerCase();

      return {
        value: z.name,
        city,
        country,
        countryCode,
        abbreviation: abbreviationValue,
        offset,
        label,
        searchKey,
        valueLower: z.name.toLowerCase(),
        cityLower: city.toLowerCase(),
        countryLower: country.toLowerCase(),
      };
    });
}

export function parseZones(raw: string | null) {
  if (!raw) return [];
  return raw.split("|").map((s) => s.trim()).filter(Boolean).filter(isValidTz);
}

export function encodeZones(zones: string[]) {
  return zones.join("|");
}

export function buildTargets(zones: string[]) {
  const seen = new Set<string>();
  return zones
    .filter((z) => (seen.has(z) ? false : (seen.add(z), true)))
    .slice(0, MAX_TARGETS)
    .map((zone) => ({ id: stableId(), zone }));
}

export function highlightMatch(text: string, query: string) {
  const q = query.trim();
  if (!q) return text;
  const lower = text.toLowerCase();
  const idx = lower.indexOf(q.toLowerCase());
  if (idx < 0) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="rounded bg-amber-300/30">{text.slice(idx, idx + q.length)}</span>
      {text.slice(idx + q.length)}
    </>
  );
}

// NOTE: `noteForTarget` is intentionally NOT extracted here even though its
// own source text is identical in both files. It calls `dayDifference`
// internally with no options argument (the basic/non-extended behavior,
// which is exactly correct for both current call sites — see
// `dayDifference` below). It stays local to each file simply because
// duplicating five lines of glue code isn't worth an extra shared export,
// not because the logic differs.

const COMMON_ABBREVIATIONS: Record<string, string[]> = {
  EST: ["America/New_York"],
  EDT: ["America/New_York"],
  ET: ["America/New_York"],
  CST: ["America/Chicago"],
  CDT: ["America/Chicago"],
  CT: ["America/Chicago"],
  MST: ["America/Denver"],
  MDT: ["America/Denver"],
  MT: ["America/Denver"],
  PST: ["America/Los_Angeles"],
  PDT: ["America/Los_Angeles"],
  PT: ["America/Los_Angeles"],
  AKST: ["America/Anchorage"],
  AKDT: ["America/Anchorage"],
  HST: ["Pacific/Honolulu"],
  AST: ["America/Halifax"],
  ADT: ["America/Halifax"],
  BRT: ["America/Sao_Paulo"],
  GMT: ["UTC", "Europe/London"],
  UTC: ["UTC"],
  BST: ["Europe/London"],
  WET: ["Europe/Lisbon"],
  CET: ["Europe/Paris", "Europe/Berlin", "Europe/Madrid", "Europe/Rome"],
  CEST: ["Europe/Paris", "Europe/Berlin"],
  EET: ["Europe/Athens"],
  EEST: ["Europe/Athens"],
  MSK: ["Europe/Moscow"],
  IST: ["Asia/Kolkata"],
  PKT: ["Asia/Karachi"],
  GST: ["Asia/Dubai"],
  ICT: ["Asia/Bangkok"],
  SGT: ["Asia/Singapore"],
  HKT: ["Asia/Hong_Kong"],
  CST_CHINA: ["Asia/Shanghai"],
  JST: ["Asia/Tokyo"],
  KST: ["Asia/Seoul"],
  WIB: ["Asia/Jakarta"],
  AEST: ["Australia/Sydney"],
  AEDT: ["Australia/Sydney"],
  ACST: ["Australia/Adelaide"],
  AWST: ["Australia/Perth"],
  NZST: ["Pacific/Auckland"],
  NZDT: ["Pacific/Auckland"],
  WAT: ["Africa/Lagos"],
  CAT: ["Africa/Johannesburg"],
  EAT: ["Africa/Nairobi"],
};

/**
 * Day-offset label between two zones at a given instant.
 *
 * `options.extendedRange`:
 * - `false`/omitted (Timezone Converter's original behavior): only ever
 *   returns "Same day", "+1 day", or "-1 day" via a simple string
 *   comparison of the two calendar dates.
 * - `true` (Meeting Time Finder's original behavior): computes the actual
 *   day delta, so extreme offset pairs (e.g. UTC-12 to UTC+14, a 26-hour
 *   spread) correctly show "+2 days" instead of being capped at ±1.
 *
 * These two branches are the exact, unmodified bodies of what used to be
 * two separate `dayDifference` functions — the flag only selects which one
 * runs, so each existing call site's output is unchanged.
 */
export function dayDifference(
  sourceZone: string,
  targetZone: string,
  instant: Date,
  options?: { extendedRange?: boolean }
): string {
  const sourceDay = formatInTimeZone(instant, sourceZone, "yyyy-MM-dd");
  const targetDay = formatInTimeZone(instant, targetZone, "yyyy-MM-dd");
  if (sourceDay === targetDay) return "Same day";

  if (!options?.extendedRange) {
    return targetDay > sourceDay ? "+1 day" : "-1 day";
  }

  const [sy, sm, sd] = sourceDay.split("-").map(Number);
  const [ty, tm, td] = targetDay.split("-").map(Number);
  const sourceMidnight = Date.UTC(sy, sm - 1, sd);
  const targetMidnight = Date.UTC(ty, tm - 1, td);
  const diffDays = Math.round((targetMidnight - sourceMidnight) / 86400000);
  if (diffDays === 1) return "+1 day";
  if (diffDays === -1) return "-1 day";
  return diffDays > 0 ? `+${diffDays} days` : `${diffDays} days`;
}

/**
 * Ranked zone search for the "add a zone" combobox.
 *
 * `options.matchAbbreviations`:
 * - `false`/omitted (Timezone Converter's original behavior): matches on
 *   city/zone/country name and the precomputed `searchKey` only.
 * - `true` (Meeting Time Finder's original behavior): additionally
 *   resolves common timezone abbreviations (EST, PST, IST, ...) via
 *   `COMMON_ABBREVIATIONS`, and treats a live-abbreviation match as a
 *   near-exact hit.
 *
 * When the flag is false, both abbreviation-related conditions are
 * permanently false, so scoring falls through in the exact same order as
 * the original non-abbreviation version — zero output change for either
 * caller. This is a flag selecting between two previously-separate
 * function bodies, not new logic.
 */
export function searchZones(
  options: ZoneOption[],
  query: string,
  selected: Set<string>,
  sourceZone: string,
  opts?: { matchAbbreviations?: boolean }
) {
  const q = query.trim().toLowerCase();

  const pool = options.filter(
    (z) => z.value !== sourceZone && !selected.has(z.value)
  );

  if (!q) {
    return pool
      .sort((a, b) => a.country.localeCompare(b.country) || a.city.localeCompare(b.city))
      .slice(0, 15);
  }

  const abbrevZoneSet = opts?.matchAbbreviations
    ? new Set(COMMON_ABBREVIATIONS[query.trim().toUpperCase()] ?? [])
    : new Set<string>();

  return pool
    .map((z) => {
      let score = 999;
      if (abbrevZoneSet.has(z.value)) score = -1;
      else if (z.cityLower === q || z.valueLower === q) score = 0;
      else if (opts?.matchAbbreviations && z.abbreviation.toLowerCase() === q) score = 0.5;
      else if (z.countryLower === q) score = 1;
      else if (z.cityLower.startsWith(q)) score = 2;
      else if (z.countryLower.startsWith(q)) score = 3;
      else if (z.searchKey.includes(q)) score = 4;
      return { z, score };
    })
    .filter((x) => x.score < 999)
    .sort((a,b)=>
        a.score-b.score ||
        a.z.country.localeCompare(b.z.country) ||
        a.z.city.localeCompare(b.z.city)
    )
    .slice(0, 15)
    .map((x) => x.z);
}
