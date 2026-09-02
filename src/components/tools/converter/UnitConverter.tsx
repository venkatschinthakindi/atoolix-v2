"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRightLeft, Plus, Trash2, Sparkles } from "lucide-react";
import { getConvertUnits } from "@/lib/convertUnitsUtility";
import { useSearchParams } from "next/navigation";
import { SectionHeader } from "@/sharedUI/sectionHeader";

type UnitOption = {
  abbr: string;
  name: string;
  measure?: string;
};

type UnitConverterProps = {
  initialExpression?: string;
};

const UnitCombobox = dynamic(
  () =>
    import("@/components/ui/fromToUnitConverterCombobox").then(
      (mod) => mod.UnitCombobox
    ),
  { ssr: false }
);

export default function UnitConverterTool({
  initialExpression = "",
}: UnitConverterProps) {
  return (
    <UnitConverter
      initialExpression={initialExpression}
    />
  );
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
      className={`relative overflow-hidden rounded-3xl border border-border bg-card backdrop-blur-md transition-all duration-300 hover:border-blue-400/20 hover:bg-surface-raised ${className}`}
    >
      {children}
    </section>
  );
}

function UnitConverter({
  initialExpression = "",
}: UnitConverterProps) {
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
  const [unitData, setUnitData] = useState<{
    standardUnits: UnitOption[];
    unitMeasureMap: Record<string, string>;
  }>({
    standardUnits: [],
    unitMeasureMap: {},
  });

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
          convert()
            .list(measure)
            .map((u: any) => ({
              abbr: u.abbr,
              name: u.plural,
              measure,
            }))
        );

      const unitMeasureMap = Object.fromEntries(
        standardUnits.map((u) => [u.abbr, u.measure ?? ""])
      ) as Record<string, string>;

      if (mounted) {
        setUnitData({
          standardUnits,
          unitMeasureMap,
        });
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const allUnits = useMemo<UnitOption[]>(() => {
    const customUnitOptions: UnitOption[] = Object.keys(customUnits).map(
      (name) => ({
        abbr: name,
        name: `Custom (${customUnits[name]})`,
        measure: "custom",
      })
    );

    return [...unitData.standardUnits, ...customUnitOptions];
  }, [customUnits, unitData.standardUnits]);

  const getFilteredUnits = useCallback(
    (query: string, relatedMeasure?: string) => {
      const q = query.toLowerCase();

      return allUnits.filter((u) => {
        const matchesQuery =
          query === "" ||
          u.abbr.toLowerCase().includes(q) ||
          u.name.toLowerCase().includes(q);

        if (!matchesQuery) return false;

        if (!relatedMeasure) return true;

        const measure = unitData.unitMeasureMap[u.abbr] ?? "custom";

        return measure === relatedMeasure || measure === "custom";
      });
    },
    [allUnits, unitData.unitMeasureMap]
  );

  const filteredFrom = useMemo(
    () =>
      getFilteredUnits(
        queryFrom,
        to ? unitData.unitMeasureMap[to] : undefined
      ),
    [getFilteredUnits, queryFrom, to, unitData.unitMeasureMap]
  );

  const filteredTo = useMemo(
    () =>
      getFilteredUnits(
        queryTo,
        from ? unitData.unitMeasureMap[from] : undefined
      ),
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

    setCustomUnits((prev) => ({
      ...prev,
      [name]: def,
    }));

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
          createUnit(name, definition, {
            override: true,
          });
        } catch {}
      });

      const convert = await getConvertUnits();
      const items = values
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);

      const output: string[] = [];

      for (const val of items) {
        try {
          const basicResult = convert(parseFloat(val))
            .from(from as any)
            .to(to as any);

          output.push(`${val} ${from} → ${basicResult} ${to}`);
        } catch {
          try {
            const advancedResult = unit(`${val} ${from}`).to(to);

            output.push(`${val} ${from} → ${advancedResult.toString()}`);
          } catch {
            output.push(
              `${val} ${from} → Conversion not available`
            );
          }
        }
      }

      setResults(output);
    } finally {
      setIsConverting(false);
    }
  }, [customUnits, from, to, values]);

  const count = useMemo(
    () =>
      values
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean).length,
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
      className="mx-auto w-full max-w-6xl px-3 py-3 text-foreground sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6"
    >
      <section className="mb-6 rounded-3xl border border-border bg-card px-5 py-6 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-200">
              <Sparkles className="h-3.5 w-3.5" />
              Unit converter
            </div>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Convert Units Fast
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-secondary sm:text-base">
              Transform length, weight, volume, temperature, and more with
              effortless conversions — all powered by a sleek, user-friendly
              interface.
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
            <div className="rounded-2xl border border-border bg-surface-sunken px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Result
              </p>

              <div className="mt-2 min-h-[56px] space-y-2">
                {results.length > 0 ? (
                  results.map((result, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-foreground"
                    >
                      {result}
                    </div>
                  ))
                ) : (
                  <div className="text-2xl font-semibold text-foreground-secondary">
                    0
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-3">
              <div className="grid gap-3 lg:grid-cols-[1.2fr_0.9fr_auto_0.9fr]">
                <input
                  value={values}
                  onChange={(e) => setValues(e.target.value)}
                  placeholder="Enter values, comma-separated"
                  className="h-12 w-full rounded-2xl border border-border bg-surface-sunken px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-blue-400/35 focus:bg-surface-sunken"
                />

                <UnitCombobox
                  value={from}
                  onChange={handleSetFrom}
                  setQuery={setQueryFrom}
                  options={filteredFrom}
                  placeholder="From unit"
                />

                <div className="flex items-center justify-center text-muted-foreground">
                  <ArrowRightLeft className="h-5 w-5" />
                </div>

                <UnitCombobox
                  value={to}
                  onChange={handleSetTo}
                  setQuery={setQueryTo}
                  options={filteredTo}
                  placeholder="To unit"
                />
              </div>

              <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                <button
                  type="button"
                  onClick={() => void convertBatch()}
                  disabled={isConverting}
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-4 text-sm font-semibold text-foreground transition hover:from-blue-400 hover:to-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {count > 1 ? "Convert Batch" : "Convert"}
                </button>

                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex items-center justify-center rounded-2xl border border-border bg-card px-5 py-4 text-sm font-semibold text-foreground transition hover:border-border-strong hover:bg-surface-raised"
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
                className="h-12 w-full rounded-2xl border border-border bg-surface-sunken px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-blue-400/35 focus:bg-surface-sunken"
              />

              <input
                value={newUnitDef}
                onChange={(e) => setNewUnitDef(e.target.value)}
                placeholder="Definition, e.g. 250 ml"
                className="h-12 w-full rounded-2xl border border-border bg-surface-sunken px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-blue-400/35 focus:bg-surface-sunken"
              />

              <button
                type="button"
                onClick={addCustomUnit}
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-5 py-4 text-sm font-semibold text-foreground transition hover:bg-emerald-600"
              >
                Add unit
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Saved units
              </p>

              {Object.keys(customUnits).length > 0 ? (
                <div className="space-y-2">
                  {Object.entries(customUnits).map(([name, definition]) => (
                    <div
                      key={name}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {definition}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeCustomUnit(name)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-sunken text-red-300 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-200"
                        aria-label={`Remove ${name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-border bg-surface-sunken px-4 py-4 text-sm text-muted-foreground">
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

