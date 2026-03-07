'use client';

import React from 'react';
import { useUI } from '../ThemeContext';
import { cn } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

export type PageHeaderStatusColor = 'indigo' | 'emerald';

const statusColorClasses: Record<PageHeaderStatusColor, string> = {
  indigo: 'bg-indigo-400 text-indigo-400',
  emerald: 'bg-emerald-500 text-emerald-500',
};

export interface PageHeaderProps {
  title: string;
  badge?: string;
  description?: string;
  statusLabel: string;
  statusValue: string;
  statusColor?: PageHeaderStatusColor;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  statusLabel,
  statusValue,
  statusColor = 'indigo',
  children,
  className,
}: PageHeaderProps) {
  const { theme } = useUI();
  const [dotClass, valueClass] = statusColorClasses[statusColor].split(' ');
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <header
      className={cn(
        'flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b transition-colors',
        theme === 'dark' ? 'border-slate-800/50' : 'border-slate-200',
        className
      )}
    >
      <div>
        <div className="flex items-center gap-4">
          <h1
            className={cn(
              'text-4xl font-black tracking-tighter',
              theme === 'dark' ? 'text-white' : 'text-black'
            )}
          >
            {title}
          </h1>
          <div className="relative inline-flex items-center">
            <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
              className={cn(
                "p-2 rounded-full transition-all",
                theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-500 hover:text-indigo-400" : "bg-white border-slate-100 text-slate-400 hover:text-indigo-600 shadow-sm"
              )}
            >
              <Info size={18} />
            </button>
            <AnimatePresence>
              {showTooltip && description && (
                <motion.div
                  initial={{ opacity: 0, x: -10, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -10, scale: 0.95 }}
                  className={cn(
                    "absolute left-full ml-4 top-1/2 -translate-y-1/2 w-72 p-6 rounded-xl border shadow-2xl z-50 pointer-events-none",
                    theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-400" : "bg-white border-slate-100 text-slate-600 shadow-slate-200/50"
                  )}
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed">
                    {description}
                  </p>
                  <div className={cn(
                    "absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 border-l border-b",
                    theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
                  )} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* {description && (
          <p className={cn(
            "mt-2 text-[11px] font-bold uppercase tracking-[0.15em] leading-relaxed max-w-2xl opacity-60",
            theme === 'dark' ? "text-slate-400" : "text-slate-600"
          )}>
            {description}
          </p>
        )} */}

        <div
          className={cn(
            'text-[11px] font-bold uppercase tracking-[0.3em] flex items-center gap-3 mt-4',
            theme === 'dark' ? 'text-slate-500' : 'text-slate-600'
          )}
        >
          {statusLabel}{' '}
          <span className={cn(valueClass, 'flex items-center gap-2 font-black text-lg uppercase tracking-tighter')}>
            <span className={cn('w-2.5 h-2.5 rounded-full animate-pulse', dotClass)} />
            {statusValue}
          </span>
        </div>
      </div>
      {children ? <div className="flex items-center gap-4">{children}</div> : null}
    </header>
  );
}
