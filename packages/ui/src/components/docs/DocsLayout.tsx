// @ts-nocheck
'use client';
/* SHOWCASE_MOCKS_START */
// @ts-ignore
const Link = (props: any) => <a href={props.href} {...props}>{props.children}</a>;
// @ts-ignore
const Image = (props: any) => <img src={props.src} alt={props.alt} {...props} />;
// @ts-ignore
const usePathname = () => "";
// @ts-ignore
const useSearchParams = () => new URLSearchParams();
// @ts-ignore
const useTheme = () => ({ theme: 'dark', setTheme: () => {} });
/* SHOWCASE_MOCKS_END */






import React from 'react';
import { TopBar } from './TopBar';
import { LeftSidebar } from './LeftSidebar';
import { useUI } from '../../ThemeContext';

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useUI();
  
  return (
    <div className={`min-h-[100dvh] flex flex-col transition-colors ${theme === 'dark' ? 'bg-[#020617] text-white' : 'bg-white text-slate-900'}`}>
      <TopBar />
      <div className="flex max-w-[90rem] mx-auto w-full flex-1">
        <LeftSidebar />
        <main className="flex-1 w-full min-w-0 pb-16 pt-8 md:pl-64">
          <article className="max-w-4xl mx-auto px-8 xl:px-16 w-full">
             {children}
          </article>
        </main>
      </div>
    </div>
  );
}
