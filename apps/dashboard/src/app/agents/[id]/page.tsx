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

export default function AgentSoulEditor({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const { getAgentById, updateAgent } = useAgentStore();
  
  const agent = getAgentById(id);
  const [content, setContent] = useState(agent?.soulMarkdown || '');
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
    updateAgent(id, { soulMarkdown: content });
    setIsSaving(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-[1600px] mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6 bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/agents')}
            className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-800 border border-slate-700">
              {agent.profilePicture ? (
                <img src={agent.profilePicture} alt={agent.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500">
                  <Terminal size={20} />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">{agent.name}</h1>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-[10px] font-bold text-indigo-400 uppercase tracking-widest border border-indigo-500/20">
                  Active Lifecycle
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">SOUL.md • Agent ID: {agent.id.slice(0, 8)}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-1 flex mr-4">
            <button 
              onClick={() => setViewMode('editor')}
              className={cn("p-2 rounded-lg transition-all", viewMode === 'editor' ? "bg-slate-800 text-indigo-400" : "text-slate-500 hover:text-slate-300")}
            >
              <Code2 size={16} />
            </button>
            <button 
              onClick={() => setViewMode('split')}
              className={cn("p-2 rounded-lg transition-all", viewMode === 'split' ? "bg-slate-800 text-indigo-400" : "text-slate-500 hover:text-slate-300")}
            >
              <div className="flex gap-0.5">
                <div className="w-1.5 h-3 bg-current rounded-sm opacity-50" />
                <div className="w-1.5 h-3 bg-current rounded-sm" />
              </div>
            </button>
            <button 
              onClick={() => setViewMode('preview')}
              className={cn("p-2 rounded-lg transition-all", viewMode === 'preview' ? "bg-slate-800 text-indigo-400" : "text-slate-500 hover:text-slate-300")}
            >
              <Eye size={16} />
            </button>
          </div>

          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20"
          >
            {isSaving ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
            <span>{isSaving ? 'Compiling Soul...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

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

        {/* Editor Area */}
        <div className="flex-1 flex gap-4 overflow-hidden">
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
