import React from 'react';
import { motion } from 'framer-motion';
import { AgentCard } from '@/components/AgentCard';
import { InitializeCard } from '@clawesome/ui';

interface Agent {
  id: string;
  name: string;
  title?: string;
  status?: string;
  avatar?: string;
}

interface AgentsGridViewProps {
  agents: Agent[];
  onDelete: (id: string) => void;
  onAgentClick: (agent: Agent) => void;
  isSelected: (id: string) => boolean;
  onToggleSelection: (id: string) => void;
}

export const AgentsGridView = ({
  agents,
  onDelete,
  onAgentClick,
  isSelected,
  onToggleSelection
}: AgentsGridViewProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <InitializeCard 
        label="Initialize Agent" 
        onClick={() => {}} 
        viewMode="grid" 
      />
    </motion.div>

    {agents.map((agent) => (
      <motion.div
        layout
        key={agent.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <AgentCard 
          agent={agent as any} 
          viewMode="grid"
          onDelete={onDelete}
          onClick={() => onAgentClick(agent)}
          selected={isSelected(agent.id)}
          onToggleSelection={(e: React.MouseEvent) => {
            e.stopPropagation();
            onToggleSelection(agent.id);
          }}
        />
      </motion.div>
    ))}
  </div>
);
