"use client";

import { categoryIcons } from "@/data/tools";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ToolsHubClient({ filterKey}: {
  filterKey: string
}) {
  const toolId = filterKey?.toLowerCase() || "all";
  
  console.warn(filterKey);

  const router = useRouter();

  const categories = [
    {
      id: "all",
      title: "All",
      description: "Discover Powerful Online Tools",
      icon: 'FileText'
    }, 
    ...categoryIcons.map(cat => ({ ...cat, id: cat.id.toLowerCase() }))
  ];
  console.warn(categories);
  // Find the category from URL params (search in categories, not just categoryIcons)
  const matchedCategory = categories.find(c => c.id === toolId);
  
  const [activeCategory, setActiveCategory] = useState(matchedCategory?.id?.toLowerCase() || "all");
  console.warn(matchedCategory);
  // Prevent infinite loop: only update URL when activeCategory changes from user click
  useEffect(() => {
    let filteredURL = `/tools?categoryid=all`;
    if (!!toolId && toolId !== activeCategory) {
      filteredURL = `/tools?categoryid=${activeCategory}`;
      router.push(filteredURL, { scroll: false });
    }
  }, [activeCategory]);

  return (
    <div>
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
    </div>
  );
}