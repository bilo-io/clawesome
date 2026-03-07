'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../utils';
import { ChevronDown, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  className?: string;
}

export interface RadioGroupProps {
  options: { value: string; label: string; description?: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const Select = ({ options, value, onChange, placeholder = 'Select...', label, error, disabled, className }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className={cn('relative w-full', className)}>
      {label && <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5">{label}</label>}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-2xl border text-sm transition-all text-left',
          'bg-slate-900/60 border-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50',
          error && 'border-rose-500/50',
          disabled && 'opacity-50 cursor-not-allowed',
          isOpen && 'border-indigo-500/50 ring-2 ring-indigo-500/20'
        )}
      >
        <span className={cn('flex items-center gap-2', !selected && 'text-slate-600')}>
          {selected?.icon}
          {selected?.label ?? placeholder}
        </span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="text-slate-500 shrink-0" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-black/60 overflow-hidden"
          >
            {options.map(opt => (
              <button
                key={opt.value}
                type="button"
                disabled={opt.disabled}
                onClick={() => { onChange?.(opt.value); setIsOpen(false); }}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors',
                  opt.disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-800',
                  value === opt.value && 'text-indigo-400'
                )}
              >
                {opt.icon}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold">{opt.label}</p>
                  {opt.description && <p className="text-xs text-slate-500">{opt.description}</p>}
                </div>
                {value === opt.value && <Check size={14} className="text-indigo-400 shrink-0" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {error && <span className="block text-xs text-rose-400 font-semibold mt-1.5">{error}</span>}
    </div>
  );
};

export const Checkbox = ({ checked, onChange, label, description, disabled, indeterminate, className }: CheckboxProps) => (
  <label className={cn('flex items-start gap-3 cursor-pointer group', disabled && 'opacity-50 cursor-not-allowed', className)}>
    <div className="relative shrink-0 mt-0.5">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={e => onChange(e.target.checked)}
        className="sr-only"
      />
      <div className={cn(
        'w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all',
        checked ? 'bg-indigo-600 border-indigo-600' : 'border-slate-700 bg-transparent group-hover:border-slate-500'
      )}>
        {checked && !indeterminate && <Check size={12} className="text-white" strokeWidth={3} />}
        {indeterminate && <span className="w-2.5 h-0.5 bg-white rounded-full" />}
      </div>
    </div>
    {(label || description) && (
      <div>
        {label && <p className="text-sm font-black text-slate-200">{label}</p>}
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>
    )}
  </label>
);

export const RadioGroup = ({ options, value, onChange, className }: RadioGroupProps) => (
  <div className={cn('space-y-3', className)}>
    {options.map(opt => (
      <label key={opt.value} className="flex items-start gap-3 cursor-pointer group">
        <div className="relative shrink-0 mt-0.5">
          <input type="radio" checked={value === opt.value} onChange={() => onChange(opt.value)} className="sr-only" />
          <div className={cn(
            'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
            value === opt.value ? 'border-indigo-500' : 'border-slate-700 group-hover:border-slate-500'
          )}>
            {value === opt.value && <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />}
          </div>
        </div>
        <div>
          <p className="text-sm font-black text-slate-200">{opt.label}</p>
          {opt.description && <p className="text-xs text-slate-500 mt-0.5">{opt.description}</p>}
        </div>
      </label>
    ))}
  </div>
);
