import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';
import React from 'react';

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    hoverable: { control: 'boolean' },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <h3 className="text-sm font-black uppercase tracking-widest text-white">System Logs</h3>
        </CardHeader>
        <CardBody className="space-y-2">
          <p className="text-xs text-slate-400 font-mono tracking-tight">2026-03-07: Mission NC-01 initialized.</p>
          <p className="text-xs text-slate-400 font-mono tracking-tight">2026-03-07: Neural sync complete.</p>
        </CardBody>
        <CardFooter className="flex justify-between items-center">
          <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic">Node A-12</span>
          <button className="text-[10px] text-white hover:text-indigo-400 font-black uppercase tracking-widest transition-colors">View All</button>
        </CardFooter>
      </>
    ),
    padding: 'md',
    hoverable: true,
  },
};

export const Simple: Story = {
  args: {
    children: <p className="text-slate-300 text-xs">A simple card with some textual content and the default padding.</p>,
  },
};
