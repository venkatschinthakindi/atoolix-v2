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
import { formatInTimeZone } from "date-fns-tz";
import { ChevronDown, ChevronUp, Trash2Icon } from "lucide-react";

import dynamic from "next/dynamic";
import { TimeZone } from "@vvo/tzdb";

import {
  MAX_TARGETS,
  type TargetRow,
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
  dayDifference,
  searchZones,
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

const URL_DEBOUNCE_MS = 900;
const TOAST_MS = 3000;

const QUICK_ADD_ZONES = [
  { label: "New York", zone: "America/New_York" },
  { label: "Los Angeles", zone: "America/Los_Angeles" },
  { label: "Chicago", zone: "America/Chicago" },
  { label: "Toronto", zone: "America/Toronto" },
  { label: "Mexico City", zone: "America/Mexico_City" },
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
  { label: "UTC", zone: "UTC" },
];

function noteForTarget(instant: Date, sourceZone: string, targetZone: string) {
  const targetWeekday = weekdayName(instant, targetZone);
  const targetLabel = localDateLabel(instant, targetZone);
  const dst = abbreviation(instant, targetZone).toUpperCase();
  const dayDiff = dayDifference(sourceZone, targetZone, instant);
  return `${targetWeekday} · ${targetLabel} · ${dayDiff} · ${dst || "TZ"}`;
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

function serializeState(state: ConverterState) {
  const params = new URLSearchParams();
  params.set("source", state.sourceZone);
  params.set("date", state.sourceDate);
  params.set("time", state.sourceTime);
  params.set("zones", encodeZones(state.targets.map((t) => t.zone)));
  params.set("format", state.use24Hour ? "24" : "12");
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
}) {
  return (
    <tr className="border-b border-white/5 align-top">
      <th scope="row" className="py-4 pr-3 text-left font-normal">
        <div className="mt-3 max-w-[320px]">
          <TimezoneSelect
            value={row.zone}
            onChange={(value) => onUpdate(row.id, value)}
            options={selectOptions}
            placeholder="Search timezone..."
          />
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
        </div>
      </td>

      <td className="py-4 pr-3">
        <div className="text-sm text-zinc-300">
          <div>{result?.abbreviation ?? ""}</div>
          <div>{result?.offset ?? ""}</div>
        </div>
      </td>

      <td className="py-4 pr-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onMove(row.id, -1)}
            disabled={index === 0}
            className="rounded-full border border-white/10 bg-white/5 px-2 py-2 text-xs text-zinc-300 disabled:opacity-30"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onMove(row.id, 1)}
            disabled={index === total - 1}
            className="rounded-full border border-white/10 bg-white/5 px-2 py-2 text-xs text-zinc-300 disabled:opacity-30"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
          {index !== 0 ? (
            <button
              type="button"
              onClick={() => onRemove(row.id)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-300"
            >
              <Trash2Icon className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </td>
    </tr>
  );
});

export default function TimezoneConverterClient() {
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
        offset: z.offset,
      })),
    [zoneOptions]
  );

  useEffect(() => {
    if (!mounted) return;
    if (!normalizeDate(state.sourceDate)) return;
    if (!normalizeTime(state.sourceTime)) return;

    const next = serializeState(state);
    if (next === searchParams.toString()) return;

    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      lastSyncedParamsRef.current = next;
      router.replace(`${pathname}?${next}`, { scroll: false });
    }, URL_DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [mounted, state, pathname, router]);

  useEffect(() => {
    if (!mounted) return;
    const current = searchParams.toString();
    if (current === lastSyncedParamsRef.current) return;
    lastSyncedParamsRef.current = current;
    setState(buildInitialState(searchParams));
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
      return {
        id: row.id,
        zone: row.zone,
        display,
        localTime,
        offset,
        abbreviation: abbr,
        details,
        note,
      };
    });
  }, [selectedInstant, validInputs, state.targets, state.use24Hour, state.sourceZone]);

  const resultMap = useMemo(() => new Map(results.map((r) => [r.id, r])), [results]);
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
        if (value === prev.sourceZone) return prev;
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

  const copyRow = useCallback(
    async (id: string) => {
      if (!selectedInstant || resultsAreStale) return;
      const row = state.targets.find((t) => t.id === id);
      if (!row) return;

      const fmt = state.use24Hour ? "EEE, MMM d yyyy HH:mm" : "EEE, MMM d yyyy hh:mm a";
      const text = [
        `Source: ${state.sourceZone}`,
        `Selected: ${formatInTimeZone(selectedInstant, state.sourceZone, fmt)}`,
        `Target: ${row.zone}`,
        `Converted: ${formatInTimeZone(selectedInstant, row.zone, fmt)}`,
        `Offset: ${offsetText(selectedInstant, row.zone)}`,
        `Abbreviation: ${abbreviation(selectedInstant, row.zone)}`,
      ].join("\n");

      const ok = await copyToClipboard(text);
      if (ok) showToast("note", `${zoneMap.get(row.zone)?.label ?? row.zone} copied.`);
      else showToast("error", "Copy failed.");
    },
    [selectedInstant, resultsAreStale, state.sourceZone, state.targets, state.use24Hour, showToast, zoneMap]
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
    const ok = await copyToClipboard(`${window.location.origin}${pathname}?${allowed.toString()}`);
    if (ok) showToast("note", "Share link copied.");
    else showToast("error", "Copy failed.");
  }, [resultsAreStale, pathname, state.sourceZone, state.sourceDate, state.sourceTime, state.targets, state.use24Hour, showToast]);

  const jumpToNow = useCallback(() => {
    const now = new Date();
    setState((prev) => ({
      ...prev,
      sourceDate: formatInTimeZone(now, prev.sourceZone, "yyyy-MM-dd"),
      sourceTime: formatInTimeZone(now, prev.sourceZone, "HH:mm"),
    }));
  }, []);

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
    <div>
      <div className="app-container page-section pt-2">
        <section className="mb-8 rounded-3xl border border-white/10 bg-white/5 px-5 py-8 sm:px-6 sm:py-10">
          <p className="mb-3 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] sm:text-xs font-medium text-zinc-300">
            Browser zone: {currentZone}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Timezone Converter
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-7 text-zinc-300">
            Convert one source time into up to 10 time zones instantly. Invalid or ambiguous source times are flagged before conversion. Need to schedule a meeting instead? Try the{" "}
            <Link href="/tools/datetime/meeting-time-finder" className="text-cyan-300 underline underline-offset-2 hover:text-cyan-200">
              Meeting Time Finder
            </Link>.
          </p>
        </section>

        <section className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5">
          <div className="grid gap-3 lg:grid-cols-[1fr_1fr_1fr] lg:items-end">
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
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs sm:text-sm text-zinc-200 transition hover:bg-white/10"
            >
              Use current time in source zone
            </button>
            <button
              type="button"
              onClick={copyShareLink}
              disabled={resultsAreStale}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs sm:text-sm text-zinc-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Copy share link
            </button>
            <button
              type="button"
              onClick={() => setState((p) => ({ ...p, use24Hour: !p.use24Hour }))}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs sm:text-sm text-zinc-200 transition hover:bg-white/10"
            >
              {state.use24Hour ? "24h HH:MM" : "12h AM/PM"}
            </button>
          </div>
          <div className="mt-4 grid gap-3">
            <label className="block">
              <span className="mb-2 block text-sm text-zinc-300">Quick add</span>
              <div className="flex flex-wrap gap-2">
                {QUICK_ADD_ZONES.map(({ label, zone }) => (
                  <button
                    key={zone}
                    type="button"
                    onClick={() => addTarget(zone)}
                    disabled={state.targets.length >= MAX_TARGETS}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
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
                  : "Search target zone..."
              }
              disabled={state.targets.length >= MAX_TARGETS}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none focus-visible:border-white/30 disabled:cursor-not-allowed disabled:opacity-60"
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
                        index === activeIndex ? "bg-white/10" : "hover:bg-white/5"
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

        <section className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
                Comparing {state.targets.length + 1}{" "}
                {(state.targets.length + 1) === 1 ? "zone" : "zones"}
            </h2>

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
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10 disabled:opacity-40"
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
            onCopy={copyRow}
            onRemove={removeTarget}
            onMakeSource={makeSource}
            selectOptions={selectOptions}
          />
        </section>

        <section className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5">
          <h2 className="text-xl font-semibold text-white">Related tools</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/tools/converter"
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs sm:text-sm text-white transition hover:bg-white/10"
            >
              Unit Converter
            </Link>
            <Link
              href="/tools/calculator/emi-calculator"
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs sm:text-sm text-white transition hover:bg-white/10"
            >
              EMI Calculator
            </Link>
            <Link
              href="/tools/calculator/sip-calculator"
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs sm:text-sm text-white transition hover:bg-white/10"
            >
              ROI Calculator
            </Link>
            <Link
              href="/pdf"
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs sm:text-sm text-white transition hover:bg-white/10"
            >
              PDF Tools
            </Link>
            <Link
              href="/image"
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs sm:text-sm text-white transition hover:bg-white/10"
            >
              Image Tools
            </Link>
            <Link
              href="/finance"
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs sm:text-sm text-white transition hover:bg-white/10"
            >
              Finance Tools
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}