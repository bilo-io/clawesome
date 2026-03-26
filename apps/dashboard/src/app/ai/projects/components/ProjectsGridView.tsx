import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FolderKanban, ChevronRight, Users, Target, Clock, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InitializeCard } from '@clawesome/ui';

interface Project {
  id: string;
  name: string;
  type: string;
  status: string;
  agents: { name: string }[];
  taskCount: number;
  progress: number;
  lastUpdated: string;
}

interface ProjectsGridViewProps {
  projects: Project[];
  theme: 'light' | 'dark';
  selectedIds: string[];
  onToggleSelection: (id: string) => void;
}

export const ProjectsGridView = ({
  projects,
  theme,
  selectedIds,
  onToggleSelection
}: ProjectsGridViewProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
      <InitializeCard label="Initialize Project" onClick={() => {}} viewMode="grid" />
    </motion.div>
    {projects.map((project, idx) => (
      <motion.div
        layout
        key={project.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ delay: idx * 0.05 }}
      >
        <Link href={`/projects/${project.id}`} className="block relative transition-all">
          <div className={cn(
            "relative h-full p-8 rounded-[48px] border transition-all overflow-hidden",
            selectedIds.includes(project.id)
              ? (theme === 'dark' ? "bg-indigo-500/10 border-indigo-500/50" : "bg-indigo-50 border-indigo-500")
              : (theme === 'dark' 
                  ? "bg-slate-900/40 border-slate-800/60 hover:bg-slate-900 hover:border-indigo-500/30 shadow-none" 
                  : "bg-white border-slate-100 shadow-2xl shadow-slate-200/40 hover:border-indigo-200")
          )}>
            {/* Selection Indicator */}
            <div 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleSelection(project.id);
              }}
              className={cn(
              "w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all absolute top-6 left-6 z-30 cursor-pointer",
              selectedIds.includes(project.id)
                ? "bg-indigo-500 border-indigo-500 text-white scale-110 shadow-lg shadow-indigo-500/20" 
                : "border-slate-700 bg-slate-950 opacity-0 group-hover:opacity-100"
            )}>
              {selectedIds.includes(project.id) && <Check size={14} strokeWidth={4} />}
            </div>

            <div className="flex justify-between items-start mb-10">
               <div className="flex flex-col gap-1">
                  <span className={cn(
                    "text-[10px] font-black tracking-widest uppercase mb-1",
                    theme === 'dark' ? "text-slate-600" : "text-slate-400"
                  )}>
                     {project.type}
                  </span>
                  <h3 className={cn(
                    "text-2xl font-black group-hover:text-indigo-500 transition-colors uppercase tracking-tight truncate whitespace-nowrap",
                    theme === 'dark' ? "text-white" : "text-slate-900"
                  )}>
                     {project.name}
                  </h3>
               </div>
               <div className={cn(
                 "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border",
                 project.status === 'wip' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                 project.status === 'Planned' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                 "bg-white/5 text-slate-400 border-white/10"
               )}>
                  {project.status === 'done' ? 'done' : project.status}
               </div>
            </div>

            <div className="flex flex-col gap-8">
               <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                     <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <Users size={12} className="text-indigo-500" />
                        Assigned Agents
                     </div>
                     <div className="flex -space-x-4 pl-1">
                        {project.agents.map((agent, i) => (
                           <div 
                              key={i} 
                              className={cn(
                                "w-10 h-10 rounded-full border-4 transition-transform group-hover:scale-110",
                                theme === 'dark' ? "bg-slate-800 border-slate-950" : "bg-white border-white shadow-sm"
                              )}
                              title={agent.name}
                           >
                              <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#8C00FF] to-[#008FD6] flex items-center justify-center text-[10px] font-black text-white">
                                 {agent.name.charAt(0)}
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                     <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">
                        Tasks
                        <Target size={12} className="text-indigo-500" />
                     </div>
                     <span className={cn("text-2xl font-black font-mono", theme === 'dark' ? "text-white" : "text-black")}>
                        {project.taskCount}
                     </span>
                  </div>
               </div>

               <div className="space-y-2">
                  <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-500">
                     <span>Operational Lead</span>
                     <span>{project.progress}%</span>
                  </div>
                  <div className="w-full h-1 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, ease: "circOut" }}
                        className="h-full bg-gradient-to-r from-[#8C00FF] to-[#008FD6] shadow-[0_0_12px_rgba(140,0,255,0.3)]"
                     />
                  </div>
               </div>

               <div className={cn(
                  "pt-6 border-t flex items-center justify-between",
                  theme === 'dark' ? "border-slate-800/50" : "border-slate-100"
               )}>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                     <Clock size={12} />
                     {project.lastUpdated}
                  </div>
                  <div className="flex items-center gap-1 group-hover:gap-2 transition-all text-[#8C00FF] font-black text-[11px] uppercase tracking-widest">
                     ACCESS ARCHIVE
                     <ChevronRight size={14} />
                  </div>
               </div>
            </div>

            {/* Industrial background accent */}
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <FolderKanban size={60} />
            </div>
          </div>
        </Link>
      </motion.div>
    ))}
  </div>
);
