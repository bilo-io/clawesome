'use client';

import { CodeBlock, PageHeader } from "@clawesome/ui";
import { Terminal, Cpu, ShieldCheck, Zap, Info, Layers, Layout, Share2, HelpCircle } from 'lucide-react';

export default function CLIPage() {
  return (
    <div className="space-y-16 animate-in fade-in duration-500 pb-32">
      <header className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight">CLI Reference</h1>
        <p className="text-lg text-slate-500 max-w-2xl font-medium leading-relaxed">
          The Clawesome CLI (`clawesome`) is the primary orchestration tool for the monorepo. It handles everything from gateway lifecycle management to AI agent diagnostics.
        </p>
      </header>

      <PageHeader 
        title="Interactive Hub" 
        statusLabel="Main Entry:"
        statusValue="clawesome"
        statusColor="indigo"
        description="The hub provides a branded, interactive menu for managing all system processes without memorizing flags."
      />

      <section className="space-y-8">
        <div className="p-8 rounded-[32px] bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800 flex items-start gap-6">
          <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-500 shrink-0">
             <Info size={24} />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-black uppercase tracking-tight">Pro Tip: Interactive Mode</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Simply run `clawesome` without any arguments to enter the Interactive Hub. It features a beautiful ASCII interface, clear-screen transitions, and full keyboard navigation for common tasks.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-12">
        <h2 className="text-2xl font-black tracking-tight border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center gap-3">
          <Terminal size={24} className="text-indigo-500" />
          Command Catalog
        </h2>
        
        <div className="space-y-20">
          {/* Start Command */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
                 <Zap size={20} />
               </div>
               <div>
                  <h3 className="text-xl font-black lowercase tracking-tighter"><code>clawesome start</code></h3>
                  <p className="text-xs font-bold text-slate-400 tracking-wider">LIFECYCLE MANAGEMENT</p>
               </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-3xl">
              Launches the Clawesome Gateway server and the background agent swarm. By default, it looks for an active `apps/gateway` build and initializes the websocket bridge for the dashboard.
            </p>
            <div className="space-y-4">
               <span className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400">Options</span>
               <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] font-medium text-slate-500">
                  <li className="flex gap-2">
                    <code className="text-indigo-500">--port &lt;number&gt;</code> 
                    <span>Override default gateway port (17871)</span>
                  </li>
                  <li className="flex gap-2">
                    <code className="text-indigo-500">--no-open</code> 
                    <span>Skip opening the dashboard in browser</span>
                  </li>
                  <li className="flex gap-2">
                    <code className="text-indigo-500">--debug</code> 
                    <span>Enable verbose internal engine logs</span>
                  </li>
               </ul>
            </div>
            <CodeBlock code="clawesome start --port 3000" language="bash" />
          </div>

          {/* Doctor Command */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
                 <ShieldCheck size={20} />
               </div>
               <div>
                <h3 className="text-xl font-black lowercase tracking-tighter"><code>clawesome doctor</code></h3>
                  <p className="text-xs font-bold text-slate-400 tracking-wider">SYSTEM DIAGNOSTICS</p>
               </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-3xl">
              The doctor command performs a deep scan of your environment to ensure all dependencies and system configurations satisfy Clawesome's architecture requirements.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               {[
                 { icon: Layout, label: 'Workspace', desc: 'Verifies moon.yml and repo boundaries' },
                 { icon: Layers, label: 'Runtimes', desc: 'Checks Bun version and Node compatibility' },
                 { icon: Share2, label: 'Networks', desc: 'Pings LLM providers and checks port collisions' }
               ].map(c => (
                 <div key={c.label} className="p-5 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm space-y-3">
                   <div className="p-2 w-fit bg-slate-50 dark:bg-slate-950 rounded-xl text-slate-400">
                      <c.icon size={16} />
                   </div>
                   <h4 className="text-xs font-black uppercase tracking-widest">{c.label}</h4>
                   <p className="text-[10px] text-slate-500">{c.desc}</p>
                 </div>
               ))}
            </div>
            <CodeBlock code="clawesome doctor" language="bash" />
          </div>

          {/* Setup Command */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
                 <Cpu size={20} />
               </div>
               <div>
                <h3 className="text-xl font-black lowercase tracking-tighter"><code>clawesome setup</code></h3>
                  <p className="text-xs font-bold text-slate-400 tracking-wider">CONFIGURATION WIZARD</p>
               </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-3xl">
              Use this wizard to securely configure your LLM provider credentials and RAG preferences. Supports OpenAI, Anthropic, Gemini, and Local (Ollama) providers.
            </p>
            <CodeBlock code="clawesome setup" language="bash" />
          </div>

          {/* Stop Command */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-rose-500/10 text-rose-500 rounded-xl">
                 <Terminal size={20} />
               </div>
               <div>
                <h3 className="text-xl font-black lowercase tracking-tighter"><code>clawesome stop</code></h3>
                  <p className="text-xs font-bold text-slate-400 tracking-wider">CLEAN SHUTDOWN</p>
               </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-3xl">
              Safely terminates all background agent processes, clears cached session data, and releases occupied network ports.
            </p>
            <CodeBlock code="clawesome stop" language="bash" />
          </div>

          {/* Version Command */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl">
                 <Info size={20} />
               </div>
               <div>
                  <h3 className="text-xl font-black lowercase tracking-tighter"><code>clawesome version</code></h3>
                  <p className="text-xs font-bold text-slate-400 tracking-wider">VERSION INFO</p>
               </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-3xl">
              Displays the current installed version of the Clawesome CLI and its associated core dependencies (Gateway engine, Swarm protocol).
            </p>
            <CodeBlock code="clawesome version" language="bash" />
          </div>

          {/* Help Command */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-slate-500/10 text-slate-500 rounded-xl">
                 <HelpCircle size={20} />
               </div>
               <div>
                  <h3 className="text-xl font-black lowercase tracking-tighter"><code>clawesome --help</code></h3>
                  <p className="text-xs font-bold text-slate-400 tracking-wider">USAGE ASSISTANCE</p>
               </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-3xl">
              Outputs a comprehensive list of all available commands, options, and global flags. Useful for quick reference of parameter syntax.
            </p>
            <CodeBlock code="clawesome --help" language="bash" />
          </div>
        </div>
      </section>

      <section className="space-y-8 mt-24">
        <h2 className="text-2xl font-black tracking-tight border-b border-slate-200 dark:border-slate-800 pb-4">
          Global Access
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
          Installing the CLI globally allows you to run orchestrations from any directory within your filesystem.
        </p>
        <CodeBlock code="bun add -g @clawesome/cli" language="bash" />
      </section>
    </div>
  );
}
