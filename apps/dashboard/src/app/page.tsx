'use client';

import { useSocket } from '@/hooks/useSocket';
import { CodeBlock } from '@/components/CodeBlock';
import { SlideToConfirm } from '@/components/SlideToConfirm';
import { ContextAccordion } from '@/components/ContextAccordion';
import { SystemVitality } from '@/components/SystemVitality';
import { ProjectPulse } from '@/components/ProjectPulse';
import { ActivityHeatmap } from '@/components/ActivityHeatmap';
import { QuickActions } from '@/components/QuickActions';
import { CostTracker } from '@/components/CostTracker';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';
import { useUIStore } from '@/store/useUIStore';
import { 
  LayoutDashboard, 
  Server, 
  Activity, 
  Zap, 
  Target, 
  DollarSign, 
  Code2,
  ShieldCheck,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { isConnected, lastMessage } = useSocket();
  const { theme } = useUIStore();

  return (
    <main className="space-y-6 pb-20 max-w-[1600px] mx-auto transition-colors duration-300">
      <DashboardResourceHeader
        title="Dashboard"
        description="Unified neural command center providing real-time telemetry on resource allocation, agent activity, and system integrity."
        badge="NC-01"
        statusLabel="Operational Status:"
        statusValue="Optimal"
        statusColor="emerald"
        isCollection={false}
        renderRight={
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className={cn(
                "px-5 py-2.5 rounded-full border shadow-xl flex flex-col items-end min-w-[150px] transition-all relative overflow-hidden",
                theme === "dark" ? "bg-slate-900/40 border-slate-800/60" : "bg-white border-slate-100 shadow-slate-200/50"
              )}
            >
              <span className={cn("text-[8px] font-black uppercase tracking-[0.2em] mb-1 relative z-10", theme === "dark" ? "text-slate-600" : "text-slate-500")}>Interface Latency</span>
              <span className="text-xl font-mono font-black text-indigo-600 tracking-tighter relative z-10">12ms</span>
              <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-indigo-500/5 blur-2xl rounded-full" />
            </motion.div>
          </div>
        }
      />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
        {/* Left/Middle: Core System Feedback */}
        <div className="xl:col-span-3 space-y-16">
           <section className="space-y-10">
              <div className="flex items-center gap-4">
                 <div className="p-2.5 rounded-full bg-amber-500/10 border border-amber-500/20 shadow-sm">
                    <Zap size={22} className="text-amber-500" />
                 </div>
                 <h2 className={cn("text-[11px] font-black uppercase tracking-[0.4em]", theme === "dark" ? "text-slate-500" : "text-slate-700")}>System Vitality Matrix</h2>
              </div>
              <SystemVitality />
           </section>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <section className="space-y-10 flex flex-col">
                <div className="flex items-center gap-4">
                   <div className="p-2.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 shadow-sm">
                      <Target size={22} className="text-indigo-600" />
                   </div>
                   <h2 className={cn("text-[11px] font-black uppercase tracking-[0.4em]", theme === "dark" ? "text-slate-500" : "text-slate-700")}>Project Pulse</h2>
                </div>
                <div className="flex-1">
                   <ProjectPulse />
                </div>
              </section>
              <section className="space-y-10 flex flex-col">
                 <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-sm">
                       <Activity size={22} className="text-emerald-500" />
                    </div>
                    <h2 className={cn("text-[11px] font-black uppercase tracking-[0.4em]", theme === "dark" ? "text-slate-500" : "text-slate-700")}>Neural Connectivity</h2>
                 </div>
                 <div className="flex-1">
                    <ActivityHeatmap />
                 </div>
              </section>
           </div>

           {/* Quick Action Hub */}
           <section className="space-y-10 pt-16 border-t border-slate-500/5">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 shadow-sm">
                   <LayoutDashboard size={22} className="text-indigo-600" />
                </div>
                <h2 className={cn("text-[11px] font-black uppercase tracking-[0.4em]", theme === "dark" ? "text-slate-500" : "text-slate-700")}>Deployment Workflows</h2>
              </div>
              <QuickActions />
           </section>
        </div>

        {/* Right Column: Economics & Security Control */}
        <div className="space-y-16">
           <section className="space-y-10">
              <div className="flex items-center gap-4">
                 <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 shadow-sm">
                    <DollarSign size={22} className="text-emerald-500" />
                 </div>
                  <h2 className={cn("text-[11px] font-black uppercase tracking-[0.4em]", theme === "dark" ? "text-slate-500" : "text-slate-700")}>Session Economics</h2>
              </div>
              <CostTracker />
           </section>

           <section className={cn(
              "p-10 rounded-[48px] border transition-all relative overflow-hidden group shadow-2xl flex flex-col",
              theme === "dark" ? "bg-slate-900/40 border-slate-800/60 shadow-none hover:bg-slate-900/60" : "bg-white border-slate-100 shadow-slate-200/40 hover:border-indigo-100"
           )}>
              <div className="relative z-10 flex flex-col h-full min-h-[400px]">
                <div className="flex items-center justify-between mb-12">
                   <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-600 border border-indigo-500/20">
                        <ShieldCheck size={24} />
                      </div>
                      <h3 className={cn("text-[11px] font-black uppercase tracking-[0.3em]", theme === "dark" ? "text-slate-400" : "text-slate-600")}>
                        Security Gate
                      </h3>
                   </div>
                   <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
                </div>
                
                <div className="flex-1 flex flex-col gap-10">
                  <div className={cn(
                    "p-8 rounded-[32px] border leading-relaxed shadow-inner relative overflow-hidden",
                    theme === "dark" ? "bg-rose-500/10 border-rose-500/20" : "bg-rose-50/50 border-rose-100 shadow-rose-950/5"
                  )}>
                    <div className="flex items-center gap-3 mb-4 text-rose-500">
                      <ShieldAlert size={18} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Protocol Guard</span>
                    </div>
                    <p className={cn("text-[10px] font-bold italic uppercase tracking-[0.15em] leading-loose", theme === "dark" ? "text-rose-400" : "text-rose-600")}>
                      CRITICAL: Terminating active neural sessions will invalidate the global gateway cache across all synchronized nodes.
                    </p>
                  </div>
                  <div className="mt-auto">
                    <SlideToConfirm 
                      label="PURGE GLOBAL CACHE" 
                      onConfirm={() => console.log('Purged')} 
                    />
                  </div>
                </div>
              </div>
              {/* Decorative Background Glow */}
              <div className={cn(
                "absolute -bottom-20 -right-20 w-80 h-80 blur-[120px] rounded-full transition-opacity duration-700",
                theme === "dark" ? "bg-indigo-500/10 opacity-60" : "bg-indigo-500/5 opacity-40 group-hover:opacity-70"
              )} />
           </section>
        </div>
      </div>

      {/* Tertiary Analysis Row */}
      <section className={cn(
        "grid grid-cols-1 lg:grid-cols-3 gap-12 pt-16 border-t",
        theme === "dark" ? "border-slate-800/50" : "border-slate-200"
      )}>
         <div className="flex flex-col h-full">
            <ContextAccordion title="Active Neural Nodes" icon={<Server size={20} />}>
               <div className="space-y-6 pt-4">
                  {[
                    { name: 'prod-worker-ams', status: 'STABLE', color: 'emerald' },
                    { name: 'staging-gw-04', status: 'LATENCY', color: 'amber' },
                    { name: 'edge-node-alpha', status: 'DORMANT', color: 'slate' }
                  ].map((node) => (
                    <div key={node.name} className={cn(
                      "flex justify-between items-center p-6 border rounded-[28px] transition-all shadow-xl group",
                      theme === "dark" 
                        ? "bg-slate-950/50 border-slate-900 hover:bg-slate-950 hover:border-indigo-500/30 shadow-none" 
                        : "bg-white border-slate-100 hover:border-indigo-200 shadow-slate-200/40 hover:shadow-2xl"
                    )}>
                       <div className="flex items-center gap-4">
                          <div className={cn("w-2 h-2 rounded-full", node.color === 'emerald' ? 'bg-emerald-500' : node.color === 'amber' ? 'bg-amber-500' : 'bg-slate-500')} />
                          <span className={cn("font-mono text-[11px] font-black uppercase tracking-tight", theme === "dark" ? "text-slate-400" : "text-slate-950")}>
                            {node.name}
                          </span>
                       </div>
                       <span className={cn(
                         "font-black px-5 py-2 rounded-full text-[9px] border shadow-sm tracking-widest transition-all",
                         node.color === 'emerald' ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/30" :
                         node.color === 'amber' ? "text-amber-500 bg-amber-500/10 border-amber-500/30" :
                         "text-slate-500 bg-slate-500/10 border-slate-500/30"
                       )}>{node.status}</span>
                    </div>
                  ))}
               </div>
            </ContextAccordion>
         </div>
         
         <div className="lg:col-span-2">
            <ContextAccordion title="Live Telemetry Trace" icon={<Code2 size={20} />}>
               <div className="pt-4 space-y-10">
                 <div className="shadow-2xl rounded-[32px] overflow-hidden border border-slate-800/10">
                    <CodeBlock 
                      code={`# Monitoring event stream...\nnpx clawesome-monitor --port 17871\ngrep -E "(ERROR|WARNING)" ./logs/trace.log`} 
                      language="shell"
                    />
                 </div>
                 <div className={cn(
                   "p-10 rounded-[40px] border overflow-x-auto text-[12px] font-mono shadow-inner transition-all relative overflow-hidden",
                   theme === "dark" 
                    ? "bg-slate-950/80 border-slate-900 text-indigo-300" 
                    : "bg-slate-50 border-slate-100 text-indigo-700 font-bold"
                 )}>
                   {lastMessage 
                    ? <pre className="relative z-10">{JSON.stringify(lastMessage, null, 2)}</pre>
                    : <div className="flex flex-col items-center gap-6 py-16 text-slate-400 font-black uppercase tracking-[0.25em] italic relative z-10">
                        <div className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-indigo-500 animate-spin" />
                        Awaiting neural telemetry stream...
                      </div>
                   }
                   <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Activity size={120} />
                   </div>
                 </div>
               </div>
            </ContextAccordion>
         </div>
      </section>
    </main>
  );
}
