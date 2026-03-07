import type { Meta, StoryObj } from '@storybook/react';
import { Terminal } from './Terminal';
import React from 'react';

const meta: Meta<typeof Terminal> = {
  title: 'Complex/Terminal',
  component: Terminal,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Terminal>;

export const Default: Story = {
  args: {
    title: 'Neural Terminal',
    subtitle: 'Direct CLI access to your agentic swarm.',
    initialHistory: [
      { type: 'output', text: 'Clawesome OS [Version 2.0.4]' },
      { type: 'output', text: '(c) 2026 Clawesome Corporation. All rights reserved.' },
      { type: 'success', text: 'CONNECTION: Established via neural-link-gateway-alpha' },
      { type: 'warn', text: 'SYSCALL: Potential latency detected in Node-AMS-12' },
    ],
  },
};

export const CustomCommands: Story = {
  args: {
    title: 'Agent Gateway',
    subtitle: 'Interactive session with Agent-01',
    initialHistory: [
      { type: 'output', text: 'AGENT-01: Listening for directives...' },
    ],
    onCommand: (cmd) => {
      if (cmd === 'ping') return [{ type: 'success', text: 'PONG: 12ms' }];
      if (cmd === 'status') return [{ type: 'output', text: 'STATUS: Operational (100%)' }];
      return [{ type: 'error', text: `Unknown directive: ${cmd}` }];
    },
  },
};

export const FullHeight: Story = {
  render: (args) => (
    <div className="h-[600px] w-full p-8 border border-slate-800 rounded-[3rem] bg-slate-900/20 shadow-2xl">
      <Terminal {...args} className="h-full" />
    </div>
  ),
  args: {
    ...Default.args,
  }
};
