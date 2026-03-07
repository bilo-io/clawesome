'use client';

import React from 'react';
import { cn } from '../utils';
import { Search, X } from 'lucide-react';
import { useUI } from '../ThemeContext';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  onClear?: () => void;
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const getBaseInputStyles = (isDark: boolean) => cn(
  'w-full rounded-2xl border text-sm transition-all duration-200 px-4 py-2.5 outline-none focus:ring-2',
  isDark 
    ? 'bg-slate-900/60 border-slate-800 text-white placeholder:text-slate-600 focus:ring-indigo-500/50 focus:border-indigo-500/50' 
    : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-indigo-500/20 focus:border-indigo-500/50 shadow-sm'
);

export const Input = ({ label, error, icon, onClear, className, ...props }: InputProps) => {
  const { theme } = useUI();
  const isDark = theme === 'dark';
  const baseInput = getBaseInputStyles(isDark);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className={cn("text-[10px] font-black uppercase tracking-widest", isDark ? "text-slate-500" : "text-slate-400")}>{label}</label>}
      <div className="relative">
        {icon && <span className={cn("absolute left-3.5 top-1/2 -translate-y-1/2", isDark ? "text-slate-500" : "text-slate-400")}>{icon}</span>}
        <input
          className={cn(baseInput, icon && 'pl-10', onClear && 'pr-10', error && 'border-rose-500/50 focus:ring-rose-500/30', className)}
          {...props}
        />
        {onClear && props.value && (
          <button onClick={onClear} className={cn("absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors", isDark ? "text-slate-600 hover:text-slate-300" : "text-slate-400 hover:text-slate-600")}>
            <X size={14} />
          </button>
        )}
      </div>
      {error && <span className="text-xs text-rose-400 font-semibold">{error}</span>}
    </div>
  );
};

export const Textarea = ({ label, error, className, ...props }: TextareaProps) => {
  const { theme } = useUI();
  const isDark = theme === 'dark';
  const baseInput = getBaseInputStyles(isDark);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className={cn("text-[10px] font-black uppercase tracking-widest", isDark ? "text-slate-500" : "text-slate-400")}>{label}</label>}
      <textarea
        rows={4}
        className={cn(baseInput, 'resize-none', error && 'border-rose-500/50', className)}
        {...props}
      />
      {error && <span className="text-xs text-rose-400 font-semibold">{error}</span>}
    </div>
  );
};

export const SearchInput = ({ value, onChange, placeholder = 'Search...', className }: SearchInputProps) => {
  const { theme } = useUI();
  const isDark = theme === 'dark';
  const baseInput = getBaseInputStyles(isDark);

  return (
    <div className={cn('relative', className)}>
      <Search size={16} className={cn("absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none", isDark ? "text-slate-500" : "text-slate-400")} />
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(baseInput, 'pl-10', value && 'pr-10')}
      />
      {value && (
        <button onClick={() => onChange('')} className={cn("absolute right-4 top-1/2 -translate-y-1/2 transition-colors", isDark ? "text-slate-600 hover:text-slate-300" : "text-slate-400 hover:text-slate-600")}>
          <X size={14} />
        </button>
      )}
    </div>
  );
};
