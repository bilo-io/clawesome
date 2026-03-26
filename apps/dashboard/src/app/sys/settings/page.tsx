'use client';

import React from 'react';
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Monitor, 
  Shield, 
  Zap, 
  Bell, 
  Cloud, 
  Github, 
  Database,
  Eye,
  Volume2
} from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';
import { DesktopSettings } from '@/components/DesktopSettings';
import { TestComponent } from "@clawesome/ui";

export default function SettingsPage() {
  const { theme, setTheme, glowIntensity, setGlowIntensity } = useUIStore();

  const sections = [
    {
      id: 'visual',
      title: 'Visual Core',
      icon: <Zap size={20} className="text-amber-500" />,
      description: 'Control the aesthetics and neural rendering engine.',
      settings: [
        {
          id: 'theme',
          label: 'Neural Theme',
          description: 'Choose between high-contrast light and deep-space dark modes.',
          control: (
            <div className={cn(
              "flex p-1.5 rounded-2xl border transition-all",
              theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100 shadow-slate-200/40"
            )}>
              <button 
                onClick={() => setTheme('light')}
                className={cn(
                  "p-2.5 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all",
                  theme === 'light' ? "bg-white text-indigo-600 shadow-xl border border-slate-100" : "text-slate-500 hover:text-slate-300"
                )}
              >
                <Sun size={14} /> LIGHT
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className={cn(
                  "p-2.5 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all",
                  theme === 'dark' ? "bg-slate-800 text-indigo-400 shadow-inner" : "text-slate-500 hover:text-slate-300"
                )}
              >
                <Moon size={14} /> DARK
              </button>
            </div>
          )
        },
        {
          id: 'glow',
          label: 'Glow Intensity',
          description: 'Adjust the brightness of the neural interface glows.',
          control: (
            <div className="flex items-center gap-6 w-full max-w-[300px]">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={glowIntensity} 
                onChange={(e) => setGlowIntensity(parseInt(e.target.value))}
                className="flex-1 accent-indigo-500"
              />
              <span className="text-[10px] font-black font-mono w-8">{glowIntensity}%</span>
            </div>
          )
        }
      ]
    },
    {
       id: 'system',
       title: 'System Protocols',
       icon: <Shield size={20} className="text-indigo-500" />,
       description: 'Configure security levels and resource allocation.',
       settings: [
          {
            id: 'privacy',
            label: 'Incognito Trace',
            description: 'Disable telemetry sync to the global neural network.',
            control: (
              <div className="w-12 h-6 rounded-full bg-slate-800 relative cursor-not-allowed opacity-50 flex items-center px-1 justify-start">
                <div className="w-4 h-4 rounded-full bg-slate-600 shadow-md" />
              </div>
            )
          }
       ]
    }
  ];

  return (
    <main className="max-w-[1600px] mx-auto space-y-12 pb-20">
      <DashboardResourceHeader
        title="Settings"
        description="Core configuration node for the neural interface and system protocols. Fine-tune your workspace visuals, security parameters, and agent communication standards."
        badge="NC-CONFIG"
        statusLabel="Last Synced:"
        statusValue="5m ago"
        statusColor="indigo"
        isCollection={false}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Sidebar Nav */}
        <div className="space-y-2">
           {sections.map(section => (
              <button 
                key={section.id}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-3xl text-left transition-all border group",
                  section.id === 'visual' 
                    ? (theme === 'dark' ? "bg-slate-900/40 border-slate-800 text-white" : "bg-white border-slate-100 shadow-xl shadow-slate-200/40 text-slate-900 font-bold")
                    : (theme === 'dark' ? "border-transparent text-slate-500 hover:bg-slate-900/20" : "border-transparent text-slate-400 hover:bg-slate-50")
                )}
              >
                 <div className={cn(
                   "p-2.5 rounded-xl transition-transform group-hover:scale-110",
                   theme === 'dark' ? "bg-slate-950" : "bg-slate-50"
                 )}>
                    {section.icon}
                 </div>
                 <span className="text-[11px] font-black uppercase tracking-[0.2em]">{section.title}</span>
              </button>
           ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-3 space-y-10">
           <DesktopSettings />
           {sections.map(section => (
             <section key={section.id} className="space-y-8">
                <div className="space-y-2">
                   <h2 className={cn("text-2xl font-black tracking-tight", theme === 'dark' ? "text-white" : "text-slate-950")}>
                      {section.title}
                   </h2>
                   <p className={cn("text-xs font-medium", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>
                      {section.description}
                   </p>
                </div>

                <div className={cn(
                  "rounded-[40px] border shadow-2xl overflow-hidden divide-y",
                  theme === 'dark' ? "bg-slate-950/40 border-slate-900 divide-slate-900" : "bg-white border-slate-100 shadow-slate-200/40 divide-slate-100"
                )}>
                   {section.settings.map(setting => (
                      <div key={setting.id} className="p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-8 group">
                         <div className="space-y-2 max-w-md">
                            <h4 className={cn("font-black text-sm uppercase tracking-widest", theme === 'dark' ? "text-slate-200" : "text-slate-800")}>
                               {setting.label}
                            </h4>
                            <p className={cn("text-xs leading-relaxed", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>
                               {setting.description}
                            </p>
                         </div>
                         <div className="shrink-0 flex justify-end">
                            {setting.control}
                         </div>
                      </div>
                   ))}
                </div>
             </section>
           ))}

           {/* Future Sections Placeholder */}
           <div className={cn(
             "p-12 rounded-[48px] border-2 border-dashed flex flex-col items-center gap-6 text-center transition-all",
             theme === 'dark' ? "bg-slate-900/10 border-slate-800/40" : "bg-slate-50/50 border-slate-200"
           )}>
              <div className="p-5 bg-slate-200 dark:bg-slate-900 rounded-3xl text-slate-400 opacity-40">
                 <SettingsIcon size={32} />
              </div>
              <div>
                 <h3 className={cn("text-sm font-black uppercase tracking-widest mb-2", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>Neural Plugins Expansion</h3>
                 <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500/60">More configuration nodes will manifest as your workforce scales.</p>
              </div>
           </div>

           {/* <TestComponent /> */}
        </div>
      </div>
    </main>
  );
}
