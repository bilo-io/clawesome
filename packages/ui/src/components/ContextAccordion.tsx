'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useUI } from '../ThemeContext';
import { cn } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';

interface ContextAccordionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
}

export const ContextAccordion: React.FC<ContextAccordionProps> = ({ 
  title, 
  children, 
  icon,
  defaultOpen = false 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { theme } = useUI();

  return (
    <div className={cn(
      "rounded-2xl border transition-all overflow-hidden flex flex-col group shadow-xl",
      theme === 'dark' 
        ? "bg-slate-900/10 border-slate-800 shadow-none hover:border-slate-700/50" 
        : "bg-white border-slate-100 shadow-slate-200/50 hover:border-indigo-100"
    )}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between p-7 transition-all active:scale-[0.99] group/btn",
          isOpen 
            ? (theme === 'dark' ? "bg-slate-900/40" : "bg-slate-50/50") 
            : (theme === 'dark' ? "hover:bg-slate-900/30" : "hover:bg-slate-50/30")
        )}
      >
        <div className="flex items-center gap-4">
          {icon && (
            <div className={cn(
              "p-2.5 rounded-2xl transition-all shadow-inner",
              theme === 'dark' 
                ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20" 
                : "bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm"
            )}>
              {icon}
            </div>
          )}
          <span className={cn(
            "text-xs font-bold uppercase tracking-[0.25em] transition-colors",
            theme === 'dark' 
              ? (isOpen ? "text-indigo-400" : "text-slate-500 group-hover/btn:text-slate-300") 
              : (isOpen ? "text-indigo-600" : "text-slate-400 group-hover/btn:text-slate-700")
          )}>{title}</span>
        </div>
        <motion.div
           animate={{ rotate: isOpen ? 180 : 0 }}
           transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          <ChevronDown size={18} className={theme === 'dark' ? "text-slate-700" : "text-slate-300"} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className={cn(
              "px-8 pb-8 pt-0 border-t transition-colors",
              theme === 'dark' ? "border-slate-900/50" : "border-slate-50"
            )}>
              <div className="pt-8 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
