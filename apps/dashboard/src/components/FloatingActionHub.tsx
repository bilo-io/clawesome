// apps/dashboard/src/components/FloatingActionHub.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, MessageSquare, Book, X, Sparkles, MessageCircle } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export const FloatingActionHub = () => {
  const { theme, setAILabOpen, setFloatingTerminalOpen, isAILabOpen, isFloatingTerminalOpen } = useUIStore();
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const menuItems = [
    { 
      id: 'terminal', 
      icon: Terminal, 
      label: 'Terminal', 
      onClick: () => setFloatingTerminalOpen(true),
      color: 'hover:text-emerald-500'
    },
    { 
      id: 'chat', 
      icon: MessageCircle, 
      // label: 'Chat', 
      onClick: () => setAILabOpen(true),
      color: 'hover:text-indigo-500'
    },
  ];

  return (
    <div 
      className="fixed bottom-8 right-8 z-[70] flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        layout
        className={cn(
          "flex flex-row-reverse items-center gap-4 p-1.5 shadow-2xl transition-all duration-500 relative",
          theme === 'dark' ? "bg-slate-900/80 border border-slate-800" : "bg-white/80 border border-slate-200",
          isHovered ? "rounded-full pl-6" : "rounded-full"
        )}
        style={{ backdropFilter: 'blur(20px)' }}
      >
        <motion.button
          whileTap={{ scale: 0.95 }}
          className={cn(
            "relative w-12 h-12 rounded-full shadow-2xl transition-all duration-300 group border overflow-hidden flex items-center justify-center shrink-0",
            theme === 'dark' 
              ? "bg-indigo-600 border-indigo-500/50 shadow-indigo-500/40" 
              : "bg-slate-100 text-indigo-600 border-slate-200 shadow-sm"
          )}
        >
          <div className={cn(
            "absolute inset-0 bg-indigo-600 transition-opacity",
            theme === 'dark' ? "opacity-100" : "opacity-0 group-hover:opacity-10"
          )} />
          
          <div 
            className={cn(
              "w-6 h-6 relative z-10 transition-transform duration-500",
              isHovered && "rotate-12 scale-110",
              theme === 'dark' ? "bg-white" : "bg-indigo-600"
            )} 
            style={{ 
              maskImage: 'url(/clawesome-icon.svg)', 
              maskSize: 'contain', 
              maskRepeat: 'no-repeat', 
              maskPosition: 'center',
              WebkitMaskImage: 'url(/clawesome-icon.svg)',
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center'
            }}
          />
        </motion.button>

        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, width: 0, x: 20 }}
              animate={{ opacity: 1, width: 'auto', x: 0 }}
              exit={{ opacity: 0, width: 0, x: 20 }}
              className="flex items-center gap-6 overflow-hidden pr-2"
            >
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    item.onClick();
                  }}
                  className={cn(
                    "group relative transition-all flex items-center gap-2 px-1",
                    theme === 'dark' ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
                  )}
                  title={item.label}
                >
                  <item.icon size={16} className={cn("transition-colors", item.color)} />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
                    {item.label}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
