'use client';
import { useEffect, useState } from "react";
import "@/utility/pascalCase";
import { FilteredTools } from "@/components/ui/FilteredTools";
import ToolsHubClient from "@/app/tools/ToolsHubClient";
import { FloatingDock } from "@/components/layout/floatingDock";
import { FloatingButton } from "@/components/ui/floatingButton";
import BackButton from "@/components/ui/backButton";
import { usePathname } from "next/navigation";



export function FilterToolHubPage({ filterKey, showCategoryBar, title}: {
  filterKey?: string,
  showCategoryBar?: boolean,
  title?: string
}) {
  
  const [resolvedFilterKey, setResolvedFilterKey] = useState((filterKey ?? "all").toLowerCase());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryId = params.get("categoryId") ?? params.get("categoryid");
    
    const pathname = usePathname();
    const isToolsPage = pathname?.toLowerCase() === "/tools";
    filterKey = (categoryId?.trim().toLowerCase() ?? isToolsPage ? "all" : filterKey ?? "all").toLowerCase();
    setResolvedFilterKey(filterKey);
  }, [filterKey]);

  return (
    <>
      <div className="app-container page-section">
        <FloatingDock />
        
        <div className="section-header text-center">
          <h2 className="section-title">{resolvedFilterKey.toPascalCase()} Tools</h2>
          <h1 className="section-copy mb-2">
            {title || `Explore all ${resolvedFilterKey.toPascalCase()} utilities available on this site.`}
          </h1>
        </div>
        <div className="section-header pb-8">
          <FloatingButton children={<BackButton />}/>
        </div>
        {!!showCategoryBar && <ToolsHubClient filterKey={resolvedFilterKey}/>}
        <FilteredTools filterKey={resolvedFilterKey}/>
      </div>
    </>
  );
}