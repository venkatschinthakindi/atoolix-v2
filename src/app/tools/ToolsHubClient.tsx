"use client";

import { categoryIcons } from "@/data/tools";
import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ToolsHubClient({ filterKey}: {
  filterKey: string
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryid");

  const toolId = categoryId?.toLowerCase() || "all";

  const categories = useMemo(
    () => [
      {
        id: "all",
        title: "All",
        description: "Discover Powerful Online Tools",
        icon: "FileText",
      },
      ...categoryIcons.map((cat) => ({
        ...cat,
        id: cat.id.toLowerCase(),
      })),
    ],
    []
  );

  const matchedCategory = categories.find(
    (category) => category.id === toolId
  );

  const activeCategory = matchedCategory?.id || "all";

  const handleCategoryChange = (categoryId: string) => {
    const nextCategory = categoryId.toLowerCase();

    // Already selected
    if (nextCategory === activeCategory) {
      return;
    }

    // Default category
    if (nextCategory === "all") {
      router.push("/tools", {
        scroll: false,
      });
      return;
    }

    // Specific category
    router.push(
      `/tools?categoryid=${encodeURIComponent(nextCategory)}`,
      {
        scroll: false,
      }
    );
  };
  
  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
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