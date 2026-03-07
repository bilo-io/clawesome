import type { Meta, StoryObj } from '@storybook/react';
import Dashboard from './page';
import React from 'react';

const meta: Meta<typeof Dashboard> = {
  title: 'Pages/Dashboard',
  component: Dashboard,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Dashboard>;

export const Default: Story = {
  render: () => (
    <div className="bg-slate-950 min-h-screen p-8">
      <Dashboard />
    </div>
  ),
};
