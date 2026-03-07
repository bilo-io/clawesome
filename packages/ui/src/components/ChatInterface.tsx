'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Plus, Trash2, Copy, Check, Sparkles, Paperclip, Mic, ChevronDown } from 'lucide-react';
import { cn } from '../utils';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export interface ChatInterfaceProps {
  messages?: ChatMessage[];
  onSend?: (content: string) => void;
  onClear?: () => void;
  isLoading?: boolean;
  agentName?: string;
  agentStatus?: 'online' | 'thinking' | 'offline';
  placeholder?: string;
  className?: string;
}

const ThinkingDots = () => (
  <div className="flex items-center gap-1.5 py-1">
    {[0, 1, 2].map(i => (
      <motion.div
        key={i}
        className="w-2 h-2 rounded-full bg-indigo-400"
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
      />
    ))}
  </div>
);

export const ChatInterface = ({
  messages = [],
  onSend,
  onClear,
  isLoading = false,
  agentName = 'NC-01',
  agentStatus = 'online',
  placeholder = 'Send a message...',
  className,
}: ChatInterfaceProps) => {
  const [inputValue, setInputValue] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSend?.(inputValue.trim());
    setInputValue('');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const statusColors = {
    online: 'bg-emerald-500',
    thinking: 'bg-amber-500 animate-pulse',
    offline: 'bg-slate-600',
  };

  return (
    <div className={cn('flex flex-col rounded-[32px] border border-slate-800 bg-slate-950/60 overflow-hidden', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/40">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <Bot size={18} className="text-white" />
            </div>
            <div className={cn('absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-950', statusColors[agentStatus])} />
          </div>
          <div>
            <p className="text-sm font-black text-white tracking-tight">{agentName}</p>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              {agentStatus === 'thinking' ? 'Processing...' : agentStatus === 'online' ? 'Neural Link Active' : 'Offline'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onClear && (
            <button
              onClick={onClear}
              className="p-2 rounded-xl text-slate-600 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
              title="Clear conversation"
            >
              <Trash2 size={16} />
            </button>
          )}
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/60 text-slate-500 hover:text-white hover:border-slate-600 transition-all text-[10px] font-black uppercase tracking-widest">
            <Plus size={12} />
            New
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar px-6 py-6 space-y-6 min-h-[400px] max-h-[500px]"
      >
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center">
              <Sparkles size={28} className="text-indigo-400" />
            </div>
            <p className="text-slate-600 text-sm font-black uppercase tracking-widest">Start a new conversation</p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className={cn('flex gap-3 group', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
            >
              {/* Avatar */}
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                msg.role === 'assistant'
                  ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-lg shadow-indigo-600/20'
                  : 'bg-slate-800 border border-slate-700'
              )}>
                {msg.role === 'assistant' ? (
                  <Bot size={14} className="text-white" />
                ) : (
                  <User size={14} className="text-slate-400" />
                )}
              </div>

              {/* Bubble */}
              <div className={cn('flex flex-col max-w-[75%]', msg.role === 'user' ? 'items-end' : 'items-start')}>
                <div className={cn(
                  'px-4 py-3 rounded-2xl text-sm leading-relaxed font-medium relative',
                  msg.role === 'assistant'
                    ? 'bg-slate-800/70 text-slate-200 rounded-tl-sm border border-slate-700/50'
                    : 'bg-indigo-600 text-white rounded-tr-sm shadow-lg shadow-indigo-600/20'
                )}>
                  {msg.content}

                  {/* Copy button */}
                  <button
                    onClick={() => handleCopy(msg.id, msg.content)}
                    className={cn(
                      'absolute -top-2 opacity-0 group-hover:opacity-100 transition-all p-1.5 rounded-lg text-[10px]',
                      msg.role === 'user' ? '-left-9 bg-indigo-800 text-indigo-200' : '-right-9 bg-slate-700 text-slate-400'
                    )}
                  >
                    {copiedId === msg.id ? <Check size={12} /> : <Copy size={12} />}
                  </button>
                </div>
                {msg.timestamp && (
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-700 mt-1.5 px-1">
                    {msg.timestamp}
                  </span>
                )}
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-600/20">
                <Bot size={14} className="text-white" />
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-slate-800/70 border border-slate-700/50">
                <ThinkingDots />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/30">
        <div className="relative flex items-end gap-3 p-[1px] rounded-2xl bg-gradient-to-tr from-indigo-600/30 to-purple-600/20 focus-within:from-indigo-600/60 focus-within:to-purple-600/40 transition-all">
          <div className="flex-1 flex items-end gap-2 bg-slate-950/90 rounded-[15px] px-4 py-3">
            <button className="shrink-0 text-slate-600 hover:text-slate-400 transition-colors mb-0.5">
              <Paperclip size={18} />
            </button>
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              rows={1}
              style={{ resize: 'none', minHeight: '24px', maxHeight: '120px' }}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-700 outline-none font-medium leading-relaxed"
              onInput={e => {
                const el = e.currentTarget;
                el.style.height = 'auto';
                el.style.height = Math.min(el.scrollHeight, 120) + 'px';
              }}
            />
            <button className="shrink-0 text-slate-600 hover:text-slate-400 transition-colors mb-0.5">
              <Mic size={18} />
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="shrink-0 w-10 h-10 rounded-[13px] bg-indigo-600 flex items-center justify-center text-white transition-all hover:bg-indigo-500 active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/30 mr-0.5 mb-0.5"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-[9px] text-slate-700 uppercase tracking-widest font-black text-center mt-3">
          Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};
