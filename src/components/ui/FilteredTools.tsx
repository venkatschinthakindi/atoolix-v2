"use client";
import { useRouter } from "next/navigation";
import ToolCard from "@/components/ui/toolCard";
import { getCachedTools } from "@/data/tools";
export function FilteredTools({
  filterKey,
  filteredTools
}: any) {
    const router = useRouter();
    const tools = getCachedTools();
    if(!!filteredTools){
      filteredTools = filteredTools;
    }
    else {
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
                  {/* <div className="flex items-center gap-3">
                    <div className="card-icon">
                      <Icon className="text-white w-4 h-4" />
                    </div>
                    <span className="text-xs text-white/50">{tool.category}</span>
                    {tool.comingSoon && (
                      <span className="rounded-full bg-yellow-500/15 text-yellow-300 px-2 py-1 text-[10px] uppercase tracking-[0.2em]">
                        Coming Soon
                      </span>
                    )}
                  </div> */}
                  <ToolCard label={tool.toolShortName} icon={tool.icon} description={tool.description} ></ToolCard>
                  <h4 className="text-white text-sm font-semibold mt-4 overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                  }} title={tool.title} >{tool.title}</h4>

                  {/* <p className="text-white/50 text-xs mt-2 overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                  }}
                  title={tool.description}>
                    {tool.description}
                  </p> */}
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