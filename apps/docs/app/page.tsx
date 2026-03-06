import { Terminal, Lightbulb, BookOpen, Layers, Zap, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* Decorative Hero Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 -right-24 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <div className="relative space-y-6 pt-8 pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[10px] font-black uppercase tracking-widest mb-2 animate-pulse">
           <Sparkles size={12} /> Version v0.1.0 Live
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-br from-slate-900 via-indigo-900 to-emerald-900 dark:from-white dark:via-indigo-200 dark:to-emerald-200 text-transparent bg-clip-text leading-[1.1]">
          Launch Your Next<br />
          <span className="italic">Neural Swarm</span>
        </h1>
        <p className="text-lg dark:text-slate-400 text-slate-600 max-w-xl leading-relaxed font-medium">
          The ultimate decentralized workflow manager and neural AI swarm architecture. Learn how to launch, configure, and scale your autonomous agents.
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
           <Link href="/installation" className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-indigo-600/20 transition-all active:scale-95 flex items-center gap-2">
              Get Started <ArrowRight size={14} />
           </Link>
           <Link href="/cli" className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl shadow-black/10 transition-all active:scale-95 flex items-center gap-2 border border-slate-700">
              CLI Reference
           </Link>
        </div>
      </div>

      {/* Quick Start Panel */}
      <div className="relative group max-w-3xl overflow-hidden rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950 shadow-2xl backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 relative z-10">
           <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                 <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-xl">
                   <Terminal size={18} />
                 </div>
                 <h2 className="text-xl font-black tracking-tight uppercase">Quick Deploy</h2>
              </div>
              <p className="text-sm dark:text-slate-400 text-slate-500 font-medium">
                Initialize your agent architecture with a single command.
              </p>
           </div>
           
           <div className="w-full md:w-auto">
             <div className="relative flex items-center justify-between pl-5 pr-3 py-4 bg-slate-900 dark:bg-black rounded-2xl border border-slate-800 shadow-inner group/code min-w-[280px]">
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                <code className="font-mono text-sm text-indigo-400">
                  <span className="text-slate-600 select-none mr-3">$</span>
                  npx clawesome
                </code>
                <button className="p-2.5 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white rounded-xl transition-all active:scale-90">
                  <Zap size={14} />
                </button>
             </div>
           </div>
        </div>
      </div>

      {/* Feature Grid - Tighter Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
        {[
          { icon: <BookOpen size={20} />, title: 'Core Concepts', color: 'blue', desc: 'Architecture of neural swarms and agent communication protocols.', link: '/architecture' },
          { icon: <Layers size={20} />, title: 'UI Library', color: 'indigo', desc: 'Shared @clawesome/ui components for building consistent dashboards.', link: '/components' },
          { icon: <Terminal size={20} />, title: 'CLI Engine', color: 'emerald', desc: 'Manage your entire monorepo with the powerful clawesome CLI.', link: '/cli' },
          { icon: <ShieldCheck size={20} />, title: 'Permissions', color: 'rose', desc: 'Configuring secure MCP tool access and agent authorizations.', link: '/resources' }
        ].map(card => (
          <Link 
            href={card.link} 
            key={card.title} 
            className="group relative p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-6">
               <div className={`p-4 rounded-2xl bg-white dark:bg-slate-950 shadow-inner border border-slate-100 dark:border-slate-800 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 text-${card.color}-500`}>
                 {card.icon}
               </div>
               <div className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                  <ArrowRight size={18} className="text-slate-400" />
               </div>
            </div>
            <h3 className="text-lg font-black tracking-tight mb-2 uppercase group-hover:text-indigo-500 transition-colors">
              {card.title}
            </h3>
            <p className="text-sm dark:text-slate-400 text-slate-600 leading-relaxed font-medium">
              {card.desc}
            </p>
            
            {/* Hover Accent Glow */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-500/10 rounded-[32px] pointer-events-none transition-all duration-500" />
          </Link>
        ))}
      </div>
    </div>
  );
}
