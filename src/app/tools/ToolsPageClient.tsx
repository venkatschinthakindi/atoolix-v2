
"use client";

import { FilterToolHubPage } from "@/sharedUI/filterToolHubPage";
import { useSearchParams } from "next/navigation";

export function ToolsPageClient() {
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId")?? "all";

  // existing UI
  return (
    <FilterToolHubPage filterKey={categoryId} showCategoryBar={true} />
  );
}