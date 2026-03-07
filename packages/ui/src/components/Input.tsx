'use client';

import React from 'react';
import { cn } from '../utils';
import { Search, X } from 'lucide-react';

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

const baseInput = 'w-full rounded-2xl border bg-slate-900/60 border-slate-800 text-sm text-white placeholder:text-slate-600 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200';

export const Input = ({ label, error, icon, onClear, className, ...props }: InputProps) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</label>}
    <div className="relative">
      {icon && <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">{icon}</span>}
      <input
        className={cn(baseInput, icon && 'pl-10', onClear && 'pr-10', error && 'border-rose-500/50 focus:ring-rose-500/30', className)}
        {...props}
      />
      {onClear && props.value && (
        <button onClick={onClear} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300 transition-colors">
          <X size={14} />
        </button>
      )}
    </div>
    {error && <span className="text-xs text-rose-400 font-semibold">{error}</span>}
  </div>
);

export const Textarea = ({ label, error, className, ...props }: TextareaProps) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</label>}
    <textarea
      rows={4}
      className={cn(baseInput, 'resize-none', error && 'border-rose-500/50', className)}
      {...props}
    />
    {error && <span className="text-xs text-rose-400 font-semibold">{error}</span>}
  </div>
);

export const SearchInput = ({ value, onChange, placeholder = 'Search...', className }: SearchInputProps) => (
  <div className={cn('relative', className)}>
    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={cn(baseInput, 'pl-10', value && 'pr-10')}
    />
    {value && (
      <button onClick={() => onChange('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300 transition-colors">
        <X size={14} />
      </button>
    )}
  </div>
);
