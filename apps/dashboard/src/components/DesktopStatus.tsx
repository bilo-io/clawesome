"use client";

import React from 'react';
import { useDesktop } from '@/providers/DesktopManager';
import { Monitor, Activity, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';

export const DesktopStatus = () => {
  const { isDesktop, gatewayStatus, gatewayPort } = useDesktop();
  const { isSidebarExpanded, theme } = useUIStore();

  if (!isDesktop) return null;

  const getStatusColor = () => {
    switch (gatewayStatus) {
      case 'ready': return 'text-emerald-500';
      case 'starting': return 'text-amber-500';
      case 'error': return 'text-rose-500';
      default: return 'text-slate-500';
    }
  };

  const getStatusIcon = () => {
    switch (gatewayStatus) {
      case 'ready': return <Activity size={14} />;
      case 'starting': return <Loader2 size={14} className="animate-spin" />;
      case 'error': return <AlertCircle size={14} />;
      default: return <Monitor size={14} />;
    }
  };

  return (
    <div className={cn(
      "mt-auto mb-4 mx-2 p-3 rounded-2xl border transition-all",
      theme === 'dark' ? "bg-slate-900/40 border-slate-800/60" : "bg-slate-50 border-slate-200"
    )}>
      <div className="flex items-center gap-3">
        <div className={cn("p-2 rounded-xl bg-black/20", getStatusColor())}>
          {getStatusIcon()}
        </div>
        {isSidebarExpanded && (
          <div className="flex flex-col min-w-0">
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-widest",
              theme === 'dark' ? "text-slate-500" : "text-slate-600"
            )}>
              Gateway
            </span>
            <span className={cn(
              "text-xs font-mono font-bold truncate",
              getStatusColor()
            )}>
              {gatewayStatus === 'ready' ? `PORT: ${gatewayPort}` : gatewayStatus.toUpperCase()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
