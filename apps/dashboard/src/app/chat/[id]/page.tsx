'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  Copy,
  Cpu,
  Globe,
  Brain,
  Activity,
  Terminal,
} from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { DEFAULT_PORT } from '@antigravity/core';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from '@/components/CodeBlock';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';
import { useSocket } from '@/hooks/useSocket';

const CHAT_TRANSITION = { duration: 0.35, ease: [0.32, 0.72, 0, 1] as const };

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isTyping?: boolean;
}

const INITIAL_CONVERSATION: Message[] = [
  { id: '1', role: 'user', content: "Hello NC-01, can you analyze the current workspace?" },
  { id: '2', role: 'assistant', content: "NC-01 on-line. Scanning workspace: `/Users/bilolwabona/BiloDev/clawesome`... I detected 3 apps and 2 libraries. The core project uses Bun and Moon v2 for orchestration." },
  { id: '3', role: 'user', content: "Great. Can you breakdown the security protocols currently active?" },
  { id: '4', role: 'assistant', content: "Initiating security audit. Current sandbox depth: **level 3**. Filesystem access: Restricted to current project root. Container isolation: Virtualized via `NC-SandBox`. Neural Link encryption: AES-256." },
  { id: '5', role: 'user', content: "How is the token consumption looking for the last 24h?" },
  { id: '6', role: 'assistant', content: "Retrieving telemetry. Over the last 24h, we have consumed **45.2k tokens** with an expenditure of **$1.32**. The peak was at 12:00 UTC during the dashboard refactor." },
  { id: '7', role: 'user', content: "Can you generate a quick summary of the recent mission logs?" },
  { id: '8', role: 'assistant', content: "Searching logs. Recent missions:\n\n- `REF-781` (Refactor Sidebar)\n- `SEC-102` (Implement Sandbox)\n- `MGT-901` (Setup Moon)\n\nOverall Status: All missions finalized successfully." },
  { id: '9', role: 'user', content: "Excellent. Set a new profile for a Senior Dev agent." },
  { id: '10', role: 'assistant', content: "Neural profile updated. Identity: 'Senior Engineer'. Sub-routines initialized for code optimization and system architectural analysis. Ready for new instructions." },
];

function TypewriterText({ text, delay = 15, onComplete }: { text: string; delay?: number; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    let currentText = '';
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        currentText += text[i];
        setDisplayedText(currentText);
        i++;
      } else {
        clearInterval(timer);
        setIsFinishing(true);
        onComplete?.();
      }
    }, delay);
    return () => clearInterval(timer);
  }, [text, delay, onComplete]);

  return (
    <div className={cn("prose prose-sm dark:prose-invert max-w-none transition-opacity duration-300", isFinishing ? "opacity-100" : "opacity-95")}>
      <ReactMarkdown
        components={{
          code: ({ inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline ? (
              <CodeBlock code={String(children).replace(/\n$/, '')} language={match ? match[1] : ''} />
            ) : (
              <code className={className} {...props}>{children}</code>
            );
          },
        }}
      >
        {displayedText}
      </ReactMarkdown>
      {!isFinishing && <span className="inline-block w-1.5 h-4 ml-1 bg-indigo-500 animate-pulse align-middle" />}
    </div>
  );
}

const dotVariants: Variants = {
  dot: (i: number) => ({
    y: [0, -12, 0],
    scaleY: [1, 3, 1],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      delay: i * 0.1,
      ease: "easeInOut" as const,
    },
  }),
};

function ThinkingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 py-4 px-8 rounded-[32px] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-fit shadow-lg"
    >
      <div className="flex gap-2 items-center h-8">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            custom={i}
            variants={dotVariants}
            animate="dot"
            className="w-1.5 h-3 rounded-full bg-indigo-500 origin-center"
          />
        ))}
      </div>
      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400 ml-2">Neural Synthesis in Progress...</span>
    </motion.div>
  );
}

