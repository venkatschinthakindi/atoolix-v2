"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpenCheck, HelpCircle, X } from "lucide-react";


export function AdvancedEquationSolverPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

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
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />

          <div
            ref={sidebarRef}
            className="app-shell fixed top-0 right-0 w-96 h-full bg-black/90 border-l border-white/10 p-6 overflow-y-auto z-50 transition-transform"
          >
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
        </>
      )}
    </div>
  );
}

function EquationSolver() {
  const [equation, setEquation] = useState("");
  const [solution, setSolution] = useState("");

  const solveEquationHandler = async (eq: string) => {
    try {
    const {
        evaluate,simplify,derivative,det, inv,eigs,complex,unit,mean, median,mode,variance,std,combinations,permutations,
        log,exp,pow,abs,round,sqrt,gcd,lcm,fraction } = await import("mathjs");

      let expr = eq.replace(/(\d+)!/g, (_, n) => `factorial(${n})`);
      expr = expr.replace(/\b0+(\d+)/g, "$1");

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
        onClick={async () => setSolution(await solveEquationHandler(equation))}
        className="full-screen-button"
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