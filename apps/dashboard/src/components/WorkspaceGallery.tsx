// apps/dashboard/src/components/WorkspaceGallery.tsx
'use client';

import React from 'react';
import { Briefcase, User, GraduationCap, Globe, Plus, MapPin, ChevronRight, Zap, Check } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSwarmStore } from '@/store/useSwarmStore';
import { ResourceSkeleton } from './ResourceSkeleton';

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

export const WorkspaceGallery = ({ 
  viewMode = 'grid',
  selectedIds = [],
  onToggleSelection
}: { 
  viewMode?: 'grid' | 'list',
  selectedIds?: string[],
  onToggleSelection?: (id: string, e: React.MouseEvent) => void
}) => {
  const { theme } = useUIStore();
  const router = useRouter();
  const { swarms, isLoading } = useSwarmStore();

  if (isLoading) return (
    <ResourceSkeleton 
      viewMode={viewMode === 'grid' ? 'grid' : 'list'} 
      className={cn(
        viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-3"
      )}
    />
  );

  return (
    <div className={cn(
      "transition-all duration-500",
      viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-3"
    )}>
      <AnimatePresence mode="popLayout">
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
              onClick={() => router.push(`/swarms/${ws.id}`)}
              className={cn(
                "group transition-all cursor-pointer relative overflow-hidden border shadow-xl flex flex-col",
                viewMode === 'grid' ? "p-8 rounded-[40px]" : "p-4 pr-8 rounded-[28px] flex-row items-center justify-between",
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
                  onToggleSelection?.(ws.id, e);
                }}
                className={cn(
                "rounded-full border-2 flex items-center justify-center transition-all absolute z-30 cursor-pointer",
                viewMode === 'grid' ? "w-7 h-7 top-6 right-6" : "w-6 h-6 left-4 top-1/2 -translate-y-1/2",
                selectedIds.includes(ws.id)
                  ? "bg-indigo-500 border-indigo-500 text-white scale-110 shadow-lg shadow-indigo-500/20" 
                  : "border-slate-700 bg-slate-950 opacity-0 group-hover:opacity-100"
              )}>
                {selectedIds.includes(ws.id) && <Check size={viewMode === 'grid' ? 14 : 12} strokeWidth={4} />}
              </div>
  
              <div 
                className={cn("flex items-center", viewMode === 'grid' ? "flex-col items-start" : "gap-6 pl-12")}
                onClick={() => router.push(`/swarms/${ws.id}`)}
              >
                <div className={cn(
                  "rounded-2xl shadow-inner border transition-transform group-hover:scale-110", 
                  getColorClasses(ws.color, theme),
                  viewMode === 'grid' ? "p-4 mb-8" : "p-3"
                )}>
                  <Icon size={viewMode === 'grid' ? 26 : 18} />
                </div>
                
                <div className={viewMode === 'grid' ? "" : "flex-1"}>
                  <h4 className={cn(
                    "font-black tracking-tight transition-colors", 
                    theme === 'dark' ? "text-slate-200 group-hover:text-white" : "text-slate-950 group-hover:text-indigo-600",
                    viewMode === 'grid' ? "text-xl" : "text-sm"
                  )}>
                    {ws.name}
                  </h4>
                  <div className={cn("flex items-center gap-2 mt-2 group-hover:translate-x-1 transition-transform")}>
                    <MapPin size={12} className="text-slate-500 opacity-60" />
                    <p className={cn(
                      "font-mono font-bold truncate tracking-tight uppercase", 
                      theme === 'dark' ? "text-slate-600" : "text-slate-400",
                      viewMode === 'grid' ? "text-[10px]" : "text-[9px]"
                    )}>
                      {ws.path}
                    </p>
                  </div>
                </div>
              </div>
  
              <div className={cn("flex", viewMode === 'grid' ? "flex-col gap-4 mt-8" : "items-center gap-8")}>
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
                    <ChevronRight size={viewMode === 'grid' ? 24 : 18} className={cn(
                      "transition-all",
                      viewMode === 'grid' ? "absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-2" : "",
                      theme === 'dark' ? "text-slate-700" : "text-slate-200"
                    )} />
                 </div>
              </div>
  
              {viewMode === 'grid' && (
                <div className={cn(
                  "absolute -right-10 -bottom-10 w-40 h-40 blur-[80px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity",
                  ws.color === 'indigo' && 'bg-indigo-500',
                  ws.color === 'emerald' && 'bg-emerald-500',
                  ws.color === 'amber' && 'bg-amber-500',
                  ws.color === 'rose' && 'bg-rose-500'
                )} />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
      
      <motion.button 
        layout
        className={cn(
          "border-2 border-dashed border-slate-200 dark:border-slate-800/50 hover:border-indigo-500/50 hover:bg-white dark:hover:bg-slate-950/50 transition-all flex group active:scale-95 shadow-inner",
          viewMode === 'grid' ? "p-8 rounded-[40px] flex-col items-center justify-center gap-4" : "p-4 rounded-[24px] items-center justify-center gap-4",
          theme === 'light' && "bg-slate-50/50 hover:shadow-2xl hover:shadow-indigo-500/10"
        )}
      >
         <div className={cn(
           "rounded-full transition-all group-hover:rotate-90 group-hover:scale-110 flex items-center justify-center border",
           theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-500 group-hover:text-indigo-400" : "bg-white border-slate-100 text-slate-400 group-hover:text-indigo-600 shadow-sm",
           viewMode === 'grid' ? "p-4" : "p-2"
         )}>
            <Plus size={viewMode === 'grid' ? 28 : 18} />
         </div>
         <span className={cn(
           "font-black uppercase tracking-[0.3em]", 
           theme === 'dark' ? "text-slate-600 group-hover:text-indigo-400" : "text-slate-500 group-hover:text-indigo-600",
           viewMode === 'grid' ? "text-[11px]" : "text-[10px]"
          )}>
           Initialize Swarm
          </span>
      </motion.button>
    </div>
  );
};
