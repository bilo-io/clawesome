# 🛸 Antigravity Workspace: Source-First (Maverick AI)

Managed by moon `v2.0.0-rc.2` (via proto)

## 🏗 Repository Layout

- **Global Context**: `. (Root)`
- **Game Engine**: `./src/ue5-plugin` (C++/Slate Plugin)
- **AI Infrastructure**: `./src/mcp-server` (Python FastMCP, RAG, YouTube Sync)
- **Applications**: `./src/apps` (Next.js / Frontend Dashboard)
- **Shared Utilities**: `./src/shared` (Zod/JSON Schemas for MCP Tools)
- **APIs**: `./src/apis` (Node.js / Express - Auth & API Key Management)

## 🛠 Integrated Toolchain

- **Moon**: Run `moon run <project>:<task>` (e.g., `moon run ue5-plugin:build`).
- **Stitch**: Use for UI loop generation within `./src/apps`.
- **Gemini CLI**: Deep code analysis across C++, Python, and TypeScript.

## 🤖 Active Agents

| Agent Name            | Folder Path                      | Expertise                                 |
| :-------------------- | :------------------------------- | :---------------------------------------- |
| **Gamedev Architect** | `agents/gamedev/architect`       | UE5 Architecture, RAG strategy            |
| **Engine Developer**  | `agents/gamedev/game-engine-dev` | C++, Python API, UAssets                  |
| **UI Engineer (UE5)** | `agents/gamedev/ui-engineer`     | Slate, UMG, Diffing Visuals (In-Engine)   |
| **Backend Expert**    | `agents/web/backend-expert`      | FastMCP, OpenRouter, API Key Routing      |
| **Frontend Expert**   | `agents/web/ui-engineer`         | Stitch, Next.js, Dashboard UI             |
| **Web Architect**     | `agents/web/architect`           | Cloud Sync, User Auth, Subscription Logic |