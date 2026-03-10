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
      
      <section className="space-y-16 mt-16 max-w-5xl mx-auto">
        {releases.map((release) => (
          <div key={release.version} className="relative pl-0">
             <div className="flex flex-col md:flex-row gap-6 md:gap-0 items-start">
                {/* Date column */}
                <div className="w-40 shrink-0 font-bold text-[11px] text-slate-400 uppercase tracking-[0.2em] pt-[42px]">
                  {release.date}
                </div>
                
                {/* Dashed line and dot connector */}
                <div className="hidden md:flex items-center justify-center w-24 self-stretch relative">
                   <div className="absolute top-[52px] left-0 w-full border-t-2 border-dashed border-indigo-500/30" />
                </div>

                {/* Content Box */}
                <div className={cn(
                  "flex-1 p-8 rounded-[40px] border transition-colors relative group",
                  theme === 'dark' 
                    ? "border-slate-800 bg-slate-900 hover:border-indigo-500/30 shadow-none" 
                    : "border-slate-100 bg-slate-50/30 backdrop-blur-sm hover:border-indigo-200 shadow-xl shadow-slate-200/40"
                )}>
                  {/* The dot */}
                  <div className={cn(
                    "absolute -left-3 top-10 w-6 h-6 rounded-full border-2 transition-colors hidden md:block z-10",
                    theme === 'dark' ? "bg-slate-950 border-slate-700" : "bg-white border-slate-200 group-hover:border-indigo-500"
                  )} />

                  <h3 className="text-2xl font-black tracking-tighter mb-6 flex items-center gap-3">
                    <span className="text-indigo-500 font-black">{release.version}</span>
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
