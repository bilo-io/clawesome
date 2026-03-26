import React from 'react';
import { CouncilResourceCard, InitializeCard } from '@clawesome/ui';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface CouncilGridViewProps {
  councils: any[];
  selectedIds: string[];
  theme: 'light' | 'dark';
  onToggleSelection: (id: string, e: React.MouseEvent) => void;
}

export const CouncilGridView = ({
  councils,
  selectedIds,
  theme,
  onToggleSelection
}: CouncilGridViewProps) => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <InitializeCard label="Initialize Council" onClick={() => {}} viewMode="grid" />
      {councils.map((council) => (
        <div key={council.id} className="relative group/card">
          <CouncilResourceCard
            {...council}
            viewMode="grid"
            onClick={(id) => router.push(`/ai/councils/${id}`)}
          />
          <div 
             onClick={(e) => onToggleSelection(council.id, e)}
             className={cn(
                "absolute top-4 left-4 z-20 w-6 h-6 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center",
                selectedIds.includes(council.id)
                    ? "bg-indigo-600 border-indigo-600 text-white"
                    : cn(
                        "opacity-0 group-hover/card:opacity-100 border-2",
                        theme === 'dark' ? "bg-black/20 border-white/20" : "bg-white/40 border-slate-200 shadow-sm"
                    )
            )}
          >
            {selectedIds.includes(council.id) && <Check size={14} strokeWidth={4} />}
          </div>
        </div>
      ))}
    </div>
  );
};
