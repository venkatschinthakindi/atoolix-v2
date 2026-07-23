// src/types/favorite.ts
export interface FavoriteTool {
  toolId: string;
  icon: string;
  displayName?: string;
  addedAt: number;
  order: number;
}

export interface RecentTool {
  toolId: string;
  icon: string;
  displayName?: string;
  addedAt: number;
  order: number;
}