// src/hooks/useRecentTool.ts
'use client';

import { useRecentToolStore } from '@/stores/recentToolsStore';

export function useRecentTool() {
  return useRecentToolStore();
}