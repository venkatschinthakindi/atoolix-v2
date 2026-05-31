"use client";

import { useParams, useRouter } from "next/navigation";
import { tools } from "@/data/tools";
import { FloatingDock } from "@/components/layout/floating-dock";
import { useState } from "react";
import {
  evaluate, simplify, derivative, parse, det, inv, eigs, complex, unit,
  mean, median, mode, variance, std, combinations, permutations,
  log, exp, pow, abs, round, sqrt, gcd, lcm, fraction
} from "mathjs";// math.js parser
import { BookOpenCheck, HelpCircle, X } from "lucide-react"; // Lucide icons

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
    <div>
      {/* Tab Bar */}
      <div className="flex justify-center mb-6">
        <div className="tab-group">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`tab-button ${activeTab === tab.id ? "tab-button-active" : ""}`}
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
        {activeTab === "solve" && <AdvancedEquationSolverPage />}
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

function AdvancedEquationSolverPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="">
      <h1 className="text-4xl font-bold text-white mb-4">Advanced Equation Solver</h1>
      <p className="text-zinc-400 mb-8">
        Solve equations, explore calculus, work with matrices, handle statistics, convert units, and more — all in one elegant tool.
      </p>

      <div className="flex gap-8">
        <div className="flex-1">
          <EquationSolver />
        </div>

        {/* Sidebar toggle icon */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full p-3 transition h-fit"
          aria-label="Open Help"
        >
          <HelpCircle size={24} />
        </button>
      </div>

      {/* Sidebar Drawer */}
      {sidebarOpen && (
        <div className="app-shell fixed top-0 right-0 w-96 h-full bg-black/90 border-l border-white/10 p-6 overflow-y-auto z-50 transition-transform">
          <div className="flex justify-between items-center mb-4">
            <BookOpenCheck size={24} className="text-green-400" />
            <h2 className="text-2xl font-semibold text-white">Quick Reference</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="bg-red-900 hover:bg-red-700 text-white rounded-full transition"
              aria-label="Close Help"
            >
              <X size={28} />
            </button>
          </div>
          <DocumentationPanel />
        </div>
      )}
    </div>
  );
}

