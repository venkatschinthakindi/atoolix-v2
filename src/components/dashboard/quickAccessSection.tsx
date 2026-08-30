// src/components/dashboard/QuickAccessSection.tsx
'use client';

import Link from 'next/link';
import { Check, Pencil, X } from 'lucide-react';
import { FavoriteTool, RecentTool } from '@/types/favorite/favorite';
import { IconResolver } from '@/sharedUI/iconResolver';
import { getCachedTools } from '@/data/tools';
import { getCanonicalToolPath } from '@/utility/getTool';
import { useState } from 'react';
import { useFavoriteToolStore } from '@/stores/favoriteToolsStore';

export interface QuickAccessGroup {
  title: string;
  icon?: React.ReactNode;
  items: FavoriteTool[] | RecentTool[];
  emptyText?: string;
  viewAllHref?: string;
}

interface QuickAccessSectionProps {
  title?: string;
  description?: string;
  groups: QuickAccessGroup[];
}


export function QuickAccessSection({
  title = '⚡ Quick Access',
  description = 'Your favorite and recently used tools.',
  groups,
}: QuickAccessSectionProps) {

  return (
    <section className="page-section pt-2 px-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="">
          <span className="section-title text-2xl">{title}</span>

          <p className="section-copy mt-2 mb-2">
            {description}
          </p>
        </div>
      <div className="surface-card-light-favorite">
        <div className="space-y-6">
          {groups.map((group) => (
            <QuickAccessGroupView
              key={group.title}
              {...group}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickAccessGroupView({
  title,
  icon,
  items,
  emptyText,
}: QuickAccessGroup) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");

  const rename = useFavoriteToolStore((s) => s.rename);

  const startEdit = (tool: FavoriteTool) => {
    setEditingId(tool.toolId);
    setName(tool.displayName!);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName("");
  };

  const saveEdit = () => {
    if (!editingId) return;

    rename(editingId, name.trim());
    cancelEdit();
  };
  const isFavoritesSection = title?.toLowerCase().includes("favorites") || false;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        {icon}
        <span>{title}</span>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-zinc-500">
          {emptyText ?? "Nothing here yet."}
        </p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {items.map((tool) => {
            const editing = editingId === tool.toolId;
            const registeredTool = getCachedTools().find((entry) => entry.id === tool.toolId);
            const href = registeredTool ? getCanonicalToolPath(registeredTool) : `/tools/${tool.toolId}`;

            return (
              <div
                key={tool.toolId}
                className="
                  group
                  relative
                  flex
                  items-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  pl-4
                  pr-10
                  py-2
                  transition-all
                  duration-200
                  hover:border-indigo-500/40
                  hover:bg-indigo-500/10
                "
              >
                {!editing ? (
                  <>
                    <Link
                      href={href}
                      className="flex items-center gap-2"
                    >
                      <IconResolver
                        name={tool.icon}
                        size={20}
                        color="#40916f"
                      />

                      <span className="max-w-[180px] truncate text-sm text-zinc-200">
                        {tool.displayName}
                      </span>
                    </Link>
                    {
                        isFavoritesSection && (
                            <button
                            type="button"
                            title="Rename"
                            onClick={() => startEdit(tool)}
                            className="
                                absolute
                                right-2
                                top-1/2
                                -translate-y-1/2
                                rounded-md
                                p-1
                                text-zinc-400
                                opacity-0
                                transition-all
                                hover:bg-white/10
                                hover:text-white
                                group-hover:opacity-100
                            "
                            >
                            <Pencil className="h-3.5 w-3.5" />
                            </button>
                        )
                    }
                    
                  </>
                ) : (
                  <>
                    <IconResolver
                      name={tool.icon}
                      size={20}
                      color="#40916f"
                    />

                    <input
                      autoFocus
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit();
                        if (e.key === "Escape") cancelEdit();
                      }}
                      className="
                        ml-2
                        w-40
                        bg-transparent
                        text-sm
                        text-white
                        outline-none
                      "
                    />

                    <div className="absolute right-2 flex items-center gap-1">
                      <button
                        onClick={saveEdit}
                        className="rounded -p-2 text-emerald-400 hover:bg-white/10"
                        title="Save"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>

                      <button
                        onClick={cancelEdit}
                        className="rounded -p-2 text-zinc-400 hover:bg-white/10"
                        title="Cancel"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}