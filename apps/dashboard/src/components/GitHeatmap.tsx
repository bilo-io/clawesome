// apps/dashboard/src/components/GitHeatmap.tsx
'use client';

import React from 'react';

export const GitHeatmap = () => {
  // Generate 28 mock days (4 weeks)
  const days = Array.from({ length: 28 }, (_, i) => ({
    intensity: Math.floor(Math.random() * 5), // 0 to 4
    date: `2026-03-${i + 1}`
  }));

  const intensities = [
    'bg-slate-900 border-slate-900', // 0
    'bg-indigo-900 border-indigo-800', // 1
    'bg-indigo-700 border-indigo-600', // 2
    'bg-indigo-500 border-indigo-400', // 3
    'bg-indigo-400 border-indigo-300 shadow-[0_0_10px_rgba(129,140,248,0.5)]' // 4
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, i) => (
          <div 
            key={i}
            title={`${day.date}: ${day.intensity} contribution(s)`}
            className={`aspect-square rounded-sm border transition-all cursor-pointer hover:scale-110 ${intensities[day.intensity]}`}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-[10px] text-slate-500 uppercase font-mono tracking-widest">
         <span>Less</span>
         <div className="flex gap-1">
            {intensities.map((color, i) => (
              <div key={i} className={`w-2 h-2 rounded-sm ${color}`} />
            ))}
         </div>
         <span>More Velocity</span>
      </div>
    </div>
  );
};
