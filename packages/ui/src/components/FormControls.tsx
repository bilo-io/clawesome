'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../utils';
import { ChevronDown, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUI } from '../ThemeContext';

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

    const { theme } = useUI();
    const isDark = theme === 'dark';

    return (
      <div ref={ref} className={cn('relative w-full', className)}>
        {label && <label className={cn('block text-[10px] font-black uppercase tracking-widest mb-1.5', isDark ? 'text-slate-500' : 'text-slate-400')}>{label}</label>}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-2xl border text-sm transition-all text-left',
            isDark 
              ? 'bg-slate-900/60 border-slate-800 text-white focus:ring-indigo-500/50' 
              : 'bg-white border-slate-200 text-slate-900 focus:ring-indigo-500/20 shadow-sm',
            error && 'border-rose-500/50',
            disabled && 'opacity-50 cursor-not-allowed',
            isOpen && 'border-indigo-500/50 ring-2 ring-indigo-500/20'
          )}
        >
          <span className={cn('flex items-center gap-2', !selected && (isDark ? 'text-slate-600' : 'text-slate-400'))}>
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
              className={cn(
                "absolute z-50 w-full mt-2 rounded-2xl border shadow-2xl overflow-hidden",
                isDark ? "border-slate-800 bg-slate-950 shadow-black/60" : "border-slate-200 bg-white shadow-slate-200/50"
              )}
            >
              {options.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  disabled={opt.disabled}
                  onClick={() => { onChange?.(opt.value); setIsOpen(false); }}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors',
                    opt.disabled ? 'opacity-40 cursor-not-allowed' : (isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'),
                    value === opt.value && 'text-indigo-400'
                  )}
                >
                  {opt.icon}
                  <div className="flex-1 min-w-0">
                    <p className={cn("font-semibold", isDark ? "text-white" : "text-slate-900")}>{opt.label}</p>
                    {opt.description && <p className={cn("text-xs", isDark ? "text-slate-500" : "text-slate-400")}>{opt.description}</p>}
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

export const Checkbox = ({ checked, onChange, label, description, disabled, indeterminate, className }: CheckboxProps) => {
  const { theme } = useUI();
  const isDark = theme === 'dark';
  return (
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
          checked 
            ? 'bg-indigo-600 border-indigo-600' 
            : (isDark ? 'border-slate-700 bg-transparent group-hover:border-slate-500' : 'border-slate-200 bg-white group-hover:border-slate-300 shadow-sm')
        )}>
          {checked && !indeterminate && <Check size={12} className="text-white" strokeWidth={3} />}
          {indeterminate && <span className="w-2.5 h-0.5 bg-white rounded-full" />}
        </div>
      </div>
      {(label || description) && (
        <div>
          {label && <p className={cn("text-sm font-black", isDark ? "text-slate-200" : "text-slate-800")}>{label}</p>}
          {description && <p className={cn("text-xs mt-0.5", isDark ? "text-slate-500" : "text-slate-400")}>{description}</p>}
        </div>
      )}
    </label>
  );
};

export const RadioGroup = ({ options, value, onChange, className }: RadioGroupProps) => {
  const { theme } = useUI();
  const isDark = theme === 'dark';
  return (
    <div className={cn('space-y-3', className)}>
      {options.map(opt => (
        <label key={opt.value} className="flex items-start gap-3 cursor-pointer group">
          <div className="relative shrink-0 mt-0.5">
            <input type="radio" checked={value === opt.value} onChange={() => onChange(opt.value)} className="sr-only" />
            <div className={cn(
              'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
              value === opt.value 
                ? 'border-indigo-500' 
                : (isDark ? 'border-slate-700 group-hover:border-slate-500' : 'border-slate-200 bg-white group-hover:border-slate-300 shadow-sm')
            )}>
              {value === opt.value && <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />}
            </div>
          </div>
          <div>
            <p className={cn("text-sm font-black", isDark ? "text-slate-200" : "text-slate-800")}>{opt.label}</p>
            {opt.description && <p className={cn("text-xs mt-0.5", isDark ? "text-slate-500" : "text-slate-400")}>{opt.description}</p>}
          </div>
        </label>
      ))}
    </div>
  );
};

export interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  label?: string;
  className?: string;
}

export const Slider = ({ value, min = 0, max = 100, onChange, label, className }: SliderProps) => {
  const { theme } = useUI();
  const isDark = theme === 'dark';
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <label className={cn('block text-[10px] font-black uppercase tracking-widest', isDark ? 'text-slate-500' : 'text-slate-400')}>{label}</label>
          <span className={cn('text-xs font-mono font-bold', isDark ? 'text-indigo-400' : 'text-indigo-600')}>{value}</span>
        </div>
      )}
      <div className="relative h-2 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800">
        <div 
          className="absolute top-0 left-0 h-full bg-indigo-500"
          style={{ width: `${percentage}%` }}
        />
        <input 
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
};

export interface FileUploadProps {
  label?: string;
  onChange: (file: File | null) => void;
  className?: string;
}

export const FileUpload = ({ label, onChange, className }: FileUploadProps) => {
  const { theme } = useUI();
  const isDark = theme === 'dark';
  return (
    <div className={cn('w-full', className)}>
      {label && <label className={cn('block text-[10px] font-black uppercase tracking-widest mb-1.5', isDark ? 'text-slate-500' : 'text-slate-400')}>{label}</label>}
      <div className={cn(
        'w-full border-2 border-dashed rounded-2xl p-6 text-center transition-all',
        isDark ? 'border-slate-800 hover:border-indigo-500/50 bg-slate-900/40' : 'border-slate-200 hover:border-indigo-400/50 bg-slate-50'
      )}>
        <input 
          type="file" 
          onChange={(e) => onChange(e.target.files?.[0] || null)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <p className={cn('text-sm font-semibold', isDark ? 'text-slate-300' : 'text-slate-600')}>Upload Image</p>
        <p className={cn('text-xs mt-1', isDark ? 'text-slate-500' : 'text-slate-400')}>Drag & drop or click to browse</p>
      </div>
    </div>
  );
};

export interface DateTimePickerProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const DateTimePicker = ({ label, value, onChange, className }: DateTimePickerProps) => {
  const { theme } = useUI();
  const isDark = theme === 'dark';
  return (
    <div className={cn('w-full', className)}>
      {label && <label className={cn('block text-[10px] font-black uppercase tracking-widest mb-1.5', isDark ? 'text-slate-500' : 'text-slate-400')}>{label}</label>}
      <input 
        type="datetime-local"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'w-full px-4 py-2.5 rounded-2xl border text-sm transition-all text-left outline-none',
          isDark 
            ? 'bg-slate-900/60 border-slate-800 text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50' 
            : 'bg-white border-slate-200 text-slate-900 focus:ring-2 focus:ring-indigo-500/20 shadow-sm focus:border-indigo-500/50'
        )}
      />
    </div>
  );
};
