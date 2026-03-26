// apps/dashboard/src/components/AILab.tsx
'use client';

import React, { useState } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  Command as CommandIcon,
  ChevronRight,
  Brain,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const AILab = () => {
  const { isFocusMode, theme, isAILabOpen, setAILabOpen } = useUIStore();
  const [showThoughts, setShowThoughts] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState([
    { id: 0, title: 'Mission 1', messages: [{ role: 'assistant', content: 'Ready to analyze NC-01 context. What is the objective?' }] }
  ]);

  const addTab = () => {
    const newId = tabs.length;
    setTabs([...tabs, { id: newId, title: `Mission ${newId + 1}`, messages: [] }]);
    setActiveTab(newId);
  };

  if (isFocusMode) return null;

  return (
    <AnimatePresence>
      {isAILabOpen && (
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={cn(
            "fixed right-0 top-0 h-screen z-[80] flex flex-row shadow-2xl overflow-hidden border-l",
            theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200",
            showThoughts ? 'w-[800px]' : 'w-[400px]'
          )}
        >
        {/* Thought Stream (Conditional) */}
        {showThoughts && (
          <div className={cn(
            "flex-1 border-r flex flex-col transition-colors",
            theme === 'dark' ? "border-slate-800 bg-black/40" : "border-slate-100 bg-slate-50/50"
          )}>
            <header className={cn(
              "h-20 border-b flex items-center gap-2 px-6 text-[10px] font-bold uppercase tracking-[0.2em] shrink-0",
              theme === 'dark' ? "border-slate-800 text-slate-500" : "border-slate-100 text-slate-400"
            )}>
               <Brain size={14} className="text-indigo-500" />
               Thought Stream // NC-R1-TRACE
            </header>
            <div className={cn(
              "flex-1 p-6 font-mono text-[11px] space-y-4 overflow-y-auto no-scrollbar",
              theme === 'dark' ? "text-indigo-300/80" : "text-indigo-600/80"
            )}>
               <div className="flex gap-2">
                 <span className={theme === 'dark' ? "text-slate-600" : "text-slate-400"}>[01:25:01]</span>
                 <span>SCANNING WORKSPACE: /Users/bilolwabona/BiloDev/clawesome</span>
               </div>
               <div className="flex gap-2 text-emerald-500 font-bold">
                 <span className={theme === 'dark' ? "text-slate-600" : "text-slate-400"}>[01:25:04]</span>
                 <span>CONSTRUCTING PLAN: REFACTOR_DASHBOARD_V2</span>
               </div>
               <div className={cn(
                 "pl-4 border-l space-y-2",
                 theme === 'dark' ? "border-slate-800" : "border-slate-200"
               )}>
                  <p>&gt; Step 1: Update Sidebar nav links</p>
                  <p>&gt; Step 2: Build Mission Control cards</p>
                  <p className="animate-pulse">&gt; Step 3: Integrating WebSocket telemetry...</p>
               </div>
            </div>
          </div>
        )}

        {/* Chat Panel */}
        <div className="w-[400px] flex flex-col h-full shrink-0">
          <header className={cn(
            "h-20 border-b flex items-center px-6 backdrop-blur-md shrink-0",
            theme === 'dark' ? "border-slate-800 bg-slate-950/50" : "border-slate-100 bg-white/50"
          )}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                  <Sparkles size={20} className="animate-pulse" />
                </div>
                <div>
                   <span className={cn("block text-sm font-bold tracking-tight", theme === 'dark' ? "text-white" : "text-slate-900")}>AI LAB</span>
                   <span className="block text-[9px] font-bold text-indigo-500 uppercase tracking-widest mt-0.5">Neural Hub</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowThoughts(!showThoughts)}
                  className={cn(
                    "p-2 rounded-xl transition-all border",
                    showThoughts 
                      ? "bg-indigo-600 text-white border-indigo-500 shadow-md" 
                      : (theme === 'dark' ? "bg-slate-900 text-slate-500 border-slate-800 hover:text-white" : "bg-slate-50 text-slate-400 border-slate-100 hover:text-slate-900")
                  )}
                  title="Toggle Thought Stream"
                >
                  <Brain size={18} />
                </button>
                <button 
                  onClick={() => setAILabOpen(false)}
                  className={cn(
                    "p-2 rounded-xl transition-all border",
                    theme === 'dark' ? "bg-slate-900 text-slate-500 border-slate-800 hover:text-white hover:bg-slate-800" : "bg-slate-50 text-slate-400 border-slate-100 hover:text-slate-900 hover:bg-slate-100"
                  )}
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </header>

          {/* Tighter Tabs Row */}
          <div className={cn(
            "h-12 border-b flex items-center gap-1 overflow-x-auto no-scrollbar px-6 shrink-0",
            theme === 'dark' ? "bg-slate-900/50 border-slate-800" : "bg-slate-50 border-slate-100"
          )}>
            {tabs.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap",
                  activeTab === idx 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : (theme === 'dark' ? 'bg-slate-900 text-slate-500 hover:text-slate-300' : 'bg-slate-100 text-slate-400 hover:text-slate-600')
                )}
              >
                {tab.title}
              </button>
            ))}
            <button 
              onClick={addTab}
              className={cn(
                "p-2 transition-colors",
                theme === 'dark' ? "text-slate-600 hover:text-indigo-400" : "text-slate-400 hover:text-indigo-500"
              )}
            >
              <Plus size={16} />
            </button>
          </div>

          <div className={cn(
            "flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar",
            theme === 'dark' ? "bg-slate-900/10" : "bg-slate-50/10"
          )}>
            {tabs[activeTab].messages.map((msg, i) => (
              <div key={i} className={cn("flex", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                <div className={cn(
                  "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed border",
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white shadow-lg border-indigo-500' 
                    : (theme === 'dark' ? 'bg-slate-800 text-slate-100 border-slate-700' : 'bg-white text-slate-800 border-slate-100 shadow-sm')
                )}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {/* Thinking Animation */}
            {activeTab === 0 && tabs[activeTab].messages.length > 0 && (
              <div className="flex justify-start">
                 <div className={cn(
                   "p-3 rounded-xl border flex gap-1.5 items-center",
                   theme === 'dark' ? "bg-slate-800/50 border-slate-800" : "bg-white border-slate-100 shadow-sm"
                 )}>
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                 </div>
              </div>
            )}
          </div>

          <footer className={cn(
            "p-6 border-t",
            theme === 'dark' ? "border-slate-800 bg-slate-950/50" : "border-slate-100 bg-white"
          )}>
            <div className="relative group">
              <textarea
                placeholder="Ask anything... (/ for library)"
                className={cn(
                  "w-full rounded-2xl p-4 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none h-24 transition-all border",
                  theme === 'dark' 
                    ? "bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-indigo-500/50" 
                    : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500"
                )}
              />
              <button className="absolute right-3 bottom-3 p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center">
                <Send size={18} />
              </button>
              <div className="absolute left-4 bottom-3 flex items-center gap-2 text-[10px] font-mono font-bold">
                <CommandIcon size={12} className="text-indigo-500" />
                <span className={cn("tracking-widest uppercase", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>Gateway Active</span>
              </div>
            </div>
          </footer>
        </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
