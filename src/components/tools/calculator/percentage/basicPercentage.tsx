"use client";

import { percentageOf, round } from "@/lib/percentage/percentage";
import { useMemo, useState } from "react";

export default function BasicPercentage() {
  const [value, setValue] = useState("");
  const [percent, setPercent] = useState("");

  const result = useMemo(() => {
    const valueNumber = Number(value);
    const percentNumber = Number(percent);

    if (
      value.trim() === "" ||
      percent.trim() === "" ||
      Number.isNaN(valueNumber) ||
      Number.isNaN(percentNumber)
    ) {
      return null;
    }

    return round(percentageOf(valueNumber, percentNumber), 6);
  }, [value, percent]);

  const clear = () => {
    setValue("");
    setPercent("");
  };

  const copyResult = async () => {
    if (result === null) return;

    try {
      await navigator.clipboard.writeText(String(result));
    } catch {
      // Clipboard unavailable
    }
  };

  return (
    <div className="space-y-6">

      <div className="surface-panel p-6 space-y-5">

        <div>
          <label
            htmlFor="basic-value"
            className="block mb-2 font-medium"
          >
            Value
          </label>

          <input
            id="basic-value"
            type="number"
            inputMode="decimal"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="500"
            className="w-full rounded-lg border border-white/10 bg-black/30 p-3"
          />
        </div>

        <div>
          <label
            htmlFor="basic-percent"
            className="block mb-2 font-medium"
          >
            Percentage
          </label>

          <input
            id="basic-percent"
            type="number"
            inputMode="decimal"
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
            placeholder="20"
            className="w-full rounded-lg border border-white/10 bg-black/30 p-3"
          />
        </div>

        <div className="rounded-xl bg-black/40 p-5">

          <div className="text-sm text-white/60">
            Result
          </div>

          <div className="mt-2 text-3xl font-bold">
            {result ?? "--"}
          </div>

        </div>

        {result !== null && (
          <div className="space-y-3">

            <div className="rounded-lg bg-black/20 p-4">

              <div className="font-semibold mb-2">
                Formula
              </div>

              <code>
                (Value × Percentage) ÷ 100
              </code>

            </div>

            <div className="rounded-lg bg-black/20 p-4">

              <div className="font-semibold mb-2">
                Steps
              </div>

              <p>
                ({value} × {percent}) ÷ 100
              </p>

              <p>
                = {result}
              </p>

            </div>

          </div>
        )}

        <div className="flex flex-wrap gap-3">

          <button
            type="button"
            onClick={copyResult}
            disabled={result === null}
            className="button-form"
          >
            Copy Result
          </button>

          <button
            type="button"
            onClick={clear}
            className="button-danger"
          >
            Reset
          </button>

        </div>

      </div>

    </div>
  );
}