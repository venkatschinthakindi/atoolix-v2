"use client";

import { useMemo, useState } from "react";
import {
  Copy,
  RotateCcw,
  Calculator,
  FileText,
} from "lucide-react";
import {
  percentageOf,
  increaseByPercent,
  decreaseByPercent,
  reversePercentage,
  percentageChange,
  discountedPrice,
  markupPrice,
  amountWithGst,
  payoutAfterCommission,
  totalWithTip,
  profit,
  lossPercent,
  marginPercent,
  roiPercent,
  reverseCostFromProfit,
  sellingPriceFromProfit,
} from "@/lib/percentage/percentage";

type Mode =
  | "of"
  | "add"
  | "subtract"
  | "reverse"
  | "change"
  | "discount"
  | "markup"
  | "gst"
  | "commission"
  | "tip"
  | "profit"
  | "loss"
  | "margin"
  | "roi"
  | "reverse_cost"
  | "reverse_sell"
  | "reverse_discount"
  | "gst_reverse";

type InputConfig = {
  key: string;
  label: string;
  placeholder: string;
};

type ModeConfig = {
  id: Mode;
  label: string;
  inputs: InputConfig[];
  calculate: (values: number[]) => number;
  formula?: string;
  description?: string;
};

const MODES: ModeConfig[] = [
  {
    id: "of",
    label: "X% of Y",
    description: "Calculates percentage value of a number",
    formula: "Result = (Value × Percent) ÷ 100",
    inputs: [
      { key: "a", label: "Value", placeholder: "200" },
      { key: "b", label: "Percent", placeholder: "10" },
    ],
    calculate: ([a, b]) => percentageOf(a, b),
  },
  {
    id: "add",
    label: "Increase %",
    description: "Increases value by percentage",
    formula: "Final = Value × (1 + %/100)",
    inputs: [
      { key: "a", label: "Value", placeholder: "100" },
      { key: "b", label: "Percent", placeholder: "20" },
    ],
    calculate: ([a, b]) => increaseByPercent(a, b),
  },
  {
    id: "subtract",
    label: "Decrease %",
    description: "Decreases value by percentage",
    formula: "Final = Value × (1 - %/100)",
    inputs: [
      { key: "a", label: "Value", placeholder: "100" },
      { key: "b", label: "Percent", placeholder: "20" },
    ],
    calculate: ([a, b]) => decreaseByPercent(a, b),
  },
  {
    id: "reverse",
    label: "Reverse %",
    description: "Find original value before percentage change",
    formula: "Original = Final ÷ (1 + %/100)",
    inputs: [
      { key: "a", label: "Final Value", placeholder: "120" },
      { key: "b", label: "Percent", placeholder: "20" },
    ],
    calculate: ([a, b]) => reversePercentage(a, b),
  },
  {
    id: "change",
    label: "% Change",
    description: "Calculates percentage change between two values",
    formula: "Change % = ((New - Old) / Old) × 100",
    inputs: [
      { key: "a", label: "Old Value", placeholder: "100" },
      { key: "b", label: "New Value", placeholder: "150" },
    ],
    calculate: ([a, b]) => percentageChange(a, b),
  },
  {
    id: "discount",
    label: "Discount",
    description: "Calculates price after discount",
    formula: "Final = Price - (Price × Discount% / 100)",
    inputs: [
      { key: "a", label: "Price", placeholder: "500" },
      { key: "b", label: "Discount %", placeholder: "10" },
    ],
    calculate: ([a, b]) => discountedPrice(a, b),
  },
  {
    id: "markup",
    label: "Markup",
    description: "Adds markup to cost price",
    formula: "Final = Cost × (1 + Markup% / 100)",
    inputs: [
      { key: "a", label: "Cost", placeholder: "500" },
      { key: "b", label: "Markup %", placeholder: "20" },
    ],
    calculate: ([a, b]) => markupPrice(a, b),
  },
  {
    id: "gst",
    label: "GST",
    description: "Adds GST tax to amount",
    formula: "Total = Amount × (1 + GST% / 100)",
    inputs: [
      { key: "a", label: "Amount", placeholder: "1000" },
      { key: "b", label: "GST %", placeholder: "18" },
    ],
    calculate: ([a, b]) => amountWithGst(a, b),
  },
  {
    id: "commission",
    label: "Commission",
    description: "Calculates payout after commission deduction",
    formula: "Payout = Sale - (Sale × Commission% / 100)",
    inputs: [
      { key: "a", label: "Sale", placeholder: "1000" },
      { key: "b", label: "Commission %", placeholder: "10" },
    ],
    calculate: ([a, b]) => payoutAfterCommission(a, b),
  },
  {
    id: "tip",
    label: "Tip",
    description: "Adds tip to bill amount",
    formula: "Total = Bill × (1 + Tip% / 100)",
    inputs: [
      { key: "a", label: "Bill", placeholder: "500" },
      { key: "b", label: "Tip %", placeholder: "10" },
    ],
    calculate: ([a, b]) => totalWithTip(a, b),
  },
  {
    id: "profit",
    label: "Profit",
    description: "Calculates profit amount",
    formula: "Profit = Selling Price - Cost Price",
    inputs: [
      { key: "a", label: "Cost", placeholder: "100" },
      { key: "b", label: "Selling Price", placeholder: "150" },
    ],
    calculate: ([a, b]) => profit(a, b),
  },
  {
    id: "loss",
    label: "Loss %",
    description: "Calculates loss percentage",
    formula: "Loss % = ((Cost - Selling) / Cost) × 100",
    inputs: [
      { key: "a", label: "Cost", placeholder: "150" },
      { key: "b", label: "Selling Price", placeholder: "100" },
    ],
    calculate: ([a, b]) => lossPercent(a, b),
  },
  {
    id: "margin",
    label: "Margin %",
    description: "Profit margin percentage",
    formula: "Margin % = ((Selling - Cost) / Selling) × 100",
    inputs: [
      { key: "a", label: "Cost", placeholder: "100" },
      { key: "b", label: "Selling", placeholder: "150" },
    ],
    calculate: ([a, b]) => marginPercent(a, b),
  },
  {
    id: "roi",
    label: "ROI %",
    description: "Return on investment percentage",
    formula: "ROI % = ((Return - Cost) / Cost) × 100",
    inputs: [
      { key: "a", label: "Cost", placeholder: "100" },
      { key: "b", label: "Return Value", placeholder: "150" },
    ],
    calculate: ([a, b]) => roiPercent(a, b),
  },
  {
    id: "reverse_cost",
    label: "Cost from Profit %",
    description: "Find cost price from selling price and profit %",
    formula: "Cost = Selling ÷ (1 + Profit% / 100)",
    inputs: [
      { key: "a", label: "Selling Price", placeholder: "200" },
      { key: "b", label: "Profit %", placeholder: "20" },
    ],
    calculate: ([a, b]) => reverseCostFromProfit(a, b),
  },
  {
    id: "reverse_sell",
    label: "Selling from Cost %",
    description: "Find selling price from cost and profit %",
    formula: "Selling = Cost × (1 + Profit% / 100)",
    inputs: [
      { key: "a", label: "Cost", placeholder: "100" },
      { key: "b", label: "Profit %", placeholder: "20" },
    ],
    calculate: ([a, b]) => sellingPriceFromProfit(a, b),
  },
];

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
          <h2 className="text-base font-semibold tracking-tight text-white sm:text-md">{title}</h2>
          <p className="mt-1 text-xs text-white/60 sm:text-sm">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function InputField({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-xs uppercase tracking-[0.16em] text-white/45">
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl border border-white/10 bg-black/10 px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-blue-400/35 focus:bg-black/15"
      />
    </div>
  );
}

function ActionButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { className: string }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold transition ${className}`}
    >
      {children}
    </button>
  );
}

export default function PercentageOf() {
  const [mode, setMode] = useState<Mode>("of");
  const [values, setValues] = useState<Record<string, string>>({});

  const activeMode = MODES.find((m) => m.id === mode)!;

  const result = useMemo(() => {
    const nums = activeMode.inputs.map((i) => {
      const v = values[i.key];
      if (v === "" || v === undefined) return NaN;
      return Number(v);
    });
    if (nums.some((n) => !Number.isFinite(n))) return null;
    return activeMode.calculate(nums);
  }, [mode, values, activeMode]);

  const displayResult =
    result === null || !Number.isFinite(result) ? "--" : result.toLocaleString();

  const clear = () => setValues({});

  const copyResult = async () => {
    if (result === null) return;
    try {
      await navigator.clipboard.writeText(String(result));
    } catch {}
  };

  return (
    <div className="space-y-4">
      <ShellCard>
        <SectionHeader
          icon={Calculator}
          title={activeMode.label}
          subtitle={activeMode.description ?? "Choose a mode and calculate instantly."}
        />

        <div className="space-y-4 p-3 sm:p-4 md:p-5">
          <div className="flex flex-wrap gap-2">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`rounded-2xl border px-4 py-2.5 text-sm font-medium transition ${
                  mode === m.id
                    ? "border-blue-400/35 bg-blue-400/10 text-white"
                    : "border-white/10 bg-white/5 text-white/75 hover:border-white/20 hover:bg-white/10"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {activeMode.formula && (
            <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-white/45">Formula</p>
              <code className="mt-2 block text-sm text-white/80">{activeMode.formula}</code>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            {activeMode.inputs.map((input) => (
              <InputField
                key={input.key}
                id={`${mode}-${input.key}`}
                label={input.label}
                value={values[input.key] || ""}
                onChange={(v) =>
                  setValues((prev) => ({
                    ...prev,
                    [input.key]: v,
                  }))
                }
                placeholder={input.placeholder}
              />
            ))}
          </div>

          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-emerald-200/70">Result</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {displayResult}
            </p>
          </div>

          {result !== null && (
            <div className="grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">Steps</p>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  {activeMode.inputs.map((i) => values[i.key] ?? "").join(" , ")} = {displayResult}
                </p>
                <p className="mt-2 text-xs leading-5 text-white/45">{activeMode.description}</p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <ActionButton
              type="button"
              onClick={copyResult}
              disabled={result === null}
              className="bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:from-blue-400 hover:to-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Copy className="h-4.5 w-4.5" />
              Copy Result
            </ActionButton>

            <ActionButton
              type="button"
              onClick={clear}
              className="border border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <RotateCcw className="h-4.5 w-4.5" />
              Reset
            </ActionButton>
          </div>
        </div>
      </ShellCard>

      <ShellCard>
        <SectionHeader
          icon={FileText}
          title="Calculation modes"
          subtitle="Discount, GST, markup, profit, loss, ROI, and reverse calculations are available here."
        />

        <div className="p-3 sm:p-4 md:p-5">
          <div className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm leading-6 text-white/70">
            Switch modes using the pill buttons above. The layout stays responsive and keeps the same visual system across desktop and mobile.
          </div>
        </div>
      </ShellCard>
    </div>
  );
}