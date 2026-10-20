# Agent Architectural Guidelines & Component Governance

> **PROJECT**: Sangita Chowdhury Portfolio Dashboard  
> **ROLE**: Senior Frontend Developer  
> **OBJECTIVE**: High-end, 3D animated, cinematic portfolio with on-scroll effects and pristine UI/UX.

---

## 🚨 STRICT COMPONENT MANDATE (ZERO CUSTOM INVENTIONS)

**UNDER NO CIRCUMSTANCES should any agent create, generate, or code custom UI components from scratch.**

You are strictly restricted to fetching, installing, and utilizing components from the approved sources specified below. Every button, card, hero, interactive canvas, modal, typography block, or visual widget must originate directly from these sources.

---

## 🏛️ APPROVED COMPONENT SOURCES & RETRIEVAL WORKFLOWS

### 1. 21st.dev Component Library & Registry
* **Usage**: Primary source for cinematic, 3D, and interactive hero components, bento cards, creative animations, and cutting-edge visual effects.
* **MCP Server**: `21st` configured at `https://21st.dev/api/mcp`
  * API Key: `21st_sk_b1cdab5b2d68cdae6d91584897e9fc61e5761182b149682ad3175106ba495590`
  * Configured in `.cursor/mcp.json` and Antigravity `mcp_config.json`.
* **CLI Commands**:
  * Search components:
    ```bash
    $env:TWENTYFIRST_TOKEN="21st_sk_b1cdab5b2d68cdae6d91584897e9fc61e5761182b149682ad3175106ba495590"; npx @21st-dev/cli@latest search "<query>"
    ```
  * Install component:
    ```bash
    $env:TWENTYFIRST_TOKEN="21st_sk_b1cdab5b2d68cdae6d91584897e9fc61e5761182b149682ad3175106ba495590"; npx @21st-dev/cli@latest add <author>/<slug>
    ```
  * Inspect code:
    ```bash
    $env:TWENTYFIRST_TOKEN="21st_sk_b1cdab5b2d68cdae6d91584897e9fc61e5761182b149682ad3175106ba495590"; npx @21st-dev/cli@latest get <id>
    ```

### 2. Motion (Motion / Motion-AI)
* **Usage**: On-scroll animations, 3D perspective tilts, spring dynamics, gesture transitions, layout animations.
* **Package**: `motion` (imported via `motion/react` or `motion`).
* **Motion Skill**: Available at `.agents/skills/motion/SKILL.md`.
* **Motion MCP**: Local documentation and search tools available at `C:\Users\patra\.gemini\antigravity\mcp\motion`.
* **Guideline**: Implement physics-based springs and smooth scrub on-scroll interactions according to Motion specifications.

### 3. Shadcn UI (Foundation & Base Components)
* **Usage**: Required for all basic, foundational, and standard UI components (Buttons, Dialogs, Dropdown Menus, Sheets, Badges, Tabs, Forms, Tooltips, Cards, Separators).
* **Configured in**: `components.json` (Vite + Tailwind + TypeScript).
* **CLI Command**:
  ```bash
  npx shadcn@latest add <component-name>
  ```
  *(Example: `npx shadcn@latest add button card dialog dropdown-menu tooltip tabs`)*

### 4. Taste-Skill (`Leonxlnx/taste-skill` / `design-taste-frontend`)
* **Usage**: Art direction, composition, anti-slop design rules, typography hierarchy, palette balancing, and gallery-grade visual execution.
* **Skill Path**: `.agents/skills/design-taste-frontend/SKILL.md`
* **Rule**: Review all compositions against taste-skill criteria to ensure non-generic, award-winning aesthetics.

### 5. UI/UX Pro Max (`uipro` / `ui-ux-pro-max`)
* **Usage**: Design intelligence, WCAG accessibility rules, responsive layout contracts, interaction patterns, and micro-UX guidelines.
* **CLI Tool**: `uipro` or `npx ui-ux-pro-max-cli`
* **Skill Path**: `.agents/skills/ui-ux-pro-max/SKILL.md`

---

## 🛠️ CODEBASE STANDARDS & DISCIPLINE

1. **No Unvalidated Assumptions**:
   * If any requirement, visual direction, asset, or component choice is ambiguous, ask the user directly before implementing.
2. **Senior Frontend Engineering**:
   * Maintain clean, strictly-typed TypeScript code.
   * Path aliases: `@/` points to `./src` and `@/components` points to `./components`.
   * Keep bundle size and performance in check (use GPU-accelerated transforms, avoid re-renders, optimize 3D WebGL assets).
3. **Execution Protocol**:
   * Setup & dependencies first.
   * Wait for user direction and resume details before proceeding to page development.
