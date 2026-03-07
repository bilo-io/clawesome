import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { LayoutGrid, List, FileCode, Settings } from 'lucide-react';
import React from 'react';

const meta: Meta<typeof Tabs> = {
  title: 'Primitives/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['pills', 'underline', 'boxed'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const mockTabs = [
  { id: 't1', label: 'Dashboard', icon: <LayoutGrid size={14}/> },
  { id: 't2', label: 'Agents', icon: <List size={14}/>, badge: 12 },
  { id: 't3', label: 'Source', icon: <FileCode size={14}/> },
  { id: 't4', label: 'Settings', icon: <Settings size={14}/> },
];

export const Pills: Story = {
  args: {
    tabs: mockTabs,
    variant: 'pills',
  },
};

export const Underline: Story = {
  args: {
    tabs: mockTabs,
    variant: 'underline',
  },
};

export const Boxed: Story = {
  args: {
    tabs: mockTabs,
    variant: 'boxed',
  },
  render: (args) => (
    <div className="max-w-md">
      <Tabs {...args} />
    </div>
  ),
};
