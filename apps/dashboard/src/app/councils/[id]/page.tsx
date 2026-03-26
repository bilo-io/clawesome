'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  CouncilChatInterface, 
  Button,
  AgentAvatarStack,
} from '@clawesome/ui';
import { useCouncilStore, mockAgents } from '@/store/useCouncilStore';
import { DashboardResourceHeader } from '@/components/DashboardResourceHeader';
import { ChevronLeft, Settings, MoreHorizontal } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';

export default function CouncilDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { theme } = useUIStore();
    const isDark = theme === 'dark';
    const { sessions, addMessage, activeSessionId } = useCouncilStore();
    
    // In a real app, we'd fetch the session by ID
    // For now, we use our mock 'c1' session for any ID, or create a 'new' one
    const sessionId = (id as string) === 'new' ? 'new' : 'c1';
    const session = sessions[sessionId] || sessions['c1'];

    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = (content: string) => {
        // 1. Add User Message
        addMessage(sessionId, {
            role: 'user',
            content,
        });

        // 2. Mock Agent Deliberation Sequence
        setIsLoading(true);

        // First agent responds after 1s
        setTimeout(() => {
            const firstAgent = session.agents[0] || mockAgents[0];
            
            addMessage(sessionId, {
                role: 'assistant',
                agent: firstAgent,
                content: `I've analyzed your proposal: "${content}". From my perspective as ${firstAgent.role}, we need to ensure this doesn't create technical debt in the core engine.`,
            });

            // Second agent joins the deliberation after another 1.5s
            setTimeout(() => {
                const secondAgent = session.agents[1] || mockAgents[1];
                
                // Real-time check of message count from the store
                const latestSession = useCouncilStore.getState().sessions[sessionId] || useCouncilStore.getState().sessions['c1'];
                const currentCount = latestSession.messages.length;
                
                if (currentCount >= 19) {
                    setIsLoading(false);
                    // TODO: Remove this simulation logic once actual AI agents are integrated via the back-end council service.
                    addMessage(sessionId, {
                        role: 'assistant',
                        agent: secondAgent,
                        content: "TEST THREAD: This was just simulated",
                    });
                } else {
                    addMessage(sessionId, {
                        role: 'assistant',
                        agent: secondAgent,
                        content: `I agree with ${firstAgent.name}, but we also must prioritize the user's immediate experience. It's a delicate balance. What do you think, Commander?`,
                    });
                    setIsLoading(false);
                }
            }, 1500);
        }, 1000);
    };

    if (!session) {
        return (
            <div className="h-full flex items-center justify-center">
                <p className="text-slate-500 font-black uppercase tracking-widest">Neural Sync Failed: Session Not Found</p>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col gap-6">
            <DashboardResourceHeader
                title={session.title}
                badge="Active"
                statusLabel="Agents Sync:"
                statusValue={`${session.agents.length} Online`}
                statusColor="emerald"
                isCollection={false}
                backLink={{
                    label: "Return to Councils",
                    href: "/councils"
                }}
                renderRight={() => (
                    <div className="flex items-center gap-6">
                        <AgentAvatarStack 
                            agents={session.agents} 
                            onAddAgent={() => {}} 
                            size="md"
                        />
                        
                        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800/50" />

                        <div className="flex items-center gap-2">
                            <button className={cn(
                                "p-2.5 rounded-xl border transition-all hover:scale-105 active:scale-95 group",
                                isDark ? "bg-slate-900 border-slate-800 text-slate-500 hover:text-white" : "bg-white border-slate-100 text-slate-400 hover:text-slate-900 shadow-sm"
                            )}>
                                <Settings size={18} className="group-hover:rotate-90 transition-transform duration-500" />
                            </button>
                            <button className={cn(
                                "p-2.5 rounded-xl border transition-all hover:scale-105 active:scale-95",
                                isDark ? "bg-slate-900 border-slate-800 text-slate-500 hover:text-white" : "bg-white border-slate-100 text-slate-400 hover:text-slate-900 shadow-sm"
                            )}>
                                <MoreHorizontal size={18} />
                            </button>
                        </div>
                    </div>
                )}
            />

            <div className="flex-1 min-h-0 animate-in fade-in zoom-in-95 duration-700">
                <CouncilChatInterface
                    title={session.title}
                    agents={session.agents}
                    messages={session.messages}
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                    onClearChat={() => {}}
                    onAddAgent={() => {}}
                />
            </div>
        </div>
    );
}
