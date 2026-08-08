import dynamic from "next/dynamic";
import { FloatingButton } from "@/components/ui/floatingButton";
import BackButton from "@/components/ui/backButton";
import type { ToolRegistryEntry } from "@/data/tools";
import ToolRendererHost from "@/app/tools/[...toolId]/ToolRendererHost";

const FloatingDock = dynamic(
  () => import("@/components/layout/floatingDock").then((mod) => mod.FloatingDock),
  { loading: () => null }
);
const ToolSeoContent = dynamic(
  () => import("@/app/tools/[...toolId]/ToolSeoContent").then((mod) => mod.default),
  { loading: () => null }
);

const ToolHeaderFavorite = dynamic(
  () => import("@/components/favorites/toolHeaderFavorite").then((mod) => mod.ToolHeaderFavorite),
  { loading: () => null }
);


export default function ToolPageClientShell({
  tool,
  toolId,
  toolMeta,
  siteUrl,
}: {
  tool: ToolRegistryEntry;
  toolId: string;
  toolMeta: Omit<ToolRegistryEntry, "loader">;
  siteUrl: string;
}) {
  return (
    <>
      <div className="app-shell">
        <div className="app-container page-section">
          <div className="mb-12">
            <FloatingDock />
          </div>

          <FloatingButton children={<BackButton />} />
          <div className="mb-2 flex flex-col items-center space-y-4">
            <div className="inline-flex items-center justify-center gap-2">
              <h1 className="text-center max-w-4xl text-2xl font-extrabold tracking-wide text-white md:text-2xl">
                {tool.onPageTitle || tool.title}
              </h1>

              <FloatingButton
                className="fixed top-21 right-40 z-50 transition-all duration-300"
                children={<ToolHeaderFavorite tool={tool} />}
              />
            </div>
          </div>
          <p className="text-white/70 text-sm text-center max-w-3xl mx-auto leading-relaxed">
            {tool.description}
          </p>
          <ToolRendererHost toolId={toolId} toolMeta={toolMeta} />
          <ToolSeoContent toolId={toolId} />
        </div>
      </div>
    </>
  );
}
