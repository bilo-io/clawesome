'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderKanban, 
  ChevronRight,
  Target,
  Users,
  Clock,
  CircleDot,
  Search,
  Plus,
  Trash2,
  Copy,
  Download,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';
import { useSelectionStore } from '@/store/useSelectionStore';
import { useProjectStore } from '@/store/useProjectStore';
import { ResourceSkeleton } from '@/components/ResourceSkeleton';


export default function ProjectsPage() {
  const { theme, getViewMode, setViewMode } = useUIStore();
  const { selectedIds, toggleSelection, clearSelection, setSelection } = useSelectionStore();
  const { projects, fetchProjects, isLoading } = useProjectStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'wip' | 'Planned' | 'done'>('all');
  const viewMode = (getViewMode('/projects', 'grid') as 'grid' | 'list');

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Clear selection on unmount
  useEffect(() => {
    return () => clearSelection();
  }, [clearSelection]);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const isAllSelected = filteredProjects.length > 0 && filteredProjects.every(p => selectedIds.includes(p.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      clearSelection();
    } else {
      setSelection(filteredProjects.map(p => p.id));
    }
  };

  const bulkActions = selectedIds.length > 0 ? (
    <>
      <button className={cn(
        "flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95",
        theme === 'dark' ? "bg-rose-500/10 border-rose-500/20 text-rose-500" : "bg-rose-50 border-rose-200 text-rose-600 shadow-sm"
      )}>
        <Trash2 size={14} /> Terminate Projects ({selectedIds.length})
      </button>
      <button className={cn(
        "flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95",
        theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-100 text-slate-600 shadow-sm"
      )}>
        <Copy size={14} /> Duplicate Blueprint
      </button>
      <button className={cn(
        "flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95",
        theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-100 text-slate-600 shadow-sm"
      )}>
        <Download size={14} /> Archive Assets
      </button>
    </>
  ) : null;



  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <DashboardResourceHeader
        title="Projects"
        description="Unified workspace for mission orchestration and tactical objective tracking. Monitor the progress of active campaigns and resource allocation across different sectors."
        badge="NC-PROJECTS"
        statusLabel="Project Matrix:"
        statusValue="SYNCED"
        statusColor="indigo"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="SEARCH PROJECT REVERB..."
        viewMode={viewMode}
        onViewModeChange={(mode: any) => setViewMode('/projects', mode)}
        isCollection={true}
        allSelected={isAllSelected}
        someSelected={selectedIds.length > 0 && !isAllSelected}
        onSelectAll={handleSelectAll}
        bulkActions={bulkActions}
        renderRight={
          <button
            onClick={() => {}}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white rounded-full font-bold shadow-xl shadow-purple-600/20 transition-all active:translate-y-1"
          >
            <Plus size={20} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Initialize Project</span>
          </button>
        }
      />

      {isLoading ? (
        <ResourceSkeleton 
          viewMode={viewMode} 
          className={cn(
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
              : "space-y-4"
          )} 
        />
      ) : (
        <div className={cn(
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
            : "space-y-4"
        )}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link href={`/projects/${project.id}`} className="block relative transition-all">
                  {viewMode === 'grid' ? (
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
                          toggleSelection(project.id);
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
                ) : (
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
                        toggleSelection(project.id);
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
                )}
              </Link>
            </motion.div>
          ))}
          </AnimatePresence>
          {filteredProjects.length === 0 && (
            <div className="py-40 text-center flex flex-col items-center gap-6">
               <div className="p-10 rounded-full bg-slate-100 dark:bg-slate-900/50 text-slate-400 border border-slate-200 dark:border-slate-800 shadow-inner">
                  <Search size={48} className="opacity-20" />
               </div>
               <div>
                  <h3 className="text-xl font-black dark:text-white uppercase tracking-tight">Empty Project Void</h3>
                  <p className="text-slate-500 font-medium">No projects found matching your neural signature.</p>
               </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
