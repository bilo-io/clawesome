// apps/dashboard/src/components/FloatingTerminal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Terminal } from '@clawesome/ui';
import { useUIStore } from '@/store/useUIStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSocket } from '@/hooks/useSocket';

export const FloatingTerminal = () => {
  const { theme, isFloatingTerminalOpen, setFloatingTerminalOpen } = useUIStore();
  const [isMaximized, setIsMaximized] = useState(false);
  const { isConnected, lastMessage, sendMessage } = useSocket();
  const [terminalHistory, setTerminalHistory] = useState<any[]>([
    { type: 'success', text: 'NEURAL LINK ESTABLISHED // MIRROR_STREAM ACTIVE' },
    { type: 'output', text: 'Type commands to interact with the local gateway process.\n' }
  ]);

  useEffect(() => {
    if (lastMessage && lastMessage.type === 'terminal_output') {
      setTerminalHistory(prev => [...prev, lastMessage.payload]);
    }
  }, [lastMessage]);

  if (!isFloatingTerminalOpen) return null;

  const handleCommand = (cmd: string) => {
    sendMessage({ type: 'command', content: cmd });
    return []; // The response will come via WebSocket
  };

  return (
    <AnimatePresence>
      {isFloatingTerminalOpen && (
        <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center">
          {/* Backdrop Blur Overlay (Only when maximized) */}
          <AnimatePresence>
            {isMaximized && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/20 backdrop-blur-3xl pointer-events-auto"
                onClick={() => setIsMaximized(false)}
              />
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: '100%', scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              width: isMaximized ? 'calc(100% - 32px)' : 650,
              height: isMaximized ? 'calc(100% - 32px)' : 450,
              bottom: isMaximized ? 'auto' : 112,
              right: isMaximized ? 'auto' : 32,
              position: isMaximized ? 'relative' : 'fixed' as any
            }}
            exit={{ opacity: 0, y: '100%', scale: 0.95 }}
            transition={{ 
              y: { type: 'spring', damping: 25, stiffness: 200 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 },
              default: { duration: 0 } 
            }}
            className={cn(
              "overflow-hidden shadow-2xl flex flex-col pointer-events-auto z-[101]",
              isMaximized 
                ? "rounded-[1.5rem]" 
                : theme === 'dark' 
                  ? "rounded-[1.5rem] bg-slate-950 border-slate-800" 
                  : "rounded-[1.5rem] bg-white border-slate-200"
            )}
          >
            <Terminal 
              title="Mirror Terminal" 
              subtitle="Bidirectional I/O with Gateway."
              onCommand={handleCommand}
              initialHistory={terminalHistory}
              showChrome={false}
              isConnected={isConnected}
              onClose={() => setFloatingTerminalOpen(false)}
              onMaximize={() => setIsMaximized(!isMaximized)}
              isMaximized={isMaximized}
              className="h-full space-y-0"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
