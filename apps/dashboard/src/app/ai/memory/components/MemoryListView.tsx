import React from 'react';
import { motion } from 'framer-motion';
import { InitializeCard } from '@clawesome/ui';
import { MemoryListItem } from './MemoryListItem';

interface MemoryListViewProps {
  memories: any[];
  selectedIds: string[];
  theme: 'light' | 'dark';
  onToggleSelection: (id: string, e: React.MouseEvent) => void;
}

export const MemoryListView = ({
  memories,
  selectedIds,
  theme,
  onToggleSelection
}: MemoryListViewProps) => (
  <div className="space-y-4">
    <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
      <InitializeCard label="Initialize Memory Vault" onClick={() => {}} viewMode="list" />
    </motion.div>
    {memories.map((memory) => (
      <motion.div 
        layout 
        key={memory.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <MemoryListItem 
          memory={memory} 
          theme={theme} 
          selected={selectedIds.includes(memory.id)}
          onToggleSelection={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleSelection(memory.id, e);
          }}
        />
      </motion.div>
    ))}
  </div>
);
