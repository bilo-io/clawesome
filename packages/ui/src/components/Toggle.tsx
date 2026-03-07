'use client';

import React from 'react';
import { cn } from '../utils';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'indigo' | 'emerald' | 'rose';
}

export interface ToggleGroupOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface ToggleGroupProps {
  options: ToggleGroupOption[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multi?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { track: 'w-8 h-4', thumb: 'w-3 h-3', translate: 'translate-x-4' },
  md: { track: 'w-11 h-6', thumb: 'w-5 h-5', translate: 'translate-x-5' },
  lg: { track: 'w-14 h-7', thumb: 'w-6 h-6', translate: 'translate-x-7' },
};

const colorMap = {
  indigo: 'bg-indigo-600',
  emerald: 'bg-emerald-600',
  rose: 'bg-rose-600',
};

export const Toggle = ({ checked, onChange, label, description, disabled, size = 'md', color = 'indigo' }: ToggleProps) => {
  const { track, thumb, translate } = sizeMap[size];
  return (
    <div className={cn('flex items-center gap-3', disabled && 'opacity-50 cursor-not-allowed')}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          track,
          'relative inline-flex shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
          checked ? colorMap[color] : 'bg-slate-700'
        )}
      >
        <span
          className={cn(
            thumb,
            'pointer-events-none inline-block rounded-full bg-white shadow-lg ring-0 transition duration-200',
            checked ? translate : 'translate-x-0'
          )}
        />
      </button>
      {(label || description) && (
        <div>
          {label && <p className="text-sm font-black text-slate-200">{label}</p>}
          {description && <p className="text-xs text-slate-500">{description}</p>}
        </div>
      )}
    </div>
  );
};

export const ToggleGroup = ({ options, value, onChange, multi = false, className }: ToggleGroupProps) => {
  const selected = Array.isArray(value) ? value : [value];

  const handleClick = (id: string) => {
    if (multi) {
      const arr = Array.isArray(value) ? value : [value];
      const next = arr.includes(id) ? arr.filter(v => v !== id) : [...arr, id];
      onChange(next);
    } else {
      onChange(id);
    }
  };

  return (
    <div className={cn('flex gap-1 flex-wrap', className)}>
      {options.map(opt => {
        const isActive = selected.includes(opt.id);
        return (
          <button
            key={opt.id}
            onClick={() => handleClick(opt.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all',
              isActive
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/20'
                : 'text-slate-500 border-slate-800 hover:border-slate-600 hover:text-slate-300'
            )}
          >
            {opt.icon}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};
