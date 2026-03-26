// apps/dashboard/src/app/swarms/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Briefcase, Globe, Plus, Search, ChevronRight, Activity, LayoutGrid, List, Trash2, Copy, Download } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';
import { Button } from '@clawesome/ui';
import { useSelectionStore } from '@/store/useSelectionStore';
import { useSwarmStore } from '@/store/useSwarmStore';
import { SwarmGridView } from './components/SwarmGridView';
import { SwarmListView } from './components/SwarmListView';

const HeaderExternalSync = () => {
  const { theme } = useUIStore();
  return (
    <div className={cn(
      "flex items-center gap-4 p-2 pl-6 rounded-[24px] border transition-all",
      theme === 'dark' ? "bg-slate-900/60 border-slate-800 shadow-none" : "bg-white border-slate-100 shadow-xl shadow-slate-200/40"
    )}>
      <div className={cn("flex items-center gap-6 border-r pr-6", theme === 'dark' ? "border-slate-800" : "border-slate-100")}>
        <div className="flex items-center gap-3">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
           <div className="flex flex-col">
              <span className={cn("text-[8px] font-black uppercase tracking-widest leading-none", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>GitHub</span>
              <span className={cn("text-[9px] font-bold uppercase tracking-tight", theme === 'dark' ? "text-emerald-400" : "text-emerald-600")}>SYNCED</span>
           </div>
        </div>
        <div className="flex items-center gap-3">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
           <div className="flex flex-col">
              <span className={cn("text-[8px] font-black uppercase tracking-widest leading-none", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>CloudFlare</span>
              <span className={cn("text-[9px] font-bold uppercase tracking-tight", theme === 'dark' ? "text-indigo-400" : "text-indigo-600")}>TUNNEL_UP</span>
           </div>
        </div>
      </div>
      <button className={cn(
        "p-3 rounded-xl transition-all hover:bg-indigo-600 hover:text-white active:scale-95 group",
        theme === 'dark' ? "bg-slate-800 text-slate-500" : "bg-slate-50 text-slate-400 shadow-inner"
      )}>
        <Activity size={16} className="group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
};

export default function SwarmsPage() {
  const { theme, getViewMode, setViewMode } = useUIStore();
  const { selectedIds, toggleSelection, clearSelection, setSelection } = useSelectionStore();
  const { swarms, fetchSwarms } = useSwarmStore();
  const [searchQuery, setSearchQuery] = useState('');
  const viewMode = (getViewMode('/ai/swarms', 'grid') as 'grid' | 'list');

  useEffect(() => {
    fetchSwarms();
  }, [fetchSwarms]);

  // Clear selection on unmount
  useEffect(() => {
    return () => clearSelection();
  }, [clearSelection]);

  const filteredWorkspaces = swarms.filter(ws => 
    ws.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ws.path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isAllSelected = filteredWorkspaces.length > 0 && filteredWorkspaces.every(ws => selectedIds.includes(ws.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      clearSelection();
    } else {
      setSelection(filteredWorkspaces.map(ws => ws.id));
    }
  };

  const bulkActions = selectedIds.length > 0 ? (
    <>
      <button className={cn(
        "flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95",
        theme === 'dark' ? "bg-rose-500/10 border-rose-500/20 text-rose-500" : "bg-rose-50 border-rose-200 text-rose-600 shadow-sm"
      )}>
        <Trash2 size={14} /> Delete Swarms ({selectedIds.length})
      </button>
      <button className={cn(
        "flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95",
        theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-100 text-slate-600 shadow-sm"
      )}>
        <Copy size={14} /> Clone
      </button>
      <button className={cn(
        "flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95",
        theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-100 text-slate-600 shadow-sm"
      )}>
        <Download size={14} /> Export Manifest
      </button>
    </>
  ) : null;

  return (
    <main className="space-y-6 pb-20 max-w-[1600px] mx-auto">
      <DashboardResourceHeader
        title="Swarms"
        description="Collective intelligence orchestration for large-scale operations. Deploy and coordinate groups of specialized agents to execute complex, parallelized mission protocols."
        badge="NC-CONTEXT"
        statusLabel="Active Contexts:"
        statusValue="Isolated"
        statusColor="emerald"
        isCollection={true}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={(mode: any) => setViewMode('/ai/swarms', mode)}
        searchPlaceholder="SEARCH SWARM PROTOCOL..."
        renderRight={
          <div className="flex items-center gap-6">
            <HeaderExternalSync />
            <button 
              onClick={() => {}}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white rounded-full font-bold shadow-xl shadow-purple-600/20 transition-all active:translate-y-1"
            >
              <Plus size={20} />
              <span className="text-[10px] font-bold uppercase tracking-widest">New Swarm</span>
            </button>
          </div>
        }
        allSelected={isAllSelected}
        someSelected={selectedIds.length > 0 && !isAllSelected}
        onSelectAll={handleSelectAll}
        bulkActions={bulkActions}
      />

      <section className="space-y-6">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-500">
              <Briefcase size={18} />
            </div>
            <h2 className={cn("text-[11px] font-black uppercase tracking-[0.3em]", theme === 'dark' ? "text-slate-500" : "text-slate-600")}>Active Swarm Nodes</h2>
        </div>
        <div className="relative">
          {viewMode === 'grid' ? (
            <SwarmGridView 
              swarms={filteredWorkspaces}
              selectedIds={selectedIds}
              theme={theme}
              onToggleSelection={toggleSelection}
            />
          ) : (
            <SwarmListView 
              swarms={filteredWorkspaces}
              selectedIds={selectedIds}
              theme={theme}
              onToggleSelection={toggleSelection}
            />
          )}
        </div>
      </section>
    </main>
  );
}
