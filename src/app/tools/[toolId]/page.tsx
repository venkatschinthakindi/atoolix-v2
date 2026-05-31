"use client";

import { useParams, useRouter } from "next/navigation";
import { tools } from "@/data/tools";
import { FloatingDock } from "@/components/layout/floating-dock";
import { useState } from "react";
import { evaluate } from "mathjs"; // math.js parser

export default function ToolPage() {
  const router = useRouter();
  const params = useParams();
  const toolId = params?.toolId?.toString()?.toLowerCase() || "";

  const tool = tools.find(t => t.id === toolId);

  if (!tool) {
    return (
      <div className="app-shell">
        <div className="app-container page-section text-white">
          <h1 className="text-2xl font-semibold">Tool not found</h1>
          <button
            className="mt-4 surface-button button-ghost"
            onClick={() => router.push("/tools")}
          >
            ← Back to Tools
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="app-container page-section">
        <div className="mb-12">
          <FloatingDock />
        </div>

        {/* Header */}
        <div className="section-header">
          <button
            className="text-sm text-white/50 hover:text-white mb-2 button-ghost"
            onClick={() => router.push("/tools")}
          >
            ← Back to Tools
          </button>
          <h1 className="section-title">{tool.title}</h1>
          <p className="section-copy">{tool.description}</p>
        </div>

      {/* Conditional Rendering */}
      {toolId === "calculator" ? <TabbedCalculator /> : <GenericTool />}
      </div>
    </div>
  );
}

/* ---------------- Generic Tool Layout ---------------- */
function GenericTool() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 isolate">
      <div className="surface-card p-6">
        <h2 className="text-white font-medium mb-4">Input</h2>

        <div className="surface-panel p-4 text-white/50">
          Upload file / use webcam / enter data here
        </div>
      </div>

      <div className="surface-card p-6">
        <h2 className="text-white font-medium mb-4">Output</h2>

        <div className="surface-panel p-4 text-white/50">
          Results will appear here
        </div>
      </div>
    </div>
  );
}

