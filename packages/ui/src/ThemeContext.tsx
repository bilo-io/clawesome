'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  glowIntensity: number;
  setGlowIntensity: (intensity: number) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = 'clawesome:theme';
const GLOW_KEY = 'clawesome:glow';

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function readStoredTheme(fallback: Theme): Theme {
  if (typeof window === 'undefined') return fallback;
  const stored = localStorage.getItem(THEME_KEY);
  return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : fallback;
}

function readStoredGlow(fallback: number): number {
  if (typeof window === 'undefined') return fallback;
  const stored = localStorage.getItem(GLOW_KEY);
  const parsed = stored !== null ? Number(stored) : NaN;
  return isNaN(parsed) ? fallback : parsed;
}

export function ThemeProvider({
  children,
  initialTheme = 'system',
  initialGlow = 50,
}: {
  children: React.ReactNode;
  initialTheme?: Theme;
  initialGlow?: number;
}) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Read immediately — applies before first render so Tailwind dark: utilities are correct
    const stored = readStoredTheme(initialTheme);
    if (typeof document !== 'undefined') {
      const isDark = stored === 'system' ? getSystemTheme() === 'dark' : stored === 'dark';
      document.documentElement.classList.toggle('dark', isDark);
    }
    return stored;
  });
  
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    return theme === 'system' ? getSystemTheme() : theme;
  });

  const [glowIntensity, setGlowState] = useState(() => readStoredGlow(initialGlow));

  // Sync theme -> DOM class + localStorage + resolvedTheme
  useEffect(() => {
    const handleSystemChange = () => {
      if (theme === 'system') {
        const isDark = getSystemTheme() === 'dark';
        document.documentElement.classList.toggle('dark', isDark);
        setResolvedTheme(isDark ? 'dark' : 'light');
      }
    };

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', handleSystemChange);
      handleSystemChange();
      localStorage.setItem(THEME_KEY, 'system');
      return () => mediaQuery.removeEventListener('change', handleSystemChange);
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      setResolvedTheme(theme);
      localStorage.setItem(THEME_KEY, theme);
    }
  }, [theme]);

  // Sync glow -> localStorage
  useEffect(() => {
    localStorage.setItem(GLOW_KEY, String(glowIntensity));
  }, [glowIntensity]);

  const setTheme = (t: Theme) => setThemeState(t);
  const setGlowIntensity = (g: number) => setGlowState(g);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, glowIntensity, setGlowIntensity, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useUI() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return a safe default when used outside a provider (e.g. in SSR or tests)
    return {
      theme: 'dark' as const, // The resolved string for styling parity
      themePreference: 'system' as const, // The logical toggle state
      setTheme: () => {},
      glowIntensity: 50,
      setGlowIntensity: () => {},
    };
  }
  return {
    ...context,
    theme: context.resolvedTheme,
    themePreference: context.theme,
  };
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
