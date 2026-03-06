# Agentic Terminal: Page & Sidebar Architecture (Claw-Inspired)

## Sidebar Navigation (Collapsible)
* **Main Hub**: The central mission control for agent health and system stats.
* **Active Chats**: A list of recent agent conversations (with "Active/Idle" status orbs).
* **Agent Swarms**: Management for specialized multi-agent teams (Researcher, Dev, etc.).
* **Mission Log**: A live, scrolling feed of every autonomous action taken by the agents.
* **Smart History**: AI-indexed database of manual commands and agent-executed scripts.
* **Theme Studio**: Toggle Light/Dark/System and adjust "Glow & Neon" intensity.

---

## Page Layout & Components

### 🟢 Mission Control (Dashboard)
* **System Vitality**: Real-time glassmorphism charts for CPU/RAM/Disk (to monitor agent overhead).
* **Project Pulse**: Deep-sync with your current directory—shows Git branch, uncommitted diffs, and `CLAUDE.md` context status.
* **Activity Heatmap**: A "Contribution-style" grid showing agent productivity and command frequency.
* **Quick Actions**: Glowing "Macro" tiles for common workflows (e.g., "Setup Dev Environment," "Run Security Audit," "Wipe Sandbox").
* **Cost Tracker**: Live monitor of API spend (OpenAI/Claude/DeepSeek) for the current session.

### 💬 The AI Chat UX (Agent Interface)
* **Multi-Tabbed Chats**: Browser-style tabs to keep different agent missions isolated.
* **Agent Swarm View**: A visual HUD showing sub-agents working in parallel on a single task.
* **Action Approval Modals**: A "UX Guardrail" for destructive actions—glows red when the agent requests `rm` or `git push --force`.
* **The "Thought Stream"**: A collapsible side-panel inside chat that shows the agent's raw reasoning and internal tool calls.

### 🛡️ Secure Execution HUD
* **Container Monitor**: Visual status of the isolated Linux/Docker containers where agents run.
* **Filesystem Sandbox**: A tree-view of the "Mounted Directories" the agent is allowed to see.
* **Permission Toggle**: A master "Kill Switch" to instantly revoke agent bash/file access.

### 📂 Workspace & History
* **Workspace Gallery**: Manage high-level project contexts (Personal vs. Work vs. Client).
* **Smart History Search**: CMD+K style search to find that one command from 3 weeks ago using natural language.
* **Session Snapshots**: A list of saved terminal states to restore your tabs, paths, and agent context after a reboot.

---

## Design & Glow Specs
* **Theme Toggles**: Fast switching between "Midnight Nebula" (Dark) and "Frosted Arctic" (Light).
* **Glow States**: 
    * **Blue Pulse**: Agent is "