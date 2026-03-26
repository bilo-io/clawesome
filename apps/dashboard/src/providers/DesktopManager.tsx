"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface DesktopContextType {
  isDesktop: boolean;
  gatewayStatus: 'starting' | 'ready' | 'error' | 'none';
  gatewayPort: number | null;
}

const DesktopContext = createContext<DesktopContextType>({
  isDesktop: false,
  gatewayStatus: 'none',
  gatewayPort: null,
});

export const useDesktop = () => useContext(DesktopContext);

export function DesktopProvider({ children }: { children: React.ReactNode }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [gatewayStatus, setGatewayStatus] = useState<'starting' | 'ready' | 'error' | 'none'>('none');
  const [gatewayPort, setGatewayPort] = useState<number | null>(null);

  useEffect(() => {
    async function initTauri() {
      if (typeof window === 'undefined') return;
      
      const isTauri = cd /Users/bilolwabona/BiloDev/clawesome/apps/dashboard(window as any).__TAURI_INTERNALS__;
      setIsDesktop(isTauri);

      if (isTauri) {
        setGatewayStatus('starting');
        try {
          // Dynamic import to avoid SSR errors
          const { Command: ShellCommand } = await import('@tauri-apps/plugin-shell');
          
          const port = 17871;
          const sidecar = ShellCommand.sidecar('binaries/clawesome-gateway', ['start', '--port', port.toString()]);
          
          sidecar.on('close', (data: any) => {
            console.log(`Gateway sidecar closed with code ${data.code}`);
            setGatewayStatus('error');
          });

          sidecar.on('error', (error: any) => {
            console.error('Gateway sidecar error:', error);
            setGatewayStatus('error');
          });

          const child = await sidecar.spawn();
          console.log(`Gateway sidecar spawned with PID: ${child.pid}`);
          
          setGatewayPort(port);
          setGatewayStatus('ready');
        } catch (error) {
          console.error('Failed to spawn gateway sidecar:', error);
          setGatewayStatus('error');
        }
      }
    }

    initTauri();
  }, []);

  return (
    <DesktopContext.Provider value={{ isDesktop, gatewayStatus, gatewayPort }}>
      {children}
    </DesktopContext.Provider>
  );
}
