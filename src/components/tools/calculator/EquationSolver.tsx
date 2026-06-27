"use client";

import { useEffect, useState } from "react";
import { BookOpenCheck, HelpCircle, X } from "lucide-react";
import { getMath } from "@/lib/mathJsUtility";


export function AdvancedEquationSolverPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!sidebarOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [sidebarOpen]);

  return (
    <div className="relative">
      <h1 className="text-4xl font-bold text-white mb-4">Advanced Equation Solver</h1>
      <p className="text-zinc-400 mb-8">
        Solve equations, explore calculus, work with matrices, handle statistics, convert units, and more — all in one elegant tool.
      </p>

      <div className="flex gap-8">
        <div className="flex-1">
          <EquationSolver />
        </div>

        {/* Sidebar toggle icon */}
        <button type="button"
          onClick={() => setSidebarOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full p-3 transition h-fit"
          aria-label="Open Help"
          aria-expanded={sidebarOpen}
          aria-controls="calculator-help"
        >
          <HelpCircle size={24} />
        </button>
      </div>

      {/* Sidebar Drawer */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />

          <div id="calculator-help"
            role="dialog"
            aria-modal="true"
            aria-labelledby="calculator-help-title"
            className="app-shell fixed top-0 right-0 w-96 h-full bg-black/90 border-l border-white/10 p-6 overflow-y-auto z-50 transition-transform"
          >
            <div className="flex justify-between items-center mb-4">
              <BookOpenCheck size={24} className="text-green-400" />
              <h2
                id="calculator-help-title"
                className="text-2xl font-semibold text-white"
              >
                Quick Reference
              </h2>
              <button type="button"
                onClick={() => setSidebarOpen(false)}
                className="bg-red-900 hover:bg-red-700 text-white rounded-full transition"
                aria-label="Close Help"
              >
                <X size={28} />
              </button>
            </div>
            <DocumentationPanel />
          </div>
        </>
      )}
    </div>
  );
}

function EquationSolver() {
  const [equation, setEquation] = useState("");
  const [solution, setSolution] = useState("");
  const [isSolving, setIsSolving] = useState(false);

  const solveEquationHandler = async (equation: string) => {
    try {
      const math = await getMath();
      const { evaluate } = math;

      const expression = equation
        .trim()
        .replace(/(\d+)!/g, (_, n) => `factorial(${n})`);

      // Percentage calculations

      // 20% of 150
      const percentOf = expression.match(
        /^(\d+(?:\.\d+)?)%\s+of\s+(\d+(?:\.\d+)?)$/i
      );

      if (percentOf) {
        const percent = Number(percentOf[1]);
        const value = Number(percentOf[2]);

        return String((percent / 100) * value);
      }

      // 150 + 20%
      const addPercent = expression.match(
        /^(\d+(?:\.\d+)?)\s*\+\s*(\d+(?:\.\d+)?)%$/i
      );

      if (addPercent) {
        const value = Number(addPercent[1]);
        const percent = Number(addPercent[2]);

        return String(value + value * percent / 100);
      }

      // 150 - 20%
      const subtractPercent = expression.match(
        /^(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)%$/i
      );

      if (subtractPercent) {
        const value = Number(subtractPercent[1]);
        const percent = Number(subtractPercent[2]);

        return String(value - value * percent / 100);
      }

      // 25 is what % of 80
      const percentOfValue = expression.match(
        /^(\d+(?:\.\d+)?)\s+is\s+what\s+%\s+of\s+(\d+(?:\.\d+)?)$/i
      );

      if (percentOfValue) {
        const part = Number(percentOfValue[1]);
        const whole = Number(percentOfValue[2]);

        if (whole === 0) {
          return "Cannot divide by zero";
        }

        return `${((part / whole) * 100).toFixed(2)}%`;
      }
      //Percentage calculations end here

      const result = evaluate(expression);

      if (result === undefined || result === null) {
        return "";
      }

      if (typeof result === "object") {
        if ("toString" in result) {
          return result.toString();
        }

        return JSON.stringify(result, null, 2);
      }

      return String(result);
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        }

        return "Unknown error";
    }
  };

  const handleSolve = async () => {
    if (isSolving) return;

    setIsSolving(true);

    try {
      setSolution(await solveEquationHandler(equation));
    } finally {
      setIsSolving(false);
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
        type="button"
        disabled={isSolving}
        onClick={() => void handleSolve()}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            void handleSolve();
          }
        }}
        className="full-screen-button"
      >
        {isSolving ? "Solving..." : "Solve"}
      </button>
    </div>
  );
}

function DocumentationPanel() {
  return (
    <div className="space-y-3 text-sm text-white">
      <p><b>Basics:</b> <code>12+8/2</code> → 16</p>
      <p><b>Percentage:</b> <code>20% of 150</code> → 30</p>
      <p><b>Increase:</b> <code>150 + 20%</code> → 180</p>
      <p><b>Decrease:</b> <code>150 - 20%</code> → 120</p>
      <p><b>Find Percentage:</b> <code>25 is what % of 80</code> → 31.25%</p>
      <p><b>Algebra:</b> <code>simplify(2x+3x)</code> → 5x</p>
      <p><b>Trigonometry:</b> <code>sin(pi/4)</code> → 0.707</p>
      <p><b>Logarithms:</b> <code>log(1000)</code> → 6.907755</p>
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