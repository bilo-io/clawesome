import type { Meta, StoryObj } from '@storybook/react';
import { SystemVitality } from './SystemVitality';
import React from 'react';

const meta: Meta<typeof SystemVitality> = {
  title: 'Dashboard/SystemVitality',
  component: SystemVitality,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SystemVitality>;

export const Default: Story = {
  render: () => (
    <div className="max-w-4xl">
      <SystemVitality />
    </div>
  ),
};
