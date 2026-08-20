
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ToolCard from "@/components/ui/toolCard";
import { getCachedTools } from "@/data/tools";

export function FilteredTools({ filterKey, filteredTools }: any) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Resolve base list exactly as before
  const baseTools = useMemo(() => {
    let tools;
    if (!!filteredTools) {
      tools = filteredTools.filter((tool: any) => tool.archived === false);
    } else if (filterKey === "all") {
      tools = getCachedTools().filter((tool: any) => tool.archived === false);
    } else {
      const searchKey = filterKey?.toLowerCase();
      const all = getCachedTools();
      const filteredKeys = all
        .filter(
          (tool) =>
            tool.id.toLowerCase().startsWith(searchKey) ||
            tool.category?.toLowerCase().startsWith(searchKey)
        )
        .map((tool) => tool.id);
      tools = all.filter(
        (tool) => tool.archived === false && filteredKeys.includes(tool.id)
      );
    }
    return tools;
  }, [filterKey, filteredTools]);

  // Top-level categories present in this list (e.g. "Finance"), in first-seen order.
  // This drives the chip filter row only.
  const categories = useMemo(() => {
    const seen: string[] = [];
    baseTools.forEach((t: any) => {
      const c = t.category || "Other";
      if (!seen.includes(c)) seen.push(c);
    });
    return seen;
  }, [baseTools]);

  // Apply the category chip + search box on top of the base list
  const visibleTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    return baseTools.filter((t: any) => {
      const matchesQuery =
        !q ||
        t.title?.toLowerCase().includes(q) ||
        t.toolShortName?.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q);
      const matchesCategory =
        activeCategory === "all" || (t.category || "Other") === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [baseTools, query, activeCategory]);

  // Sub-categories present among the currently visible tools (e.g. "EMI Calculators",
  // "Retirement Calculators", "Savings"), in first-seen order. Sections are grouped by this.
  const subCategories = useMemo(() => {
    const seen: string[] = [];
    visibleTools.forEach((t: any) => {
      const sc = t.subCategory || t.category || "General";
      if (!seen.includes(sc)) seen.push(sc);
    });
    return seen;
  }, [visibleTools]);

  // Group the visible tools by sub-category, preserving sub-category order
  const grouped = useMemo(() => {
    const map = new Map<string, any[]>();
    visibleTools.forEach((t: any) => {
      const sc = t.subCategory || t.category || "General";
      if (!map.has(sc)) map.set(sc, []);
      map.get(sc)!.push(t);
    });
    return subCategories
      .filter((sc) => map.has(sc))
      .map((sc) => ({ subCategory: sc, tools: map.get(sc)! }));
  }, [visibleTools, subCategories]);

  const showCategoryChips = categories.length > 1;

  return (
    <div className="tools-browser">
      {/* Search + top-level category filter */}
      <div className="tools-controls">
        <div className="tools-search">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path
              d="M21 21l-4.3-4.3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name..."
            aria-label="Search tools"
          />
        </div>

        {showCategoryChips && (
          <div className="tools-chips" role="tablist" aria-label="Filter by category">
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === "all"}
              className={`chip ${activeCategory === "all" ? "chip-active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              All
              <span className="chip-count">{baseTools.length}</span>
            </button>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={activeCategory === c}
                className={`chip ${activeCategory === c ? "chip-active" : ""}`}
                onClick={() => setActiveCategory(c)}
              >
                {c?.replace("_"," ")}
                <span className="chip-count">
                  {baseTools.filter((t: any) => (t.category || "Other") === c).length}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sections grouped by sub-category */}
      {grouped.length === 0 && (
        <div className="tools-empty">
          <p>No calculators match "{query}". Try a different search.</p>
        </div>
      )}

      {grouped.map(({ subCategory, tools }) => (
        <section
          key={subCategory}
          className="tools-section"
          aria-labelledby={`section-${subCategory}`}
        >
          <div className="tools-section-head">
            <h2 id={`section-${subCategory}`} className="tools-section-title">
              {subCategory?.replace("_"," ")}
            </h2>
            <span className="tools-section-count">
              {tools.length} tool{tools.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="tool-grid">
            {tools.map((tool: any) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.id}`}
                className="card-surface tool-card-v2"
                aria-label={tool.title}
                style={{ ["--accent" as any]: tool.accentColor || "#7c5cff" }}
              >
                <div className="tool-card-top">
                  <ToolCard label={tool.toolShortName} icon={tool.icon} description="" />
                  {tool.comingSoon && <span className="tool-badge">Coming soon</span>}
                </div>

                <h3 className="tool-card-title" title={tool.title}>
                  {tool.title}
                </h3>

                <p className="tool-card-desc">{tool.description}</p>

                <div className="tool-card-footer">
                  <span>{tool.comingSoon ? "Preview" : "Open"}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}