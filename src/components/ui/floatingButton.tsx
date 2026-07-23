'use client';

import { cn } from '@/utility/cn';
import { useEffect, useState } from 'react';

export function FloatingButton({
    children,
    className
}: {
    children?: React.ReactNode;
    className?: string
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;

      // Always show near the top
      if (currentY < 120) {
        setVisible(true);
      } else if (currentY > lastY) {
        // Scrolling down
        setVisible(false);
      } else {
        // Scrolling up
        setVisible(true);
      }

      lastY = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={cn(
        className || 'fixed top-12 left-6 z-50 transition-all duration-300',
        visible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-6 opacity-0 pointer-events-none'
      )}
    >
    {
        children
    }
    </div>
  );
}