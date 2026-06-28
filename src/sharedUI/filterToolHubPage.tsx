import { FilteredTools } from "@/components/ui/filteredTools";
import BackButton from "@/components/ui/backButton";
import FloatingDockLoader from "@/components/layout/floatingDockLoader";

export function FilterToolHubPage({ filterKey }: any) {
  return (
    <>
    <div>
      <div className="app-container page-section">
        <div className="mb-12">
          <>
          <FloatingDockLoader />
          </>
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