"use client";

import { categoryIcons, getCachedTools } from "@/data/tools";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { IconResolver } from "@/sharedUI/iconResolver";
import { getCanonicalToolPath } from "@/utility/getTool";

type CommandPaletteProps = {
  buttonName: string;
  buttonClassName: string; // optional: Tailwind width class (e.g. "max-w-md")
  searchTools: boolean;
};

export function CommandPalette({ buttonName, buttonClassName, searchTools }: CommandPaletteProps) {
  const tools = getCachedTools();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const dataSource = searchTools ? tools : categoryIcons;

  const results = dataSource.filter(
    (item) =>
      item.title?.toLowerCase().includes(query.toLowerCase()) ||
      item.description?.toLowerCase().includes(query.toLowerCase())
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
          const item = results[selectedIndex];
          if (searchTools && "alternates" in item) {
            router.push(getCanonicalToolPath(item));
          } else if (!searchTools) {
            router.push(`/tools/${item.title}`);
          }
          setOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, results, selectedIndex, router, searchTools]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={buttonClassName}
      >
        {buttonName}
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-indigo/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white/10 w-full max-w-2xl rounded-xl shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass-input border-b border-white/10 pb-4">
              <Search className="w-5 h-5 text-white/40" />
              <input
                autoFocus
                placeholder={searchTools === true ? "Search tools..." : "Explore categories..."}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="search-field"
              />
            </div>

            <div className="mt-4 max-h-64 overflow-y-auto toolsSeatchResultSection">
              {results.length > 0 ? (
                results.map((item: any, index: number) => (
                  <div
                    key={index}
                    className={`result-item ${
                      index === selectedIndex ? "result-item-active" : "result-item-hover"
                    }`}
                    onClick={() => {
                      if (searchTools) {
                        router.push(getCanonicalToolPath(item));
                        setOpen(false);
                      } else {
                        const params = new URLSearchParams({
                          categoryid: item?.id,
                        });

                        router.push(`/tools?${params.toString()}`);
                      }
                    }}
                  >
                    {searchTools === true ? (
                      <div className="flex items-center gap-2">
                        <IconResolver name={item.icon} size={18} color="#40916f" />
                        {/* <span>
                          {item.category}
                        </span> */}
                      </div>
                    ) : (
                      ""
                    )}
                    <div>
                      <p className="font-medium" title={String(item.description)}>{item.title}</p>
                      {/* <p className="text-white/60 text-sm">
                        {item.description}
                      </p> */}
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
          </div>
        </div>
      )}
    </>
  );
}
