'use client';

import React, { useState } from 'react';
import { cn } from '../utils';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab?: string;
  onChange?: (id: string) => void;
  variant?: 'pills' | 'underline' | 'boxed';
  className?: string;
}

export const Tabs = ({ tabs, activeTab: controlledActive, onChange, variant = 'pills', className }: TabsProps) => {
  const [internalActive, setInternalActive] = useState(tabs[0]?.id);
  const active = controlledActive ?? internalActive;

  const handleChange = (id: string) => {
    setInternalActive(id);
    onChange?.(id);
  };

  if (variant === 'underline') {
    return (
      <div className={cn('flex gap-6 border-b border-slate-800', className)}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleChange(tab.id)}
            className={cn(
              'pb-3 text-sm font-black uppercase tracking-widest transition-all border-b-2 -mb-px flex items-center gap-2',
              active === tab.id
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.badge != null && (
              <span className="px-1.5 py-0.5 rounded-full bg-indigo-600/20 text-indigo-400 text-[9px] font-black">{tab.badge}</span>
            )}
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'boxed') {
    return (
      <div className={cn('flex gap-1 p-1 bg-slate-900 rounded-2xl border border-slate-800', className)}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleChange(tab.id)}
            className={cn(
              'flex-1 py-2 px-4 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2',
              active === tab.id
                ? 'bg-slate-700 text-white shadow'
                : 'text-slate-500 hover:text-slate-300'
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  // Default: pills
  return (
    <div className={cn('flex gap-2 flex-wrap', className)}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => handleChange(tab.id)}
          className={cn(
            'py-2 px-5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all flex items-center gap-2',
            active === tab.id
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/20'
              : 'text-slate-500 border-slate-800 hover:border-slate-600 hover:text-slate-300'
          )}
        >
          {tab.icon}
          {tab.label}
          {tab.badge != null && (
            <span className="px-1.5 py-0.5 rounded-full bg-white/10 text-[9px]">{tab.badge}</span>
          )}
        </button>
      ))}
    </div>
  );
};
