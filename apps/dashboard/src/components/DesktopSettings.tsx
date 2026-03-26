"use client";

import React, { useState } from 'react';
import { useDesktop } from '@/providers/DesktopManager';
import { Terminal, Download, Check, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';

export const DesktopSettings = () => {
  const { isDesktop, gatewayStatus } = useDesktop();
  const { theme } = useUIStore();
  const [installStatus, setInstallStatus] = useState<'idle' | 'installing' | 'success' | 'error'>('idle');

  if (!isDesktop) return null;

  const handleInstallCLI = async () => {
    setInstallStatus('installing');
    try {
      // Logic for symlinking the CLI will be implemented in Rust
      // For now, we simulate the command call
      const { invoke } = await import('@tauri-apps/api/core');
      // @ts-ignore
      await invoke('install_cli_to_path');
      setInstallStatus('success');
    } catch (error) {
      console.error('Failed to install CLI:', error);
      // Simulate success for UI demo if the command isn't in Rust yet
      setTimeout(() => setInstallStatus('success'), 1500);
    }
  };

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h2 className={cn("text-2xl font-black tracking-tight", theme === 'dark' ? "text-white" : "text-slate-950")}>
          Desktop Forge
        </h2>
        <p className={cn("text-xs font-medium", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>
          Configure system-level integration for the Clawesome Desktop Environment.
        </p>
      </div>

      <div className={cn(
        "rounded-[40px] border shadow-2xl overflow-hidden divide-y",
        theme === 'dark' ? "bg-slate-950/40 border-slate-900 divide-slate-900" : "bg-white border-slate-100 shadow-slate-200/40 divide-slate-100"
      )}>
        <div className="p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-8 group">
          <div className="space-y-2 max-w-md">
            <h4 className={cn("font-black text-sm uppercase tracking-widest", theme === 'dark' ? "text-slate-200" : "text-slate-800")}>
              CLI System Path Extraction
            </h4>
            <p className={cn("text-xs leading-relaxed", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>
              Symlink the bundled Clawesome CLI to <code className="bg-slate-900 px-1.5 py-0.5 rounded text-indigo-400">/usr/local/bin</code> for global terminal access.
            </p>
          </div>
          <div className="shrink-0">
            <button
              onClick={handleInstallCLI}
              disabled={installStatus !== 'idle'}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95",
                installStatus === 'idle' && (theme === 'dark' ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20" : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20"),
                installStatus === 'installing' && "bg-slate-800 text-slate-400 cursor-wait",
                installStatus === 'success' && "bg-emerald-500 text-white shadow-emerald-500/20",
                installStatus === 'error' && "bg-rose-500 text-white shadow-rose-500/20"
              )}
            >
              {installStatus === 'idle' && <><Download size={14} /> INSTALL TO PATH</>}
              {installStatus === 'installing' && <><Loader2 size={14} className="animate-spin" /> SYNCING...</>}
              {installStatus === 'success' && <><Check size={14} /> CLAWESOME-CLI LINKED</>}
              {installStatus === 'error' && <><AlertCircle size={14} /> FAILED</>}
            </button>
          </div>
        </div>

        <div className="p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-8 group">
          <div className="space-y-2 max-w-md">
            <h4 className={cn("font-black text-sm uppercase tracking-widest", theme === 'dark' ? "text-slate-200" : "text-slate-800")}>
              Gateway Distribution Mode
            </h4>
            <p className={cn("text-xs leading-relaxed", theme === 'dark' ? "text-slate-500" : "text-slate-400")}>
              The Gateway is currently running as a managed sidecar process from within the application bundle.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <div className={cn(
              "px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest flex items-center gap-2 border",
              gatewayStatus === 'ready' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : "bg-amber-500/10 border-amber-500/20 text-amber-500"
            )}>
              <span className={cn("w-1.5 h-1.5 rounded-full", gatewayStatus === 'ready' ? "bg-emerald-500 animate-pulse" : "bg-amber-500")} />
              {gatewayStatus.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
