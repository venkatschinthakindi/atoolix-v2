import { FilteredTools } from "@/components/ui/FilteredTools";
import BackButton from "@/components/ui/backButton";
import ToolsHubClient from "@/app/tools/ToolsHubClient";
import { FloatingDock } from "@/components/layout/floatingDock";

export function FilterToolHubPage({ filterKey, showCategoryBar}: {
  filterKey: string,
  showCategoryBar?: boolean
}) {
  return (
    <>
      <div className="app-container page-section">
        <FloatingDock />
        
        <div className="section-header text-center">
          <h2 className="section-title">{filterKey.toPascalCase()} Tools</h2>
          <h1 className="section-copy mb-2">
            Explore all {filterKey.toLowerCase()} utilities available on this site.
          </h1>
        </div>
        <div className="section-header pb-8">
          <BackButton />
        </div>
        {!!showCategoryBar && <ToolsHubClient filterKey={filterKey}/>}
        <FilteredTools filterKey={filterKey}/>
      </div>
    </>
  );
}