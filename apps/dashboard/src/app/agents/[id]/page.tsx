// apps/dashboard/src/app/agents/[id]/page.tsx
'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Code2, 
  FileText,
  Sparkles,
  RefreshCw,
  Terminal,
  ShieldCheck,
  History
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import { useAgentStore } from '@/store/useAgentStore';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';
import { useUIStore } from '@/store/useUIStore';

export default function AgentSoulEditor({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const { getAgentById, updateAgent } = useAgentStore();
  const { theme } = useUIStore();
  
  const agent = getAgentById(id);
  const [content, setContent] = useState(agent?.soulMarkdown || '');
  const [name, setName] = useState(agent?.name || '');
  const [title, setTitle] = useState(agent?.title || '');
  
  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'editor' | 'preview'>('split');
  const [activeTab, setActiveTab] = useState<'soul' | 'logs' | 'config'>('soul');

  useEffect(() => {
    if (!agent) {
      router.push('/agents');
    }
  }, [agent, router]);

  if (!agent) return null;

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate network delay for effect
    await new Promise(resolve => setTimeout(resolve, 800));
    updateAgent(id, { soulMarkdown: content, name, title });
    setIsSaving(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-[1600px] mx-auto space-y-6">
      <DashboardResourceHeader
        title={`Agent: ${name}`}
        description={`Detailed configurations, cognitive prompts, and core purpose for agent #${agent.id.slice(0, 8)}.`}
        badge="NC-PROFILE"
        statusLabel="Status:"
        statusValue="Active Soul"
        statusColor="indigo"
        isCollection={false}
        renderRight={
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.push('/agents')}
              className={cn(
                 "flex items-center gap-2 p-3 px-6 rounded-2xl transition-all border",
                 theme === 'dark' ? "bg-slate-800/50 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-500 hover:text-slate-900"
              )}
            >
              <ArrowLeft size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Back</span>
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/20"
            >
              {isSaving ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
              <span className="text-[10px] uppercase tracking-widest">{isSaving ? 'Compiling Soul...' : 'Save Changes'}</span>
            </button>
          </div>
        }
      />

      {/* Main Workspace */}
      <div className="flex-1 flex gap-4 overflow-hidden mb-4">
        {/* Left Sidebar for Tabs */}
        <div className="w-16 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center py-6 gap-6">
           <button 
            onClick={() => setActiveTab('soul')}
            className={cn("p-3 rounded-xl transition-all", activeTab === 'soul' ? "bg-indigo-600/10 text-indigo-500 shadow-inner shadow-indigo-500/10" : "text-slate-600 hover:text-slate-400")}
           >
            <Sparkles size={24} />
           </button>
           <button 
            onClick={() => setActiveTab('logs')}
            className={cn("p-3 rounded-xl transition-all", activeTab === 'logs' ? "bg-indigo-600/10 text-indigo-500" : "text-slate-600 hover:text-slate-400")}
           >
            <History size={24} />
           </button>
           <button 
            onClick={() => setActiveTab('config')}
            className={cn("p-3 rounded-xl transition-all", activeTab === 'config' ? "bg-indigo-600/10 text-indigo-500" : "text-slate-600 hover:text-slate-400")}
           >
            <ShieldCheck size={24} />
           </button>
        </div>

        {/* View Mode Controls (only for soul tab) */}
        {activeTab === 'soul' && (
          <div className="absolute right-8 top-12 z-10 flex gap-2">
            <div className={cn("border rounded-xl p-1 flex shadow-sm", theme === 'dark' ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200")}>
              <button 
                onClick={() => setViewMode('editor')}
                className={cn("p-2 rounded-lg transition-all", viewMode === 'editor' ? (theme === 'dark' ? "bg-slate-800 text-indigo-400" : "bg-slate-100 text-indigo-600") : "text-slate-500 hover:text-slate-300")}
              >
                <Code2 size={16} />
              </button>
              <button 
                onClick={() => setViewMode('split')}
                className={cn("p-2 rounded-lg transition-all", viewMode === 'split' ? (theme === 'dark' ? "bg-slate-800 text-indigo-400" : "bg-slate-100 text-indigo-600") : "text-slate-500 hover:text-slate-300")}
              >
                <div className="flex gap-0.5 items-center justify-center">
                  <div className="w-1.5 h-3 bg-current rounded-sm opacity-50" />
                  <div className="w-1.5 h-3 bg-current rounded-sm" />
                </div>
              </button>
              <button 
                onClick={() => setViewMode('preview')}
                className={cn("p-2 rounded-lg transition-all", viewMode === 'preview' ? (theme === 'dark' ? "bg-slate-800 text-indigo-400" : "bg-slate-100 text-indigo-600") : "text-slate-500 hover:text-slate-300")}
              >
                <Eye size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Editor / Config Area */}
        <div className="flex-1 flex gap-4 overflow-hidden relative">
          {activeTab === 'config' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "w-full h-full p-10 rounded-2xl border shadow-xl flex flex-col items-center",
                theme === 'dark' ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-100"
              )}
            >
              <div className="w-full max-w-2xl space-y-8">
                <div className="space-y-4">
                  <label className={cn("block text-[10px] font-black uppercase tracking-widest", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>
                    Agent Name
                  </label>
                  <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={cn(
                      "w-full p-4 rounded-2xl font-black text-xl outline-none border-2 transition-all",
                      theme === 'dark' 
                        ? "bg-slate-900 border-slate-800 text-white focus:border-indigo-500" 
                        : "bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500"
                    )}
                  />
                </div>

                <div className="space-y-4 text-left">
                  <label className={cn("block text-[10px] font-black uppercase tracking-widest", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>
                    Directive / Purpose
                  </label>
                  <input 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={cn(
                      "w-full p-4 rounded-2xl font-medium outline-none border-2 transition-all",
                      theme === 'dark' 
                        ? "bg-slate-900 border-slate-800 text-slate-300 focus:border-indigo-500" 
                        : "bg-slate-50 border-slate-200 text-slate-600 focus:border-indigo-500"
                    )}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'logs' && (
             <motion.div className="flex w-full items-center justify-center p-20">
               <p className="text-slate-500">No logs available for this session.</p>
             </motion.div>
          )}

          {activeTab === 'soul' && (
            <>
              {(viewMode === 'editor' || viewMode === 'split') && (
            <motion.div 
              layout
              className={cn(
                "bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col",
                viewMode === 'split' ? "w-1/2" : "w-full"
              )}
            >
              <div className="px-5 py-3 border-b border-slate-800 bg-slate-900/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-indigo-400" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Source Code</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-slate-600">UTF-8</span>
                </div>
              </div>
              <div className="flex-1 relative pt-2">
                <Editor
                  height="100%"
                  defaultLanguage="markdown"
                  theme="vs-dark"
                  value={content}
                  onChange={(val) => setContent(val || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: true,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true,
                    padding: { top: 20 },
                    fontFamily: "'Geist Mono', monospace",
                    theme: 'obsidian-dark'
                  }}
                  beforeMount={(monaco) => {
                    monaco.editor.defineTheme('obsidian-dark', {
                      base: 'vs-dark',
                      inherit: true,
                      rules: [],
                      colors: {
                        'editor.background': '#020617', // slate-950
                      }
                    });
                  }}
                />
              </div>
            </motion.div>
          )}

          {(viewMode === 'preview' || viewMode === 'split') && (
            <motion.div 
              layout
              className={cn(
                "bg-transparent border border-slate-800 rounded-2xl overflow-y-auto flex flex-col",
                viewMode === 'split' ? "w-1/2" : "w-full"
              )}
            >
              <div className="px-5 py-3 border-b border-slate-800 bg-slate-900/30 flex items-center gap-2">
                <Eye size={14} className="text-indigo-400" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Live Preview</span>
              </div>
              <div className="p-8 prose prose-invert max-w-none prose-slate prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            </motion.div>
          )}
          </>
        )}
        </div>
      </div>
      
      {/* Visual Footer */}
      <div className="flex items-center justify-between px-6 py-3 bg-indigo-600/5 border border-indigo-500/10 rounded-2xl">
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Aura Synchronized</span>
            </div>
            <div className="w-px h-3 bg-slate-800" />
            <span className="text-[10px] font-mono text-slate-500">Words: {content.split(/\s+/).filter(Boolean).length}</span>
         </div>
         <div className="flex items-center gap-3">
             <span className="text-[10px] font-mono text-indigo-400/60">LATEST_SYNC: {new Date().toLocaleTimeString()}</span>
         </div>
      </div>
    </div>
  );
}
