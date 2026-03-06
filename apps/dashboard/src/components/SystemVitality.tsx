// apps/dashboard/src/components/SystemVitality.tsx
'use client';

import React from 'react';
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';

const data = [
  { time: '00:00', cpu: 32, ram: 45, disk: 12 },
  { time: '04:00', cpu: 28, ram: 42, disk: 12 },
  { time: '08:00', cpu: 65, ram: 78, disk: 15 },
  { time: '12:00', cpu: 55, ram: 70, disk: 18 },
  { time: '16:00', cpu: 85, ram: 92, disk: 22 },
  { time: '20:00', cpu: 45, ram: 60, disk: 22 },
  { time: '23:59', cpu: 38, ram: 55, disk: 24 },
];

export const SystemVitality = () => {
  const { theme } = useUIStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { label: 'CPU Load', key: 'cpu', color: '#6366f1' },
        { label: 'RAM Usage', key: 'ram', color: '#10b981' },
        { label: 'Disk I/O', key: 'disk', color: '#f59e0b' }
      ].map((metric) => (
        <div 
          key={metric.key} 
          className={cn(
            "p-6 rounded-[28px] border transition-all cursor-pointer group shadow-sm",
            theme === 'dark' 
              ? "bg-slate-900/40 border-slate-800/50 hover:bg-slate-900/60" 
              : "bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md"
          )}
        >
           <div className="flex items-center justify-between mb-6">
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-[0.2em]", 
                theme === 'dark' ? "text-slate-500" : "text-slate-600"
              )}>
                {metric.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono font-bold" style={{ color: metric.color }}>
                  {data[data.length - 1][metric.key as keyof typeof data[0]]}%
                </span>
              </div>
           </div>
           <div className="h-28">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`color-${metric.key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={metric.color} stopOpacity={theme === 'dark' ? 0.25 : 0.4}/>
                      <stop offset="95%" stopColor={metric.color} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey={metric.key} 
                    stroke={metric.color} 
                    fillOpacity={1} 
                    fill={`url(#color-${metric.key})`} 
                    strokeWidth={2.5}
                    isAnimationActive={true}
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className={cn(
                            "border shadow-2xl px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold",
                            theme === 'dark' ? "bg-slate-950 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
                          )}>
                            {payload[0].value}%
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>
      ))}
    </div>
  );
};
