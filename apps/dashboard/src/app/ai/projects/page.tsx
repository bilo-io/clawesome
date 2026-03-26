'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';
import { useSelectionStore } from '@/store/useSelectionStore';
import { useProjectStore } from '@/store/useProjectStore';
import { ResourceSkeleton } from '@/components/ResourceSkeleton';
import { ProjectsGridView } from './components/ProjectsGridView';
import { ProjectsListView } from './components/ProjectsListView';
import { Trash2, Copy, Download, Plus, Search } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export default function ProjectsPage() {
  const { theme, getViewMode, setViewMode } = useUIStore();
  const { selectedIds, toggleSelection, clearSelection, setSelection } = useSelectionStore();
  const { projects, fetchProjects, isLoading } = useProjectStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'wip' | 'Planned' | 'done'>('all');
  const viewMode = (getViewMode('/ai/projects', 'grid') as 'grid' | 'list');

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
        onViewModeChange={(mode: any) => setViewMode('/ai/projects', mode)}
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
        <div className="relative">
          <AnimatePresence mode="popLayout">
            {viewMode === 'grid' ? (
              <ProjectsGridView 
                projects={filteredProjects}
                theme={theme}
                selectedIds={selectedIds}
                onToggleSelection={toggleSelection}
              />
            ) : (
              <ProjectsListView 
                projects={filteredProjects}
                theme={theme}
                selectedIds={selectedIds}
                onToggleSelection={toggleSelection}
              />
            )}
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
