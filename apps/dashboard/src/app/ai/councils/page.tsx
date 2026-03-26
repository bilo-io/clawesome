'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, BrainCircuit, Archive, Trash2 } from 'lucide-react';
import { 
  DashboardResourceHeader, 
} from '@/components/DashboardResourceHeader';
import { 
  Button
} from '@clawesome/ui';
import { useUIStore } from '@/store/useUIStore';
import { CouncilGridView } from './components/CouncilGridView';
import { CouncilListView } from './components/CouncilListView';

// Mock Data
const mockAgents = [
    { id: 'a1', name: 'Architect', role: 'System Design', color: '#6366f1' },
    { id: 'a2', name: 'Security', role: 'Risk Mitigation', color: '#f43f5e' },
    { id: 'a3', name: 'Ethics', role: 'Alignment Guard', color: '#10b981' },
    { id: 'a4', name: 'Analyst', role: 'Data Intelligence', color: '#f59e0b' },
];

const mockCouncils = [
    { id: 'c1', title: 'Data Sovereignty Protocol', description: 'Discussion on decentralizing data ownership for S3 clearance users.', agents: mockAgents.slice(0, 3), lastActive: '2m ago', messageCount: 24, status: 'active' as const },
    { id: 'c2', title: 'Ethical Guardrail Review', description: 'Reviewing the latest alignment benchmarks for Swarm-09.', agents: [mockAgents[2], mockAgents[0]], lastActive: '1h ago', messageCount: 12, status: 'concluded' as const },
    { id: 'c3', title: 'Security Mesh Architecture', description: 'Internal deliberation on the new firewall-less neural sync.', agents: [mockAgents[1], mockAgents[0], mockAgents[3]], lastActive: 'Yesterday', messageCount: 56, status: 'archived' as const },
    { id: 'c4', title: 'Model Distillation Strategy', description: 'Optimizing small models for edge deployment in low-power environments.', agents: [mockAgents[0], mockAgents[3]], lastActive: '3 days ago', messageCount: 8, status: 'active' as const },
];

export default function CouncilsPage() {
    const { theme, getViewMode, setViewMode: storeSetView } = useUIStore();
    const router = useRouter();
    const viewMode = (getViewMode('/ai/councils', 'grid') as 'grid' | 'list');
    const setViewMode = (m: 'grid' | 'list') => storeSetView('/ai/councils', m);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const filteredCouncils = mockCouncils.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelectAll = () => {
        if (selectedIds.length === filteredCouncils.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredCouncils.map(c => c.id));
        }
    };

    const toggleSelect = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    return (
        <div className="space-y-8 pb-20">
            <DashboardResourceHeader
                title="Councils"
                badge="AI"
                description="Orchestrate collaborative AI deliberations to reach consensus on complex topics."
                statusLabel="Active Sessions:"
                statusValue="4"
                statusColor="indigo"
                isCollection={true}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                viewMode={viewMode}
                onViewModeChange={(v: any) => setViewMode(v)}
                showFilter={true}
                onFilterClick={() => {}}
                allSelected={selectedIds.length === filteredCouncils.length && filteredCouncils.length > 0}
                someSelected={selectedIds.length > 0 && selectedIds.length < filteredCouncils.length}
                onSelectAll={handleSelectAll}
                renderRight={
                    <button 
                        onClick={() => router.push('/ai/councils/new')}
                        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#8C00FF] to-[#008FD6] text-white rounded-full font-bold shadow-xl shadow-purple-600/20 transition-all active:translate-y-1"
                    >
                        <Plus size={20} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">New Council</span>
                    </button>
                }
                bulkActions={
                    selectedIds.length > 0 && (
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="xs" icon={<Archive size={12} />}>Archive</Button>
                            <Button variant="danger" size="xs" icon={<Trash2 size={12} />}>Delete</Button>
                        </div>
                    )
                }
            />

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                {viewMode === 'grid' ? (
                  <CouncilGridView 
                    councils={filteredCouncils}
                    selectedIds={selectedIds}
                    theme={theme}
                    onToggleSelection={toggleSelect}
                  />
                ) : (
                  <CouncilListView 
                    councils={filteredCouncils}
                    selectedIds={selectedIds}
                    theme={theme}
                    onToggleSelection={toggleSelect}
                  />
                )}
            </div>

            {filteredCouncils.length === 0 && (
                <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-20 h-20 rounded-[2.5rem] bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-300 dark:text-slate-800">
                        <BrainCircuit size={40} />
                    </div>
                    <div>
                        <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">No Council Found</h3>
                        <p className="text-sm text-slate-500 font-medium">Try adjusting your search or filters.</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setSearchQuery('')}>Clear Search</Button>
                </div>
            )}
        </div>
    );
}
