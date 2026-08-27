"use client";

import { categoryIcons } from "@/data/tools";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ToolsHubClient({ filterKey }: { filterKey: string }) {
  const toolId = filterKey?.toLowerCase() || "all";
  const router = useRouter();

  const categories = [
    {
      id: "all",
      title: "All",
      description: "Discover Powerful Online Tools",
      icon: "FileText",
    },
    ...categoryIcons.map((cat) => ({ ...cat, id: cat.id.toLowerCase() })),
  ];

  const matchedCategory = categories.find((c) => c.id === toolId);
  const [activeCategory, setActiveCategory] = useState(matchedCategory?.id?.toLowerCase() || "all");

  useEffect(() => {
    let filteredURL = `/tools?categoryid=all`;
    if (toolId && toolId !== activeCategory) {
      filteredURL = `/tools?categoryid=${activeCategory}`;
      router.push(filteredURL, { scroll: false });
    }
  }, [activeCategory, router, toolId]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`rounded-full border border-white/10 px-4 py-2 text-sm transition ${
              activeCategory === cat.id ? "bg-white text-black" : "button-ghost"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>
    </div>
  );
}
