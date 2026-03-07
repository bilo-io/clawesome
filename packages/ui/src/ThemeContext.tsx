'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  glowIntensity: number;
  setGlowIntensity: (intensity: number) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = 'clawesome:theme';
const GLOW_KEY = 'clawesome:glow';

function readStoredTheme(fallback: 'light' | 'dark'): 'light' | 'dark' {
  if (typeof window === 'undefined') return fallback;
  const stored = localStorage.getItem(THEME_KEY);
  return stored === 'light' || stored === 'dark' ? stored : fallback;
}

function readStoredGlow(fallback: number): number {
  if (typeof window === 'undefined') return fallback;
  const stored = localStorage.getItem(GLOW_KEY);
  const parsed = stored !== null ? Number(stored) : NaN;
  return isNaN(parsed) ? fallback : parsed;
}

export function ThemeProvider({
  children,
  initialTheme = 'dark',
  initialGlow = 50,
}: {
  children: React.ReactNode;
  initialTheme?: 'light' | 'dark';
  initialGlow?: number;
}) {
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    // Read immediately — applies before first render so Tailwind dark: utilities are correct
    const resolved = readStoredTheme(initialTheme);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', resolved === 'dark');
    }
    return resolved;
  });
  const [glowIntensity, setGlowState] = useState(() => readStoredGlow(initialGlow));

  // Sync theme -> DOM class + localStorage
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Sync glow -> localStorage
  useEffect(() => {
    localStorage.setItem(GLOW_KEY, String(glowIntensity));
  }, [glowIntensity]);

  const setTheme = (t: 'light' | 'dark') => setThemeState(t);
  const setGlowIntensity = (g: number) => setGlowState(g);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, glowIntensity, setGlowIntensity }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useUI() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return a safe default when used outside a provider (e.g. in SSR or tests)
    return {
      theme: 'dark' as const,
      setTheme: () => {},
      glowIntensity: 50,
      setGlowIntensity: () => {},
    };
  }
  return context;
}

// ─── Per-route view mode persistence ─────────────────────────────────────────

export type ViewMode = 'grid' | 'list' | 'table';

const VIEW_MODES_KEY = 'clawesome:viewModes';

function readViewModes(): Record<string, ViewMode> {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem(VIEW_MODES_KEY);
    return stored ? (JSON.parse(stored) as Record<string, ViewMode>) : {};
  } catch {
    return {};
  }
}

/**
 * Drop-in replacement for `useState` for view mode (grid/list/table).
 * Persists the chosen mode per `routeKey` in `localStorage`.
 *
 * @param routeKey    A stable string that identifies the page, e.g. '/agents'
 * @param defaultMode Fallback when no stored preference exists
 */
export function useViewMode(
  routeKey: string,
  defaultMode: ViewMode = 'grid',
): [ViewMode, (mode: ViewMode) => void] {
  const [mode, setModeState] = useState<ViewMode>(() => {
    const stored = readViewModes();
    return stored[routeKey] ?? defaultMode;
  });

  const setMode = (next: ViewMode) => {
    setModeState(next);
    try {
      const all = readViewModes();
      all[routeKey] = next;
      localStorage.setItem(VIEW_MODES_KEY, JSON.stringify(all));
    } catch {
      // localStorage unavailable — silently ignore
    }
  };

  return [mode, setMode];
}
