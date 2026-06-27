"use client";

import { getMath } from "@/lib/mathJsUtility";
import { useState } from "react";

type SmartCalculatorProps = {
  initialExpression: string | undefined;
  theme: "light" | "dark" | undefined;
};

export function SmartCalculator({ initialExpression, theme }: SmartCalculatorProps) {
  const [expression, setExpression] = useState(initialExpression ?? "");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [memory, setMemory] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculate = async () => {
  if (isCalculating) return;

  if (!expression.trim()) {
    setResult("");
    return;
  }

  setIsCalculating(true);

  try {
    const math = await getMath();
    const { evaluate } = math;

    const expr = expression
      .replace(/(\d+)!/g, (_, n) => `factorial(${n})`)
      .replace(/\b0+(\d+)/g, "$1");

    const res = evaluate(expr);

    setResult(String(res));

    setHistory(prev => [
      ...prev.slice(-49),
      `${expression} = ${res}`,
    ]);
  } catch {
    setResult("Error");
  } finally {
    setIsCalculating(false);
  }
};

  const handleClick = async (val: string) => {
    switch (val) {
      case "=":
        if (!expression.trim()) {
            setResult("");
            return;
        }
        await calculate();
        break;

      case "C":
        setExpression("");
        setResult("");
        break;

      default:
        setExpression(prev => prev + val);
        break;
    }
  };

  const sciButtons = ["sin(","cos(","tan(","log(","ln(","sqrt(","pi","e","!","%","(",")"];

  return (
    <div className={`space-y-6 ${theme === "light" ? "text-slate-950" : "text-white"}`}>
      {/* Display */}
      <div className={`p-4 text-right ${theme === "light" ? "bg-white text-black text-slate-950" : 
        "rounded-md bg-black/40 text-white"}`}>
        <div className="text-white text-2xl">{expression || "0"}</div>
        <div className="text-white text-2xl font-semibold">{result || ""}</div>
      </div>

      {/* Input (optional manual typing) */}
      <input
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          onKeyDown={(e) => {
              if (e.key === "Enter") {
                  void calculate();
              }
          }}
          placeholder="Enter expression"
          className={`w-full p-3 rounded-md border`}
      />

      {/* Number Pad */}
      <div className="grid grid-cols-3 gap-2">
        {["7","8","9","4","5","6","1","2","3"].map(btn => (
          <button type="button" key={btn} onClick={() => void handleClick(btn)} className="button-ghost-lg">
            {btn}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <button type="button" onClick={() => void handleClick("0")} className="button-ghost-lg">0</button>
        <button type="button" onClick={() => void handleClick(".")} className="button-ghost-lg">.</button>
        <button type="button" onClick={() => void handleClick("=")} className="surface-button button-primary text-lg">=</button>
      </div>

      {/* Operators */}
      <div className="flex gap-2 flex-wrap">
        {["/","*","-","+"].map(op => (
          <button type="button" key={op} onClick={() => void handleClick(op)} className="button-ghost-lg flex-1">
            {op}
          </button>
        ))}
        <button type="button" onClick={() => void handleClick("C")} className="button-danger">
          Clear
        </button>
      </div>

      {/* Scientific */}
      <div className="flex flex-wrap gap-2">
        {sciButtons.map(btn => (
          <button type="button" key={btn} onClick={() => void handleClick(btn)} className="button-ghost-sm">
            {btn}
          </button>
        ))}
      </div>

      {/* Memory */}
      <div className="flex flex-wrap gap-2">
        <button type="button"
          onClick={() => {
            const value = Number(result);

            if (!Number.isNaN(value)) {
              setMemory(prev => prev + value);
            }
          }} className="button-form">M+</button>
        <button type="button"
          onClick={() => {
            const value = Number(result);
            if (!Number.isNaN(value)) {
              setMemory(prev => prev - value);
            }
          }} className="button-form">M-</button>
        <button type="button" onClick={() => setExpression(prev => (prev ?? "") + String(memory))} className="button-form">MR</button>
        <button type="button" onClick={() => setMemory(0)} className="button-form">MC</button>
      </div>

      {/* History */}
      <div className="text-white/70">
        <b>History:</b>
        <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
          {history.map((h, i) => (
            <div key={i} className="surface-panel px-3 py-2">{h}</div>
          ))}
        </div>
      </div>
    </div>
  );
}