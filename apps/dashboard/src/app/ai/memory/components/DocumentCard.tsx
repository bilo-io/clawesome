import React from 'react';
import { Loader2, FileCode, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { YoutubeIcon, PDFIcon } from './AddDataModal';

export function DocumentCard({ doc, theme, onClick }: { doc: any, theme: 'light' | 'dark', onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group p-6 rounded-[32px] border shadow-xl relative overflow-hidden transition-all h-full cursor-pointer",
        theme === 'dark' ? "bg-slate-900/40 border-slate-800/60 shadow-black/40 hover:border-slate-700" : "bg-white border-slate-100 shadow-slate-200/50 hover:border-slate-300"
      )}
    >
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center shadow-md",
          doc.type === 'youtube' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
          doc.type === 'pdf' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
          doc.type === 'link' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
        )}>
           {doc.type === 'youtube' && <YoutubeIcon size={24} />}
           {doc.type === 'pdf' && <PDFIcon size={24} />}
           {doc.type === 'link' && <LinkIcon size={24} />}
           {doc.type === 'text' && <FileCode size={24} />}
        </div>
        
        {doc.status === 'processing' ? (
          <div className={cn("px-3 py-1.5 rounded-full flex items-center gap-2", theme === 'dark' ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-100 text-indigo-600")}>
             <Loader2 size={12} className="animate-spin" />
             <span className="text-[9px] font-black uppercase tracking-widest">Processing</span>
          </div>
        ) : (
          <div className={cn("px-3 py-1.5 rounded-full flex items-center gap-2", theme === 'dark' ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-600")}>
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
             <span className="text-[9px] font-black uppercase tracking-widest">Ready</span>
          </div>
        )}
      </div>

      <div className="relative z-10">
        <h3 className={cn("text-lg font-black tracking-tight mb-2 truncate", theme === 'dark' ? "text-white" : "text-slate-900")}>
          {doc.name}
        </h3>
        <p className={cn("text-[10px] font-bold uppercase tracking-widest mb-6", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>
          Ingested {doc.timestamp}
        </p>
        
        {/* Content Snippet */}
        <div className={cn(
           "p-4 rounded-2xl text-xs font-mono truncate border shadow-inner",
           theme === 'dark' ? "bg-slate-950 border-slate-800 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-600"
        )}>
          {doc.content}
        </div>
      </div>
    </div>
  );
}
