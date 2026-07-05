"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRightLeft, Plus, Trash2, Sparkles } from "lucide-react";
import { getConvertUnits } from "@/lib/convertUnitsUtility";
import { useSearchParams } from "next/navigation";

type UnitOption = { abbr: string; name: string; measure?: string };
type Theme = "light" | "dark";

type UnitConverterProps = {
  initialExpression?: string;
  theme?: Theme;
};

const UnitCombobox = dynamic(
  () => import("@/components/ui/fromToUnitConverterCombobox").then((mod) => mod.UnitCombobox),
  { ssr: false }
);

export default function UnitConverterTool({
  initialExpression = "",
  theme = "dark",
}: UnitConverterProps) {
  return <UnitConverter initialExpression={initialExpression} theme={theme} />;
}

function ShellCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-blue-400/20 hover:bg-white/[0.06] ${className}`}
    >
      {children}
    </section>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="border-b border-white/10 px-4 py-3 sm:px-5 sm:py-4">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/85">
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <h2 className="text-base font-semibold tracking-tight text-white">{title}</h2>
          <p className="mt-1 text-xs text-white/60 sm:text-sm">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center text-blue-200">
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">{label}</p>
          <p className="truncate text-sm font-semibold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

function UnitConverter({ initialExpression = "", theme = "dark" }: UnitConverterProps) {
  const [values, setValues] = useState(initialExpression);
  const [from, setFrom] = useState<string | null>("l");
  const [to, setTo] = useState<string | null>("mL");
  const [results, setResults] = useState<string[]>([]);
  const [customUnits, setCustomUnits] = useState<Record<string, string>>({});
  const [newUnitName, setNewUnitName] = useState("");
  const [newUnitDef, setNewUnitDef] = useState("");
  const [queryFrom, setQueryFrom] = useState("");
  const [queryTo, setQueryTo] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [unitData, setUnitData] = useState<{
    standardUnits: UnitOption[];
    unitMeasureMap: Record<string, string>;
  }>({ standardUnits: [], unitMeasureMap: {} });

  const searchParams = useSearchParams();
  useEffect(() => {
    const tool = searchParams.get("unit")?.toLowerCase() || "";

    if (tool === "length") {
      setFrom("m");
      setTo("cm");
    } else if (tool === "weight") {
      setFrom("kg");
      setTo("g");
    } else if (tool === "volume") {
      setFrom("l");
      setTo("mL");
    } else if (tool === "temperature") {
      setFrom("°C");
      setTo("°F");
    }
  }, [searchParams]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const convert = await getConvertUnits();
      const standardUnits: UnitOption[] = convert()
        .measures()
        .flatMap((measure: string) =>
          convert().list(measure).map((u: any) => ({
            abbr: u.abbr,
            name: u.plural,
            measure,
          }))
        );

      const unitMeasureMap = Object.fromEntries(
        standardUnits.map((u) => [u.abbr, u.measure ?? ""])
      ) as Record<string, string>;

      if (mounted) setUnitData({ standardUnits, unitMeasureMap });
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const allUnits = useMemo<UnitOption[]>(() => {
    const customUnitOptions: UnitOption[] = Object.keys(customUnits).map((name) => ({
      abbr: name,
      name: `Custom (${customUnits[name]})`,
      measure: "custom",
    }));

    return [...unitData.standardUnits, ...customUnitOptions];
  }, [customUnits, unitData.standardUnits]);

  const getFilteredUnits = useCallback(
    (query: string, relatedMeasure?: string) => {
      const q = query.toLowerCase();
      return allUnits.filter((u) => {
        const matchesQuery =
          query === "" || u.abbr.toLowerCase().includes(q) || u.name.toLowerCase().includes(q);
        if (!matchesQuery) return false;
        if (!relatedMeasure) return true;
        const measure = unitData.unitMeasureMap[u.abbr] ?? "custom";
        return measure === relatedMeasure || measure === "custom";
      });
    },
    [allUnits, unitData.unitMeasureMap]
  );

  const filteredFrom = useMemo(
    () => getFilteredUnits(queryFrom, to ? unitData.unitMeasureMap[to] : undefined),
    [getFilteredUnits, queryFrom, to, unitData.unitMeasureMap]
  );

  const filteredTo = useMemo(
    () => getFilteredUnits(queryTo, from ? unitData.unitMeasureMap[from] : undefined),
    [getFilteredUnits, queryTo, from, unitData.unitMeasureMap]
  );

  const handleSetFrom = useCallback(
    (value: string) => {
      setFrom(value);
      if (
        to &&
        unitData.unitMeasureMap[value] &&
        unitData.unitMeasureMap[to] &&
        unitData.unitMeasureMap[value] !== unitData.unitMeasureMap[to]
      ) {
        setTo(null);
      }
    },
    [to, unitData.unitMeasureMap]
  );

  const handleSetTo = useCallback(
    (value: string) => {
      setTo(value);
      if (
        from &&
        unitData.unitMeasureMap[value] &&
        unitData.unitMeasureMap[from] &&
        unitData.unitMeasureMap[value] !== unitData.unitMeasureMap[from]
      ) {
        setFrom(null);
      }
    },
    [from, unitData.unitMeasureMap]
  );

  const addCustomUnit = useCallback(() => {
    const name = newUnitName.trim();
    const def = newUnitDef.trim();
    if (!name || !def) return;

    setCustomUnits((prev) => ({ ...prev, [name]: def }));
    setNewUnitName("");
    setNewUnitDef("");
  }, [newUnitName, newUnitDef]);

  const removeCustomUnit = useCallback((name: string) => {
    setCustomUnits((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  }, []);

  const convertBatch = useCallback(async () => {
    if (!from || !to || !values.trim()) {
      setResults([]);
      return;
    }

    setIsConverting(true);

    try {
      const { createUnit, unit } = await import("mathjs");

      Object.entries(customUnits).forEach(([name, definition]) => {
        try {
          createUnit(name, definition, { override: true });
        } catch {}
      });

      const convert = await getConvertUnits();
      const items = values.split(",").map((v) => v.trim()).filter(Boolean);
      const output: string[] = [];

      for (const val of items) {
        try {
          const basicResult = convert(parseFloat(val)).from(from as any).to(to as any);
          output.push(`${val} ${from} → ${basicResult} ${to}`);
        } catch {
          try {
            const advancedResult = unit(`${val} ${from}`).to(to);
            output.push(`${val} ${from} → ${advancedResult.toString()}`);
          } catch {
            output.push(`${val} ${from} → Conversion not available`);
          }
        }
      }

      setResults(output);
    } finally {
      setIsConverting(false);
    }
  }, [customUnits, from, to, values]);

  const count = useMemo(
    () => values.split(",").map((v) => v.trim()).filter(Boolean).length,
    [values]
  );

  const clearAll = useCallback(() => {
    setValues("");
    setResults([]);
    setQueryFrom("");
    setQueryTo("");
  }, []);

  return (
    <div
      className={`mx-auto w-full max-w-6xl px-3 py-3 ${
        theme === "light" ? "text-slate-950" : "text-white"
      } sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6`}
    >
      <section className="mb-6 rounded-3xl border border-white/10 bg-white/5 px-5 py-6 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-200">
              <Sparkles className="h-3.5 w-3.5" />
              Unit converter
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Convert Units Fast
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
              Transform length, weight, volume, temperature, and more with effortless conversions — all powered by a sleek, user‑friendly interface.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <ShellCard>
          <SectionHeader
            icon={ArrowRightLeft}
            title="Converter"
            subtitle="Enter values, choose units, and convert in a focused workspace."
          />

          <div className="space-y-4 p-3 sm:p-4 md:p-5">
            <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">Result</p>
              <div className="mt-2 min-h-[56px] space-y-2">
                {results.length > 0 ? (
                  results.map((r, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white"
                    >
                      {r}
                    </div>
                  ))
                ) : (
                  <div className="text-2xl font-semibold text-white/70">0</div>
                )}
              </div>
            </div>

            <div className="grid gap-3">
              <div className="grid gap-3 lg:grid-cols-[1.2fr_0.9fr_auto_0.9fr]">
                <input
                  value={values}
                  onChange={(e) => setValues(e.target.value)}
                  placeholder="Enter values, comma-separated"
                  className="h-12 w-full rounded-2xl border border-white/10 bg-black/10 px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-blue-400/35 focus:bg-black/15"
                />

                <div onFocusCapture={() => setOpenFrom(true)} onBlurCapture={() => setTimeout(() => setOpenFrom(false), 120)}>
                  <UnitCombobox
                    value={from}
                    onChange={handleSetFrom}
                    query={queryFrom}
                    setQuery={setQueryFrom}
                    options={filteredFrom}
                    placeholder="From unit"
                    // open={openFrom}
                    // setOpen={setOpenFrom}
                  />
                </div>

                <div className="flex items-center justify-center text-white/50">
                  <ArrowRightLeft className="h-5 w-5" />
                </div>

                <div onFocusCapture={() => setOpenTo(true)} onBlurCapture={() => setTimeout(() => setOpenTo(false), 120)}>
                  <UnitCombobox
                    value={to}
                    onChange={handleSetTo}
                    query={queryTo}
                    setQuery={setQueryTo}
                    options={filteredTo}
                    placeholder="To unit"
                    // open={openTo}
                    // setOpen={setOpenTo}
                  />
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                <button
                  type="button"
                  onClick={() => void convertBatch()}
                  disabled={isConverting}
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-4 text-sm font-semibold text-white transition hover:from-blue-400 hover:to-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {count > 1 ? "Convert Batch" : "Convert"}
                </button>

                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </ShellCard>

        <ShellCard>
          <SectionHeader
            icon={Plus}
            title="Custom Units"
            subtitle="Create your own unit definitions and remove them anytime."
          />

          <div className="space-y-4 p-3 sm:p-4 md:p-5">
            <div className="grid gap-3">
              <input
                value={newUnitName}
                onChange={(e) => setNewUnitName(e.target.value)}
                placeholder="Unit name, e.g. coffee"
                className="h-12 w-full rounded-2xl border border-white/10 bg-black/10 px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-blue-400/35 focus:bg-black/15"
              />
              <input
                value={newUnitDef}
                onChange={(e) => setNewUnitDef(e.target.value)}
                placeholder="Definition, e.g. 250 ml"
                className="h-12 w-full rounded-2xl border border-white/10 bg-black/10 px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-blue-400/35 focus:bg-black/15"
              />
              <button
                type="button"
                onClick={addCustomUnit}
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-5 py-4 text-sm font-semibold text-white transition hover:bg-emerald-600"
              >
                Add unit
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.16em] text-white/45">Saved units</p>

              {Object.keys(customUnits).length > 0 ? (
                <div className="space-y-2">
                  {Object.entries(customUnits).map(([name, def]) => (
                    <div
                      key={name}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">{name}</p>
                        <p className="truncate text-xs text-white/50">{def}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeCustomUnit(name)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/10 text-red-300 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-200"
                        aria-label={`Remove ${name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-4 text-sm text-white/45">
                  No custom units added yet.
                </div>
              )}
            </div>
          </div>
        </ShellCard>
      </div>
    </div>
  );
}