"use client";

import { categoryIcons } from "@/data/tools";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function ToolsHubClient({ filterKey}: {
  filterKey: string
}) {
  const router = useRouter();

  const categories = useMemo(() => [
    {
      id: "all",
      title: "All",
      description: "Discover Powerful Online Tools",
      icon: 'FileText'
    },
    ...categoryIcons.map(cat => ({ ...cat, id: cat.id.toLowerCase() }))
  ], []);

  const [activeCategory, setActiveCategory] = useState((filterKey?.toLowerCase() || "all"));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const currentCategory = params.get("categoryId") ?? params.get("categoryid");
    const normalizedCategory = (currentCategory?.trim().toLowerCase() || "all");
    const isValid = categories.some((cat) => cat.id === normalizedCategory);
    setActiveCategory(isValid ? normalizedCategory : "all");
  }, [filterKey, categories]);

  const handleCategoryClick = (nextCategory: string) => {
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("categoryid", nextCategory);
    setActiveCategory(nextCategory);
    router.replace(nextUrl.pathname + nextUrl.search, { scroll: false });
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
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