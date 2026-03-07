'use client';

import React, { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { cn } from '../utils';
import { useUI } from '../ThemeContext';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TimeframePickerProps {
  options?: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export interface StackedAreaChartProps {
  data: Record<string, unknown>[];
  series: { key: string; color: string; label?: string }[];
  xKey: string;
  className?: string;
  height?: number;
}

export interface MultiSeriesLineChartProps {
  data: Record<string, unknown>[];
  series: { key: string; color: string; label?: string; dashed?: boolean }[];
  xKey: string;
  className?: string;
  height?: number;
}

export interface GroupedBarChartProps {
  data: Record<string, unknown>[];
  series: { key: string; color: string; label?: string }[];
  xKey: string;
  className?: string;
  height?: number;
  stacked?: boolean;
}

export interface DonutChartProps {
  data: { name: string; value: number; color: string }[];
  className?: string;
  size?: number;
  innerRadius?: number;
}

export interface RadarChartProps {
  data: { subject: string; [key: string]: unknown }[];
  series: { key: string; color: string; label?: string }[];
  className?: string;
  size?: number;
  dataKey?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const useChartTheme = () => {
  const { theme } = useUI();
  const isDark = theme === 'dark';
  return {
    isDark,
    grid: isDark ? '#1e293b' : '#e2e8f0',
    axis: isDark ? '#64748b' : '#94a3b8',
    bg: isDark ? '#0f172a' : '#ffffff',
    border: isDark ? '#1e293b' : '#e2e8f0',
    tooltipStyle: {
      backgroundColor: isDark ? '#0f172a' : '#ffffff',
      border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
      borderRadius: '16px',
      boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
      fontSize: '11px',
      fontWeight: 700,
      color: isDark ? '#f8fafc' : '#0f172a',
    },
  };
};

// ─── TimeframePicker ──────────────────────────────────────────────────────────

export const TimeframePicker = ({
  options = ['24H', '7D', '30D', '90D', 'ALL'],
  value,
  onChange,
  className,
}: TimeframePickerProps) => {
  const { theme } = useUI();
  return (
    <div className={cn(
      'flex items-center gap-1 p-1 rounded-full border transition-colors',
      theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-100 border-slate-200',
      className
    )}>
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={cn(
            'px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all',
            value === opt
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : (theme === 'dark' ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600')
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};

// ─── StackedAreaChart ─────────────────────────────────────────────────────────

export const StackedAreaChart = ({ data, series, xKey, className, height = 280 }: StackedAreaChartProps) => {
  const { tooltipStyle, grid, axis } = useChartTheme();
  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            {series.map(s => (
              <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={s.color} stopOpacity={0.35} />
                <stop offset="95%" stopColor={s.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
          <XAxis dataKey={xKey} stroke={axis} fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 700 }} />
          <YAxis stroke={axis} fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 700 }} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }} />
          {series.map(s => (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label ?? s.key}
              stroke={s.color}
              strokeWidth={2.5}
              fillOpacity={1}
              fill={`url(#grad-${s.key})`}
              stackId="1"
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// ─── MultiSeriesLineChart ─────────────────────────────────────────────────────

export const MultiSeriesLineChart = ({ data, series, xKey, className, height = 280 }: MultiSeriesLineChartProps) => {
  const { tooltipStyle, grid, axis } = useChartTheme();
  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
          <XAxis dataKey={xKey} stroke={axis} fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 700 }} />
          <YAxis stroke={axis} fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 700 }} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }} />
          {series.map(s => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label ?? s.key}
              stroke={s.color}
              strokeWidth={3}
              dot={{ r: 5, fill: s.color, strokeWidth: 2, stroke: '#0f172a' }}
              activeDot={{ r: 7 }}
              strokeDasharray={s.dashed ? '6 4' : undefined}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// ─── GroupedBarChart ──────────────────────────────────────────────────────────

export const GroupedBarChart = ({ data, series, xKey, className, height = 280, stacked = false }: GroupedBarChartProps) => {
  const { tooltipStyle, grid, axis } = useChartTheme();
  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
          <XAxis dataKey={xKey} stroke={axis} fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 700 }} />
          <YAxis stroke={axis} fontSize={10} tickLine={false} axisLine={false} tick={{ fontWeight: 700 }} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(99,102,241,0.05)' }} />
          <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }} />
          {series.map((s, i) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.label ?? s.key}
              fill={s.color}
              stackId={stacked ? 'stacked' : undefined}
              radius={i === series.length - 1 || !stacked ? [4, 4, 0, 0] : [0, 0, 0, 0]}
              maxBarSize={8}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// ─── DonutChart ───────────────────────────────────────────────────────────────

export const DonutChart = ({ data, className, size = 240, innerRadius = 60 }: DonutChartProps) => {
  const { theme } = useUI();
  const { tooltipStyle } = useChartTheme();
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={size / 2 - 10}
              dataKey="value"
              strokeWidth={2}
              stroke="transparent"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className={cn("text-2xl font-black", theme === 'dark' ? "text-white" : "text-slate-900")}>
            {total.toLocaleString()}
          </span>
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Total</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-2 w-full">
        {data.map(d => (
          <div key={d.name} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
              <span className={cn("text-xs font-black uppercase tracking-wider", theme === 'dark' ? "text-slate-400" : "text-slate-500")}>
                {d.name}
              </span>
            </div>
            <span className={cn("text-xs font-black", theme === 'dark' ? "text-white" : "text-slate-900")}>
              {((d.value / total) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── SpiderRadarChart ─────────────────────────────────────────────────────────

export const SpiderRadarChart = ({ data, series, className, size = 300 }: RadarChartProps) => {
  const { theme } = useUI();
  const { tooltipStyle } = useChartTheme();
  return (
    <div className={cn('w-full flex justify-center', className)} style={{ height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke={theme === 'dark' ? "#1e293b" : "#e2e8f0"} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fontSize: 10, fontWeight: 700, fill: theme === 'dark' ? '#64748b' : '#94a3b8' }}
          />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }} />
          {series.map(s => (
            <Radar
              key={s.key}
              name={s.label ?? s.key}
              dataKey={s.key}
              stroke={s.color}
              fill={s.color}
              fillOpacity={0.15}
              strokeWidth={2}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
