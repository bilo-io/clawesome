import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Zap } from 'lucide-react';
import React from 'react';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'success', 'outline'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Action',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Action',
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Action',
    variant: 'ghost',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger Action',
    variant: 'danger',
  },
};

export const Success: Story = {
  args: {
    children: 'Success Action',
    variant: 'success',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Action',
    variant: 'outline',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Execute Plan',
    icon: <Zap size={14} />,
    variant: 'primary',
  },
};

export const Loading: Story = {
  args: {
    children: 'Processing',
    isLoading: true,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4 flex-wrap">
      <Button {...args} size="xs">Extra Small</Button>
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium / Default</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
};
