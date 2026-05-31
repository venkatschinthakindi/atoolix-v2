"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CommandPalette } from "../ui/CommandPalette";
import { JSX, useEffect, useState } from "react";
import { tools } from "@/data/tools";
import {
  Search,
  FileText,
  Calculator,
  Cpu,
  Image,
  DollarSign,
  Code,
} from "lucide-react";

const categoryIcons: Record<string, JSX.Element> = {
  PDF: <FileText className="w-4 h-4 text-indigo-400" />,
  Calculator: <Calculator className="w-4 h-4 text-green-400" />,
  AI: <Cpu className="w-4 h-4 text-pink-400" />,
  Image: <Image className="w-4 h-4 text-blue-400" />,
  Finance: <DollarSign className="w-4 h-4 text-yellow-400" />,
  Developer: <Code className="w-4 h-4 text-purple-400" />,
};

export function HeroCommandCenter() {
  const router = useRouter();
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
  
    const results = tools.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );
  
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
          e.preventDefault();
          setOpen(false);
        }
        if (open) {
          if (e.key === "Escape") setOpen(false);
          if (e.key === "ArrowDown")
            setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          if (e.key === "ArrowUp")
            setSelectedIndex((prev) => Math.max(prev - 1, 0));
          if (e.key === "Enter" && results[selectedIndex]) {
            router.push(`/tools/${results[selectedIndex].title}`);
            setOpen(false);
          }
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open, results, selectedIndex, router]);
  

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="hero-banner"
    >
      <span className="hero-pill">
        100+ Productivity Tools
      </span>

      <h1 className="hero-title">
        Find the perfect tool  <br />
        for every task
      </h1>

      <p className="hero-copy">
        All your calculators, PDF tools, AI utilities and developer tools in one place.
      </p>

      <div className="relative mt-10 w-full max-w-2xl">
        <div className="glass-input">
          <Search className="w-5 h-5 text-white/40 search-box" />

          <input
            placeholder="Search calculators, PDF tools, AI utilities..."
            className="search-field"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
        </div>
      {query && query.length > 2 && (
        <div className="search-overlay">
          {results.length > 0 ? (
            results.map((item, index) => (
              <div
                key={index}
                className={`result-item ${
                  index === selectedIndex ? "result-item-active" : "result-item-hover"
                }`}
                onClick={() => {
                  router.push(`/tools/${item.id}`);
                  setOpen(false);
                }}
              >
                <div>
                  <p className="text-sm">{item.title}</p>
                  <p className="text-white/60 text-xs">{item.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  {categoryIcons[item.category]}
                  <span className="badge-pill">
                    {item.category}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white/60 text-center py-6">No tools found</p>
          )}
        </div>
      )}

      {/* {query && query.length > 2 && (
      <div className="mt-4 max-h-54 overflow-y-auto">
                {results.length > 0 ? (
                  results.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center max-w-md mx-auto justify-between px-4 py-3 rounded-lg cursor-pointer transition ${
                        index === selectedIndex
                          ? "bg-indigo-600 text-white"
                          : "hover:bg-white/10 text-white"
                      }`}
                      onClick={() => {
                        router.push(`/tools/${item.title}`);
                        setOpen(false);
                      }}
                    >
                      <div>
                        <p className="text-sm">{item.title}</p>
                        <p className="text-white/60 text-xs">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {categoryIcons[item.category]}
                        <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-white/60 text-center py-6">No tools found</p>
                )}
              </div>)} */}
      </div>
    <div className="mt-8 flex gap-4">
  {/* <button
    className="rounded-xl bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-500 transition">
    Explore Tools
  </button> */}
  <CommandPalette buttonName="Explore Tools ⌘K"
   buttonClassName="cursor-pointer rounded-xl bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-500 transition"
   searchTools={true}/>
  <CommandPalette buttonName="Browse Categories"
   buttonClassName="cursor-pointer rounded-xl border border-white/10 px-6 py-3 text-white/80 hover:bg-white/5 transition"
   searchTools={false}/>
</div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {["Calculator", "PDF", "Finance", "AI", "Image", "Developer"].map(
          (item) => (
            <div
              key={item}
              className="glass px-4 py-2 text-sm text-white/70"
              onClick={() => router.push(`/tools/${item}`)}
            >
              {item}
            </div>
          )
        )}
      </div>
    </motion.section>
  );
}