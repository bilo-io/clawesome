'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  glowIntensity: number;
  setGlowIntensity: (intensity: number) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ 
  children, 
  initialTheme = 'dark',
  initialGlow = 50 
}: { 
  children: React.ReactNode;
  initialTheme?: 'light' | 'dark';
  initialGlow?: number;
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme);
  const [glowIntensity, setGlowIntensity] = useState(initialGlow);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, glowIntensity, setGlowIntensity }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useUI() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return a default if no provider is found, to avoid breaking components
    return {
      theme: 'dark' as const,
      setTheme: () => {},
      glowIntensity: 50,
      setGlowIntensity: () => {},
    };
  }
  return context;
}
