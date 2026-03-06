# Antigravity Moon v2.0.3 Monorepo Implementation Plan

## 1. Architecture Overview

This project follows the **OpenClaw** pattern: a persistent "Gateway" (CLI + Server) that manages state, and a "Dashboard" (Web UI) that connects to it via WebSockets.

- **Manager:** moon v2.0.3
- **Gateway (The Brain):** Node.js + Commander.js + Fastify (Local CLI & WebSocket Server)
- **Dashboard (The Face):** React + Vite + Tailwind (Local Web UI)
- **Shared (The Glue):** TypeScript Project References (Shared Types/Utils)

---

## 2. Project Structure

```text
.
├── .moon/
│   ├── main.yml             # Global moon config
│   ├── toolchain.yml        # Node & TypeScript configuration
│   └── workspace.yml        # Project graph mapping
├── apps/
│   ├── gateway/             # CLI & WebSocket Server
│   │   ├── src/
│   │   │   ├── index.ts     # CLI entry (Commander)
│   │   │   └── server.ts    # Fastify + Socket.io
│   │   ├── moon.yml         # Tasks: dev, build, start
│   │   └── package.json
│   └── dashboard/           # UI Application
│       ├── src/
│       │   ├── hooks/       # useSocket connection hooks
│       │   └── App.tsx      # Main interface
│       ├── moon.yml         # Tasks: dev, build, preview
│       └── package.json
├── packages/
│   └── core/                # Shared logic & Type definitions
│       ├── src/
│       │   ├── types.ts     # Shared WebSocket event interfaces
│       │   └── constants.ts # Default ports (e.g., 18789)
│       ├── moon.yml
│       └── package.json
├── moon.yml                 # Root-level tasks (e.g., install)
└── package.json             # Root workspace config
```

## 3. The Tech Stack Details

Primary (TypeScript)

| Component     | Library   | Purpose                                             |
| :------------ | :-------- | :-------------------------------------------------- |
| CLI Framework | commander | Handles commands like antigravity start or config.  |
| Server Engine | fastify   | Extremely low-overhead server to host the UI & API. |
| Real-time     | socket.io | Manages the duplex link between CLI and UI.         |
| UI Framework  | React     | For building the agent's interaction canvas.        |
| State Sync    | Zustand   | Lightweight state management for the UI.            |


4. Configuration Snippets
.moon/toolchain.yml

```yaml
node:
  version: '22.0.0'
  packageManager: 'pnpm'
  inferTasksFromScripts: true

typescript:
  routeOutDirToCache: true
  syncProjectReferences: true
```

apps/gateway/moon.yml

```yaml
type: 'application'
stack: 'node'
dependsOn:
  - 'core'
tasks:
  dev:
    command: 'ts-node-dev src/index.ts start'
    local: true
  build:
    command: 'tsup src/index.ts --format cjs,esm --dts'
    inputs:
      - 'src/**/*'
```

apps/dashboard/moon.yml

```yaml
type: 'application'
stack: 'node'
dependsOn:
  - 'core'
tasks:
  dev:
    command: 'vite'
    local: true
  build:
    command: 'vite build'
    inputs:
      - 'src/**/*'
```

packages/core/moon.yml

```yaml
type: 'library'
stack: 'node'
tasks:
  build:
    command: 'tsc -b'
    inputs:
      - 'src/**/*'
```

5. Implementation Steps

# Antigravity x Moon v2.0.3: Bun-Native Next.js Monorepo

## Phase 1: The Foundation (Monorepo Setup)
1. **Initialize Moon:** Run `bunx @moonrepo/cli init` in your root directory.
2. **Configure Toolchains:** Create/Edit `.moon/toolchains.yml` (Note the plural "s" for v2).
   ```yaml
   javascript:
     packageManager: 'bun'
   bun:
     version: '1.2.0' # Aligns with 2026 standards
   typescript:
     syncProjectReferences: true
```

3. **Workspaces**: In package.json, define your Bun workspaces:

```json
{
  "name": "antigravity-monorepo",
  "private": true,
  "workspaces": ["apps/*", "packages/*"]
}
```

## Phase 2: The Gateway (Bun CLI + Server)
The CLI: In apps/gateway/src/index.ts, use commander for the "nightclaw" commands.

The Runtime: Use Bun.serve() in apps/gateway/src/server.ts. It handles WebSockets natively and significantly faster than Node.js.

Task Config: In apps/gateway/moon.yml:

```yaml
type: 'application'
tasks:
  start:
    command: 'bun run src/index.ts start'
    local: true
  dev:
    command: 'bun run src/index.ts dev'
    local: true
```

## Phase 3: The Dashboard (Next.js + Tailwind)
Scaffold: Run bun create next-app apps/dashboard --typescript --tailwind --eslint.

Real-time Integration: Use lucide-react for the sidebar icons and a custom useSocket hook to connect to ws://localhost:18789.

Kanban View: Implement a server-state-synced Kanban board using Zustand to track sub-agent transitions (Queued -> Active -> Completed).

Task Config: In apps/dashboard/moon.yml:

```yaml
type: 'application'
stack: 'frontend'
tasks:
  dev:
    command: 'next dev'
    local: true
```

## Phase 4: The Glue (Shared Core)

1. Shared Types: Create packages/core/src/index.ts to export interfaces for:
- AgentSession: History and context.
- SubAgentTask: Kanban board items.
- GatewayEvent: WebSocket message schemas.

2. Linking: Run `bun add @antigravity/core --workspace` inside your app folders to link them instantly.

## Phase 5: Verification & Orchestration

1. The Build: Run `moon build` to verify all TS projects and Next.js assets compile correctly.
2. The Multi-Run: Run `moon run :dev` (starts both the Gateway and the Next.js Dashboard).
3. The Handshake:

- [ ] Terminal logs: "Gateway (Bun) listening on 18789"
- [ ] Browser: localhost:3000 shows "Connected to Nightclaw" status icon.
- [ ] Interaction: Send a message in Next.js; see the Bun Gateway process it in the terminal.

## Phase 6: DeploymentVerification Checklist

### Automated Tasks (Moon)
* **Run All:** `moon run :dev`
* **Expected (Dashboard):** Next.js starts on `http://localhost:3000`.
* **Expected (Gateway):** Bun logs "Gateway listening on ws://localhost:18789".

### Manual Verification
* **Connection:** Open `localhost:3000`. The UI should show a "Connected" status.
* **Kanban Pulse:** Trigger a dummy event from the CLI; verify the Sub-Agent card appears on the Kanban board instantly.
* **Chat Sync:** Send a message in the Next.js UI and verify it is received by the Bun Gateway process in your terminal.