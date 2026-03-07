// apps/dashboard/src/app/layout.tsx
'use client';
import React from 'react';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { BottomDock } from "@/components/BottomDock";
import { WorkspaceTabs } from "@/components/WorkspaceTabs";
import { AILab } from "@/components/AILab";
import { CommandModal } from "@/components/CommandModal";
import { useUIStore } from "@/store/useUIStore";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme, themePreference, setTheme, glowIntensity } = useUIStore();

  React.useEffect(() => {
    const handleSystemChange = () => {
      if (themePreference === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(isDark ? 'dark' : 'light');
      }
    };

    if (themePreference === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', handleSystemChange);
      handleSystemChange();
      return () => mediaQuery.removeEventListener('change', handleSystemChange);
    } else {
      setTheme(themePreference);
    }
  }, [themePreference, setTheme]);

  return (
    <html 
      lang="en" 
      className={theme}
      style={{ 
        '--glow-opacity': glowIntensity / 100,
        '--glow-blur': `${glowIntensity * 1.5}px`,
        '--glow-spread': `${glowIntensity / 2}px`,
        '--glow-primary': theme === 'dark' ? 'rgba(99, 102, 241, 1)' : 'rgba(79, 70, 229, 1)',
      } as React.CSSProperties}
    >
      <head>
        <title>Clawesome Dashboard | Command Your AI Swarm</title>
        <meta name="description" content="The Clawesome OS control panel — orchestrate autonomous AI agents, monitor swarm activity, manage memories, and configure your neural workspace." />

        {/* Favicon / App Icon */}
        <link rel="icon" href="/clawesome-icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/clawesome-icon.svg" />
        <link rel="shortcut icon" href="/clawesome-icon.svg" />

        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://app.clawesome.app" />
        <meta property="og:site_name" content="Clawesome Dashboard" />
        <meta property="og:title" content="Clawesome Dashboard | Command Your AI Swarm" />
        <meta property="og:description" content="Orchestrate autonomous AI agents, monitor swarm activity, and manage your neural workspace — all from one control panel." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Clawesome Dashboard — AI Swarm Command Center" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Clawesome Dashboard | Command Your AI Swarm" />
        <meta name="twitter:description" content="Orchestrate autonomous AI agents, monitor swarm activity, and manage your neural workspace." />
        <meta name="twitter:image" content="/og-image.png" />
      </head>
      <body className={cn(
        geistSans.variable, 
        geistMono.variable, 
        "antialiased flex h-screen overflow-hidden transition-colors duration-300",
        theme === 'dark' ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900"
      )}>
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 relative">
          <WorkspaceTabs />
          <main className="flex-1 overflow-auto p-8 no-scrollbar">
            {children}
          </main>
          <AILab />
          <CommandModal />
          <BottomDock />
        </div>
      </body>
    </html>
  );
}
