'use client';

import { Rocket, ShieldCheck, Flame, Trash2, Code2, ChevronRight } from 'lucide-react';
import { useUI } from '../ThemeContext';
import { cn } from '../utils';

const actions = [
  { icon: Rocket, label: 'Setup Dev', color: 'indigo' },
  { icon: ShieldCheck, label: 'Audit UI', color: 'emerald' },
  { icon: Flame, label: 'Turbo Build', color: 'amber' },
  { icon: Code2, label: 'Refactor', color: 'blue' },
  { icon: Trash2, label: 'Wipe Sandbox', color: 'rose' },
];

export const QuickActions = () => {
  const { theme } = useUI();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
      {actions.map((action) => (
        <button 
          key={action.label} 
          className={cn(
            "group p-8 rounded-2xl border transition-all hover:scale-105 active:scale-95 space-y-5 text-left shadow-xl overflow-hidden relative",
            theme === 'dark' 
              ? "bg-slate-900/40 border-slate-800/60 shadow-none hover:bg-slate-900 hover:border-indigo-500/30" 
              : "bg-slate-50/20 backdrop-blur-md border-slate-100/50 shadow-slate-200/20 hover:border-indigo-200 hover:bg-white/60 hover:shadow-2xl"
          )}
        >
          <div className={cn(
             "p-4 w-fit rounded-2xl group-hover:rotate-6 transition-all shadow-inner border",
             action.color === 'indigo' ? "bg-indigo-600/10 text-indigo-600 border-indigo-500/20" :
             action.color === 'emerald' ? "bg-emerald-600/10 text-emerald-600 border-emerald-500/20" :
             action.color === 'amber' ? "bg-amber-600/10 text-amber-600 border-amber-500/20" :
             action.color === 'blue' ? "bg-blue-600/10 text-blue-600 border-blue-500/20" :
             "bg-rose-600/10 text-rose-600 border-rose-500/20"
          )}>
             <action.icon size={24} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className={cn(
              "block text-[11px] font-black uppercase tracking-[0.25em] transition-colors",
              theme === 'dark' ? "text-slate-500 group-hover:text-white" : "text-slate-600 group-hover:text-slate-950"
            )}>
              {action.label}
            </span>
            <ChevronRight size={16} className={cn(
              "transition-all group-hover:translate-x-1 opacity-0 group-hover:opacity-100",
              theme === 'dark' ? "text-indigo-400" : "text-indigo-600"
            )} />
          </div>
          
          {/* Subtle Ambient Hover Glow */}
          <div className={cn(
            "absolute -bottom-10 -right-10 w-24 h-24 blur-3xl rounded-full transition-opacity opacity-0 group-hover:opacity-30",
            action.color === 'indigo' ? "bg-indigo-500" :
            action.color === 'emerald' ? "bg-emerald-500" :
            action.color === 'amber' ? "bg-amber-500" :
            action.color === 'blue' ? "bg-blue-500" :
            "bg-rose-500"
          )} />
        </button>
      ))}
    </div>
  );
};
