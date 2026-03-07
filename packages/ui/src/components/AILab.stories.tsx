import type { Meta, StoryObj } from '@storybook/react';
import { AILab } from './AILab';
import { useState } from 'react';
import React from 'react';

const meta: Meta<typeof AILab> = {
  title: 'Complex/AILab',
  component: AILab,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    showThoughts: { control: 'boolean' },
    chatMode: {
      control: 'select',
      options: ['context', 'terminal', 'general'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AILab>;

const initialTabs = [
  {
    id: 1,
    title: 'Neural Sync',
    messages: [
      { role: 'assistant', content: 'Protocol initialized. How can I assist with your deployment today?' },
      { role: 'user', content: 'Scan the current workspace for security vulnerabilities.' },
      { role: 'assistant', content: 'Scanning... I have identified 4 high-priority patches required in the @clawesome/core module.' },
    ],
  },
  {
    id: 2,
    title: 'Code Refactor',
    messages: [
      { role: 'user', content: 'Optimize the React.useMemo hooks in the dashboard component.' },
    ],
  },
];

const mockThoughts = [
  { timestamp: '14:20:01', content: 'Analyzing AST for dashboard.tsx', type: 'default' },
  { timestamp: '14:20:05', content: 'Identified 12 memoization candidates', type: 'default' },
  { timestamp: '14:20:12', content: 'Neural synthesis complete: Success', type: 'success' },
];

export const Interactive: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);
    const [showThoughts, setShowThoughts] = useState(args.showThoughts);
    const [activeTab, setActiveTab] = useState(0);
    const [chatMode, setChatMode] = useState(args.chatMode || 'general');

    return (
      <div className="h-[600px] w-full bg-slate-900/10 rounded-[3rem] p-12 overflow-hidden border border-dashed border-slate-500/20">
        <p className="text-center text-slate-500 font-black uppercase tracking-widest text-[10px] mb-8">
          Click the messenger bubble in the bottom right to toggle the AILab.
        </p>
        <AILab 
          {...args} 
          isOpen={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          showThoughts={showThoughts}
          onToggleThoughts={() => setShowThoughts(!showThoughts)}
          tabs={initialTabs as any}
          activeTab={activeTab}
          onTabSelect={setActiveTab}
          onAddTab={() => {}}
          onSendMessage={(msg) => console.log('Sending:', msg)}
          thoughts={mockThoughts as any}
          chatMode={chatMode}
          onChatModeChange={setChatMode}
        />
      </div>
    );
  },
  args: {
    isOpen: false,
    showThoughts: false,
    chatMode: 'general',
  },
};

export const TerminalMode: Story = {
  args: {
    ...Interactive.args,
    isOpen: true,
    chatMode: 'terminal',
  },
  render: Interactive.render,
};
