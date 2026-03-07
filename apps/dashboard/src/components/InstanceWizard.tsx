// apps/dashboard/src/components/InstanceWizard.tsx
'use client';

import React, { useState } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { useInstanceStore, InstanceType } from '@/store/useInstanceStore';
import { useProviderStore, BUILTIN_PROVIDERS } from '@/store/useProviderStore';
import { useAgentStore } from '@/store/useAgentStore';
import { 
  X, 
  Monitor, 
  Server, 
  Database, 
  Cloud, 
  Cpu, 
  ChevronRight, 
  ChevronLeft,
  Check,
  Zap,
  HardDrive,
  Microchip,
  Activity,
  Bot
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  { id: 'type', title: 'Instance Type', description: 'Choose your neural gateway' },
  { id: 'config', title: 'Configuration', description: 'Allocate system resources' },
  { id: 'orchestrator', title: 'AI Orchestrator', description: 'Select your primary agent' },
  { id: 'review', title: 'Review', description: 'Finalize initialization' }
];

const INSTANCE_TYPES = [
  { id: 'local', title: 'Local', icon: <Monitor size={24} />, description: 'Run directly on your hardware', disabled: true },
  { id: 'server', title: 'Server', icon: <Server size={24} />, description: 'Connect to an external VPS/Node' },
  { id: 'docker', title: 'Docker', icon: <Database size={24} />, description: 'Isolated containerized environment' },
  { id: 'clawesome', title: 'Clawesome', icon: <Zap size={24} />, description: 'Official managed cloud instance' },
  { id: 'cloud', title: 'Cloud', icon: <Cloud size={24} />, description: 'AWS, GCP or Azure deployment' }
];

