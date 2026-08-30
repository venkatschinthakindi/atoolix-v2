"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

type NextThemesProviderProps = ComponentProps<typeof NextThemesProvider>;

/**
 * Wraps next-themes' provider with this app's specific configuration:
 * - attribute="class": toggles the .dark class on <html>, matching the
 *   @custom-variant dark (&:is(.dark *)) already wired in globals.css.
 * - defaultTheme="dark": this app's dark theme stays the default whenever
 *   no stored/system preference can be determined.
 * - enableSystem: first-time visitors (no localStorage entry yet) get
 *   their OS-level prefers-color-scheme honored; defaultTheme is only
 *   the fallback if that can't be read. Once someone toggles manually,
 *   next-themes persists that explicit choice to localStorage and it
 *   takes priority over system preference from then on.
 * - disableTransitionOnChange: prevents every themed element's CSS
 *   transition from firing simultaneously on toggle, which otherwise
 *   reads as a laggy flash rather than an intentional animation - the
 *   toggle control itself still gets its own explicit transition.
 *
 * next-themes handles the no-flash-of-wrong-theme problem via a tiny
 * blocking inline script injected before hydration, not a client
 * useEffect - this is why it's the standard choice for this per the
 * brief (no CLS/LCP-hurting repaint after hydration).
 */
export function ThemeProvider({ children, ...props }: NextThemesProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
