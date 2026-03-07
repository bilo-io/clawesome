'use client';

import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils';
import { useUI } from '../ThemeContext';

export interface SidebarItem {
  icon: any; // React Component
  label: string;
  href: string;
  status?: 'active';
}

export interface SidebarCategory {
  title: string;
  items: SidebarItem[];
}

export interface SidebarProps {
  categories: SidebarCategory[];
  currentPath: string;
  isExpanded: boolean;
  onToggle: () => void;
  /** Mobile drawer open state */
  isMobileOpen?: boolean;
  /** Toggle mobile drawer */
  onMobileToggle?: () => void;
  logoFull?: string;
  logoMini?: string;
  user?: {
    name: string;
    clearance: string;
    avatar?: string;
  };
  LinkComponent?: React.ElementType;
}

export const Sidebar = ({
  categories,
  currentPath,
  isExpanded,
  onToggle,
  isMobileOpen = false,
  onMobileToggle,
  logoFull,
  logoMini,
  user,
  LinkComponent = 'a'
}: SidebarProps) => {
  const { theme } = useUI();
  const [openCategories, setOpenCategories] = useState<string[]>(categories.map(c => c.title));

  const toggleCategory = (title: string) => {
    setOpenCategories(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title) 
        : [...prev, title]
    );
  };

  const Link = LinkComponent;

  return (
    <>
      {/* ── Mobile backdrop ─────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={onMobileToggle}
          />
        )}
      </AnimatePresence>

      <aside 
        className={cn(
          "h-screen transition-all duration-300 flex flex-col z-50 border-r shadow-2xl shrink-0 overflow-hidden",
          // Mobile: fixed drawer sliding in from left
          "fixed md:relative",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          theme === 'dark' ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200",
          isExpanded ? "w-64" : "w-20",
          // On mobile always full‑width sidebar when open
          "md:w-auto",
        )}
      >
      <div className={cn(
        "p-6 border-b shrink-0",
        theme === 'dark' ? "border-slate-900 bg-black/20" : "border-slate-100 bg-slate-50/50"
      )}>
        <Link href="/" className="flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="full-logo"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="h-8 w-full flex items-center justify-start overflow-hidden"
              >
                {logoFull ? (
                   <img src={logoFull} alt="Clawesome" className="h-full w-auto" />
                ) : (
                  <span className="font-black text-xl tracking-tighter uppercase whitespace-nowrap">Clawesome</span>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="mini-logo-container"
                className="w-full flex justify-center"
              >
                {logoMini ? (
                   <img src={logoMini} alt="Clawesome" className="h-8 w-8" />
                ) : (
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black">C</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 space-y-4 no-scrollbar px-4 pb-20">
        {categories.map((category) => {
          const isOpen = openCategories.includes(category.title);
          
          return (
            <div key={category.title} className="flex flex-col">
              {isExpanded && (
                <button
                  onClick={() => toggleCategory(category.title)}
                  className={cn(
                    "flex items-center justify-between w-full px-2 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] transition-colors group mb-1 text-left",
                    theme === 'dark' ? "text-slate-600 hover:text-slate-300" : "text-slate-700 hover:text-black"
                  )}
                >
                  <span className="truncate">{category.title}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={14} />
                  </motion.div>
                </button>
              )}

              <AnimatePresence initial={false}>
                {(isOpen || !isExpanded) && (
                  <motion.div
                    initial={isExpanded ? { height: 0, opacity: 0 } : undefined}
                    animate={isExpanded ? { height: 'auto', opacity: 1 } : undefined}
                    exit={isExpanded ? { height: 0, opacity: 0 } : undefined}
                    className="space-y-1 overflow-hidden"
                  >
                    {category.items.map((item) => {
                      const isActive = currentPath === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "group relative flex items-center gap-3 py-2 px-3 rounded-full cursor-pointer transition-all border",
                            isActive 
                              ? (theme === 'dark' ? "bg-indigo-600/10 border-indigo-500/30 text-white" : "bg-indigo-50 border-indigo-200 shadow-sm text-indigo-700") 
                              : (theme === 'dark' ? "hover:bg-slate-900 border-transparent hover:border-slate-800 text-slate-400 hover:text-white" : "hover:bg-slate-50 border-transparent hover:border-slate-200 text-slate-600 hover:text-slate-950")
                          )}
                        >
                          <item.icon 
                            size={20} 
                            className={cn(
                              "transition-colors shrink-0",
                              isActive 
                                ? "text-indigo-500" 
                                : (theme === 'dark' ? "text-slate-500 group-hover:text-indigo-400" : "text-slate-500 group-hover:text-indigo-600")
                            )} 
                          />
                          
                          {isExpanded && (
                            <div className="flex-1 flex items-center justify-between min-w-0">
                              <span className={cn(
                                "text-sm font-black transition-colors truncate tracking-tight",
                                isActive 
                                  ? (theme === 'dark' ? "text-white" : "text-indigo-700") 
                                  : (theme === 'dark' ? "text-slate-400 group-hover:text-white" : "text-slate-700 group-hover:text-black")
                              )}>
                                {item.label}
                              </span>
                              {item.status === 'active' && (
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
                              )}
                            </div>
                          )}

                          {!isExpanded && item.status === 'active' && (
                            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
                          )}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      <div className={cn(
        "p-4 border-t shrink-0",
        theme === 'dark' ? "border-slate-900 bg-black/20" : "border-slate-100 bg-slate-50/50"
      )}>
        {user && isExpanded && (
          <div className={cn(
            "mb-4 p-4 rounded-3xl transition-all border shadow-inner",
            theme === 'dark' ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"
          )}>
            <div className="flex items-center gap-3">
               <div className={cn(
                 "w-10 h-10 rounded-full border border-white/10 overflow-hidden",
                 !user.avatar && "bg-gradient-to-tr from-indigo-500 to-purple-500"
               )}>
                  {user.avatar && <img src={user.avatar} className="w-full h-full object-cover" />}
               </div>
               <div className="flex flex-col">
                   <span className={cn("text-xs font-black tracking-tight", theme === 'dark' ? "text-white" : "text-black")}>{user.name}</span>
                  <span className="text-[9px] text-indigo-500 font-black uppercase tracking-[0.1em]">{user.clearance}</span>
               </div>
            </div>
          </div>
        )}

        <button 
          onClick={onToggle}
          className={cn(
            "w-full flex items-center justify-center p-3 rounded-2xl border transition-all hover:scale-[1.02] active:scale-95 shadow-sm",
            theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-500 hover:text-indigo-600"
          )}
        >
          {isExpanded ? (
            <div className="flex items-center gap-2">
              <ChevronLeft size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Collapse</span>
            </div>
          ) : (
            <ChevronRight size={18} />
          )}
        </button>
      </div>
    </aside>
    </>
  );
};
