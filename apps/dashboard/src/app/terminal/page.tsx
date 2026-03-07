// apps/dashboard/src/app/terminal/page.tsx
'use client';

import React from 'react';
import { Terminal, TerminalLine } from '@clawesome/ui';

export default function TerminalPage() {
  const initialHistory: TerminalLine[] = [
    { type: 'output', text: 'Clawesome OS [Version 2.0.4.551]' },
    { type: 'output', text: '(c) 2026 Clawesome Corp. All rights reserved.' },
    { type: 'success', text: 'Neural gateway connected to 127.0.0.1:4000 [LOCAL]' },
    { type: 'output', text: 'Type "help" to see available commands or "swarm --list" to view active agents.' },
    { type: 'output', text: '' },
  ];

  const handleCommand = (cmd: string): TerminalLine[] => {
    const response: TerminalLine[] = [];
    if (cmd === 'help') {
      response.push({ type: 'output', text: 'AVAILABLE COMMANDS:' });
      response.push({ type: 'output', text: '  swarm      Manage active agent swarms' });
      response.push({ type: 'output', text: '  gateway    Configure local/cloud endpoints' });
      response.push({ type: 'output', text: '  clear      Clear the terminal history' });
      response.push({ type: 'output', text: '  whoami     Display current user profile info' });
      response.push({ type: 'output', text: '  doctor     Run neural health diagnostics' });
    } else if (cmd === 'whoami') {
      response.push({ type: 'success', text: 'USER ACTIVE: BiloDev' });
      response.push({ type: 'output', text: 'CLEARANCE: S3 [LEVEL_ORCHESTRATOR]' });
    } else if (cmd === 'doctor') {
      response.push({ type: 'warn', text: '[DIAGNOSTIC] SCALABILITY_OVER_LIMIT: Local node RAM restricted to 16GB' });
      response.push({ type: 'success', text: '[DIAGNOSTIC] NEURAL_SYNC: 100% SUCCESS' });
    } else {
      response.push({ type: 'error', text: `Command not found: ${cmd}. Type "help" for a list of available commands.` });
    }
    return response;
  };

  return (
    <div className="h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Terminal 
        initialHistory={initialHistory}
        onCommand={handleCommand}
      />
    </div>
  );
}
