# EIOS IDE

## Overview

A full cloud coding environment accessible from iPhone. Real Linux shell (node-pty + WebSocket), Monaco editor + file explorer with auto-save, AI Copilot (streaming), 4-phase multi-agent AI system, AI UI Builder, Smart Run Engine, Extensions Marketplace, Preview panel, SEO Tools, multilingual UI (EN/VI/ES/FR), and EIOS design system.

## Architecture

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (ESM bundle)

## EIOS Design System

- **Primary color**: sky/cyan `#38bdf8` → `hsl(199 89% 60%)`
- **Brand font**: Orbitron (logo), Oxanium (UI), JetBrains Mono (code)
- **CSS tokens**: `--aethon-bg0..bg4`, `--aethon-acc (#38bdf8)`, `--aethon-grn`, `--aethon-pur`, `--aethon-t1..t4`
- **Utility classes**: `.font-orbitron`, `.aethon-gradient-text`, `.aethon-grid`, `.aethon-hero-glow`
- **Status bar**: bottom of AppLayout (desktop only) with connection dot, session ID, active tab
- **User avatar**: gradient circle with session initial, dropdown menu (Profile/Settings/Help/Sign Out)

## Artifacts

### `artifacts/api-server` (port 8080, path `/api` and `/ws`)
- Real Linux shell via **node-pty** + **socket.io** WebSocket
- REST endpoints: sessions, filesystem (read/write/list), AI (chat + agent)
- AI Copilot: streaming SSE chat via OpenAI integration
- AI Agent: autonomous agentic loop with 4 tools (run_terminal, write_file, read_file, list_files)
- Sessions sandbox: `/tmp/ide-sessions/<sessionId>/`

### `artifacts/terminal-ide` (port 21547, path `/`)
- Mobile-first React + Vite + Tailwind CSS v4 (dark mode, shadcn/ui)
- **ChatOnlyView**: Simple AI chat + agent build view (default for mobile)
- **AppLayout**: Full IDE shell with SideNav (desktop) + BottomNav (mobile) + status bar
- **TerminalView**: xterm.js + socket.io-client, connects to `/ws/socket.io`
- **EditorView**: Monaco Editor + file explorer tree (REST filesystem API)
- **AIView**: SSE streaming AI chat copilot
- **AgentView**: Autonomous agent with real-time tool call log
- **BuilderView**: AI UI Builder
- **ExtensionsView**: Extensions Marketplace
- **SEOView**: SEO Tools (Keyword Research, Site Analyzer, Content SEO)
- i18n: EN/VI/ES/FR via `useI18n()` hook; locale stored in `ide_ui_locale`

## Key Files

- `artifacts/api-server/src/index.ts` — HTTP + socket.io server setup
- `artifacts/api-server/src/lib/session-manager.ts` — PTY lifecycle (node-pty)
- `artifacts/api-server/src/routes/sessions.ts` — session REST API
- `artifacts/api-server/src/routes/filesystem.ts` — filesystem CRUD
- `artifacts/api-server/src/routes/ai.ts` — copilot chat + agentic loop
- `artifacts/terminal-ide/src/components/layout/AppLayout.tsx` — main IDE shell + EIOS brand header + status bar
- `artifacts/terminal-ide/src/components/layout/SideNav.tsx` — collapsible left sidebar (desktop)
- `artifacts/terminal-ide/src/components/layout/BottomNav.tsx` — mobile bottom nav
- `artifacts/terminal-ide/src/components/views/ChatOnlyView.tsx` — simple AI chat view
- `artifacts/terminal-ide/src/index.css` — EIOS CSS design tokens + Tailwind config
- `artifacts/terminal-ide/index.html` — Orbitron/Oxanium/JetBrains Mono fonts, title "EIOS DevOS"
- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth)

## Important Notes

- **node-pty** must be kept external in esbuild (in `build.mjs` external list). It uses native `.node` binaries that can't be bundled.
- socket.io server path is `/ws/socket.io`; frontend uses `path: "/ws/socket.io"` in socket.io-client
- The AI integration uses `@workspace/integrations-openai-ai-server` (auto-provisioned, no API key needed)
- Model: `gpt-5.2` for both copilot and agent; fallback to Groq llama3-70b-8192 if GROQ_API_KEY set
- Port 8080 is RESERVED for the API server — never kill/detect/preview on this port
- User project preview ports: 3000, 4000, 5000, 8000
- `activeTab` type: `"terminal" | "editor" | "agent" | "preview" | "builder" | "extensions" | "seo"`
- Auto-save delay: `AUTO_SAVE_DELAY_MS = 1500`

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run typecheck:libs` — typecheck lib packages only
- `pnpm --filter @workspace/api-server run dev` — start API server
- `pnpm --filter @workspace/terminal-ide run dev` — start frontend
