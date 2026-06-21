"use client";

import { categoryIcons, getCachedTools } from "@/data/tools";
import React, { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilteredTools } from "@/components/ui/filteredTools";
import FloatingDockLoader from "@/components/layout/floatingDockLoader";

export default function ToolsHubClient() {
    const tools = getCachedTools();
    const searchParams = useSearchParams();
    const toolId = searchParams?.get("categoryid")?.toString()?.toLowerCase() || ""; // Get toolId from URL params
    
    const router = useRouter();
        const categories = [{
        id: "All",
        title: "All",
        description: "Browse all available tools",
        icon: 'FileText'
    }, ...categoryIcons];

    // Find the tool from the data
    const category = categoryIcons.find(t => t.id.toLowerCase() === toolId?.toLowerCase());
    const [activeCategory, setActiveCategory] = useState(category?.id?.toLowerCase() || "all");
    // const router = useRouter();

    useEffect(() => {
    const filteredURL = `/tools?categoryid=${activeCategory.toLowerCase()}`;

    router.push(filteredURL,
        { scroll: false }
    );
    }, [activeCategory]);

    const filteredTools = useMemo(() => {
    return activeCategory.toLowerCase() === "all"
        ? tools
        : tools.filter(
            t => t.id.toLowerCase() === activeCategory.toLowerCase()
        );
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
  );
}