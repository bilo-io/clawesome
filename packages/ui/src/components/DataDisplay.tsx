'use client';

import React from 'react';
import { cn } from '../utils';
import { motion } from 'framer-motion';

export interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaPositive?: boolean;
  icon?: React.ReactNode;
  color?: 'indigo' | 'emerald' | 'rose' | 'amber';
  className?: string;
}

export interface ProgressBarProps {
  label?: string;
  value: number;
  max?: number;
  color?: 'indigo' | 'emerald' | 'rose' | 'amber';
  showValue?: boolean;
  className?: string;
}

export interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
  className?: string;
}

const colorMap = {
  indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', bar: 'bg-indigo-500', delta: 'text-indigo-400' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', bar: 'bg-emerald-500', delta: 'text-emerald-400' },
  rose: { bg: 'bg-rose-500/10', text: 'text-rose-400', bar: 'bg-rose-500', delta: 'text-rose-400' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', bar: 'bg-amber-500', delta: 'text-amber-400' },
};

export const StatCard = ({ label, value, delta, deltaPositive, icon, color = 'indigo', className }: StatCardProps) => {
  const c = colorMap[color];
  return (
    <div className={cn('p-5 rounded-3xl border border-slate-800 bg-slate-900/40 space-y-3', className)}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</span>
        {icon && <span className={cn('p-2 rounded-xl', c.bg, c.text)}>{icon}</span>}
      </div>
      <div className="flex items-end gap-3">
        <span className="text-3xl font-black tracking-tighter text-white">{value}</span>
        {delta && (
          <span className={cn('text-xs font-black mb-1', deltaPositive ? 'text-emerald-400' : 'text-rose-400')}>
            {deltaPositive ? '↑' : '↓'} {delta}
          </span>
        )}
      </div>
    </div>
  );
};

export const ProgressBar = ({ label, value, max = 100, color = 'indigo', showValue = true, className }: ProgressBarProps) => {
  const pct = Math.min(100, (value / max) * 100);
  const c = colorMap[color];
  return (
    <div className={cn('space-y-2', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</span>}
          {showValue && <span className={cn('text-xs font-black', c.text)}>{Math.round(pct)}%</span>}
        </div>
      )}
      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
        <motion.div
          className={cn('h-full rounded-full', c.bar)}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export const Sparkline = ({ data, color = '#6366f1', height = 48, className }: SparklineProps) => {
  if (!data.length) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 100;
  const h = height;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h * 0.8) - h * 0.1;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,${h} ${points} ${w},${h}`;

  return (
    <div className={cn('overflow-hidden', className)}>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full" style={{ height }}>
        <defs>
          <linearGradient id={`sg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={areaPoints} fill={`url(#sg-${color.replace('#', '')})`} />
        <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};
