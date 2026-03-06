import { Brain, Cpu, Zap, Activity } from 'lucide-react';

export default function AIPage() {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight uppercase italic">AI Engine Overview</h1>
        <p className="text-lg text-slate-500 max-w-2xl leading-relaxed font-medium">
          The Clawesome AI Engine is a decentralized orchestration layer that manages neural mesh connections and agentic workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { icon: <Brain />, title: 'Neural Network', desc: 'The backbone of Clawesome, facilitating high-speed data transfer between nodes.' },
          { icon: <Cpu />, title: 'LLM Orchestration', desc: 'Plug and play with any model provider via our standardized inference gateway.' },
          { icon: <Activity />, title: 'Agent Vitality', desc: 'Real-time monitoring of agent health, resource usage, and mission status.' },
          { icon: <Zap />, title: 'Flash Swarms', desc: 'Rapidly deploy temporary agent clusters for intensive compute tasks.' }
        ].map(card => (
          <div key={card.title} className="p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
            <div className="p-3 bg-white dark:bg-slate-950 rounded-2xl w-fit shadow-inner border border-slate-100 dark:border-slate-800 mb-6 font-bold text-indigo-500">
              {card.icon}
            </div>
            <h3 className="text-xl font-black tracking-tight mb-2 uppercase italic">{card.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
