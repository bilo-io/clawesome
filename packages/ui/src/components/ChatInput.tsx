'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../utils';
import { useUI } from '../ThemeContext';

export interface ChatInputAction {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export interface ChatInputFeature {
  icon: LucideIcon;
  label: string;
  color: string;
}

export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
  actions?: ChatInputAction[];
  features?: ChatInputFeature[];
  isLoading?: boolean;
  className?: string;
  theme?: 'light' | 'dark';
}

export const ChatInput = ({
  value,
  onChange,
  onSend,
  placeholder = "Ask NC-01 anything...",
  actions = [],
  features = [],
  isLoading = false,
  className,
  theme: themeProp
}: ChatInputProps) => {
  const { theme: uiTheme } = useUI();
  const theme = themeProp || uiTheme;
  const isDark = theme === 'dark';
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isLoading) {
        onSend();
      }
    }
  };

  return (
    <div className={cn("w-full max-w-[760px] mx-auto", className)}>
      {/* Quick Action Pills */}
      {actions.length > 0 && (
        <div className="flex justify-center mb-6 gap-3">
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={action.onClick}
              className={cn(
                "px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center gap-2 backdrop-blur-md",
                isDark 
                  ? "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-indigo-400" 
                  : "bg-white/80 border-slate-200 text-slate-500 hover:text-indigo-600 shadow-lg"
              )}
            >
              <action.icon size={12} /> {action.label}
            </button>
          ))}
        </div>
      )}

      <div className="relative group perspective-1000">
        <div className={cn(
          "relative p-[2px] rounded-3xl transition-all duration-700 shadow-[0_32px_80px_rgba(0,0,0,0.2)] dark:shadow-[0_48px_100px_rgba(0,0,0,0.5)]",
          isFocused 
            ? (isDark 
                ? "bg-gradient-to-tr from-[#8C00FF] to-[#008FD6] scale-[1.01] shadow-[0_48px_100px_rgba(140,0,255,0.15)]" 
                : "bg-gradient-to-tr from-[#8C00FF] to-[#008FD6] scale-[1.01] shadow-[0_48px_100px_rgba(140,0,255,0.15)]")
            : (isDark ? "bg-slate-800" : "bg-slate-200")
        )}>
          <div className={cn(
            "flex items-center gap-4 bg-white dark:bg-slate-950 rounded-3xl px-8 py-5 transition-all duration-700 overflow-hidden",
            isDark ? "bg-slate-950/95" : "bg-white/95"
          )}>
            <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
              <div
                className={cn(
                  "w-6 h-6 transition-colors",
                  isFocused ? "bg-indigo-500" : (isDark ? "bg-slate-500" : "bg-slate-400")
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
            </div>
            <textarea
              ref={textareaRef}
              rows={1}
              value={value}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={cn(
                "flex-1 bg-transparent text-lg font-bold outline-none resize-none no-scrollbar max-h-40 placeholder:font-bold",
                isDark ? "text-white placeholder:text-slate-700" : "text-slate-900 placeholder:text-slate-200"
              )}
            />
            <button
              onClick={onSend}
              disabled={!value.trim() || isLoading}
              className={cn(
                "p-4 rounded-full transition-all duration-500 flex items-center justify-center shadow-xl active:scale-90 disabled:opacity-30 disabled:grayscale",
                value.trim() && !isLoading
                  ? "bg-indigo-600 text-white shadow-indigo-500/30 hover:bg-indigo-500 group-focus-within:rotate-[-5deg]"
                  : isDark ? "bg-slate-800 text-slate-700" : "bg-slate-100 text-slate-300"
              )}
            >
              <Send size={24} />
            </button>
          </div>
        </div>

        {/* Feature Labels */}
        {features.length > 0 && (
          <div className="flex justify-center mt-6 gap-8">
            {features.map((item) => (
              <div key={item.label} className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity cursor-help group/item">
                <item.icon size={12} className={cn("transition-all group-hover/item:scale-125", item.color)} />
                <span className={cn("text-[9px] font-black uppercase tracking-[0.2em]", isDark ? "text-slate-500" : "text-slate-400")}>{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
