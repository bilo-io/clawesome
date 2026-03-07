// apps/dashboard/src/components/WorkspaceTabs.tsx
'use client';

import React from 'react';
import { useUIStore } from '@/store/useUIStore';
import { useInstanceStore } from '@/store/useInstanceStore';
import { Plus, X, Command as CommandIcon, Menu, Monitor, Server, Database, Cloud, Zap, Terminal as TerminalIcon, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const WorkspaceTabs = () => {
  const { isFocusMode, theme, toggleMobileSidebar, setInstanceWizardOpen } = useUIStore();
  const { instances, activeInstanceId, setActiveInstance, removeInstance } = useInstanceStore();

  const getIcon = (type: string) => {
    switch(type) {
      case 'local': return <Monitor size={12} />;
      case 'server': return <Server size={12} />;
      case 'docker': return <Database size={12} />;
      case 'clawesome': return <Zap size={12} />;
      case 'cloud': return <Cloud size={12} />;
      default: return <Monitor size={12} />;
    }
  };

  if (isFocusMode) return null;

  return (
    <div className={cn(
      "flex items-center gap-1 border-b transition-colors px-4 pb-0 items-end overflow-x-auto no-scrollbar min-h-[56px]",
      theme === 'dark' ? "bg-slate-950 border-slate-900 shadow-xl" : "bg-slate-50/50 border-slate-200 shadow-sm"
    )}>
      <button 
        onClick={() => toggleMobileSidebar()}
        className={cn(
          "md:hidden p-2 -ml-2 mb-3 rounded-lg transition-colors",
          theme === 'dark' ? "text-slate-500 hover:text-white hover:bg-slate-900" : "text-slate-400 hover:text-slate-900 hover:bg-slate-100"
        )}
      >
        <Menu size={20} />
      </button>

      <Link 
        href="/command-center"
        className={cn(
          "flex h-full items-end pb-4 mr-2 transition-all hover:text-indigo-500 hover:scale-110",
          theme === 'dark' ? "text-slate-500" : "text-slate-400"
        )}
      >
        <CommandIcon size={14} className="opacity-50" />
      </Link>

      <Link 
        href="/terminal"
        className={cn(
          "flex h-full items-end pb-4 mr-2 transition-all hover:text-indigo-500 hover:scale-110",
          theme === 'dark' ? "text-slate-500" : "text-slate-400"
        )}
      >
        <TerminalIcon size={14} className="opacity-50" />
      </Link>

      <Link 
        href="/profile"
        className={cn(
          "flex h-full items-end pb-4 mr-6 transition-all hover:text-indigo-500 hover:scale-110",
          theme === 'dark' ? "text-slate-500" : "text-slate-400"
        )}
      >
        <User size={14} className="opacity-50" />
      </Link>

      {instances.map((ws) => {
        const isActive = activeInstanceId === ws.id;
        return (
          <button
            key={ws.id}
            onClick={() => setActiveInstance(ws.id)}
            className={cn(
              "px-5 h-11 flex items-center gap-4 transition-all relative whitespace-nowrap group rounded-t-xl mb-0 translate-y-px border-l border-r border-t font-extrabold pr-9",
              isActive 
                ? (theme === 'dark' ? 'bg-slate-900 text-indigo-400 border-slate-800 shadow-2xl' : 'bg-white text-indigo-600 border-slate-200 shadow-sm') 
                : (theme === 'dark' ? 'text-slate-600 hover:text-slate-300 border-transparent hover:border-slate-800' : 'text-slate-400 hover:text-slate-600 border-transparent hover:border-slate-100')
            )}
          >
            <div className={cn("opacity-40 group-hover:opacity-100 transition-opacity", isActive && "opacity-100")}>{getIcon(ws.type)}</div>
            <span className="text-[10px] uppercase font-black tracking-[0.2em]">{ws.name}</span>
            {isActive && (
               <div className="absolute top-0 left-0 right-0 h-0.5 bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
            )}
            {ws.id !== 'local' && (
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  removeInstance(ws.id);
                }}
                className={cn(
                  "absolute right-2 px-1 transition-all hover:bg-rose-500 hover:text-white rounded-md",
                  isActive ? "opacity-30 group-hover:opacity-100" : "opacity-0 group-hover:opacity-40"
                )} 
              >
                <X size={10} />
              </div>
            )}
          </button>
        );
      })}
      
      <button 
        onClick={() => setInstanceWizardOpen(true)}
        className={cn(
          "px-4 h-11 flex items-center justify-center transition-all translate-y-px",
          theme === 'dark' ? "text-slate-700 hover:text-indigo-500" : "text-slate-300 hover:text-indigo-600"
        )}
      >
        <Plus size={18} />
      </button>
    </div>
  );
};
