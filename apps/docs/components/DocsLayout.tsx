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
    <div className={`min-h-[100dvh] flex flex-col transition-colors ${theme === 'dark' ? 'bg-[#020617] text-white' : 'bg-white text-slate-900'}`}>
      <TopBar 
        onMenuClick={() => setIsSidebarOpen(true)} 
        LinkComponent={Link} 
        ImageComponent={Image}
      />
      <div className="flex w-full flex-1 relative">
        <LeftSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          pathname={pathname}
          LinkComponent={Link}
        />
        <main className="flex-1 w-full min-w-0 pb-16 pt-8 md:pl-72">
          <article className="max-w-4xl mx-auto px-4 sm:px-8 xl:px-16 w-full pt-16 md:pt-0">
             {children}
          </article>
        </main>
      </div>
    </div>
  );
}
