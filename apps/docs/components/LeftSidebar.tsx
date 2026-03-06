'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import { useUI } from '@clawesome/ui';

export function LeftSidebar() {
  const { theme } = useUI();
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Introduction' },
    { href: '/installation', label: 'Installation' },
    { href: '/cli', label: 'CLI Reference' },
    { href: '/architecture', label: 'Architecture' },
    { href: '/components', label: 'Components' },
    { href: '/resources', label: 'Resources & MCPs' },
    { href: '/releases', label: 'Release Notes' },
  ];

  return (
    <aside className={`fixed top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] border-r transition-colors overflow-y-auto hidden md:block ${theme === 'dark' ? 'border-slate-800 bg-[#020617]' : 'border-slate-200 bg-slate-50'}`}>
      <div className="p-6 space-y-6">
        <div className={`relative flex items-center p-2 rounded-xl transition-colors ${theme === 'dark' ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-slate-200 shadow-sm'}`}>
          <Search size={16} className={`ml-2 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`} />
          <input 
            type="text" 
            placeholder="Search docs..." 
            className={`w-full bg-transparent px-3 py-1 text-sm outline-none ${theme === 'dark' ? 'text-white placeholder:text-slate-600' : 'text-black placeholder:text-slate-400'}`}
          />
        </div>

        <nav className="space-y-1">
          {links.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href}
                href={link.href}
                className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive 
                    ? (theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400 font-bold' : 'bg-indigo-50 text-indigo-600 font-bold')
                    : (theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-900/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100')
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
