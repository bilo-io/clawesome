'use client'
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useUI, cn } from "@clawesome/ui";

export default function ReleasesPage() {
  const { theme } = useUI();
  const releases = [
    { version: "v0.1.0", date: "March 2026", features: ["Initial Monorepo Architecture", "Clawesome CLI Command Hub", "@clawesome/ui shared package", "Nightclaw OS Dashboard MVP", "Developer Documentation App"] },
    { version: "v0.0.1", date: "February 2026", features: ["Proof of concept AI swarm implementation", "Basic command line structure"] },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-24">
      <header className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight">Release Notes</h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Track the evolution of the Clawesome monorepo and system architecture.
        </p>
      </header>
      
      <section className="space-y-16 mt-16">
        {releases.map((release, index) => (
          <div key={release.version} className="relative pl-8 md:pl-0">
             <div className="hidden md:block absolute left-[120px] top-6 w-8 border-t-2 border-dashed border-indigo-500/30" />
             <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-start">
                <div className="w-24 shrink-0 font-bold text-sm text-slate-400 uppercase tracking-widest pt-2">
                  {release.date}
                </div>
                
                <div className={cn(
                  "flex-1 p-8 rounded-[40px] border transition-colors relative group",
                  theme === 'dark' 
                    ? "border-slate-800 bg-slate-900 hover:border-indigo-500/30 shadow-none" 
                    : "border-slate-100 bg-slate-50/30 backdrop-blur-sm hover:border-indigo-200 shadow-xl shadow-slate-200/40"
                )}>
                  <div className={cn(
                    "absolute -left-3 top-6 w-6 h-6 rounded-full border-4 transition-colors hidden md:block",
                    theme === 'dark' ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200 group-hover:border-indigo-500"
                  )} />
                  <h3 className="text-2xl font-black tracking-tighter mb-6 flex items-center gap-3">
                    <span className="text-indigo-500">{release.version}</span>
                  </h3>
                  
                  <ul className="space-y-4">
                    {release.features.map(f => (
                      <li key={f} className="flex items-start gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <ArrowRight size={16} className="text-indigo-500/50 mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                  
                </div>
             </div>
          </div>
        ))}
      </section>
    </div>
  );
}
