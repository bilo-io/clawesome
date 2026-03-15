'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Brain, 
  Plus, 
  MoreVertical,
  ChevronRight,
  Database,
  Trash2,
  Copy,
  Download,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';
import { useMemoryStore, MAX_DOCUMENTS } from '@/store/useMemoryStore';
import { cn } from '@/lib/utils';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';
import { YoutubeIcon, PDFIcon } from './components';
import { FileCode, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelectionStore } from '@/store/useSelectionStore';

export default function MemoriesPage() {
  const { theme, setViewMode: storeSetViewMode, getViewMode } = useUIStore();
  const { memories, addMemory, fetchMemories } = useMemoryStore();
  const { selectedIds, toggleSelection, clearSelection, setSelection } = useSelectionStore();
  const router = useRouter();

  useEffect(() => {
    fetchMemories();
  }, [fetchMemories]);

  const viewMode = getViewMode('/memory', 'grid');
  const setViewMode = (mode: 'grid' | 'list') => storeSetViewMode('/memory', mode as any);
  const [searchQuery, setSearchQuery] = useState('');

  // Clear selection on unmount
  useEffect(() => {
    return () => clearSelection();
  }, [clearSelection]);
  
  const filteredMemories = memories.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleCreateMemory = () => {
    // For demo purposes, we automatically create a new memory and redirect to its page
    const name = `Memory Cluster ${Math.floor(Math.random() * 1000)}`;
    addMemory(name);
    
    // In a real app we'd get the newly created ID, for now just use the topmost one after timeout
    setTimeout(() => {
       const newest = useMemoryStore.getState().memories[0];
       router.push(`/memory/${newest.id}`);
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

      {/* Memory View Content */}
      <div className={cn(
        viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" : "space-y-4"
      )}>
        <AnimatePresence mode="popLayout">
          {filteredMemories.map((memory) => (
            <motion.div 
              layout 
              key={memory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {viewMode === 'grid' ? (
                <MemoryCard 
                  memory={memory} 
                  theme={theme} 
                  selected={selectedIds.includes(memory.id)}
                  onToggleSelection={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleSelection(memory.id);
                  }}
                />
              ) : (
                <MemoryListItem 
                  memory={memory} 
                  theme={theme} 
                  selected={selectedIds.includes(memory.id)}
                  onToggleSelection={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleSelection(memory.id);
                  }}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredMemories.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center opacity-50">
            <Database size={64} className="mb-6 opacity-30" />
            <h2 className="text-xl font-bold mb-2">No Memory Clusters Found</h2>
            <p className="text-sm">Create a new memory to start injecting situational context.</p>
          </div>
        )}
      </div>
    </main>
  );
}

// Sub-components
function MemoryCard({ memory, theme, selected, onToggleSelection }: { memory: any, theme: 'light' | 'dark', selected?: boolean, onToggleSelection?: (e: React.MouseEvent) => void }) {
  return (
    <div 
      className={cn(
        "group p-8 rounded-[48px] border shadow-2xl relative overflow-hidden transition-all h-full block cursor-pointer",
        selected 
          ? (theme === 'dark' ? "bg-indigo-500/10 border-indigo-500/50" : "bg-indigo-50 border-indigo-500")
          : (theme === 'dark' ? "bg-slate-900/40 border-slate-800/60 shadow-black/40 hover:border-indigo-500/50" : "bg-white border-slate-100 shadow-slate-200/50 hover:border-indigo-400")
      )}
    >
      {/* Selection Indicator */}
      <div 
        onClick={onToggleSelection}
        className={cn(
        "w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all absolute top-6 left-6 z-20 cursor-pointer",
        selected 
          ? "bg-indigo-500 border-indigo-500 text-white scale-110 shadow-lg shadow-indigo-500/20" 
          : "border-slate-700 bg-slate-950 opacity-0 group-hover:opacity-100"
      )}>
        {selected && <Check size={14} strokeWidth={4} />}
      </div>

      <Link href={`/memory/${memory.id}`} className="block relative z-10 pl-6">
        <div className="flex justify-between items-start mb-8">
        <div className="p-4 bg-indigo-500/10 rounded-full border border-indigo-500/20 text-indigo-500 group-hover:scale-110 transition-transform">
           <Brain size={28} />
        </div>
        <button 
          onClick={(e) => e.preventDefault()}
          className={cn(
            "p-2 rounded-full border transition-colors",
            theme === 'dark' ? "bg-slate-950 border-slate-800 text-slate-500" : "bg-slate-50 border-slate-100 text-slate-400"
          )}
        >
           <MoreVertical size={16} />
        </button>
      </div>

      <div className="relative z-10">
        <h3 className={cn("text-2xl font-black tracking-tight mb-2 group-hover:text-indigo-500 transition-colors", theme === 'dark' ? "text-white" : "text-slate-900")}>
          {memory.name}
        </h3>
        <p className={cn("text-[10px] font-bold uppercase tracking-widest mb-8", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>
          Updated {memory.lastUpdated}
        </p>

        <div className="space-y-3">
          {memory.documents.slice(0, 3).map((doc: any) => (
            <div 
              key={doc.id}
              className={cn(
                "flex items-center justify-between p-3 rounded-full border text-sm transition-all",
                theme === 'dark' ? "bg-slate-950 border-slate-800/50" : "bg-slate-50 border-slate-100"
              )}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className={cn(
                  "p-1.5 rounded-lg shrink-0",
                  doc.type === 'youtube' ? 'text-red-500' :
                  doc.type === 'pdf' ? 'text-amber-500' :
                  doc.type === 'link' ? 'text-blue-500' : 'text-emerald-500'
                )}>
                   {doc.type === 'youtube' && <YoutubeIcon size={14} />}
                   {doc.type === 'pdf' && <PDFIcon size={14} />}
                   {doc.type === 'link' && <LinkIcon size={14} />}
                   {doc.type === 'text' && <FileCode size={14} />}
                </div>
                <span className={cn("font-bold truncate", theme === 'dark' ? "text-slate-300" : "text-slate-600")}>
                  {doc.name}
                </span>
              </div>
            </div>
          ))}
          {memory.documents.length > 3 && (
            <p className="text-xs text-slate-500 font-bold ml-2">+{memory.documents.length - 3} more data points...</p>
          )}
          {memory.documents.length === 0 && (
            <p className="text-xs text-slate-500 italic p-4 text-center border border-dashed border-slate-500/30 rounded-2xl">Neural void. Add data to begin.</p>
          )}
        </div>
      </div>

      </Link>

      {/* Background Decor */}
      <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full group-hover:bg-indigo-500/20 transition-colors pointer-events-none" />
    </div>
  );
}

function MemoryListItem({ memory, theme, selected, onToggleSelection }: { memory: any, theme: 'light' | 'dark', selected?: boolean, onToggleSelection?: (e: React.MouseEvent) => void }) {
  return (
    <div
      className={cn(
        "p-6 rounded-[32px] border transition-all flex items-center justify-between group h-full cursor-pointer relative",
        selected 
          ? (theme === 'dark' ? "bg-indigo-500/10 border-indigo-500/50" : "bg-indigo-50 border-indigo-500")
          : (theme === 'dark' ? "bg-slate-900/40 border-slate-800/60 hover:bg-slate-900 hover:border-indigo-500/50" : "bg-white border-slate-100 hover:shadow-xl shadow-slate-200/50 hover:border-indigo-400")
      )}
    >
      <div className="flex items-center gap-6">
        {/* Selection Circle */}
        <div 
          onClick={onToggleSelection}
          className={cn(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 cursor-pointer",
          selected 
            ? "bg-indigo-500 border-indigo-500 text-white scale-110 shadow-lg shadow-indigo-500/20" 
            : "border-slate-700 bg-slate-950 opacity-0 group-hover:opacity-100"
        )}>
          {selected && <Check size={12} strokeWidth={4} />}
        </div>

        <Link href={`/memory/${memory.id}`} className="flex items-center gap-6">
          <div className="p-3 bg-indigo-500/10 rounded-full border border-indigo-500/20 text-indigo-500 group-hover:scale-110 transition-transform">
             <Brain size={20} />
          </div>
          <div>
            <h3 className={cn("text-lg font-black tracking-tight group-hover:text-indigo-500 transition-colors", theme === 'dark' ? "text-white" : "text-slate-900")}>
              {memory.name}
            </h3>
            <p className={cn("text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 mt-1", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>
              {memory.documents.length}/{MAX_DOCUMENTS} Units <span className="text-slate-700">•</span> Updated {memory.lastUpdated}
            </p>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex -space-x-2">
            {memory.documents.slice(0, 3).map((doc: any, i: number) => (
              <div key={i} className={cn(
                "w-8 h-8 rounded-full border-2 flex items-center justify-center overflow-hidden",
                theme === 'dark' ? "bg-slate-950 border-slate-900 shadow-xl" : "bg-white border-slate-50 shadow-sm"
              )}>
                 {doc.type === 'youtube' && <YoutubeIcon size={14} />}
                 {doc.type === 'pdf' && <PDFIcon size={14} />}
                 {doc.type === 'link' && <LinkIcon size={14} className="text-blue-500" />}
                 {doc.type === 'text' && <FileCode size={14} className="text-emerald-500" />}
              </div>
            ))}
            {memory.documents.length > 3 && (
               <div className={cn(
                 "w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-[10px]",
                 theme === 'dark' ? "bg-slate-800 border-slate-900 text-slate-400 shadow-xl" : "bg-slate-100 border-slate-50 text-slate-500 shadow-sm"
               )}>
                 +{memory.documents.length - 3}
               </div>
            )}
        </div>
        <button className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:scale-105",
          theme === 'dark' ? "bg-slate-950 border-slate-800 text-slate-500 group-hover:text-indigo-400 group-hover:border-indigo-500/50" : "bg-slate-50 border-slate-100 text-slate-400 group-hover:text-indigo-600 shadow-sm group-hover:border-indigo-200"
        )}>
          <ChevronRight size={18} />
        </button>
      </div>
      </div>
    );
}
