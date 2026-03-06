// apps/dashboard/src/components/NetworkRadial.tsx
'use client';

import React from 'react';
import { Download, Upload } from 'lucide-react';

export const NetworkRadial = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Background Ring */}
        <svg className="absolute w-full h-full -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="80"
            fill="transparent"
            stroke="#1e293b"
            strokeWidth="8"
          />
          {/* Active Data Ring */}
          <circle
            cx="96"
            cy="96"
            r="80"
            fill="transparent"
            stroke="#6366f1"
            strokeWidth="8"
            strokeDasharray="502"
            strokeDashoffset="150"
            className="transition-all duration-1000 ease-in-out"
          />
        </svg>

        {/* Inner Label */}
        <div className="flex flex-col items-center z-10">
          <span className="text-3xl font-bold tracking-tighter">842</span>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest">MB/s Sync</span>
        </div>

        {/* Glow / Particle Effect Overlay */}
        <div className="absolute inset-0 rounded-full border border-indigo-500/10 animate-[pulse_4s_infinite]" />
      </div>

      <div className="mt-6 flex gap-8 w-full">
         <div className="flex-1 flex items-center gap-2 bg-slate-900/50 p-2 rounded-lg border border-slate-800">
            <div className="p-1 bg-emerald-500/20 rounded">
               <Download size={14} className="text-emerald-500" />
            </div>
            <div className="flex flex-col">
               <span className="text-[10px] text-slate-500">DOWN</span>
               <span className="text-xs font-mono font-bold text-slate-200">12.4 MB/s</span>
            </div>
         </div>
         <div className="flex-1 flex items-center gap-2 bg-slate-900/50 p-2 rounded-lg border border-slate-800">
            <div className="p-1 bg-indigo-500/20 rounded">
               <Upload size={14} className="text-indigo-400" />
            </div>
            <div className="flex flex-col">
               <span className="text-[10px] text-slate-500">UP</span>
               <span className="text-xs font-mono font-bold text-slate-200">1.2 MB/s</span>
            </div>
         </div>
      </div>
    </div>
  );
};
