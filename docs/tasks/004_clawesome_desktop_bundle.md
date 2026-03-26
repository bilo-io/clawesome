# Blueprint: Clawesome System Hardening & Desktop Forge

## 🧩 Context & Constraints
* **Current State:** Prototype. Frontend/Gateway communication exists but is unrefined and manual.
* **Environment:** Bun-based Monorepo managed by Moonrepo.
* **Architecture:** Shift from "dev-server" mode to "Tauri + Sidecar" distribution.
* **Goal:** A single, signed macOS `.dmg` containing the Dashboard, Gateway, and CLI.

---

## 🏗️ Phase 1: Binary Hardening (The Sidecars)
*Goal: Move away from `bun run` and toward compiled, self-contained binaries.*

- [x] **Task 1.1: Gateway Refactoring for Distribution**
    - Abstract port selection (allow Tauri to pass an available port via CLI args).
    - Remove hardcoded filesystem paths; implement base-path detection for the `/agents` directory.
    - **Forge Command:** `bun build ./apps/gateway/index.ts --compile --outfile ./apps/gateway/clawesome-gateway`
- [x] **Task 1.2: CLI Compilation**
    - Compile `apps/cli` into a standalone binary using Bun.
- [x] **Task 1.3: Sidecar Identification**
    - Rename binaries to match Tauri's required target triple format: `[name]-[target-triple]` (e.g., `clawesome-gateway-x86_64-apple-darwin`).

---

## 🖥️ Phase 2: Tauri 2.0 Integration (The Shell)
*Goal: Wrap the Next.js Dashboard and manage the Gateway lifecycle.*

- [x] **Task 2.1: Tauri Core Setup**
    - Initialize Tauri in `apps/dashboard`.
    - Configure `tauri.conf.json` to include the `gateway` and `cli` as `externalBin`.
- [x] **Task 2.2: Secure Communication Bridge**
    - Replace standard `fetch('localhost:3000')` with a dynamic discovery mechanism.
    - Use Tauri's `command` pattern to let the UI ask Rust for the current Gateway status/port.
- [x] **Task 2.3: Resource Bundling**
    - Map the `/agents` folder in the root to Tauri `resources`.
    - Ensure the Gateway sidecar knows to look in the app's `ResourceDir` for agent definitions.

---

## 🔗 Phase 3: Orchestration (Process Management)
*Goal: Ensure the Gateway isn't a "zombie" process and starts/stops with the UI.*

- [x] **Task 3.1: Lifecycle Management**
    - Implement a `ManagedChild` process in the Dashboard's `src-tauri` (Rust).
    - Ensure the Gateway binary is killed when the window is closed.
- [x] **Task 3.2: Error Handling & Logging**
    - Pipe Sidecar `stdout/stderr` into the Dashboard's "Logs" view for debugging.
- [x] **Task 3.3: CLI "Path Injection"**
    - Create a script/utility within the app to symlink the bundled CLI into the user's `$PATH`.

---

## 🚀 Phase 4: Production Forge & Moonrepo Automation
*Goal: One command to build the entire universe.*

- [x] **Task 4.1: Moonrepo Task Definition**
    - Update `moon.yml` to define the build graph: `cli` -> `gateway` -> `dashboard` -> `tauri-bundle`.
- [x] **Task 4.2: macOS Notarization Pipeline**
    - Setup Apple `GONOTARY` or `Apple ID` environment variables for signing.
- [x] **Task 4.3: Artifact Verification**
    - Build final `.dmg` and verify that the UI can "ping" the internal Gateway successfully without manual terminal intervention.

---

## ⚠️ Critical Improvement Notes for AI
* [x] **Decoupling:** The frontend must not assume the gateway is already running. It must wait for a "Gateway Ready" signal from Tauri.
* [x] **Pathing:** Use `resolveResource` for any file access (Agents, Config) to avoid "File Not Found" errors in the bundled `.app` context.
* **Protocols:** Transition from `http://` to a custom protocol if possible, or strictly validate `localhost` origins for security.