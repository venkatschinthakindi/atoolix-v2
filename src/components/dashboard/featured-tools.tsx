// "use client";

// import { tools } from "@/data/tools";
// import { motion } from "framer-motion";
// import { useMemo, useState } from "react";
// import { useRouter } from "next/navigation";

// export function FeaturedTools() {
//   const router = useRouter();
//   const [activeCategory, setActiveCategory] = useState("All");

//   const categories = useMemo(() => {
//     const set = new Set(tools.map(t => t.category));
//     return ["All", ...Array.from(set)];
//   }, []);

//   const filteredTools = useMemo(() => {
//     return activeCategory === "All"
//       ? tools.filter(t => t.featured)
//       : tools.filter(t => t.featured && t.category === activeCategory);
//   }, [activeCategory]);

//   return (
//     <section className="mt-24">
//       <div className="app-container">
        
//         {/* Header */}
//         <div className="mb-10">
//           <h2 className="heading-lg text-white">Featured Tools</h2>
//           <p className="text-white/40 mt-2">
//             Powerful tools to boost your productivity
//           </p>
//         </div>

//         {/* Filters (SaaS pattern) */}
//         <div className="flex flex-wrap gap-3 mb-10">
//           {categories.map(cat => (
//             <button
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
//               className={`
//                 px-4 py-2 rounded-full text-sm transition
//                 border border-white/10
//                 ${activeCategory === cat
//                   ? "bg-white text-black"
//                   : "text-white/70 hover:text-white hover:bg-white/5"}
//               `}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredTools.map((tool, i) => {
//             const Icon = tool.icon;

//             return (
//               <motion.div
//                 key={tool.id}
//                 onClick={() => router.push(`/tools/${tool.id}`)}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 whileHover={{ y: -6 }}
//                 transition={{ duration: 0.25 }}
//                 className="
//                   group cursor-pointer
//                   rounded-2xl p-6
//                   bg-white/5 border border-white/10
//                   hover:bg-white/10
//                   transition
//                   h-[220px]
//                   flex flex-col justify-between
//                 "
//               >
//                 {/* Top */}
//                 <div>
//                   <div className="flex items-center gap-3">
//                     <div className="p-3 rounded-xl bg-white/10">
//                       <Icon className="text-white" />
//                     </div>
//                     <span className="text-xs text-white/50">
//                       {tool.category}
//                     </span>
//                   </div>

//                   <h3 className="text-white font-semibold mt-4">
//                     {tool.title}
//                   </h3>

//                   <p className="text-white/50 text-sm mt-2">
//                     {tool.description}
//                   </p>
//                 </div>

//                 {/* CTA */}
//                 <div className="text-sm text-white/60 group-hover:text-white transition">
//                   Open →
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { tools } from "@/data/tools";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function FeaturedTools() {
  const router = useRouter();

  const featured = tools[0];
  const others = tools.slice(1, 6);

  return (
    <section className="w-full px-6 py-16 relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black opacity-80" />

      <div className="relative max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-white">
            Featured Tools
          </h2>
          <p className="text-zinc-400 text-sm">
            Powerful utilities designed to speed up your workflow
          </p>
        </div>

        {/* Featured Card */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          onClick={() => router.push(`/tools/${featured.id}`)}
          className="cursor-pointer rounded-2xl p-8 relative overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-900 to-black shadow-2xl"
        >
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,_#7c3aed,_transparent_40%)]" />

          <div className="relative z-10">
            <p className="text-sm text-violet-400">Most Used</p>
            <h3 className="text-2xl font-semibold text-white mt-1">
              {featured.title}
            </h3>
            <p className="text-zinc-400 mt-2 max-w-xl">
              {featured.description}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-sm text-white/80">
              <span className="px-3 py-1 rounded-full bg-white/10">
                Open Tool →
              </span>
            </div>
          </div>
        </motion.div>

        {/* Horizontal scroll tools */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {others.map((tool) => (
            <motion.div
              key={tool.id}
              whileHover={{ y: -4 }}
              onClick={() => router.push(`/tools/${featured.id}`)}
              className="min-w-[220px] cursor-pointer rounded-xl p-5 border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              <h4 className="text-white font-medium">{tool.title}</h4>
              <p className="text-xs text-zinc-400 mt-2 line-clamp-2">
                {tool.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}