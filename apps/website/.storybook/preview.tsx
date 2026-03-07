import type { Preview } from '@storybook/nextjs-vite'
import React from 'react'
import { ThemeProvider } from '@clawesome/ui'
import '../app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#020617' },
        { name: 'light', value: '#f8fafc' },
      ],
    },
    a11y: {
      test: 'todo'
    }
  },
  decorators: [
    (Story) => (
      <ThemeProvider initialTheme="dark" initialGlow={50}>
        <div className="bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white min-h-screen transition-colors duration-500">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;