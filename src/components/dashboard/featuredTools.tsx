"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ToolCard } from "@/components/ui/toolCard";
import { getCachedTools } from "@/data/tools";
import { getCanonicalToolPath } from "@/utility/getTool";
import { QuickAccessSection } from "./quickAccessSection";
import { useFavoriteToolStore } from "@/stores/favoriteToolsStore";
import { useRecentToolStore } from "@/stores/recentToolsStore";

export function FeaturedTools() {
  const router = useRouter();

  const scrollRef = useRef<HTMLDivElement>(null);

const [canScrollLeft, setCanScrollLeft] = useState(false);
const [canScrollRight, setCanScrollRight] = useState(true);

const scroll = (direction: "left" | "right") => {
  const el = scrollRef.current;
  if (!el) return;

  el.scrollBy({
    left: direction === "left" ? -350 : 350,
    behavior: "smooth",
  });
};

useEffect(() => {
  const updateButtons = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(
      el.scrollLeft < el.scrollWidth - el.clientWidth - 5
    );
  };

  updateButtons();

  const el = scrollRef.current;
  if (!el) return;

  el.addEventListener("scroll", updateButtons);
  window.addEventListener("resize", updateButtons);

  return () => {
    el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, []);

  const tools = getCachedTools();
  const featured = tools[0];
  const others = tools.slice(1, 10);

  return (
    <>
    <section className="page-section px-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" >
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="section-title text-2xl">
              🔥 Popular this week
            </span>
            <p className="section-copy">
              Powerful utilities designed to speed up your workflow
            </p>
          </div>

          <Link
            href="/tools"
            className="hidden sm:inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition"
          >
            View All Tools →
          </Link>
        </div>

        <div
          onClick={() => router.push(getCanonicalToolPath(featured))}
          className="surface-card-light group relative cursor-pointer overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,_#7c3aed,_transparent_40%)]" />


          <div className="relative z-10">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs text-violet-300">
                Most Used
              </span>
            </div>
            <div className="absolute right-0 top-0">
              <Link
                href="/tools"
                onClick={(e) => e.stopPropagation()}
                className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 hover:bg-white/20 transition"
              >
                View All Tools
              </Link>
            </div>

            <h3 className="mt-3 text-2xl font-semibold text-white">
              {featured.title}
            </h3>

            <p className="mt-2 max-full text-sm text-zinc-400">
              {featured.description}
            </p>

            <div className="badge-pill inline-flex items-center">
              Try Tool →
            </div>
          </div>
        </div>
      </div>
    </section>
    <QuickAccessSection
        groups={[
          {
            title: '⭐ Favorites',
            items: useFavoriteToolStore((s) => s.items),
            viewAllHref: '/favorites',
            emptyText: 'Save your favorite tools for quick access.',
          },
          {
            title: '🕒 Recently Used',
            items: useRecentToolStore((s) => s.items),
            viewAllHref: '/history',
            emptyText: 'Recently used tools will appear here.',
          },
        ]}
      />
    </>
  );
}
