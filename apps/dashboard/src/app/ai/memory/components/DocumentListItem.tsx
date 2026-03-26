import React from 'react';
import { Loader2, FileCode, Link as LinkIcon, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { YoutubeIcon, PDFIcon } from './AddDataModal';

export function DocumentListItem({ 
  doc, 
  theme, 
  onClick,
  selected,
  onToggleSelection 
}: { 
  doc: any, 
  theme: 'light' | 'dark', 
  onClick?: () => void,
  selected?: boolean,
  onToggleSelection?: (e: React.MouseEvent) => void 
}) {
  return (
    <div
      className={cn(
        "p-4 md:p-6 rounded-[32px] border transition-all flex flex-col md:flex-row md:items-center justify-between group gap-4 cursor-pointer relative overflow-hidden",
        selected 
          ? (theme === 'dark' ? "bg-indigo-500/10 border-indigo-500/50" : "bg-indigo-50 border-indigo-500")
          : (theme === 'dark' ? "bg-slate-900/40 border-slate-800/60 hover:bg-slate-900 hover:border-slate-700" : "bg-white border-slate-100 hover:shadow-xl shadow-slate-200/50 hover:border-slate-300")
      )}
    >
      <div className="flex items-center gap-6">
        {/* Selection Indicator */}
        <div 
          onClick={onToggleSelection}
          className={cn(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 cursor-pointer",
          selected 
            ? "bg-indigo-500 border-indigo-500 text-white scale-110 shadow-lg shadow-indigo-500/20" 
            : "border-slate-700 bg-slate-950 opacity-0 group-hover:opacity-100"
        )}>
          {selected && <Check size={12} strokeWidth={4} />}
        </div>

        <div onClick={onClick} className="flex items-center gap-6 flex-1 min-w-0">
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md transition-transform group-hover:scale-105",
            doc.type === 'youtube' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
            doc.type === 'pdf' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
            doc.type === 'link' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
          )}>
            {doc.type === 'youtube' && <YoutubeIcon size={24} />}
            {doc.type === 'pdf' && <PDFIcon size={24} />}
            {doc.type === 'link' && <LinkIcon size={24} />}
            {doc.type === 'text' && <FileCode size={24} />}
          </div>
          <div className="min-w-0">
            <h3 className={cn("text-lg font-black tracking-tight truncate", theme === 'dark' ? "text-white" : "text-slate-900")}>
              {doc.name}
            </h3>
            <p className={cn("text-[10px] font-bold uppercase tracking-widest mt-1 truncate", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>
              {doc.content}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-2 md:mt-0 pl-18 md:pl-0">
        <span className={cn("text-xs font-medium whitespace-nowrap", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>
           {doc.timestamp}
        </span>
        
        {doc.status === 'processing' ? (
          <div className={cn("px-3 py-1.5 rounded-full flex items-center gap-2", theme === 'dark' ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-100 text-indigo-600")}>
             <Loader2 size={12} className="animate-spin" />
             <span className="text-[9px] font-black uppercase tracking-widest hidden sm:inline">Processing</span>
          </div>
        ) : (
          <div className={cn("px-3 py-1.5 rounded-full flex items-center gap-2", theme === 'dark' ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-600")}>
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
             <span className="text-[9px] font-black uppercase tracking-widest hidden sm:inline">Ready</span>
          </div>
        )}
      </div>
    </div>
  );
}
