'use client';

import React, { useState, useEffect } from 'react';
import {
  ShoppingCart,
  Plug,
  PackageCheck,
  Cpu,
  Key,
  Trash2,
  Copy,
  Download
} from 'lucide-react';
import { useIntegrationStore } from '@/store/useIntegrationStore';
import { useProviderStore, BUILTIN_PROVIDERS } from '@/store/useProviderStore';
import { IntegrationCard } from '@/components/IntegrationCard';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/useUIStore';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';
import { useSelectionStore } from '@/store/useSelectionStore';

export default function IntegrationsPage() {
  const { myIntegrations, marketplaceIntegrations, isInstalled } = useIntegrationStore();
  const { providers, setPreferredModel, setApiKey, getApiKey } = useProviderStore();
  const { theme, getViewMode, setViewMode: storeSetView } = useUIStore();
  const { selectedIds, toggleSelection, clearSelection, setSelection } = useSelectionStore();
  const rawMode = getViewMode('/sys/integrations', 'grid');
  const viewMode: 'grid' | 'table' = rawMode === 'list' ? 'grid' : (rawMode as 'grid' | 'table');
  const setViewMode = (m: 'grid' | 'list') => storeSetView('/sys/integrations', m === 'list' ? 'table' : 'grid');
  const [activeTab, setActiveTab] = useState<'my' | 'marketplace'>('my');
  const [searchQuery, setSearchQuery] = useState('');

  // Clear selection on unmount
  useEffect(() => {
    return () => clearSelection();
  }, [clearSelection]);

  const currentIntegrations = activeTab === 'my' ? myIntegrations : marketplaceIntegrations;
  const filteredIntegrations = currentIntegrations.filter(
    (i) =>
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isAllSelected = filteredIntegrations.length > 0 && filteredIntegrations.every(i => selectedIds.includes(i.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      clearSelection();
    } else {
      setSelection(filteredIntegrations.map(i => i.id));
    }
  };

  const bulkActions = selectedIds.length > 0 ? (
    <>
      <button className={cn(
        "flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95",
        theme === 'dark' ? "bg-rose-500/10 border-rose-500/20 text-rose-500" : "bg-rose-50 border-rose-200 text-rose-600 shadow-sm"
      )}>
        <Trash2 size={14} /> Uninstall Plugins ({selectedIds.length})
      </button>
      <button className={cn(
        "flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95",
        theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-100 text-slate-600 shadow-sm"
      )}>
        <Copy size={14} /> Duplicate Configuration
      </button>
      <button className={cn(
        "flex items-center gap-2 px-5 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95",
        theme === 'dark' ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-100 text-slate-600 shadow-sm"
      )}>
        <Download size={14} /> Export Manifest
      </button>
    </>
  ) : null;

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 pb-20">
      <DashboardResourceHeader
        title="Integrations"
        description="Unified ecosystem for third-party extensions and neural plugins. Connect your agents to external tools, platforms, and services to expand their operational reach."
        badge="NC-PLUGINS"
        statusLabel="Plugin Status:"
        statusValue="Sync Ready"
        statusColor="indigo"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder={`Search ${activeTab === 'my' ? 'installed' : 'marketplace'} integrations...`}
        viewMode={viewMode === 'table' ? 'list' : 'grid'}
        onViewModeChange={(mode: 'grid' | 'list') => setViewMode(mode)}
        isCollection={true}
        allSelected={isAllSelected}
        someSelected={selectedIds.length > 0 && !isAllSelected}
        onSelectAll={handleSelectAll}
        bulkActions={bulkActions}
        renderRight={
          <div
            className={cn(
              'flex items-center gap-2 p-1.5 rounded-full border transition-all shadow-xl',
              theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-100 shadow-slate-200/40'
            )}
          >
            <button
              onClick={() => setActiveTab('my')}
              className={cn(
                'flex items-center gap-3 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all active:scale-95',
                activeTab === 'my'
                  ? 'bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white shadow-lg shadow-purple-600/20'
                  : theme === 'dark' ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'
              )}
            >
              <PackageCheck size={18} />
              <span>INSTALLED</span>
            </button>
            <button
              onClick={() => setActiveTab('marketplace')}
              className={cn(
                'flex items-center gap-3 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all active:scale-95',
                activeTab === 'marketplace'
                  ? 'bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white shadow-lg shadow-purple-600/20'
                  : theme === 'dark' ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'
              )}
            >
              <ShoppingCart size={18} />
              <span>MARKETPLACE</span>
            </button>
          </div>
        }
      />

      <AnimatePresence mode="popLayout" initial={false}>
        {filteredIntegrations.length > 0 ? (
          <motion.div
            key={`${activeTab}-list`}
            className={cn(
              viewMode === 'grid'
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10"
                : "space-y-4"
            )}
          >
            {filteredIntegrations.map((integration) => (
              <motion.div
                layout
                key={integration.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <IntegrationCard
                  integration={integration}
                  viewMode={viewMode === 'grid' ? 'grid' : 'table'}
                  isInstalled={isInstalled(integration.name)}
                  source={activeTab === 'my' ? 'installed' : 'marketplace'}
                  selected={selectedIds.includes(integration.id)}
                  onToggleSelection={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleSelection(integration.id);
                  }}
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
              'flex flex-col items-center justify-center py-40 rounded-[64px] border-2 border-dashed shadow-inner transition-colors',
              theme === 'dark' ? 'bg-slate-900/10 border-slate-800/30' : 'bg-slate-50/50 border-slate-200'
            )}
          >
            <div
              className={cn(
                'w-32 h-32 rounded-[40px] flex items-center justify-center mb-10 shadow-2xl border transition-all animate-pulse',
                theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-700 shadow-black/50' : 'bg-white border-slate-100 text-slate-200 shadow-slate-200/50'
              )}
            >
              {activeTab === 'my' ? <Plug size={64} strokeWidth={1} /> : <ShoppingCart size={64} strokeWidth={1} />}
            </div>
            <h3 className={cn('text-3xl font-black mb-4 tracking-tighter', theme === 'dark' ? 'text-white' : 'text-slate-950')}>
              {searchQuery ? 'NO MATCHES' : activeTab === 'my' ? 'NO INTEGRATIONS INSTALLED' : 'MARKETPLACE OFFLINE'}
            </h3>
            <p className={cn('text-sm max-w-sm text-center leading-loose font-bold uppercase tracking-[0.1em] mb-12', theme === 'dark' ? 'text-slate-600' : 'text-slate-400')}>
              {activeTab === 'my'
                ? 'Add integrations from the Marketplace, then configure them to connect your tools.'
                : 'Refresh your neural link to load available integrations.'}
            </p>
            {activeTab === 'my' && !searchQuery && (
              <button
                onClick={() => setActiveTab('marketplace')}
                className="flex items-center gap-4 px-12 py-5 bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-2xl shadow-purple-600/30 active:scale-95"
              >
                <ShoppingCart size={20} />
                <span>Open Marketplace</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Providers & Models */}
      <section className="pt-8">
        <div
          className={cn(
            'rounded-[40px] border shadow-2xl overflow-hidden transition-colors',
            theme === 'dark' ? 'bg-slate-950/50 border-slate-800' : 'bg-white border-slate-100 shadow-slate-200/50'
          )}
        >
          <div className={cn('px-8 py-6 border-b', theme === 'dark' ? 'border-slate-800' : 'border-slate-100')}>
            <div className="flex items-center gap-3 mb-2">
              <div className={cn('p-2 rounded-full', theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600')}>
                <Cpu size={20} />
              </div>
              <h2 className={cn('text-lg font-black tracking-tighter', theme === 'dark' ? 'text-white' : 'text-slate-950')}>
                AI Providers & Models
              </h2>
            </div>
            <p className={cn('text-[11px] font-bold uppercase tracking-widest', theme === 'dark' ? 'text-slate-500' : 'text-slate-400')}>
              Preferred providers and models for your agents. Add API keys to enable usage.
            </p>
          </div>
          <div className="p-8 space-y-6">
            {providers.map((provider: any) => {
              const option = BUILTIN_PROVIDERS.find((p: any) => p.id === provider.providerId);
              const models = option?.models ?? [];
              return (
                <div
                  key={provider.providerId}
                  className={cn(
                    'flex flex-col sm:flex-row sm:items-center gap-4 p-6 rounded-3xl border transition-colors',
                    theme === 'dark' ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-50/50 border-slate-100'
                  )}
                >
                  <div className="flex items-center gap-4 min-w-[140px]">
                    <div className={cn('p-2.5 rounded-2xl', theme === 'dark' ? 'bg-slate-800 text-slate-300' : 'bg-white border border-slate-100 text-slate-600')}>
                      <Key size={20} />
                    </div>
                    <span className={cn('font-black tracking-tight', theme === 'dark' ? 'text-white' : 'text-slate-900')}>
                      {provider.name}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className={cn('block text-[10px] font-black uppercase tracking-widest mb-2', theme === 'dark' ? 'text-slate-500' : 'text-slate-400')}>
                        Model
                      </label>
                      <select
                        value={provider.preferredModel}
                        onChange={(e) => setPreferredModel(provider.providerId, e.target.value)}
                        className={cn(
                          'w-full rounded-2xl px-4 py-3 text-sm font-bold border outline-none transition-all',
                          theme === 'dark'
                            ? 'bg-slate-950 border-slate-800 text-white focus:border-indigo-500'
                            : 'bg-white border-slate-200 text-slate-900 focus:border-indigo-500'
                        )}
                      >
                        {models.map((m: any) => (
                          <option key={m.id} value={m.id}>
                            {m.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className={cn('block text-[10px] font-black uppercase tracking-widest mb-2', theme === 'dark' ? 'text-slate-500' : 'text-slate-400')}>
                        API Key
                      </label>
                      <input
                        type="password"
                        placeholder="sk-..."
                        value={getApiKey(provider.providerId)}
                        onChange={(e) => setApiKey(provider.providerId, e.target.value)}
                        className={cn(
                          'w-full rounded-2xl px-4 py-3 text-sm font-bold border outline-none transition-all placeholder:opacity-50',
                          theme === 'dark'
                            ? 'bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus:border-indigo-500'
                            : 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500'
                        )}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
