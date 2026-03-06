'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Code, 
  Save, 
  Send, 
  Plus, 
  Trash2, 
  ChevronDown, 
  Brain, 
  User, 
  Shield, 
  Bot,
  CircleCheck,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';

interface Config {
  name: string;
  version: string;
  user: {
    name: string;
    role: string;
  };
  'agents:': Array<{ name: string; role: string }>; // Shape matches clawesome.json
  connections: Array<{ name: string; code: string; apiKey: string }>;
  ai: {
    providers: Array<{
      name: string;
      code: string;
      models: string[];
      apiKey: string;
    }>;
  };
}

export default function ConfigPage() {
  const { theme } = useUIStore();
  const [viewMode, setViewMode] = useState<'form' | 'json'>('form');
  const [config, setConfig] = useState<Config | null>(null);
  const [jsonInput, setJsonInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/config');
      const data = await response.json();
      setConfig(data);
      setJsonInput(JSON.stringify(data, null, 4));
    } catch (error) {
      console.error('Failed to load config:', error);
      setStatusMessage({ text: 'Neural disconnect: Failed to load config.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (showStatus = true) => {
    if (!config) return;
    try {
      const resp = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config, action: 'save' })
      });
      if (resp.ok && showStatus) {
        setStatusMessage({ text: 'Sync Complete: Data persisted to clawesome.json', type: 'success' });
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } catch (error) {
      setStatusMessage({ text: 'Sync Error: Persistence failed.', type: 'error' });
    }
  };

  const handlePublish = async () => {
    if (!config) return;
    try {
      const resp = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config, action: 'publish' })
      });
      if (resp.ok) {
        setStatusMessage({ text: 'Core Published: Config deployed to dist/', type: 'success' });
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } catch (error) {
      setStatusMessage({ text: 'Publication Error: Deployment failed.', type: 'error' });
    }
  };

  const [jsonError, setJsonError] = useState<string | null>(null);

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setJsonInput(val);
    try {
      const parsed = JSON.parse(val);
      setConfig(parsed);
      setJsonError(null);
    } catch (err: any) {
      setJsonError(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full pt-40">
        <div className="animate-spin text-indigo-500">
          <Brain size={48} />
        </div>
      </div>
    );
  }

  return (
    <main className="space-y-12 pb-20 max-w-[1200px] mx-auto transition-colors duration-300">
      <DashboardResourceHeader
        title="Config"
        description="Low-level system blueprint and neural architecture definitions. Modify the core JSON configuration to define gateways, swarm roles, and intelligence provider parameters."
        badge="SYS-01"
        statusLabel="Global Neural Blueprint:"
        statusValue="clawesome.json"
        statusColor="indigo"
        isCollection={false}
        renderRight={
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleSave()}
              className={cn(
                "px-6 py-3 rounded-full border font-bold uppercase tracking-widest text-[11px] flex items-center gap-2 transition-all active:scale-95",
                theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-100 text-slate-400 hover:text-indigo-600 shadow-sm"
              )}
            >
              <Save size={16} /> Save
            </button>
            <button 
              onClick={handlePublish}
              className="px-6 py-3 bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white rounded-full font-bold uppercase tracking-widest text-[11px] flex items-center gap-2 shadow-xl shadow-purple-600/20 active:scale-95 transition-all"
            >
              <Send size={16} /> Publish
            </button>
          </div>
        }
      />

      {/* Control Bar */}
      <div className="flex items-center justify-between">
         <div className={cn("p-1.5 rounded-full border flex transition-colors", theme === 'dark' ? "bg-slate-950 border-slate-800" : "bg-white border-slate-100 shadow-sm")}>
            <button 
              onClick={() => setViewMode('form')}
              className={cn(
                "px-6 py-2.5 rounded-full transition-all text-xs font-black uppercase tracking-widest flex items-center gap-2",
                viewMode === 'form' 
                  ? "bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white shadow-lg shadow-purple-600/20" 
                  : (theme === 'dark' ? "text-slate-600 hover:text-white" : "text-slate-400 hover:text-black")
              )}
            >
              <Settings size={14} /> Blueprint
            </button>
            <button 
              onClick={() => {
                setViewMode('json');
                setJsonInput(JSON.stringify(config, null, 4));
              }}
              className={cn(
                "px-6 py-2.5 rounded-full transition-all text-xs font-black uppercase tracking-widest flex items-center gap-2",
                viewMode === 'json' 
                  ? "bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white shadow-lg shadow-purple-600/20" 
                  : (theme === 'dark' ? "text-slate-600 hover:text-white" : "text-slate-400 hover:text-black")
              )}
            >
              <Code size={14} /> Source {}
            </button>
         </div>

         <AnimatePresence>
            {statusMessage && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 rounded-2xl border text-[11px] font-black uppercase tracking-widest",
                  statusMessage.type === 'success' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-rose-500/10 border-rose-500/20 text-rose-500"
                )}
              >
                {statusMessage.type === 'success' ? <CircleCheck size={16} /> : <AlertCircle size={16} />}
                {statusMessage.text}
              </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {viewMode === 'form' ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Basic Info */}
            <div className="space-y-12">
               <section className={cn("p-10 rounded-[40px] border shadow-2xl space-y-8", theme === 'dark' ? "bg-slate-900/40 border-slate-800/60" : "bg-white border-slate-100 shadow-slate-200/50")}>
                  <div className="flex items-center gap-4 mb-2">
                     <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-500">
                        <User size={20} />
                     </div>
                     <h2 className={cn("text-xs font-black uppercase tracking-[0.4em]", theme === "dark" ? "text-slate-500" : "text-slate-700")}>Identity Core</h2>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                       <label className={cn("text-[10px] font-bold uppercase tracking-widest ml-1", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>Brain Alias</label>
                       <input 
                         type="text"
                         value={config?.name}
                         onChange={(e) => setConfig(prev => prev ? { ...prev, name: e.target.value } : null)}
                         className={cn("w-full px-6 py-4 rounded-2xl border outline-none font-bold text-sm", theme === 'dark' ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-100")}
                       />
                    </div>
                    <div className="space-y-3">
                       <label className={cn("text-[10px] font-bold uppercase tracking-widest ml-1", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>Build Version</label>
                       <input 
                         type="text"
                         value={config?.version}
                         onChange={(e) => setConfig(prev => prev ? { ...prev, version: e.target.value } : null)}
                         className={cn("w-full px-6 py-4 rounded-2xl border outline-none font-bold text-sm", theme === 'dark' ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-100")}
                       />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                       <label className={cn("text-[10px] font-bold uppercase tracking-widest ml-1", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>User Designation</label>
                       <input 
                         type="text"
                         value={config?.user.role}
                         onChange={(e) => setConfig(prev => prev ? { ...prev, user: { ...prev.user, role: e.target.value } } : null)}
                         className={cn("w-full px-6 py-4 rounded-2xl border outline-none font-bold text-sm", theme === 'dark' ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-100")}
                       />
                    </div>
                    <div className="space-y-3">
                       <label className={cn("text-[10px] font-bold uppercase tracking-widest ml-1", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>Actual Identifier</label>
                       <input 
                         type="text"
                         value={config?.user.name}
                         onChange={(e) => setConfig(prev => prev ? { ...prev, user: { ...prev.user, name: e.target.value } } : null)}
                         className={cn("w-full px-6 py-4 rounded-2xl border outline-none font-bold text-sm", theme === 'dark' ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-100")}
                       />
                    </div>
                  </div>
               </section>

               <section className={cn("p-10 rounded-[40px] border shadow-2xl space-y-8", theme === 'dark' ? "bg-slate-900/40 border-slate-800/60" : "bg-white border-slate-100 shadow-slate-200/50")}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-500">
                          <Bot size={20} />
                       </div>
                       <h2 className={cn("text-xs font-black uppercase tracking-[0.4em]", theme === "dark" ? "text-slate-500" : "text-slate-700")}>Neural Swarm</h2>
                    </div>
                    <button 
                      onClick={() => setConfig(prev => prev ? { ...prev, 'agents:': [...prev['agents:'], { name: '', role: '' }] } : null)}
                      className={cn("p-2 rounded-xl transition-all", theme === 'dark' ? "hover:bg-slate-800 text-slate-600 hover:text-white" : "hover:bg-slate-50 text-slate-300 hover:text-black")}
                    >
                       <Plus size={18} />
                    </button>
                  </div>

                  <div className="space-y-4">
                     {config?.['agents:'].map((agent, i) => (
                       <div key={i} className="flex gap-4 group">
                          <input 
                            placeholder="Name"
                            value={agent.name}
                            onChange={(e) => {
                               const newAgents = [...config['agents:']];
                               newAgents[i].name = e.target.value;
                               setConfig({ ...config, 'agents:': newAgents });
                            }}
                            className={cn("flex-[2] px-6 py-4 rounded-2xl border outline-none font-bold text-sm", theme === 'dark' ? "bg-black/50 border-slate-800 text-white focus:border-indigo-500/50" : "bg-slate-50 border-slate-100")}
                          />
                          <input 
                            placeholder="Role"
                            value={agent.role}
                            onChange={(e) => {
                               const newAgents = [...config['agents:']];
                               newAgents[i].role = e.target.value;
                               setConfig({ ...config, 'agents:': newAgents });
                            }}
                            className={cn("flex-[3] px-6 py-4 rounded-2xl border outline-none font-bold text-sm", theme === 'dark' ? "bg-black/50 border-slate-800 text-white focus:border-indigo-500/50" : "bg-slate-50 border-slate-100")}
                          />
                          <button 
                            onClick={() => {
                               const newAgents = [...config['agents:']].filter((_, idx) => idx !== i);
                               setConfig({ ...config, 'agents:': newAgents });
                            }}
                            className="p-4 rounded-2xl text-slate-700 hover:bg-rose-500/10 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all shrink-0"
                          >
                            <Trash2 size={18} />
                          </button>
                       </div>
                     ))}
                  </div>
               </section>
            </div>

            {/* AI Providers & Connections */}
            <div className="space-y-12">
               <section className={cn("p-10 rounded-[40px] border shadow-2xl space-y-8", theme === 'dark' ? "bg-slate-900/40 border-slate-800/60" : "bg-white border-slate-100 shadow-slate-200/50")}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-500">
                          <Shield size={20} />
                       </div>
                       <h2 className={cn("text-xs font-black uppercase tracking-[0.4em]", theme === "dark" ? "text-slate-500" : "text-slate-700")}>Gateways</h2>
                    </div>
                    <button 
                      onClick={() => setConfig(prev => prev ? { ...prev, connections: [...prev.connections, { name: '', code: '', apiKey: '' }] } : null)}
                      className={cn("p-2 rounded-xl transition-all", theme === 'dark' ? "hover:bg-slate-800 text-slate-600 hover:text-white" : "hover:bg-slate-50 text-slate-300 hover:text-black")}
                    >
                       <Plus size={18} />
                    </button>
                  </div>

                  <div className="space-y-6">
                     {config?.connections.map((conn, i) => (
                       <div key={i} className={cn("p-6 rounded-3xl border space-y-4 relative group", theme === 'dark' ? "bg-black/40 border-slate-800/50" : "bg-slate-50 border-slate-100 shadow-sm")}>
                          <div className="grid grid-cols-2 gap-4">
                             <input value={conn.name} placeholder="Name" onChange={(e) => {
                               const newC = [...config.connections];
                               newC[i].name = e.target.value;
                               setConfig({ ...config, connections: newC });
                             }} className={cn("px-4 py-2 bg-transparent border-b outline-none font-black text-xs uppercase tracking-widest", theme === 'dark' ? "border-slate-800 text-white" : "border-slate-200 text-slate-900")} />
                             <input value={conn.code} placeholder="Code" onChange={(e) => {
                               const newC = [...config.connections];
                               newC[i].code = e.target.value;
                               setConfig({ ...config, connections: newC });
                             }} className={cn("px-4 py-2 bg-transparent border-b outline-none font-black text-xs uppercase tracking-widest", theme === 'dark' ? "border-slate-800 text-slate-400" : "border-slate-200 text-slate-500")} />
                          </div>
                          <input value={conn.apiKey} placeholder="Neural Secret Key" type="password" onChange={(e) => {
                               const newC = [...config.connections];
                               newC[i].apiKey = e.target.value;
                               setConfig({ ...config, connections: newC });
                             }} className={cn("w-full px-5 py-3 rounded-xl border outline-none font-mono text-xs", theme === 'dark' ? "bg-slate-950 border-slate-800 text-indigo-400" : "bg-white border-slate-200 text-indigo-600")} />
                          <button 
                            onClick={() => {
                               const newC = [...config.connections].filter((_, idx) => idx !== i);
                               setConfig({ ...config, connections: newC });
                            }}
                            className="absolute -top-3 -right-3 p-2 rounded-lg bg-rose-500 text-white opacity-0 group-hover:opacity-100 transition-all shadow-xl hover:scale-110 active:scale-95"
                          >
                            <Trash2 size={14} />
                          </button>
                       </div>
                     ))}
                  </div>
               </section>

               <section className={cn("p-10 rounded-[40px] border shadow-2xl space-y-8", theme === 'dark' ? "bg-slate-900/40 border-slate-800/60" : "bg-white border-slate-100 shadow-slate-200/50")}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-500">
                          <Brain size={20} />
                       </div>
                       <h2 className={cn("text-xs font-black uppercase tracking-[0.4em]", theme === "dark" ? "text-slate-500" : "text-slate-700")}>Intelligence Hub</h2>
                    </div>
                    <button 
                      onClick={() => setConfig(prev => prev ? { ...prev, ai: { providers: [...prev.ai.providers, { name: '', code: '', models: [], apiKey: '' }] } } : null)}
                      className={cn("p-2 rounded-xl transition-all", theme === 'dark' ? "hover:bg-slate-800 text-slate-600 hover:text-white" : "hover:bg-slate-50 text-slate-300 hover:text-black")}
                    >
                       <Plus size={18} />
                    </button>
                  </div>

                  <div className="space-y-6">
                     {config?.ai.providers.map((provider, i) => (
                       <div key={i} className={cn("p-8 rounded-[32px] border space-y-6 relative group transition-all", theme === 'dark' ? "bg-black/20 border-slate-800/80 hover:bg-black/30" : "bg-slate-50/50 border-slate-100")}>
                          <div className="flex justify-between items-center bg-black/40 p-4 rounded-2xl mb-4 border border-white/5">
                             <div className="flex gap-4 items-center">
                                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 italic ml-2">Provider_{i+1}</span>
                                <input value={provider.name} onChange={(ev) => {
                                  const newP = [...config.ai.providers];
                                  newP[i].name = ev.target.value;
                                  setConfig({ ...config, ai: { providers: newP } });
                                }} className="bg-transparent border-none outline-none text-sm font-black text-white hover:text-indigo-400 focus:text-indigo-500 transition-colors" />
                             </div>
                             <button 
                                onClick={() => {
                                   const newP = [...config.ai.providers].filter((_, idx) => idx !== i);
                                   setConfig({ ...config, ai: { providers: newP } });
                                }}
                                className="text-slate-600 hover:text-rose-500"
                             >
                               <Trash2 size={16} />
                             </button>
                          </div>

                          <div className="grid grid-cols-1 gap-6">
                             <div className="space-y-2">
                               <label className="text-[9px] font-black uppercase tracking-widest text-slate-600 ml-1">Key Authorization</label>
                               <input value={provider.apiKey} type="password" onChange={(ev) => {
                                   const newP = [...config.ai.providers];
                                   newP[i].apiKey = ev.target.value;
                                   setConfig({ ...config, ai: { providers: newP } });
                               }} className={cn("w-full px-5 py-3 rounded-xl border outline-none font-mono text-xs", theme === 'dark' ? "bg-slate-950 border-slate-800 text-indigo-500" : "bg-white border-slate-200 text-indigo-600")} />
                             </div>
                             
                             <div className="space-y-2">
                               <label className="text-[9px] font-black uppercase tracking-widest text-slate-600 ml-1">Neural Models [CSV]</label>
                               <input 
                                 value={provider.models.join(', ')} 
                                 onChange={(ev) => {
                                   const newP = [...config.ai.providers];
                                   newP[i].models = ev.target.value.split(',').map(s => s.trim()).filter(s => s !== '');
                                   setConfig({ ...config, ai: { providers: newP } });
                                 }} 
                                 className={cn("w-full px-5 py-3 rounded-xl border outline-none font-bold text-xs", theme === 'dark' ? "bg-slate-950 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-600")} 
                               />
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>
               </section>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="json"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className={cn(
              "p-8 rounded-[48px] border shadow-2xl overflow-hidden relative",
              theme === 'dark' ? "bg-slate-900/60 border-slate-800 shadow-black/60" : "bg-white border-slate-100 shadow-slate-200/60"
            )}
          >
            <textarea 
              value={jsonInput}
              onChange={handleJsonChange}
              spellCheck={false}
              className={cn(
                "w-full h-[600px] bg-transparent outline-none font-mono text-sm leading-relaxed resize-none",
                theme === 'dark' ? "text-indigo-400" : "text-indigo-600"
              )}
            />
            {jsonError && (
              <div className="absolute bottom-10 left-10 right-10 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                <AlertCircle size={14} />
                Neural Syntax Error: {jsonError}
              </div>
            )}
            {/* Syntax Highlighting Decorator (Simulated) */}
            <div className="absolute top-8 right-8 pointer-events-none">
               <div className="px-4 py-2 rounded-full bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest border border-white/5 opacity-50">UTF-8 Neural Matrix</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
