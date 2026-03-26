import { DEFAULT_PORT } from '@antigravity/core';
import { Server, ServerWebSocket } from "bun";
import path from "path";
import fs from "fs";

export function startServer(port = DEFAULT_PORT) {
  // Base path detection for sidecar mode
  const isBinary = !!process.env.BUN_BINARY_TARGET;
  const exePath = process.execPath;
  const baseDir = isBinary ? path.dirname(exePath) : process.cwd();
  
  // Look for agents in potential locations
  const potentialAgentPaths = [
    path.join(baseDir, 'agents'),
    path.join(baseDir, '../Resources/agents'), // macOS Bundle
    path.join(process.cwd(), 'agents'),
    path.join(process.cwd(), '../../../agents'), // Dev workspace
  ];

  let agentsPath = potentialAgentPaths.find(p => fs.existsSync(p));

  console.log(`[SYS] Clawesome Gateway ${isBinary ? '(Binary)' : '(Source)'} mode`);
  console.log(`[SYS] Executing from: ${exePath}`);
  console.log(`[SYS] Agents Path: ${agentsPath || 'NOT FOUND'}`);
  console.log(`[SYS] Listening on ws://localhost:${port}`);
  
  return Bun.serve({
    port,
    fetch(req: Request, server: Server<any>) {
      const url = new URL(req.url);
      console.log(`[HTTP] ${req.method} ${url.pathname}`);
      
      // Handle HTTP endpoints for the "Vertical Slice"
      if (url.pathname === '/health') {
        return new Response(JSON.stringify({ 
          status: 'ok', 
          timestamp: Date.now(),
          mode: isBinary ? 'binary' : 'source',
          agents: agentsPath || 'none'
        }), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }
      
      if (url.pathname === '/version') {
        return new Response(JSON.stringify({ version: '0.1.0', platform: process.platform }), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }

      if (server.upgrade(req)) {
        return; // upgrade successful
      }
      return new Response("Not a websocket request", { status: 400 });
    },
    websocket: {
      open(ws: ServerWebSocket<unknown>) {
        console.log("[WS] Client connected");
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
        }, 5000);

        (ws as any)._mockInterval = mockInterval;
      },
      message(ws: ServerWebSocket<unknown>, message: string | Buffer) {
        console.log(`[WS] Message Received: ${message}`);
        
        try {
          const data = JSON.parse(message.toString());
          
          if (data.type === 'command') {
            console.log(`[EXEC] Executing: ${data.content}`);
            // In a real implementation, this would spawn a pty
            // For the vertical slice, we'll return simulated output
            ws.send(JSON.stringify({
              type: 'terminal_output',
              payload: {
                text: `clawesome-cli: processing ${data.content}...\n`,
                type: 'output'
              }
            }));
            
            setTimeout(() => {
              ws.send(JSON.stringify({
                type: 'terminal_output',
                payload: {
                  text: `[NC-CORE] Command executed successfully on local node.\n`,
                  type: 'success'
                }
              }));
            }, 500);
            return;
          }

          if (data.type === 'chat' || data.type === 'message') {
            const randomPhrases = [
              "Neural link stable. Processing instruction...",
              "Vector analysis complete. Proceeding with next phase.",
              "I've synchronized with the local gateway. All systems operational.",
              "Request acknowledged. Operating within defined constraints.",
              "Data packet RECEIVED. Optimizing response weights...",
              "Clawesome OS is fully responsive to your commands."
            ];
            
            const responsePhrase = randomPhrases[Math.floor(Math.random() * randomPhrases.length)];
            
            ws.send(JSON.stringify({ 
              type: 'chat_response', 
              payload: { 
                content: responsePhrase,
                original: data.content
              } 
            }));
          }
        } catch (e) {
          // Fallback for non-JSON messages
          ws.send(JSON.stringify({ type: 'echo', payload: message.toString() }));
        }
      },
      close(ws: ServerWebSocket<unknown>) {
        console.log("Client disconnected");
        clearInterval((ws as any)._mockInterval);
      },

    },
  });
}
