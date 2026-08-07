"use client";

import { categoryIcons } from "@/data/tools";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ToolsHubClient({ filterKey}: {
  filterKey: string
}) {
  const router = useRouter();
  const toolId = filterKey?.toLowerCase() || "all";

  const categories = [
    {
      id: "all",
      title: "All",
      description: "Discover Powerful Online Tools",
      icon: 'FileText'
    }, 
    ...categoryIcons.map(cat => ({ ...cat, id: cat.id.toLowerCase() }))
  ];
  const matchedCategory = categories.find(c => c.id === toolId);
  const [activeCategory, setActiveCategory] = useState(matchedCategory?.id?.toLowerCase() || "all");

  useEffect(() => {
    const nextCategory = matchedCategory?.id?.toLowerCase() || "all";
    setActiveCategory(nextCategory);
  }, [toolId]);

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const currentCategory = currentUrl.searchParams.get("categoryId") ?? currentUrl.searchParams.get("categoryid");
    const normalizedCurrent = (currentCategory?.trim().toLowerCase() || "all");

    if (normalizedCurrent !== activeCategory) {
      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.set("categoryid", activeCategory);
      router.replace(nextUrl.pathname + nextUrl.search, { scroll: false });
    }
  }, [activeCategory, router]);

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