"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  memo,
  type KeyboardEvent,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format as dfFormat } from "date-fns";
import { formatInTimeZone, getTimezoneOffset } from "date-fns-tz";
import { ChevronDown, ChevronUp, GripVertical, Trash2Icon } from "lucide-react";

import dynamic from "next/dynamic";
import { TimeZone } from "@vvo/tzdb";

import {
  MAX_TARGETS,
  type TargetRow,
  type ZoneOption,
  isValidTz,
  stableId,
  normalizeDate,
  normalizeTime,
  offsetText,
  abbreviation,
  weekdayName,
  localDateLabel,
  parseLocalTimeInZone,
  copyToClipboard,
  buildZoneOptions,
  parseZones,
  encodeZones,
  buildTargets,
  highlightMatch,
} from "@/lib/dateTime/timezoneShared";
import { TimezoneCards } from "@/components/ui/dateTime/TimezoneCards";

const TimezoneSelect = dynamic(
  () => import("@/components/tools/dateTime/timezone-converter/timezoneSelect").then((m) => m.default),
  {
    ssr: false
  }
);


type ResultRow = {
  id: string;
  zone: string;
  display: string;
  localTime: string;
  offset: string;
  abbreviation: string;
  details: string;
  note: string;
  diff: string;
  inHours: boolean;
};

type Validation = {
  sourceDate?: string;
  sourceTime?: string;
  warning?: string;
};

type ConverterState = {
  sourceZone: string;
  sourceDate: string;
  sourceTime: string;
  targets: TargetRow[];
  use24Hour: boolean;
};

// ISO weekday numbering: Monday = 1 ... Sunday = 7 (matches date-fns "i" token).
type WorkingHoursConfig = {
  startTime: string; // "HH:mm", local to each zone
  endTime: string; // "HH:mm", local to each zone
  days: number[]; // ISO weekdays considered "working days", e.g. [1,2,3,4,5]
  slotMinutes: number; // suggestion granularity: 5, 15, 30, or 60
};

const DEFAULT_WORKING_HOURS: WorkingHoursConfig = {
  startTime: "09:00",
  endTime: "17:00",
  days: [1, 2, 3, 4, 5],
  slotMinutes: 15,
};

const WEEKDAY_OPTIONS: { iso: number; label: string }[] = [
  { iso: 1, label: "Mon" },
  { iso: 2, label: "Tue" },
  { iso: 3, label: "Wed" },
  { iso: 4, label: "Thu" },
  { iso: 5, label: "Fri" },
  { iso: 6, label: "Sat" },
  { iso: 7, label: "Sun" },
];

const SLOT_PRECISION_OPTIONS = [5, 15, 30, 60];

type MeetingTemplate = {
  id: string;
  label: string;
  title: string;
  durationMinutes: number;
  description: string;
  workingHours?: Partial<WorkingHoursConfig>;
};

const MEETING_TEMPLATES: MeetingTemplate[] = [
  {
    id: "sales-call",
    label: "Sales call",
    title: "Sales Call",
    durationMinutes: 30,
    description: "Discovery / sales call.",
  },
  {
    id: "board-review",
    label: "Board review",
    title: "Board Review",
    durationMinutes: 90,
    description: "Quarterly board review meeting.",
    workingHours: { startTime: "08:00", endTime: "18:00", days: [1, 2, 3, 4, 5] },
  },
  {
    id: "client-demo",
    label: "Client demo",
    title: "Client Demo",
    durationMinutes: 45,
    description: "Live product demo for the client.",
  },
  {
    id: "travel-briefing",
    label: "Travel briefing",
    title: "Travel Briefing",
    durationMinutes: 20,
    description: "Pre-trip briefing covering itinerary and logistics.",
    workingHours: { startTime: "07:00", endTime: "20:00", days: [1, 2, 3, 4, 5, 6, 7] },
  },
];

const URL_DEBOUNCE_MS = 900;
const TOAST_MS = 3000;

const QUICK_ADD_ZONES = [
  { label: "New York", zone: "America/New_York" },
  { label: "Los Angeles", zone: "America/Los_Angeles" },
  { label: "Chicago", zone: "America/Chicago" },
  { label: "Toronto", zone: "America/Toronto" },
  { label: "Mexico City", zone: "America/Mexico_City" },
  { label: "São Paulo", zone: "America/Sao_Paulo" },
  { label: "London", zone: "Europe/London" },
  { label: "Paris", zone: "Europe/Paris" },
  { label: "Berlin", zone: "Europe/Berlin" },
  { label: "Madrid", zone: "Europe/Madrid" },
  { label: "Rome", zone: "Europe/Rome" },
  { label: "Dubai", zone: "Asia/Dubai" },
  { label: "Mumbai", zone: "Asia/Kolkata" },
  { label: "Singapore", zone: "Asia/Singapore" },
  { label: "Hong Kong", zone: "Asia/Hong_Kong" },
  { label: "Shanghai", zone: "Asia/Shanghai" },
  { label: "Tokyo", zone: "Asia/Tokyo" },
  { label: "Seoul", zone: "Asia/Seoul" },
  { label: "Sydney", zone: "Australia/Sydney" },
  { label: "Auckland", zone: "Pacific/Auckland" },
  { label: "Johannesburg", zone: "Africa/Johannesburg" },
  { label: "UTC", zone: "UTC" },
];

// Common timezone abbreviations mapped to their canonical IANA zone(s).
// Used to let people search "EST", "PST", "IST", "CET", etc. and get a
// sensible zone back, even though the live abbreviation shown for a zone
// changes with DST (e.g. America/New_York shows EDT in summer).
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

function dayDifference(sourceZone: string, targetZone: string, instant: Date) {
  const sourceDay = formatInTimeZone(instant, sourceZone, "yyyy-MM-dd");
  const targetDay = formatInTimeZone(instant, targetZone, "yyyy-MM-dd");
  if (sourceDay === targetDay) return "Same day";
  // Compare the actual calendar dates rather than just their string order, so
  // pairs of zones with an extreme offset gap (e.g. UTC-12 to UTC+14, a
  // 26-hour spread) correctly show "+2 days" instead of being capped at ±1.
  const [sy, sm, sd] = sourceDay.split("-").map(Number);
  const [ty, tm, td] = targetDay.split("-").map(Number);
  const sourceMidnight = Date.UTC(sy, sm - 1, sd);
  const targetMidnight = Date.UTC(ty, tm - 1, td);
  const diffDays = Math.round((targetMidnight - sourceMidnight) / 86400000);
  if (diffDays === 1) return "+1 day";
  if (diffDays === -1) return "-1 day";
  return diffDays > 0 ? `+${diffDays} days` : `${diffDays} days`;
}

