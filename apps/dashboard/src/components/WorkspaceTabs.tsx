// apps/dashboard/src/components/WorkspaceTabs.tsx
'use client';

import React from 'react';
import { useUIStore } from '@/store/useUIStore';
import { Plus, X, Command as CommandIcon, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const workspaces = [
  { id: 'default', title: 'Local', type: 'system' },
  { id: 'sandbox1', title: 'Sandbox 1', type: 'app' },
  { id: 'sandbox2', title: 'Sandbox 2', type: 'app' },
];

export const WorkspaceTabs = () => {
  const { activeWorkspaceId, setActiveWorkspace, isFocusMode, theme, toggleMobileSidebar } = useUIStore();

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

      <div className={cn(
        "flex h-full items-end",
        theme === 'dark' ? "text-slate-500" : "text-slate-400"
      )}>
        <CommandIcon size={14} className="mb-4 mr-2 opacity-50" />
      </div>

      {workspaces.map((ws) => {
        const isActive = activeWorkspaceId === ws.id;
        return (
          <button
            key={ws.id}
            onClick={() => setActiveWorkspace(ws.id)}
            className={cn(
              "px-6 h-11 flex items-center gap-4 transition-all relative whitespace-nowrap group rounded-t-xl mb-0 translate-y-px border-l border-r border-t font-bold",
              isActive 
                ? (theme === 'dark' ? 'bg-slate-900 text-indigo-400 border-slate-800 shadow-2xl' : 'bg-white text-indigo-600 border-slate-200 shadow-sm') 
                : (theme === 'dark' ? 'text-slate-600 hover:text-slate-300 border-transparent hover:border-slate-800' : 'text-slate-400 hover:text-slate-600 border-transparent hover:border-slate-100')
            )}
          >
            <span className="text-[10px] uppercase tracking-[0.2em]">{ws.title}</span>
            {isActive && (
               <div className="absolute top-0 left-0 right-0 h-0.5 bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
            )}
            <X 
              size={12} 
              className={cn(
                "opacity-0 transition-opacity hover:text-rose-500",
                isActive ? "opacity-30 group-hover:opacity-100" : "group-hover:opacity-40"
              )} 
            />
          </button>
        );
      })}
      
      <button className={cn(
        "px-4 h-11 flex items-center justify-center transition-all translate-y-px",
        theme === 'dark' ? "text-slate-700 hover:text-indigo-500" : "text-slate-300 hover:text-indigo-600"
      )}>
        <Plus size={18} />
      </button>
    </div>
  );
};
