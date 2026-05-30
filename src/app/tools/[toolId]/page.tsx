// "use client";

// import { useParams } from "next/navigation";
// import { useState } from "react";
// import { tools } from "@/data/tools";

// export default function ToolPage() {
//   const params = useParams();
  
//   const toolId = params?.toolId as string;

//   const tool = tools.find((t) => t.id === toolId);
// console.log("tool:", tool);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<string | null>(null);

//   if (!tool) {
//     return (
//       <div className="app-container mt-10 text-white">
//         <h1 className="text-xl font-semibold">Tool not found</h1>
//       </div>
//     );
//   }

// //   const Icon = tool.icon;

//   const runTool = () => {
//     setLoading(true);
//     setResult(null);

//     // Simulated execution engine
//     setTimeout(() => {
//       setLoading(false);

//       // Fake smart outputs based on tool type (optional realism)
//       let output = "";

//       switch (tool.id) {
//         case "calculator":
//           output = "Result: 24 × 18 = 432";
//           break;

//         case "ai-writer":
//           output =
//             "Generated Content: 'Top 10 strategies to improve productivity using AI tools...'";
//           break;

//         case "pdf":
//           output = "PDF processed successfully: 3 files merged";
//           break;

//         case "finance":
//           output = "EMI calculated: ₹12,450/month for 5 years";
//           break;

//         case "image":
//           output = "Image optimized: 72% size reduction achieved";
//           break;

//         default:
//           output = "Execution completed successfully 🎯";
//       }

//       setResult(output);
//     }, 1500);
//   };

//   return (
//     <div className="app-container mt-10 text-white">
//       {/* TOOL HEADER */}
//       <div className="flex items-center gap-3">
//         <div className="p-3 rounded-2xl bg-white/5">
//           {/* <Icon className="text-white" /> */}
//         </div>

//         <h1 className="text-2xl font-bold">{tool.title}</h1>
//       </div>

//       <p className="text-white/60 mt-2">{tool.description}</p>

//       {/* RUN BUTTON */}
//       <button
//         onClick={runTool}
//         className="mt-6 px-5 py-2 bg-white/10 hover:bg-white/20 transition rounded-xl">
//         Run Tool
//       </button>

//       {/* LOADING STATE */}
//       {loading && (
//         <div className="mt-6 text-white/60 animate-pulse">
//           Processing...
//         </div>
//       )}

//       {/* RESULT OUTPUT */}
//       {result && !loading && (
//         <div
//           className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
//           <p className="text-white">{result}</p>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { tools } from "@/data/tools";

export default function ToolPage() {
  const params = useParams();

  const toolId = Array.isArray(params?.toolId)
    ? params.toolId[0]
    : params?.toolId;

  const tool = tools.find((t) => t.id === toolId);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  console.log("tool:", tool);

  if (!toolId) {
    return (
      <div className="min-h-screen text-white relative overflow-hidden aurora-bg">
        <h1 className="text-xl font-semibold">Missing toolId</h1>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen text-white relative overflow-hidden aurora-bg">
        <h1 className="text-xl font-semibold">Tool not found</h1>
      </div>
    );
  }

  const Icon = tool.icon;

  const runTool = () => {
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setLoading(false);

      let output = "";

      switch (tool.id) {
        case "calculator":
          output = "Result: 24 × 18 = 432";
          break;

        case "ai-writer":
          output =
            "Generated Content: 'Top 10 strategies to improve productivity using AI tools...'";
          break;

        case "pdf":
          output = "PDF processed successfully: 3 files merged";
          break;

        case "finance":
          output = "EMI calculated: ₹12,450/month for 5 years";
          break;

        case "image":
          output = "Image optimized: 72% size reduction achieved";
          break;

        default:
          output = "Execution completed successfully 🎯";
      }

      setResult(output);
    }, 1500);
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden aurora-bg">
      {/* Optional subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20  to-blue-900/20 opacity-[0.04] pointer-events-none noise" />

      <div className="relative app-container mt-10">
        {/* TOOL HEADER */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-white/5">
            {Icon && <Icon className="text-white" />}
          </div>

          <h1 className="text-2xl font-bold">{tool.title}</h1>
        </div>

        <p className="text-white/60 mt-2">{tool.description}</p>

        {/* RUN BUTTON */}
        <button
          onClick={runTool}
          className="mt-6 px-5 py-2 bg-white/10 hover:bg-white/20 transition rounded-xl"
        >
          Run Tool
        </button>

        {/* LOADING STATE */}
        {loading && (
          <div className="mt-6 text-white/60 animate-pulse">
            Processing...
          </div>
        )}

        {/* RESULT OUTPUT */}
        {result && !loading && (
          <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-white">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}