// "use client";

// import { tools } from "@/data/tools";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";

// export function FeaturedTools() {
//   const router = useRouter();

//   const featured = tools[0];
//   const others = tools.slice(1, 10);

//   return (
//     <section className="w-full px-6 py-16 relative">
//       {/* Background glow */}
//       <div />

//       <div className="relative max-w-6xl mx-auto space-y-10">
//         {/* Header */}
//         <div className="space-y-2">
//           <h2 className="text-3xl font-semibold text-white">
//             Featured Tools
//           </h2>
//           <p className="text-zinc-400 text-sm">
//             Powerful utilities designed to speed up your workflow
//           </p>
//         </div>

//         {/* Featured Card */}
//         <motion.div
//           whileHover={{ scale: 1.01 }}
//           onClick={() => router.push(`/tools/${featured.id}`)}
//           className="cursor-pointer rounded-2xl p-8 relative overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-900 to-indigo-950 shadow-2xl"
//         >
//           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,_#7c3aed,_transparent_40%)]" />

//           <div className="relative z-10">
//             <div className="flex items-center gap-2">
//             <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs text-violet-300">
//                 Most Used
//             </span>

//             <span className="text-xs text-white/40">
//                 12k monthly users
//             </span>
//             </div>
//             <h3 className="text-2xl font-semibold text-white mt-1">
//               {featured.title}
//             </h3>
//             <p className="text-zinc-400 mt-2 max-w-xl">
//               {featured.description}
//             </p>

//             <div className="mt-6 inline-flex items-center gap-2 text-sm text-white/80">
//               <span className="px-3 py-1 rounded-full bg-white/10">
//                 Open Tool →
//               </span>
//             </div>
//            <div className="absolute top-4 right-4">
//             <a
//               href="/tools"
//               className="px-3 py-1 text-xs bg-white/10 rounded-full hover:bg-white/20 text-white/80"
//             >
//               View All
//             </a>
//           </div>
//           </div>
//         </motion.div>
// {/* Horizontal scroll only for cards */}
// <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
//   {others.map((tool) => {
//     const Icon = tool.icon;

//     return (
//       <motion.div
//         key={tool.id}
//         whileHover={{ y: -4 }}
//         onClick={() => router.push(`/tools/${tool.id}`)}
//         className="min-w-[260px] flex-shrink-0 rounded-2xl p-5 bg-white/5 border border-white/10"
//       >
//         <div className="mb-4">
//           <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
//             <Icon className="w-6 h-6 text-indigo-400" />
//           </div>
//         </div>

//         <h4 className="text-white font-medium">{tool.title}</h4>
//         <p className="text-xs text-zinc-400 mt-2 line-clamp-2">
//           {tool.description}
//         </p>
//       </motion.div>
//     );
//   })}
// </div>
//       </div>
//     </section>
//   );
// }


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
    <section className="w-full px-4 sm:px-6 py-16">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-white">
              Featured Tools
            </h2>
            <p className="text-zinc-400 text-sm mt-1">
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
          className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-indigo-950 p-8 shadow-2xl"
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

            <div className="mt-6 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm text-white/90 transition group-hover:bg-white/15">
              Open Tool →
            </div>
          </div>
        </motion.div>

        {/* Carousel Section */}
        <div className="relative">
          {/* Cards */}
          <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
            {others.map((tool) => {
              const Icon = tool.icon;

              return (
                <motion.div
                  key={tool.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => router.push(`/tools/${tool.id}`)}
                  className="min-w-[260px] flex-shrink-0 cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]"
                >
                  <div className="mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10">
                      <Icon className="h-6 w-6 text-indigo-400" />
                    </div>
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
              className="min-w-[150px] inline-flex items-center gap-2 text-indigo-400">
              View All →
            </Link>
        </div>
          </div>

          {/* Right Fade */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#09090b] to-transparent" />
        </div>
      </div>
    </section>
  );
}