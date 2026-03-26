import React from 'react';
import { motion } from 'framer-motion';
import { InitializeCard } from '@clawesome/ui';
import { MemoryCard } from './MemoryCard';

interface MemoryGridViewProps {
  memories: any[];
  selectedIds: string[];
  theme: 'light' | 'dark';
  onToggleSelection: (id: string, e: React.MouseEvent) => void;
}

export const MemoryGridView = ({
  memories,
  selectedIds,
  theme,
  onToggleSelection
}: MemoryGridViewProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
    <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
      <InitializeCard label="Initialize Memory Vault" onClick={() => {}} viewMode="grid" />
    </motion.div>
    {memories.map((memory) => (
      <motion.div 
        layout 
        key={memory.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <MemoryCard 
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
