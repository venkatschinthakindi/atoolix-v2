
"use client";

import { useState } from "react";
import { getConvertUnits } from "@/lib/convertUnitsUtility";
import dynamic from "next/dynamic";
type UnitOption = { abbr: string; name: string; measure?: string };

export default function UnitConverterTool({ initialExpression = "", theme = "dark" }: any) {
  return <UnitConverter initialExpression={initialExpression} theme={theme} />;
}

async function UnitConverter({ initialExpression, theme }: any) {
  const [values, setValues] = useState("");
  const [from, setFrom] = useState<string | null>("l");
  const [to, setTo] = useState<string | null>("");

  const [results, setResults] = useState<string[]>([]);
  const [customUnits, setCustomUnits] = useState<Record<string, string>>({});
  const [newUnitName, setNewUnitName] = useState("");
  const [newUnitDef, setNewUnitDef] = useState("");
  const [queryFrom, setQueryFrom] = useState("");
  const [queryTo, setQueryTo] = useState("");
  
  const convert = await getConvertUnits();
  // Build full unit list (standard + custom)
  const standardUnits: UnitOption[] = convert()
    .measures()
    .flatMap((measure:any) =>
      convert().list(measure).map((u:any) => ({ abbr: u.abbr, name: u.plural, measure }))
    );

  const customUnitOptions: UnitOption[] = Object.keys(customUnits).map(name => ({
    abbr: name,
    name: `Custom (${customUnits[name]})`,
    measure: "custom",
  }));

  const allUnits: UnitOption[] = [...standardUnits, ...customUnitOptions];

  const unitMeasureMap = Object.fromEntries(
    standardUnits.map(u => [u.abbr, u.measure ?? ""])
  ) as Record<string, string>;

  const getFilteredUnits = (query: string, relatedMeasure?: string) => {
    return allUnits.filter(u => {
      const matchesQuery =
        query === "" ||
        u.abbr.toLowerCase().includes(query.toLowerCase()) ||
        u.name.toLowerCase().includes(query.toLowerCase());

      if (!matchesQuery) {
        return false;
      }

      if (!relatedMeasure) {
        return true;
      }

      const measure = unitMeasureMap[u.abbr] ?? "custom";
      return measure === relatedMeasure || measure === "custom";
    });
  };

  const filteredFrom = getFilteredUnits(queryFrom, to ? unitMeasureMap[to] : undefined);
  const filteredTo = getFilteredUnits(queryTo, from ? unitMeasureMap[from] : undefined);

  const handleSetFrom = (value: string) => {
    setFrom(value);
    if (to && unitMeasureMap[value] && unitMeasureMap[to] && unitMeasureMap[value] !== unitMeasureMap[to]) {
      setTo(null);
    }
  };

  const handleSetTo = (value: string) => {
    setTo(value);
    if (from && unitMeasureMap[value] && unitMeasureMap[from] && unitMeasureMap[value] !== unitMeasureMap[from]) {
      setFrom(null);
    }
  };

  const convertBatch = async () => {
    const { createUnit, unit} = await import("mathjs");
    const items = values.split(",").map(v => v.trim()).filter(Boolean);
    const output: string[] = [];
    const numericResults: number[] = [];

    items.forEach(val => {
      try {
        const basicResult = convert(parseFloat(val)).from(from as any).to(to as any);
        output.push(`${val} ${from} → ${basicResult} ${to}`);
        numericResults.push(basicResult);
      } catch {
        try {
          Object.entries(customUnits).forEach(([name, definition]) => {
            try { createUnit(name, definition, { override: true }); } catch {}
          });
          if (!from || !to) return;
          const advancedResult = unit(`${val} ${from}`).to(to);
          output.push(`${val} ${from} → ${advancedResult.toString()}`);
          numericResults.push(advancedResult.value);
        } catch {
          output.push(`${val} ${from} → Conversion not available`);
        }
      }
    });

    setResults(output);
  };

  const addCustomUnit = () => {
    if (newUnitName && newUnitDef) {
      setCustomUnits(prev => ({ ...prev, [newUnitName]: newUnitDef }));
      setNewUnitName("");
      setNewUnitDef("");
    }
  };

  const removeCustomUnit = (name: string) => {
    setCustomUnits(prev => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  };
  const UnitCombobox = dynamic(
    () => import("@/components/ui/fromToUnitConverterCombobox").then(mod => mod.UnitCombobox),
    { ssr: false }
  );

  return (
    <div className={`space-y-6 ${theme === "light" ? "text-slate-950" : "text-white"}`}>
      {/* Results */}
      <div className="min-h-[60px] p-4 rounded-md bg-black/40">
        {results.length > 0 ? (
          results.map((r, i) => <div key={i} className="text-lg font-semibold">{r}</div>)
        ) : (
          <div className="text-lg font-semibold">0</div>
        )}
      </div>

      {/* Inputs */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          value={values}
          onChange={e => setValues(e.target.value)}
          placeholder="Enter values (comma-separated)"
          className="flex-1 text-xs px-3 py-2 rounded-md bg-black/40 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* From unit combobox */}
        <UnitCombobox
          value={from}
          onChange={handleSetFrom}
          query={queryFrom}
          setQuery={setQueryFrom}
          options={filteredFrom}
          placeholder="From unit"
        />

        <span className="flex items-center justify-center text-xl">→</span>

        {/* To unit combobox */}
        <UnitCombobox
          value={to}
          onChange={handleSetTo}
          query={queryTo}
          setQuery={setQueryTo}
          options={filteredTo}
          placeholder="To unit"
        />
      </div>

      {/* Action */}
      <button
          onClick={async () => await convertBatch()}
          className="full-screen-button"
        >
        {
            (values?.split(",")?.map(v => v.trim())?.filter(Boolean)?.length??0) > 1 ? "Convert Batch" : "Convert"
        }
      </button>

      
    {/* Custom Unit Creator */}
    <div>
    <h4 className="font-semibold mb-2">Add Custom Unit</h4>
    <div className="flex flex-col sm:flex-row gap-2 mb-3">
        <input
        value={newUnitName}
        onChange={e => setNewUnitName(e.target.value)}
        placeholder="Unit name (e.g. coffee)"
        className="flex-1 px-3 py-2 rounded-md bg-black/40 text-white"
        />
        <input
        value={newUnitDef}
        onChange={e => setNewUnitDef(e.target.value)}
        placeholder="Definition (e.g. 250 ml)"
        className="flex-1 px-3 py-2 rounded-md bg-black/40 text-white"
        />
        <button
        onClick={addCustomUnit}
        className="px-4 py-2 rounded-md bg-green-600 text-white font-bold hover:bg-green-700 transition"
        >
        Add
        </button>
    </div>

    {/* List of custom units */}
    {Object.keys(customUnits).length > 0 && (
        <div className="space-y-2">
        <h5 className="font-semibold">Your Custom Units:</h5>
        {Object.entries(customUnits).map(([name, def]) => (
            <div
            key={name}
            className="flex justify-between items-center bg-black/40 px-3 py-2 rounded-md"
            >
            <span className="font-medium">{name} = {def}</span>
            <button
                onClick={() => removeCustomUnit(name)}
                className="text-red-400 hover:text-red-600 font-bold"
            >
                ✕
            </button>
            </div>
        ))}
        </div>
    )}
    </div>
    </div>
  );
}
