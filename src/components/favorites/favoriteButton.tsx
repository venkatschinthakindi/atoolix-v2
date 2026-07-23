// src/components/favorites/FavoriteButton.tsx
'use client';

import { memo, useEffect } from 'react';
import { useFavoriteTool } from '@/hooks/useFavoriteTool';
import { cn } from '@/utility/cn';
import { ToolRegistryEntry } from '@/data/tools';
import { useRecentTool } from '@/hooks/useRecentTool';

export const FavoriteButton = memo(function FavoriteButton({
  tool,
}: {
  tool: ToolRegistryEntry;
}) {
    const { isFavorite, toggle } = useFavoriteTool(tool.id);
    const { push } = useRecentTool();

    useEffect(() => {
      push(tool);
    }, [push]);

    return (
      <button
        type="button"
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        onClick={() => toggle(tool)}
        className={cn(
          'inline-flex h-5 w-5 items-center justify-center rounded-full border transition-transform duration-200 active:scale-95',
          isFavorite
            ? 'border-yellow-300 bg-yellow-400 text-black'
            : 'border-border bg-background text-muted-foreground hover:bg-muted'
        )}
      >
        <span
          className={cn(
            'text-lg leading-none transition-transform duration-200',
            isFavorite && 'scale-110'
          )}
        >
          {isFavorite ? '★' : '☆'}
        </span>
      </button>
    );
});