import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, User, GraduationCap, Globe, Zap, Check, MapPin, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { InitializeCard } from '@clawesome/ui';

const iconMap: Record<string, any> = {
  Briefcase: Briefcase,
  User: User,
  GraduationCap: GraduationCap,
  Globe: Globe,
  Zap: Zap
};

const getColorClasses = (color: string, theme: 'light' | 'dark') => {
  const isDark = theme === 'dark';
  switch (color) {
    case 'indigo': return isDark ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-indigo-50 text-indigo-600 border-indigo-100';
    case 'emerald': return isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-100';
    case 'amber': return isDark ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-amber-50 text-amber-600 border-amber-100';
    case 'rose': return isDark ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-rose-50 text-rose-600 border-rose-100';
    default: return '';
  }
};

interface SwarmListViewProps {
  swarms: any[];
  selectedIds: string[];
  theme: 'light' | 'dark';
  onToggleSelection: (id: string, e: React.MouseEvent) => void;
}

export const SwarmListView = ({
  swarms,
  selectedIds,
  theme,
  onToggleSelection
}: SwarmListViewProps) => {
  const router = useRouter();
  
  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <InitializeCard label="Initialize Swarm" onClick={() => {}} viewMode="list" />
        </motion.div>
        {swarms.map((ws) => {
          const Icon = iconMap[ws.icon] || Briefcase;
          return (
            <motion.div 
              layout="position"
              key={ws.id} 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                layout: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
                opacity: { duration: 0.3 }
              }}
              onClick={() => router.push(`/ai/swarms/${ws.id}`)}
              className={cn(
                "group transition-all cursor-pointer relative overflow-hidden border shadow-xl flex items-center justify-between p-4 pr-8 rounded-[28px] pl-16",
                selectedIds.includes(ws.id)
                  ? (theme === 'dark' ? "bg-indigo-500/10 border-indigo-500/50" : "bg-indigo-50 border-indigo-500")
                  : (theme === 'dark' 
                      ? "bg-slate-900/40 border-slate-800/60 shadow-none hover:bg-slate-900 hover:border-indigo-500/30" 
                      : "bg-white border-slate-100 shadow-slate-200/40 hover:border-indigo-200 hover:shadow-2xl")
              )}
            >
              {/* Selection Indicator */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSelection(ws.id, e);
                }}
                className={cn(
                "rounded-full border-2 flex items-center justify-center transition-all absolute z-30 cursor-pointer w-6 h-6 left-6 top-1/2 -translate-y-1/2",
                selectedIds.includes(ws.id)
                  ? "bg-indigo-500 border-indigo-500 text-white scale-110 shadow-lg shadow-indigo-500/20" 
                  : cn(
                      "opacity-0 group-hover:opacity-100",
                      theme === 'dark' ? "border-slate-700 bg-slate-950" : "border-slate-200 bg-white shadow-sm"
                    )
              )}>
                {selectedIds.includes(ws.id) && <Check size={12} strokeWidth={4} />}
              </div>
  
              <div className="flex items-center gap-6">
                <div className={cn(
                  "rounded-2xl shadow-inner border transition-transform group-hover:scale-110 p-3", 
                  getColorClasses(ws.color, theme)
                )}>
                  <Icon size={18} />
                </div>
                
                <div className="flex-1">
                  <h4 className={cn(
                    "font-black tracking-tight transition-colors text-sm", 
                    theme === 'dark' ? "text-slate-200 group-hover:text-white" : "text-slate-950 group-hover:text-indigo-600"
                  )}>
                    {ws.name}
                  </h4>
                  <div className={cn("flex items-center gap-2 mt-2 group-hover:translate-x-1 transition-transform")}>
                    <MapPin size={12} className="text-slate-500 opacity-60" />
                    <p className={cn(
                      "font-mono font-bold truncate tracking-tight uppercase text-[9px]", 
                      theme === 'dark' ? "text-slate-600" : "text-slate-400"
                    )}>
                      {ws.path}
                    </p>
                  </div>
                </div>
              </div>
  
              <div className="flex items-center gap-8">
                 {/* Stacked Avatars */}
                 <div className="flex -space-x-3 items-center">
                    {ws.agents.map((agent: any) => (
                      <div 
                        key={agent.id}
                        className={cn(
                          "w-8 h-8 rounded-full border-2 shadow-sm transition-transform hover:scale-125 hover:z-20",
                          agent.color,
                          theme === 'dark' ? "border-slate-900" : "border-white"
                        )}
                      />
                    ))}
                    {ws.agents.length > 3 && (
                      <div className={cn(
                        "w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-black",
                        theme === 'dark' ? "bg-slate-800 border-slate-900 text-slate-400" : "bg-slate-100 border-white text-slate-600"
                      )}>
                        +{ws.agents.length - 3}
                      </div>
                    )}
                 </div>
  
                 <div className="flex items-center gap-8">
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border shadow-sm",
                      ws.status === 'Active' 
                        ? (theme === 'dark' ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-emerald-600 bg-emerald-50 border-emerald-200") 
                        : (theme === 'dark' ? "text-slate-500 bg-slate-950 border-slate-800" : "text-slate-400 bg-slate-50 border-slate-200")
                    )}>
                      {ws.status}
                    </span>
                    <ChevronRight size={18} className={cn(
                      "transition-all",
                      theme === 'dark' ? "text-slate-700" : "text-slate-200"
                    )} />
                 </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
