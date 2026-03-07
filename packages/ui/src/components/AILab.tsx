'use client';

import { useState } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  Command as CommandIcon,
  Brain,
  Plus,
  Globe,
  Terminal as TerminalIcon,
  Cpu
} from 'lucide-react';
import { cn } from '../utils';
import { useUI } from '../ThemeContext';
import clawesomeIcon from '../assets/clawesome-icon.svg';

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
  chatMode?: 'context' | 'terminal' | 'general';
  onChatModeChange?: (mode: 'context' | 'terminal' | 'general') => void;
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
  isThinking,
  chatMode = 'general',
  onChatModeChange
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
            "p-6 border-b space-y-6 backdrop-blur-xl",
            theme === 'dark' ? "border-slate-800 bg-slate-950/80" : "bg-white/80 border-slate-100"
          )}>
            <div className="flex items-center justify-between">
              {/* Chat Mode Switcher (Far Left) */}
              <div className={cn(
                "flex items-center p-1 rounded-2xl border",
                theme === 'dark' ? "bg-slate-900/50 border-slate-800" : "bg-slate-100 border-slate-200 shadow-inner"
              )}>
                {(['context', 'terminal', 'general'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => onChatModeChange?.(m)}
                    className={cn(
                      "p-2 rounded-xl transition-all",
                      chatMode === m 
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" 
                        : (theme === 'dark' ? "text-slate-500 hover:text-slate-400" : "text-slate-400 hover:text-slate-600")
                    )}
                    title={m.charAt(0).toUpperCase() + m.slice(1)}
                  >
                    {m === 'context' && <Globe size={18} />}
                    {m === 'terminal' && <TerminalIcon size={18} />}
                    {m === 'general' && <img src={clawesomeIcon} className={cn("w-4.5 h-4.5", chatMode === 'general' ? "brightness-[100]" : "grayscale opacity-50")} />}
                  </button>
                ))}
              </div>

              {/* Action Buttons (Right) */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={onToggleThoughts}
                  className={cn(
                    "p-2.5 rounded-2xl transition-all border",
                    showThoughts 
                      ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/20" 
                      : (theme === 'dark' ? "bg-slate-900 text-slate-500 border-slate-800 hover:text-white" : "bg-slate-50 text-slate-400 border-slate-100 hover:text-slate-900")
                  )}
                  title="Neural Thought Stream"
                >
                  <Brain size={20} />
                </button>
                <button 
                  onClick={onClose}
                  className={cn(
                    "p-2.5 rounded-2xl transition-all border",
                    theme === 'dark' ? "bg-slate-900 text-slate-500 border-slate-800 hover:text-rose-500" : "bg-slate-50 text-slate-400 border-slate-100 hover:text-rose-600"
                  )}
                  title="Deactivate Interface"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Conversation Context Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
              {tabs.map((tab, idx) => (
                <button
                  key={tab.id}
                  onClick={() => onTabSelect(idx)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all whitespace-nowrap border-2",
                    activeTab === idx 
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-xl' 
                      : (theme === 'dark' ? 'bg-slate-900/50 text-slate-500 border-slate-800 hover:text-slate-300' : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-600')
                  )}
                >
                  {tab.title}
                </button>
              ))}
              <button 
                onClick={onAddTab}
                className={cn(
                  "p-2 hover:bg-indigo-500/10 rounded-xl transition-all",
                  theme === 'dark' ? "text-slate-600 hover:text-indigo-400" : "text-slate-400 hover:text-indigo-500"
                )}
              >
                <Plus size={18} />
              </button>
            </div>
          </header>

          <div className={cn(
            "flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar",
            theme === 'dark' ? "bg-slate-900/10" : "bg-slate-50/10"
          )}>
            {/* Mode Indicator Banner */}
            {chatMode !== 'general' && (
              <div className={cn(
                "px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border flex items-center gap-2 mb-4",
                chatMode === 'terminal' 
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                  : "bg-blue-500/10 border-blue-500/20 text-blue-500"
              )}>
                <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", chatMode === 'terminal' ? "bg-emerald-500" : "bg-blue-500")} />
                {chatMode === 'terminal' ? "Live Neural Terminal Gateway" : "Page Context Awareness Active"}
              </div>
            )}

            {tabs[activeTab]?.messages.map((msg, i) => (
              <div key={i} className={cn("flex", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                <div className={cn(
                  "max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed border font-bold relative",
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white shadow-lg border-indigo-500' 
                    : (theme === 'dark' ? 'bg-slate-800 text-slate-100 border-slate-700' : 'bg-white text-slate-800 border-slate-100 shadow-sm shadow-indigo-100/10'),
                  chatMode === 'terminal' && msg.role === 'assistant' && "font-mono text-[11px] bg-black border-emerald-500/20 text-emerald-500 tracking-tight"
                )}>
                  {chatMode === 'terminal' && msg.role === 'assistant' && <span className="text-[10px] text-emerald-500/40 block mb-2 font-black uppercase tracking-widest border-b border-emerald-500/5 pb-1">CLI_OUTPUT // PID_8442</span>}
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