export default function ChatDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { theme } = useUIStore();
  const [messages, setMessages] = useState<Message[]>(INITIAL_CONVERSATION);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  const { isConnected: isWsConnected, lastMessage, sendMessage } = useSocket();

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  // Handle incoming websocket messages
  useEffect(() => {
    if (lastMessage && lastMessage.type === 'chat_response') {
      setIsThinking(false);
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: lastMessage.payload.content,
        isTyping: true,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }
  }, [lastMessage]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsThinking(true);

    if (isWsConnected) {
      sendMessage({ type: 'chat', content: currentInput });
    } else {
      // Fallback/Mock if WS is not connected
      setTimeout(() => {
        setIsThinking(false);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "System Offline. Unable to reach the CLI Gateway via Neural Link (WebSocket). Please ensure `clawesome start` is running.",
          isTyping: true,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }, 1500);
    }
  };

  const handleHealthCheck = async () => {
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: "Gateway Health Check" };
    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);
    
    try {
      const response = await fetch(`http://localhost:${DEFAULT_PORT}/health`);
      if (!response.ok) throw new Error(`Gateway returned ${response.status}`);
      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `**GATEWAY STATUS: OK**\n\n- **Status:** ${data.status.toUpperCase()}\n- **Latency:** Nominal\n- **Timestamp:** ${new Date(data.timestamp).toLocaleString()}\n\nThe CLI Gateway is active and responsive.`,
        isTyping: true,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `**CONNECTION ERROR**\n\nUnable to reach the locally running CLI Gateway at \`localhost:${DEFAULT_PORT}\`.\n\n**Error:** ${error.message}\n\n*Please ensure the gateway is started using \`clawesome start\`.*`,
        isTyping: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleVersionCheck = async () => {
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: "Check CLI Version" };
    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);
    
    try {
      const response = await fetch(`http://localhost:${DEFAULT_PORT}/version`);
      if (!response.ok) throw new Error(`Gateway returned ${response.status}`);
      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `**CLI VERSION INFORMATION**\n\n- **Version:** \`v${data.version}\`\n- **Platform:** ${data.platform}\n- **State:** Synchronized\n\nYou are running the latest stable build of Clawesome OS.`,
        isTyping: true,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `**CONNECTION ERROR**\n\nUnable to reach the locally running CLI Gateway at \`localhost:${DEFAULT_PORT}\`.\n\n**Error:** ${error.message}\n\n*Please ensure the gateway is started using \`clawesome start\`.*`,
        isTyping: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <main className="max-w-[1200px] mx-auto h-[calc(100vh-120px)] flex flex-col relative px-4">
      <DashboardResourceHeader
        title="Agent Terminal"
        description="Direct neural link to your autonomous operative. Execute complex logic via natural language and monitor real-time synthesis of task outcomes."
        badge="MISSION_CONTROL"
        statusLabel="Active Protocol:"
        statusValue="NC-CORE-7"
        statusColor="indigo"
        isCollection={false}
        backLink={{ label: "BACK TO CHATS", href: "/chat" }}
        renderRight={
          <button className={cn(
            "p-3 rounded-2xl border flex items-center gap-2 transition-all hover:scale-105 active:scale-95",
            theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-500 hover:text-white" : "bg-white border-slate-100 text-slate-400 hover:text-black shadow-sm"
          )}>
            <Trash2 size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Flush Logs</span>
          </button>
        }
      />

      {/* Message Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto pt-10 pb-40 space-y-10 no-scrollbar scroll-smooth"
      >
        <div className="max-w-4xl mx-auto space-y-10">
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("flex gap-6", msg.role === 'user' ? "flex-reverse items-end" : "items-start")}
              >
                {msg.role === 'assistant' && (
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2 shadow-xl",
                    theme === 'dark' ? "bg-slate-900 border-indigo-500/30 text-indigo-400" : "bg-white border-indigo-100 text-indigo-600"
                  )}>
                    <Bot size={24} />
                  </div>
                )}
                <div className={cn(
                  "flex-1 p-8 rounded-[40px] shadow-2xl relative overflow-hidden group border",
                  msg.role === 'user'
                    ? (theme === 'dark' ? "bg-indigo-600/10 border-indigo-500/20 text-white ml-20" : "bg-white border-slate-200 text-black shadow-slate-200/40 ml-20")
                    : (theme === 'dark' ? "bg-slate-950/40 border-slate-800/60 text-slate-200 mr-20" : "bg-slate-100 border-slate-200 text-slate-800 mr-20")
                )}>
                  {msg.role === 'user' ? (
                    <div className="font-bold text-lg tracking-tight leading-relaxed">{msg.content}</div>
                  ) : msg.isTyping ? (
                    <TypewriterText
                      text={msg.content}
                      onComplete={() => {
                        const next = [...messages];
                        next[idx].isTyping = false;
                        setMessages(next);
                      }}
                    />
                  ) : (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown
                        components={{
                          code: ({ inline, className, children, ...props }: any) => {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline ? (
                              <CodeBlock code={String(children).replace(/\n$/, '')} language={match ? match[1] : ''} />
                            ) : (
                              <code className={className} {...props}>{children}</code>
                            );
                          },
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  )}
                  <div className="absolute top-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-slate-400">
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
                {msg.role === 'user' && (
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2 shadow-xl",
                    theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100 shadow-slate-200/40"
                  )}>
                    <div 
                      className={cn("w-6 h-6", theme === 'dark' ? "bg-white" : "bg-slate-900")} 
                      style={{ 
                        maskImage: 'url(/clawesome-icon.svg)', 
                        maskSize: 'contain', 
                        maskRepeat: 'no-repeat', 
                        maskPosition: 'center',
                        WebkitMaskImage: 'url(/clawesome-icon.svg)',
                        WebkitMaskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center'
                      }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {isThinking && (
            <div className="flex gap-6 items-start">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2 shadow-xl",
                theme === 'dark' ? "bg-slate-900 border-indigo-500/30 text-indigo-400" : "bg-white border-indigo-100 text-indigo-600"
              )}>
                <Bot size={24} />
              </div>
              <ThinkingAnimation />
            </div>
          )}
        </div>
      </div>

      {/* Floating Input */}
      <div className="absolute bottom-10 left-0 right-0 px-4 flex justify-center pointer-events-none">
        <div className="w-full max-w-[760px] pointer-events-auto">
          {/* Quick Action Pills */}
          <div className="flex justify-center mb-6 gap-3">
            <button 
              onClick={handleHealthCheck}
              className={cn(
                "px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center gap-2 backdrop-blur-md",
                theme === 'dark' ? "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-emerald-400" : "bg-white/80 border-slate-200 text-slate-500 hover:text-emerald-600 shadow-lg"
              )}
            >
              <Activity size={12} /> Health Check
            </button>
            <button 
              onClick={handleVersionCheck}
              className={cn(
                "px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center gap-2 backdrop-blur-md",
                theme === 'dark' ? "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-indigo-400" : "bg-white/80 border-slate-200 text-slate-500 hover:text-indigo-600 shadow-lg"
              )}
            >
              <Terminal size={12} /> CLI Info
            </button>
          </div>
          
          <div className="relative group perspective-1000">
            <div className={cn(
              "relative p-[2px] rounded-full transition-all duration-700 shadow-[0_32px_80px_rgba(0,0,0,0.2)] dark:shadow-[0_48px_100px_rgba(0,0,0,0.5)]",
              "bg-gradient-to-tr from-[#8C00FF]/20 to-[#008FD6]/20 focus-within:from-[#8C00FF] focus-within:to-[#008FD6] focus-within:scale-[1.01] focus-within:shadow-[0_48px_100px_rgba(140,0,255,0.15)]"
            )}>
              <div className={cn(
                "flex items-center gap-4 bg-white dark:bg-slate-950 rounded-full px-8 py-5 transition-all duration-700 overflow-hidden",
                "bg-white/95 dark:bg-slate-950/95"
              )}>
                <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
                    <div 
                      className={cn("w-6 h-6", theme === 'dark' ? "bg-slate-500" : "bg-slate-400", "group-focus-within:bg-indigo-500 transition-colors")} 
                      style={{ 
                        maskImage: 'url(/clawesome-icon.svg)', 
                        maskSize: 'contain', 
                        maskRepeat: 'no-repeat', 
                        maskPosition: 'center',
                        WebkitMaskImage: 'url(/clawesome-icon.svg)',
                        WebkitMaskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center'
                      }}
                    />
                </div>
                <textarea
                  rows={1}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    (e.target as HTMLTextAreaElement).style.height = 'auto';
                    (e.target as HTMLTextAreaElement).style.height = `${(e.target as HTMLTextAreaElement).scrollHeight}px`;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask NC-01 anything..."
                  className={cn(
                    "flex-1 bg-transparent text-lg font-bold outline-none resize-none no-scrollbar max-h-40 placeholder:font-bold",
                    theme === 'dark' ? "text-white placeholder:text-slate-700" : "text-black placeholder:text-slate-300"
                  )}
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className={cn(
                    "p-4 rounded-full transition-all duration-500 flex items-center justify-center shadow-xl active:scale-90 disabled:opacity-30 disabled:grayscale",
                    "bg-indigo-600 text-white shadow-indigo-500/30 hover:bg-indigo-500 group-focus-within:rotate-[-5deg]"
                  )}
                >
                  <Send size={24} />
                </button>
              </div>
            </div>
            <div className="flex justify-center mt-6 gap-8">
              {[
                { icon: Brain, label: 'Deep Reasoning', color: 'text-indigo-400' },
                { icon: Globe, label: 'Search Trace', color: 'text-blue-400' },
                { icon: Cpu, label: 'Local Compute', color: 'text-emerald-400' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5 opacity-40 hover:opacity-100 transition-opacity cursor-help group/item">
                  <item.icon size={12} className={cn("transition-all group-hover/item:scale-125", item.color)} />
                  <span className={cn("text-[9px] font-black uppercase tracking-[0.2em]", theme === 'dark' ? "text-slate-500" : "text-slate-700")}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
