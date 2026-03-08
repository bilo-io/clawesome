// apps/dashboard/src/components/Sidebar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Zap,
  LayoutDashboard,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Bot,
  BrainCircuit,
  MessageCircle,
  Shield,
  Cpu,
  BarChart3,
  ListTodo,
  Plug,
  Brain,
  FolderKanban,
  Sliders,
  Settings,
  Blocks,
  Workflow
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';
import { useProfileStore } from '@/store/useProfileStore';
import { cn } from '@/lib/utils';

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
  status?: 'active';
}

interface SidebarCategory {
  title: string;
  items: SidebarItem[];
}

export const Sidebar = () => {
  const pathname = usePathname();
  const { 
    isSidebarExpanded, 
    toggleSidebar, 
    glowIntensity,
    theme,
    isMobileSidebarOpen,
    toggleMobileSidebar
  } = useUIStore();
  const { name, clearanceLevel } = useProfileStore();

  const [openCategories, setOpenCategories] = useState<string[]>(['AI', 'OPS', 'Sys']);

  const toggleCategory = (title: string) => {
    setOpenCategories(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title) 
        : [...prev, title]
    );
  };

  const categories: SidebarCategory[] = [
    {
      title: 'AI',
      items: [
        { icon: Bot, label: 'Agents', href: '/agents' },
        { icon: BrainCircuit, label: 'Swarms', href: '/swarms' },
        { icon: Blocks, label: 'Skills', href: '/skills' },
        { icon: Brain, label: 'Memories', href: '/memory' },
        { icon: FolderKanban, label: 'Projects', href: '/projects' },
        { icon: Workflow, label: 'Workflows', href: '/workflows' },
      ]
    },
    {
      title: 'OPS',
      items: [
        { icon: MessageCircle, label: 'Chats', status: 'active', href: '/chat' },
        { icon: ListTodo, label: 'Logs', href: '/logs' },
        { icon: BarChart3, label: 'Usage', href: '/usage' },
        { icon: Cpu, label: 'Analytics', href: '/analytics' },
      ]
    },
    {
      title: 'Sys',
      items: [
        { icon: Sliders, label: 'Config', href: '/config' },
        { icon: Plug, label: 'Integrations', href: '/integrations' },
        { icon: Settings, label: 'Settings', href: '/settings' },
        { icon: Shield, label: 'Security', href: '/security' },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => toggleMobileSidebar(false)}
          />
        )}
      </AnimatePresence>

      <aside 
        className={cn(
          "h-screen transition-all duration-300 flex flex-col z-50 border-r shadow-2xl",
          "fixed md:relative",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          theme === 'dark' ? "bg-slate-950 border-slate-900" : "bg-white border-slate-200",
          isSidebarExpanded ? "w-64" : "w-20"
        )}
      >
      <div className={cn(
        "p-6 border-b",
        theme === 'dark' ? "border-slate-900 bg-black/20" : "border-slate-100 bg-slate-50/50"
      )}>
        <Link href="/" className="flex items-center overflow-hidden">
          <AnimatePresence mode="wait">
            {isSidebarExpanded ? (
              <motion.img
                key="full-logo"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                src="/clawesome-logo.svg"
                alt="Clawesome"
                className="h-8 w-auto"
              />
            ) : (
              <motion.div
                key="mini-logo-container"
                className="w-full flex justify-center"
              >
                <motion.img
                  key="mini-logo"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  src="/clawesome-icon.svg"
                  alt="Clawesome"
                  className="h-8 w-8"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 space-y-4 no-scrollbar px-4">
        {/* Dashboard - standalone at top, no category */}
        <div className="flex flex-col">
          <Link
            href="/"
            className={cn(
              "group relative flex items-center gap-3 py-2 px-3 rounded-full cursor-pointer transition-all border",
              pathname === '/' 
                ? (theme === 'dark' ? "bg-indigo-600/10 border-indigo-500/30 text-white" : "bg-indigo-50 border-indigo-200 shadow-sm text-indigo-700") 
                : (theme === 'dark' ? "hover:bg-slate-900 border-transparent hover:border-slate-800 text-slate-400 hover:text-white" : "hover:bg-slate-50 border-transparent hover:border-slate-200 text-slate-600 hover:text-slate-950")
            )}
          >
            <LayoutDashboard 
              size={20} 
              className={cn(
                "transition-colors shrink-0",
                pathname === '/' 
                  ? "text-indigo-500" 
                  : (theme === 'dark' ? "text-slate-500 group-hover:text-indigo-400" : "text-slate-500 group-hover:text-indigo-600")
              )} 
            />
            {isSidebarExpanded && (
              <span className={cn(
                "text-sm font-semibold transition-colors truncate",
                pathname === '/' 
                  ? (theme === 'dark' ? "text-white" : "text-indigo-700") 
                  : (theme === 'dark' ? "text-slate-400 group-hover:text-white" : "text-slate-700 group-hover:text-black")
              )}>
                Dashboard
              </span>
            )}
          </Link>
        </div>

        {categories.map((category) => {
          const isOpen = openCategories.includes(category.title);
          
          return (
            <div key={category.title} className="flex flex-col">
              {/* Category Header */}
              {isSidebarExpanded && (
                <button
                  onClick={() => toggleCategory(category.title)}
                  className={cn(
                    "flex items-center justify-between w-full px-2 py-1.5 text-xs font-bold uppercase tracking-[0.2em] transition-colors group mb-1 text-left",
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

              {/* Category Items */}
              <AnimatePresence initial={false}>
                {(isOpen || !isSidebarExpanded) && (
                  <motion.div
                    initial={isSidebarExpanded ? { height: 0, opacity: 0 } : undefined}
                    animate={isSidebarExpanded ? { height: 'auto', opacity: 1 } : undefined}
                    exit={isSidebarExpanded ? { height: 0, opacity: 0 } : undefined}
                    className="space-y-1"
                  >
                    {category.items.map((item) => {
                      const isActive = pathname === item.href;
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
                          
                          {isSidebarExpanded && (
                            <div className="flex-1 flex items-center justify-between min-w-0">
                              <span className={cn(
                                "text-sm font-semibold transition-colors truncate",
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

                          {!isSidebarExpanded && item.status === 'active' && (
                            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
                          )}

                          {/* Glow Overlay */}
                          <div 
                            className={cn(
                              "absolute inset-0 rounded-full opacity-0 transition-opacity blur-md -z-10",
                              isActive ? "opacity-10" : "group-hover:opacity-10",
                              theme === 'dark' ? "bg-indigo-500" : "bg-indigo-400"
                            )}
                            style={{ 
                              filter: `blur(calc(var(--glow-blur) / 10))` 
                            }}
                          />
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
        "p-4 border-t",
        theme === 'dark' ? "border-slate-900 bg-black/20" : "border-slate-100 bg-slate-50/50"
      )}>
        <Link 
          href="/profile"
          className={cn(
            "mb-4 p-4 rounded-2xl transition-all block group/profile",
            theme === 'dark' ? "bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50" : "bg-white border border-slate-200 shadow-sm hover:border-indigo-500",
            isSidebarExpanded ? 'opacity-100' : 'opacity-0 scale-95 pointer-events-none absolute'
          )}
        >
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border border-white/10 flex items-center justify-center text-[10px] font-black italic text-white shadow-lg">
                {name.charAt(0)}
             </div>
             <div className="flex flex-col">
                 <span className={cn("text-xs font-bold transition-colors group-hover/profile:text-indigo-500", theme === 'dark' ? "text-white" : "text-black")}>{name}</span>
                <span className="text-[10px] text-indigo-500 font-mono text-nowrap font-bold">{clearanceLevel}</span>
             </div>
          </div>
        </Link>

        <button 
          onClick={toggleSidebar}
          className={cn(
            "w-full flex items-center justify-center p-2 rounded-xl border transition-all hover:scale-[1.02] active:scale-95",
            theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-500 hover:text-indigo-600"
          )}
        >
          {isSidebarExpanded ? (
            <div className="flex items-center gap-2">
              <ChevronLeft size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">Collapse Sidebar</span>
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
