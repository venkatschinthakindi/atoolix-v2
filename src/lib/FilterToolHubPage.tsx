import { FloatingDock } from "@/components/layout/floating-dock";
import { FilteredTools } from "@/components/ui/FilteredTools";
import BackButton from "@/components/ui/back-button";

export function FilterToolHubPage({ filterKey }: any) {
  return (
    <>
    <div className="app-shell">
      <div className="app-container page-section">
        <div className="mb-12">
          <FloatingDock />
        </div>
        <div className="section-header">
          <BackButton />
        </div>
        <div className="section-header text-center">
          <h1 className="section-title">All {filterKey.toPascalCase()} Tools</h1>
          <p className="section-copy mb-2">
            Explore all {filterKey.toLowerCase()} utilities available on this site.
          </p>
        </div>
        <FilteredTools filterKey={filterKey}/>
      </div>
    </div>
    </>
  );
}