import type { Meta, StoryObj } from '@storybook/react';
import { Input, Textarea, SearchInput } from './Input';
import { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import React from 'react';

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter a name...',
    icon: <User size={14} />,
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    icon: <Lock size={14} />,
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'user@example.com',
    icon: <Mail size={14} />,
    error: 'Identification failed: invalid neural signature'
  },
};

export const TextAreaStory: Story = {
  render: () => (
    <Textarea 
      label="Agent Biography" 
      placeholder="Brief description of the agent's core capabilities..." 
    />
  ),
};

export const SearchStory: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return (
      <SearchInput 
        value={val} 
        onChange={setVal} 
        placeholder="Filter by agent id..." 
      />
    );
  },
};
