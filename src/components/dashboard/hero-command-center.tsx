"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export function HeroCommandCenter() {
  const router = useRouter();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mx-auto flex max-w-6xl flex-col items-center pt-36 text-center"
    >
      <span className="glass mb-6 px-4 py-2 text-sm text-white/70 font-mono text-xs">
        100+ Productivity Tools
      </span>

      <h1 className=" gradient-text max-w-4xl text-5xl md:text-7xl font-bold tracking-tight leading-[0.95]">
        Find the perfect tool  <br />
        for every task
      </h1>

      <p className="mt-6 max-w-xl text-lg text-white/60">
        All your calculators, PDF tools, AI utilities and developer tools in one place.
      </p>

      <div className="mt-10 w-full max-w-2xl">
        <div className="glass flex items-center gap-3 px-6 py-5">
        <Search className="w-5 h-5 text-white/40 search-box" />

        <input
          placeholder="Search calculators, PDF tools, AI utilities..."
          className="w-full bg-transparent text-white outline-none"
        />
      </div>
      </div>
    <div className="mt-8 flex gap-4">
  <button
    className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-500 transition">
    Explore Tools
  </button>

  <button className="rounded-xl border border-white/10 px-6 py-3 text-white/80 hover:bg-white/5 transition">
    Browse Categories
  </button>
</div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {["Calculator", "PDF", "Finance", "AI", "Image", "Developer"].map(
          (item) => (
            <div
              key={item}
              className="glass px-4 py-2 text-sm text-white/70"
              onClick={() => router.push(`/tools/${item}`)}
            >
              {item}
            </div>
          )
        )}
      </div>
    </motion.section>
  );
}