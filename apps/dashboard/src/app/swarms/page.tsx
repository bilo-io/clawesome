// apps/dashboard/src/app/workspaces/page.tsx
'use client';

import React from 'react';
import { Briefcase, Globe, Plus, Search, ChevronRight, Activity, LayoutGrid, List } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { WorkspaceGallery } from '@/components/WorkspaceGallery';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';

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
  const [searchQuery, setSearchQuery] = React.useState('');
  const viewMode = (getViewMode('/swarms', 'grid') as 'grid' | 'list');

  return (
    <main className="space-y-10 pb-20 max-w-[1600px] mx-auto">
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
        onViewModeChange={(mode: any) => setViewMode('/swarms', mode)}
        searchPlaceholder="SEARCH SWARM PROTOCOL..."
        renderRight={<HeaderExternalSync />}
      />

      <section className="space-y-6">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-500">
              <Briefcase size={18} />
            </div>
            <h2 className={cn("text-[11px] font-black uppercase tracking-[0.3em]", theme === 'dark' ? "text-slate-500" : "text-slate-600")}>Active Swarm Nodes</h2>
        </div>
        <WorkspaceGallery viewMode={viewMode} />
      </section>
    </main>
  );
}
