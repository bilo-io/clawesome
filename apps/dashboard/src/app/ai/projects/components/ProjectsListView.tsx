import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CircleDot, Check } from 'lucide-react';
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

interface ProjectsListViewProps {
  projects: Project[];
  theme: 'light' | 'dark';
  selectedIds: string[];
  onToggleSelection: (id: string) => void;
}

export const ProjectsListView = ({
  projects,
  theme,
  selectedIds,
  onToggleSelection
}: ProjectsListViewProps) => (
  <div className="space-y-4">
    <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
      <InitializeCard label="Initialize Project" onClick={() => {}} viewMode="list" />
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
            "p-4 rounded-[28px] border flex items-center gap-6 transition-all relative pl-16",
            selectedIds.includes(project.id)
              ? (theme === 'dark' ? "bg-indigo-500/10 border-indigo-500/50" : "bg-indigo-50 border-indigo-500")
              : (theme === 'dark' 
                  ? "bg-slate-900/40 border-slate-800/60 hover:bg-slate-900 hover:border-indigo-500/30 shadow-none" 
                  : "bg-white border-slate-100 shadow-xl shadow-slate-200/20 hover:border-indigo-200")
          )}>
            {/* Selection Indicator for List */}
            <div 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleSelection(project.id);
              }}
              className={cn(
              "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all absolute left-6 top-1/2 -translate-y-1/2 z-30 cursor-pointer",
              selectedIds.includes(project.id)
                ? "bg-indigo-500 border-indigo-500 text-white scale-110 shadow-lg shadow-indigo-500/20" 
                : "border-slate-700 bg-slate-950 opacity-0 group-hover:opacity-100"
            )}>
              {selectedIds.includes(project.id) && <Check size={12} strokeWidth={4} />}
            </div>
             <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
                <CircleDot size={20} />
             </div>
             <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                   <h3 className={cn("text-lg font-black uppercase tracking-tight truncate max-w-md", theme === 'dark' ? "text-white" : "text-slate-900")}>
                      {project.name}
                   </h3>
                    <span className={cn(
                      "px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border",
                      project.status === 'wip' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                      project.status === 'Planned' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                      "bg-white/10 text-slate-400 border-white/5"
                    )}>
                       {project.status === 'done' ? 'done' : project.status}
                    </span>
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{project.type}</p>
             </div>
             <div className="flex -space-x-3">
                {project.agents.map((agent, i) => (
                   <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-gradient-to-tr from-[#8C00FF] to-[#008FD6] flex items-center justify-center text-[8px] font-black text-white">
                      {agent.name.charAt(0)}
                   </div>
                ))}
             </div>
              <div className="flex flex-col items-end min-w-[120px]">
                 <span className={cn("text-base font-black font-mono", theme === 'dark' ? "text-white" : "text-black")}>{project.taskCount} TASKS</span>
                 <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden my-2">
                    <div className="h-full bg-gradient-to-r from-[#8C00FF] to-[#008FD6]" style={{ width: `${project.progress}%` }} />
                 </div>
                 <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{project.lastUpdated}</span>
              </div>
          </div>
        </Link>
      </motion.div>
    ))}
  </div>
);
