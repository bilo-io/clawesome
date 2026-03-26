'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, ChevronRight, Plus, LayoutGrid, List, Search, Filter, Trash2, Copy, Download, Check } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';
import { useSelectionStore } from '@/store/useSelectionStore';

const CHAT_TRANSITION = { duration: 0.35, ease: [0.32, 0.72, 0, 1] as const };

const MOCK_CHATS = [
  { id: '1', title: 'Workspace analysis & security audit', preview: 'NC-01 on-line. Scanning workspace...', updatedAt: '2m ago' },
  { id: '2', title: 'Token usage & cost breakdown', preview: 'Retrieving telemetry. Over the last 24h...', updatedAt: '15m ago' },
  { id: '3', title: 'Mission logs summary', preview: 'Searching logs. Recent missions: REF-781...', updatedAt: '1h ago' },
  { id: '4', title: 'Senior Dev agent profile', preview: "Neural profile updated. Identity: 'Senior Engineer'...", updatedAt: 'Yesterday' },
  { id: '5', title: 'Dashboard refactor scope', preview: 'Proposed scope: Sidebar, Usage charts...', updatedAt: '2 days ago' },
];

export default function ChatsPage() {
  const router = useRouter();
  const { theme, getViewMode, setViewMode } = useUIStore();
  const { selectedIds, toggleSelection, clearSelection, setSelection } = useSelectionStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [exitingId, setExitingId] = useState<string | null>(null);
  const viewMode = (getViewMode('/ops/chat', 'grid') as 'grid' | 'list');

  // Clear selection on unmount
  useEffect(() => {
    return () => clearSelection();
  }, [clearSelection]);

  const filteredChats = MOCK_CHATS.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isAllSelected = filteredChats.length > 0 && filteredChats.every(chat => selectedIds.includes(chat.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      clearSelection();
    } else {
      setSelection(filteredChats.map(chat => chat.id));
    }
  };

  const bulkActions = selectedIds.length > 0 ? (
    <>
      <button className={cn(
        "flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95",
        theme === 'dark' ? "bg-rose-500/10 border-rose-500/20 text-rose-500" : "bg-rose-50 border-rose-200 text-rose-600 shadow-sm"
      )}>
        <Trash2 size={14} /> Burn Threads ({selectedIds.length})
      </button>
      <button className={cn(
        "flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95",
        theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-100 text-slate-600 shadow-sm"
      )}>
        <Copy size={14} /> Duplicate Logs
      </button>
      <button className={cn(
        "flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95",
        theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-100 text-slate-600 shadow-sm"
      )}>
        <Download size={14} /> Export Transcript
      </button>
    </>
  ) : null;

  const handleSelectChat = (id: string, e?: React.MouseEvent) => {
    if (e) {
      // If we are checking the type of the target, but let's just make it simple
    }
    setExitingId(id);
  };

  const handleListExitComplete = () => {
    if (exitingId) {
      router.push(`/ops/chat/${exitingId}`);
    }
  };

  return (
    <main className="max-w-[1200px] mx-auto space-y-6 pb-20">
      <DashboardResourceHeader
        title="Chats"
        description="Encrypted communication channels and thought-stream archives. Review past missions or initiate new neural dialogues with your agent collective."
        badge="MISSION_CONTROL"
        statusLabel="Active Protocol:"
        statusValue="NC-CORE-7"
        statusColor="indigo"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isCollection={true}
        allSelected={isAllSelected}
        someSelected={selectedIds.length > 0 && !isAllSelected}
        onSelectAll={handleSelectAll}
        bulkActions={bulkActions}
        viewMode={viewMode}
        onViewModeChange={(mode: any) => setViewMode('/ops/chat', mode)}
        searchPlaceholder="SEARCH THREADS..."
        renderRight={
          <button
            onClick={() => router.push('/ops/chat/new')}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white rounded-full font-bold shadow-xl shadow-purple-600/20 transition-all active:translate-y-1"
          >
            <Plus size={20} />
            <span className="text-[10px] font-bold uppercase tracking-widest">New Chat</span>
          </button>
        }
      />

      <div className="relative">
        <AnimatePresence mode="popLayout" onExitComplete={handleListExitComplete}>
          {exitingId ? null : (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={CHAT_TRANSITION}
              className={cn(
                viewMode === 'grid'
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-3"
              )}
            >
              {filteredChats.map((chat) => (
                <motion.div
                  layout
                  transition={{ layout: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }, opacity: { duration: 0.3 } }}
                  key={chat.id}
                  onClick={() => handleSelectChat(chat.id)}
                  className={cn(
                    "group relative border transition-all cursor-pointer overflow-hidden",
                    selectedIds.includes(chat.id)
                      ? (theme === 'dark' ? "bg-indigo-500/10 border-indigo-500/50" : "bg-indigo-50 border-indigo-500")
                      : (theme === 'dark'
                        ? "bg-slate-900/40 border-slate-800/60 hover:bg-slate-900 hover:border-indigo-500/30"
                        : "bg-white border-slate-100 shadow-xl shadow-slate-200/20 hover:border-indigo-200"),
                    viewMode === 'grid'
                      ? "rounded-[32px] p-6 flex flex-col"
                      : "rounded-[28px] p-4 pr-6 flex items-center gap-5 pl-12"
                  )}
                >
                  {/* Selection Indicator */}
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleSelection(chat.id);
                    }}
                    className={cn(
                    "rounded-full border-2 flex items-center justify-center transition-all absolute z-30 cursor-pointer",
                    viewMode === 'grid' ? "w-7 h-7 top-5 left-5" : "w-6 h-6 left-4 top-1/2 -translate-y-1/2",
                    selectedIds.includes(chat.id)
                      ? "bg-indigo-500 border-indigo-500 text-white scale-110 shadow-lg shadow-indigo-500/20" 
                      : cn(
                          "opacity-0 group-hover:opacity-100",
                          theme === 'dark' ? "border-slate-700 bg-slate-950" : "border-slate-200 bg-white shadow-sm"
                        )
                  )}>
                    {selectedIds.includes(chat.id) && <Check size={viewMode === 'grid' ? 14 : 12} strokeWidth={4} />}
                  </div>
                  {/* Icon */}
                  <div className={cn(
                    "rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                    theme === 'dark' ? "bg-slate-800 text-indigo-400" : "bg-slate-100 text-indigo-600",
                    viewMode === 'grid' ? "w-14 h-14 mb-5 ml-6" : "w-10 h-10"
                  )}>
                    <MessageSquare size={viewMode === 'grid' ? 26 : 20} />
                  </div>

                  {/* Body */}
                  <div className="flex-1 min-w-0">
                    {viewMode === 'list' ? (
                      // ── Compact list row ──
                      <div className="flex items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className={cn(
                            "text-sm font-black tracking-tight truncate",
                            theme === 'dark' ? "text-white" : "text-slate-900"
                          )}>
                            {chat.title}
                          </h3>
                          <p className={cn(
                            "text-xs font-medium truncate mt-0.5",
                            theme === 'dark' ? "text-slate-600" : "text-slate-400"
                          )}>
                            {chat.preview}
                          </p>
                        </div>
                        <span className={cn(
                          "shrink-0 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg",
                          theme === 'dark' ? "bg-slate-800 text-slate-500" : "bg-slate-50 text-slate-400"
                        )}>
                          {chat.updatedAt}
                        </span>
                        <ChevronRight size={16} className={cn(
                          "shrink-0 transition-transform group-hover:translate-x-1",
                          theme === 'dark' ? "text-slate-700" : "text-slate-300"
                        )} />
                      </div>
                    ) : (
                      // ── Grid card ──
                      <>
                        <div className="flex items-start justify-between gap-4">
                          <h3 className={cn(
                            "text-lg font-black tracking-tight truncate",
                            theme === 'dark' ? "text-white" : "text-slate-900"
                          )}>
                            {chat.title}
                          </h3>
                          <ChevronRight size={18} className={cn(
                            "shrink-0 transition-transform group-hover:translate-x-1",
                            theme === 'dark' ? "text-slate-600" : "text-slate-300"
                          )} />
                        </div>
                        <p className={cn(
                          "text-xs font-medium mt-1 line-clamp-2",
                          theme === 'dark' ? "text-slate-500" : "text-slate-500"
                        )}>
                          {chat.preview}
                        </p>
                        <div className="flex items-center justify-between mt-6">
                          <span className={cn(
                            "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest",
                            theme === 'dark' ? "bg-slate-800 text-slate-500" : "bg-slate-50 text-slate-400"
                          )}>
                            {chat.updatedAt}
                          </span>
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Glass shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
