'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Users, 
  Calendar, 
  ArrowUpRight, 
  Clock, 
  Sparkles,
  Bot
} from 'lucide-react';
import { cn } from '../utils';
import { useUI } from '../ThemeContext';
import { AgentAvatarStack, type CouncilAgent } from './AgentAvatarStack';

export interface CouncilResourceCardProps {
  id: string;
  title: string;
  description: string;
  agents: CouncilAgent[];
  lastActive: string;
  messageCount: number;
  status: 'active' | 'archived' | 'concluded';
  onClick?: (id: string) => void;
  viewMode?: 'grid' | 'list';
}

export const CouncilResourceCard = ({
  id,
  title,
  description,
  agents,
  lastActive,
  messageCount,
  status,
  onClick,
  viewMode = 'grid'
}: CouncilResourceCardProps) => {
  const { theme } = useUI();
  const isDark = theme === 'dark';

  const statusColors = {
    active: 'bg-emerald-500',
    archived: 'bg-slate-500',
    concluded: 'bg-indigo-500'
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ x: 4 }}
        onClick={() => onClick?.(id)}
        className={cn(
          "group flex items-center justify-between p-5 rounded-3xl border transition-all cursor-pointer",
          isDark 
            ? "bg-slate-900 border-slate-800 hover:border-indigo-500/30 hover:bg-slate-800/60" 
            : "bg-white border-slate-200 hover:border-indigo-500 hover:bg-slate-50 shadow-sm"
        )}
      >
        <div className="flex items-center gap-6 flex-1 min-w-0">
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
            isDark ? "bg-slate-950 text-indigo-400" : "bg-indigo-50 text-indigo-600"
          )}>
            <Bot size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={cn("text-sm font-black tracking-tight truncate", isDark ? "text-white" : "text-slate-950")}>{title}</h3>
            <p className="text-[10px] font-bold text-slate-500 mt-1 truncate">{description}</p>
          </div>
        </div>

        <div className="flex items-center gap-10 px-8">
          <AgentAvatarStack agents={agents} size="sm" />
          
          <div className="flex flex-col items-end gap-1 min-w-[100px]">
            <div className="flex items-center gap-1.5 text-slate-500">
               <MessageCircle size={12} />
               <span className="text-[10px] font-black uppercase tracking-widest">{messageCount} msgs</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
               <Clock size={12} />
               <span className="text-[10px] font-black uppercase tracking-widest">{lastActive}</span>
            </div>
          </div>
        </div>

        <div className={cn(
          "flex items-center justify-center p-3 rounded-2xl transition-all group-hover:scale-110",
          isDark ? "bg-slate-950 text-slate-600 group-hover:text-white" : "bg-slate-100 text-slate-400 group-hover:text-indigo-600"
        )}>
          <ArrowUpRight size={20} />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={() => onClick?.(id)}
      className={cn(
        "group h-full flex flex-col p-6 rounded-[32px] border transition-all cursor-pointer relative overflow-hidden",
        isDark 
          ? "bg-slate-950 border-slate-900 shadow-2xl shadow-indigo-500/5 hover:border-indigo-500/40" 
          : "bg-white border-slate-200 shadow-xl shadow-slate-200/50 hover:border-indigo-500 hover:bg-slate-50/50"
      )}
    >
      {/* Status Badge */}
      <div className="absolute top-6 right-6 flex items-center gap-2">
         <span className={cn("w-2 h-2 rounded-full", statusColors[status])} />
         <span className={cn("text-[9px] font-black uppercase tracking-widest", isDark ? "text-slate-600" : "text-slate-400")}>{status}</span>
      </div>

      <div className={cn(
        "w-14 h-14 rounded-[22px] flex items-center justify-center mb-6",
        isDark ? "bg-slate-900 border border-slate-800 text-indigo-400" : "bg-indigo-50 border border-indigo-100 text-indigo-600"
      )}>
        <Bot size={32} />
      </div>

      <div className="flex-1">
        <h3 className={cn("text-lg font-black tracking-tight", isDark ? "text-white" : "text-slate-950")}>{title}</h3>
        <p className={cn("text-xs font-bold mt-2 line-clamp-2", isDark ? "text-slate-500" : "text-slate-400")}>{description}</p>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-900 flex flex-col gap-4">
        <div className="flex items-center justify-between">
           <span className={cn("text-[9px] font-black uppercase tracking-widest", isDark ? "text-slate-700" : "text-slate-300")}>Counselors</span>
           <AgentAvatarStack agents={agents} size="sm" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-slate-500">
               <MessageCircle size={12} />
               <span className="text-[10px] font-black uppercase tracking-widest">{messageCount}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-500">
               <Clock size={12} />
               <span className="text-[10px] font-black uppercase tracking-widest">{lastActive}</span>
            </div>
          </div>
          
          <div className={cn(
            "p-2 rounded-xl transition-all group-hover:bg-indigo-600 group-hover:text-white",
            isDark ? "bg-slate-900 text-slate-700" : "bg-slate-50 text-slate-400"
          )}>
            <ArrowUpRight size={16} />
          </div>
        </div>
      </div>

      {/* Hover Gradient Overlay */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none -z-10",
        isDark ? "bg-gradient-to-br from-indigo-500 to-purple-500" : "bg-gradient-to-br from-indigo-400 to-purple-400"
      )} />
    </motion.div>
  );
};
