// src/stores/recent-tools.store.ts
'use client';

import { ToolRegistryEntry } from '@/data/tools';
import { nextOrder } from '@/lib/favorite/favoriteUtils';
import { RecentTool } from '@/types/favorite/favorite';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type RecentStore = {
  items: RecentTool[];
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  push: (tool: ToolRegistryEntry) => void;
  clear: () => void;
};

export const useRecentToolStore = create<RecentStore>()(
  persist(
    (set) => ({
      items: [],
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      push: (tool) =>
        set((state) => {
          const filtered = state.items.filter((i) => i.toolId !== tool.id);
          const item: RecentTool = {
                      toolId: tool.id,
                      icon: tool.icon,
                      displayName: tool.toolShortName || tool.onPageTitle,
                      addedAt: Date.now(),
                      order: nextOrder(state.items),
                    };
              return {
                items: [item, ...filtered].slice(0, 20),
              };
        }),
      clear: () => set({ items: [] }),
    }),
    {
      name: 'atoolix.recent-tools',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => state?.setHydrated(true)
    }
  )
);