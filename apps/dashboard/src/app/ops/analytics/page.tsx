'use client';

import React from 'react';
import { Cpu, BarChart3, PieChart, TrendingUp, Zap, ChevronRight } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';
import { SegmentedControl } from '@/components/SegmentedControl';

const generateHourlyData = () => {
  const data = [];
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 60 * 60 * 1000);
    const isNight = d.getHours() < 6 || d.getHours() > 22;
    const cpu = isNight ? 20 + Math.random() * 20 : 50 + Math.random() * 40;
    const mem = isNight ? 40 + Math.random() * 20 : 60 + Math.random() * 30;
    const cost = cpu * 0.05 + Math.random();
    data.push({
      name: `${d.getHours().toString().padStart(2, '0')}:00`,
      cpu: Math.floor(cpu),
      mem: Math.floor(mem),
      cost: Number(cost.toFixed(2))
    });
  }
  return data;
};

const generateDailySystemData = (days: number) => {
  const data = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const multiplier = isWeekend ? 0.4 + Math.random() * 0.2 : 1.0;
    
    const cpu = (60 + Math.random() * 30) * multiplier;
    const mem = (70 + Math.random() * 20) * multiplier;
    const cost = cpu * 0.08 + Math.random() * 2;
    
    data.push({
      name: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      cpu: Math.floor(cpu),
      mem: Math.floor(mem),
      cost: Number(cost.toFixed(2))
    });
  }
  return data;
};

const DATA_24H = generateHourlyData();
const DATA_90D = generateDailySystemData(90);

