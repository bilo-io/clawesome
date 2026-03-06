# Terminal AI Dashboard & UX Architecture (2026 Ultra-Slick Edition)

## Navigation Hierarchy (Sidenav)
* **Collapsible Side Rail**: 
    * **Expanded (240px)**: Full text labels with descriptive sub-text.
    * **Collapsed (64px)**: Icon-only view with "Glow-on-Hover" tooltips.
* **Dynamic Bottom Dock**: Quick-access for account switching, theme toggling (Light/Dark/Auto), and a glowing "AI Pulse" status indicator.
* **Workspace Tabs**: Browser-style tabs at the top of the main viewport to switch between active terminal sessions (e.g., `Frontend Dev`, `Backend Logs`, `Database Tunnel`).

---

## The AI Lab (Chat UX)
* **Context-Aware Slide-out**: A full-height panel that slides in from the right.
* **Threaded Conversations**: Categorize AI chats by project or specific bug-fix session.
* **Prompt Library Modal**: A floating modal triggered by `/` containing pre-saved complex prompts (e.g., "Analyze last 50 lines of error logs").
* **Code-Block "Action Overlay"**: Hovering over AI-generated code reveals glowing buttons for:
    * **Run in Terminal**: Instantly paste and execute.
    * **Insert at Cursor**: Direct injection into your active CLI prompt.
    * **Explain**: Deep-dive into specific flags used in the command.
* **Thinking States**: Subtle "Pulse" or "Wave" animations in the chat bubble to indicate the AI is processing terminal context.

---

## Interactive UI Components
* **The Command Modal (CMD+K)**: 
    * A centered, glassmorphism search bar with a neon border.
    * Unified search for: Commands, History, Files, and AI Help.
* **Smart Tabs & Sub-Views**:
    * Inside the Dashboard, use **Internal Tabs** to switch between *Resource Analytics*, *Project Overview*, and *Security Audit*.
* **Destructive Action Modals**: 
    * For sensitive commands (e.g., `rm -rf`), a modal with "Vibrant Warning" glow appears.
    * Requires a "Slide-to-Confirm" or "Double-Tap" interaction to prevent accidental deletions.
* **Contextual Accordions**:
    * In the sidebar or dashboard, use accordions to hide/show complex data like "Connected SSH Nodes" or "Local Environment Variables."

---

## Visualization & Charts (Interactive HUD)
* **Resource Forecasting Chart**: A predictive line graph showing expected RAM spikes based on historical build patterns.
* **Network Flow Radial**: A circular gauge with "data-particle" animations for active uploads/downloads.
* **Git Velocity Heatmap**: Interactive grid showing coding intensity peaks. Clicking a square opens a **Modal** with that day’s commit history.
* **Dependency Tree Modal**: A zoomable, node-based map of your project dependencies with glowing red nodes for security vulnerabilities.

---

## Theming & Effects
* **Glow Intensity Slider**: User-controlled ambient light levels for the UI.
* **Motion Blur Transitions**: Smooth 300ms transitions for opening modals and sliding sidebars.
* **Focus Mode**: A one-click toggle that collapses all sidebars and tabs, leaving only the terminal and a faint "Ambient Pulse" on the active line.