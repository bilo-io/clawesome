# 005: Dashboard Performance Optimization Plan

## Executive Summary
The Clawesome Dashboard is a component-rich Next.js application designed to provide real-time telemetry and management capabilities for AI swarms. As the application grows, its current monolithic bundle and lack of dynamic loading strategies present significant performance challenges, particularly in terms of initial load time (LCP/FCP) and runtime interactivity.

This plan outlines a phased approach to optimize the dashboard’s performance by leveraging modern Next.js capabilities, streamlining dependencies, and refining rendering logic.

---

## 1. Performance Audit & Current Bottlenecks

### 📦 Bundle Analysis (Estimated)
The dashboard currently bundles several heavy libraries into its main entry point:
- **@xyflow/react**: High-dependency flow chart engine.
- **recharts**: SVG-based charting library.
- **lucide-react**: Icon library (if not properly tree-shaken).
- **framer-motion**: Animation engine, potentially heavy with complex `AnimatePresence` setups.
- **@monaco-editor/react**: Extremely large IDE-grade code editor component.

### 🚀 Initial Load Performance
- **Monolithic Entry Points**: `app/page.tsx` and `app/layout.tsx` import all components statically.
- **Static Export Limitations**: Since the app uses `output: 'export'`, it lacks a traditional server-side hydration strategy that can be optimized per-request. All optimizations must happen at the client-side bundling level.

### ⚙️ Runtime & GPU Usage
- **Over-Animation**: Excessive use of `motion.div`, `AnimatePresence`, and complex CSS blurs/glows throughout the UI.
- **DOM Persistence**: Floating components like `AILab`, `InstanceWizard`, and `FloatingTerminal` are always present in the DOM, even when hidden, increasing memory overhead.
- **Zustand Granularity**: Frequent updates from WebSocket telemetry might trigger shallow re-renders across the entire component tree if store selections are too broad.

---

## 2. Optimization Strategies

### 🛠 Phase 1: Progressive Hydration & Dynamic Imports
**Goal**: Reduce initial JS payload by at least 40%.
- **Action**: Implement `next/dynamic` for all large components not needed for the above-the-fold content.
    - `AILab.tsx`
    - `InstanceWizard.tsx`
    - `SystemVitality.tsx` (Charts)
    - `ProjectPulse.tsx`
    - `ActivityHeatmap.tsx`
- **Result**: Faster First Contentful Paint (FCP) and lower Time to Interactive (TTI).

### 🧹 Phase 2: Dependency & Asset Streamlining
**Goal**: Eliminate redundant scripts and optimize assets.
- **Action**: Verify tree-shaking for `lucide-react`. Ensure only used icons are bundled.
- **Action**: Optimize SVG assets in the `/public` directory (e.g., `clawesome-icon.svg`).
- **Action**: Implement a custom font loading strategy for Geist Sans/Mono to prevent layout shifts.

### 🎨 Phase 3: Rendering & Animation Optimization
**Goal**: Achieve a consistent 60FPS during interactions.
- **Action**: Use `useMemo` and `useCallback` strategically in heavy chart components (`SystemVitality`, `ActivityHeatmap`).
- **Action**: Replace `AnimatePresence` for simple mounting/unmounting where layout transitions aren't critical.
- **Action**: Offload complex blurs/glows to specialized CSS layers or use lower-cost alternatives (e.g., lower blur radius, fewer layers).

### 📡 Phase 4: State & Socket Refinement
**Goal**: Lower CPU overhead from real-time updates.
- **Action**: Ensure `useSocket` updates are throttled or debounced for visualization components.
- **Action**: Refactor Zustand selectors to ensure components only re-render when specifically requested parts of the state change.

---

## 3. Implementation Roadmap

| Phase | Priority | Effort | Key Tasks |
| :--- | :--- | :--- | :--- |
| **P1: Dynamic Loading** | Critical | Low | Convert heavy components in `layout.tsx` and `page.tsx` to `next/dynamic`. |
| **P2: Asset Audit** | High | Medium | Optimize SVGs, check icon bundling, and refine font loading. |
| **P3: Chart Optimization** | Medium | Medium | Memoize expensive renders in Recharts and Flow components. |
| **P4: Logic Refinement** | Medium | High | Refactor Zustand stores and Socket update cycles. |

---

## 4. Measuring Success
We will track the following metrics to validate our progress:
1. **Lighthouse Score**: Target >90 for Performance.
2. **Total JS Bundle Size**: Target <500 KB (gzipped) for the main entry point.
3. **FCP (First Contentful Paint)**: Target <1.2s.
4. **INP (Interaction to Next Paint)**: Target <200ms.

---

> [!IMPORTANT]
> This plan focuses on "quick wins" first (dynamic imports) to provide immediate value before diving into more complex architectural changes.
