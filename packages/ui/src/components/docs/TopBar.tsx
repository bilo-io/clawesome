'use client';

import React from 'react';
import { useUI } from '../../ThemeContext';
import { Github, Moon, Sun, Menu } from 'lucide-react';
import { cn } from '../../utils';

interface TopBarProps {
  onMenuClick?: () => void;
  LinkComponent?: React.ComponentType<any>;
  ImageComponent?: React.ComponentType<any>;
  logoSrc?: string;
  githubUrl?: string;
  docsTitle?: string;
}

export function TopBar({
  onMenuClick = () => {},
  LinkComponent = ({ children, ...props }) => <a {...props}>{children}</a>,
  ImageComponent = (props: any) => <img {...props} />,
  logoSrc = "/clawesome-logo.svg",
  githubUrl = "https://github.com/bilo-io/clawesome",
  docsTitle = "Docs"
}: TopBarProps) {
  const { theme, setTheme } = useUI();

  const Link = LinkComponent;
  const Image = ImageComponent;

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300",
      theme === 'dark' ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200"
    )}>
      <div className="flex h-16 items-center p-2 gap-4 justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onMenuClick}
            className={cn(
              "p-2 -ml-2 transition-colors block md:hidden",
              theme === 'dark' ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
            )}
          >
            <Menu size={24} />
          </button>
          <Link href="/" className="flex items-center gap-3">
            <Image src={logoSrc} alt="Clawesome" width={160} height={32} className="dark:invert-0" />
            <span className={cn(
              "font-black text-xl tracking-tight italic",
              theme === 'dark' ? "text-white" : "text-slate-900"
            )}
              style={{ fontFamily: "'Newton Howard Font', sans-serif" }}
            >
              {docsTitle}
            </span>
          </Link>
        </div>
        
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className={cn(
              "transition-colors",
              theme === 'dark' ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
            )}>Documentation</Link>
            <Link href="/resources" className={cn(
              "transition-colors",
              theme === 'dark' ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
            )}>Resources</Link>
          </nav>
          
          <div className={cn(
            "flex items-center gap-4 border-l pl-6",
            theme === 'dark' ? "border-slate-800" : "border-slate-200"
          )}>
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
              className={cn(
                "transition-colors",
                theme === 'dark' ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
              )}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noreferrer" 
              className={cn(
                "transition-colors",
                theme === 'dark' ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
              )}
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
