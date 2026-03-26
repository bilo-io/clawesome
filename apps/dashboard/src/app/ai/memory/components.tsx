import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Link as LinkIcon, FileCode } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DataType } from '@/store/useMemoryStore';

export const YoutubeIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export const PDFIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M9 15h.01" />
    <path d="M12 15h.01" />
    <path d="M15 15h.01" />
  </svg>
);

interface ModalProps {
  type: DataType;
  onClose: () => void;
  onSubmit: (name: string, content: string) => void;
  theme: 'light' | 'dark';
}

export function AddDataModal({ type, onClose, onSubmit, theme }: ModalProps) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  
  const iconMap = {
    youtube: <YoutubeIcon size={28} />,
    link: <LinkIcon size={28} className="text-blue-500" />,
    pdf: <PDFIcon size={28} />,
    text: <FileCode size={28} className="text-emerald-500" />
  };

  const labelMap = {
    youtube: 'Video URL',
    link: 'Resource URL',
    pdf: 'File Link / Path',
    text: 'Neural Snippet'
  };

  const titleMap = {
    youtube: 'Ingest YouTube Intelligence',
    link: 'Connect Remote Resource',
    pdf: 'Process PDF Document',
    text: 'Save Memory Fragment'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 40 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={cn(
        "relative w-full max-w-xl rounded-[48px] shadow-2xl overflow-hidden border transition-all z-[110]",
        theme === 'dark' ? "bg-slate-900 border-slate-800 shadow-black/60" : "bg-white border-slate-100 shadow-slate-200/60"
      )}
    >
      <div className="p-10">
        <div className="flex justify-between items-start mb-10">
          <div className="flex items-center gap-5">
             <div className={cn(
               "p-3 rounded-full shadow-lg border transition-all",
               theme === 'dark' ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-100"
             )}>
                {iconMap[type]}
             </div>
             <div>
                <h2 className={cn("text-3xl font-extrabold tracking-tight", theme === 'dark' ? "text-white" : "text-slate-900")}>
                  {titleMap[type]}
                </h2>
                <p className={cn("text-sm font-medium", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>
                  Expand the neural context layer.
                </p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className={cn(
              "p-3 rounded-full transition-all border shadow-sm",
              theme === 'dark' 
                ? "bg-slate-950 text-slate-500 border-slate-800 hover:text-white" 
                : "bg-slate-50 text-slate-400 border-slate-100 hover:text-slate-900"
            )}
          >
            <X size={20} />
          </button>
        </div>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(name, content);
          }} 
          className="space-y-8"
        >
          <div className="space-y-3">
            <label className={cn("text-[10px] font-bold uppercase tracking-[0.25em] ml-1", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>
              Context Label
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Core Algorithm Specs"
              className={cn(
                "w-full rounded-2xl px-6 py-4 text-sm font-medium transition-all border outline-none",
                theme === 'dark' 
                  ? "bg-slate-950 border-slate-800 text-white placeholder:text-slate-800 focus:border-indigo-500/50" 
                  : "bg-slate-50 border-slate-100 text-slate-900 placeholder:text-slate-300 focus:border-indigo-400"
              )}
            />
          </div>

          <div className="space-y-3">
            <label className={cn("text-[10px] font-bold uppercase tracking-[0.25em] ml-1", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>
              {labelMap[type]}
            </label>
            {type === 'text' ? (
              <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter raw text context..."
                rows={4}
                className={cn(
                  "w-full rounded-2xl px-6 py-4 text-sm font-medium transition-all border outline-none resize-none",
                  theme === 'dark' 
                    ? "bg-slate-950 border-slate-800 text-white placeholder:text-slate-800 focus:border-indigo-500/50" 
                    : "bg-slate-50 border-slate-100 text-slate-900 placeholder:text-slate-300 focus:border-indigo-400"
                )}
              />
            ) : (
              <input
                type="text"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={type === 'youtube' ? 'https://youtube.com/watch?v=...' : 'https://...'}
                className={cn(
                  "w-full rounded-2xl px-6 py-4 text-sm font-medium transition-all border outline-none",
                  theme === 'dark' 
                    ? "bg-slate-950 border-slate-800 text-white placeholder:text-slate-800 focus:border-indigo-500/50" 
                    : "bg-slate-50 border-slate-100 text-slate-900 placeholder:text-slate-300 focus:border-indigo-400"
                )}
              />
            )}
          </div>

          <div className="pt-8 flex gap-5">
            <button
              type="button"
              onClick={onClose}
              className={cn(
                "flex-1 px-8 py-4 rounded-[20px] font-bold uppercase tracking-widest text-[11px] transition-all border shadow-sm",
                theme === 'dark' ? "bg-slate-800 border-slate-700 text-slate-400 hover:text-white" : "bg-white border-slate-100 text-slate-500 hover:text-slate-900"
              )}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] px-8 py-4 rounded-[20px] bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white font-bold uppercase tracking-widest text-[11px] shadow-xl hover:opacity-90 transition-all active:translate-y-1"
            >
              Initiate Ingestion
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
