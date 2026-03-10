'use client';

import React from 'react';
import { LeftSidebar, useUI, TopBar } from '@clawesome/ui';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useUI();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const pathname = usePathname();
  
  return (
    <div className={`h-screen flex flex-col transition-colors duration-500 overflow-hidden ${theme === 'dark' ? 'bg-[#020617]' : 'bg-white'}`}>
      {/* 
          PRIMARY NAVIGATION:
          Fixed/Sticky at the very top. 
      */}
      <TopBar 
        onMenuClick={() => setIsSidebarOpen(true)} 
        LinkComponent={Link} 
        ImageComponent={Image}
      />
      
      {/* 
          MAIN CONTENT AREA:
          A horizontal flex container that holds the FIXED sidebar and SCROLLABLE content.
          max-w-[1600px] ensures it doesn't get ridiculously wide on large monitors.
      */}
      <div className="flex-1 flex w-full max-w-[1700px] mx-auto relative overflow-hidden">
        
        {/* 
            LEFT SIDEBAR:
            - Desktop: Static pillar, w-72, shrink-0.
            - Mobile: Animated Drawer.
        */}
        <LeftSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          pathname={pathname}
          LinkComponent={Link}
        />
        
        {/* 
            ARTICLE VIEWPORT:
            This is the ONLY part of the page that scrolls. 
            It is sibling to the sidebar, so they naturally sit side-by-side.
        */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar scroll-smooth">
          <div className="flex flex-col items-center">
            <article className="w-full max-w-4xl px-6 py-12 lg:px-12 xl:px-16 min-h-[calc(100vh-10rem)]">
               {children}
            </article>
            
            {/* Standard Docs Footer - Integrated within Main Scroller */}
            <footer className="w-full max-w-4xl px-6 lg:px-12 py-10 border-t border-slate-100 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-10">
               <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded flex items-center justify-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">C</div>
                  <span>© 2026 Clawesome OS — Standardized Documentation Engine</span>
               </div>
               <div className="flex gap-10">
                  <a href="#" className="hover:text-indigo-500 transition-colors">Github</a>
                  <a href="#" className="hover:text-indigo-500 transition-colors">Privacy</a>
                  <a href="#" className="hover:text-indigo-500 transition-colors">Security</a>
               </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
