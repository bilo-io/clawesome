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

interface ChatListViewProps {
  chats: Chat[];
  selectedIds: string[];
  theme: string;
  onToggleSelection: (id: string) => void;
  onChatClick: (id: string) => void;
}

const CHAT_TRANSITION = { duration: 0.35, ease: [0.32, 0.72, 0, 1] as const };

export const ChatListView = ({ 
  chats, 
  selectedIds, 
  theme, 
  onToggleSelection, 
  onChatClick 
}: ChatListViewProps) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95, y: 20 }}
    transition={CHAT_TRANSITION}
    className="space-y-3"
  >
    {chats.map((chat) => (
      <motion.div
        layout
        transition={{ layout: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }, opacity: { duration: 0.3 } }}
        key={chat.id}
        onClick={() => onChatClick(chat.id)}
        className={cn(
          "group relative border transition-all cursor-pointer overflow-hidden rounded-[28px] p-4 pr-6 flex items-center gap-5 pl-12",
          selectedIds.includes(chat.id)
            ? (theme === 'dark' ? "bg-indigo-500/10 border-indigo-500/50" : "bg-indigo-50 border-indigo-500")
            : (theme === 'dark'
              ? "bg-slate-900/40 border-slate-800/60 shadow-none hover:bg-slate-900 hover:border-indigo-500/30"
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
          "rounded-full border-2 flex items-center justify-center transition-all absolute z-30 cursor-pointer w-6 h-6 left-4 top-1/2 -translate-y-1/2",
          selectedIds.includes(chat.id)
            ? "bg-indigo-500 border-indigo-500 text-white scale-110 shadow-lg shadow-indigo-500/20" 
            : cn(
                "opacity-0 group-hover:opacity-100",
                theme === 'dark' ? "border-slate-700 bg-slate-950" : "border-slate-200 bg-white shadow-sm"
              )
        )}>
          {selectedIds.includes(chat.id) && <Check size={12} strokeWidth={4} />}
        </div>
        
        <div className={cn(
          "rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 w-10 h-10",
          theme === 'dark' ? "bg-slate-800 text-indigo-400" : "bg-slate-100 text-indigo-600"
        )}>
          <MessageSquare size={20} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "text-sm font-black tracking-tight truncate",
                theme === 'dark' ? "text-white" : "text-slate-900"
              )}>
                {chat.title}
              </h3>
              <p className={cn(
                "text-xs font-medium truncate mt-0.5",
                theme === 'dark' ? "text-slate-600" : "text-slate-400"
              )}>
                {chat.preview}
              </p>
            </div>
            <span className={cn(
              "shrink-0 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg",
              theme === 'dark' ? "bg-slate-800 text-slate-500" : "bg-slate-50 text-slate-400"
            )}>
              {chat.updatedAt}
            </span>
            <ChevronRight size={16} className={cn(
              "shrink-0 transition-transform group-hover:translate-x-1",
              theme === 'dark' ? "text-slate-700" : "text-slate-300"
            )} />
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </motion.div>
    ))}
  </motion.div>
);
