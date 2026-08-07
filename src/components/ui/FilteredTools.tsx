"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ToolCard from "@/components/ui/toolCard";
import { getCachedTools } from "@/data/tools";

export function FilteredTools({
  filterKey,
  filteredTools,
}: any) {
  const [resolvedFilterKey, setResolvedFilterKey] = useState((filterKey ?? "all").toLowerCase());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const categoryId = params.get("categoryId") ?? params.get("categoryid");
    const normalizedCategory = (categoryId?.trim().toLowerCase() || "all");
    setResolvedFilterKey(normalizedCategory);
  }, [filterKey]);

  const visibleTools = useMemo(() => {
    if (!!filteredTools) {
      return filteredTools.filter((tool: any) => tool.archived === false);
    }

    const allTools = getCachedTools();
    if (resolvedFilterKey === "all") {
      return allTools.filter((tool: any) => tool.archived === false);
    }

    const searchKey = resolvedFilterKey?.toLowerCase();
    const filteredKeys = allTools
      .filter(
        (tool) =>
          tool.id.toLowerCase().startsWith(searchKey) ||
          tool.category?.toLowerCase().startsWith(searchKey)
      )
      .map((tool) => tool.id);

    return allTools.filter((tool) => tool.archived === false && filteredKeys.includes(tool.id));
  }, [filteredTools, resolvedFilterKey]);

  return (
    <div className="tool-grid">
      {visibleTools.map((tool: any) => (
        <Link
          key={tool.id}
          href={`/tools/${tool.id}`}
          className="card-surface p-4"
          aria-label={tool.title}
        >
          <div>
            <ToolCard
              label={tool.toolShortName}
              icon={tool.icon}
              description={tool.description}
            />
            <h2
              className="text-white text-sm font-semibold mt-4 overflow-hidden"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
              }}
              title={tool.title}
            >
              {tool.title}
            </h2>
          </div>
          <div className="card-footer">
            {tool.comingSoon ? "Preview →" : "Open →"}
          </div>
        </Link>
      ))}
    </div>
  );
}
