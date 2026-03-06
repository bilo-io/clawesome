// apps/dashboard/src/components/CostTracker.tsx
'use client';

import React from 'react';
import { DollarSign, BarChart3, TrendingUp } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';

export const CostTracker = () => {
  const { theme } = useUIStore();
  const providers = [
    { name: 'Claude 3.5 Sonnet', spend: 2.45, limit: 10, color: 'bg-indigo-500 shadow-indigo-500/30' },
    { name: 'DeepSeek R1', spend: 0.82, limit: 5, color: 'bg-emerald-500 shadow-emerald-500/30' },
    { name: 'OpenAI GPT-4o', spend: 1.12, limit: 15, color: 'bg-blue-500 shadow-blue-500/30' },
  ];

  const total = providers.reduce((acc, p) => acc + p.spend, 0);

  return (
    <div className={cn(
        "p-8 rounded-[32px] border transition-all h-full flex flex-col justify-between shadow-xl",
        theme === 'dark' ? "bg-slate-900/40 border-slate-800/50 shadow-none hover:bg-slate-900/60" : "bg-white border-slate-100 shadow-slate-200/50 hover:border-emerald-100"
    )}>
      <div className="flex items-center justify-between mb-10">
         <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
               <DollarSign size={20} />
            </div>
            <span className={cn("text-[10px] font-bold uppercase tracking-[0.25em]", theme === 'dark' ? "text-slate-500" : "text-slate-600")}>Economic Thresholds</span>
         </div>
         <span className="text-3xl font-black text-emerald-500 tracking-tighter">${total.toFixed(2)}</span>
      </div>

      <div className="space-y-6 flex-1">
        {providers.map((p) => (
          <div key={p.name} className="space-y-3">
            <div className="flex justify-between items-end">
               <span className={cn("text-xs font-bold tracking-tight uppercase tracking-widest", theme === 'dark' ? "text-slate-300" : "text-slate-800")}>{p.name}</span>
               <span className={cn("text-[10px] font-mono font-bold", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>
                 ${p.spend.toFixed(2)} <span className="text-slate-400 dark:text-slate-800 opacity-50 px-1">/</span> ${p.limit}
               </span>
            </div>
            <div className={cn(
              "h-2.5 w-full rounded-full overflow-hidden p-0.5 shadow-inner",
              theme === 'dark' ? "bg-slate-950" : "bg-slate-100"
            )}>
               <div 
                 className={cn("h-full rounded-full transition-all duration-1000 shadow-sm", p.color)}
                 style={{ width: `${(p.spend / p.limit) * 100}%` }}
               />
            </div>
          </div>
        ))}
      </div>

      <div className={cn(
        "mt-10 p-5 border-t flex items-center justify-between text-[10px] font-bold uppercase tracking-widest transition-all",
        theme === 'dark' ? "border-slate-800/50 text-slate-600" : "border-slate-100 text-slate-600 bg-slate-50/50 rounded-2xl"
      )}>
         <span className="flex items-center gap-3"><TrendingUp size={16} className="text-amber-500" /> Neural Run-Rate</span>
         <span className="text-amber-500 font-mono tracking-tighter text-base font-black">$4.12 <span className="text-[10px] tracking-widest px-0.5 opacity-50 font-medium">/</span> HR</span>
      </div>
    </div>
  );
};
