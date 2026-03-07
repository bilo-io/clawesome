// apps/dashboard/src/app/skills/page.tsx
'use client';

import React, { useState } from 'react';
import { 
  ShoppingCart,
  Cpu,
  PackageCheck
} from 'lucide-react';
import { useSkillStore } from '@/store/useSkillStore';
import { SkillCard } from '@/components/SkillCard';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';

export default function SkillsPage() {
  const { mySkills, marketplaceSkills } = useSkillStore();
  const { theme, getViewMode, setViewMode: storeSetView } = useUIStore();
  const rawMode = getViewMode('/skills', 'grid');
  const viewMode: 'grid' | 'table' = rawMode === 'list' ? 'grid' : (rawMode as 'grid' | 'table');
  const setViewMode = (m: 'grid' | 'list') => storeSetView('/skills', m === 'list' ? 'table' : 'grid');
  const [activeTab, setActiveTab] = useState<'my' | 'marketplace'>('my');
  const [searchQuery, setSearchQuery] = useState('');

  const currentSkills = activeTab === 'my' ? mySkills : marketplaceSkills;
  
  const filteredSkills = currentSkills.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isSkillImported = (skillName: string) => {
    return mySkills.some(s => s.name === skillName);
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
      <DashboardResourceHeader
        title="Skills"
        description="Modular neural capabilities and toolsets for autonomous agents. Expand the operational efficiency of your workforce with production-ready skill modules."
        badge="NC-SKILLS"
        statusLabel="Capability Status:"
        statusValue="Local Sync Active"
        statusColor="indigo"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder={`Search ${activeTab === 'my' ? 'installed' : 'marketplace'} skills...`}
        viewMode={viewMode === 'table' ? 'list' : 'grid'}
        onViewModeChange={(mode: 'grid' | 'list') => setViewMode(mode)}
        showFilter
        renderRight={
          <div className={cn(
            "flex items-center gap-2 p-1.5 rounded-full border transition-all shadow-xl",
            theme === 'dark' ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-100 shadow-slate-200/40"
          )}>
            <button
              onClick={() => setActiveTab('my')}
              className={cn(
                "flex items-center gap-3 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all active:scale-95",
                activeTab === 'my' 
                  ? "bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white shadow-lg shadow-purple-600/20" 
                  : (theme === 'dark' ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600")
              )}
            >
              <PackageCheck size={18} />
              <span>INSTALLED</span>
            </button>
            <button
              onClick={() => setActiveTab('marketplace')}
              className={cn(
                "flex items-center gap-3 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all active:scale-95",
                activeTab === 'marketplace' 
                  ? "bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white shadow-lg shadow-purple-600/20" 
                  : (theme === 'dark' ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600")
              )}
            >
              <ShoppingCart size={18} />
              <span>MARKETPLACE</span>
            </button>
          </div>
        }
      />

      <AnimatePresence mode="popLayout" initial={false}>
        {filteredSkills.length > 0 ? (
          <motion.div
            key={`${activeTab}-list`}
            className={cn(
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" 
                : "space-y-3"
            )}
          >
            {filteredSkills.map((skill, i) => (
              <motion.div
                layout
                key={skill.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <SkillCard 
                  skill={skill} 
                  viewMode={viewMode === 'grid' ? 'grid' : 'table'} 
                  isImported={isSkillImported(skill.name)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={`${activeTab}-empty`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={cn(
               "flex flex-col items-center justify-center py-40 rounded-[64px] border-2 border-dashed shadow-inner transition-colors",
               theme === 'dark' ? "bg-slate-900/10 border-slate-800/30" : "bg-slate-50/50 border-slate-200"
            )}
          >
            <div className={cn(
              "w-32 h-32 rounded-[40px] flex items-center justify-center mb-10 shadow-2xl border transition-all animate-pulse",
              theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-700 shadow-black/50" : "bg-white border-slate-100 text-slate-200 shadow-slate-200/50"
            )}>
              {activeTab === 'my' ? <Cpu size={64} strokeWidth={1} /> : <ShoppingCart size={64} strokeWidth={1} />}
            </div>
            <h3 className={cn("text-3xl font-black mb-4 tracking-tighter", theme === 'dark' ? "text-white" : "text-slate-950")}>
              {searchQuery ? 'NO MATCHING TRACES' : activeTab === 'my' ? 'NEURAL INTERFACE EMPTY' : 'REPOSITORY OFFLINE'}
            </h3>
            <p className={cn("text-sm max-w-sm text-center leading-loose font-bold uppercase tracking-[0.1em] mb-12", theme === 'dark' ? "text-slate-600" : "text-slate-400")}>
              {activeTab === 'my' 
                ? 'Your agent is currently in raw state. Access the Marketplace to begin neural capability expansion.' 
                : 'Refresh your neural link to retrieve the latest verified skill modules from the global repository.'}
            </p>
            {activeTab === 'my' && !searchQuery && (
              <button
                onClick={() => setActiveTab('marketplace')}
                className="flex items-center gap-4 px-12 py-5 bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all shadow-2xl shadow-purple-600/30 active:scale-95"
              >
                <ShoppingCart size={20} />
                <span>Access Marketplace</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
