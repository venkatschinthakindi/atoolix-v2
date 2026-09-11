"use client";

import { useMemo, useState } from "react";
import { Calculator, Percent } from "lucide-react";

type PercentageTab = "of" | "whatPercent" | "change" | "apply";

const tabs: { id: PercentageTab; label: string; desc: string }[] = [
  { id: "of", label: "X% of Y", desc: "Find a percentage of a number" },
  { id: "whatPercent", label: "X is what % of Y?", desc: "Find the percentage one value represents" },
  { id: "change", label: "% Increase / Decrease", desc: "Compare an original and new value" },
  { id: "apply", label: "Add / Subtract %", desc: "Apply a percentage change to a value" },
];

function number(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function format(value: number, suffix = "") {
  if (!Number.isFinite(value)) return "—";
  return `${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 6 }).format(value)}${suffix}`;
}

function Field({ label, value, onChange, suffix }: { label: string; value: string; onChange: (value: string) => void; suffix?: string }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="flex items-center rounded-2xl border border-border bg-card px-3 focus-within:border-blue-300 dark:border-blue-400/40">
        <input
          inputMode="decimal"
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-w-0 flex-1 bg-transparent py-3 text-base text-foreground outline-none placeholder:text-foreground-faint"
        />
        {suffix && <span className="pl-2 text-sm text-foreground-faint">{suffix}</span>}
      </div>
    </label>
  );
}

export function PercentageCalculator() {
  const [activeTab, setActiveTab] = useState<PercentageTab>("of");
  const [percent, setPercent] = useState("20");
  const [value, setValue] = useState("150");
  const [part, setPart] = useState("45");
  const [whole, setWhole] = useState("180");
  const [original, setOriginal] = useState("80");
  const [current, setCurrent] = useState("100");
  const [applyValue, setApplyValue] = useState("120");
  const [applyPercent, setApplyPercent] = useState("15");
  const [direction, setDirection] = useState<"increase" | "decrease">("increase");

  const result = useMemo(() => {
    const p = number(percent);
    const y = number(value);
    const x = number(part);
    const w = number(whole);
    const oldValue = number(original);
    const newValue = number(current);
    const base = number(applyValue);
    const rate = number(applyPercent);

    switch (activeTab) {
      case "of":
        return {
          value: (p / 100) * y,
          label: `${p}% of ${y}`,
          formula: `(${p} ÷ 100) × ${y}`,
          explanation: `A percentage is a fraction out of 100, so divide ${p} by 100 and multiply by ${y}.`,
        };
      case "whatPercent":
        return {
          value: w === 0 ? NaN : (x / w) * 100,
          label: `${x} is what % of ${w}?`,
          formula: `(${x} ÷ ${w}) × 100`,
          explanation: `Divide the part by the whole, then multiply by 100.`,
        };
      case "change": {
        const change = oldValue === 0 ? NaN : ((newValue - oldValue) / Math.abs(oldValue)) * 100;
        return {
          value: change,
          label: `${oldValue} → ${newValue}`,
          formula: `((${newValue} − ${oldValue}) ÷ |${oldValue}|) × 100`,
          explanation: Number.isFinite(change) ? (change >= 0 ? `${format(Math.abs(change), "%")} increase` : `${format(Math.abs(change), "%")} decrease`) : "The original value must not be zero.",
        };
      }
      case "apply": {
        const multiplier = direction === "increase" ? 1 + rate / 100 : 1 - rate / 100;
        return {
          value: base * multiplier,
          label: `${base} ${direction === "increase" ? "+" : "−"} ${rate}%`,
          formula: `${base} × (1 ${direction === "increase" ? "+" : "−"} ${rate} ÷ 100)`,
          explanation: direction === "increase" ? `Increase ${base} by ${rate}%.` : `Decrease ${base} by ${rate}%.`,
        };
      }
    }
  }, [activeTab, percent, value, part, whole, original, current, applyValue, applyPercent, direction]);

  return (
    <div className="mx-auto w-full text-foreground sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">
      <div className="mb-5 rounded-3xl border border-border bg-card p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-border bg-card text-blue-700 dark:text-blue-200">
            <Percent className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-lg font-semibold">Percentage Calculator</h2>
            <p className="mt-1 text-sm leading-6 text-foreground-secondary">Calculate percent of a number, what percent one value is of another, percentage change, and add or subtract a percentage.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-border bg-card p-3 sm:p-5">
          <div role="tablist" aria-label="Percentage calculator modes" className="grid gap-3 sm:grid-cols-2">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-2xl border px-4 py-3 text-left transition ${active ? "border-blue-300 dark:border-blue-400/35 bg-blue-100 dark:bg-blue-400/10" : "border-border bg-card hover:bg-surface-raised"}`}
                >
                  <span className="block text-sm font-semibold text-foreground">{tab.label}</span>
                  <span className="mt-1 block text-xs leading-5 text-foreground-faint">{tab.desc}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 space-y-4">
            {activeTab === "of" && (
              <>
                <Field label="Percentage" value={percent} onChange={setPercent} suffix="%" />
                <Field label="Number" value={value} onChange={setValue} />
              </>
            )}

            {activeTab === "whatPercent" && (
              <>
                <Field label="Part value" value={part} onChange={setPart} />
                <Field label="Whole value" value={whole} onChange={setWhole} />
              </>
            )}

            {activeTab === "change" && (
              <>
                <Field label="Original value" value={original} onChange={setOriginal} />
                <Field label="New value" value={current} onChange={setCurrent} />
              </>
            )}

            {activeTab === "apply" && (
              <>
                <Field label="Starting value" value={applyValue} onChange={setApplyValue} />
                <Field label="Percentage" value={applyPercent} onChange={setApplyPercent} suffix="%" />
                <div className="grid grid-cols-2 gap-3">
                  {(["increase", "decrease"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setDirection(option)}
                      className={`rounded-2xl border px-4 py-3 text-sm font-medium capitalize transition ${direction === option ? "border-blue-300 dark:border-blue-400/35 bg-blue-100 dark:bg-blue-400/10 text-foreground" : "border-border bg-card text-foreground-secondary hover:bg-surface-raised"}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-blue-300 dark:border-blue-400/20 bg-blue-100 dark:bg-blue-400/5 p-5 sm:p-6">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground-secondary">
            <Calculator className="h-4 w-4" /> Result
          </div>
          <p className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{format(result.value, activeTab === "whatPercent" || activeTab === "change" ? "%" : "")}</p>
          <p className="mt-2 text-sm text-foreground-secondary">{result.label}</p>
          <div className="mt-6 rounded-2xl border border-border bg-card p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-foreground-faint">Formula</p>
            <p className="mt-2 break-words font-mono text-sm text-foreground">{result.formula}</p>
            <p className="mt-3 text-sm leading-6 text-foreground-secondary">{result.explanation}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
