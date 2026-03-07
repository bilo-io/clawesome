import type { Meta, StoryObj } from '@storybook/react';
import { DashboardResourceHeader } from './DashboardResourceHeader';
import { Button } from './Button';
import { Globe, Plus } from 'lucide-react';
import React from 'react';

const meta: Meta<typeof DashboardResourceHeader> = {
  title: 'Complex/DashboardResourceHeader',
  component: DashboardResourceHeader,
  tags: ['autodocs'],
  argTypes: {
    isCollection: { control: 'boolean' },
    statusColor: {
      control: 'select',
      options: ['indigo', 'emerald'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DashboardResourceHeader>;

export const Default: Story = {
  args: {
    title: 'Agents Swarm',
    description: 'Management system for your autonomous AI workforce. Control agent lifecycles and monitor swarm performance.',
    badge: 'AG-01',
    statusLabel: 'Operational Status:',
    statusValue: 'Optimal',
    statusColor: 'emerald',
    isCollection: true,
    pathname: '/agents',
    renderRight: (
      <Button variant="primary" size="sm" icon={<Plus size={14} />}>
        Deploy Agent
      </Button>
    ),
  },
};

export const SingleResource: Story = {
  args: {
    title: 'Neural Gateway',
    description: 'Direct interface with the core logic hub.',
    badge: 'SYS-MAX',
    statusLabel: 'System Integrity:',
    statusValue: 'Secured',
    statusColor: 'indigo',
    isCollection: false,
    pathname: '/system/gateway',
    renderRight: (
      <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-800">
        <Globe size={14} />
        Live View
      </button>
    ),
  },
};

export const WithBackLink: Story = {
  args: {
    ...Default.args,
    backLink: { label: 'Back to Dashboard', href: '/dashboard' },
  },
};