export default function AnalyticsPage() {
  const { theme } = useUIStore();
  const [range, setRange] = React.useState('24H');
  
  const currentData = React.useMemo(() => {
    switch (range) {
      case '7D': return DATA_90D.slice(-7);
      case '30D': return DATA_90D.slice(-30);
      case 'ALL': return DATA_90D;
      case '24H':
      default: return DATA_24H;
    }
  }, [range]);
  
  return (
    <main className="space-y-6 pb-20 max-w-[1600px] mx-auto">
      <DashboardResourceHeader
        title="Analytics"
        description="High-precision telemetry and resource utilization metrics. Monitor the efficiency, cost distribution, and operational load of your global neural network."
        badge="NC-TELEMETRY"
        statusLabel="Data Sampling:"
        statusValue="High Precision"
        statusColor="indigo"
        isCollection={false}
        renderRight={
          <div className="flex items-center gap-4 h-[56px]">
             <SegmentedControl 
               options={['24H', '7D', '30D', 'ALL']}
               value={range}
               onChange={setRange}
               className="min-w-[280px]"
             />
             
             <div className="relative p-[1px] rounded-full bg-gradient-to-tr from-[#8C00FF] to-[#008FD6] group/zap h-full aspect-square">
               <button
                 className={cn(
                   "w-full h-full rounded-full flex items-center justify-center transition-all",
                   theme === 'dark' ? "bg-slate-950 text-slate-500 group-hover/zap:text-white" : "bg-white text-slate-600 group-hover/zap:text-white",
                   "group-hover/zap:bg-gradient-to-tr group-hover/zap:from-[#8C00FF] group-hover/zap:to-[#008FD6]",
                   "focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:shadow-[0_0_20px_rgba(140,0,255,0.4)]"
                 )}
               >
                 <Zap size={20} className="group-hover/zap:animate-pulse" />
               </button>
             </div>
          </div>
        }
      />

      {/* Stats Cards - Compact Style - Moved Above Charts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
         {[
           { label: 'Token Throughput', value: '42.8k', sub: '/min', icon: Zap, color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
           { label: 'Active Runtimes', value: '12', sub: 'INSTANCES', icon: Cpu, color: 'text-indigo-500', bgColor: 'bg-indigo-500/10' },
           { label: 'Latency (Avg)', value: '142', sub: 'MS', icon: TrendingUp, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10' },
           { label: 'Distribution', value: '8', sub: 'REGIONS', icon: PieChart, color: 'text-rose-500', bgColor: 'bg-rose-500/10' },
         ].map((stat, i) => (
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.05 }}
             key={stat.label} 
             className={cn(
               "p-5 rounded-[28px] border transition-all group overflow-hidden relative glass",
               theme === 'dark' ? "border-slate-800/60" : "border-slate-100"
             )}
           >
              <div className="flex justify-between items-start mb-4">
                 <div className={cn("p-2.5 rounded-xl bg-opacity-10", stat.color.replace('text', 'bg'))}>
                    <stat.icon size={20} className={stat.color} />
                 </div>
                 <div className={cn(
                   "text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest",
                   theme === 'dark' ? "bg-slate-800 text-slate-500" : "bg-slate-100 text-slate-400"
                 )}>
                   LIVE
                 </div>
              </div>
              <div className="space-y-1 relative z-10">
                <h3 className={cn("text-[9px] font-black uppercase tracking-[0.2em]", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>{stat.label}</h3>
                <div className="flex items-baseline gap-1.5">
                   <span className={cn("text-3xl font-black tracking-tighter", theme === 'dark' ? "text-white" : "text-slate-950")}>{stat.value}</span>
                   <span className={cn("text-[10px] font-mono font-bold opacity-40 uppercase", theme === 'dark' ? "text-slate-400" : "text-slate-500")}>{stat.sub}</span>
                </div>
              </div>
              
              <div className={cn(
                "absolute -bottom-10 -right-10 w-24 h-24 blur-3xl rounded-full opacity-0 group-hover:opacity-20 transition-opacity",
                stat.bgColor.replace('text-', 'bg-')
              )} />
           </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <motion.section 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className={cn(
             "p-8 rounded-[40px] border shadow-xl space-y-8 glass",
             theme === 'dark' ? "border-slate-800/60" : "border-slate-100 shadow-slate-200/40"
           )}
         >
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-500">
                     <BarChart3 size={20} />
                  </div>
                  <h2 className={cn("text-lg font-bold tracking-tight", theme === 'dark' ? "text-white" : "text-slate-950")}>Resource Load History</h2>
               </div>
               <span className={cn("text-[10px] font-black uppercase tracking-widest", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>{range === '24H' ? 'Last 24 Hours' : range === '7D' ? 'Last 7 Days' : range === '30D' ? 'Last 30 Days' : 'Last 90 Days'}</span>
            </div>
            <div className="h-72 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentData}>
                     <defs>
                        <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#1e293b' : '#f1f5f9'} vertical={false} />
                     <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} tick={{ fontWeight: 700 }} />
                     <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} tick={{ fontWeight: 700 }} />
                     <Tooltip 
                        contentStyle={{ 
                          backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff', 
                          border: theme === 'dark' ? '1px solid #1e293b' : '1px solid #f1f5f9', 
                          borderRadius: '16px',
                          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
                        }}
                        itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                     />
                     <Area type="monotone" dataKey="cpu" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorCpu)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </motion.section>

         <motion.section 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className={cn(
             "p-8 rounded-[40px] border shadow-xl space-y-8 glass",
             theme === 'dark' ? "border-slate-800/60" : "border-slate-100 shadow-slate-200/40"
           )}
         >
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
                     <TrendingUp size={20} />
                  </div>
                  <h2 className={cn("text-lg font-bold tracking-tight", theme === 'dark' ? "text-white" : "text-slate-950")}>Project Run-Rate</h2>
               </div>
               <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Estimated +2.4%</span>
            </div>
            <div className="h-72 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={currentData}>
                     <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#1e293b' : '#f1f5f9'} vertical={false} />
                     <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} tick={{ fontWeight: 700 }} />
                     <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} tick={{ fontWeight: 700 }} />
                     <Tooltip 
                        contentStyle={{ 
                          backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff', 
                          border: theme === 'dark' ? '1px solid #1e293b' : '1px solid #f1f5f9', 
                          borderRadius: '16px',
                          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
                        }}
                        itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                     />
                     <Line type="monotone" dataKey="cost" stroke="#10b981" strokeWidth={4} dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: theme === 'dark' ? '#0f172a' : '#fff' }} />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </motion.section>
      </div>
    </main>
  );
}
