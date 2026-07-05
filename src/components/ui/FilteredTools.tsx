"use client";
import { useRouter } from "next/navigation";
import ToolCard from "@/components/ui/toolCard";
import { getCachedTools } from "@/data/tools";
export function FilteredTools({
  filterKey,
  filteredTools
}: any) {
    const router = useRouter();
    
    if(!!filteredTools){
      filteredTools = filteredTools;
    }
    else {
      const tools = getCachedTools();
      const toolsList = tools;
      const filteredKeys = toolsList.filter(toolId => 
        toolId.id.toLowerCase().startsWith(filterKey) ||
        toolId.category?.toLowerCase().startsWith(filterKey)
      ).map(toolId => toolId.id);
      filteredTools = tools.filter(t => filteredKeys.includes(t.id));
    }
    

    return (
    <div className="tool-grid">
          {filteredTools.map((tool:any) => {
            return (
              <div
                key={tool.id}
                onClick={() => router.push(`/tools/${tool.id}`)}
                className="card-surface p-4"
              >
                <div>
                  <ToolCard label={tool.toolShortName} icon={tool.icon} description={tool.description} ></ToolCard>
                  <h1 className="text-white text-sm font-semibold mt-4 overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                  }} title={tool.title} >{tool.title}</h1>
                </div>
                <div className="card-footer">
                  {tool.comingSoon ? "Preview →" : "Open →"}
                </div>
              </div>
            );
          })}
        </div>
  );
}