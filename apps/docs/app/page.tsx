import { Terminal, Lightbulb, BookOpen, Layers } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-24 animate-in fade-in duration-700">
      <div className="space-y-8">
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 text-transparent bg-clip-text">
          <span style={{ fontFamily: "'Newton Howard Font', sans-serif", fontStyle: 'italic' }}>Clawesome</span>
          <span className="text">&nbsp;Documentation</span>
        </h1>
        <p className="text-xl dark:text-slate-400 text-slate-600 max-w-2xl leading-relaxed font-medium">
          The ultimate decentralized workflow manager and neural AI swarm architecture. Learn how to launch, configure, and scale your autonomous agents.
        </p>
      </div>

      <div className="p-8 md:p-12 rounded-[40px] border transition-all glass-panel border-slate-200/50 bg-slate-50/20 dark:border-slate-800 dark:bg-slate-900/30">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl">
            <Terminal size={24} />
          </div>
          <h2 className="text-2xl font-black tracking-tight">Quick Start</h2>
        </div>
        <p className="dark:text-slate-400 text-slate-600 mb-8 max-w-xl font-medium">
          Get up and running with Clawesome in seconds. Initialize a new project and fire up your first AI swarm.
        </p>
        
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-2xl blur-xl opacity-10 group-hover:opacity-30 transition-opacity duration-500" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl gap-4">
            <code className="font-mono text-sm md:text-base text-emerald-400">
              <span className="text-slate-600 select-none mr-4">$</span>
              npx clawesome
            </code>
            <button className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-colors active:scale-95 shrink-0">
              Copy
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {[
          { icon: <BookOpen className="text-blue-500" />, title: 'Core Concepts', desc: 'Understand the architecture of neural swarms and how agents communicate.', link: '/architecture' },
          { icon: <Layers className="text-amber-500" />, title: 'UI Components', desc: 'Browse the shared @clawesome/ui component library for your dashboards.', link: '/components' },
          { icon: <Terminal className="text-emerald-500" />, title: 'CLI Reference', desc: 'Master the clawesome CLI to manage your entire monorepo.', link: '/cli' },
          { icon: <Lightbulb className="text-purple-500" />, title: 'Resources', desc: 'Explore helpful guides, integrations, and the MCP ecosystem.', link: '/resources' }
        ].map(card => (
          <Link href={card.link} key={card.title} className="group p-10 rounded-[40px] border transition-all glass-panel border-slate-200/50 bg-slate-50/10 dark:border-slate-800 dark:bg-slate-900/20 hover:dark:bg-slate-900/60 hover:dark:border-indigo-500/30 hover:bg-white/80 hover:border-indigo-500/20 hover:shadow-2xl hover:-translate-y-1">
            <div className="mb-8 p-5 rounded-3xl bg-white dark:bg-slate-950 w-fit group-hover:scale-110 transition-transform shadow-inner border border-slate-100 dark:border-slate-800">
              {card.icon}
            </div>
            <h3 className="text-2xl font-black tracking-tight mb-4 group-hover:text-indigo-500 transition-colors uppercase">{card.title}</h3>
            <p className="dark:text-slate-400 text-slate-600 leading-relaxed font-medium">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
