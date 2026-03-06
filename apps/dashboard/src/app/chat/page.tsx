'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, ChevronRight, Plus, LayoutGrid, List, Search, Filter } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';

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
  const { theme } = useUIStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [exitingId, setExitingId] = useState<string | null>(null);

  const handleSelectChat = (id: string) => {
    setExitingId(id);
  };

  const handleListExitComplete = () => {
    if (exitingId) {
      router.push(`/chat/${exitingId}`);
    }
  };

  const filteredChats = MOCK_CHATS.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="max-w-[1200px] mx-auto space-y-10 pb-20">
      <DashboardResourceHeader
        title="Chats"
        description="Encrypted communication channels and thought-stream archives. Review past missions or initiate new neural dialogues with your agent collective."
        badge="MISSION_CONTROL"
        statusLabel="Active Protocol:"
        statusValue="NC-CORE-7"
        statusColor="indigo"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchPlaceholder="SEARCH THREADS..."
        renderRight={
          <button
            onClick={() => router.push('/chat/new')}
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
                "grid gap-6",
                viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              )}
            >
              {filteredChats.map((chat) => (
                <motion.div
                  layout
                  key={chat.id}
                  onClick={() => handleSelectChat(chat.id)}
                  className={cn(
                    "group relative rounded-[32px] border p-6 transition-all cursor-pointer overflow-hidden",
                    theme === 'dark' 
                      ? "bg-slate-900/40 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/60" 
                      : "bg-white border-slate-100 hover:border-indigo-200 hover:shadow-2xl shadow-slate-200/40 shadow-xl",
                    viewMode === 'list' && "flex items-center gap-6"
                  )}
                >
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 mb-4 transition-transform group-hover:scale-110",
                    theme === 'dark' ? "bg-slate-800 text-indigo-400" : "bg-slate-100 text-indigo-600",
                    viewMode === 'list' && "mb-0"
                  )}>
                    <MessageSquare size={26} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className={cn(
                        "text-lg font-black tracking-tight truncate",
                        theme === 'dark' ? "text-white" : "text-slate-900"
                      )}>
                        {chat.title}
                      </h3>
                      <ChevronRight size={18} className={cn(
                        "transition-transform group-hover:translate-x-1",
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
                  </div>

                  {/* Glass Reflection */}
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
