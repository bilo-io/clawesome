'use client';

import React from 'react';
import { 
  Workflow as WorkflowIcon,
  ChevronRight,
  Clock,
  Zap,
  Check,
  Pause,
  Play,
  ShoppingCart,
  Trash2,
  Copy,
  Plus,
  Bot,
  GitBranch,
  Upload,
  MessageSquare,
  Database
} from 'lucide-react';
import { useUI } from '../ThemeContext';
import { cn } from '../utils';
import type { Workflow } from '@antigravity/core';
import { formatDistanceToNow } from 'date-fns';

interface WorkflowCardProps {
  workflow: Workflow;
  viewMode: 'grid' | 'list';
  isMarketplace?: boolean;
  isImported?: boolean;
  selected?: boolean;
  onToggleSelection?: (e: React.MouseEvent) => void;
  onToggleStatus?: (e: React.MouseEvent) => void;
  onInstall?: (e: React.MouseEvent) => void;
  onClick?: () => void;
}

export const WorkflowCard: React.FC<WorkflowCardProps> = ({ 
  workflow, 
  viewMode, 
  isMarketplace,
  isImported,
  selected,
  onToggleSelection,
  onToggleStatus,
  onInstall,
  onClick
}) => {
  const { theme } = useUI();
  const isDark = theme === 'dark';

  const handleAction = (e: React.MouseEvent, action: (e: React.MouseEvent) => void) => {
    e.preventDefault();
    e.stopPropagation();
    action(e);
  };

  const getNodeIcon = (node: any) => {
    const type = node.type?.toLowerCase();
    const label = node.data?.label?.toLowerCase() || '';
    
    if (type === 'trigger' || type === 'start') return <Zap size={10} className="text-amber-500" />;
    if (type === 'agent') return <Bot size={10} className="text-indigo-400" />;
    if (type === 'logic') return <GitBranch size={10} className="text-slate-500" />;
    if (label.includes('slack')) return <MessageSquare size={10} className="text-sky-400" />;
    if (label.includes('upload') || label.includes('drive')) return <Upload size={10} className="text-emerald-400" />;
    return <Database size={10} className="text-slate-600" />;
  };

  const cardBaseClasses = cn(
    "relative h-full transition-all overflow-hidden group cursor-pointer border uppercase tracking-tight",
    selected
      ? (isDark ? "bg-indigo-500/10 border-indigo-500/50" : "bg-indigo-50 border-indigo-500")
      : (isDark 
          ? "bg-slate-900/40 border-slate-800/60 shadow-none hover:bg-slate-900 hover:border-indigo-500/30" 
          : "bg-white border-slate-100 shadow-2xl shadow-slate-200/20 hover:border-indigo-200")
  );

  const selectionIndicatorClasses = cn(
    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all z-30 cursor-pointer",
    selected
      ? "bg-indigo-500 border-indigo-500 text-white scale-110 shadow-lg shadow-indigo-500/20" 
      : (isDark ? "border-slate-700 bg-slate-950 opacity-0 group-hover:opacity-100" : "opacity-0 group-hover:opacity-100 border-slate-200 bg-white shadow-sm")
  );

  if (viewMode === 'list') {
    return (
      <div 
        onClick={onClick}
        className={cn(cardBaseClasses, "p-4 rounded-[28px] flex flex-row items-center gap-6 pl-16")}
      >
        <div 
          onClick={(e) => handleAction(e, onToggleSelection!)}
          className={cn(selectionIndicatorClasses, "absolute left-6 top-1/2 -translate-y-1/2")}
        >
          {selected && <Check size={12} strokeWidth={4} />}
        </div>
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center text-indigo-500 transition-all border",
          isDark ? "bg-indigo-500/5 border-indigo-500/10" : "bg-indigo-500/10 border-indigo-500/20"
        )}>
          <WorkflowIcon size={20} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 className={cn("text-lg font-black uppercase tracking-tight truncate max-w-md transition-colors", isDark ? "text-white" : "text-slate-900")}>
              {workflow.name}
            </h3>
            {!isMarketplace && (
              <span className={cn(
                "px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border transition-all",
                workflow.status === 'active' 
                  ? (isDark ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/10" : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20")
                  : (isDark ? "bg-amber-500/5 text-amber-500 border-amber-500/10" : "bg-amber-500/10 text-amber-500 border-amber-500/20")
              )}>
                {workflow.status}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <p className={cn("text-[10px] font-bold uppercase tracking-[0.2em] transition-colors", isDark ? "text-slate-600" : "text-slate-400")}>{isMarketplace ? 'Marketplace Template' : 'Local Automation'}</p>
            <div className="flex gap-1">
              {workflow.nodes.slice(0, 8).map((node, i) => (
                <div key={i} className={cn("w-4 h-4 rounded flex items-center justify-center transition-all", isDark ? "bg-slate-800/50" : "bg-slate-100")}>
                  {getNodeIcon(node)}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end min-w-[150px]">
            <span className={cn("text-base font-black font-mono transition-colors", isDark ? "text-white" : "text-slate-900")}>
              {workflow.nodes.length} NODES
            </span>
            {!isMarketplace && (
              <span className={cn("text-[9px] font-bold uppercase tracking-widest transition-colors", isDark ? "text-slate-600" : "text-slate-400")}>
                LAST RUN: {workflow.lastRun ? formatDistanceToNow(workflow.lastRun!) + ' ago' : 'Never'}
              </span>
            )}
          </div>

          {isMarketplace ? (
            <button 
              onClick={(e) => handleAction(e, onInstall!)}
              disabled={isImported}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95",
                isImported 
                  ? (isDark ? "bg-slate-900 border border-slate-800 text-slate-700 cursor-not-allowed shadow-none" : "bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed shadow-none") 
                  : "bg-indigo-600 text-white shadow-indigo-600/30 hover:bg-indigo-500"
              )}
            >
              {isImported ? 'Added' : <><Plus size={16} /> Install</>}
            </button>
          ) : (
            <button 
              onClick={(e) => handleAction(e, onToggleStatus!)}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90",
                workflow.status === 'active' 
                  ? (isDark ? "bg-emerald-500/10 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)]" : "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20") 
                  : (isDark ? "bg-amber-500/10 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.1)]" : "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20")
              )}
            >
              {workflow.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className={cn(cardBaseClasses, "p-8 rounded-[48px]")}
    >
      {/* Selection Indicator */}
      <div 
        onClick={(e) => handleAction(e, onToggleSelection!)}
        className={cn(selectionIndicatorClasses, "absolute top-6 left-6")}
      >
        {selected && <Check size={14} strokeWidth={4} />}
      </div>

      <div className="flex justify-between items-start mb-10">
        <div className="flex flex-col gap-1">
          <span className={cn("text-[10px] font-black tracking-widest uppercase mb-1 transition-colors", isDark ? "text-slate-600" : "text-slate-400")}>
            {isMarketplace ? 'TEMPLATE' : 'AUTOMATION'}
          </span>
          <h3 className={cn("text-2xl font-black group-hover:text-indigo-500 transition-all uppercase tracking-tight truncate whitespace-nowrap", isDark ? "text-white" : "text-slate-900")}>
            {workflow.name}
          </h3>
        </div>
        {!isMarketplace && (
          <button 
            onClick={(e) => handleAction(e, onToggleStatus!)}
            className={cn(
              "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border transition-all hover:scale-105 active:scale-95",
              workflow.status === 'active' 
                ? (isDark ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/10" : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20")
                : (isDark ? "bg-amber-500/5 text-amber-500 border-amber-500/10" : "bg-amber-500/10 text-amber-500 border-amber-500/20")
            )}
          >
            {workflow.status}
          </button>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
           <div className="flex flex-col gap-2">
               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <Zap size={12} className="text-indigo-500" />
                  Nodes Count
               </div>
               <span className={cn("text-2xl font-black font-mono pl-1 transition-colors", isDark ? "text-white" : "text-black")}>
                  {workflow.nodes.length}
               </span>
            </div>
            {!isMarketplace && (
              <div className="flex flex-col items-end gap-2">
                 <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">
                    Last Run
                    <Clock size={12} className="text-indigo-500" />
                 </div>
                 <span className={cn("text-xs font-bold font-mono transition-colors", isDark ? "text-slate-500" : "text-slate-600")}>
                    {workflow.lastRun ? formatDistanceToNow(workflow.lastRun!) + ' ago' : 'Never'}
                 </span>
              </div>
            )}
        </div>

        <div className="flex gap-2">
          {workflow.nodes.slice(0, 5).map((node, i) => (
            <div key={i} className={cn("w-8 h-8 rounded-lg border flex items-center justify-center transition-all", isDark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200")} title={node.data.label}>
              {getNodeIcon(node)}
            </div>
          ))}
          {workflow.nodes.length > 5 && (
            <div className={cn("w-8 h-8 rounded-lg border flex items-center justify-center text-[10px] font-bold transition-all", isDark ? "bg-slate-800 border-slate-700 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-500")}>
              +{workflow.nodes.length - 5}
            </div>
          )}
        </div>

        <div className={cn("pt-6 border-t flex items-center justify-between transition-colors", isDark ? "border-slate-800/50" : "border-slate-100")}>
           {isMarketplace ? (
             <button 
                onClick={(e) => handleAction(e, onInstall!)}
                disabled={isImported}
                className={cn(
                  "flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden active:scale-95 shadow-xl w-full justify-center",
                  isImported 
                    ? (isDark ? "bg-slate-900 text-slate-800 border border-slate-800 cursor-not-allowed shadow-none" : "bg-slate-100 text-slate-300 border border-slate-200 cursor-not-allowed shadow-none") 
                    : "bg-indigo-600 text-white shadow-indigo-600/30 hover:bg-indigo-500"
                )}
              >
                {isImported ? 'Already Synced' : <><Zap size={14} className="fill-current" /> Install System</>}
              </button>
           ) : (
             <>
               <div className="flex items-center gap-3">
                  <button 
                    onClick={(e) => handleAction(e, onToggleStatus!)}
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                      workflow.status === 'active' 
                        ? (isDark ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20" : "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20") 
                        : (isDark ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20" : "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20")
                    )}
                  >
                     {workflow.status === 'active' ? <Pause size={14} /> : <Play size={14} />}
                  </button>
               </div>
               <div className="flex items-center gap-1 group-hover:gap-2 transition-all text-indigo-500 font-black text-[11px] uppercase tracking-widest">
                  ACCESS EDITOR
                  <ChevronRight size={14} />
               </div>
             </>
           )}
        </div>
      </div>

      {/* Industrial background accent */}
      <div className={cn(
        "absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.1] pointer-events-none group-hover:scale-110 transition-all duration-700",
        isDark ? "text-white" : "text-indigo-900"
      )}>
         <WorkflowIcon size={64} />
      </div>
    </div>
  );
};