/* ---------------- Tabbed Smart Calculator ---------------- */
function TabbedCalculator() {
  const [activeTab, setActiveTab] = useState<"calc" | "convert" | "solve">("calc");

  const tabs = [
    { id: "calc", label: "Calculator" },
    { id: "convert", label: "Unit Conversion" },
    { id: "solve", label: "Equation Solver" },
  ];

  return (
    <div className="app-shell">
      <div className="app-container page-section">
        {/* Tab Bar */}
        <div className="flex justify-center mb-6">
          <div className="tab-group">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`tab-button ${
                  activeTab === tab.id ? "tab-button-active" : ""
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Panels */}
        <div className="transition-opacity duration-500 ease-in-out">
          {activeTab === "calc" && <SmartCalculator />}
          {activeTab === "convert" && <UnitConverter />}
          {activeTab === "solve" && <EquationSolver />}
        </div>
      </div>
    </div>
  );
}

function SmartCalculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [memory, setMemory] = useState(0);

  const calculate = () => {
    try {
      let expr = expression.replace(/(\d+)!/g, (_, n) => `factorial(${n})`);
      expr = expr.replace(/\b0+(\d+)/g, "$1");
      const res = evaluate(expr);
      setResult(res.toString());
      setHistory([...history, `${expression} = ${res}`]);
    } catch {
      setResult("Error");
    }
  };

  const handleClick = (val: string) => {
    if (val === "=") calculate();
    else if (val === "C") setExpression("");
    else setExpression(expression + val);
  };

  const sciButtons = ["sin(","cos(","tan(","log(","ln(","sqrt(","pi","e","!","%","(",")"];

  return (
    <div className="space-y-6">
      {/* Display */}
      <div className="surface-panel p-4 text-right">
        <div className="text-white/70 text-sm">{expression || "0"}</div>
        <div className="text-white text-2xl font-semibold">{result || ""}</div>
      </div>

      {/* Input (optional manual typing) */}
      <input
        value={expression}
        onChange={e => setExpression(e.target.value)}
        placeholder="Enter expression"
        className="w-full p-3 surface-input text-white focus:outline-none focus:ring-2 focus:ring-green-500"/>

      {/* Number Pad */}
      <div className="grid grid-cols-3 gap-2">
        {["7","8","9","4","5","6","1","2","3"].map(btn => (
          <button key={btn} onClick={() => handleClick(btn)} className="button-ghost-lg">
            {btn}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <button onClick={() => handleClick("0")} className="button-ghost-lg">0</button>
        <button onClick={() => handleClick(".")} className="button-ghost-lg">.</button>
        <button onClick={() => handleClick("=")} className="surface-button button-primary text-lg">=</button>
      </div>

      {/* Operators */}
      <div className="flex gap-2 flex-wrap">
        {["/","*","-","+"].map(op => (
          <button key={op} onClick={() => handleClick(op)} className="button-ghost-lg flex-1">
            {op}
          </button>
        ))}
        <button onClick={() => handleClick("C")} className="button-danger">
          Clear
        </button>
      </div>

      {/* Scientific */}
      <div className="flex flex-wrap gap-2">
        {sciButtons.map(btn => (
          <button key={btn} onClick={() => handleClick(btn)} className="button-ghost-sm">
            {btn}
          </button>
        ))}
      </div>

      {/* Memory */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setMemory(memory + Number(result))} className="button-form">M+</button>
        <button onClick={() => setMemory(memory - Number(result))} className="button-form">M-</button>
        <button onClick={() => setExpression(expression + memory)} className="button-form">MR</button>
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

/* ---------------- Unit Converter ---------------- */
function UnitConverter() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("cm");
  const [result, setResult] = useState("");

  const conversions: Record<string, (v: number) => number> = {
    "m-cm": v => v * 100,
    "cm-m": v => v / 100,
    "kg-g": v => v * 1000,
    "g-kg": v => v / 1000,
    "C-F": v => (v * 9) / 5 + 32,
    "F-C": v => ((v - 32) * 5) / 9,
  };

  const convert = () => {
    const key = `${from}-${to}`;
    if (conversions[key]) {
      setResult(conversions[key](parseFloat(value)).toString());
    } else {
      setResult("Conversion not available");
    }
  };

  return (
    <div className="space-y-4">
       {/* Display */}
      <div className="surface-panel p-4 text-right">
        <div className="text-white text-2xl font-semibold">{result || "0"}</div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Enter value"
          className="form-field"
        />
        <select value={from} onChange={e => setFrom(e.target.value)} className="form-select">
          <option value="m">Meters</option>
          <option value="cm">Centimeters</option>
          <option value="kg">Kilograms</option>
          <option value="g">Grams</option>
          <option value="C">Celsius</option>
          <option value="F">Fahrenheit</option>
        </select>
        <div className="flex items-center justify-center text-white">→</div>
        <select value={to} onChange={e => setTo(e.target.value)} className="form-select">
          <option value="cm">Centimeters</option>
          <option value="m">Meters</option>
          <option value="g">Grams</option>
          <option value="kg">Kilograms</option>
          <option value="F">Fahrenheit</option>
          <option value="C">Celsius</option>
        </select>
      </div>
      <button onClick={convert} className="surface-button button-primary float-right">
        Convert
      </button>
    </div>
  );
}

/* ---------------- Equation Solver ---------------- */
function EquationSolver() {
  const [equation, setEquation] = useState("");
  const [solution, setSolution] = useState("");

  const solveEquation = (eq: string) => {
    try {
      // math.js can solve simple linear equations
      // Example: "2x+3=7"
      const [lhs, rhs] = eq.split("=");
      const rhsVal = evaluate(rhs);
      // crude linear solver for ax+b form
      const match = lhs.match(/([0-9]*)x([+-][0-9]+)/);
      if (match) {
        const a = parseFloat(match[1]);
        const b = parseFloat(match[2]);
        return ((rhsVal - b) / a).toString();
      }
      return "Unsupported equation format";
    } catch {
      return "Error solving equation";
    }
  };

  const handleSolve = () => {
    setSolution(solveEquation(equation));
  };

  return (
    <div className="space-y-4">
      {/* Display */}
      <div className="surface-panel p-4 text-right">
        <div className="text-white text-2xl font-semibold">{solution || "0"}</div>
      </div>
      <input
        value={equation}
        onChange={e => setEquation(e.target.value)}
        placeholder="Enter linear equation e.g. 2x+3=7"
        className="form-field w-full"
      />
      <button onClick={handleSolve} className="surface-button button-primary float-right">
        Solve
      </button>
      {/* <div className="text-white text-lg font-medium">Solution: {solution}</div> */}
    </div>
  );
}
