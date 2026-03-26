'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Trash2,
  Copy,
  Download,
  ShieldAlert,
  Sparkles,
  Search,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';
import { useUIStore } from '@/store/useUIStore';
import { ChatInterface, type ChatMessage } from '@clawesome/ui';

export default function ChatDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const { theme } = useUIStore();
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Mission protocol initiated. Encryption active. Neural Link established. Accessing telemetry for workspace audit...',
      timestamp: 'Just now'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);
    
    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Acknowledged. Processing "${content}" through mission-control filters. Neural context updated. Swarm observation logs show stable activity in sectoral quadrant 7.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-[1200px] mx-auto space-y-6">
      <DashboardResourceHeader
        title={`Thread: ${id.slice(0, 8)}`}
        description="End-to-end encrypted neural dialogue between Mission Control and the collective soul."
        badge="NC-ENCRYPT-CH"
        statusLabel="Link Integrity:"
        statusValue="Secured"
        statusColor="indigo"
        isCollection={false}
        renderRight={
          <div className="flex items-center gap-3">
             <button 
              onClick={() => router.push('/ops/chat')}
              className={cn(
                 "flex items-center gap-2 p-3 px-6 rounded-2xl transition-all border",
                 theme === 'dark' ? "bg-slate-800/50 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-500 hover:text-slate-900"
              )}
            >
              <ArrowLeft size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Back</span>
            </button>
            <div className="flex items-center gap-2">
                <button className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-all">
                    <Download size={18} />
                </button>
                <button className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-all">
                    <Trash2 size={18} />
                </button>
            </div>
          </div>
        }
      />

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Main Interface */}
        <div className="flex-1 flex flex-col overflow-hidden">
           <ChatInterface 
              messages={messages}
              onSend={handleSend}
              isLoading={isLoading}
              agentName="Mission Assistant"
              agentStatus={isLoading ? 'thinking' : 'online'}
              className="flex-1"
            />
        </div>

        {/* Sidebar Info */}
        <div className="w-[320px] shrink-0 space-y-6 hidden xl:block">
            <div className="p-6 rounded-[32px] border border-slate-800 bg-slate-900/40 space-y-4">
                 <div className="flex items-center gap-2 text-indigo-400">
                    <ShieldAlert size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">Contextual Lock</span>
                 </div>
                 <p className="text-xs text-slate-500 leading-relaxed">
                    This thread is tied to the current neural workspace. Contextual memory is persistence across all linked sessions.
                 </p>
                 <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-slate-600 uppercase tracking-widest">Workspace ID</span>
                        <span className="text-slate-300 font-mono">WS_7781_A</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-slate-600 uppercase tracking-widest">Access Clearance</span>
                        <span className="text-indigo-500">S3_MISSION_CRIT</span>
                    </div>
                 </div>
            </div>

            <div className="p-6 rounded-[32px] border border-slate-800 bg-slate-900/40 space-y-4">
                 <div className="flex items-center gap-2 text-purple-400">
                    <Sparkles size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">Neural Insights</span>
                 </div>
                 <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/50">
                        <p className="text-[10px] text-slate-400">Agent suggests optimizing memory cluster NC-MEMORY-B based on recent queries.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/50">
                        <p className="text-[10px] text-slate-400">Anomalous pattern detected in Swarm-02 output. Mission control intervention advised.</p>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
}
