import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ChevronRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Chat {
  id: string;
  title: string;
  preview: string;
  updatedAt: string;
}

interface ChatGridViewProps {
  chats: Chat[];
  selectedIds: string[];
  theme: string;
  onToggleSelection: (id: string) => void;
  onChatClick: (id: string) => void;
}

const CHAT_TRANSITION = { duration: 0.35, ease: [0.32, 0.72, 0, 1] as const };

export const ChatGridView = ({ 
  chats, 
  selectedIds, 
  theme, 
  onToggleSelection, 
  onChatClick 
}: ChatGridViewProps) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95, y: 20 }}
    transition={CHAT_TRANSITION}
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  >
    {chats.map((chat) => (
      <motion.div
        layout
        transition={{ layout: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }, opacity: { duration: 0.3 } }}
        key={chat.id}
        onClick={() => onChatClick(chat.id)}
        className={cn(
          "group relative border transition-all cursor-pointer overflow-hidden rounded-[32px] p-6 flex flex-col",
          selectedIds.includes(chat.id)
            ? (theme === 'dark' ? "bg-indigo-500/10 border-indigo-500/50" : "bg-indigo-50 border-indigo-500")
            : (theme === 'dark'
              ? "bg-slate-900/40 border-slate-800/60 hover:bg-slate-900 hover:border-indigo-500/30"
              : "bg-white border-slate-100 shadow-xl shadow-slate-200/20 hover:border-indigo-200")
        )}
      >
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleSelection(chat.id);
          }}
          className={cn(
          "rounded-full border-2 flex items-center justify-center transition-all absolute z-30 cursor-pointer w-7 h-7 top-5 left-5",
          selectedIds.includes(chat.id)
            ? "bg-indigo-500 border-indigo-500 text-white scale-110 shadow-lg shadow-indigo-500/20" 
            : cn(
                "opacity-0 group-hover:opacity-100",
                theme === 'dark' ? "border-slate-700 bg-slate-950" : "border-slate-200 bg-white shadow-sm"
              )
        )}>
          {selectedIds.includes(chat.id) && <Check size={14} strokeWidth={4} />}
        </div>
        
        <div className={cn(
          "rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 w-14 h-14 mb-5 ml-6",
          theme === 'dark' ? "bg-slate-800 text-indigo-400" : "bg-slate-100 text-indigo-600"
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
        </div>

        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </motion.div>
    ))}
  </motion.div>
);
