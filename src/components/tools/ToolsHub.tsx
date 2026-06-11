// "use client";

// import { categoryIcons, tools } from "@/data/tools";
// import React, { useState, useMemo } from "react";
// import { FileText } from "lucide-react";
// import { useRouter, useSearchParams } from "next/navigation";

// export function ToolsHub() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const categoryId = searchParams?.get("categoryId")?.toString()?.toLowerCase() || "";
//   const category = Object.values(categoryIcons).find((t) => t.id.toLowerCase() === categoryId);
//   const [activeCategory, setActiveCategory] = useState(category?.id.toLowerCase() || "all");

//   const categories = [
//     {
//       id: "All",
//       title: "All",
//       description: "Browse all available tools",
//       icon: React.createElement(FileText, { className: "w-4 h-4 text-indigo-400" }),
//     },
//     ...Object.values(categoryIcons),
//   ];

//   const filteredTools = useMemo(
//     () =>
//       activeCategory.toLowerCase() === "all"
//         ? tools
//         : tools.filter((t) => t.category.toLowerCase() === activeCategory),
//     [activeCategory]
//   );

//   return (
//     <div>
//       {/* <div className="section-header">
//         <h1 className="section-title">All Tools</h1>
//         <p className="section-copy">Explore all AI-powered utilities available on this site.</p>
//       </div> */}

//       <div className="flex flex-wrap gap-3 mb-8">
//         {categories.map((cat) => (
//           <button
//             key={cat.id}
//             onClick={() => setActiveCategory(cat.id.toLowerCase())}
//             className={`rounded-full text-sm transition border border-white/10 px-4 py-2 ${
//               activeCategory === cat.id.toLowerCase() ? "bg-white text-black" : "button-ghost"
//             }`}
//           >
//             {cat.title}
//           </button>
//         ))}
//       </div>

//       <div className="tool-grid">
//         {filteredTools.map((tool) => {
//           const Icon = tool.icon;
//           return (
//             <div
//               key={tool.id}
//               onClick={() => router.push(`/tools/${tool.id}`)}
//               className="card-surface h-[220px]"
//             >
//               <div>
//                 <div className="flex items-center gap-3">
//                   <div className="card-icon">
//                     <Icon className="text-white" />
//                   </div>
//                   <span className="text-xs text-white/50">{tool.category}</span>
//                   {tool.comingSoon && (
//                     <span className="rounded-full bg-yellow-500/15 text-yellow-300 px-2 py-1 text-[10px] uppercase tracking-[0.2em]">
//                       Coming Soon
//                     </span>
//                   )}
//                 </div>
//                 <h3 className="text-white font-semibold mt-4">{tool.title}</h3>
//                 <p className="text-white/50 text-sm mt-2">{tool.description}</p>
//               </div>
//               <div className="card-footer">{tool.comingSoon ? "Preview →" : "Open →"}</div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
