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

const resourceData = [
  { name: '00:00', cpu: 45, mem: 60, cost: 2.1 },
  { name: '04:00', cpu: 32, mem: 55, cost: 1.8 },
  { name: '08:00', cpu: 65, mem: 75, cost: 3.5 },
  { name: '12:00', cpu: 85, mem: 80, cost: 4.2 },
  { name: '16:00', cpu: 55, mem: 65, cost: 2.8 },
  { name: '20:00', cpu: 40, mem: 60, cost: 2.4 },
];

export default function AnalyticsPage() {
  const { theme } = useUIStore();
  const [range, setRange] = React.useState('24H');
  
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
               <span className={cn("text-[10px] font-black uppercase tracking-widest", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>Last 24 Hours</span>
            </div>
            <div className="h-72 w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={resourceData}>
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
                  <LineChart data={resourceData}>
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
