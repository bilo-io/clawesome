'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUI } from '../ThemeContext';
import { cn } from '../utils';

interface InitializeCardProps {
  label: string;
  onClick: () => void;
  viewMode: string;
}

export const InitializeCard: React.FC<InitializeCardProps> = ({ label, onClick, viewMode }) => {
  const { theme } = useUI();
  const isDark = theme === 'dark';

  return (
    <motion.button
      layout
      onClick={onClick}
      className={cn(
        "border-2 border-dashed transition-all flex group active:scale-95 shadow-inner w-full",
        viewMode === 'grid' 
          ? "p-8 rounded-[40px] flex-col items-center justify-center gap-4 h-full" 
          : "p-4 rounded-[28px] items-center justify-center gap-4 flex-row",
        // Base styles
        isDark 
          ? "border-slate-800/50 bg-[#0A0C14] hover:bg-slate-950/50 hover:border-purple-500/50" 
          : "border-slate-200 bg-white hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-500/10",
        // Primary gradient hover border
        "hover:border-transparent hover:ring-2 hover:ring-purple-500/20"
      )}
    >
      <div className={cn(
        "rounded-full transition-all group-hover:rotate-90 group-hover:scale-110 flex items-center justify-center border",
        isDark ? "bg-slate-900 border-slate-800 text-slate-500" : "bg-white border-slate-100 text-slate-400 shadow-sm",
        "group-hover:bg-gradient-to-r group-hover:from-[#8C00FF] group-hover:to-[#008FD6] group-hover:text-white group-hover:border-transparent",
        viewMode === 'grid' ? "p-4" : "p-2"
      )}>
        <Plus size={viewMode === 'grid' ? 28 : 18} />
      </div>
      <span className={cn(
        "font-black uppercase tracking-[0.3em] transition-all",
        isDark ? "text-slate-600" : "text-slate-500",
        "group-hover:bg-gradient-to-r group-hover:from-[#8C00FF] group-hover:to-[#008FD6] group-hover:bg-clip-text group-hover:text-transparent",
        viewMode === 'grid' ? "text-[11px]" : "text-[10px]"
      )}>
        {label}
      </span>
    </motion.button>
  );
};