function downloadTextFile(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function toCsvValue(value: string) {
  if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

function toCsvRow(values: string[]) {
  return values.map(toCsvValue).join(",");
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

// Formats an instant as a UTC-based ICS date-time (YYYYMMDDTHHMMSSZ). Using
// UTC for DTSTART/DTEND makes the event unambiguous and DST-proof: every
// calendar app resolves it to the correct local time in the recipient's own
// zone regardless of when DST changes happen on either end.
function toIcsUtc(date: Date) {
  return `${date.getUTCFullYear()}${pad2(date.getUTCMonth() + 1)}${pad2(date.getUTCDate())}T${pad2(
    date.getUTCHours()
  )}${pad2(date.getUTCMinutes())}${pad2(date.getUTCSeconds())}Z`;
}

function icsEscape(text: string) {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

function searchZones(
  options: ZoneOption[],
  query: string,
  selected: Set<string>,
  sourceZone: string
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

  // Abbreviation lookup: "EST", "PST", "IST", "CET"... resolves to canonical
  // zone(s) regardless of the zone's *current* live abbreviation (which
  // shifts with DST, e.g. EST -> EDT in summer for America/New_York).
  const abbrevMatches = COMMON_ABBREVIATIONS[query.trim().toUpperCase()] ?? [];
  const abbrevZoneSet = new Set(abbrevMatches);

  return pool
    .map((z) => {
      let score = 999;
      if (abbrevZoneSet.has(z.value)) score = -1;
      else if (z.cityLower === q || z.valueLower === q) score = 0;
      else if (z.abbreviation.toLowerCase() === q) score = 0.5;
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

function noteForTarget(instant: Date, sourceZone: string, targetZone: string) {
  const targetWeekday = weekdayName(instant, targetZone);
  const targetLabel = localDateLabel(instant, targetZone);
  const dst = abbreviation(instant, targetZone).toUpperCase();
  const dayDiff = dayDifference(sourceZone, targetZone, instant);
  return `${targetWeekday} · ${targetLabel} · ${dayDiff} · ${dst || "TZ"}`;
}

// Time difference of targetZone relative to sourceZone at a given instant,
// e.g. "+10h 30m", "-5h", "Same time". Computed from actual UTC offsets so
// it stays correct across DST boundaries on either side.
function diffFromSource(instant: Date, sourceZone: string, targetZone: string) {
  const sourceOffsetMs = getTimezoneOffset(sourceZone, instant);
  const targetOffsetMs = getTimezoneOffset(targetZone, instant);
  if (!Number.isFinite(sourceOffsetMs) || !Number.isFinite(targetOffsetMs)) return "";
  const diffMinutes = Math.round((targetOffsetMs - sourceOffsetMs) / 60000);
  if (diffMinutes === 0) return "Same time";
  const sign = diffMinutes > 0 ? "+" : "-";
  const abs = Math.abs(diffMinutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  if (h === 0) return `${sign}${m}m`;
  if (m === 0) return `${sign}${h}h`;
  return `${sign}${h}h ${m}m`;
}

// Returns the ISO weekday (1 = Monday ... 7 = Sunday) of `instant` as observed
// in `zone`'s local calendar. Always derived from the actual instant, so DST
// transitions and date-line crossings are handled automatically.
function isoWeekdayInZone(instant: Date, zone: string) {
  return Number(formatInTimeZone(instant, zone, "i"));
}

// Whether `instant`, as observed locally in `zone`, falls on a configured
// working day and within the configured start/end local time window. Because
// this always re-derives the local weekday/time from the instant (rather than
// from a fixed offset), it naturally accounts for DST shifts and doesn't
// drift when clocks change in either the source or target zone.
function isWithinWorkingHours(instant: Date, zone: string, config: WorkingHoursConfig) {
  const weekday = isoWeekdayInZone(instant, zone);
  if (!config.days.includes(weekday)) return false;
  const localTime = formatInTimeZone(instant, zone, "HH:mm");
  return localTime >= config.startTime && localTime < config.endTime;
}

// Scans forward from `fromInstant` in fixed UTC steps of `config.slotMinutes`,
// looking for instants where every zone in `zones` is simultaneously within
// its configured working days/hours. Because each candidate instant is
// re-evaluated against each zone's *current* offset (via isWithinWorkingHours),
// results remain correct across DST spring-forward/fall-back transitions that
// occur anywhere within the search window.
function findMeetingSuggestions(
  fromInstant: Date,
  zones: string[],
  config: WorkingHoursConfig,
  options?: { maxResults?: number; horizonDays?: number }
) {
  const maxResults = options?.maxResults ?? 8;
  const horizonDays = options?.horizonDays ?? 10;
  const stepMs = Math.max(5, config.slotMinutes) * 60000;
  const totalSteps = Math.ceil((horizonDays * 24 * 60) / Math.max(5, config.slotMinutes));

  // Start from the next clean slot boundary (in UTC) at or after fromInstant.
  const start = new Date(Math.ceil(fromInstant.getTime() / stepMs) * stepMs);

  const results: Date[] = [];
  for (let i = 0; i < totalSteps && results.length < maxResults; i++) {
    const candidate = new Date(start.getTime() + i * stepMs);
    if (zones.every((zone) => isWithinWorkingHours(candidate, zone, config))) {
      results.push(candidate);
    }
  }
  return results;
}
function normalizeDaysParam(raw: string | null): number[] | null {
  if (raw === null) return null;
  const days = raw
    .split(",")
    .map((d) => Number(d))
    .filter((d) => Number.isInteger(d) && d >= 1 && d <= 7);
  return Array.from(new Set(days)).sort((a, b) => a - b);
}

function buildInitialWorkingHours(searchParams: ReturnType<typeof useSearchParams>): WorkingHoursConfig {
  const start = normalizeTime(searchParams.get("wstart") ?? "");
  const end = normalizeTime(searchParams.get("wend") ?? "");
  const slotRaw = Number(searchParams.get("wslot"));
  const slot = SLOT_PRECISION_OPTIONS.includes(slotRaw) ? slotRaw : null;
  const days = normalizeDaysParam(searchParams.get("wdays"));

  return {
    startTime: start || DEFAULT_WORKING_HOURS.startTime,
    endTime: end || DEFAULT_WORKING_HOURS.endTime,
    slotMinutes: slot ?? DEFAULT_WORKING_HOURS.slotMinutes,
    days: days !== null ? days : DEFAULT_WORKING_HOURS.days,
  };
}

function buildInitialMeetingDetails(searchParams: ReturnType<typeof useSearchParams>) {
  const durationRaw = Number(searchParams.get("mdur"));
  return {
    title: searchParams.get("mtitle") ?? "",
    durationMinutes: Number.isFinite(durationRaw) && durationRaw > 0 ? durationRaw : 30,
    description: searchParams.get("mdesc") ?? "",
  };
}
function buildInitialState(searchParams: ReturnType<typeof useSearchParams>): ConverterState {
  const detectedZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const sourceZone = searchParams.get("source");
  const date = normalizeDate(searchParams.get("date") ?? "");
  const time = normalizeTime(searchParams.get("time") ?? "");
  const format24 = searchParams.get("format") !== "12";
  const parsedTargets = parseZones(searchParams.get("zones"));
  const targets = buildTargets(
    parsedTargets.length ? parsedTargets : ["America/New_York"]
  );

  return {
    sourceZone:
      sourceZone && isValidTz(sourceZone)
        ? sourceZone
        : detectedZone && isValidTz(detectedZone)
          ? detectedZone
          : "UTC",
    sourceDate: date,
    sourceTime: time,
    targets,
    use24Hour: format24,
  };
}

function serializeFullState(
  state: ConverterState,
  workingHours: WorkingHoursConfig,
  meetingTitle: string,
  meetingDurationMinutes: number,
  meetingDescription: string
) {
  const params = new URLSearchParams();
  params.set("source", state.sourceZone);
  params.set("date", state.sourceDate);
  params.set("time", state.sourceTime);
  params.set("zones", encodeZones(state.targets.map((t) => t.zone)));
  params.set("format", state.use24Hour ? "24" : "12");
  params.set("wdays", workingHours.days.join(","));
  params.set("wstart", workingHours.startTime);
  params.set("wend", workingHours.endTime);
  params.set("wslot", String(workingHours.slotMinutes));
  if (meetingTitle.trim()) params.set("mtitle", meetingTitle);
  if (meetingDurationMinutes) params.set("mdur", String(meetingDurationMinutes));
  if (meetingDescription.trim()) params.set("mdesc", meetingDescription);
  return params.toString();
}

const MemoRow = memo(function MemoRow({
  row,
  index,
  total,
  result,
  resultsAreStale,
  onUpdate,
  onMove,
  onRemove,
  onMakeSource,
  selectOptions,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  isDragging,
  isDragOver,
}: {
  row: TargetRow;
  index: number;
  total: number;
  result?: ResultRow;
  resultsAreStale: boolean;
  onUpdate: (id: string, value: string) => void;
  onMove: (id: string, dir: -1 | 1) => void;
  onRemove: (id: string) => void;
  onMakeSource: (zone: string) => void;
  selectOptions: any[];
  onDragStart: (id: string) => void;
  onDragOver: (id: string) => void;
  onDrop: (id: string) => void;
  onDragEnd: () => void;
  isDragging: boolean;
  isDragOver: boolean;
}) {
  return (
    <tr
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        try {
          e.dataTransfer.setData("text/plain", row.id);
        } catch {}
        onDragStart(row.id);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        onDragOver(row.id);
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop(row.id);
      }}
      onDragEnd={onDragEnd}
      className={`border-b border-white/5 align-top transition-colors ${
        isDragging ? "opacity-40" : ""
      } ${isDragOver ? "bg-white/10" : ""}`}
    >
      <th scope="row" className="py-4 pr-3 text-left font-normal">
        <div className="flex items-start gap-2">
          <span
            aria-hidden="true"
            className="mt-4 cursor-grab select-none text-zinc-500 active:cursor-grabbing"
            title="Drag to reorder"
          >
            <GripVertical className="h-4 w-4" />
          </span>
          <div className="max-w-[320px] flex-1">
            <TimezoneSelect
              value={row.zone}
              onChange={(value) => onUpdate(row.id, value)}
              options={selectOptions}
              placeholder="Search timezone..."
            />
          </div>
        </div>
      </th>

      <td className="py-4 pr-3">
        <button type="button" onClick={() => onMakeSource(row.zone)} className="text-left">
          <div className={`text-base font-semibold tabular-nums ${resultsAreStale ? "text-zinc-500" : "text-white"}`}>
            {result?.display ?? "Waiting for valid input"}
          </div>
        </button>
        <div className="mt-1 text-xs sm:text-sm text-zinc-400">{row.zone}</div>
      </td>

      <td className="py-4 pr-3">
        <div className="text-sm text-zinc-300">{result?.localTime ?? ""}</div>
      </td>

      <td className="py-4 pr-3">
        <div className="flex max-w-[280px] flex-col gap-1.5">
          <span className="text-sm text-zinc-200">{result?.details ?? ""}</span>
          <span className="text-xs text-zinc-400">{result?.note ?? ""}</span>
          {result ? (
            <span
              className={`mt-0.5 inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                result.inHours
                  ? "bg-emerald-500/15 text-emerald-300"
                  : "bg-white/5 text-zinc-500"
              }`}
            >
              {result.inHours ? "● Working hours" : "○ Outside working hours"}
            </span>
          ) : null}
        </div>
      </td>

      <td className="py-4 pr-3">
        <div className="text-sm text-zinc-300">
          <div>{result?.abbreviation ?? ""}</div>
          <div>{result?.offset ?? ""}</div>
        </div>
      </td>

      <td className="py-4 pr-3">
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium tabular-nums ${
            resultsAreStale
              ? "bg-white/5 text-zinc-500"
              : result?.diff === "Same time"
                ? "bg-emerald-500/15 text-emerald-300"
                : "bg-indigo-500/15 text-indigo-300"
          }`}
        >
          {result?.diff ?? ""}
        </span>
      </td>

      <td className="py-4 pr-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onMove(row.id, -1)}
            disabled={index === 0}
            className="rounded-full border border-white/10 bg-black/30 px-2 py-2 text-xs text-zinc-300 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300 disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:bg-black/30 disabled:hover:text-zinc-300"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onMove(row.id, 1)}
            disabled={index === total - 1}
            className="rounded-full border border-white/10 bg-black/30 px-2 py-2 text-xs text-zinc-300 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300 disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:bg-black/30 disabled:hover:text-zinc-300"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
          {index !== 0 ? (
            <button
              type="button"
              onClick={() => onRemove(row.id)}
              className="rounded-full border border-rose-400/20 bg-rose-400/5 px-3 py-2 text-xs text-rose-300 transition hover:border-rose-400/40 hover:bg-rose-400/15"
            >
              <Trash2Icon className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </td>
    </tr>
  );
});

/** Numbered step badge used to make each section's place in the flow obvious
 *  at a glance, without changing any of the section's own logic. */
function StepHeader({
  step,
  title,
  subtitle,
  optional,
  badge,
}: {
  step: number;
  title: string;
  subtitle?: string;
  optional?: boolean;
  badge?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-xs font-semibold text-cyan-300">
        {step}
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {optional ? (
            <span className="rounded-full border border-white/10 bg-black/30 px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-400">
              Optional
            </span>
          ) : null}
          {badge ? (
            <span className="rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-300">
              {badge}
            </span>
          ) : null}
        </div>
        {subtitle ? <p className="mt-1 text-sm text-zinc-400">{subtitle}</p> : null}
      </div>
    </div>
  );
}

/** Plain-language explainer for the two things that confuse people most in a
 *  timezone tool: Daylight Saving Time, and why a converted time sometimes
 *  lands on a different calendar day. Written for non-technical users. */
function TimezoneHelpNote() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-white/5 transition"
      >
        <span className="text-xs font-medium text-zinc-300">
          ⓘ Why times sometimes shift by an hour, or land on a different day
        </span>
        <span className="text-white/40 text-sm">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 text-xs text-zinc-400 leading-relaxed space-y-4 border-t border-white/10">
          <div>
            <div className="text-white/80 font-medium mb-1">
              🕑 Daylight Saving Time (DST)
            </div>
            <p>
              Many countries move their clocks forward an hour in spring and
              back an hour in autumn. Because of this, the gap between two
              zones isn't always fixed — e.g. London and New York are 5 hours
              apart most of the year, but only 4 hours apart for a few weeks
              each spring/autumn when one region has already changed its
              clocks and the other hasn't yet. This tool checks the real
              rules for each zone on your exact chosen date, so the
              difference shown is always correct for that day — not just a
              rough year-round average.
            </p>
          </div>
          <div>
            <div className="text-white/80 font-medium mb-1">
              ⏭️ "This time doesn't exist" (spring forward)
            </div>
            <p>
              Once a year, some zones skip an hour entirely — clocks jump
              straight from, say, 1:59 AM to 3:00 AM. If you type a time in
              that skipped hour, it's not a real moment in that zone, so this
              tool will warn you and won't let you convert it until you pick
              a valid time.
            </p>
          </div>
          <div>
            <div className="text-white/80 font-medium mb-1">
              🔁 "This time happens twice" (fall back)
            </div>
            <p>
              Once a year, some zones repeat an hour — clocks go from 1:59 AM
              back to 1:00 AM, so times like "1:30 AM" happen twice in one
              night. If you enter a time like this, the tool will use the
              earlier of the two and let you know it did so.
            </p>
          </div>
          <div>
            <div className="text-white/80 font-medium mb-1">
              📅 "+1 day" / "-1 day" badges
            </div>
            <p>
              Because zones are spread around a round globe, the same moment
              can be "today" in one place and already "tomorrow" (or still
              "yesterday") somewhere else. A badge like{" "}
              <span className="text-white">+1 day</span> next to a zone means
              it's a calendar day ahead of your source zone at that moment;{" "}
              <span className="text-white">-1 day</span> means a day behind.
              For a handful of extreme zone pairs on opposite sides of the
              International Date Line, this can even be{" "}
              <span className="text-white">+2 days</span> — the tool accounts
              for that too, rather than assuming it's always just one day.
            </p>
          </div>
          <div>
            <div className="text-white/80 font-medium mb-1">
              ✅ Working hours badge
            </div>
            <p>
              "● Working hours" means that person's local clock, on that
              exact date, falls within the working days/hours you've set for
              this comparison — automatically adjusted for their own DST
              rules, not yours.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MeetingTimeFinderClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchId = useId();
  const searchWrapRef = useRef<HTMLDivElement | null>(null);
  const debounceRef = useRef<number | null>(null);
  const toastRef = useRef<number | null>(null);
  const searchCloseRef = useRef<number | null>(null);
  const lastSyncedParamsRef = useRef<string>(searchParams.toString());

  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [copyNote, setCopyNote] = useState<string | null>(null);
  const [copyError, setCopyError] = useState<string | null>(null);
  const [validation, setValidation] = useState<Validation>({});
  const [state, setState] = useState<ConverterState>(() => buildInitialState(searchParams));
  const [nowTick, setNowTick] = useState(() => Date.now());
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [workingHours, setWorkingHours] = useState<WorkingHoursConfig>(DEFAULT_WORKING_HOURS);
  const [meetingSuggestions, setMeetingSuggestions] = useState<Date[] | null>(null);
  const [suggestionsNote, setSuggestionsNote] = useState<string>("");
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDurationMinutes, setMeetingDurationMinutes] = useState(30);
  const [meetingDescription, setMeetingDescription] = useState("");
  const [activeTemplateId, setActiveTemplateId] = useState<string | null>(null);

  /* Progressive disclosure: keep the advanced sections collapsed by default
     so the page reads as "set time → compare zones" at a glance, with
     meeting-finding and export available as clearly-labelled optional steps. */
  const [finderOpen, setFinderOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const currentZone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    []
  );

  useEffect(() => {
    setMounted(true);
    const initial = buildInitialState(searchParams);
    const now = new Date();
    setState((prev) => ({
      ...prev,
      ...initial,
      sourceDate: initial.sourceDate || dfFormat(now, "yyyy-MM-dd"),
      sourceTime: initial.sourceTime || dfFormat(now, "HH:mm"),
    }));

    setWorkingHours(buildInitialWorkingHours(searchParams));

    const initialMeeting = buildInitialMeetingDetails(searchParams);
    setMeetingTitle(initialMeeting.title);
    setMeetingDurationMinutes(initialMeeting.durationMinutes);
    setMeetingDescription(initialMeeting.description);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setNowTick(Date.now()), 5 * 60 * 1000);
    return () => window.clearInterval(id);
  }, []);

  
  const parse = useMemo(
    () => parseLocalTimeInZone(state.sourceZone, state.sourceDate, state.sourceTime),
    [state.sourceZone, state.sourceDate, state.sourceTime]
  );
  const validInputs = (parse.valid || parse.reason === "ambiguous") && !!parse.instant && state.targets.length > 0;
  const resultsAreStale = !(parse.valid || parse.reason === "ambiguous");

  useEffect(() => {
    setValidation({
      sourceDate: state.sourceDate && !normalizeDate(state.sourceDate) ? "Invalid date." : "",
      sourceTime: state.sourceTime && !normalizeTime(state.sourceTime) ? "Invalid time." : "",
      warning: parse.warning || "",
    });
  }, [state.sourceDate, state.sourceTime, parse.warning]);

  const selectedInstant = useMemo(() => {
    if (!validInputs || !parse.instant) return null;
    return parse.instant;
  }, [validInputs, parse.instant]);

  const [getTimeZones, setTimeZones] = useState<TimeZone[]>([]);
  useEffect(() => {
    let mounted = true;

    (async () => {
      const { getTimeZones } = await import("@vvo/tzdb");

      if (mounted) {
        setTimeZones(getTimeZones());
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);
  const now = useMemo(() => new Date(nowTick), [nowTick]);
  const optionReferenceDate = selectedInstant ?? now;
  const zoneOptions = useMemo(() => buildZoneOptions(optionReferenceDate, getTimeZones).sort(
    (a, b) => a.country.localeCompare(b.country) || a.city.localeCompare(b.city)
  ), [optionReferenceDate, getTimeZones]);

  const zoneMap = useMemo(
    () => new Map(zoneOptions.map((z) => [z.value, z])),
    [zoneOptions]
  );

  const selectOptions = useMemo(
    () =>
      zoneOptions.map((z) => ({
        value: z.value,
        label: z.label,
        city: z.city,
        country: z.country,
        abbreviation: z.abbreviation,
        // TimezoneSelect's own item template prepends "UTC" itself, so pass
        // just the "+06:00" part here to avoid it rendering "UTCUTC+06:00".
        // offsetText()/z.offset elsewhere in this file keep the full "UTC+.."
        // form, since those are rendered directly without another prefix.
        offset: z.offset.replace(/^UTC/, ""),
      })),
    [zoneOptions]
  );

  useEffect(() => {
    if (!mounted) return;
    if (!normalizeDate(state.sourceDate)) return;
    if (!normalizeTime(state.sourceTime)) return;

    const next = serializeFullState(
      state,
      workingHours,
      meetingTitle,
      meetingDurationMinutes,
      meetingDescription
    );
    if (next === searchParams.toString()) return;

    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      lastSyncedParamsRef.current = next;
      router.replace(`${pathname}?${next}`, { scroll: false });
    }, URL_DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [mounted, state, workingHours, meetingTitle, meetingDurationMinutes, meetingDescription, pathname, router]);

  useEffect(() => {
    if (!mounted) return;
    const current = searchParams.toString();
    if (current === lastSyncedParamsRef.current) return;
    lastSyncedParamsRef.current = current;
    setState(buildInitialState(searchParams));
    setWorkingHours(buildInitialWorkingHours(searchParams));
    const meeting = buildInitialMeetingDetails(searchParams);
    setMeetingTitle(meeting.title);
    setMeetingDurationMinutes(meeting.durationMinutes);
    setMeetingDescription(meeting.description);
  }, [mounted, searchParams]);



  const results = useMemo<ResultRow[]>(() => {
    if (!selectedInstant || !validInputs) return [];
    return state.targets.map((row) => {
      const display = formatInTimeZone(
        selectedInstant,
        row.zone,
        state.use24Hour ? "EEE, MMM d yyyy HH:mm" : "EEE, MMM d yyyy hh:mm a"
      );
      const localTime = formatInTimeZone(
        selectedInstant,
        row.zone,
        state.use24Hour ? "HH:mm" : "hh:mm a"
      );
      const offset = offsetText(selectedInstant, row.zone);
      const abbr = abbreviation(selectedInstant, row.zone);
      const details = `${weekdayName(selectedInstant, row.zone)} · ${localDateLabel(selectedInstant, row.zone)} · ${abbr || "TZ"}`;
      const note = noteForTarget(selectedInstant, state.sourceZone, row.zone);
      const diff = diffFromSource(selectedInstant, state.sourceZone, row.zone);
      const inHours = isWithinWorkingHours(selectedInstant, row.zone, workingHours);
      return {
        id: row.id,
        zone: row.zone,
        display,
        localTime,
        offset,
        abbreviation: abbr,
        details,
        note,
        diff,
        inHours,
      };
    });
  }, [selectedInstant, validInputs, state.targets, state.use24Hour, state.sourceZone, workingHours]);

  const resultMap = useMemo(() => new Map(results.map((r) => [r.id, r])), [results]);

  // How many of the compared zones (source + targets) are within working
  // hours right now — used to give the hero a genuinely useful summary
  // instead of a generic reassurance message.
  const workingHoursSummary = useMemo(() => {
    if (!selectedInstant) return null;
    const zones = [state.sourceZone, ...state.targets.map((t) => t.zone)];
    const inHours = zones.filter((z) =>
      isWithinWorkingHours(selectedInstant, z, workingHours)
    ).length;
    return { inHours, total: zones.length };
  }, [selectedInstant, state.sourceZone, state.targets, workingHours]);
  const selectedZones = useMemo(() => new Set(state.targets.map((t) => t.zone)), [state.targets]);
  const suggestions = useMemo(
    () => searchZones(zoneOptions, query, selectedZones, state.sourceZone),
    [zoneOptions, query, selectedZones, state.sourceZone]
  );

  const showToast = useCallback((kind: "note" | "error", message: string) => {
    if (toastRef.current) window.clearTimeout(toastRef.current);
    if (kind === "note") {
      setCopyError(null);
      setCopyNote(message);
    } else {
      setCopyNote(null);
      setCopyError(message);
    }
    toastRef.current = window.setTimeout(() => {
      setCopyNote(null);
      setCopyError(null);
    }, TOAST_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (toastRef.current) window.clearTimeout(toastRef.current);
    };
  }, []);

  const updateTarget = useCallback(
    (id: string, value: string) => {
      if (!isValidTz(value)) return;
      setState((prev) => {
        const index = prev.targets.findIndex((t) => t.id === id);
        if (index < 0) return prev;
        if (value === prev.sourceZone) {
          showToast("error", "That's already your source zone — pick a different one, or use \"Make source\" instead.");
          return prev;
        }
        if (prev.targets.some((t, i) => i !== index && t.zone === value)) {
          showToast("error", "That zone is already selected.");
          return prev;
        }
        const next = [...prev.targets];
        next[index] = { ...next[index], zone: value };
        return { ...prev, targets: next };
      });
    },
    [showToast]
  );

  const moveTarget = useCallback((id: string, dir: -1 | 1) => {
    setState((prev) => {
      const index = prev.targets.findIndex((t) => t.id === id);
      const nextIndex = index + dir;
      if (index < 0 || nextIndex < 0 || nextIndex >= prev.targets.length) return prev;
      const next = [...prev.targets];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      return { ...prev, targets: next };
    });
  }, []);

  const reorderTargets = useCallback((sourceId: string, targetId: string) => {
    if (sourceId === targetId) return;
    setState((prev) => {
      const from = prev.targets.findIndex((t) => t.id === sourceId);
      const to = prev.targets.findIndex((t) => t.id === targetId);
      if (from < 0 || to < 0) return prev;
      const next = [...prev.targets];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return { ...prev, targets: next };
    });
  }, []);

  const handleRowDragStart = useCallback((id: string) => {
    setDragId(id);
    setDragOverId(id);
  }, []);

  const handleRowDragOver = useCallback((id: string) => {
    setDragOverId((prev) => (prev === id ? prev : id));
  }, []);

  const handleRowDrop = useCallback(
    (id: string) => {
      if (dragId) reorderTargets(dragId, id);
      setDragId(null);
      setDragOverId(null);
    },
    [dragId, reorderTargets]
  );

  const handleRowDragEnd = useCallback(() => {
    setDragId(null);
    setDragOverId(null);
  }, []);

  const removeTarget = useCallback((id: string) => {
    setState((prev) => {
      if (prev.targets.length <= 1) return prev;
      return { ...prev, targets: prev.targets.filter((t) => t.id !== id) };
    });
  }, []);

  const addTarget = useCallback(
    (value: string) => {
      if (!isValidTz(value)) return;
      setState((prev) => {
        if (prev.targets.length >= MAX_TARGETS) {
          showToast("error", "Maximum of 10 target zones reached.");
          return prev;
        }
        if (prev.targets.some((t) => t.zone === value) || prev.sourceZone === value) {
          showToast("error", "That zone is already selected.");
          return prev;
        }
        return { ...prev, targets: [...prev.targets, { id: stableId(), zone: value }] };
      });
      setQuery("");
      setActiveIndex(-1);
    },
    [showToast]
  );

  const copyShareLink = useCallback(async () => {
    if (resultsAreStale) {
      showToast("error", "Fix the source date/time before sharing a link.");
      return;
    }
    const allowed = new URLSearchParams();
    allowed.set("source", state.sourceZone);
    allowed.set("date", state.sourceDate);
    allowed.set("time", state.sourceTime);
    allowed.set("zones", encodeZones(state.targets.map((t) => t.zone)));
    allowed.set("format", state.use24Hour ? "24" : "12");
    allowed.set("wdays", workingHours.days.join(","));
    allowed.set("wstart", workingHours.startTime);
    allowed.set("wend", workingHours.endTime);
    allowed.set("wslot", String(workingHours.slotMinutes));
    if (meetingTitle.trim()) allowed.set("mtitle", meetingTitle);
    if (meetingDurationMinutes) allowed.set("mdur", String(meetingDurationMinutes));
    if (meetingDescription.trim()) allowed.set("mdesc", meetingDescription);
    const ok = await copyToClipboard(`${window.location.origin}${pathname}?${allowed.toString()}`);
    if (ok) showToast("note", "Share link copied.");
    else showToast("error", "Copy failed.");
  }, [
    resultsAreStale,
    pathname,
    state.sourceZone,
    state.sourceDate,
    state.sourceTime,
    state.targets,
    state.use24Hour,
    workingHours,
    meetingTitle,
    meetingDurationMinutes,
    meetingDescription,
    showToast,
  ]);

  const jumpToNow = useCallback(() => {
    const now = new Date();
    setState((prev) => ({
      ...prev,
      sourceDate: formatInTimeZone(now, prev.sourceZone, "yyyy-MM-dd"),
      sourceTime: formatInTimeZone(now, prev.sourceZone, "HH:mm"),
    }));
  }, []);

  const toggleWorkingDay = useCallback((iso: number) => {
    setWorkingHours((prev) => {
      const has = prev.days.includes(iso);
      const days = has ? prev.days.filter((d) => d !== iso) : [...prev.days, iso].sort((a, b) => a - b);
      return { ...prev, days };
    });
  }, []);

  const findSlots = useCallback(() => {
    const zones = [state.sourceZone, ...state.targets.map((t) => t.zone)];
    if (workingHours.days.length === 0) {
      setMeetingSuggestions([])
      setSuggestionsNote("Select at least one working day.");
      return;
    }
    if (workingHours.startTime >= workingHours.endTime) {
      setMeetingSuggestions([])
      setSuggestionsNote("Start time must be before end time.");
      return;
    }
    const from = selectedInstant ?? new Date();
    const found = findMeetingSuggestions(from, zones, workingHours, { maxResults: 8, horizonDays: 10 });
    setMeetingSuggestions(found)
    setSuggestionsNote(
      found.length === 0
        ? "No overlapping working-hours slot found in the next 10 days with the current settings. Try widening the hours or days."
        : ""
    );
  }, [state.sourceZone, state.targets, selectedInstant, workingHours]);

  const applySuggestion = useCallback(
    (instant: Date) => {
      setState((prev) => ({
        ...prev,
        sourceDate: formatInTimeZone(instant, prev.sourceZone, "yyyy-MM-dd"),
        sourceTime: formatInTimeZone(instant, prev.sourceZone, "HH:mm"),
      }));
      setMeetingSuggestions(null)
      showToast("note", "Meeting time applied to the source date/time.");
    },
    [showToast]
  );

  const applyTemplate = useCallback((template: MeetingTemplate) => {
    setMeetingTitle(template.title);
    setMeetingDurationMinutes(template.durationMinutes);
    setMeetingDescription(template.description);
    setActiveTemplateId(template.id);
    if (template.workingHours) {
      setWorkingHours((prev) => ({ ...prev, ...template.workingHours }));
    }
  }, []);

  const exportCsv = useCallback(() => {
    if (!selectedInstant || resultsAreStale) {
      showToast("error", "Fix the source date/time before exporting.");
      return;
    }
    const header = [
      "Zone",
      "Location",
      "Role",
      "Local date",
      "Local time",
      "Weekday",
      "Abbreviation",
      "UTC offset",
      "Diff vs source",
      "Working hours",
    ];

    const rowFor = (zone: string, role: string): string[] => [
      zone,
      zoneMap.get(zone)?.label ?? zone,
      role,
      formatInTimeZone(selectedInstant, zone, "yyyy-MM-dd"),
      formatInTimeZone(selectedInstant, zone, state.use24Hour ? "HH:mm" : "hh:mm a"),
      weekdayName(selectedInstant, zone),
      abbreviation(selectedInstant, zone),
      offsetText(selectedInstant, zone),
      zone === state.sourceZone ? "Source" : diffFromSource(selectedInstant, state.sourceZone, zone),
      isWithinWorkingHours(selectedInstant, zone, workingHours) ? "Yes" : "No",
    ];

    const rows = [
      rowFor(state.sourceZone, "Source"),
      ...state.targets.map((t) => rowFor(t.zone, "Target")),
    ];

    const csv = [toCsvRow(header), ...rows.map(toCsvRow)].join("\r\n");
    const filename = `timezone-comparison-${formatInTimeZone(selectedInstant, state.sourceZone, "yyyyMMdd-HHmm")}.csv`;
    downloadTextFile(csv, filename, "text/csv;charset=utf-8;");
    showToast("note", "CSV exported.");
  }, [selectedInstant, resultsAreStale, state.sourceZone, state.targets, state.use24Hour, workingHours, zoneMap, showToast]);

  const exportIcs = useCallback(() => {
    if (!selectedInstant || resultsAreStale) {
      showToast("error", "Fix the source date/time before exporting.");
      return;
    }
    const duration = Number.isFinite(meetingDurationMinutes) && meetingDurationMinutes > 0 ? meetingDurationMinutes : 30;
    const start = selectedInstant;
    const end = new Date(start.getTime() + duration * 60000);
    const title = meetingTitle.trim() || "Meeting";

    const zoneLines = [state.sourceZone, ...state.targets.map((t) => t.zone)]
      .map((zone) => {
        const label = zoneMap.get(zone)?.label ?? zone;
        const localStr = formatInTimeZone(
          start,
          zone,
          state.use24Hour ? "EEE, MMM d yyyy HH:mm" : "EEE, MMM d yyyy hh:mm a"
        );
        return `${label} (${zone}): ${localStr}`;
      })
      .join("\n");

    const description = [meetingDescription.trim(), "Local times:", zoneLines].filter(Boolean).join("\n\n");
    const uid = `${stableId()}@timezone-converter`;

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Timezone Converter//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${toIcsUtc(new Date())}`,
      `DTSTART:${toIcsUtc(start)}`,
      `DTEND:${toIcsUtc(end)}`,
      `SUMMARY:${icsEscape(title)}`,
      `DESCRIPTION:${icsEscape(description)}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const safeName = title.replace(/[^a-z0-9]+/gi, "-").toLowerCase() || "meeting";
    downloadTextFile(ics, `${safeName}.ics`, "text/calendar;charset=utf-8;");
    showToast("note", "Calendar invite (.ics) downloaded.");
  }, [
    selectedInstant,
    resultsAreStale,
    meetingDurationMinutes,
    meetingTitle,
    meetingDescription,
    state.sourceZone,
    state.targets,
    state.use24Hour,
    zoneMap,
    showToast,
  ]);

  useEffect(() => {
    setMeetingSuggestions(null)
    setSuggestionsNote("");
  }, [workingHours]);

  const onSearchKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex(i =>
            i <= 0
                ? suggestions.length - 1
                : i - 1
        );
      } else if (e.key === "Enter") {
        const pick = suggestions[activeIndex] ?? suggestions[0];
        if (pick) {
          e.preventDefault();
          addTarget(pick.value);
        }
      } else if (e.key === "Escape") {
        setQuery("");
        setActiveIndex(-1);
      }
    },
    [suggestions, activeIndex, addTarget]
  );

  useEffect(() => {
    if (activeIndex >= suggestions.length) setActiveIndex(-1);
  }, [query, suggestions.length, activeIndex]);

  useEffect(() => {
    function onFocusOut(e: FocusEvent) {
      if (!searchWrapRef.current) return;
      const next = e.relatedTarget as Node | null;
      if (next && searchWrapRef.current.contains(next)) return;
      if (searchCloseRef.current) window.clearTimeout(searchCloseRef.current);
      searchCloseRef.current = window.setTimeout(() => {
        setQuery("");
        setActiveIndex(-1);
      }, 120);
    }

    function onPointerDown(e: PointerEvent) {
      if (!searchWrapRef.current) return;
      if (searchWrapRef.current.contains(e.target as Node)) return;
      setQuery("");
      setActiveIndex(-1);
    }

    const node = searchWrapRef.current;
    node?.addEventListener("focusout", onFocusOut);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      node?.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("pointerdown", onPointerDown);
      if (searchCloseRef.current) window.clearTimeout(searchCloseRef.current);
    };
  }, []);

  const makeSource = useCallback((zone: string) => {
    if (!isValidTz(zone)) return;
    setState((prev) => {
      if (zone === prev.sourceZone) return prev;
      const targetIndex = prev.targets.findIndex((t) => t.zone === zone);
      if (targetIndex < 0) {
        return { ...prev, sourceZone: zone };
      }
      const nextTargets = [...prev.targets];
      nextTargets[targetIndex] = { ...nextTargets[targetIndex], zone: prev.sourceZone };
      return { ...prev, sourceZone: zone, targets: nextTargets };
    });
  }, []);

  const sourceDisplay = selectedInstant
    ? formatInTimeZone(
        selectedInstant,
        state.sourceZone,
        state.use24Hour ? "EEE, MMM d yyyy HH:mm" : "EEE, MMM d yyyy hh:mm a"
      )
    : "Waiting for valid input";

  return (
    <div className="font-mono">
      <div className="app-container page-section pt-2">
        <section className="mb-8 rounded-3xl border border-white/10 bg-slate-950/60 p-6 sm:p-8">
          <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] items-start">
            {/* Left: badge, heading, subtext, feature pills */}
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-medium text-cyan-300">
                🌍 Free · Browser Based · No Signup
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-white">Compare Time Zones</span>
                <br />
                <span className="text-cyan-300">in Seconds</span>
              </h2>
              <p className="text-sm sm:text-base leading-7 text-zinc-300 max-w-xl">
                Find the next slot where everyone's working hours overlap. Set
                working days and hours, apply a meeting template, and export
                a CSV or calendar invite. Just need a quick conversion? Try
                the{" "}
                <Link
                  href="/tools/datetime/timezone-converter"
                  className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200"
                >
                  Timezone Converter
                </Link>
                .
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1.5 text-xs font-medium text-blue-300">
                  ⚡ Instant Comparison
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
                  🔄 DST-Aware
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1.5 text-xs font-medium text-violet-300">
                  📅 Export Ready
                </span>
              </div>
            </div>

            {/* Right: live "Right Now" mini world clock — built from the
                same comparison data the tool already computes, so it shows
                what this tool actually does rather than generic stats */}
            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-white">
                  🕐 Right Now
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${
                    resultsAreStale ? "text-amber-300" : "text-emerald-300"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      resultsAreStale ? "bg-amber-400" : "bg-emerald-400"
                    }`}
                  />
                  {resultsAreStale ? "Check input" : "Live"}
                </span>
              </div>

              {/* Source zone — the anchor everything else is measured from */}
              <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-3">
                <div className="text-[11px] uppercase tracking-wide text-cyan-300/70 truncate">
                  {zoneMap.get(state.sourceZone)?.city ?? state.sourceZone} · Source
                </div>
                <div className="mt-1 text-2xl font-bold tabular-nums text-white">
                  {selectedInstant
                    ? formatInTimeZone(
                        selectedInstant,
                        state.sourceZone,
                        state.use24Hour ? "HH:mm" : "hh:mm a"
                      )
                    : "--:--"}
                </div>
              </div>

              {/* A peek at the first few zones being compared */}
              <div className="mt-3 space-y-2">
                {results.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-white/10 px-4 py-3 text-center text-xs text-zinc-500">
                    Add a zone below to see it compared here.
                  </div>
                ) : (
                  results.slice(0, 3).map((r) => (
                    <div
                      key={r.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2.5"
                    >
                      <span className="truncate text-sm text-zinc-300">
                        {zoneMap.get(r.zone)?.city ?? r.zone}
                      </span>
                      <div className="flex shrink-0 items-center gap-2">
                        <span className="text-sm font-medium tabular-nums text-white">
                          {r.localTime}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium tabular-nums ${
                            r.diff === "Same time"
                              ? "bg-emerald-500/15 text-emerald-300"
                              : "bg-indigo-500/15 text-indigo-300"
                          }`}
                        >
                          {r.diff}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {state.targets.length > 3 ? (
                <div className="mt-2 text-center text-[11px] text-zinc-500">
                  +{state.targets.length - 3} more in the full comparison below
                </div>
              ) : null}

              {/* Useful, live summary instead of a generic privacy note:
                  tells you right away whether now is actually a workable
                  time for everyone, tied to the working hours you've set. */}
              {workingHoursSummary ? (
                <div
                  className={`mt-4 rounded-xl border px-4 py-3 text-center ${
                    workingHoursSummary.inHours === workingHoursSummary.total
                      ? "border-emerald-400/25 bg-emerald-400/5"
                      : workingHoursSummary.inHours === 0
                      ? "border-rose-400/20 bg-rose-400/5"
                      : "border-amber-400/20 bg-amber-400/5"
                  }`}
                >
                  <div
                    className={`text-sm font-semibold ${
                      workingHoursSummary.inHours === workingHoursSummary.total
                        ? "text-emerald-300"
                        : workingHoursSummary.inHours === 0
                        ? "text-rose-300"
                        : "text-amber-300"
                    }`}
                  >
                    {workingHoursSummary.inHours === workingHoursSummary.total
                      ? "✅ Great time to meet"
                      : `⚠️ ${workingHoursSummary.inHours} of ${workingHoursSummary.total} zones in working hours`}
                  </div>
                  <div className="mt-1 text-[11px] text-white/40">
                    {workingHoursSummary.inHours === workingHoursSummary.total
                      ? "Everyone's within working hours right now."
                      : 'Use "Find a meeting time" below for a slot that works for everyone.'}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="mb-6">
          <TimezoneHelpNote />
        </section>

        <section className="mb-6 rounded-3xl border border-white/10 bg-slate-950/60 p-4 sm:p-5">
          <StepHeader
            step={1}
            title="Set your time & add zones to compare"
            subtitle="Pick the source zone, date and time — then add the cities or zones you're coordinating with, below."
          />
          <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_1fr_1fr] lg:items-end">
            <label className="block">
              <span className="mb-2 block text-sm text-zinc-300">Source timezone</span>
              <TimezoneSelect
                value={state.sourceZone}
                onChange={(value) => {
                  if (!isValidTz(value)) return;
                  setState((prev) => {
                    if (value === prev.sourceZone) return prev;
                    const targetIndex = prev.targets.findIndex((t) => t.zone === value);
                    if (targetIndex < 0) {
                      return { ...prev, sourceZone: value };
                    }
                    const nextTargets = [...prev.targets];
                    nextTargets[targetIndex] = { ...nextTargets[targetIndex], zone: prev.sourceZone };
                    return { ...prev, sourceZone: value, targets: nextTargets };
                  });
                }}
                options={selectOptions}
                placeholder="Search source timezone..."
              />
              {mounted && currentZone && state.sourceZone !== currentZone ? (
                <button
                  type="button"
                  onClick={() =>
                    setState((prev) => {
                      if (currentZone === prev.sourceZone) return prev;
                      const targetIndex = prev.targets.findIndex((t) => t.zone === currentZone);
                      if (targetIndex < 0) {
                        return { ...prev, sourceZone: currentZone };
                      }
                      const nextTargets = [...prev.targets];
                      nextTargets[targetIndex] = { ...nextTargets[targetIndex], zone: prev.sourceZone };
                      return { ...prev, sourceZone: currentZone, targets: nextTargets };
                    })
                  }
                  className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-300 transition hover:bg-cyan-400/20"
                >
                  📍 Detected your timezone as <span className="font-medium text-white">{currentZone}</span> — use it
                </button>
              ) : null}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-zinc-300">Date in source zone</span>
              <input
                type="date"
                value={state.sourceDate}
                onChange={(e) => setState((p) => ({ ...p, sourceDate: e.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none focus-visible:border-white/30"
              />
              {validation.sourceDate ? (
                <div className="mt-2 text-xs text-red-200">{validation.sourceDate}</div>
              ) : null}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-zinc-300">Time in source zone</span>
              <input
                type="time"
                value={state.sourceTime}
                onChange={(e) => setState((p) => ({ ...p, sourceTime: e.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none focus-visible:border-white/30"
              />
              {validation.sourceTime ? (
                <div className="mt-2 text-xs text-red-200">{validation.sourceTime}</div>
              ) : null}
            </label>
          </div>

          {/* Live feedback: confirms the inputs above are being read correctly */}
          <div
            className={`mt-4 rounded-2xl border px-4 py-3 ${
              resultsAreStale
                ? "border-white/10 bg-black/30"
                : "border-cyan-400/20 bg-cyan-400/5"
            }`}
          >
            <div className="text-[11px] uppercase tracking-wide text-zinc-400">
              Your source time
            </div>
            <div
              className={`mt-1 text-lg sm:text-xl font-semibold tabular-nums ${
                resultsAreStale ? "text-zinc-500" : "text-white"
              }`}
            >
              {sourceDisplay}
            </div>
          </div>

          {validation.warning ? (
            <div className="mt-3 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-200">
              ⚠️ {validation.warning}
            </div>
          ) : null}

          <div>
            {(copyNote || copyError) ? (
            <div
              className={`fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-md px-4 py-2 text-sm shadow-lg transition-all duration-300 ${
                copyError ? "bg-gradient-to-r from-red-500 to-red-900 text-white" : "bg-gradient-to-r from-violet-500 to-violet-900 text-white"
              }`}
            >
              {copyError || copyNote}
            </div>
          ) : null}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={jumpToNow}
              className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-xs sm:text-sm text-cyan-300 transition hover:bg-cyan-400/20"
            >
              Use current time in source zone
            </button>
            <button
              type="button"
              onClick={copyShareLink}
              disabled={resultsAreStale}
              className="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-2 text-xs sm:text-sm text-violet-300 transition hover:bg-violet-400/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Copy share link
            </button>
            <button
              type="button"
              onClick={() => setState((p) => ({ ...p, use24Hour: !p.use24Hour }))}
              className="rounded-full border border-white/10 bg-black/30 px-3 py-2 text-xs sm:text-sm text-zinc-200 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300"
            >
              {state.use24Hour ? "24h HH:MM" : "12h AM/PM"}
            </button>
          </div>
          <div className="mt-4 grid gap-3">
            <label className="block">
              <span className="mb-2 block text-sm text-zinc-300">Quick-add popular zones</span>
              <div className="flex flex-wrap gap-2">
                {QUICK_ADD_ZONES.map(({ label, zone }) => (
                  <button
                    key={zone}
                    type="button"
                    onClick={() => addTarget(zone)}
                    disabled={state.targets.length >= MAX_TARGETS || zone === state.sourceZone || state.targets.some((t) => t.zone === zone)}
                    className="rounded-full border border-blue-400/20 bg-blue-400/5 px-3 py-2 text-xs text-blue-200 transition hover:border-blue-400/40 hover:bg-blue-400/15 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-blue-400/20 disabled:hover:bg-blue-400/5"
                  >
                    + {label}
                  </button>
                ))}
              </div>
            </label>
          </div>

          <div ref={searchWrapRef} className="relative mt-4">
            <input
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={Boolean(query)}
              aria-controls={`${searchId}-listbox`}
              aria-activedescendant={
                activeIndex >= 0 && activeIndex < suggestions.length
                  ? `${searchId}-option-${activeIndex}`
                  : undefined
              }
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(-1);
              }}
              onKeyDown={onSearchKeyDown}
              placeholder={
                state.targets.length >= MAX_TARGETS
                  ? "Maximum of 10 target zones reached"
                  : "Search by city, country, or abbreviation (EST, IST, CET)..."
              }
              disabled={state.targets.length >= MAX_TARGETS}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none focus-visible:border-cyan-400/40 disabled:cursor-not-allowed disabled:opacity-60"
            />
            {query && state.targets.length < MAX_TARGETS ? (
              <div
                id={`${searchId}-listbox`}
                role="listbox"
                className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 shadow-xl"
              >
                {suggestions.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-zinc-400">No matches found.</div>
                ) : (
                  suggestions.map((zone, index) => (
                    <button
                      key={zone.value}
                      id={`${searchId}-option-${index}`}
                      type="button"
                      role="option"
                      aria-selected={index === activeIndex}
                      onMouseEnter={() => setActiveIndex(index)}
                      onPointerDown={(e) => e.preventDefault()}
                      onClick={() => addTarget(zone.value)}
                      className={`flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm text-white transition ${
                        index === activeIndex ? "bg-cyan-400/10" : "hover:bg-white/5"
                      }`}
                    >
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate font-medium">
                          {highlightMatch(`${zone.city}, ${zone.country}`, query)}
                        </span>
                        <span className="truncate text-xs text-zinc-400">{zone.value}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs">{zone.abbreviation}</div>
                        <div className="text-xs text-zinc-400">{zone.offset}</div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            ) : null}
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-white/10 bg-slate-950/60 p-4 sm:p-5">
          <button
            type="button"
            onClick={() => setFinderOpen((o) => !o)}
            aria-expanded={finderOpen}
            className="flex w-full items-center justify-between gap-3 text-left"
          >
            <StepHeader
              step={2}
              title="Find a meeting time"
              subtitle="Set working days and hours (local to each zone) and find the next slots where everyone overlaps. DST is handled automatically."
              optional
              badge={meetingSuggestions && meetingSuggestions.length > 0 ? "Slots found" : undefined}
            />
            <span className="mt-1 shrink-0 text-white/50">
              {finderOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </span>
          </button>

          {finderOpen && (
          <>
          <div className="mt-4 grid gap-4 lg:grid-cols-[auto_1fr_1fr_auto] lg:items-end">
            <div>
              <span className="mb-2 block text-sm text-zinc-300">Working days</span>
              <div className="flex flex-wrap gap-1.5">
                {WEEKDAY_OPTIONS.map(({ iso, label }) => {
                  const active = workingHours.days.includes(iso);
                  return (
                    <button
                      key={iso}
                      type="button"
                      onClick={() => toggleWorkingDay(iso)}
                      aria-pressed={active}
                      className={`rounded-full border px-3 py-2 text-xs font-medium transition ${
                        active
                          ? "border-emerald-400/30 bg-emerald-500/20 text-emerald-200"
                          : "border-white/10 bg-black/30 text-zinc-400 hover:border-cyan-400/20 hover:bg-cyan-400/10 hover:text-cyan-200"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm text-zinc-300">Work starts (local)</span>
              <input
                type="time"
                value={workingHours.startTime}
                onChange={(e) => setWorkingHours((p) => ({ ...p, startTime: e.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none focus-visible:border-white/30"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-zinc-300">Work ends (local)</span>
              <input
                type="time"
                value={workingHours.endTime}
                onChange={(e) => setWorkingHours((p) => ({ ...p, endTime: e.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none focus-visible:border-white/30"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-zinc-300">Precision</span>
              <select
                value={workingHours.slotMinutes}
                onChange={(e) => setWorkingHours((p) => ({ ...p, slotMinutes: Number(e.target.value) }))}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none focus-visible:border-white/30"
              >
                {SLOT_PRECISION_OPTIONS.map((m) => (
                  <option key={m} value={m} className="bg-slate-900">
                    {m} min
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={findSlots}
              className="rounded-full border border-cyan-400/40 bg-cyan-500/20 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/30"
            >
              Find next available slots
            </button>
            <span className="text-xs text-zinc-400">
              Checking {state.targets.length + 1} {(state.targets.length + 1) === 1 ? "zone" : "zones"} · next 10 days
            </span>
          </div>

          {suggestionsNote ? (
            <p className="mt-3 text-sm text-amber-200">{suggestionsNote}</p>
          ) : null}

          {meetingSuggestions && meetingSuggestions.length > 0 ? (
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {meetingSuggestions.map((instant) => (
                <button
                  key={instant.toISOString()}
                  type="button"
                  onClick={() => applySuggestion(instant)}
                  className="rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-3 text-left transition hover:border-emerald-400/30 hover:bg-emerald-500/10"
                >
                  <div className="text-xs uppercase tracking-wide text-zinc-400">
                    {formatInTimeZone(instant, state.sourceZone, "EEE, MMM d")}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white">
                    {formatInTimeZone(
                      instant,
                      state.sourceZone,
                      state.use24Hour ? "HH:mm" : "hh:mm a"
                    )}{" "}
                    <span className="font-normal text-zinc-400">({abbreviation(instant, state.sourceZone)})</span>
                  </div>
                </button>
              ))}
            </div>
          ) : null}
          </>
          )}
        </section>

        <section className="mb-8 rounded-3xl border border-white/10 bg-slate-950/60 p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold text-white">
                  Comparing {state.targets.length + 1}{" "}
                  {(state.targets.length + 1) === 1 ? "zone" : "zones"}
                </h2>
                <span className="rounded-full border border-cyan-400/30 bg-cyan-500/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-cyan-300">
                  Live
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-400">
                Updates instantly as you change the time or zones above.{" "}
                <span className="hidden md:inline">
                  Drag <GripVertical className="inline h-3 w-3 align-text-bottom" /> to reorder rows, or use the arrows.
                </span>
              </p>
            </div>

            <button
                type="button"
                onClick={() => {
                const first = zoneOptions.find(
                    z =>
                    z.value !== state.sourceZone &&
                    !state.targets.some(t => t.zone === z.value)
                );

                if (first) addTarget(first.value);
                }}
                disabled={state.targets.length >= MAX_TARGETS}
                className="rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm text-blue-200 transition hover:bg-blue-400/20 disabled:opacity-40"
            >
                + Add zone
            </button>
            </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-[980px] w-full border-collapse">
              <caption className="sr-only">Timezone comparison table</caption>
              <thead>
                <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-zinc-400">
                  <th scope="col" className="py-3 pr-3">Zone</th>
                  <th scope="col" className="py-3 pr-3">Converted time</th>
                  <th scope="col" className="py-3 pr-3">Local time</th>
                  <th scope="col" className="py-3 pr-3">Details</th>
                  <th scope="col" className="py-3 pr-3">Offset</th>
                  <th scope="col" className="py-3 pr-3">Diff vs source</th>
                  <th scope="col" className="py-3 pr-3">Action</th>
                </tr>
                <tr className="border-b ">
                <th className="py-4 pr-3 text-left">
                    <div className="font-semibold text-white">
                    {zoneMap.get(state.sourceZone)?.label ?? state.sourceZone}
                    </div>
                    <div className="mt-1 text-xs text-zinc-400">
                    {state.sourceZone}
                    </div>
                    <span className="mt-2 inline-flex rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-300">
                    Source
                    </span>
                </th>

                <td className="py-4 pr-3">
                    <div className="text-base font-semibold text-white">
                    {sourceDisplay}
                    </div>
                </td>

                <td className="py-4 pr-3">
                    <div className="text-sm text-zinc-300">
                    {selectedInstant
                        ? formatInTimeZone(
                            selectedInstant,
                            state.sourceZone,
                            state.use24Hour ? "HH:mm" : "hh:mm a"
                        )
                        : ""}
                    </div>
                </td>

                <td className="py-4 pr-3">
                    <div className="flex max-w-[280px] flex-col gap-1.5">
                      <span className="text-sm text-zinc-200">
                        {selectedInstant && (
                          <>
                            {weekdayName(selectedInstant!, state.sourceZone)} · {localDateLabel(selectedInstant!, state.sourceZone)} · {abbreviation(selectedInstant!, state.sourceZone)}
                          </>
                        )}
                      </span>
                      {selectedInstant ? (
                        <span
                          className={`mt-0.5 inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                            isWithinWorkingHours(selectedInstant, state.sourceZone, workingHours)
                              ? "bg-emerald-500/15 text-emerald-300"
                              : "bg-white/5 text-zinc-500"
                          }`}
                        >
                          {isWithinWorkingHours(selectedInstant, state.sourceZone, workingHours)
                            ? "● Working hours"
                            : "○ Outside working hours"}
                        </span>
                      ) : null}
                  </div>
                </td>

                <td className="py-4 pr-3">
                    <div className="text-sm text-zinc-300">
                    <div>
                        {selectedInstant
                        ? abbreviation(selectedInstant, state.sourceZone)
                        : ""}
                    </div>
                    <div>
                        {selectedInstant
                        ? offsetText(selectedInstant, state.sourceZone)
                        : ""}
                    </div>
                    </div>
                </td>

                <td className="py-4 pr-3">
                    <span className="inline-flex rounded-full bg-white/10 px-2 py-1 text-xs text-zinc-300">Source</span>
                </td>

                <td className="py-4 pr-3">
                    —
                </td>
                </tr>
              </thead>
              <tbody>
                {state.targets.map((row, index) => (
                  <MemoRow
                    key={row.id}
                    row={row}
                    index={index}
                    total={state.targets.length}
                    result={resultMap.get(row.id)}
                    resultsAreStale={resultsAreStale}
                    onUpdate={updateTarget}
                    onMove={moveTarget}
                    onRemove={removeTarget}
                    onMakeSource={makeSource}
                    selectOptions={selectOptions}
                    onDragStart={handleRowDragStart}
                    onDragOver={handleRowDragOver}
                    onDrop={handleRowDrop}
                    onDragEnd={handleRowDragEnd}
                    isDragging={dragId === row.id}
                    isDragOver={dragOverId === row.id && dragId !== row.id}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <TimezoneCards
            rows={state.targets}
            resultMap={resultMap}
            resultsAreStale={resultsAreStale}
            onUpdate={updateTarget}
            onMove={moveTarget}
            onRemove={removeTarget}
            onMakeSource={makeSource}
            selectOptions={selectOptions}
            showStatusBadges
            variant="advanced"
          />
        </section>

        <section className="mb-8 rounded-3xl border border-white/10 bg-slate-950/60 p-4 sm:p-5">
          <button
            type="button"
            onClick={() => setExportOpen((o) => !o)}
            aria-expanded={exportOpen}
            className="flex w-full items-center justify-between gap-3 text-left"
          >
            <StepHeader
              step={3}
              title="Meeting details & export"
              subtitle="Pick a template to prefill the title, duration and description, then export as CSV or a calendar invite."
              optional
              badge={meetingTitle.trim() ? "Details set" : undefined}
            />
            <span className="mt-1 shrink-0 text-white/50">
              {exportOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </span>
          </button>

          {exportOpen && (
          <>
          <div className="mt-4">
            <span className="mb-2 block text-sm text-zinc-300">Meeting templates</span>
            <div className="flex flex-wrap gap-2">
              {MEETING_TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => applyTemplate(template)}
                  aria-pressed={activeTemplateId === template.id}
                  className={`rounded-full border px-3 py-2 text-xs sm:text-sm font-medium transition ${
                    activeTemplateId === template.id
                      ? "border-emerald-400/30 bg-emerald-500/20 text-emerald-200"
                      : "border-white/10 bg-black/30 text-zinc-200 hover:border-violet-400/20 hover:bg-violet-400/10"
                  }`}
                >
                  {template.label} · {template.durationMinutes}m
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-[2fr_1fr]">
            <label className="block">
              <span className="mb-2 block text-sm text-zinc-300">Meeting title</span>
              <input
                type="text"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                placeholder="e.g. Q3 Board Review"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none focus-visible:border-white/30"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-zinc-300">Duration (minutes)</span>
              <input
                type="number"
                min={5}
                step={5}
                value={meetingDurationMinutes}
                onChange={(e) => setMeetingDurationMinutes(Number(e.target.value))}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none focus-visible:border-white/30"
              />
            </label>
          </div>

          <label className="mt-3 block">
            <span className="mb-2 block text-sm text-zinc-300">Description (optional)</span>
            <textarea
              value={meetingDescription}
              onChange={(e) => setMeetingDescription(e.target.value)}
              rows={3}
              placeholder="Agenda, dial-in info, links..."
              className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none focus-visible:border-white/30"
            />
          </label>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={exportCsv}
              disabled={resultsAreStale}
              className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ⬇ Export CSV
            </button>
            <button
              type="button"
              onClick={exportIcs}
              disabled={resultsAreStale}
              className="rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2.5 text-sm font-medium text-violet-200 transition hover:bg-violet-500/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              📅 Download .ics calendar invite
            </button>
          </div>
          <p className="mt-2 text-xs text-zinc-500">
            The .ics event is anchored to the exact selected instant (stored in UTC), so it opens at the correct local time in any calendar app regardless of DST.
          </p>
          </>
          )}
        </section>
      </div>
    </div>
  );
}