// apps/dashboard/src/app/usage/page.tsx
'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  DollarSign, 
  Zap, 
  TrendingUp, 
  ArrowUpRight,
  RefreshCw,
  Target,
  BrainCircuit,
  LayoutGrid,
  PieChart as PieChartIcon,
  Timer,
  BarChart as BarChartIcon,
  ChartLine
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  Cell,
  PieChart,
  Pie,
  Sector
} from 'recharts';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';
import { SegmentedControl } from '@/components/SegmentedControl';

const USAGE_DATA: Record<string, { name: string; tokens: number; cost: number }[]> = {
  '1h': [
    { name: '10:05', tokens: 450, cost: 0.12 },
    { name: '10:15', tokens: 890, cost: 0.25 },
    { name: '10:25', tokens: 230, cost: 0.08 },
    { name: '10:35', tokens: 1200, cost: 0.45 },
    { name: '10:45', tokens: 670, cost: 0.18 },
    { name: '10:55', tokens: 1540, cost: 0.52 },
  ],
  '24h': [
    { name: '00:00', tokens: 4500, cost: 1.2 },
    { name: '04:00', tokens: 1200, cost: 0.4 },
    { name: '08:00', tokens: 8900, cost: 2.5 },
    { name: '12:00', tokens: 15400, cost: 4.8 },
    { name: '16:00', tokens: 11200, cost: 3.2 },
    { name: '20:00', tokens: 6700, cost: 1.8 },
  ],
  '7d': [
    { name: 'Mon', tokens: 45000, cost: 12.5 },
    { name: 'Tue', tokens: 52000, cost: 14.8 },
    { name: 'Wed', tokens: 38000, cost: 10.2 },
    { name: 'Thu', tokens: 61000, cost: 18.4 },
    { name: 'Fri', tokens: 55000, cost: 16.5 },
    { name: 'Sat', tokens: 12000, cost: 4.2 },
    { name: 'Sun', tokens: 8500, cost: 2.8 },
  ],
};

const generateUsageData = (days: number) => {
  const data = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const multiplier = isWeekend ? 0.3 + Math.random() * 0.1 : 1.0;
    
    const baseTokens = 35000 + Math.floor(Math.random() * 20000);
    const baseCost = 8.5 + Math.random() * 5;
    
    data.push({
      name: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      tokens: Math.floor(baseTokens * multiplier),
      cost: Number((baseCost * multiplier).toFixed(2))
    });
  }
  return data;
};

USAGE_DATA['30d'] = generateUsageData(30);
USAGE_DATA['90d'] = generateUsageData(90);

const MODEL_USAGE = [
  { name: 'Claude 3.5 Sonnet', tokens: 850000, cost: 255.0, color: '#6366f1' },
  { name: 'GPT-4o', tokens: 420000, cost: 126.0, color: '#10b981' },
  { name: 'DeepSeek R1', tokens: 1200000, cost: 12.0, color: '#f59e0b' },
  { name: 'Gemini 1.5 Pro', tokens: 150000, cost: 45.0, color: '#ec4899' },
  { name: 'Llama 3 70B', tokens: 340000, cost: 1.5, color: '#8b5cf6' },
];

