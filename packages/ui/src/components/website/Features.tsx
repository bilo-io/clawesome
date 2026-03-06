'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  BrainCircuit, 
  ShieldCheck, 
  LayoutDashboard, 
  MessageSquare, 
  Settings,
  Zap,
  Cpu,
  Globe
} from 'lucide-react';
import { cn } from '../../utils';

export const Features = () => {
  const features = [
    {
      icon: Bot,
      title: 'Autonomous Browsers',
      description: 'Agents that browse the web just like you, navigating complex UIs and extracting actionable data.',
      color: 'bg-[#8C00FF]',
    },
    {
      icon: BrainCircuit,
      title: 'Swarm Intelligence',
      description: 'Orchestrate hundreds of agents to work in parallel, solving massive tasks in seconds.',
      color: 'bg-purple-500',
    },
    {
      icon: ShieldCheck,
      title: 'Governance & Safety',
      description: 'Define strict boundaries, budget limits, and human-in-the-loop approvals for every action.',
      color: 'bg-emerald-500',
    },
    {
      icon: LayoutDashboard,
      title: 'Visual Dashboard',
      description: 'Real-time monitoring of your swarms, costs, and output quality in a unified interface.',
      color: 'bg-indigo-600',
    },
    {
      icon: MessageSquare,
      title: 'Natural Language Ops',
      description: 'Control your entire automation stack using plain English—no code required.',
      color: 'bg-pink-500',
    },
    {
      icon: Settings,
      title: 'Deep Integrations',
      description: 'Connect to your existing tools via 100+ native integrations and a robust REST API.',
      color: 'bg-amber-500',
    },
  ];

  return (
    <section id="features" className="py-24 px-8 bg-slate-50/50 dark:bg-slate-950 transition-colors flex flex-col items-center">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="flex flex-col mb-20">
          <span className="text-xs font-black uppercase tracking-[0.4em] text-[#8C00FF] mb-4">
            Core capabilities
          </span>
          <h2 
            className="text-4xl md:text-5xl font-black md:max-w-2xl mb-4 text-slate-900 dark:text-white leading-[1.3] overflow-visible px-12"
            style={{ fontFamily: "'Newton Howard Font', sans-serif" }}
          >
            <span className="not-italic">All you need to</span> <span className="gradient-text">scale your ops</span>
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-400 max-w-xl font-medium">
            clawesome provides the infrastructure to build, deploy, and manage production-grade AI agent networks.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group p-8 glass-panel card-glow rounded-full hover:border-[#8C00FF]/50 hover:bg-white dark:hover:bg-slate-900/50 transition-all flex flex-col gap-6 shadow-sm hover:shadow-xl shadow-slate-200/50 dark:shadow-none"
            >
              <div className={cn("w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl shadow-indigo-500/10 transition-transform group-hover:scale-110 group-hover:rotate-3", feature.color)}>
                <feature.icon size={28} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-400 font-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visual Showcase (The 6th Section part) */}
        <div className="mt-24 p-12 glass-panel card-glow rounded-2xl border-[#8C00FF]/10 dark:border-[#8C00FF]/20 bg-white/80 dark:bg-[#8C00FF]/5 flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative shadow-2xl shadow-slate-200/60 dark:shadow-none">
           {/* Background Grid */}
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
           
           <div className="flex-1 z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#8C00FF]/10 rounded-full">
                  <Cpu size={24} className="text-[#8C00FF]" />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.3em] text-[#8C00FF]">
                  Performance metrics
                </span>
              </div>
              <h3 
                className="text-3xl md:text-4xl font-black mb-6 text-slate-900 dark:text-white leading-[1.3] overflow-visible px-12"
                style={{ fontFamily: "'Newton Howard Font', sans-serif" }}
              >
                <span className="not-italic">Near-instant automation</span> <span className="gradient-text">at the edge</span>
              </h3>
              <p className="text-slate-700 dark:text-slate-400 font-medium text-lg leading-relaxed mb-8">
                Run swarms on our distributed GPU network. Achieve sub-second response times for complex web navigations and reasoning tasks.
              </p>
              <div className="flex flex-col gap-4">
                 {[
                   { label: 'Uptime', value: '99.99%' },
                   { label: 'Latency', value: '142ms' },
                   { label: 'Agent Throughput', value: '50k+ Ops/sec' }
                 ].map((stat, i) => (
                   <div key={i} className="flex items-center justify-between py-3 border-b border-[#8C00FF]/10 last:border-0">
                      <span className="text-slate-500 dark:text-slate-600 font-bold uppercase text-[10px] tracking-widest">{stat.label}</span>
                      <span className="text-[#8C00FF] font-black text-xl font-mono">{stat.value}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="flex-1 w-full flex items-center justify-center z-10 relative">
              <div className="w-full aspect-square max-w-[400px] border border-[#8C00FF]/20 dark:border-indigo-500/30 rounded-full flex items-center justify-center p-8 animate-spin-slow">
                 <div className="w-full aspect-square border border-purple-500/10 dark:border-purple-500/20 rounded-full flex items-center justify-center p-8 animate-reverse-spin-slow">
                    <Globe size={120} className="text-[#8C00FF]/30 dark:text-[#8C00FF]/40" />
                 </div>
              </div>
              {/* Floating Icons */}
              <div className="absolute top-10 left-10 p-4 glass-panel rounded-full shadow-xl animate-bounce-slow bg-white dark:bg-slate-900/80">
                <Zap className="text-amber-500" />
              </div>
              <div className="absolute bottom-20 right-0 p-4 glass-panel rounded-2xl shadow-xl animate-bounce-slow delay-700 bg-white dark:bg-slate-900/80">
                <BrainCircuit className="text-[#8C00FF]" />
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
