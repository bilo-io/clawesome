'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Check local storage or system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('clawesome-theme') as Theme;
      if (savedTheme) {
        setTheme(savedTheme);
      } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        setTheme('light');
      }
    }
  }, []);

  const setThemeAndSave = (newTheme: Theme) => {
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('clawesome-theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setThemeAndSave(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeAndSave, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useUI() {
  const context = useContext(ThemeContext);
  if (!context) {
    // Return a default if not in provider, to avoid breaking in some environments
    return { 
        theme: 'dark' as Theme, 
        setTheme: (_: Theme) => {}, 
        toggleTheme: () => {} 
    };
  }
  return context;
}
