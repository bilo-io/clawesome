'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  User, 
  Sparkles, 
  Settings, 
  MoreHorizontal, 
  ShieldCheck, 
  BrainCircuit, 
  ChevronDown,
  Trash2,
  Copy,
  Check,
  Zap
} from 'lucide-react';
import { cn } from '../utils';
import { useUI } from '../ThemeContext';
import { AnimatedPromptInput } from './AnimatedPromptInput';
import { AgentAvatarStack, type CouncilAgent } from './AgentAvatarStack';

export interface CouncilMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  agent?: CouncilAgent;
  content: string;
  timestamp?: string;
  isInitialRecommendation?: boolean;
  actions?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    icon?: React.ReactNode;
  }[];
  options?: {
    id: string;
    label: string;
    selected: boolean;
    onToggle: (id: string) => void;
  }[];
}

export interface CouncilChatInterfaceProps {
  messages: CouncilMessage[];
  agents: CouncilAgent[];
  onSendMessage: (content: string) => void;
  onClearChat?: () => void;
  onAddAgent?: () => void;
  isLoading?: boolean;
  className?: string;
  title?: string;
}

export const CouncilChatInterface = ({
  messages,
  agents,
  onSendMessage,
  onClearChat,
  onAddAgent,
  isLoading = false,
  className,
  title = "New Council Deliberation"
}: CouncilChatInterfaceProps) => {
  const { theme } = useUI();
  const isDark = theme === 'dark';
  const [inputValue, setInputValue] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={cn(
      "flex flex-col h-full rounded-[40px] border relative overflow-hidden transition-all duration-700",
      isDark ? "bg-slate-950 border-slate-900 shadow-2xl shadow-indigo-500/5" : "bg-white border-slate-200/60 shadow-2xl shadow-slate-200/40",
      className
    )}>
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] grayscale">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500 blur-[150px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500 blur-[150px]" />
      </div>

      {/* Main Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-10 py-12 space-y-12 no-scrollbar scroll-smooth relative z-20"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              className={cn(
                "flex gap-8 max-w-5xl mx-auto group",
                msg.role === 'user' ? "flex-row-reverse" : "flex-row",
                msg.isInitialRecommendation && "flex-col items-center !max-w-3xl transform -translate-y-6"
              )}
            >
              {/* Message Icon / Avatar */}
              {!msg.isInitialRecommendation && (
                <div className={cn(
                  "shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-2xl group-hover:scale-110 group-hover:-rotate-6 translate-y-2",
                  msg.role === 'user' 
                    ? "bg-slate-900 text-white shadow-slate-950/20" 
                    : "shadow-indigo-500/10 border border-white/10"
                )}
                style={{ background: msg.role === 'assistant' ? msg.agent?.color : undefined }}
                >
                  {msg.role === 'user' ? (
                    <User size={28} />
                  ) : msg.role === 'system' ? (
                    <ShieldCheck size={28} className="text-emerald-500" />
                  ) : (
                    <span className="text-lg font-black text-white drop-shadow-md">{msg.agent?.name.charAt(0)}</span>
                  )}
                </div>
              )}

              {/* Message Bubble Container */}
              <div className={cn(
                "flex flex-col gap-4 min-w-0 flex-1",
                msg.role === 'user' ? "items-end" : "items-start",
                msg.isInitialRecommendation && "items-center text-center"
              )}>
                {/* Role/Name Tag */}
                {!msg.isInitialRecommendation && (
                  <div className="flex items-center gap-3 px-2">
                    <span className={cn(
                      "text-[11px] font-black uppercase tracking-[0.2em]",
                      isDark ? "text-slate-600" : "text-slate-400"
                    )}>
                      {msg.role === 'user' ? "Commander" : msg.agent?.name || "System"}
                    </span>
                    {msg.role === 'assistant' && (
                      <span className={cn(
                        "text-[9px] font-bold px-3 py-1 rounded-full border shadow-sm",
                        isDark ? "bg-slate-900/50 border-slate-800 text-slate-500" : "bg-slate-50 border-slate-100 text-slate-500"
                      )}>
                        {msg.agent?.role}
                      </span>
                    )}
                  </div>
                )}

                {/* Message Bubble */}
                <div className={cn(
                  "relative rounded-[32px] p-8 text-base leading-relaxed overflow-hidden transition-all duration-500",
                  msg.role === 'user' 
                    ? (isDark 
                        ? "bg-indigo-600/10 border border-indigo-500/20 text-indigo-100 rounded-tr-none shadow-2xl shadow-indigo-600/5" 
                        : "bg-indigo-600 text-white shadow-2xl shadow-indigo-600/30 rounded-tr-none")
                    : msg.isInitialRecommendation
                      ? (isDark 
                          ? "bg-slate-900/40 border border-indigo-500/30 backdrop-blur-md rounded-[40px] text-slate-300 shadow-2xl shadow-indigo-500/10" 
                          : "bg-white border border-indigo-100/60 backdrop-blur-md rounded-[40px] text-slate-600 shadow-2xl shadow-indigo-500/10")
                      : (isDark 
                          ? "bg-slate-900/60 border border-slate-800 text-slate-200 rounded-tl-none shadow-xl" 
                          : "bg-white border border-slate-100 text-slate-700 rounded-tl-none shadow-2xl shadow-slate-200/50")
                )}>
                  {msg.isInitialRecommendation && (
                    <div className="mb-8 flex justify-center">
                       <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 p-[2px] animate-pulse shadow-lg shadow-indigo-500/20">
                         <div className={cn("w-full h-full rounded-full flex items-center justify-center", isDark ? "bg-slate-950" : "bg-white")}>
                           <Sparkles size={36} className="text-indigo-500" />
                         </div>
                       </div>
                    </div>
                  )}

                  <div className={cn(
                    "prose max-w-none font-medium text-lg leading-relaxed",
                    msg.role === 'user' 
                      ? (isDark ? "prose-invert text-indigo-100" : "text-white") 
                      : (isDark ? "prose-invert text-slate-300" : "text-slate-600")
                  )}>
                    {msg.content}
                  </div>

                  {/* Options/Checkboxes */}
                  {msg.options && (
                    <div className="mt-10 space-y-4">
                      {msg.options.map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => opt.onToggle(opt.id)}
                          className={cn(
                            "w-full flex items-center justify-between px-6 py-5 rounded-[24px] border transition-all text-sm font-black uppercase tracking-widest active:scale-[0.98]",
                            opt.selected
                              ? "bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/30"
                              : isDark ? "bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700 hover:bg-slate-800" : "bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-200 hover:bg-white hover:shadow-md"
                          )}
                        >
                          <span className="flex items-center gap-4">
                            <div className={cn(
                              "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                              opt.selected ? "bg-white border-white text-indigo-600" : (isDark ? "border-slate-700" : "border-slate-200")
                            )}>
                               {opt.selected && <Check size={16} strokeWidth={4} />}
                            </div>
                            {opt.label}
                          </span>
                          {!opt.selected && <span className="opacity-40 font-bold">Select</span>}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  {msg.actions && (
                    <div className={cn(
                      "mt-10 flex flex-wrap gap-4",
                      msg.isInitialRecommendation && "justify-center"
                    )}>
                      {msg.actions.map((action, i) => (
                        <button
                          key={i}
                          onClick={action.onClick}
                          className={cn(
                            "flex items-center gap-3 px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-lg",
                            action.variant === 'primary' 
                              ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/30"
                              : action.variant === 'danger'
                                ? "bg-rose-600/10 border border-rose-500/30 text-rose-500 hover:bg-rose-500 hover:text-white"
                                : isDark ? "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700" : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-100 shadow-slate-200/50"
                          )}
                        >
                          {action.icon}
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Message Tools */}
                  {!msg.isInitialRecommendation && (
                     <div className={cn(
                       "absolute top-5 right-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity",
                       msg.role === 'user' ? "opacity-30" : ""
                     )}>
                        <button 
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className={cn(
                            "p-2.5 rounded-xl transition-all active:scale-90",
                            isDark ? "hover:bg-slate-800 text-slate-500 hover:text-white" : "hover:bg-slate-100 text-slate-400 hover:text-slate-900"
                          )}
                        >
                          {copiedId === msg.id ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                        </button>
                     </div>
                  )}
                </div>

                <div className="px-6 text-[10px] font-black uppercase tracking-[0.3em] opacity-30 mt-1">
                  {msg.timestamp || "Just now"}
                </div>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-8 max-w-5xl mx-auto"
            >
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center animate-pulse">
                <Bot size={28} className="text-indigo-500" />
              </div>
              <div className="flex flex-col gap-3 justify-center">
                 <div className="flex gap-2 p-1">
                   {[0, 1, 2].map(i => (
                     <motion.div 
                        key={i}
                        className="w-3 h-3 rounded-full bg-indigo-500/30"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          backgroundColor: ["rgba(99, 102, 241, 0.3)", "rgba(99, 102, 241, 1)", "rgba(99, 102, 241, 0.3)"]
                        }}
                        transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
                     />
                   ))}
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-500/60 ml-2">Deliberating...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Section */}
      <div className={cn(
        "px-10 pt-8 pb-14 transition-all duration-700 z-40 relative",
        isDark ? "bg-gradient-to-t from-slate-950 via-slate-950 to-slate-950/0" : "bg-gradient-to-t from-white via-white to-white/0"
      )}>
        <AnimatedPromptInput 
          value={inputValue}
          onChange={setInputValue}
          onSend={() => {
            onSendMessage(inputValue);
            setInputValue('');
          }}
          isLoading={isLoading}
        />
        
        <div className="mt-6 flex items-center justify-center gap-8">
           <div className="flex items-center gap-2.5 cursor-help group">
              <ShieldCheck size={14} className={cn("transition-colors", isDark ? "text-slate-800 group-hover:text-emerald-500" : "text-slate-200 group-hover:text-emerald-500")} />
              <span className={cn("text-[9px] font-black uppercase tracking-[0.3em]", isDark ? "text-slate-800" : "text-slate-300")}>Security Policy: Level 4</span>
           </div>
           <div className="flex items-center gap-2.5 cursor-help group">
              <Zap size={14} className={cn("transition-colors", isDark ? "text-slate-800 group-hover:text-amber-500" : "text-slate-200 group-hover:text-amber-500")} />
              <span className={cn("text-[9px] font-black uppercase tracking-[0.3em]", isDark ? "text-slate-800" : "text-slate-300")}>Neural Sync: 99.8%</span>
           </div>
        </div>
      </div>
    </div>
  );
};
