"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCachedTools } from "@/data/tools";
import { getCanonicalToolPath } from "@/utility/getTool";
import { QuickAccessSection } from "./quickAccessSection";
import { useFavoriteToolStore } from "@/stores/favoriteToolsStore";
import { useRecentToolStore } from "@/stores/recentToolsStore";

export function FeaturedTools() {
  const router = useRouter();
  const tools = getCachedTools();
  const featured = tools[0];

  return (
    <>
      <section className="page-section mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="section-title text-2xl">🔥 Popular this week</span>
              <p className="section-copy">Powerful utilities designed to speed up your workflow</p>
            </div>
            <Link href="/tools" className="hidden items-center gap-2 text-sm text-indigo-400 transition hover:text-indigo-300 sm:inline-flex">
              View All Tools →
            </Link>
          </div>

          {featured ? (
            <div
              onClick={() => router.push(getCanonicalToolPath(featured))}
              className="surface-card-light group relative cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#7c3aed,_transparent_40%)] opacity-20" />
              <div className="relative z-10">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs text-violet-300">Most Used</span>
                </div>
                <div className="absolute right-0 top-0">
                  <Link href="/tools" onClick={(e) => e.stopPropagation()} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 transition hover:bg-white/20">
                    View All Tools
                  </Link>
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-white">{featured.title}</h3>
                <p className="mt-2 max-full text-sm text-zinc-400">{featured.description}</p>
                <div className="badge-pill inline-flex items-center">Try Tool →</div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
      <QuickAccessSection
        groups={[
          {
            title: "⭐ Favorites",
            items: useFavoriteToolStore((s) => s.items),
            viewAllHref: "/favorites",
            emptyText: "Save your favorite tools for quick access.",
          },
          {
            title: "🕒 Recently Used",
            items: useRecentToolStore((s) => s.items),
            viewAllHref: "/history",
            emptyText: "Recently used tools will appear here.",
          },
        ]}
      />
    </>
  );
}
