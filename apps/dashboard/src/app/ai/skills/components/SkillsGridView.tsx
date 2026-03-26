import React from 'react';
import { motion } from 'framer-motion';
import { SkillCard } from '@/components/SkillCard';
import { InitializeCard } from '@clawesome/ui';

interface Skill {
  id: string;
  name: string;
  description: string;
  icon?: string;
  category?: string;
}

interface SkillsGridViewProps {
  skills: Skill[];
  isSkillImported: (name: string) => boolean;
  selectedIds: string[];
  onToggleSelection: (id: string) => void;
  initializeLabel: string;
}

export const SkillsGridView = ({
  skills,
  isSkillImported,
  selectedIds,
  onToggleSelection,
  initializeLabel
}: SkillsGridViewProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <InitializeCard 
        label={initializeLabel} 
        onClick={() => {}} 
        viewMode="grid" 
      />
    </motion.div>
    {skills.map((skill) => (
      <motion.div
        layout
        key={skill.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <SkillCard 
          skill={skill as any} 
          viewMode="grid" 
          isImported={isSkillImported(skill.name)}
          selected={selectedIds.includes(skill.id)}
          onToggleSelection={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleSelection(skill.id);
          }}
        />
      </motion.div>
    ))}
  </div>
);