function EquationSolver() {
  const [equation, setEquation] = useState("");
  const [solution, setSolution] = useState("");

  const solveEquationHandler = (eq: string) => {
    try {
      let expr = eq.replace(/(\d+)!/g, (_, n) => `factorial(${n})`);
      expr = expr.replace(/\b0+(\d+)/g, "$1");

      // Examples of handling
      if (expr.startsWith("det")) return det(evaluate(expr.replace("det",""))).toString();
      if (expr.startsWith("inv")) return JSON.stringify(inv(evaluate(expr.replace("inv",""))));
      if (expr.startsWith("eigs")) return JSON.stringify(eigs(evaluate(expr.replace("eigs",""))));
      if (expr.startsWith("complex")) {
        const match = expr.match(/complex\((.+),(.+)\)/);
        if (match) return complex(Number(match[1]), Number(match[2])).toString();
      }
      if (expr.includes("to")) return unit(expr).toString();
      if (expr.startsWith("mean")) return mean(evaluate(expr.replace("mean",""))).toString();
      if (expr.startsWith("median")) return median(evaluate(expr.replace("median",""))).toString();
      if (expr.startsWith("mode")) return JSON.stringify(mode(evaluate(expr.replace("mode",""))));
      if (expr.startsWith("variance")) return variance(evaluate(expr.replace("variance",""))).toString();
      if (expr.startsWith("std")) return std(evaluate(expr.replace("std",""))).toString();
      if (expr.startsWith("combinations")) {
        const match = expr.match(/combinations\((.+),(.+)\)/);
        if (match) return combinations(Number(match[1]), Number(match[2])).toString();
      }
      if (expr.startsWith("permutations")) {
        const match = expr.match(/permutations\((.+),(.+)\)/);
        if (match) return permutations(Number(match[1]), Number(match[2])).toString();
      }
      if (expr.startsWith("log")) return log(evaluate(expr.replace("log",""))).toString();
      if (expr.startsWith("exp")) return exp(evaluate(expr.replace("exp",""))).toString();
      if (expr.startsWith("pow")) {
        const match = expr.match(/pow\((.+),(.+)\)/);
        if (match) return pow(Number(match[1]), Number(match[2])).toString();
      }
      if (expr.startsWith("abs")) return abs(evaluate(expr.replace("abs",""))).toString();
      if (expr.startsWith("round")) return round(evaluate(expr.replace("round",""))).toString();
      if (expr.startsWith("sqrt")) return sqrt(evaluate(expr.replace("sqrt",""))).toString();
      if (expr.startsWith("gcd")) {
        const match = expr.match(/gcd\((.+),(.+)\)/);
        if (match) return gcd(Number(match[1]), Number(match[2])).toString();
      }
      if (expr.startsWith("lcm")) {
        const match = expr.match(/lcm\((.+),(.+)\)/);
        if (match) return lcm(Number(match[1]), Number(match[2])).toString();
      }
      if (expr.startsWith("fraction")) return JSON.stringify(fraction(Number(expr.replace("fraction",""))));
      if (expr.startsWith("derivative")) {
        const match = expr.match(/derivative\("(.+)",\s*"(.+)"\)/);
        if (match) return derivative(match[1], match[2]).toString();
      }
      if (expr.startsWith("simplify")) return simplify(expr.replace("simplify","")).toString();

      return evaluate(expr).toString();
    } catch {
      return "Error: Unsupported or invalid equation";
    }
  };

  return (
    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-6">
      <div className="bg-black/40 rounded-lg p-4 text-right">
        <div className="text-white text-2xl font-semibold">{solution || "0"}</div>
      </div>
      <input
        value={equation}
        onChange={e => setEquation(e.target.value)}
        placeholder="Enter an equation or expression (examples in Help)"
        className="w-full p-3 rounded-lg bg-black/30 text-white border border-white/10 focus:ring-2 focus:ring-green-500"
      />
      <button
        onClick={() => setSolution(solveEquationHandler(equation))}
        className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 transition w-full"
      >
        Solve
      </button>
    </div>
  );
}

function DocumentationPanel() {
  return (
    <div className="space-y-3 text-sm text-white">
      <p><b>Basics:</b> <code>12+8/2</code> → 16</p>
      <p><b>Algebra:</b> <code>simplify(2x+3x)</code> → 5x</p>
      <p><b>Trigonometry:</b> <code>sin(pi/4)</code> → 0.707</p>
      <p><b>Logarithms:</b> <code>log(1000)</code> → 6.9</p>
      <p><b>Exponentials:</b> <code>exp(1)</code> → 2.718</p>
      <p><b>Powers:</b> <code>pow(2,3)</code> → 8</p>
      <p><b>Absolute:</b> <code>abs(-5)</code> → 5</p>
      <p><b>Round:</b> <code>round(pi,2)</code> → 3.14</p>
      <p><b>Sqrt:</b> <code>sqrt(16)</code> → 4</p>
      <p><b>GCD/LCM:</b> <code>gcd(12,18)</code> → 6, <code>lcm(4,6)</code> → 12</p>
      <p><b>Fraction:</b> <code>fraction(0.75)</code> → 3/4</p>
      <p><b>Derivative:</b> <code>derivative("x^2+3x","x")</code> → 2x+3</p>
      <p><b>Matrices:</b> <code>det([[1,2],[3,4]])</code> → -2</p>
      <p><b>Complex:</b> <code>complex(2,3)</code> → 2+3i</p>
      <p><b>Units:</b> <code>5 cm to inch</code> → 1.9685 inch</p>
      <p><b>Statistics:</b> <code>mean([1,2,3,4])</code> → 2.5</p>
      <p><b>Combinatorics:</b> <code>combinations(5,2)</code> → 10</p>
      <p className="text-zinc-400 text-xs mt-4">
        💡 Tip: Start with basics, then explore algebra, calculus, matrices, statistics, and more.
      </p>
    </div>
  );
}
