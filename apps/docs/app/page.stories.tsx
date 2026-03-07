import type { Meta, StoryObj } from '@storybook/react';
import Home from './page';
import React from 'react';

const meta: Meta<typeof Home> = {
  title: 'Pages/Home',
  component: Home,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Home>;

export const Default: Story = {
  render: () => (
    <div className="bg-white dark:bg-slate-950 min-h-screen p-12">
      <div className="max-w-4xl mx-auto">
        <Home />
      </div>
    </div>
  ),
};
