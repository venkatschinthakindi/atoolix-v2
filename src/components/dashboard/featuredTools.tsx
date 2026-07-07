import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ToolCard } from "@/components/ui/toolCard";
import { getCachedTools } from "@/data/tools";

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
    <section className="page-section px-10" >
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="section-title">
              Featured Tools
            </h2>
            <p className="section-copy">
              Powerful utilities designed to speed up your workflow
            </p>
          </div>

          <Link
            href="/tools"
            className="hidden sm:inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition"
          >
            View All →
          </Link>
        </div>

        {/* Featured Tool */}
        <div
          onClick={() => router.push(`/tools/${featured.id}`)}
          className="surface-card-light group relative cursor-pointer overflow-hidden"
        >
          {/* Glow */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,_#7c3aed,_transparent_40%)]" />


          <div className="relative z-10">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs text-violet-300">
                Most Used
              </span>
            </div>
            <div className="absolute right-0 top-0">
              {/* View All inside card */}
              <Link
                href="/tools"
                onClick={(e) => e.stopPropagation()}
                className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 hover:bg-white/20 transition"
              >
                View All
              </Link>
            </div>

            <h3 className="mt-3 text-2xl font-semibold text-white">
              {featured.title}
            </h3>

            <p className="mt-2 max-full text-sm text-zinc-400">
              {featured.description}
            </p>

            <div className="badge-pill inline-flex items-center">
              Open Tool →
            </div>
          </div>
        </div>

        {/* Carousel Section */}
            <div className="relative">
              {/* Cards */}
              <div
                  ref={scrollRef}
                  className="tool-scroll"
                >{canScrollLeft && (
                  <button
                      type="button"
                      title="View Less"
                      aria-label="View Less"
                    onClick={() => scroll("left")}
                    className="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-indigo-900/40 p-2 text-white backdrop-blur-md transition-all hover:bg-indigo-900/10"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                )}
                {others.map((tool) => {
                  return (
                    <div
                        key={tool.id}
                        onClick={() => router.push(`/tools/${tool.id}`)}
                        className="card-surface card-surface-sm w-[300px] transition-all duration-300 hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]"
                      >
                        <ToolCard label={tool.toolShortName} icon={tool.icon} description={tool.description}></ToolCard>
                        <p
                          className="mt-2 line-clamp-2 text-xs text-zinc-400"
                          title={tool.title}
                        >
                          {tool.title}
                        </p>
                      </div>
                  );
                })}
                <div>
                <Link
                  href="/tools"
                  className="min-w-[150px] inline-flex items-center text-sm gap-2 text-indigo-400">
                  View All →
                </Link>
            </div>
          </div>
          {canScrollRight && (
            <button
              type="button"
              title="View More"
              aria-label="View More"
              onClick={() => scroll("right")}
              className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-indigo-900/40 p-2 text-white backdrop-blur-md transition-all hover:bg-indigo-900/10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
          {/* Right Fade */}
          <div className="tool-scroll-fade" />
        </div>
        
      </div>
    </section>
  );
}