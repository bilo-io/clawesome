'use client';

import React, { useState, useEffect } from 'react';
import { 
  Database,
  Plus, 
  Trash2,
  Copy,
  Download
} from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';
import { useMemoryStore } from '@/store/useMemoryStore';
import { cn } from '@/lib/utils';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';
import { useRouter } from 'next/navigation';
import { useSelectionStore } from '@/store/useSelectionStore';
import { ResourceSkeleton } from '@/components/ResourceSkeleton';
import { MemoryGridView } from './components/MemoryGridView';
import { MemoryListView } from './components/MemoryListView';

export default function MemoriesPage() {
  const { theme, setViewMode: storeSetViewMode, getViewMode } = useUIStore();
  const { memories, addMemory, fetchMemories, isLoading } = useMemoryStore();
  const { selectedIds, toggleSelection, clearSelection, setSelection } = useSelectionStore();
  const router = useRouter();

  useEffect(() => {
    fetchMemories();
  }, [fetchMemories]);

  const viewMode = getViewMode('/ai/memory', 'grid') as 'grid' | 'list';
  const setViewMode = (mode: 'grid' | 'list') => storeSetViewMode('/ai/memory', mode as any);
  const [searchQuery, setSearchQuery] = useState('');

  // Clear selection on unmount
  useEffect(() => {
    return () => clearSelection();
  }, [clearSelection]);
  
  const filteredMemories = memories.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleCreateMemory = () => {
    const name = `Memory Cluster ${Math.floor(Math.random() * 1000)}`;
    addMemory(name);
    
    setTimeout(() => {
       const newest = useMemoryStore.getState().memories[0];
       if (newest) router.push(`/ai/memory/${newest.id}`);
    }, 100);
  };

  const isAllSelected = filteredMemories.length > 0 && filteredMemories.every(m => selectedIds.includes(m.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      clearSelection();
    } else {
      setSelection(filteredMemories.map(m => m.id));
    }
  };

  const bulkActions = selectedIds.length > 0 ? (
    <>
      <button className={cn(
        "flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95",
        theme === 'dark' ? "bg-rose-500/10 border-rose-500/20 text-rose-500" : "bg-rose-50 border-rose-200 text-rose-600 shadow-sm"
      )}>
        <Trash2 size={14} /> Purge Clusters ({selectedIds.length})
      </button>
      <button className={cn(
        "flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95",
        theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-100 text-slate-600 shadow-sm"
      )}>
        <Copy size={14} /> Replicate
      </button>
      <button className={cn(
        "flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95",
        theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-100 text-slate-600 shadow-sm"
      )}>
        <Download size={14} /> Snapshot JSON
      </button>
    </>
  ) : null;

  return (
    <main className="space-y-6 pb-20 max-w-[1600px] mx-auto transition-colors duration-300">
      <DashboardResourceHeader
        title="Memories"
        description="Persistent neural context and cognitive archives. Store and retrieve multi-modal data points to provide agents with extensive background knowledge and situational awareness."
        badge="NC-NEURAL CONTEXT"
        statusLabel="Context Capacity:"
        statusValue={`${memories.length} Clusters ACTIVE`}
        statusColor="indigo"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search context clusters..."
        isCollection={true}
        allSelected={isAllSelected}
        someSelected={selectedIds.length > 0 && !isAllSelected}
        onSelectAll={handleSelectAll}
        bulkActions={bulkActions}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        renderRight={
           <button
             onClick={handleCreateMemory}
             className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#8C00FF] to-[#008FD6] hover:opacity-90 text-white rounded-full font-bold shadow-xl shadow-purple-600/20 transition-all active:translate-y-1"
           >
             <Plus size={20} />
             <span className="text-[10px] font-bold uppercase tracking-widest">Create Memory</span>
           </button>
        }
      />

      {isLoading ? (
        <ResourceSkeleton 
          viewMode={viewMode === 'grid' ? 'grid' : 'list'} 
          className={cn(
            viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" : "space-y-4"
          )}
        />
      ) : (
        <div className="relative">
          <AnimatePresence mode="popLayout">
            {viewMode === 'grid' ? (
              <MemoryGridView 
                memories={filteredMemories}
                selectedIds={selectedIds}
                theme={theme}
                onToggleSelection={toggleSelection}
              />
            ) : (
              <MemoryListView 
                memories={filteredMemories}
                selectedIds={selectedIds}
                theme={theme}
                onToggleSelection={toggleSelection}
              />
            )}
          </AnimatePresence>
          {filteredMemories.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center opacity-50">
              <Database size={64} className="mb-6 opacity-30" />
              <h2 className="text-xl font-bold mb-2">No Memory Clusters Found</h2>
              <p className="text-sm">Create a new memory to start injecting situational context.</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
