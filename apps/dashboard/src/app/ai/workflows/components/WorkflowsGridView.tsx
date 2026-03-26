import React from 'react';
import { motion } from 'framer-motion';
import { WorkflowCard, InitializeCard } from '@clawesome/ui';

interface Workflow {
  id: string;
  name: string;
  status: any;
  lastRun?: number;
  [key: string]: any;
}

interface WorkflowsGridViewProps {
  workflows: any[];
  myWorkflows: any[];
  activeTab: 'my' | 'marketplace';
  selectedIds: string[];
  onToggleSelection: (id: string) => void;
  onToggleStatus: (e: React.MouseEvent, id: string, status: string) => void;
  onInstall: (workflow: any) => void | Promise<void>;
  onClick: (workflow: any) => void;
}

export const WorkflowsGridView = ({
  workflows,
  myWorkflows,
  activeTab,
  selectedIds,
  onToggleSelection,
  onToggleStatus,
  onInstall,
  onClick
}: WorkflowsGridViewProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
      <InitializeCard 
        label={activeTab === 'marketplace' ? "Hire Agent with Workflow" : "Initialize Workflow"} 
        onClick={() => {}} 
        viewMode="grid" 
      />
    </motion.div>
    {workflows.map((workflow, idx) => (
      <motion.div
        layout
        key={workflow.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ delay: idx * 0.05 }}
      >
        <WorkflowCard 
          workflow={workflow as any}
          viewMode="grid"
          isMarketplace={activeTab === 'marketplace'}
          isImported={myWorkflows.some(w => w.name === workflow.name)}
          selected={selectedIds.includes(workflow.id)}
          onToggleSelection={() => onToggleSelection(workflow.id)}
          onToggleStatus={(e) => onToggleStatus(e, workflow.id, workflow.status)}
          onInstall={() => onInstall(workflow)}
          onClick={() => onClick(workflow)}
        />
      </motion.div>
    ))}
  </div>
);
