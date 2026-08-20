import { FilteredTools } from "@/components/ui/FilteredTools";
import ToolsHubClient from "@/app/tools/ToolsHubClient";
import { FloatingDock } from "@/components/layout/floatingDock";
import { FloatingButton } from "@/components/ui/floatingButton";
import BackButton from "@/components/ui/backButton";

export function FilterToolHubPage({ filterKey, showCategoryBar, title}: {
  filterKey: string,
  showCategoryBar?: boolean,
  title?: string
}) {
  return (
    <>
      <div className="app-container page-section">
        <FloatingDock />
        
        <div className="section-header text-center">
          <h2 className="section-title">{filterKey.toPascalCase()} Tools</h2>
          <h1 className="section-copy mb-2">
            {title || `Explore all ${filterKey.toPascalCase()} utilities available on this site.`}
          </h1>
        </div>
        <div className="section-header pb-8">
          <FloatingButton children={<BackButton />}/>
        </div>
        {/* {!!showCategoryBar && <ToolsHubClient filterKey={filterKey}/>} */}
        <FilteredTools filterKey={filterKey}/>
      </div>
    </>
  );
}