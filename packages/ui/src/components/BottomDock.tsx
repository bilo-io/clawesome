'use client';

import { useState } from 'react';
import { Sun, Moon, Maximize2, Palette, Sliders } from 'lucide-react';
import { cn } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useUI } from '../ThemeContext';

export interface BottomDockProps {
  glowIntensity: number;
  onGlowIntensityChange: (value: number) => void;
  onToggleFocusMode: () => void;
  isFocusMode: boolean;
  isSidebarExpanded: boolean;
}

export const BottomDock = ({
  glowIntensity,
  onGlowIntensityChange,
  onToggleFocusMode,
  isFocusMode,
  isSidebarExpanded
}: BottomDockProps) => {
  const { theme, setTheme } = useUI();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "fixed bottom-8 z-50 transition-all duration-500 ease-in-out",
        isFocusMode ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100',
        isSidebarExpanded ? 'left-[280px]' : 'left-[104px]'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        layout
        className={cn(
          "flex items-center gap-4 p-1.5 shadow-2xl transition-colors duration-300 relative",
          theme === 'dark' ? "bg-slate-900/80 border border-slate-800" : "bg-white/80 border border-slate-200",
          isHovered ? "rounded-full pr-6" : "rounded-full"
        )}
        style={{ backdropFilter: 'blur(20px)' }}
      >
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center transition-all shrink-0",
          theme === 'dark' ? "bg-slate-950 text-indigo-400" : "bg-slate-100 text-indigo-600 shadow-sm"
        )}>
          <Palette size={20} className={cn("transition-transform duration-500", isHovered && "rotate-12 scale-110")} />
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, width: 0, x: -20 }}
              animate={{ opacity: 1, width: 'auto', x: 0 }}
              exit={{ opacity: 0, width: 0, x: -20 }}
              className="flex items-center gap-6 overflow-hidden"
            >
              <div className={cn(
                "flex items-center gap-4 px-4 border-r transition-colors duration-300",
                theme === 'dark' ? "border-slate-800" : "border-slate-200"
              )}>
                 <Sliders size={14} className="text-slate-500" />
                 <input 
                   type="range" 
                   min="0" 
                   max="100" 
                   value={glowIntensity} 
                   onChange={(e) => onGlowIntensityChange(parseInt(e.target.value))}
                   className="w-24 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                 />
                 <span className="text-[9px] font-black font-mono w-6 text-slate-500">{glowIntensity}%</span>
              </div>

              <div className={cn(
                "flex items-center bg-slate-800/10 rounded-full p-1 border transition-all duration-300",
                theme === 'dark' ? "border-slate-800 bg-slate-950" : "border-slate-100 bg-slate-50"
              )}>
                <button 
                  onClick={() => setTheme('light')}
                  className={cn(
                    "p-2 rounded-xl transition-all flex items-center gap-2",
                    theme === 'light' ? "bg-white text-amber-500 shadow-xl border border-slate-100" : "text-slate-500 hover:text-slate-400"
                  )}
                >
                  <Sun size={14} />
                  {theme === 'light' && <span className="text-[9px] font-black uppercase tracking-widest px-1">Light</span>}
                </button>
                <button 
                  onClick={() => setTheme('dark')}
                  className={cn(
                    "p-2 rounded-xl transition-all flex items-center gap-2",
                    theme === 'dark' ? "bg-slate-800 text-indigo-400 shadow-inner border border-slate-700" : "text-slate-500 hover:text-slate-400"
                  )}
                >
                  <Moon size={14} />
                  {theme === 'dark' && <span className="text-[9px] font-black uppercase tracking-widest px-1">Dark</span>}
                </button>
              </div>

              <button 
                onClick={onToggleFocusMode}
                className={cn(
                  "p-2.5 rounded-full transition-all active:scale-95 group",
                  theme === 'dark' ? "hover:bg-slate-800 text-slate-500 hover:text-white" : "hover:bg-slate-100 text-slate-400 hover:text-slate-950"
                )}
                title="Focus Mode"
              >
                <Maximize2 size={16} className="group-hover:rotate-90 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
