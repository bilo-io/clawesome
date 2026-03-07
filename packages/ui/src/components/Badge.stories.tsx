import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import React from 'react';

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'indigo', 'emerald', 'rose', 'amber', 'slate'],
    },
    dot: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Stable',
    variant: 'default',
  },
};

export const Operational: Story = {
  args: {
    children: 'Operational',
    variant: 'emerald',
    dot: true,
  },
};

export const Critical: Story = {
  args: {
    children: 'Critical',
    variant: 'rose',
    dot: true,
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex items-center gap-4 flex-wrap">
      <Badge {...args} variant="default">Default</Badge>
      <Badge {...args} variant="indigo">Deployment</Badge>
      <Badge {...args} variant="emerald">Healthy</Badge>
      <Badge {...args} variant="rose">Offline</Badge>
      <Badge {...args} variant="amber">Warning</Badge>
      <Badge {...args} variant="slate">Inactive</Badge>
    </div>
  ),
};
