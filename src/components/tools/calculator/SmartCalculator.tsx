"use client";

import { useState } from "react";

type SmartCalculatorProps = {
  initialExpression: string | undefined;
  theme: "light" | "dark" | undefined;
};

export function SmartCalculator({ initialExpression, theme }: SmartCalculatorProps) {
  const [expression, setExpression] = useState(initialExpression);
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [memory, setMemory] = useState(0);

  const calculate = async () => {
    try {
      const { evaluate } = await import("mathjs");
      let expr = expression?.replace(/(\d+)!/g, (_, n) => `factorial(${n})`);
      expr = expr?.replace(/\b0+(\d+)/g, "$1");
      const res = evaluate(expr!);
      setResult(res.toString());
      setHistory([...history, `${expression} = ${res}`]);
    } catch {
      setResult("Error");
    }
  };

  const handleClick = async (val: string) => {
    if (val === "=") await calculate();
    else if (val === "C") setExpression("");
    else setExpression(expression + val);
  };

  const sciButtons = ["sin(","cos(","tan(","log(","ln(","sqrt(","pi","e","!","%","(",")"];

  return (
    <div className={`space-y-6 ${theme === "light" ? "text-slate-950" : "text-white"}`}>
      {/* Display */}
      <div className={`p-4 text-right ${theme === "light" ? "bg-white-900 text-black text-slate-950" : 
        "rounded-md bg-black/40 text-white"}`}>
        <div className="text-white/70 text-sm">{expression || "0"}</div>
        <div className="text-white text-2xl font-semibold">{result || ""}</div>
      </div>

      {/* Input (optional manual typing) */}
      <input
        value={expression}
        onChange={e => setExpression(e.target.value)}
        placeholder="Enter expression"
        className="w-full p-3 rounded-md bg-black/40 text-white"/>

      {/* Number Pad */}
      <div className="grid grid-cols-3 gap-2">
        {["7","8","9","4","5","6","1","2","3"].map(btn => (
          <button key={btn} onClick={async () => await handleClick(btn)} className="button-ghost-lg">
            {btn}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <button onClick={async () => await handleClick("0")} className="button-ghost-lg">0</button>
        <button onClick={async () => await handleClick(".")} className="button-ghost-lg">.</button>
        <button onClick={async () => await handleClick("=")} className="surface-button button-primary text-lg">=</button>
      </div>

      {/* Operators */}
      <div className="flex gap-2 flex-wrap">
        {["/","*","-","+"].map(op => (
          <button key={op} onClick={async () => await handleClick(op)} className="button-ghost-lg flex-1">
            {op}
          </button>
        ))}
        <button onClick={async () => await handleClick("C")} className="button-danger">
          Clear
        </button>
      </div>

      {/* Scientific */}
      <div className="flex flex-wrap gap-2">
        {sciButtons.map(btn => (
          <button key={btn} onClick={async () => await handleClick(btn)} className="button-ghost-sm">
            {btn}
          </button>
        ))}
      </div>

      {/* Memory */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setMemory(memory + Number(result))} className="button-form">M+</button>
        <button onClick={() => setMemory(memory - Number(result))} className="button-form">M-</button>
        <button onClick={() => setExpression(expression! + memory)} className="button-form">MR</button>
        <button onClick={() => setMemory(0)} className="button-form">MC</button>
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