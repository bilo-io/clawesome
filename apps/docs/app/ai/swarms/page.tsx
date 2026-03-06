import { Target, Zap, Waves, Network } from 'lucide-react';

export default function SwarmsPage() {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight italic uppercase">Neural Swarm Intelligence</h1>
        <p className="text-lg text-slate-500 max-w-2xl font-medium leading-relaxed italic border-l-4 border-emerald-500 pl-6">
          "A swarm is more than the sum of its agents. It's a collective neural fabric, woven from distinct task-oriented threads."
        </p>
      </div>

      <div className="p-10 rounded-[48px] border border-slate-200 dark:border-slate-800 bg-emerald-500/5 dark:bg-emerald-500/10 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
           <Waves size={120} className="animate-pulse" />
        </div>
        <div className="flex items-center gap-4">
           <div className="p-3 bg-emerald-500/20 text-emerald-500 rounded-2xl">
              <Network size={24} />
           </div>
           <h3 className="text-2xl font-black tracking-tighter uppercase italic">Emergent Behavior</h3>
        </div>
        <p className="text-sm dark:text-slate-400 text-slate-600 font-medium leading-relaxed max-w-2xl">
          Swarms in Clawesome don't just share data; they share state. When one agent encounters a roadblock, the collective intelligence of the swarm recalibrates in real-time.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { title: 'Coordination', desc: 'Auto-syncing between 10+ agents' },
             { title: 'Context Mesh', desc: 'Unified memory across nodes' },
             { title: 'Leaderless', desc: 'Dynamic priority assignment' }
           ].map(stat => (
             <div key={stat.title} className="p-6 rounded-3xl bg-white/50 dark:bg-slate-900/50 border border-emerald-500/20">
                <div className="text-xs font-black uppercase text-emerald-600 tracking-widest mb-1">{stat.title}</div>
                <div className="text-lg font-black tracking-tight truncate">{stat.desc}</div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
