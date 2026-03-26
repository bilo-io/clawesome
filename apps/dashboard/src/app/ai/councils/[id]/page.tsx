'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Settings,
  Users,
  MessageSquare,
  Shield,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';
import { useUIStore } from '@/store/useUIStore';
import { ChatInterface, type ChatMessage } from '@clawesome/ui';

export default function CouncilDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const { theme } = useUIStore();
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Welcome to the Council deliberation. We are currently analyzing the Data Sovereignty Protocol. How would you like to proceed?',
      timestamp: '10:00 AM'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'deliberation' | 'counselors' | 'settings'>('deliberation');

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
        content: `I have processed your request regarding "${content}". The collective intelligence suggests that we should prioritize architectural integrity and security guardrails for this segment.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-[1600px] mx-auto space-y-6">
      <DashboardResourceHeader
        title={`Council Session #${id.slice(0, 4)}`}
        description="Collaborative AI reasoning for high-stakes protocol alignment and strategic decision making."
        badge="NC-COUNCIL-CORE"
        statusLabel="Status:"
        statusValue="Active Deliberation"
        statusColor="indigo"
        isCollection={false}
        renderRight={
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.push('/ai/councils')}
              className={cn(
                 "flex items-center gap-2 p-3 px-6 rounded-2xl transition-all border",
                 theme === 'dark' ? "bg-slate-800/50 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-500 hover:text-slate-900"
              )}
            >
              <ArrowLeft size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Back to Hub</span>
            </button>
          </div>
        }
      />

      <div className="flex-1 flex gap-6 overflow-hidden mb-4">
        {/* Navigation Sidebar */}
        <div className="w-20 bg-slate-900/40 border border-slate-800/60 rounded-3xl flex flex-col items-center py-8 gap-8">
           <button 
            onClick={() => setActiveTab('deliberation')}
            className={cn("p-4 rounded-2xl transition-all", activeTab === 'deliberation' ? "bg-indigo-600/10 text-indigo-500 shadow-inner shadow-indigo-500/10" : "text-slate-600 hover:text-slate-400")}
            title="Deliberation"
           >
            <MessageSquare size={24} />
           </button>
           <button 
            onClick={() => setActiveTab('counselors')}
            className={cn("p-4 rounded-2xl transition-all", activeTab === 'counselors' ? "bg-indigo-600/10 text-indigo-500" : "text-slate-600 hover:text-slate-400")}
            title="Counselors"
           >
            <Users size={24} />
           </button>
           <button 
            onClick={() => setActiveTab('settings')}
            className={cn("p-4 rounded-2xl transition-all", activeTab === 'settings' ? "bg-indigo-600/10 text-indigo-500" : "text-slate-600 hover:text-slate-400")}
            title="Protocol Settings"
           >
            <Settings size={24} />
           </button>
        </div>

        {/* Workspace */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'deliberation' && (
              <motion.div 
                key="chat"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col"
              >
                <ChatInterface 
                  messages={messages}
                  onSend={handleSend}
                  isLoading={isLoading}
                  agentName="Council Core"
                  agentStatus={isLoading ? 'thinking' : 'online'}
                  className="flex-1"
                />
              </motion.div>
            )}

            {activeTab === 'counselors' && (
              <motion.div 
                key="counselors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-full p-20 text-center space-y-4"
              >
                <div className="w-20 h-20 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                  <Shield size={40} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-white">Counselor Roster</h3>
                <p className="text-slate-500 max-w-md">Manage the specialized AI agents participating in this deliberation session.</p>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-full p-20 text-center space-y-4"
              >
                <div className="w-20 h-20 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                  <Sparkles size={40} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-white">Deliberation Protocol</h3>
                <p className="text-slate-500 max-w-md">Configure consensus thresholds, reasoning depth, and neural constraints.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
