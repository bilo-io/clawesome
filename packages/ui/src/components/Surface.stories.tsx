import type { Meta, StoryObj } from '@storybook/react';
import { Surface } from './Surface';
import React from 'react';

const meta: Meta<typeof Surface> = {
  title: 'Primitives/Surface',
  component: Surface,
  tags: ['autodocs'],
  argTypes: {
    material: {
      control: 'select',
      options: ['paper', 'glass', 'status', 'neon'],
    },
    color: {
      control: 'select',
      options: ['indigo', 'violet', 'cyan', 'emerald', 'rose', 'amber', 'sky', 'fuchsia'],
    },
    animate: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Surface>;

export const Paper: Story = {
  args: {
    children: <div className="h-32 flex items-center justify-center">Paper Material</div>,
    material: 'paper',
  },
};

export const Glass: Story = {
  args: {
    children: <div className="h-32 flex items-center justify-center">Glass Material (Frosted)</div>,
    material: 'glass',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const Status: Story = {
  args: {
    children: <div className="h-32 flex items-center justify-center font-black">Status Material (Hover)</div>,
    material: 'status',
    color: 'emerald',
  },
};

export const Neon: Story = {
  args: {
    children: (
      <div className="h-32 flex flex-col items-center justify-center">
        <span className="font-black italic text-xl">NEON CORE</span>
        <span className="text-[10px] opacity-60 uppercase tracking-widest font-bold">Active Protocol</span>
      </div>
    ),
    material: 'neon',
    color: 'fuchsia',
  },
};

export const Gallery: Story = {
  render: (args) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-12">
      <Surface {...args} material="paper">
        <h4 className="font-black mb-4 uppercase">Paper Surface</h4>
        <p className="text-xs opacity-60 leading-relaxed">The default material for standard information cards and panels. Provides clean elevation and subtle borders.</p>
      </Surface>
      <Surface {...args} material="glass">
        <h4 className="font-black mb-4 uppercase">Glass Surface</h4>
        <p className="text-xs opacity-60 leading-relaxed">Frosted glass effect with high-fidelity blur. Best used over dynamic or colorful backgrounds.</p>
      </Surface>
      <Surface {...args} material="status" color="emerald">
        <h4 className="font-black mb-4 uppercase">Status Surface</h4>
        <p className="text-xs opacity-60 leading-relaxed">Reactive surface that glows with a semantic color on hover. Perfect for operational indicators.</p>
      </Surface>
      <Surface {...args} material="neon" color="indigo">
        <h4 className="font-black mb-4 uppercase">Neon Surface</h4>
        <p className="text-xs opacity-60 leading-relaxed">Premium highlighting material with intense outer glows and vibrant borders. Use for primary CTAs.</p>
      </Surface>
    </div>
  ),
};
