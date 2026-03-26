'use client';

import React from 'react';
import { User, Trash2 } from 'lucide-react';
import { useUI } from '../ThemeContext';
import { cn } from '../utils';
import type { Agent } from '../types';

interface AgentCardProps {
  agent: Agent;
  viewMode: 'grid' | 'table';
  onDelete?: (id: string) => void;
  onClick?: () => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ 
  agent, 
  viewMode, 
  onDelete,
  onClick
}) => {
  const { theme } = useUI();

  if (viewMode === 'table') {
    return (
      <div 
        onClick={onClick}
        className={cn(
          "group p-4 rounded-2xl border flex items-center justify-between transition-all w-full cursor-pointer",
          theme === 'dark' 
            ? "bg-slate-900/40 border-slate-800/60 hover:bg-slate-900 hover:border-indigo-500/30" 
            : "bg-white border-slate-100 shadow-xl shadow-slate-200/20 hover:border-indigo-200"
        )}
      >
        <div className="flex items-center gap-6">
          <div className={cn(
             "w-12 h-12 rounded-full overflow-hidden border shadow-lg transition-transform group-hover:scale-105",
             theme === 'dark' ? "bg-slate-800 border-slate-700 shadow-black/40" : "bg-white border-slate-200 shadow-sm"
          )}>
            {agent.profilePicture ? (
              <img src={agent.profilePicture} alt={agent.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <User size={20} />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <h3 className={cn("text-lg font-black uppercase tracking-tight", theme === 'dark' ? "text-white" : "text-slate-900")}>
              {agent.name}
            </h3>
            <div className="flex items-center gap-3">
              <span className={cn("text-[9px] font-bold uppercase tracking-widest", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>
                {agent.title}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-700" />
              <span className={cn("text-[9px] font-mono font-bold text-indigo-500", theme === 'dark' ? "opacity-60" : "opacity-80")}>
                #{agent.id.slice(0, 8)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-12 mr-6 text-right">
          <div className="hidden sm:flex flex-col items-end">
            <span className={cn("text-[8px] font-black uppercase tracking-widest mb-1", theme === 'dark' ? "text-slate-700" : "text-slate-400")}>
              Deployment Date
            </span>
            <span className={cn("text-xs font-mono font-black", theme === 'dark' ? "text-slate-500" : "text-slate-900")}>
              {new Date(agent.createdAt).toLocaleDateString().toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(agent.id);
              }}
              className={cn(
                "p-3 rounded-2xl transition-all border",
                theme === 'dark' ? "bg-slate-800/50 border-slate-800 text-slate-500 hover:text-rose-400" : "bg-slate-50 border-slate-100 text-slate-400 hover:text-rose-600 shadow-sm"
              )}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative rounded-2xl p-8 transition-all border shadow-xl flex flex-col h-full cursor-pointer",
        theme === 'dark' 
          ? "bg-[#0A0C14] border-slate-800/60 shadow-2xl shadow-black/40 hover:border-indigo-500/30" 
          : "bg-white border-slate-100 shadow-slate-200/40 hover:border-indigo-200 hover:shadow-2xl"
      )}
    >
      <div className="flex justify-between items-start mb-8">
        <div className={cn(
           "w-20 h-20 rounded-full overflow-hidden border shadow-2xl transition-all group-hover:scale-110 group-hover:rotate-2",
           theme === 'dark' ? "bg-slate-800 border-slate-700 shadow-black/40" : "bg-slate-50 border-white shadow-slate-200/50"
        )}>
          {agent.profilePicture ? (
            <img src={agent.profilePicture} alt={agent.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400/50">
              <User size={36} />
            </div>
          )}
        </div>
        <div className="flex gap-2.5">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(agent.id);
            }}
            className={cn(
              "p-3 rounded-full transition-all border",
              theme === 'dark' ? "bg-slate-800/50 border-slate-800 text-slate-500 hover:text-rose-400" : "bg-slate-50 border-slate-100 text-slate-400 hover:text-rose-600 shadow-sm"
            )}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1">
        <h3 className={cn(
          "text-2xl font-bold transition-colors mb-2",
          theme === 'dark' ? "text-white group-hover:text-indigo-400" : "text-slate-900 group-hover:text-indigo-600"
        )}>
          {agent.name}
        </h3>
        <p className={cn(
          "text-sm font-bold tracking-tight mb-6 uppercase tracking-widest",
          theme === 'dark' ? "text-slate-600" : "text-slate-400"
        )}>
          {agent.title}
        </p>
      </div>

      <div className={cn(
        "pt-6 border-t flex items-center justify-between",
        theme === 'dark' ? "border-slate-800/50" : "border-slate-100"
      )}>
        <span className={cn(
          "text-[9px] font-bold uppercase tracking-[0.2em] font-mono",
          theme === 'dark' ? "text-slate-700" : "text-slate-500"
        )}>
          #{agent.id.slice(0, 8)}
        </span>
        <div className="flex -space-x-2.5">
           <div className="w-6 h-6 rounded-full border-2 border-slate-900 bg-indigo-500 shadow-sm" />
           <div className="w-6 h-6 rounded-full border-2 border-slate-900 bg-purple-500 shadow-sm opacity-60" />
        </div>
      </div>
    </div>
  );
};
