# CRITICAL AGENT RULES: COMPONENT SOURCING & FRONTEND GOVERNANCE

> **STRICT DIRECTIVE**: DO NOT create, write, or invent custom UI components from scratch.
> All components MUST be fetched or installed exclusively from the approved sources below.
> When basic/default components are needed, use **Shadcn UI**.

## 1. Approved Component Sources
1. **21st.dev (`@21st-dev/cli` & 21st MCP)**:
   - For 3D elements, interactive heroes, bento grids, and high-end visual blocks.
   - MCP Server configured in `.cursor/mcp.json` and `~/.gemini/config/mcp_config.json`.
   - CLI: `$env:TWENTYFIRST_TOKEN="21st_sk_b1cdab5b2d68cdae6d91584897e9fc61e5761182b149682ad3175106ba495590"; npx @21st-dev/cli@latest add <author>/<slug>`
2. **Motion (`motion` / `npx motion-ai`)**:
   - For on-scroll animations, 3D perspective tilts, spring physics, and cinematic transitions.
   - Skill: `.agents/skills/motion/SKILL.md`.
3. **Shadcn UI (`npx shadcn@latest add <component>`)**:
   - For ALL standard/basic UI components (buttons, dialogs, dropdowns, cards, tabs, tooltips, etc.).
   - Configured in `components.json`.
4. **Taste-Skill (`Leonxlnx/taste-skill` / `design-taste-frontend`)**:
   - Enforce anti-slop principles, high-craft typography, layout balance, and curated art direction.
   - Skill: `.agents/skills/design-taste-frontend/SKILL.md`.
5. **UI/UX Pro Max (`uipro` / `ui-ux-pro-max`)**:
   - Design intelligence, responsive contracts, WCAG accessibility, and styling reasoning.
   - Skill: `.agents/skills/ui-ux-pro-max/SKILL.md`.

## 2. Senior Developer Protocol
- **Zero Blind Assumptions**: If in doubt about design, content, or technical choice, ask and validate with the user first.
- **Reference**: Detailed guidelines are maintained in `agent.md`.
