'use client';

import React from 'react';
import { cn } from '../utils';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export interface CardHeaderProps { children: React.ReactNode; className?: string; }
export interface CardBodyProps { children: React.ReactNode; className?: string; }
export interface CardFooterProps { children: React.ReactNode; className?: string; }

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = ({ children, className, onClick, hoverable = false, padding = 'md' }: CardProps) => (
  <div
    onClick={onClick}
    className={cn(
      'rounded-3xl border bg-slate-900/40 border-slate-800 transition-all duration-200',
      hoverable && 'cursor-pointer hover:border-slate-600 hover:bg-slate-900/60 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5',
      paddingStyles[padding],
      className
    )}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, className }: CardHeaderProps) => (
  <div className={cn('border-b border-slate-800 pb-4 mb-4', className)}>{children}</div>
);

export const CardBody = ({ children, className }: CardBodyProps) => (
  <div className={cn(className)}>{children}</div>
);

export const CardFooter = ({ children, className }: CardFooterProps) => (
  <div className={cn('border-t border-slate-800 pt-4 mt-4', className)}>{children}</div>
);
