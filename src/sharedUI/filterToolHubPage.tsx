import { FilteredTools } from "@/components/ui/FilteredTools";
import { FloatingDock } from "@/components/layout/floatingDock";
import { FloatingButton } from "@/components/ui/floatingButton";
import BackButton from "@/components/ui/backButton";

export function FilterToolHubPage({
  filterKey,
  showCategoryBar,
  title,
}: {
  filterKey: string;
  showCategoryBar?: boolean;
  title?: string;
}) {
  const heading = title || `Explore all ${filterKey.toPascalCase()} utilities available on this site.`;

  return (
    <>
      <div className="app-container page-section">
        <FloatingDock />

        <div className="section-header text-center">
          <h1 className="section-title">{heading}</h1>
          <p className="section-copy mb-2">
            Browse {filterKey.toPascalCase()} tools by task and open the dedicated tool page for detailed guidance and processing options.
          </p>
        </div>
        <div className="section-header pb-8">
          <FloatingButton children={<BackButton />} />
        </div>
        {/* Category filtering remains client-side; the linked tool cards are real crawlable URLs. */}
        <FilteredTools filterKey={filterKey} />
      </div>
    </>
  );
}
