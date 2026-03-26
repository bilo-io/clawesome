import React from 'react';
import { Brain, Check, MoreVertical, FileCode, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { YoutubeIcon, PDFIcon } from './AddDataModal';

export function MemoryCard({ memory, theme, selected, onToggleSelection }: { memory: any, theme: 'light' | 'dark', selected?: boolean, onToggleSelection?: (e: React.MouseEvent) => void }) {
  return (
    <div 
      className={cn(
        "group p-8 rounded-[48px] border shadow-2xl relative overflow-hidden transition-all h-full block cursor-pointer",
        selected 
          ? (theme === 'dark' ? "bg-indigo-500/10 border-indigo-500/50" : "bg-indigo-50 border-indigo-500")
          : (theme === 'dark' ? "bg-slate-900/40 border-slate-800/60 shadow-black/40 hover:border-indigo-500/50" : "bg-white border-slate-100 shadow-slate-200/50 hover:border-indigo-400")
      )}
    >
      {/* Selection Indicator */}
      <div 
        onClick={onToggleSelection}
        className={cn(
        "w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all absolute top-6 left-6 z-20 cursor-pointer",
        selected 
          ? "bg-indigo-500 border-indigo-500 text-white scale-110 shadow-lg shadow-indigo-500/20" 
          : "border-slate-700 bg-slate-950 opacity-0 group-hover:opacity-100"
      )}>
        {selected && <Check size={14} strokeWidth={4} />}
      </div>

      <Link href={`/ai/memory/${memory.id}`} className="block relative z-10 pl-6">
        <div className="flex justify-between items-start mb-8">
        <div className="p-4 bg-indigo-500/10 rounded-full border border-indigo-500/20 text-indigo-500 group-hover:scale-110 transition-transform">
           <Brain size={28} />
        </div>
        <button 
          onClick={(e) => e.preventDefault()}
          className={cn(
            "p-2 rounded-full border transition-colors",
            theme === 'dark' ? "bg-slate-950 border-slate-800 text-slate-500" : "bg-slate-50 border-slate-100 text-slate-400"
          )}
        >
           <MoreVertical size={16} />
        </button>
      </div>

      <div className="relative z-10">
        <h3 className={cn("text-2xl font-black tracking-tight mb-2 group-hover:text-indigo-500 transition-colors", theme === 'dark' ? "text-white" : "text-slate-900")}>
          {memory.name}
        </h3>
        <p className={cn("text-[10px] font-bold uppercase tracking-widest mb-8", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>
          Updated {memory.lastUpdated}
        </p>

        <div className="space-y-3">
          {memory.documents.slice(0, 3).map((doc: any) => (
            <div 
              key={doc.id}
              className={cn(
                "flex items-center justify-between p-3 rounded-full border text-sm transition-all",
                theme === 'dark' ? "bg-slate-950 border-slate-800/50" : "bg-slate-50 border-slate-100"
              )}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className={cn(
                  "p-1.5 rounded-lg shrink-0",
                  doc.type === 'youtube' ? 'text-red-500' :
                  doc.type === 'pdf' ? 'text-amber-500' :
                  doc.type === 'link' ? 'text-blue-500' : 'text-emerald-500'
                )}>
                   {doc.type === 'youtube' && <YoutubeIcon size={14} />}
                   {doc.type === 'pdf' && <PDFIcon size={14} />}
                   {doc.type === 'link' && <LinkIcon size={14} />}
                   {doc.type === 'text' && <FileCode size={14} />}
                </div>
                <span className={cn("font-bold truncate", theme === 'dark' ? "text-slate-300" : "text-slate-600")}>
                  {doc.name}
                </span>
              </div>
            </div>
          ))}
          {memory.documents.length > 3 && (
            <p className="text-xs text-slate-500 font-bold ml-2">+{memory.documents.length - 3} more data points...</p>
          )}
          {memory.documents.length === 0 && (
            <p className="text-xs text-slate-500 italic p-4 text-center border border-dashed border-slate-500/30 rounded-2xl">Neural void. Add data to begin.</p>
          )}
        </div>
      </div>

      </Link>

      {/* Background Decor */}
      <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full group-hover:bg-indigo-500/20 transition-colors pointer-events-none" />
    </div>
  );
}
