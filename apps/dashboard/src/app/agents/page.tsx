// apps/dashboard/src/app/agents/page.tsx
'use client';

import React, { useState } from 'react';
import { Users, Plus } from 'lucide-react';
import { useAgentStore } from '@/store/useAgentStore';
import { AgentCard } from '@/components/AgentCard';
import { CreateAgentModal } from '@/components/CreateAgentModal';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';
import { useRouter } from 'next/navigation';

export default function AgentsPage() {
  const router = useRouter();
  const { agents, deleteAgent } = useAgentStore();
  const { theme, getViewMode, setViewMode: storeSetView } = useUIStore();
  // agents page uses 'grid' | 'table'; UIStore uses 'grid' | 'list' | 'table'
  const rawMode = getViewMode('/agents', 'grid');
  const viewMode: 'grid' | 'table' = rawMode === 'list' ? 'grid' : (rawMode as 'grid' | 'table');
  const setViewMode = (m: 'grid' | 'list') => storeSetView('/agents', m === 'list' ? 'table' : 'grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
      <DashboardResourceHeader
        title="Agents"
        description="Management and maintenance of autonomous neural entities. Orchestrate your workforce of specialized agents for complex mission fulfillment."
        badge="NC-PROJECTS"
        statusLabel="Agent Workforce:"
        statusValue={`${agents.length} ACTIVE SOULS`}
        statusColor="indigo"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search agents by name or title..."
        viewMode={viewMode === 'table' ? 'list' : 'grid'}
        onViewModeChange={(mode: 'grid' | 'list') => setViewMode(mode)}
        renderRight={
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white rounded-full font-bold shadow-xl shadow-purple-600/20 transition-all active:translate-y-1"
          >
            <Plus size={20} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Deploy New Agent</span>
          </button>
        }
        showFilter
      />

      {/* Content */}
      <AnimatePresence mode="popLayout">
        {filteredAgents.length > 0 ? (
          <motion.div
            key="list"
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
                  onDelete={deleteAgent}
                  onClick={() => router.push(`/agents/${agent.id}`)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
               "flex flex-col items-center justify-center py-32 rounded-[48px] border-2 border-dashed shadow-inner transition-colors",
               theme === 'dark' ? "bg-slate-900/10 border-slate-800/30" : "bg-slate-50 border-slate-200"
            )}
          >
            <div className={cn(
              "w-24 h-24 rounded-[32px] flex items-center justify-center mb-8 shadow-2xl border",
              theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-700 shadow-black/50" : "bg-white border-slate-100 text-slate-200"
            )}>
              <Users size={48} />
            </div>
            <h3 className={cn("text-2xl font-bold mb-4", theme === 'dark' ? "text-white" : "text-slate-900")}>
               Autonomous Workforce Offline
            </h3>
            <p className={cn("text-sm max-w-sm text-center leading-relaxed font-medium mb-10", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>
              No active neural souls detected. Initialization sequences are ready to begin at your command.
            </p>
            <button
               onClick={() => setIsModalOpen(true)}
               className="flex items-center gap-4 px-12 py-4 bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white rounded-full font-bold shadow-xl shadow-purple-600/20 transition-all active:translate-y-1"
            >
              <Plus size={20} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Initialize High-Level Souls</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <CreateAgentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
