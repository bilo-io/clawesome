'use client';

import React, { useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';
import { useAgentStore } from '@/store/useAgentStore';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';
import { AgentCard } from '@/components/AgentCard';
import { useSwarmStore } from '@/store/useSwarmStore';
import { ChevronLeft } from 'lucide-react';

export default function SwarmDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { theme, getViewMode, setViewMode: storeSetView } = useUIStore();
  const { swarms, fetchSwarms } = useSwarmStore();

  React.useEffect(() => {
    if (swarms.length === 0) {
      fetchSwarms();
    }
  }, [fetchSwarms, swarms.length]);
  
  const swarm = swarms.find((w) => w.id === id);
  
  const { agents } = useAgentStore();
  // For demo: Use all store agents, or generate fake ones if empty
  const [searchQuery, setSearchQuery] = useState('');
  
  const rawMode = getViewMode('/swarms-detail', 'grid');
  const viewMode: 'grid' | 'table' = rawMode === 'list' ? 'grid' : (rawMode as 'grid' | 'table');
  const setViewMode = (m: 'grid' | 'list') => storeSetView('/swarms-detail', m === 'list' ? 'table' : 'grid');

  if (!swarms.length) {
    return <div className="p-20 text-center opacity-40 animate-pulse font-black uppercase tracking-widest text-xs">Syncing Context...</div>;
  }

  if (!swarm) {
    return notFound();
  }

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
      <DashboardResourceHeader
        title={`Swarm: ${swarm.name}`}
        description={`Active resources for protocol: ${swarm.path}. Manage and observe agent tasks within this context.`}
        badge="NC-SWARM-CONTEXT"
        statusLabel="Swarm Status:"
        statusValue={swarm.status}
        statusColor={swarm.color as any}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search agents in this swarm..."
        viewMode={viewMode === 'table' ? 'list' : 'grid'}
        onViewModeChange={(mode: 'grid' | 'list') => setViewMode(mode)}
        renderRight={
          <button
            onClick={() => router.back()}
            className={cn(
               "flex items-center gap-2 p-3 px-6 rounded-2xl transition-all border",
               theme === 'dark' ? "bg-slate-800/50 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-500 hover:text-slate-900"
            )}
          >
            <ChevronLeft size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Back to Swarms</span>
          </button>
        }
      />

      <section className="space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredAgents.length > 0 ? (
            <motion.div
              layout
              className={cn(
                viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" 
                  : "space-y-4"
              )}
            >
              {filteredAgents.map((agent) => (
                <motion.div
                  layout
                  key={agent.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <AgentCard 
                    agent={agent} 
                    viewMode={viewMode === 'grid' ? 'grid' : 'table'}
                    onClick={() => router.push(`/agents/${agent.id}`)}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className={cn(
               "flex flex-col items-center justify-center py-20 rounded-[40px] border-2 border-dashed",
               theme === 'dark' ? "border-slate-800/50 text-slate-500" : "border-slate-200 text-slate-400"
            )}>
              <p className="font-bold text-sm tracking-widest uppercase">No agents active in this swarm constraints.</p>
            </div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
