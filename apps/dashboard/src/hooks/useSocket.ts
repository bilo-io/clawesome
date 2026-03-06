// apps/dashboard/src/hooks/useSocket.ts
import { useEffect, useState, useCallback } from 'react';
import { DEFAULT_PORT } from '@antigravity/core';

export function useSocket(url = `ws://localhost:${DEFAULT_PORT}`) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('Connected to Gateway');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setLastMessage(data);
      } catch (e) {
        setLastMessage(event.data);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from Gateway');
      setIsConnected(false);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = useCallback((message: any) => {
    if (socket && isConnected) {
      socket.send(JSON.stringify(message));
    }
  }, [socket, isConnected]);

  return { isConnected, lastMessage, sendMessage };
}
