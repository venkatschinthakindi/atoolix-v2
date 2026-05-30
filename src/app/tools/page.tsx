"use client";

import { tools } from "@/data/tools";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FloatingDock } from "@/components/layout/floating-dock";

export default function ToolsHub() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");

  // Collect unique categories
  const categories = useMemo(() => {
    const set = new Set(tools.map(t => t.category));
    return ["All", ...Array.from(set)];
  }, []);

  // Filter tools based on category
  const filteredTools = useMemo(() => {
    return activeCategory === "All"
      ? tools
      : tools.filter(t => t.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="app-container py-16 aurora-bg min-h-screen">
      <div className="mb-12">
        <FloatingDock />
      </div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white">All Tools</h1>
        <p className="text-zinc-400 mt-2">
          Explore all AI-powered utilities available on this site.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm transition
              border border-white/10
              ${activeCategory === cat
                ? "bg-white text-black"
                : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTools.map(tool => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              onClick={() => router.push(`/tools/${tool.id}`)}
              className="cursor-pointer rounded-2xl p-6 border border-white/10 bg-white/5 hover:bg-white/10 transition flex flex-col justify-between h-[220px]"
            >
              <div>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-white/10">
                    <Icon className="text-white" />
                  </div>
                  <span className="text-xs text-white/50">{tool.category}</span>
                </div>
                <h3 className="text-white font-semibold mt-4">{tool.title}</h3>
                <p className="text-white/50 text-sm mt-2">{tool.description}</p>
              </div>
              <div className="text-sm text-white/60 mt-2">Open →</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}