export default function UsagePage() {
  const { theme } = useUIStore();
  const [range, setRange] = useState<keyof typeof USAGE_DATA>('24h');
  const [chartType, setChartType] = useState<'bar' | 'line'>('line');
  const [modelView, setModelView] = useState<'list' | 'pie'>('list');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const currentData = USAGE_DATA[range];
  const totalTokens = currentData.reduce((acc, d) => acc + d.tokens, 0);
  const totalCost = currentData.reduce((acc, d) => acc + d.cost, 0);

  const refreshUsage = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
      <DashboardResourceHeader
        title="Usage"
        description="Real-time monitoring of token consumption and operational expenditures. Track the fiscal impact of your neural operations across different model tiers and agent deployments."
        badge="NC-TELEMETRY"
        statusLabel="Monthly Quota:"
        statusValue="82% REACHED"
        statusColor="indigo"
        isCollection={false}
        renderRight={
          <div className="flex items-center gap-4 h-[56px]">
            <SegmentedControl 
              options={['1h', '24h', '7d', '30d', '90d']}
              value={range}
              onChange={(val) => setRange(val as any)}
              className="min-w-[300px]"
            />
            
            <div className="relative p-[1px] rounded-full bg-gradient-to-tr from-[#8C00FF] to-[#008FD6] group/refresh h-full aspect-square">
              <button
                onClick={refreshUsage}
                className={cn(
                  "w-full h-full rounded-full flex items-center justify-center transition-all",
                  theme === 'dark' ? "bg-slate-950 text-slate-500 group-hover/refresh:text-white" : "bg-white text-slate-600 group-hover/refresh:text-white",
                  "group-hover/refresh:bg-gradient-to-tr group-hover/refresh:from-[#8C00FF] group-hover/refresh:to-[#008FD6]",
                  "focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:shadow-[0_0_20px_rgba(140,0,255,0.4)]"
                )}
              >
                <RefreshCw size={20} className={cn("transition-transform duration-500", isRefreshing && "animate-spin")} />
              </button>
            </div>
          </div>
        }
      />

      {/* Top Stats Cards - Smaller */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'Total Throughput', value: `${(totalTokens / 1000).toFixed(1)}k`, sub: 'Tokens Transmitted', icon: Zap, color: 'text-indigo-500', trend: '+12%' },
           { label: 'Total Expenditure', value: `$${totalCost.toFixed(2)}`, sub: 'Neural Credits Spent', icon: DollarSign, color: 'text-emerald-500', trend: '+5.4%' },
           { label: 'Cost / 1k Tokens', value: `$${(totalCost / totalTokens * 1000).toFixed(4)}`, sub: 'Efficiency Metric', icon: TrendingUp, color: 'text-amber-500', trend: '-2.1%' },
           { label: 'Neural Active Souls', value: '12', sub: 'Linked Agents', icon: BrainCircuit, color: 'text-purple-500', trend: 'STABLE' },
         ].map((card, i) => (
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
             key={card.label}
             className={cn(
               "p-4 rounded-[28px] border transition-all group overflow-hidden relative shadow-sm",
               theme === 'dark' ? "bg-slate-900/40 border-slate-800/60" : "bg-white border-slate-100 shadow-slate-200/20"
             )}
           >
              <div className="flex justify-between items-start mb-3">
                 <div className={cn("p-2 rounded-xl bg-opacity-10", card.color.replace('text', 'bg'))}>
                    <card.icon size={18} className={card.color} />
                 </div>
                 <div className={cn(
                   "flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full",
                   card.trend.startsWith('+') ? "text-rose-500 bg-rose-500/10" : 
                   card.trend.startsWith('-') ? "text-emerald-500 bg-emerald-500/10" :
                   "text-slate-500 bg-slate-500/10"
                 )}>
                    {card.trend}
                    {card.trend !== 'STABLE' && <ArrowUpRight size={9} className={card.trend.startsWith('-') ? "rotate-90" : ""} />}
                 </div>
              </div>
              <div className="space-y-0.5">
                  <h3 className={cn("text-[9px] font-black uppercase tracking-[0.2em]", theme === 'dark' ? "text-slate-600" : "text-slate-700")}>
                    {card.label}
                  </h3>
                  <div className={cn("text-2xl font-black tracking-tighter", theme === 'dark' ? "text-white" : "text-black")}>
                     {card.value}
                  </div>
                  <p className={cn("text-[9px] font-bold opacity-60", theme === 'dark' ? "text-slate-500" : "text-slate-800")}>
                     {card.sub}
                  </p>
              </div>
              
              {/* Decorative background element */}
              <div className={cn(
                "absolute -bottom-10 -right-10 w-20 h-20 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity",
                card.color.replace('text', 'bg')
              )} />
           </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-stretch">
        {/* Main Consumption Chart */}
        <div className={cn(
          "xl:col-span-2 p-8 rounded-[40px] border shadow-xl flex flex-col min-h-[500px]",
          theme === 'dark' ? "bg-slate-900/40 border-slate-800/60 shadow-none" : "bg-white border-slate-100 shadow-slate-200/40"
        )}>
          <div className="flex items-center justify-between mb-10 overflow-hidden">
            <div className="flex items-center gap-5">
              <div className={cn(
                "bg-slate-900 border border-slate-800 rounded-xl flex p-1",
                theme === 'light' && "bg-slate-50 border-slate-100"
              )}>
                <button
                  onClick={() => setChartType('line')}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    chartType === 'line' 
                      ? (theme === 'dark' ? "bg-slate-800 text-indigo-400 shadow-sm" : "bg-white text-indigo-600 shadow-sm border border-slate-100") 
                      : "text-slate-500 hover:text-slate-300"
                  )}
                >
                  <ChartLine size={16} />
                </button>
                <button
                  onClick={() => setChartType('bar')}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    chartType === 'bar' 
                      ? (theme === 'dark' ? "bg-slate-800 text-indigo-400 shadow-sm" : "bg-white text-indigo-600 shadow-sm border border-slate-100") 
                      : "text-slate-500 hover:text-slate-300"
                  )}
                >
                  <BarChartIcon size={16} />
                </button>
              </div>
              <h2 className={cn("text-lg font-bold tracking-tight", theme === 'dark' ? "text-white" : "text-slate-950")}>Consumption Velocity</h2>
            </div>
            <div className="flex items-center gap-6 hidden sm:flex">
               <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                  <span className={cn("text-[10px] font-bold uppercase tracking-widest", theme === 'dark' ? "text-slate-600" : "text-slate-500")}>Tokens</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className={cn("text-[10px] font-bold uppercase tracking-widest", theme === 'dark' ? "text-slate-600" : "text-slate-500")}>Expenditure</span>
               </div>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <ResponsiveContainer width="100%" height="95%">
              {chartType === 'bar' ? (
                <BarChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#1e293b' : '#f1f5f9'} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: theme === 'dark' ? '#475569' : '#94a3b8' }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: theme === 'dark' ? '#475569' : '#94a3b8' }} 
                  />
                  <Tooltip
                    cursor={{ fill: 'transparent' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className={cn(
                            "p-4 rounded-2xl border shadow-2xl space-y-2",
                            theme === 'dark' ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200 shadow-slate-200/50"
                          )}>
                            <p className={cn("text-[10px] font-bold text-slate-500 uppercase tracking-widest")}>{payload[0].payload.name}</p>
                            <div className="space-y-1">
                              <p className="text-sm font-bold text-indigo-500">{payload[0].value?.toLocaleString()} Tokens</p>
                              <p className="text-sm font-bold text-emerald-500">${payload[1].value} Expenditure</p>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="tokens" 
                    fill="#4f46e5" 
                    radius={[6, 6, 0, 0]} 
                    barSize={range === '90d' ? 60 : range === '30d' ? 40 : 25}
                  />
                  <Bar 
                    dataKey="cost" 
                    display="none" // Just for the tooltip
                  />
                </BarChart>
              ) : (
                <LineChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#1e293b' : '#f1f5f9'} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: theme === 'dark' ? '#475569' : '#94a3b8' }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: theme === 'dark' ? '#475569' : '#94a3b8' }} 
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className={cn(
                            "p-4 rounded-2xl border shadow-2xl space-y-2",
                            theme === 'dark' ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200 shadow-slate-200/50"
                          )}>
                            <p className={cn("text-[10px] font-bold text-slate-500 uppercase tracking-widest")}>{payload[0].payload.name}</p>
                            <div className="space-y-1">
                              <p className="text-sm font-bold text-indigo-500">{payload[0].value?.toLocaleString()} Tokens</p>
                              <p className="text-sm font-bold text-emerald-500">${payload[1].value} Expenditure</p>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="tokens" 
                    stroke="#4f46e5" 
                    strokeWidth={4} 
                    dot={{ r: 4, strokeWidth: 2, fill: theme === 'dark' ? '#0f172a' : '#fff' }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cost" 
                    stroke="#10b981" 
                    strokeWidth={4} 
                    dot={{ r: 4, strokeWidth: 2, fill: theme === 'dark' ? '#0f172a' : '#fff' }} 
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Sidebar: Model Efficiency & Quotas */}
        <div className={cn(
          "p-8 rounded-[40px] border shadow-xl flex flex-col h-full overflow-hidden",
          theme === 'dark' ? "bg-slate-900/40 border-slate-800/60 shadow-none" : "bg-white border-slate-100 shadow-slate-200/40"
        )}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-xl text-purple-600">
                <Target size={20} />
              </div>
              <h2 className={cn("text-lg font-bold tracking-tight", theme === 'dark' ? "text-white" : "text-slate-950")}>Soul Distribution</h2>
            </div>
            <div className={cn(
              "bg-slate-900 border border-slate-800 rounded-xl flex p-1",
              theme === 'light' && "bg-slate-50 border-slate-100"
            )}>
              <button
                onClick={() => setModelView('list')}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  modelView === 'list' 
                    ? (theme === 'dark' ? "bg-slate-800 text-indigo-400 shadow-sm" : "bg-white text-indigo-600 shadow-sm border border-slate-100") 
                    : "text-slate-500 hover:text-slate-300"
                )}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setModelView('pie')}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  modelView === 'pie' 
                    ? (theme === 'dark' ? "bg-slate-800 text-indigo-400 shadow-sm" : "bg-white text-indigo-600 shadow-sm border border-slate-100") 
                    : "text-slate-500 hover:text-slate-300"
                )}
              >
                <PieChartIcon size={16} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 min-h-0 relative">
            <AnimatePresence mode="wait">
              {modelView === 'list' ? (
                <motion.div 
                  key="list"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {MODEL_USAGE.map((model) => (
                    <div key={model.name} className="space-y-2">
                      <div className="flex justify-between items-center text-[11px] font-bold">
                         <span className={theme === 'dark' ? "text-slate-300" : "text-slate-800"}>{model.name}</span>
                         <span className={theme === 'dark' ? "text-slate-500" : "text-slate-500"}>${model.cost.toFixed(2)}</span>
                      </div>
                      <div className={cn("h-2 w-full rounded-full bg-slate-100 dark:bg-slate-950 p-0.5")}>
                         <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(model.tokens / 1200000) * 100}%` }}
                          className="h-full rounded-full transition-all"
                          style={{ backgroundColor: model.color, boxShadow: `0 0 10px ${model.color}40` }}
                         />
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="pie"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={MODEL_USAGE}
                        cx="50%"
                        cy="50%"
                        innerRadius="78%"
                        outerRadius="84%"
                        paddingAngle={2}
                        dataKey="tokens"
                        stroke="none"
                        activeShape={(props: { outerRadius?: number }) => (
                          <Sector
                            {...props}
                            outerRadius={(props.outerRadius ?? 0) + 16}
                          />
                        )}
                      >
                        {MODEL_USAGE.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className={cn(
                                "p-3 rounded-2xl border shadow-2xl space-y-1",
                                theme === 'dark' ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
                              )}>
                                <p className="text-xs font-bold" style={{ color: data.color }}>{data.name}</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{data.tokens.toLocaleString()} Tokens</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className={cn(
            "mt-8 p-5 rounded-3xl border border-dashed flex items-center justify-between",
            theme === 'dark' ? "bg-indigo-500/5 border-indigo-500/20" : "bg-indigo-50/50 border-indigo-200"
          )}>
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
               <span className={cn("text-[10px] font-bold uppercase tracking-widest", theme === 'dark' ? "text-indigo-400" : "text-indigo-600")}>Neural Mesh Active</span>
            </div>
            <button className={cn(
              "text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl transition-all",
              "bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white shadow-lg shadow-purple-600/20 active:scale-95"
            )}>
              Optimize Quotas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
