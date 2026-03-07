import type { Meta, StoryObj } from '@storybook/react';
import { AgentCard } from './AgentCard';
import React from 'react';

const meta: Meta<typeof AgentCard> = {
  title: 'Dashboard/AgentCard',
  component: AgentCard,
  tags: ['autodocs'],
  argTypes: {
    viewMode: {
      control: 'select',
      options: ['grid', 'table'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AgentCard>;

const mockAgent = {
  id: 'a1-b2-c3-d4-e5',
  name: 'Senior Architect',
  title: 'System Design // Core',
  createdAt: 1705276800000,
  profilePicture: 'https://picsum.photos/seed/agent1/200/200',
};

export const Grid: Story = {
  args: {
    agent: mockAgent,
    viewMode: 'grid',
  },
  render: (args) => (
    <div className="w-80">
      <AgentCard {...args} />
    </div>
  ),
};

export const Table: Story = {
  args: {
    agent: {
      ...mockAgent,
      name: 'QA Automator',
      title: 'Testing // Edge Cases',
      profilePicture: 'https://picsum.photos/seed/agent2/200/200',
    },
    viewMode: 'table',
  },
};

export const NoProfilePicture: Story = {
  args: {
    agent: {
      ...mockAgent,
      profilePicture: '',
    },
    viewMode: 'grid',
  },
  render: (args) => (
    <div className="w-80">
      <AgentCard {...args} />
    </div>
  ),
};
