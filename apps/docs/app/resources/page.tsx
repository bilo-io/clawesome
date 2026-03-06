import { Terminal } from 'lucide-react';

export default function ResourcesPage() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-24">
      <header className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight">Resources & MCPs</h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Extend Clawesome with built-in integrations, Model Context Protocol (MCP) definitions, and official plugins.
        </p>
      </header>
      
      <section className="space-y-6 flex flex-col items-center justify-center p-20 text-center border dark:border-slate-800 border-slate-200 rounded-[48px] bg-slate-50 dark:bg-slate-900/30">
        <div className="p-4 bg-indigo-500/10 text-indigo-500 rounded-3xl mb-4">
          <Terminal size={32} />
        </div>
        <h2 className="text-2xl font-black tracking-tight">
          MCP Registry
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
          The official repository of verified MCP implementations for Clawesome OS is currently being finalized. Check back in the next minor version.
        </p>
      </section>
    </div>
  );
}
