// apps/dashboard/src/app/skills/[id]/page.tsx
'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  Copy,
  Check,
  FileText,
  Sparkles,
  RefreshCw,
  Terminal,
  Code2,
  Cpu,
  Globe,
  Database,
  Eye,
  Settings,
  ShieldCheck,
  Zap,
  MessageCircle,
  Github,
  Twitter
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import { useSkillStore, Skill } from '@/store/useSkillStore';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';

const iconMap: Record<string, any> = {
  Terminal,
  Globe,
  Database,
  Code2,
  Cpu,
  Zap,
  ShieldCheck,
  MessageCircle,
  Github,
  Twitter
};

export default function SkillDetailView({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const { theme } = useUIStore();
  const { getSkillById, updateSkill } = useSkillStore();

  const skill = getSkillById(id);
  const [content, setContent] = useState(skill?.content || '');
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'editor' | 'preview' | 'split'>('split');

  useEffect(() => {
    if (!skill) {
      router.push('/ai/skills');
    }
  }, [skill, router]);

  if (!skill) return null;

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateSkill(id, { content });
    setIsSaving(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const Icon = iconMap[skill.icon] || Code2;

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-7xl mx-auto space-y-12">
      <DashboardResourceHeader
        title={skill.name}
        description="Low-level capability synthesis and logic orchestration. Modify the neural sub-routines and operational parameters of this specific skill module."
        badge="NC-SKILLS"
        statusLabel="Capability Status:"
        statusValue="Active"
        statusColor="emerald"
        isCollection={false}
        backLink={{ label: 'Back to Skills', href: '/ai/skills' }}
        renderRight={
          <div className="flex items-center gap-4">
            <div className={cn(
              "rounded-2xl p-1.5 flex mr-2 border shadow-sm",
              theme === 'dark' ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
            )}>
              <button
                onClick={() => setViewMode('editor')}
                className={cn(
                  "p-3 rounded-xl transition-all",
                  viewMode === 'editor'
                    ? (theme === 'dark' ? "bg-slate-800 text-indigo-400 shadow-inner" : "bg-white text-indigo-600 shadow-sm border border-slate-100")
                    : "text-slate-500 hover:text-indigo-500"
                )}
              >
                <Code2 size={20} />
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={cn(
                  "p-3 rounded-xl transition-all",
                  viewMode === 'split'
                    ? (theme === 'dark' ? "bg-slate-800 text-indigo-400 shadow-inner" : "bg-white text-indigo-600 shadow-sm border border-slate-100")
                    : "text-slate-500 hover:text-indigo-500"
                )}
              >
                <div className="flex gap-1.5 justify-center">
                  <div className="w-2.5 h-5 bg-current rounded-[3px] opacity-40" />
                  <div className="w-2.5 h-5 bg-current rounded-[3px]" />
                </div>
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={cn(
                  "p-3 rounded-xl transition-all",
                  viewMode === 'preview'
                    ? (theme === 'dark' ? "bg-slate-800 text-indigo-400 shadow-inner" : "bg-white text-indigo-600 shadow-sm border border-slate-100")
                    : "text-slate-500 hover:text-indigo-500"
                )}
              >
                <Eye size={20} />
              </button>
            </div>

            <button
              onClick={handleCopy}
              className={cn(
                "p-4 rounded-[20px] transition-all border shadow-sm",
                theme === 'dark'
                  ? "bg-slate-800 text-slate-500 border-slate-700 hover:text-white"
                  : "bg-white text-slate-400 border-slate-100 hover:text-indigo-600"
              )}
            >
              {copied ? <Check size={22} className="text-emerald-500" /> : <Copy size={22} />}
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving || skill.isMarketplace}
              className={cn(
                 "flex items-center gap-4 px-10 py-4 rounded-[24px] font-bold uppercase tracking-widest text-[11px] transition-all shadow-xl",
                 skill.isMarketplace
                  ? "bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed dark:bg-slate-800 dark:text-slate-600 dark:border-slate-700"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 active:translate-y-1"
              )}
            >
              {isSaving ? <RefreshCw size={20} className="animate-spin" /> : <Save size={20} />}
              <span>{isSaving ? 'Syncing...' : 'Commit Change'}</span>
            </button>
          </div>
        }
      />

      {/* Workspace Area */}
      <div className="flex-1 flex gap-8 min-h-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {(viewMode === 'editor' || viewMode === 'split') && (
            <motion.div
              key="editor"
              layout
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className={cn(
                "rounded-[32px] overflow-hidden flex flex-col shadow-2xl border transition-all",
                theme === 'dark' ? "bg-slate-950 border-slate-800" : "bg-white border-slate-100 shadow-slate-200/50",
                viewMode === 'split' ? "w-1/2" : "w-full"
              )}
            >
              <div className={cn(
                "px-8 py-5 border-b flex items-center justify-between",
                theme === 'dark' ? "border-slate-900 bg-slate-900/30" : "border-slate-50 bg-slate-50/50"
              )}>
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-indigo-600" />
                  <span className={cn("text-[10px] font-bold uppercase tracking-[0.3em]", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>Source Definition // MARKDOWN</span>
                </div>
                <div className="flex items-center gap-2">
                   <Settings size={14} className={theme === 'dark' ? "text-slate-700" : "text-slate-300"} />
                </div>
              </div>
              <div className="flex-1 relative">
                <Editor
                  height="100%"
                  defaultLanguage="markdown"
                  theme={theme === 'dark' ? 'vs-dark' : 'light'}
                  value={content}
                  onChange={(val) => setContent(val || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 15,
                    lineNumbers: 'on',
                    padding: { top: 30, bottom: 30 },
                    wordWrap: 'on',
                    fontFamily: "'Geist Mono', monospace",
                    readOnly: skill.isMarketplace,
                    scrollbar: {
                       vertical: 'hidden',
                       horizontal: 'hidden'
                    }
                  }}
                />
              </div>
            </motion.div>
          )}

          {(viewMode === 'preview' || viewMode === 'split') && (
            <motion.div 
              key="preview"
              layout
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className={cn(
                "rounded-[32px] overflow-y-auto flex flex-col shadow-2xl border transition-all no-scrollbar",
                theme === 'dark' ? "bg-slate-950 border-slate-800/60" : "bg-slate-50/50 border-slate-100 shadow-slate-200/50",
                viewMode === 'split' ? "w-1/2" : "w-full"
              )}
            >
              <div className={cn(
                "px-8 py-5 border-b flex items-center gap-3 sticky top-0 backdrop-blur-md z-10",
                theme === 'dark' ? "border-slate-800 bg-black/20" : "border-slate-100 bg-white/60"
              )}>
                <Eye size={16} className="text-emerald-500" />
                <span className={cn("text-[10px] font-bold uppercase tracking-[0.3em]", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>Live Interface Rendering</span>
              </div>
              <div className={cn(
                "p-10 prose prose-invert max-w-none transition-colors duration-300",
                theme === 'dark' 
                  ? "prose-slate prose-headings:text-indigo-400 prose-strong:text-white prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800 prose-code:text-indigo-300" 
                  : "prose-slate prose-headings:text-indigo-700 prose-strong:text-slate-900 prose-pre:bg-white prose-pre:border prose-pre:border-slate-200 prose-code:text-indigo-700 prose-blockquote:border-indigo-200"
              )}>
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Meta Bar */}
      <div className={cn(
        "p-5 rounded-[24px] border flex items-center justify-between transition-all",
        theme === 'dark' ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-100 shadow-sm shadow-slate-100"
      )}>
        <div className="flex items-center gap-8">
           <div className="flex items-center gap-3">
              <span className={cn("text-[9px] font-bold uppercase tracking-widest", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>Commit_Hash:</span>
              <span className="text-[10px] font-mono text-indigo-500 font-bold">{skill.id.replace(/-/g, '').slice(0, 16)}</span>
           </div>
           <div className={cn("w-px h-3", theme === 'dark' ? "bg-slate-800" : "bg-slate-200")} />
           <div className="flex items-center gap-3">
              <span className={cn("text-[9px] font-bold uppercase tracking-widest", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>Source_Identity:</span>
              <span className={cn("text-[10px] font-bold uppercase", theme === 'dark' ? "text-slate-200" : "text-slate-900")}>{skill.isMarketplace ? 'Global_Repository' : 'Local_Instance'}</span>
           </div>
        </div>
        <div className="flex items-center gap-4">
           <span className={cn("text-[9px] font-mono", theme === 'dark' ? "text-slate-700" : "text-slate-400")}>UNITS: {content.length} bytes</span>
           <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
        </div>
      </div>
    </div>
  );
}
