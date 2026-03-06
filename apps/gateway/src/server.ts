import { DEFAULT_PORT } from '@antigravity/core';
import { Server, ServerWebSocket } from "bun";

export function startServer(port = DEFAULT_PORT) {
  console.log(`Gateway (Bun) listening on ws://localhost:${port}`);
  
  return Bun.serve({
    port,
    fetch(req: Request, server: Server<any>) {
      if (server.upgrade(req)) {
        return; // upgrade successful
      }
      return new Response("Not a websocket request", { status: 400 });
    },
    websocket: {
      open(ws: ServerWebSocket<unknown>) {
        console.log("Client connected");
        ws.send(JSON.stringify({ type: 'connected', payload: { status: 'ok' } }));

        // Start broadcasting mock telemetry
        const mockInterval = setInterval(() => {
          const telemetryData = {
            type: 'telemetry',
            payload: {
              cpu: Math.floor(Math.random() * 100),
              ram: Math.floor(Math.random() * 100),
              network: {
                down: (Math.random() * 20).toFixed(1),
                up: (Math.random() * 5).toFixed(1)
              },
              timestamp: Date.now()
            }
          };
          ws.send(JSON.stringify(telemetryData));
        }, 2000);

        (ws as any)._mockInterval = mockInterval;
      },
      message(ws: ServerWebSocket<unknown>, message: string | Buffer) {
        console.log(`Received: ${message}`);
        ws.send(JSON.stringify({ type: 'echo', payload: message }));
      },
      close(ws: ServerWebSocket<unknown>) {
        console.log("Client disconnected");
        clearInterval((ws as any)._mockInterval);
      },

    },
  });
}
