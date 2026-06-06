"use client";

import Link from "next/link";
import { tools } from "@/data/tools";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function FeaturedTools() {
  const router = useRouter();

  const featured = tools[0];
  const others = tools.slice(1, 10);

  return (
    <section className="page-section px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-8">
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
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
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
{/* 
              <span className="text-xs text-white/40">
                12k monthly users
              </span> */}
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

            <p className="mt-2 max-w-xl text-zinc-400">
              {featured.description}
            </p>

            <div className="badge-pill inline-flex items-center">
              Open Tool →
            </div>
          </div>
        </motion.div>

        {/* Carousel Section */}
        <div className="relative">
          {/* Cards */}
          <div className="tool-scroll">
            {others.map((tool) => {
              const Icon = tool.icon;

              return (
                <motion.div
                  key={tool.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => router.push(`/tools/${tool.id}`)}
                  className="card-surface card-surface-sm transition-all duration-300 hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10">
                      <Icon className="h-6 w-6 text-indigo-400" />
                    </div>
                    
                    {tool.comingSoon && (
                      <span className="rounded-full bg-yellow-500/15 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-yellow-300">
                        Coming Soon
                      </span>
                    )}
                    {!tool.comingSoon && (
                      <span className="rounded-full bg-violet-500/15 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-violet-300">
                        {tool.category}
                      </span>
                    )}
                    
                  </div>
                  
                  <h4 className="font-medium text-white">
                    {tool.title}
                  </h4>

                  <p className="mt-2 line-clamp-2 text-xs text-zinc-400">
                    {tool.description}
                  </p>
                </motion.div>
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

          {/* Right Fade */}
          <div className="tool-scroll-fade" />
        </div>
      </div>
    </section>
  );
}