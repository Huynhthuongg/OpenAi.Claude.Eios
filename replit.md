# Eios × Sandbox.AI

Hệ thống IDE Agent AI hợp nhất — kết hợp **Sandbox.AI** (AI builder dạng chat) với
**Eios** (bảng điều khiển điều phối agent) trong một sản phẩm duy nhất, đồng nhất UX/UI
theo chủ đề tối (navy `#0A0E1A` + cyan `#08B4E8`), giao diện tiếng Việt.

## Cấu trúc dự án (pnpm monorepo)

```
artifacts/
├─ sandbox-ai/        # Web React + Vite — UI hợp nhất Eios + Sandbox.AI
│  └─ src/
│     ├─ pages/       # Tổng quan, Agents, Crews, Reviews, Executions, Sandbox, ...
│     ├─ components/  # Layout, Autopilot, CommandPalette, EiosOrb, shadcn ui
│     ├─ data/mock.ts # Dữ liệu mẫu (agents, teams, reviews, audit, ...)
│     └─ App.tsx      # Định tuyến wouter
├─ api-server/        # Express API (mock, không cần DB)
│  └─ src/routes/
│     ├─ health.ts    # /api/healthz
│     └─ eios.ts      # /api/agents, /api/executions, /api/reviews,
│                     # /api/audit, /api/stats/*, /api/analyze, /api/generate
└─ mockup-sandbox/    # Khu vực thử nghiệm component (Vite preview server)
```

## Stack
- React 19 + Vite 7 + Tailwind v4
- wouter (routing), @tanstack/react-query, recharts, lucide-react, cmdk
- shadcn/ui (Radix primitives)
- Express 5 + pino (API server, không Clerk / không DB — dùng mock data)

## Lệnh chính
- `pnpm install`
- `pnpm --filter @workspace/sandbox-ai dev`
- `pnpm --filter @workspace/api-server dev`

## Lộ trình
- `/` — Trung tâm điều hành (tình trạng hệ thống, KPI, Autopilot)
- `/agents`, `/crews`, `/executions`, `/reviews`, `/audit`, `/marketplace`, `/skills`
- `/sandbox` — **Sandbox AI Builder** (chat → sinh code, terminal, preview)
- `/observability`, `/integrations`, `/optimizer`, `/safety`, `/settings`

## Lưu ý hợp nhất
- Đã loại bỏ Clerk / Stripe / OpenAI integration khỏi api-server (chuyển sang mock).
- Tài sản EIOS gốc nằm trong `attached_assets/` (eios-dashboard zip).
- Dữ liệu mock tập trung ở `artifacts/sandbox-ai/src/data/mock.ts` (frontend) và
  `artifacts/api-server/src/routes/eios.ts` (backend).
