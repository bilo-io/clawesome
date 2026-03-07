'use client';

import React from 'react';
import { TopBar } from './TopBar';
import { LeftSidebar } from './LeftSidebar';
import { useUI } from '@clawesome/ui';

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useUI();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  
  return (
    <div className={`min-h-[100dvh] flex flex-col transition-colors ${theme === 'dark' ? 'bg-[#020617] text-white' : 'bg-white text-slate-900'}`}>
      <TopBar onMenuClick={() => setIsSidebarOpen(true)} />
      <div className="flex max-w-[90rem] mx-auto w-full flex-1">
        <LeftSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1 w-full min-w-0 pb-16 pt-8 md:pl-64">
          <article className="max-w-4xl mx-auto px-4 sm:px-8 xl:px-16 w-full pt-16 md:pt-0">
             {children}
          </article>
        </main>
      </div>
    </div>
  );
}
