'use client';

import { Send, Mic, Paperclip, Sparkles, Maximize2, Minimize2, ChevronDown, Bot } from 'lucide-react';
import { cn } from '../utils';
import { useUI } from '../ThemeContext';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface AnimatedPromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend?: () => void;
  placeholder?: string;
  isLoading?: boolean;
  className?: string;
}

const THINK_MODES = [
  { id: 'deep', label: 'Deep Think', description: 'research mode', icon: <Sparkles size={12} className="text-indigo-500" /> },
  { id: 'fast', label: 'Fast', description: 'quick chat', icon: <Send size={12} className="text-emerald-500" /> },
  { id: 'debate', label: 'Debate', description: 'legal, technical', icon: <Sparkles size={12} className="text-amber-500" /> },
  { id: 'creative', label: 'Creative', description: 'content creation, movies...', icon: <Sparkles size={12} className="text-rose-500" /> },
  { id: 'unhinged', label: 'Unhinged*', description: 'verbal filter removed', icon: <Sparkles size={12} className="text-purple-500" /> },
];

export const AnimatedPromptInput = ({
  value,
  onChange,
  onSend,
  placeholder = "Ask the Council anything...",
  isLoading = false,
  className
}: AnimatedPromptInputProps) => {
  const { theme } = useUI();
  const isDark = theme === 'dark';
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [currentMode, setCurrentMode] = useState(THINK_MODES[0]);

  // Handle focus for the entire component
  useEffect(() => {
    const handleFocusInOut = (e: FocusEvent) => {
      if (containerRef.current?.contains(e.target as Node)) {
        setIsFocused(true);
      } else {
        setIsFocused(false);
        setShowModeDropdown(false);
      }
    };

    document.addEventListener('focusin', handleFocusInOut);
    document.addEventListener('focusout', handleFocusInOut);
    return () => {
      document.removeEventListener('focusin', handleFocusInOut);
      document.removeEventListener('focusout', handleFocusInOut);
    };
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const maxHeight = isExpanded ? 500 : 200;
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px`;
    }
  }, [value, isExpanded]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isLoading) {
        onSend?.();
      }
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={cn("relative w-full max-w-[760px] mx-auto group z-50", className)}
    >
      {/* Neural Context Dropdown (Opens above) */}
      <AnimatePresence>
        {showModeDropdown && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={cn(
              "absolute bottom-[calc(100%+80px)] left-1/2 -translate-x-1/2 w-80 p-3 rounded-[32px] border shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] z-[100] backdrop-blur-3xl ring-1 ring-white/10",
              isDark ? "bg-slate-900 border-slate-800 text-slate-300 shadow-black" : "bg-white border-slate-100 text-slate-600 shadow-slate-200/40"
            )}
          >
            <div className="px-4 py-3 mb-2 text-center">
               <span className={cn("text-[10px] font-black uppercase tracking-[0.4em] opacity-40 whitespace-nowrap", isDark ? "text-slate-200" : "text-slate-950")}>Neural Context Mode</span>
            </div>
            {THINK_MODES.map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  setCurrentMode(mode);
                  setShowModeDropdown(false);
                }}
                className={cn(
                  "w-full flex items-center gap-5 px-4 py-4 rounded-[24px] transition-all text-left mb-1.5 last:mb-0 group/item",
                  currentMode.id === mode.id 
                    ? (isDark ? "bg-indigo-600/20 text-white shadow-[0_0_20px_rgba(99,102,241,0.15)]" : "bg-indigo-50 text-indigo-700")
                    : (isDark ? "hover:bg-slate-800/60" : "hover:bg-slate-50")
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover/item:scale-110 shadow-sm",
                  isDark ? "bg-slate-950 border border-slate-800" : "bg-white border border-slate-100"
                )}>
                   {mode.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-black uppercase tracking-widest">{mode.label}</span>
                  <span className="text-[10px] opacity-40 font-bold tracking-tight">{mode.description}</span>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative group">
        {/* Style-match /chat/:id border behavior */}
        <div className={cn(
          "relative p-[2.5px] rounded-[32px] transition-all duration-700",
          isFocused 
            ? "bg-gradient-to-tr from-[#8C00FF] to-[#008FD6] scale-[1.01] shadow-[0_48px_100px_rgba(140,0,255,0.15)]" 
            : (isDark ? "bg-slate-800 shadow-2xl shadow-black/40" : "bg-slate-200")
        )}>
          <div className={cn(
            "flex items-center gap-6 rounded-[30px] px-8 py-5 transition-all duration-700 overflow-hidden min-h-[90px]",
            isDark ? "bg-slate-950/95 backdrop-blur-xl" : "bg-white"
          )}>
            {/* Agent Icon (Styled like Chats page) */}
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center shrink-0 border transition-all duration-500",
              isFocused ? "scale-110 shadow-[0_0_20px_rgba(99,102,241,0.3)] border-indigo-500/50" : "shadow-lg",
              isDark ? "bg-slate-900 border-slate-800 text-slate-500" : "bg-slate-100 border-slate-200 text-slate-400"
            )}>
              <Bot size={24} className={cn("transition-colors duration-500", isFocused && "text-indigo-400")} />
            </div>

            <textarea
              ref={textareaRef}
              rows={1}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={cn(
                "flex-1 bg-transparent text-lg font-bold outline-none resize-none no-scrollbar py-2",
                theme === 'dark' ? "text-white placeholder:text-slate-700" : "text-black placeholder:text-slate-300"
              )}
              style={{ minHeight: isExpanded ? '300px' : '32px', maxHeight: '400px' }}
            />

            {/* Expansion Toggle (Subtle on the right) */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={cn(
                "p-2 rounded-lg transition-all hover:bg-white/5 text-slate-600 hover:text-white shrink-0",
                !isExpanded && "opacity-0 group-hover:opacity-100"
              )}
            >
              {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => value.trim() && !isLoading && onSend?.()}
              disabled={!value.trim() || isLoading}
              className={cn(
                "p-4 rounded-2xl transition-all duration-500 flex items-center justify-center shadow-xl disabled:opacity-30 disabled:grayscale shrink-0",
                value.trim() && !isLoading
                  ? "bg-indigo-600 text-white shadow-indigo-500/30 hover:bg-indigo-500"
                  : isDark ? "bg-slate-900 text-slate-700" : "bg-slate-100 text-slate-300"
              )}
            >
              <Send size={24} />
            </motion.button>
          </div>
        </div>

        {/* Action / Status Row (Styled like /chat/:id bottom bar) */}
        <div className="flex justify-center mt-6 gap-8">
          {[
            { 
              icon: Sparkles, 
              label: currentMode.label, 
              color: 'text-indigo-400',
              active: true,
              onClick: () => setShowModeDropdown(!showModeDropdown)
            },
            { icon: Paperclip, label: 'Attach Assets', color: 'text-blue-400', active: false },
            { icon: Mic, label: 'Voice Command', color: 'text-emerald-400', active: false },
          ].map((item, idx) => (
            <button 
              key={idx}
              onClick={item.onClick}
              className={cn(
                "flex items-center gap-2 transition-all cursor-pointer group/item",
                item.active ? "opacity-100" : "opacity-40 hover:opacity-100"
              )}
            >
              <item.icon size={12} className={cn("transition-all group-hover/item:scale-125", item.color)} />
              <span className={cn(
                "text-[9px] font-black uppercase tracking-[0.2em]", 
                theme === 'dark' ? "text-slate-500" : "text-slate-700"
              )}>
                {item.label}
              </span>
              {item.onClick && (
                <ChevronDown size={10} className={cn("text-slate-600 transition-transform", showModeDropdown && "rotate-180")} />
              )}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isFocused && (
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className={cn(
              "mt-10 text-[10px] text-center font-black uppercase tracking-[0.5em] transition-colors",
              isDark ? "text-slate-700" : "text-slate-300"
            )}
          >
            Mission Protocol: {currentMode.id.toUpperCase()} Ready
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
