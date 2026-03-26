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
      const getInitialTheme = (): Theme => {
        const savedTheme = localStorage.getItem('clawesome-theme') as Theme;
        if (savedTheme) return savedTheme;
        if (document.documentElement.classList.contains('dark')) return 'dark';
        if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
        return 'dark'; // Default to dark
      };

      setTheme(getInitialTheme());

      // Watch for class changes on document.documentElement (e.g. from the app's toggle)
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const isDark = document.documentElement.classList.contains('dark');
            setTheme(isDark ? 'dark' : 'light');
          }
        });
      });

      observer.observe(document.documentElement, { attributes: true });
      return () => observer.disconnect();
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
    // If no provider is found, try to detect theme from document element (client-side only)
    let detectedTheme: Theme = 'dark';
    if (typeof window !== 'undefined') {
      detectedTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    
    return { 
        theme: detectedTheme, 
        setTheme: (_: Theme) => {}, 
        toggleTheme: () => {} 
    };
  }
  return context;
}
