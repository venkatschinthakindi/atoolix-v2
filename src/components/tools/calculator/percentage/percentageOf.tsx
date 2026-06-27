"use client";

import { useMemo, useState } from "react";
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
  originalPriceFromDiscount,
  basePriceFromGst,
} from "@/lib/percentage/percentage";

/**
 * -----------------------------
 * MODE ENGINE (IMPORTANT PART)
 * -----------------------------
 */

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
  | "gst_reverse"
  ;


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

  // ================= BUSINESS =================

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

  // ================= PROFIT / LOSS =================

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
      { key: "b", label: "Selling", placeholder: "150" }
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
      { key: "b", label: "Return Value", placeholder: "150" }
    ],
    calculate: ([a, b]) => roiPercent(a, b),
  },

  // ================= REVERSE ENGINE =================

  {
    id: "reverse_cost",
    label: "Cost from Profit %",
    description: "Find cost price from selling price and profit %",
    formula: "Cost = Selling ÷ (1 + Profit% / 100)",
    inputs: [
      { key: "a", label: "Selling Price", placeholder: "200" },
      { key: "b", label: "Profit %", placeholder: "20" }
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
      { key: "b", label: "Profit %", placeholder: "20" }
    ],
    calculate: ([a, b]) => sellingPriceFromProfit(a, b),
  },

  {
    id: "reverse_discount",
    label: "Original Price",
    description: "Find original price before discount",
    formula: "Original = Final ÷ (1 - Discount% / 100)",
    inputs: [
      { key: "a", label: "Final Price", placeholder: "80" },
      { key: "b", label: "Discount %", placeholder: "20" }
    ],
    calculate: ([a, b]) => originalPriceFromDiscount(a, b),
  },

  {
    id: "gst_reverse",
    label: "Base Price (No GST)",
    description: "Remove GST from total price",
    formula: "Base = Total ÷ (1 + GST% / 100)",
    inputs: [
      { key: "a", label: "Total Price", placeholder: "118" },
      { key: "b", label: "GST %", placeholder: "18" }
    ],
    calculate: ([a, b]) => basePriceFromGst(a, b),
  },
];


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
  }, [mode, values]);
const displayResult =
  result === null || !Number.isFinite(result)
    ? "--"
    : result.toLocaleString();
    
  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
    <div className="mb-2">
        <h2 className="text-xl font-bold">
            {activeMode.label}
        </h2>

        <p className="text-sm text-gray-500">
            {activeMode.description}
        </p>
        </div>
      {/* MODE BUTTONS */}
      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-3 py-2 border rounded ${
              mode === m.id ? "bg-black text-white" : ""
            }`}
          >
            {m.label}
          </button>
        ))}
        <button
        onClick={() => setValues({})}
        className="px-3 py-2 border rounded text-sm"
        >
        Reset
        </button>
      </div>
      {activeMode.formula && (
        <div className="p-3 border rounded bg-blue-50 text-sm">
            <div className="font-semibold mb-1">Formula</div>
            <code>{activeMode.formula}</code>
        </div>
        )}
        {activeMode.description && (
        <div className="text-sm text-gray-500">
            {activeMode.description}
        </div>
        )}
      {/* DYNAMIC INPUTS */}
      <div className="grid gap-3">
        {activeMode.inputs.map((input) => (
            <div key={input.key} className="space-y-1">

            <label className="text-sm text-gray-600">
                {input.label}
            </label>

            <input
                value={values[input.key] || ""}
                onChange={(e) =>
                setValues((prev) => ({
                    ...prev,
                    [input.key]: e.target.value,
                }))
                }
                placeholder={input.placeholder}
                className="border p-2 rounded w-full"
            />
            </div>
        ))}
        </div>

      {/* RESULT */}
      {result !== null && (
        <div className="p-3 bg-gray-50 border rounded text-sm space-y-1">

            <div className="font-semibold">Result</div>

            <div className="text-xl font-bold">
                {result === null || !Number.isFinite(result)
                    ? "--"
                    : displayResult}
            </div>

            <div className="text-xs text-gray-500 mt-2">
            {activeMode.description}
            </div>

        </div>
        )}
    </div>
  );
}