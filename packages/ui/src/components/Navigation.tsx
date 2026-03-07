'use client';

import React from 'react';
import { cn } from '../utils';
import { ChevronRight, X } from 'lucide-react';
import { useUI } from '../ThemeContext';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  onNavigate?: (href: string) => void;
}

export const Breadcrumbs = ({ items, className, onNavigate }: BreadcrumbsProps) => {
  const { theme } = useUI();
  return (
    <nav className={cn('flex items-center space-x-2 overflow-x-auto no-scrollbar py-1', className)}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <div className="flex items-center gap-2 group">
            {item.href ? (
              <button
                onClick={() => onNavigate?.(item.href!)}
                className={cn(
                  'flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-colors',
                  theme === 'dark' ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'
                )}
              >
                {item.icon}
                {item.label}
              </button>
            ) : (
              <span className={cn(
                'flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest',
                theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
              )}>
                {item.icon}
                {item.label}
              </span>
            )}
          </div>
          {i < items.length - 1 && (
            <ChevronRight size={12} className={theme === 'dark' ? 'text-slate-700' : 'text-slate-300'} />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export interface ChipProps {
  label: string;
  onDelete?: () => void;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?: 'indigo' | 'slate' | 'emerald' | 'rose' | 'amber';
  size?: 'sm' | 'md';
  className?: string;
}

export const Chip = ({ label, onDelete, onClick, icon, variant = 'slate', size = 'md', className }: ChipProps) => {
  const { theme } = useUI();
  
  const variants = {
    indigo: theme === 'dark' ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20' : 'bg-indigo-50 border-indigo-100 text-indigo-700 hover:bg-indigo-100',
    slate: theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200',
    emerald: theme === 'dark' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20' : 'bg-emerald-50 border-emerald-100 text-emerald-700 hover:bg-emerald-100',
    rose: theme === 'dark' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20' : 'bg-rose-50 border-rose-100 text-rose-700 hover:bg-rose-100',
    amber: theme === 'dark' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20' : 'bg-amber-50 border-amber-100 text-amber-700 hover:bg-amber-100',
  };

  return (
    <div 
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border transition-all cursor-default font-black uppercase tracking-widest',
        size === 'sm' ? 'px-2 py-0.5 text-[8px]' : 'px-3 py-1 text-[9px]',
        variants[variant],
        onClick && 'cursor-pointer active:scale-95',
        className
      )}
    >
      {icon}
      <span>{label}</span>
      {onDelete && (
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="p-0.5 -mr-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        >
          <X size={size === 'sm' ? 10 : 12} />
        </button>
      )}
    </div>
  );
};
