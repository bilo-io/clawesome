'use client';

import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Line
} from 'recharts';
import { useUI } from '../ThemeContext';

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
  const { theme } = useUI();
  const isDark = theme === 'dark';

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
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={isDark ? "#1e293b" : "#e2e8f0"} 
            vertical={false} 
          />
          <XAxis 
            dataKey="time" 
            stroke={isDark ? "#64748b" : "#94a3b8"} 
            fontSize={10} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke={isDark ? "#64748b" : "#94a3b8"} 
            fontSize={10} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDark ? '#0f172a' : '#ffffff', 
              border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
              borderRadius: '8px',
              fontSize: '10px',
              color: isDark ? '#f8fafc' : '#0f172a'
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
            stroke={isDark ? "#475569" : "#cbd5e1"} 
            strokeDasharray="5 5" 
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
