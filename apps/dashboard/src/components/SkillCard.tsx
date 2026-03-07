// apps/dashboard/src/components/SkillCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Terminal, 
  Globe, 
  Database, 
  FileCode, 
  Copy, 
  Check, 
  Plus, 
  ExternalLink,
  Code2,
  Trash2,
  Cpu,
  MessageCircle,
  Github,
  Twitter,
  ChevronRight,
  Zap,
  FileJson,
  Scan,
  Search,
  Network,
  FileText
} from 'lucide-react';
import { Skill, useSkillStore } from '@/store/useSkillStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';

const iconMap: Record<string, any> = {
  Terminal,
  Globe,
  Database,
  FileCode,
  Code2,
  Cpu,
  MessageCircle,
  Github,
  Twitter,
  FileJson,
  Scan,
  Search,
  Network,
  FileText
};

interface SkillCardProps {
  skill: Skill;
  viewMode: 'grid' | 'table';
  isImported?: boolean;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, viewMode, isImported }) => {
  const [copied, setCopied] = React.useState(false);
  const { importSkill, deleteSkill } = useSkillStore();
  const { theme } = useUIStore();
  
  const Icon = iconMap[skill.icon] || Code2;

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(skill.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImport = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    importSkill(skill.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    deleteSkill(skill.id);
  };

  if (viewMode === 'table') {
    return (
    <div 
        className={cn(
          "group transition-all border rounded-[28px] p-4 flex items-center justify-between",
          theme === 'dark' ? "bg-slate-900/40 border-slate-800/60 hover:bg-slate-900 hover:border-indigo-500/30" : "bg-white border-slate-100 shadow-xl shadow-slate-200/20 hover:border-indigo-200"
        )}
      >
        <div className="flex items-center gap-6 flex-1">
          <div className={cn(
             "p-3 rounded-2xl transition-all shadow-inner border group-hover:scale-110",
             theme === 'dark' ? "bg-slate-950 text-indigo-400 border-indigo-500/10" : "bg-white text-indigo-600 border-slate-100 shadow-slate-200/40"
          )}>
            <Icon size={20} />
          </div>
          <span className={cn("text-lg font-black tracking-tighter transition-colors", theme === 'dark' ? "text-white group-hover:text-indigo-400" : "text-slate-950 group-hover:text-indigo-600")}>{skill.name}</span>
        </div>
        
        <div className={cn("hidden lg:block flex-[2] text-xs font-bold uppercase tracking-widest opacity-60 truncate px-4", theme === 'light' && "text-slate-500")}>
          {skill.description}
        </div>

        <div className="flex items-center justify-end gap-4 min-w-[200px]">
          <button 
            onClick={handleCopy}
            className={cn(
              "p-3 rounded-xl transition-all border active:scale-90",
              theme === 'dark' ? "bg-slate-950 border-slate-800 text-slate-500 hover:text-indigo-400" : "bg-white border-slate-100 text-slate-400 hover:text-indigo-600 shadow-sm"
            )}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </button>
          
          {skill.isMarketplace ? (
            <button 
              onClick={handleImport}
              disabled={isImported}
              className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95",
                  isImported 
                      ? (theme === 'dark' ? "bg-slate-900 border border-slate-800 text-slate-700 cursor-not-allowed" : "bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed") 
                      : "bg-indigo-600 text-white shadow-indigo-600/30 hover:bg-indigo-500"
              )}
            >
              {isImported ? 'Added' : <><Plus size={16} /> Install</>}
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                href={`/skills/${skill.id}`}
                className={cn(
                  "p-3 rounded-full transition-all border active:scale-90",
                  theme === 'dark' ? "bg-slate-950 border-slate-800 text-slate-500 hover:text-white" : "bg-white border-slate-100 text-slate-400 hover:text-slate-950 shadow-sm"
                )}
              >
                <ChevronRight size={18} />
              </Link>
              <button
                 onClick={handleDelete}
                 className={cn(
                  "p-3 rounded-full transition-all border active:scale-90",
                  theme === 'dark' ? "bg-slate-950 border-slate-800 text-slate-500 hover:text-rose-400" : "bg-white border-slate-100 text-slate-400 hover:text-rose-600 shadow-sm"
                 )}
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative rounded-[48px] p-10 transition-all border shadow-2xl flex flex-col h-full overflow-hidden",
        theme === 'dark' 
          ? "bg-slate-900/40 border-slate-800/60 hover:bg-slate-900 hover:border-indigo-500/30" 
          : "bg-white border-slate-100 hover:border-indigo-100 shadow-slate-200/40 hover:shadow-2xl hover:shadow-indigo-500/5"
      )}
    >
      <div className="flex justify-between items-start mb-10 relative z-10">
        <div className={cn(
           "p-5 rounded-full transition-all shadow-inner border group-hover:scale-110 group-hover:rotate-12",
           theme === 'dark' ? "bg-slate-900 text-indigo-400 border-indigo-500/20" : "bg-slate-50 text-indigo-600 border-slate-100"
        )}>
          <Icon size={32} />
        </div>
        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
          <button 
            onClick={handleCopy}
            className={cn(
              "p-3.5 rounded-full transition-all border shadow-sm active:scale-90",
              theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-400 hover:text-slate-900"
            )}
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
          </button>
          {!skill.isMarketplace && (
             <Link 
              href={`/skills/${skill.id}`}
              className={cn(
                "p-3.5 rounded-2xl transition-all border shadow-sm active:scale-90",
                theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-400 hover:text-slate-900"
              )}
            >
              <ExternalLink size={20} />
            </Link>
          )}
        </div>
      </div>

      <div className="flex-1 relative z-10">
        <h3 className={cn(
          "text-2xl font-black mb-4 tracking-tighter transition-colors",
          theme === 'dark' ? "text-white group-hover:text-indigo-400" : "text-slate-950 group-hover:text-indigo-600"
        )}>
          {skill.name}
        </h3>
        <p className={cn(
          "text-sm font-bold uppercase tracking-widest opacity-60 leading-relaxed line-clamp-2 min-h-[44px]",
          theme === 'light' && "text-slate-500"
        )}>
          {skill.description}
        </p>
      </div>

      <div className={cn(
        "mt-10 pt-8 border-t flex justify-between items-center relative z-10",
        theme === 'dark' ? "border-slate-800/50" : "border-slate-50"
      )}>
        <span className={cn(
          "text-[10px] font-black uppercase tracking-[0.3em] font-mono",
          theme === 'dark' ? "text-slate-700" : "text-slate-400"
          )}>
          {skill.isMarketplace ? 'Market repository' : 'Neural Link Active'}
        </span>
        {skill.isMarketplace ? (
           <button 
            onClick={handleImport}
            disabled={isImported}
            className={cn(
              "flex items-center gap-3 px-8 py-4 rounded-[20px] text-[10px] font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden active:scale-95 shadow-xl",
              isImported 
                ? (theme === 'dark' ? "bg-slate-900 text-slate-800 border-slate-800 cursor-not-allowed" : "bg-slate-100 text-slate-300 border border-slate-200 cursor-not-allowed shadow-none") 
                : "bg-indigo-600 text-white shadow-indigo-600/30 hover:bg-indigo-500"
            )}
           >
            {isImported ? 'Installed' : <><Zap size={14} className="fill-current" /> Install</>}
           </button>
        ) : (
           <div className={cn(
             "flex items-center gap-3 px-4 py-2.5 rounded-full border shadow-inner transition-colors",
             theme === 'dark' ? "bg-emerald-500/5 border-emerald-500/20" : "bg-emerald-50 border-emerald-100"
           )}>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest font-mono">Synced</span>
           </div>
        )}
      </div>

      {/* Background glow effects */}
      <div className={cn(
        "absolute -bottom-20 -right-20 w-64 h-64 blur-[100px] rounded-full opacity-0 group-hover:opacity-10 transition-opacity",
        theme === 'dark' ? "bg-indigo-500" : "bg-indigo-400"
      )} />
    </div>
  );
};
