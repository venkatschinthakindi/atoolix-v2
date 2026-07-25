// src/stores/favorite-tools.store.ts
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { nextOrder, sortFavorites } from '@/lib/favorite/favoriteUtils';
import { FavoriteTool } from '@/types/favorite/favorite';
import { ToolRegistryEntry } from '@/data/tools';

type FavoriteStore = {
  items: FavoriteTool[];
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  add: (tool: ToolRegistryEntry) => void;
  remove: (toolId: string) => void;
  rename: (toolId: string, name: string) => void;
  reorder: (ids: string[]) => void;
  toggle: (tool: ToolRegistryEntry) => void;
  clear: () => void;
};

export const useFavoriteToolStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      items: [],
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      add: (tool) =>
        set((state) => {
          if (state.items.some((i) => i.toolId === tool.id)) return state;
          const item: FavoriteTool = {
            toolId: tool.id,
            icon: tool.icon,
            displayName: tool.toolShortName || tool.onPageTitle,
            addedAt: Date.now(),
            order: nextOrder(state.items),
          };
          
          return { items: sortFavorites([...state.items, item]).sort((a, b) => b.addedAt - a.addedAt).slice(0, 10) };
        }),
      remove: (toolId) =>
        set((state) => ({
          items: sortFavorites(state.items.filter((i) => i.toolId !== toolId)),
        })),
      rename: (toolId, name) =>
        set((state) => ({
          items: sortFavorites(
            state.items.map((i) =>
              i.toolId === toolId ? { ...i, displayName: name.trim() || undefined } : i
            )
          ),
        })),
      reorder: (ids) =>
        set((state) => ({
          items: ids
            .map((id, idx) => {
              const found = state.items.find((i) => i.toolId === id);
              return found ? { ...found, order: idx } : null;
            })
            .filter(Boolean) as FavoriteTool[],
        })),
      toggle: (tool) => {
        const exists = get().items.some((i) => i.toolId === tool.id);
        exists ? get().remove(tool.id) : get().add(tool);
      },
      clear: () => set({ items: [] }),
    }),
    {
      name: 'atoolix.favorite-tools',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => state?.setHydrated(true),
    }
  )
);