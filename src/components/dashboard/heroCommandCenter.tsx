"use client";

import { useRouter } from "next/navigation";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { getCachedTools } from "@/data/tools";
import { IconResolver } from "@/sharedUI/iconResolver";
import { FeatureBadge } from "../ui/featureBadge";

export function HeroCommandCenter() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const searchRef = useRef<HTMLDivElement | null>(null);

    const tools = getCachedTools();
    const results = tools.filter(
      (item) =>
        item?.title?.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase())
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
    const badges = [
          { label: "🔒 Files Stay on Your Device", color: "blue" },
          { label: "💻 Works offline", color: "green" },
          { label: "✓ No Sign-up Required", color: "purple" },
        ];
  return (
    <section
      className="hero-banner"
    >
      <div className="flex flex-wrap gap-3 items-center justify-center gap-2 pb-4 text-xs font-medium">
        {badges.map((b) => (
          <FeatureBadge key={b.label} color={b.color as any}>
            {b.label}
          </FeatureBadge>
        ))}
      </div>

      <span className="hero-title">
        Free online tools for PDFs, images<br/>calculators, QR codes & more
      </span>

      <p className="hero-copy">
        Everything happens in your browser — Your files stay on your device. Nothing is uploaded, stored, or shared.
      </p>

      <div ref={searchRef} className="relative mt-10 w-full max-w-2xl">
        <div className="glass-input">
          <Search className="w-5 h-5 text-white/40 search-box" />

          <input
            id="dashboard-tool-search"
            placeholder="Search Finance, Privacy, PDF tools, AI utilities..."
            className="search-field"
            aria-label="Search tools"
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
                    <IconResolver name={item.icon} size={20} color="#40916f" />
                  </span>
                  <p className="text-sm line-clamp-2" title={String(item.description)}>{item.title}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white/60 text-center py-6">No tools found</p>
          )}
        </div>
      )}
      </div>
    <div className="mt-8 flex gap-4">
    <CommandPalette buttonName="Find the Right Tool ⌘K"
    buttonClassName="cursor-pointer rounded-xl bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-500 transition"
    searchTools={true}/>
    <CommandPalette buttonName="View All Categories"
    buttonClassName="cursor-pointer rounded-xl border border-white/10 px-6 py-3 text-white/80 hover:bg-white/5 transition"
    searchTools={false}/>
  </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {["Privacy & Security", "Finance", "PDF", "Image", "Date & Time", "QR Code"].map(
          (item) => (
            <div
              key={item}
              className="cursor-pointer glass px-4 py-2 text-sm text-white/70"
              onClick={() => router.push(`/${item?.toLowerCase().replace(/ /g, "").replace(/&/g, "")}`)}
            >
              {item}
            </div>
          )
        )}
      </div>
    </section>
  );
}