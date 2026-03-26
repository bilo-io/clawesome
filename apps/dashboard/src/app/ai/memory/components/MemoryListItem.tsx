import React from 'react';
import { Brain, Check, ChevronRight, FileCode, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { YoutubeIcon, PDFIcon } from './AddDataModal';
import { MAX_DOCUMENTS } from '@/store/useMemoryStore';

export function MemoryListItem({ memory, theme, selected, onToggleSelection }: { memory: any, theme: 'light' | 'dark', selected?: boolean, onToggleSelection?: (e: React.MouseEvent) => void }) {
  return (
    <div
      className={cn(
        "p-6 rounded-[32px] border transition-all flex items-center justify-between group h-full cursor-pointer relative",
        selected 
          ? (theme === 'dark' ? "bg-indigo-500/10 border-indigo-500/50" : "bg-indigo-50 border-indigo-500")
          : (theme === 'dark' ? "bg-slate-900/40 border-slate-800/60 hover:bg-slate-900 hover:border-indigo-500/50" : "bg-white border-slate-100 hover:shadow-xl shadow-slate-200/50 hover:border-indigo-400")
      )}
    >
      <div className="flex items-center gap-6">
        {/* Selection Circle */}
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

        <Link href={`/ai/memory/${memory.id}`} className="flex items-center gap-6">
          <div className="p-3 bg-indigo-500/10 rounded-full border border-indigo-500/20 text-indigo-500 group-hover:scale-110 transition-transform">
             <Brain size={20} />
          </div>
          <div>
            <h3 className={cn("text-lg font-black tracking-tight group-hover:text-indigo-500 transition-colors", theme === 'dark' ? "text-white" : "text-slate-900")}>
              {memory.name}
            </h3>
            <p className={cn("text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 mt-1", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>
              {memory.documents.length}/{MAX_DOCUMENTS} Units <span className="text-slate-700">•</span> Updated {memory.lastUpdated}
            </p>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex -space-x-2">
            {memory.documents.slice(0, 3).map((doc: any, i: number) => (
              <div key={i} className={cn(
                "w-8 h-8 rounded-full border-2 flex items-center justify-center overflow-hidden",
                theme === 'dark' ? "bg-slate-950 border-slate-900 shadow-xl" : "bg-white border-slate-50 shadow-sm"
              )}>
                 {doc.type === 'youtube' && <YoutubeIcon size={14} />}
                 {doc.type === 'pdf' && <PDFIcon size={14} />}
                 {doc.type === 'link' && <LinkIcon size={14} className="text-blue-500" />}
                 {doc.type === 'text' && <FileCode size={14} className="text-emerald-500" />}
              </div>
            ))}
            {memory.documents.length > 3 && (
               <div className={cn(
                 "w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-[10px]",
                 theme === 'dark' ? "bg-slate-800 border-slate-900 text-slate-400 shadow-xl" : "bg-slate-100 border-slate-50 text-slate-500 shadow-sm"
               )}>
                 +{memory.documents.length - 3}
               </div>
            )}
        </div>
        <button className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:scale-105",
          theme === 'dark' ? "bg-slate-950 border-slate-800 text-slate-500 group-hover:text-indigo-400 group-hover:border-indigo-500/50" : "bg-slate-50 border-slate-100 text-slate-400 group-hover:text-indigo-600 shadow-sm group-hover:border-indigo-200"
        )}>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
