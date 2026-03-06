// apps/dashboard/src/components/ResourceChart.tsx
'use client';

import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { time: '00:00', usage: 45, forecast: 48 },
  { time: '04:00', usage: 52, forecast: 55 },
  { time: '08:00', usage: 85, forecast: 82 },
  { time: '12:00', usage: 78, forecast: 85 },
  { time: '16:00', usage: 65, forecast: 70 },
  { time: '20:00', usage: 42, forecast: 45 },
  { time: '23:59', usage: 38, forecast: 40 },
];

export const ResourceChart = () => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#64748b" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="#64748b" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0f172a', 
              border: '1px solid #1e293b',
              borderRadius: '8px',
              fontSize: '10px'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="usage" 
            stroke="#6366f1" 
            fillOpacity={1} 
            fill="url(#colorUsage)" 
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="forecast" 
            stroke="#475569" 
            strokeDasharray="5 5" 
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
