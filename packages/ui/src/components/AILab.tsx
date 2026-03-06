'use client';

import { useState } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  Command as CommandIcon,
  Brain,
  Plus
} from 'lucide-react';
import { cn } from '../utils';
import { useUI } from '../ThemeContext';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Tab {
  id: number;
  title: string;
  messages: Message[];
}

export interface Thought {
  timestamp: string;
  content: string;
  type?: 'default' | 'success';
}

export interface AILabProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  showThoughts: boolean;
  onToggleThoughts: () => void;
  tabs: Tab[];
  activeTab: number;
  onTabSelect: (index: number) => void;
  onAddTab: () => void;
  onSendMessage: (content: string) => void;
  thoughts: Thought[];
  isThinking?: boolean;
}

export const AILab = ({
  isOpen,
  onClose,
  onOpen,
  showThoughts,
  onToggleThoughts,
  tabs,
  activeTab,
  onTabSelect,
  onAddTab,
  onSendMessage,
  thoughts,
  isThinking
}: AILabProps) => {
  const { theme } = useUI();
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue('');
  };

  return (
    <>
      <button
        onClick={onOpen}
        className={cn(
          "fixed bottom-8 right-8 z-[60] p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group border overflow-hidden",
          theme === 'dark' 
            ? "bg-indigo-600 border-indigo-500/50 shadow-indigo-500/30" 
            : "bg-white border-slate-200 shadow-slate-200/50 hover:border-indigo-500",
          isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        )}
      >
         <div className={cn(
           "absolute inset-0 bg-indigo-600 transition-opacity",
           theme === 'dark' ? "opacity-100" : "opacity-0 group-hover:opacity-10"
         )} />
         <MessageCircle size={24} className={cn("relative z-10", theme === 'dark' ? "text-white" : "text-indigo-600 group-hover:text-white")} />
      </button>

      <div 
        className={cn(
          "fixed right-0 top-0 h-screen z-50 transition-all duration-500 ease-in-out flex flex-row shadow-2xl overflow-hidden border-l",
          theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200",
          isOpen ? 'translate-x-0' : 'translate-x-full',
          showThoughts ? 'w-[800px]' : 'w-[400px]'
        )}
      >
        {showThoughts && (
          <div className={cn(
            "flex-1 border-r flex flex-col transition-colors",
            theme === 'dark' ? "border-slate-800 bg-black/40" : "border-slate-100 bg-slate-50/50"
          )}>
            <header className={cn(
              "p-4 border-b flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]",
              theme === 'dark' ? "border-slate-800 text-slate-500" : "border-slate-100 text-slate-400"
            )}>
               <Brain size={14} className="text-indigo-500" />
               Thought Stream // NC-R1-TRACE
            </header>
            <div className={cn(
              "flex-1 p-6 font-mono text-[11px] space-y-4 overflow-y-auto no-scrollbar",
              theme === 'dark' ? "text-indigo-300/80" : "text-indigo-600/80"
            )}>
               {thoughts.map((t, i) => (
                 <div key={i} className={cn("flex gap-2", t.type === 'success' && "text-emerald-500 font-bold")}>
                   <span className={theme === 'dark' ? "text-slate-600" : "text-slate-400"}>[{t.timestamp}]</span>
                   <span>{t.content}</span>
                 </div>
               ))}
               {isThinking && (
                 <div className="pl-4 border-l border-indigo-500/30 space-y-2 animate-pulse">
                    <p className="text-indigo-500/60">&gt; PROCESSING NEURAL ARTIFACTS...</p>
                 </div>
               )}
            </div>
          </div>
        )}

        <div className="w-[400px] flex flex-col h-full shrink-0">
          <header className={cn(
            "p-6 border-b space-y-4 backdrop-blur-md",
            theme === 'dark' ? "border-slate-800 bg-slate-950/50" : "border-slate-100 bg-white/50"
          )}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                  <Sparkles size={20} className="animate-pulse" />
                </div>
                <div>
                   <span className={cn("block text-sm font-black tracking-tight uppercase", theme === 'dark' ? "text-white" : "text-slate-900")}>AI LAB</span>
                   <span className="block text-[9px] font-black text-indigo-500 uppercase tracking-[0.2em] mt-0.5">Neural Hub</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={onToggleThoughts}
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
                  onClick={onClose}
                  className={cn(
                    "p-2 rounded-xl transition-all border",
                    theme === 'dark' ? "bg-slate-900 text-slate-500 border-slate-800 hover:text-white hover:bg-slate-800" : "bg-slate-50 text-slate-400 border-slate-100 hover:text-slate-900 hover:bg-slate-100"
                  )}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-1">
              {tabs.map((tab, idx) => (
                <button
                  key={tab.id}
                  onClick={() => onTabSelect(idx)}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                    activeTab === idx 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : (theme === 'dark' ? 'bg-slate-900 text-slate-500 hover:text-slate-300' : 'bg-slate-100 text-slate-400 hover:text-slate-600')
                  )}
                >
                  {tab.title}
                </button>
              ))}
              <button 
                onClick={onAddTab}
                className={cn(
                  "p-2 transition-colors",
                  theme === 'dark' ? "text-slate-600 hover:text-indigo-400" : "text-slate-400 hover:text-indigo-500"
                )}
              >
                <Plus size={16} />
              </button>
            </div>
          </header>

          <div className={cn(
            "flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar",
            theme === 'dark' ? "bg-slate-900/10" : "bg-slate-50/10"
          )}>
            {tabs[activeTab]?.messages.map((msg, i) => (
              <div key={i} className={cn("flex", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                <div className={cn(
                  "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed border font-bold",
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white shadow-lg border-indigo-500' 
                    : (theme === 'dark' ? 'bg-slate-800 text-slate-100 border-slate-700' : 'bg-white text-slate-800 border-slate-100 shadow-sm')
                )}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isThinking && (
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
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask anything... (/ for library)"
                className={cn(
                  "w-full rounded-2xl p-4 pr-14 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none h-24 transition-all border",
                  theme === 'dark' 
                    ? "bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:border-indigo-500/50" 
                    : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500"
                )}
              />
              <button 
                onClick={handleSend}
                className="absolute right-3 bottom-3 p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center"
              >
                <Send size={18} />
              </button>
              <div className="absolute left-4 bottom-3 flex items-center gap-2 text-[10px] font-mono font-black">
                <CommandIcon size={12} className="text-indigo-500" />
                <span className={cn("tracking-widest uppercase", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>Gateway Active</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};
