"use client";

import { tools } from "@/data/tools";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FileText,
  Calculator,
  Cpu,
  Image,
  DollarSign,
  Code,
} from "lucide-react";
import React, { useState, useEffect, JSX } from "react";
import { useRouter } from "next/navigation";

const categoryIcons: Record<string, JSX.Element> = {
  PDF: <FileText className="w-4 h-4 text-indigo-400" />,
  Calculator: <Calculator className="w-4 h-4 text-green-400" />,
  AI: <Cpu className="w-4 h-4 text-pink-400" />,
  Image: <Image className="w-4 h-4 text-blue-400" />,
  Finance: <DollarSign className="w-4 h-4 text-yellow-400" />,
  Developer: <Code className="w-4 h-4 text-purple-400" />,
};

export function CommandPalette() {
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
        className="cursor-pointer rounded-xl bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-500 transition"
      >
        Explore Tools ⌘K
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
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Search className="w-5 h-5 text-white/40" />
                <input
                  autoFocus
                  placeholder="Explore tools..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className="w-full bg-transparent text-white outline-none"
                />
              </div>

              <div className="mt-4 max-h-64 overflow-y-auto">
                {results.length > 0 ? (
                  results.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition ${
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
                        <p className="font-medium">{item.title}</p>
                        <p className="text-white/60 text-sm">
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
