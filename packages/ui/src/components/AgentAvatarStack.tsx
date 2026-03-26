'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, UserPlus } from 'lucide-react';
import { cn } from '../utils';
import { useUI } from '../ThemeContext';

export interface CouncilAgent {
  id: string;
  name: string;
  avatar?: string;
  color: string;
  role: string;
}

export interface AgentAvatarStackProps {
  agents: CouncilAgent[];
  onAddAgent?: () => void;
  maxDisplay?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AgentAvatarStack = ({
  agents,
  onAddAgent,
  maxDisplay = 6,
  className,
  size = 'md'
}: AgentAvatarStackProps) => {
  const { theme } = useUI();
  const isDark = theme === 'dark';

  const displayedAgents = agents.slice(0, maxDisplay);
  const remainingCount = agents.length - maxDisplay;

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  };

  const ringStyles = isDark ? "ring-2 ring-slate-950 shadow-lg" : "ring-2 ring-white shadow-md shadow-slate-200/50";

  return (
    <div className={cn("flex items-center -space-x-4", className)}>
      <AnimatePresence mode="popLayout">
        {displayedAgents.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.8 }}
            transition={{ delay: index * 0.05 }}
            className="group relative z-10"
            style={{ zIndex: agents.length - index }}
          >
            <div 
              className={cn(
                "rounded-full flex items-center justify-center transition-transform hover:scale-110 hover:-translate-y-1 cursor-help",
                sizeClasses[size],
                ringStyles
              )}
              style={{ background: agent.color }}
            >
              {agent.avatar ? (
                <img 
                  src={agent.avatar} 
                  alt={agent.name} 
                  className="w-full h-full rounded-full object-cover" 
                />
              ) : (
                <span className="text-[10px] font-black text-white">{agent.name.charAt(0)}</span>
              )}
            </div>
            
            {/* Tooltip */}
            <div className={cn(
              "absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all pointer-events-none whitespace-nowrap z-50",
              isDark ? "bg-slate-900 text-white border border-slate-800" : "bg-white text-slate-900 shadow-xl shadow-indigo-500/10 border border-slate-100"
            )}>
              <p className="text-[10px] font-black uppercase tracking-widest">{agent.name}</p>
              <p className={cn("text-[9px] font-bold mt-0.5", isDark ? "text-slate-500" : "text-slate-400")}>{agent.role}</p>
            </div>
          </motion.div>
        ))}

        {remainingCount > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-0"
            style={{ zIndex: 0 }}
          >
            <div className={cn(
               "rounded-full flex items-center justify-center text-[10px] font-black border-2",
               sizeClasses[size],
               ringStyles,
               isDark ? "bg-slate-900 border-slate-800 text-slate-400" : "bg-slate-100 border-slate-200 text-slate-600"
            )}>
              +{remainingCount}
            </div>
          </motion.div>
        )}

        {onAddAgent && (
          <motion.button
            whileHover={{ scale: 1.1, translateY: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddAgent}
            className={cn(
              "rounded-full flex items-center justify-center transition-all bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 z-20 group relative",
              sizeClasses[size],
              ringStyles,
              "ml-6" // Gap for the separator add
            )}
          >
            <Plus size={20} className="transition-transform group-hover:rotate-90 duration-300" />
            
            {/* Label for "Add Agent" */}
            <div className={cn(
              "absolute left-full ml-4 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none",
              isDark ? "text-slate-400" : "text-slate-500"
            )}>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap">Add Counselor</span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
