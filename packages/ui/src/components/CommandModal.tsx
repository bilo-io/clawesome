'use client';

import { Search, Command as CommandIcon, X } from 'lucide-react';
import { cn } from '../utils';
import { useUI } from '../ThemeContext';

export interface CommandResult {
  icon: any; // React component
  label: string;
  category: string;
}

export interface CommandModalProps {
  isOpen: boolean;
  onClose: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  results: CommandResult[];
  onSelect: (result: CommandResult) => void;
  isFocusMode?: boolean;
}

export const CommandModal = ({
  isOpen,
  onClose,
  search,
  onSearchChange,
  results,
  onSelect,
  isFocusMode = false
}: CommandModalProps) => {
  const { theme } = useUI();

  if (isFocusMode || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      <div 
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className={cn(
        "relative w-full max-w-2xl backdrop-blur-2xl border rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in zoom-in duration-200",
        theme === 'dark' ? "bg-slate-900/90 border-slate-700/50" : "bg-white/90 border-slate-200"
      )}>
        <div className={cn(
          "flex items-center px-4 py-3 border-b",
          theme === 'dark' ? "border-slate-800" : "border-slate-100"
        )}>
          <Search className="text-slate-500 mr-3" size={20} />
          <input
            autoFocus
            placeholder="Type a command or search..."
            className={cn(
              "flex-1 bg-transparent border-none outline-none text-lg",
              theme === 'dark' ? "text-slate-100 placeholder-slate-500" : "text-slate-900 placeholder-slate-400"
            )}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded border text-[10px] font-mono",
            theme === 'dark' ? "bg-slate-800 border-slate-700 text-slate-400" : "bg-slate-100 border-slate-200 text-slate-500"
          )}>
             <CommandIcon size={10} />
             <span>K</span>
          </div>
          <button onClick={onClose} className="ml-4 p-1 hover:bg-slate-800 rounded transition-colors text-slate-500">
            <X size={18} />
          </button>
        </div>

        <div className="p-2 max-h-[60vh] overflow-y-auto no-scrollbar">
          {results.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => onSelect(item)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-600/20 hover:text-indigo-300 group cursor-pointer transition-all border border-transparent hover:border-indigo-500/30",
                theme === 'dark' ? "text-slate-200" : "text-slate-700"
              )}
            >
              <div className={cn(
                "p-2 rounded-lg transition-colors",
                theme === 'dark' ? "bg-slate-800 text-slate-400 group-hover:text-indigo-400" : "bg-slate-100 text-slate-500 group-hover:text-indigo-600"
              )}>
                <item.icon size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-tight">{item.label}</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">{item.category}</span>
              </div>
            </div>
          ))}
          {results.length === 0 && (
            <div className="p-12 text-center">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest italic">No neural matches found...</span>
            </div>
          )}
        </div>

        <div className={cn(
          "px-4 py-2 border-t flex items-center justify-between",
          theme === 'dark' ? "bg-slate-950/50 border-slate-800" : "bg-slate-50 border-slate-100"
        )}>
           <span className="text-[10px] text-slate-600 font-mono font-bold uppercase tracking-widest">{results.length} results found</span>
           <div className="flex gap-4">
              <span className="text-[10px] text-slate-600 flex items-center gap-1 font-bold">
                 <span className={cn(
                   "px-1 rounded border font-mono",
                   theme === 'dark' ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
                 )}>ENTER</span> to select
              </span>
           </div>
        </div>
      </div>
    </div>
  );
};
