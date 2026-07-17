import Link from "next/link";
import ToolCard from "@/components/ui/toolCard";
import { getCachedTools } from "@/data/tools";

export function FilteredTools({
  filterKey,
  filteredTools,
}: any) {
  if(!!filteredTools){
    filteredTools = filteredTools;
  }
  else if (filterKey === "all") {
    filteredTools = getCachedTools();
  }
  else {
    const searchKey = filterKey?.toLowerCase();
    const tools = getCachedTools();
    const filteredKeys = tools
      .filter(
        (tool) =>
          tool.id.toLowerCase().startsWith(searchKey) ||
          tool.category?.toLowerCase().startsWith(searchKey)
      )
      .map((tool) => tool.id);

    filteredTools = tools.filter((tool) => filteredKeys.includes(tool.id));
  }

  return (
    <div className="tool-grid">
      {filteredTools.map((tool: any) => (
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
