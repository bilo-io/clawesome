'use client';

import React from 'react';
import { cn } from '../utils';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'outline';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30',
  secondary: 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700',
  ghost: 'bg-transparent text-slate-400 border-transparent hover:bg-slate-800/60 hover:text-white',
  danger: 'bg-rose-600 text-white border-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-600/20',
  success: 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/20',
  outline: 'bg-transparent text-slate-300 border-slate-700 hover:border-indigo-500 hover:text-indigo-400',
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'px-3 py-1.5 text-[10px] tracking-widest gap-1.5 rounded-xl',
  sm: 'px-4 py-2 text-xs tracking-wider gap-2 rounded-xl',
  md: 'px-6 py-2.5 text-[11px] tracking-widest gap-2.5 rounded-2xl',
  lg: 'px-8 py-3.5 text-xs tracking-widest gap-3 rounded-2xl',
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'left',
  children,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-black uppercase border transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 size={14} className="animate-spin shrink-0" />}
      {!isLoading && icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      {children}
      {!isLoading && icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
