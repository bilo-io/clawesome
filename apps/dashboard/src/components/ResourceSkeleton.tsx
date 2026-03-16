// apps/dashboard/src/components/ResourceSkeleton.tsx
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';

interface ResourceSkeletonProps {
  viewMode: 'grid' | 'list' | 'table';
  count?: number;
}

export const ResourceSkeleton: React.FC<ResourceSkeletonProps> = ({ 
  viewMode, 
  count = 6 
}) => {
  const { theme } = useUIStore();
  const isDark = theme === 'dark';

  const skeletons = Array.from({ length: count });

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {skeletons.map((_, i) => (
          <div 
            key={i}
            className={cn(
              "h-[320px] rounded-[48px] border p-10 flex flex-col gap-6 animate-pulse",
              isDark ? "bg-slate-900/20 border-slate-800/50" : "bg-white border-slate-100"
            )}
          >
            <div className="flex justify-between items-start">
              <div className={cn("w-20 h-20 rounded-full", isDark ? "bg-slate-800" : "bg-slate-100")} />
              <div className="flex gap-2">
                <div className={cn("w-10 h-10 rounded-full", isDark ? "bg-slate-800" : "bg-slate-100")} />
                <div className={cn("w-10 h-10 rounded-full", isDark ? "bg-slate-800" : "bg-slate-100")} />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className={cn("h-8 w-3/4 rounded-xl", isDark ? "bg-slate-800" : "bg-slate-100")} />
              <div className={cn("h-4 w-full rounded-lg", isDark ? "bg-slate-800" : "bg-slate-100")} />
            </div>

            <div className="mt-auto pt-8 border-t border-slate-800/20 flex justify-between items-center">
              <div className={cn("h-3 w-20 rounded-full", isDark ? "bg-slate-800" : "bg-slate-100")} />
              <div className={cn("h-10 w-28 rounded-[20px]", isDark ? "bg-slate-800" : "bg-slate-100")} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // List / Table Mode
  return (
    <div className="space-y-4">
      {skeletons.map((_, i) => (
        <div 
          key={i}
          className={cn(
            "h-24 rounded-[28px] border p-4 flex items-center justify-between gap-6 animate-pulse",
            isDark ? "bg-slate-900/20 border-slate-800/50" : "bg-white border-slate-100 shadow-sm"
          )}
        >
          <div className="flex items-center gap-6 flex-1">
             <div className={cn("w-6 h-6 rounded-full", isDark ? "bg-slate-800" : "bg-slate-100")} />
             <div className={cn("w-12 h-12 rounded-2xl", isDark ? "bg-slate-800" : "bg-slate-100")} />
             <div className="space-y-2">
                <div className={cn("h-5 w-32 rounded-lg", isDark ? "bg-slate-800" : "bg-slate-100")} />
                <div className={cn("h-3 w-24 rounded-full", isDark ? "bg-slate-800" : "bg-slate-100")} />
             </div>
          </div>
          <div className={cn("hidden lg:block h-3 w-48 rounded-full", isDark ? "bg-slate-800" : "bg-slate-100")} />
          <div className="flex items-center gap-4">
             <div className={cn("w-10 h-10 rounded-xl", isDark ? "bg-slate-800" : "bg-slate-100")} />
             <div className={cn("w-24 h-10 rounded-full", isDark ? "bg-slate-800" : "bg-slate-100")} />
          </div>
        </div>
      ))}
    </div>
  );
};
