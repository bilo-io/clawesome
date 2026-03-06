// apps/dashboard/src/components/SegmentedControl.tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';

interface SegmentedControlProps {
  options: string[] | { id: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({ 
  options, 
  value, 
  onChange,
  className
}) => {
  const { theme } = useUIStore();

  const renderedOptions = options.map(opt => 
    typeof opt === 'string' ? { id: opt, label: opt } : opt
  );

  return (
    <div className={cn(
      "p-1 rounded-full border flex items-center gap-1 shadow-xl transition-all h-full min-h-[48px]",
      theme === 'dark' ? "bg-slate-900/60 border-slate-800 shadow-none" : "bg-white border-slate-100 shadow-slate-200/40",
      className
    )}>
      {renderedOptions.map((opt) => {
        const isActive = value === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={cn(
              "flex-1 h-full px-5 min-w-[50px] flex items-center justify-center rounded-full text-[9px] font-black uppercase tracking-widest transition-all",
              isActive
                ? "bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white shadow-lg shadow-purple-600/20"
                : (theme === 'dark' ? "text-slate-500 hover:text-slate-300" : "text-slate-500 hover:text-slate-950")
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};
