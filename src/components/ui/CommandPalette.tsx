"use client";

import { categoryIcons, tools } from "@/data/tools";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, JSX } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

// const categoryIcons: Record<string, JSX.Element> = categoryIcons;
type CommandPaletteProps = {
  buttonName: string;
  buttonClassName: string; // optional: Tailwind width class (e.g. "max-w-md")
  searchTools: boolean ;
};
export function CommandPalette({ buttonName, buttonClassName, searchTools }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  let dataSource = searchTools ? tools : Object.values(categoryIcons); // You can replace [] with another dataset if needed

  const results = dataSource.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
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
    <>
      <button
        onClick={() => setOpen(true)}
        className={buttonClassName}
      >
        {buttonName}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-indigo/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white/10 w-full max-w-2xl rounded-xl shadow-xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="glass-input border-b border-white/10 pb-4">
                <Search className="w-5 h-5 text-white/40" />
                <input
                  autoFocus
                  placeholder="Explore tools..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className="search-field"
                />
              </div>

              <div className="mt-4 max-h-64 overflow-y-auto">
                {results.length > 0 ? (
                  results.map((item: any, index: number) => (
                    <div
                      key={index}
                      className={`result-item ${
                        index === selectedIndex ? "result-item-active" : "result-item-hover"
                      }`}
                      onClick={() => {
                        if (searchTools) {
                          router.push(`/tools/${item.id}`);
                          setOpen(false);
                        }
                        else {
                          const params = new URLSearchParams({
                            categoryId: item.id
                          });

                          router.push(`/tools?${params.toString()}`);
                        }
                      }}
                    >
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-white/60 text-sm">
                          {item.description}
                        </p>
                      </div>
                      {
                        searchTools == true ?
                        (<div className="flex items-center gap-2">
                        
                        {categoryIcons[item.category] && categoryIcons[item.category].icon}
                        <span className="badge-pill">
                          {item.category}
                        </span>
                      </div>):("")
                      }
                      
                    </div>
                  ))
                ) : (
                  <p className="text-white/60 text-center py-6">No tools found</p>
                )}
              </div>

              <div className="mt-4 text-xs text-white/50 text-center">
                ↵ Enter to select • Esc to close • ↑ ↓ to navigate
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
