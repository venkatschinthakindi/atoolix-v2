import { FilteredTools } from "@/components/ui/FilteredTools";
import { FloatingDock } from "@/components/layout/floatingDock";
import { FloatingButton } from "@/components/ui/floatingButton";
import BackButton from "@/components/ui/backButton";

const toPascalCase = (value: string) => value.replace(/(^|[-_\s]+)(\w)/g, (_, __, char: string) => char.toUpperCase());

export function FilterToolHubPage({ filterKey, title }: { filterKey: string; showCategoryBar?: boolean; title?: string }) {
  const filterLabel = toPascalCase(filterKey);
  const heading = title || `Explore all ${filterLabel} utilities available on this site.`;

  return (
    <>
      <div className="app-container page-section">
        <FloatingDock />
        <div className="section-header text-center">
          <h1 className="section-title">{heading}</h1>
          <p className="section-copy mb-2">Browse {filterLabel} tools by task and open the dedicated tool page for detailed guidance and processing options.</p>
        </div>
        <div className="section-header pb-8"><FloatingButton children={<BackButton />} /></div>
        <FilteredTools filterKey={filterKey} />
      </div>
    </>
  );
}