export const InstanceWizard = () => {
  const { isInstanceWizardOpen, setInstanceWizardOpen, theme } = useUIStore();
  const { addInstance } = useInstanceStore();
  const { providers } = useProviderStore();
  const { agents } = useAgentStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    type: 'server' as InstanceType,
    storage: '128GB',
    ram: '8GB',
    cpu: '4 Core',
    providerId: BUILTIN_PROVIDERS[0].id,
    modelId: BUILTIN_PROVIDERS[0].models[0].id,
    agentId: agents[0]?.id || 'core-1',
    agentName: agents[0]?.name || 'Clawesome Prime'
  });

  if (!isInstanceWizardOpen) return null;

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleClose = () => {
    setInstanceWizardOpen(false);
    setCurrentStep(0);
  };

  const handleComplete = () => {
    addInstance({
      name: formData.name || `${formData.type.toUpperCase()} Node`,
      type: formData.type,
      config: {
        storage: formData.storage,
        ram: formData.ram,
        cpu: formData.cpu,
        providerId: formData.providerId,
        modelId: formData.modelId
      },
      orchestrator: {
        agentId: formData.agentId,
        agentName: formData.agentName
      }
    });
    handleClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 overflow-hidden"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-2xl" 
        onClick={handleClose}
      />

      {/* Wizard Card */}
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className={cn(
          "relative w-full max-w-5xl h-[800px] flex flex-col md:flex-row overflow-hidden rounded-[40px] border shadow-2xl",
          theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
        )}
      >
        {/* Sidebar */}
        <div className={cn(
          "w-full md:w-80 p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r",
          theme === 'dark' ? "bg-black/20 border-slate-800" : "bg-slate-50 border-slate-100"
        )}>
          <div className="space-y-12">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mb-6 shadow-xl shadow-indigo-500/20">
                <Cpu size={28} />
              </div>
              <h2 className="text-2xl font-black tracking-tight leading-tight">Initialize<br/>Neural Instance</h2>
            </div>

            <div className="space-y-6">
              {STEPS.map((step, idx) => (
                <div key={step.id} className="flex items-center gap-4 group">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black transition-all",
                    currentStep === idx 
                      ? "bg-indigo-600 text-white scale-110 shadow-lg" 
                      : (currentStep > idx ? "bg-emerald-500 text-white" : (theme === 'dark' ? "bg-slate-800 text-slate-500" : "bg-white text-slate-400 border border-slate-200"))
                  )}>
                    {currentStep > idx ? <Check size={14} /> : idx + 1}
                  </div>
                  <div>
                    <span className={cn(
                      "block text-[11px] font-black uppercase tracking-[0.2em] transition-colors",
                      currentStep === idx ? "text-indigo-500" : (theme === 'dark' ? "text-slate-600" : "text-slate-400")
                    )}>{step.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={handleClose}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-rose-500 transition-colors"
          >
            <X size={16} /> Cancel Configuration
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 p-12 overflow-y-auto no-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div>
                  <h3 className="text-3xl font-black tracking-tighter">{STEPS[currentStep].title}</h3>
                  <p className="text-slate-500 mt-2 font-medium">{STEPS[currentStep].description}</p>
                </div>

                {/* Step Content */}
                {currentStep === 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {INSTANCE_TYPES.map((type) => (
                      <button
                        key={type.id}
                        disabled={type.disabled}
                        onClick={() => setFormData({ ...formData, type: type.id as InstanceType })}
                        className={cn(
                          "p-6 rounded-[2rem] border-2 transition-all flex flex-col gap-4 text-left group relative backdrop-blur-sm overflow-hidden",
                          formData.type === type.id 
                            ? "border-indigo-500 bg-indigo-500/5" 
                            : (type.disabled ? "opacity-40 cursor-not-allowed grayscale border-transparent bg-slate-100 dark:bg-slate-800/50" : (theme === 'dark' ? "border-slate-800 hover:border-slate-700 bg-slate-900/50" : "border-slate-100 hover:border-slate-200 bg-slate-50/50"))
                        )}
                      >
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                          formData.type === type.id ? "bg-indigo-600 text-white shadow-lg" : (theme === 'dark' ? "bg-slate-800 text-slate-400 group-hover:text-slate-200" : "bg-white text-slate-400 group-hover:text-slate-600")
                        )}>
                          {type.icon}
                        </div>
                        <div>
                          <span className="block font-black text-lg">{type.title}</span>
                          <span className="block text-xs text-slate-500 mt-1">{type.description}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="grid grid-cols-1 gap-8 max-w-lg">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Instance Name</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Production Cluster X"
                        className={cn(
                          "w-full px-6 py-4 rounded-2xl border transition-all focus:outline-none focus:ring-4 focus:ring-indigo-500/10 font-bold",
                          theme === 'dark' ? "bg-slate-800 border-slate-700 text-white focus:border-indigo-500/50" : "bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500"
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                       <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2"><HardDrive size={12}/> Storage</label>
                        <select 
                          value={formData.storage}
                          onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                          className={cn(
                            "w-full px-4 py-3 rounded-xl border font-bold text-sm",
                            theme === 'dark' ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200"
                          )}
                        >
                          <option>64GB</option><option>128GB</option><option>256GB</option><option>512GB</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2"><Microchip size={12}/> RAM</label>
                        <select 
                          value={formData.ram}
                          onChange={(e) => setFormData({ ...formData, ram: e.target.value })}
                          className={cn(
                            "w-full px-4 py-3 rounded-xl border font-bold text-sm",
                            theme === 'dark' ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200"
                          )}
                        >
                          <option>4GB</option><option>8GB</option><option>16GB</option><option>32GB</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2"><Activity size={12}/> CPU</label>
                        <select 
                          value={formData.cpu}
                          onChange={(e) => setFormData({ ...formData, cpu: e.target.value })}
                          className={cn(
                            "w-full px-4 py-3 rounded-xl border font-bold text-sm",
                            theme === 'dark' ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200"
                          )}
                        >
                          <option>2 Core</option><option>4 Core</option><option>8 Core</option><option>12 Core</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-6 pt-4 border-t border-slate-800/10 dark:border-slate-800">
                      <div className="space-y-3 text-slate-400 italic text-xs font-medium">
                        Model orchestration will be handled via the selected provider.
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <select 
                          value={formData.providerId}
                          onChange={(e) => setFormData({ ...formData, providerId: e.target.value })}
                          className={cn(
                            "px-4 py-3 rounded-xl border font-bold text-sm",
                            theme === 'dark' ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200"
                          )}
                        >
                          {BUILTIN_PROVIDERS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                        <select 
                           value={formData.modelId}
                           onChange={(e) => setFormData({ ...formData, modelId: e.target.value })}
                          className={cn(
                            "px-4 py-3 rounded-xl border font-bold text-sm",
                            theme === 'dark' ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200"
                          )}
                        >
                          {BUILTIN_PROVIDERS.find(p => p.id === formData.providerId)?.models.map(m => (
                            <option key={m.id} value={m.id}>{m.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {agents.length > 0 ? agents.map((agent) => (
                      <button
                        key={agent.id}
                        onClick={() => setFormData({ ...formData, agentId: agent.id, agentName: agent.name })}
                        className={cn(
                          "p-6 rounded-3xl border transition-all text-left flex items-center gap-4",
                          formData.agentId === agent.id 
                            ? "border-indigo-500 bg-indigo-500/5 ring-1 ring-indigo-500" 
                            : (theme === 'dark' ? "border-slate-800 hover:border-slate-700 bg-slate-900/50" : "border-slate-100 hover:border-slate-200 bg-slate-50/50")
                        )}
                      >
                         <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-800 bg-slate-900">
                            {agent.profilePicture ? <img src={agent.profilePicture} alt="" className="w-full h-full object-cover" /> : <Bot size={24} className="m-auto mt-3 text-slate-700" />}
                         </div>
                         <div>
                           <span className="block font-bold text-sm">{agent.name}</span>
                           <span className="block text-[10px] uppercase font-black tracking-widest text-indigo-500 mt-0.5">{agent.title}</span>
                         </div>
                      </button>
                    )) : (
                      <div className="p-8 rounded-3xl border-2 border-dashed border-slate-800 col-span-2 text-center text-slate-500 italic">
                        No agents deployed yet. Use Clawesome Prime by default.
                      </div>
                    )}
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-8">
                     <div className={cn(
                       "p-10 rounded-[2.5rem] border shadow-2xl relative overflow-hidden",
                       theme === 'dark' ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-100"
                     )}>
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                          <Zap size={120} />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-12 relative z-10">
                          <div className="space-y-6">
                            <div>
                               <label className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 block mb-2">Instance Identity</label>
                               <p className="text-2xl font-black">{formData.name || 'System Auto-Label'}</p>
                               <p className="text-slate-500 font-medium text-sm mt-1">{formData.type.toUpperCase()} Node Environment</p>
                            </div>
                            <div className="grid grid-cols-3 gap-6">
                               <div><p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Storage</p><p className="font-bold text-sm">{formData.storage}</p></div>
                               <div><p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Memory</p><p className="font-bold text-sm">{formData.ram}</p></div>
                               <div><p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Processor</p><p className="font-bold text-sm">{formData.cpu}</p></div>
                            </div>
                          </div>

                          <div className="space-y-6">
                             <div>
                               <label className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 block mb-2">Orchestrator</label>
                               <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white"><Bot size={18}/></div>
                                  <p className="text-lg font-black">{formData.agentName}</p>
                               </div>
                            </div>
                            <div>
                               <label className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 block mb-2">Core Model</label>
                               <p className="font-bold text-sm">{formData.providerId.toUpperCase()} / {formData.modelId}</p>
                            </div>
                          </div>
                        </div>
                     </div>
                     <p className="text-center text-xs text-slate-500 font-medium">By initializing, you confirm cloud resource allocation for this agent swarm.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Navigation */}
          <div className={cn(
            "p-10 border-t flex justify-between items-center",
            theme === 'dark' ? "border-slate-800" : "border-slate-100"
          )}>
            <button 
              disabled={currentStep === 0}
              onClick={handleBack}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all",
                currentStep === 0 ? "opacity-0 pointer-events-none" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              )}
            >
              <ChevronLeft size={16} /> Back
            </button>

            {currentStep === STEPS.length - 1 ? (
              <button 
                onClick={handleComplete}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-indigo-500/30 flex items-center gap-3 active:scale-95 transition-all"
              >
                Initialize Instance <Check size={18} />
              </button>
            ) : (
              <button 
                onClick={handleNext}
                disabled={currentStep === 1 && !formData.name}
                className={cn(
                  "bg-white dark:bg-slate-800 px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] border border-slate-200 dark:border-slate-700 shadow-xl flex items-center gap-3 active:scale-95 transition-all",
                  currentStep === 1 && !formData.name ? "opacity-50 grayscale cursor-not-allowed" : "hover:border-indigo-500 hover:text-indigo-500"
                )}
              >
                Continue <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
