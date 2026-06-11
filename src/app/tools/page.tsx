"use client";

import { categoryIcons, tools } from "@/data/tools";
import React, { useState, useMemo, Suspense } from "react";
import { FloatingDock } from "@/components/layout/floating-dock";
import { FileText } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilteredTools } from "@/components/ui/FilteredTools";

export default function ToolsHub() {
    return (
    <Suspense fallback={<div>Loading...</div>}>
      <ToolsContent />
    </Suspense>
  )
}

export function ToolsContent() {
  const router = useRouter();
    const searchParams = useSearchParams();
    const toolId = searchParams?.get("categoryId")?.toString()?.toLowerCase() || ""; // Get toolId from URL params

    const categories = [{
    id: "All",
    title: "All",
    description: "Browse all available tools",
    icon: React.createElement(FileText, { className: "w-4 h-4 text-indigo-400" })
  }, ...Object.values(categoryIcons)];

  // Find the tool from the data
  const category = Object.values(categoryIcons).find(t => t.id.toLowerCase() === toolId);
  const [activeCategory, setActiveCategory] = useState(category?.id.toLowerCase() || "all");

  // Filter tools based on category
  const filteredTools = useMemo(() => {
    return activeCategory.toLowerCase() === "all"
      ? tools
      : tools.filter(t => t.category.toLowerCase() === activeCategory);
  }, [activeCategory]);

  return (
    <div className="app-shell">
      <div className="app-container page-section">
        <div className="mb-12">
          <FloatingDock />
        </div>

        <div className="section-header text-center">
          <h1 className="section-title">All Tools</h1>
          <p className="section-copy mb-2">
            Explore all AI-powered utilities available on this site.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id.toLowerCase())}
              className={`rounded-full text-sm transition border border-white/10 px-4 py-2 ${
                activeCategory === cat.id.toLowerCase()
                  ? "bg-white text-black"
                  : "button-ghost"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <FilteredTools filteredTools={filteredTools}/>
      </div>
    </div>
  );
}