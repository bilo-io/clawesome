'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useUI } from '../../ThemeContext';
import { Github, Moon, Sun } from 'lucide-react';

export function TopBar() {
  const { theme, setTheme } = useUI();

  return (
    <header className={`sticky top-0 z-50 w-full border-b backdrop-blur transition-colors ${theme === 'dark' ? 'bg-[#020617]/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
      <div className="flex h-16 items-center px-6 gap-4 justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/clawesome-logo.svg" alt="Clawesome" width={160} height={32} className="dark:invert-0" />
            <span className={`font-black text-xl tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
              style={{ fontFamily: "'Newton Howard Font', sans-serif", fontStyle: 'italic' }}
            >Docs</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className={`${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'} transition-colors`}>Documentation</Link>
            <Link href="/resources" className={`${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'} transition-colors`}>Resources</Link>
          </nav>
          
          <div className="flex items-center gap-4 border-l pl-6 border-slate-200 dark:border-slate-800">
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={`${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'} transition-colors`}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a href="https://github.com/bilo-io/clawesome" target="_blank" rel="noreferrer" className={`${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'} transition-colors`}>
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
