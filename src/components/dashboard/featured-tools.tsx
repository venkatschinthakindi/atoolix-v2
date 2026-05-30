"use client";

import { tools } from "@/data/tools";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export function FeaturedTools() {
  const router = useRouter();

  //   const groupedTools = tools.reduce((acc, tool) => {
  //   if (!tool.featured) return acc;

  //   if (!acc[tool.category]) {
  //     acc[tool.category] = [];
  //   }

  //   acc[tool.category].push(tool);
  //   return acc;
  // }, {} as Record<string, typeof tools>);
  const groupedTools = useMemo(() => {
    return tools.reduce(
      (acc, tool) => {
        if (!tool.featured) return acc;

        if (!acc[tool.category]) acc[tool.category] = [];
        acc[tool.category].push(tool);

        return acc;
      },
      {} as Record<string, typeof tools>,
    );
  }, []);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  function renderPreview(toolId: string) {
    switch (toolId) {
      case "calculator":
        return (
          <div className="mt-4 text-white/60 text-xs bg-white/5 p-3 rounded-xl">
            24 × 18 = <span className="text-white">432</span>
          </div>
        );

      case "ai-writer":
        return (
          <div className="mt-4 text-white/60 text-xs bg-white/5 p-3 rounded-xl">
            “Generate SEO optimized blog content...”
          </div>
        );

      case "pdf":
        return (
          <div className="mt-4 flex gap-2">
            <div className="w-8 h-10 bg-white/10 rounded" />
            <div className="w-8 h-10 bg-white/10 rounded" />
            <div className="w-8 h-10 bg-white/10 rounded" />
          </div>
        );

      case "finance":
        return (
          <div className="mt-4 h-10 bg-white/5 rounded-xl flex items-end gap-1 p-2">
            <div className="w-1 h-3 bg-white/30" />
            <div className="w-1 h-5 bg-white/40" />
            <div className="w-1 h-7 bg-white/60" />
            <div className="w-1 h-4 bg-white/30" />
          </div>
        );

      case "image":
        return (
          <div className="mt-4 grid grid-cols-3 gap-1">
            <div className="h-6 bg-white/10 rounded" />
            <div className="h-6 bg-white/10 rounded" />
            <div className="h-6 bg-white/10 rounded" />
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <section className="mt-24">
      <div className="app-container">
        <h2 className="heading-lg text-white mb-8">Featured Tools</h2>

        <div
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {Object.entries(groupedTools).map(([category, categoryTools]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="mb-14">
                {/* Category Header */}
                <div className="mb-6">
                  <h3 className="text-white text-xl font-semibold">
                    {category}
                  </h3>
                  <p className="text-white/40 text-sm">
                    Explore {category.toLowerCase()} tools
                  </p>
                </div>

                {/* Category Grid (still masonry) */}
                <div
                  className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                  {categoryTools.map((tool, i) => {
                    const Icon = tool.icon;
                    const heightVariant = i % 3;

                    return (
                      <motion.div
                        key={`${category}-${tool.id}`}
                        onClick={() => router.push(`/tools/${tool.id}`)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{
                          y: -10,
                          scale: 1.04,
                          zIndex: 20,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 18,
                        }}
                        onMouseMove={(e) => {
                          const rect = (
                            e.currentTarget as HTMLElement
                          ).getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;

                          (e.currentTarget as HTMLElement).style.setProperty(
                            "--x",
                            `${x}px`,
                          );
                          (e.currentTarget as HTMLElement).style.setProperty(
                            "--y",
                            `${y}px`,
                          );
                        }}
                        className={`
              relative
              break-inside-avoid
              mb-6
              glass transition-all duration-300
              p-6
              cursor-pointer
              group
              overflow-hidden
              transition-all
              ${heightVariant === 0 ? "h-[180px]" : ""}
              ${heightVariant === 1 ? "h-[220px]" : ""}
              ${heightVariant === 2 ? "h-[260px]" : ""}
            `}
                      >
                        {/* Spotlight */}
                        <div className="spotlight" />

                        {/* Header */}
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-2xl bg-white/5">
                            <Icon className="text-white" />
                          </div>

                          <h3 className="text-white font-semibold">
                            {tool.title}
                          </h3>
                        </div>

                        {/* Description + Preview */}
                        <div className="mt-3 space-y-2">
                          <p className="text-white/60 text-sm">
                            {tool.description}
                          </p>

                          {renderPreview(tool.id)}
                        </div>

                        {/* CTA */}
                        <div className="mt-6 text-white/40 text-sm group-hover:text-white transition">
                          Open →
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
