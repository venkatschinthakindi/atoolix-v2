"use client";

import { useRouter } from "next/navigation";
import { CommandPalette } from "@/components/ui/commandPalette";
import { useEffect, useRef, useState } from "react";
import { tools } from "@/data/tools";
import { Search } from "lucide-react";

export function HeroCommandCenter() {
  const router = useRouter();
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const searchRef = useRef<HTMLDivElement | null>(null);
  
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

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
          setOpen(false);
          setQuery("");
          setSelectedIndex(0);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  return (
    <section
      // initial={{ opacity: 0, y: 20 }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.6 }}
      //initial={false}
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

      <div ref={searchRef} className="relative mt-10 w-full max-w-2xl">
        <div className="glass-input">
          <Search className="w-5 h-5 text-white/40 search-box" />

          <input
            placeholder="Search calculators, PDF tools, AI utilities..."
            className="search-field"
            value={query}
            onChange={(e) => {
              const next = e.target.value;
              setQuery(next);
              setSelectedIndex(0);
              setOpen(next.length > 2);
            }}
            onFocus={() => {
              if (query.length > 2) setOpen(true);
            }}
          />
        </div>
      {open && query && query.length > 2 && (
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
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-12 w-12 items-center justify-center">
                    <item.icon size={20} color="#40916f" />
                  </span>
                  <p className="text-sm line-clamp-2" title={String(item.description)}>{item.title}</p>
                </div>
                {/* <div className="flex items-center gap-2">
                  {categoryIcons[item.category]}
                  <span className="badge-pill">
                    {item.category}
                  </span>
                </div> */}
              </div>
            ))
          ) : (
            <p className="text-white/60 text-center py-6">No tools found</p>
          )}
        </div>
      )}
      </div>
    <div className="mt-8 flex gap-4">
    <CommandPalette buttonName="Explore Tools ⌘K"
    buttonClassName="cursor-pointer rounded-xl bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-500 transition"
    searchTools={true}/>
    <CommandPalette buttonName="Browse Categories"
    buttonClassName="cursor-pointer rounded-xl border border-white/10 px-6 py-3 text-white/80 hover:bg-white/5 transition"
    searchTools={false}/>
  </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {["Finance", "PDF", , "Calculator",  "Image", "AI", "Developer"].map(
          (item) => (
            <div
              key={item}
              className="cursor-pointer glass px-4 py-2 text-sm text-white/70"
              onClick={() => router.push(`/${item?.toLowerCase()}`)}
            >
              {item}
            </div>
          )
        )}
      </div>
    </section>
  );
}