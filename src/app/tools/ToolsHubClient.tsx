"use client";

import { categoryIcons, getCachedTools } from "@/data/tools";
import React, { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilteredTools } from "@/components/ui/filteredTools";
import FloatingDockLoader from "@/components/layout/floatingDockLoader";

export default function ToolsHubClient() {
  const tools = getCachedTools();
  const searchParams = useSearchParams();
  const toolId = searchParams?.get("categoryid")?.toString()?.toLowerCase() || "";

  const router = useRouter();

  const categories = [
    {
      id: "all",
      title: "All",
      description: "Browse all available tools",
      icon: 'FileText'
    }, 
    ...categoryIcons.map(cat => ({ ...cat, id: cat.id.toLowerCase() }))
  ];

  // Find the category from URL params (search in categories, not just categoryIcons)
  const matchedCategory = categories.find(c => c.id === toolId);
  
  const [activeCategory, setActiveCategory] = useState(matchedCategory?.id || "all");

  // Prevent infinite loop: only update URL when activeCategory changes from user click
  useEffect(() => {
    if (!searchParams?.get("categoryid")) {
      const filteredURL = `/tools?categoryid=${activeCategory}`;
      router.push(filteredURL, { scroll: false });
    }
  }, [activeCategory, searchParams]);

  const filteredTools = useMemo(() => {
    return activeCategory === "all"
      ? tools
      : tools.filter(t => t.category?.toLowerCase() === activeCategory);
  }, [activeCategory, tools]);

  return (
    <div>
      <div className="mb-12">
        <FloatingDockLoader />
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`rounded-full text-sm transition border border-white/10 px-4 py-2 ${
              activeCategory === cat.id
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
  );
}