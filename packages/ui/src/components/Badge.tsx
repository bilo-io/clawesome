'use client';

import React from 'react';
import { cn } from '../utils';

export type BadgeVariant = 'default' | 'indigo' | 'emerald' | 'rose' | 'amber' | 'slate';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-slate-800 text-slate-300 border-slate-700',
  indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  rose: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  slate: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
};

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-slate-400',
  indigo: 'bg-indigo-400',
  emerald: 'bg-emerald-400',
  rose: 'bg-rose-400',
  amber: 'bg-amber-400',
  slate: 'bg-slate-400',
};

export const Badge = ({ children, variant = 'default', dot = false, className }: BadgeProps) => {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border',
      variantStyles[variant],
      className
    )}>
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
};
