# EIOS — Hướng Dẫn Triển Khai & Cập Nhật Dự Án

> Gửi file này lên mỗi khi muốn tiếp tục hoặc cập nhật dự án mà không cần giải thích lại từ đầu.

---

## 1. Tổng Quan Dự Án

**Tên dự án:** EIOS Agent Orchestration Dashboard  
**Mục tiêu:** Dashboard web quản lý đội ngũ AI agent, phiên thực thi, hàng đợi duyệt và công cụ phân tích UI/UX.  
**Ngôn ngữ giao diện:** Tiếng Việt  
**Theme:** Dark-mode duy nhất (navy sâu + cyan primary)  

---

## 2. Stack Công Nghệ

| Layer | Công nghệ |
|---|---|
| Frontend | React 19 + Vite 7 |
| Styling | Tailwind CSS v4 |
| Routing | wouter |
| State / Fetch | @tanstack/react-query |
| Charts | recharts |
| Icons | lucide-react |
| Animation | framer-motion |
| Date | date-fns (locale: vi) |
| Monorepo | pnpm workspaces |
| API server | Express (Node.js) — cổng 8080 |
| Platform | Replit (pnpm monorepo template) |

---

## 3. Cấu Trúc Thư Mục

```
workspace/
├── artifacts/
│   ├── eios-dashboard/          ← Frontend React (artifact chính)
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── layout/
│   │   │   │   │   ├── AppLayout.tsx      ← Layout tổng thể (sidebar + topbar)
│   │   │   │   │   ├── Sidebar.tsx        ← NAV config + sidebar UI
│   │   │   │   │   ├── TopBar.tsx         ← Thanh trên cùng
│   │   │   │   │   └── PageHeader.tsx     ← Tiêu đề trang
│   │   │   │   └── ui/                    ← shadcn/ui components
│   │   │   ├── pages/
│   │   │   │   ├── Home.tsx               ← Tổng quan (KPI cards, charts)
│   │   │   │   ├── Agents.tsx             ← Danh sách agents
│   │   │   │   ├── AgentDetail.tsx        ← Chi tiết agent
│   │   │   │   ├── Crews.tsx              ← Nhóm phối hợp
│   │   │   │   ├── CrewDetail.tsx         ← Chi tiết crew
│   │   │   │   ├── Browsers.tsx           ← Phiên trình duyệt
│   │   │   │   ├── Executions.tsx         ← Lịch sử thực thi
│   │   │   │   ├── ExecutionDetail.tsx    ← Chi tiết thực thi + proposal review
│   │   │   │   ├── Reviews.tsx            ← Hàng đợi duyệt (human-in-the-loop)
│   │   │   │   ├── Marketplace.tsx        ← Chợ agent templates
│   │   │   │   ├── Skills.tsx             ← Kỹ năng & MCP servers
│   │   │   │   ├── Analytics.tsx          ← Phân tích hiệu suất
│   │   │   │   ├── Audit.tsx              ← Nhật ký kiểm toán
│   │   │   │   ├── Settings.tsx           ← Cài đặt hệ thống
│   │   │   │   ├── UiAnalyzer.tsx         ← Phân tích UI/UX (công cụ mới)
│   │   │   │   ├── Login.tsx              ← Trang đăng nhập
│   │   │   │   └── not-found.tsx          ← 404
│   │   │   ├── data/
│   │   │   │   └── mock.ts                ← Toàn bộ dữ liệu mock (agents, executions, crews...)
│   │   │   ├── lib/
│   │   │   │   └── utils.ts               ← cn(), formatters
│   │   │   ├── App.tsx                    ← Router chính
│   │   │   ├── main.tsx                   ← Entry point
│   │   │   └── index.css                  ← CSS variables (dark theme)
│   │   ├── public/
│   │   │   └── eios-logo.png
│   │   ├── package.json
│   │   ├── vite.config.ts                 ← Đọc PORT + BASE_PATH từ env
│   │   └── artifact.toml                  ← Replit artifact config (KHÔNG SỬA TAY)
│   │
│   └── api-server/                        ← Backend Express
│       ├── src/
│       │   └── index.ts                   ← API routes (/api/...)
│       ├── package.json
│       └── artifact.toml
│
├── replit.md                              ← Ghi chú kiến trúc cho agent
├── EIOS_DEPLOYMENT_GUIDE.md               ← File này
└── pnpm-workspace.yaml
```

---

## 4. Màu Sắc & Design System

```css
/* Từ src/index.css */
--background:        222 47% 7%;    /* #0A0E1A — nền chính */
--sidebar:           222 47% 9%;    /* #0D1220 — sidebar */
--card:              222 40% 11%;   /* card background */
--primary:           199 89% 48%;   /* #08B4E8 — cyan chính */
--primary-foreground: 0 0% 100%;
--muted-foreground:  215 16% 55%;   /* text phụ */
--border:            220 25% 18%;   /* đường viền */
```

**Font:** Inter (Google Fonts)  
**Icon library:** lucide-react  
**Border radius chuẩn:** 6–8px  

---

## 5. Sidebar Navigation (NAV)

File: `src/components/layout/Sidebar.tsx`

```
TRUNG TÂM ĐIỀU HÀNH
  ├── Tổng quan          /
  ├── Đội ngũ Agent      /agents
  ├── Nhóm phối hợp      /crews
  ├── Phiên trình duyệt  /browsers
  └── Phiên thực thi     /executions

QUẢN TRỊ
  ├── Hàng đợi duyệt     /reviews   (badge = số review)
  └── Nhật ký kiểm toán  /audit

XÂY DỰNG
  ├── Chợ ứng dụng       /marketplace
  └── Kỹ năng & MCP      /skills

VẬN HÀNH
  ├── Phân tích          /analytics
  └── Cài đặt            /settings

CÔNG CỤ                            ← Nhóm mới nhất
  └── Phân tích UI/UX    /ui-analyzer
```

**Cách thêm tab mới:**
1. Mở `src/components/layout/Sidebar.tsx`
2. Import icon từ `lucide-react`
3. Thêm vào mảng `NAV` (group hiện có hoặc tạo group mới)
4. Tạo file `src/pages/TenTrang.tsx`
5. Import và thêm `<Route path="/duong-dan" component={TenTrang} />` vào `src/App.tsx`

---

## 6. Agents Đã Có Trong Hệ Thống

| ID | Tên | Model | Team | Status |
|---|---|---|---|---|
| agt-001 | Backend Code Reviewer | gpt-4o | Platform | ACTIVE |
| agt-002 | Migration Generator | claude-3.5-sonnet | Data | PAUSED |
| agt-003 | K8s Manifest Linter | gpt-4o-mini | Infra | ACTIVE |
| agt-004 | Security Scanner | gpt-4o | Security | ACTIVE |
| agt-005 | Slack Triage Bot | claude-3-haiku | Growth | ARCHIVED |
| agt-006 | DB Query Explainer | claude-3.5-sonnet | Data | ACTIVE |
| agt-007 | Frontend Test Runner | gpt-4o | Platform | ACTIVE |
| agt-008 | Log Analyzer | gpt-4o-mini | Infra | ACTIVE |
| agt-009 | Doc Generator | claude-3.5-sonnet | Platform | ACTIVE |
| agt-010 | Cost Optimizer | gpt-4o | Infra | ACTIVE |
| agt-011 | Onboarding Concierge | gpt-4o-mini | Growth | ACTIVE |
| agt-012 | Ticket Triage | claude-3-haiku | Platform | ACTIVE |
| agt-013 | Rate-Limit Guard | gpt-4o | Security | ACTIVE |
| agt-014 | Schema Evolution Bot | claude-3.5-sonnet | Data | PAUSED |
| agt-015 | Data Quality Sentinel | gpt-4o-mini | Data | ACTIVE |
| agt-016 | Release Coordinator | gpt-4o | Infra | ACTIVE |
| agt-017 | Phishing Triage | claude-3.5-sonnet | Security | ACTIVE |
| agt-018 | A/B Test Analyst | gpt-4o | Growth | ACTIVE |
| agt-019 | Codebase Explainer | claude-3.5-sonnet | Platform | ACTIVE |
| agt-020 | On-Call Summarizer | gpt-4o-mini | Infra | ACTIVE |
| agt-021 | Lead Enricher | claude-3-haiku | Growth | ACTIVE |
| agt-022 | GDPR Erasure Bot | gpt-4o | Security | ACTIVE |
| **agt-eios** | **Eios** | **gpt-4o** | **Platform** | **ACTIVE** |

**Eios** là agent trung tâm điều phối — nhận URL, kích hoạt crawler, gửi DOM+screenshot lên AI, phân tích UI/UX, lưu kết quả, log từng bước. Retry tối đa 3 lần.

**Cách thêm agent mới:**  
Mở `src/data/mock.ts`, thêm object vào mảng `agents[]` theo cấu trúc:
```ts
{
  id: "agt-XXX",
  name: "Tên Agent",
  description: "Mô tả ngắn",
  model: "gpt-4o" | "claude-3.5-sonnet" | "gpt-4o-mini" | "claude-3-haiku",
  temperature: 0.0–1.0,
  status: "ACTIVE" | "PAUSED" | "ARCHIVED",
  successRate: 0–100,
  totalRuns: number,
  team: "Platform" | "Growth" | "Data" | "Infra" | "Security",
  env: "CLOUD" | "SELF_HOSTED" | "LOCAL_CLI",
  owner: "email@eios.dev",
  lastExecution: m(phút) | h(giờ) | d(ngày),
  systemPrompt: "...",
  skills: ["skill.name"],
  mcpServers: ["server-name"],
}
```

---

## 7. Tính Năng Đã Triển Khai

### ✅ Dashboard (/)
- KPI cards: Agents hoạt động, Phiên thực thi hôm nay, Hàng đợi duyệt, Chi phí tháng
- Biểu đồ hoạt động 7 ngày (recharts AreaChart)
- Bảng Fleet Overview (trạng thái tất cả agents)

### ✅ Đội ngũ Agent (/agents)
- Danh sách đầy đủ, lọc theo team/status/env
- Trang chi tiết: system prompt, skills, MCP servers, lịch sử thực thi

### ✅ Nhóm phối hợp (/crews)
- Multi-agent collaboration groups
- Chi tiết: danh sách agents, task tracking

### ✅ Phiên trình duyệt (/browsers)
- Headless browser automation sessions

### ✅ Phiên thực thi (/executions)
- Lịch sử 120+ executions
- Chi tiết: step-by-step timeline, proposal review UI (approve/reject)

### ✅ Hàng đợi duyệt (/reviews)
- Human-in-the-loop approval
- Risk levels: LOW / MEDIUM / HIGH
- Approve / Reject / Defer actions

### ✅ Nhật ký kiểm toán (/audit)
- Full audit trail of all actions

### ✅ Chợ ứng dụng (/marketplace)
- Agent templates

### ✅ Kỹ năng & MCP (/skills)
- Connected MCP servers và tool scopes

### ✅ Phân tích (/analytics)
- Performance metrics, charts

### ✅ Cài đặt (/settings)
- System configuration

### ✅ Phân tích UI/UX (/ui-analyzer) — Tính năng mới nhất
- Nhập URL → phân tích cấu trúc giao diện
- 7 mục: Cấu trúc tổng thể, Hệ màu, Typography, Thành phần UI, Điều hướng, Grid & Spacing, Responsive
- Quick-access URLs (linear.app, vercel.com, notion.so, figma.com)
- Nút "Xem prompt" hiển thị system prompt AI
- Dữ liệu mock (chưa kết nối backend thật)

---

## 8. Thiết Lập Môi Trường (Setup từ đầu)

### Yêu cầu
- Node.js 20+
- pnpm 9+
- Replit account (hoặc môi trường Linux)

### Cài đặt
```bash
# Clone hoặc import project
pnpm install

# Chạy dashboard
pnpm --filter @workspace/eios-dashboard run dev

# Chạy API server
pnpm --filter @workspace/api-server run dev
```

### Biến môi trường
| Tên | Mô tả | Bắt buộc |
|---|---|---|
| `SESSION_SECRET` | Secret cho session Express | Có |
| `PORT` | Cổng Vite/Express (tự động trên Replit) | Không |
| `BASE_PATH` | Base path routing (tự động trên Replit) | Không |
| `OPENAI_API_KEY` | Khi kết nối AI thật | Khi dùng AI |
| `DATABASE_URL` | Khi dùng PostgreSQL thật | Khi dùng DB |

---

## 9. Kế Hoạch Phát Triển Tiếp Theo

### Ưu tiên cao
- [ ] Kết nối backend thật: API `/analyze` dùng Puppeteer + GPT-4 Vision
- [ ] Database PostgreSQL: lưu lịch sử phân tích, users, results
- [ ] Auth: đăng nhập / đăng ký (Clerk hoặc Replit Auth)

### Ưu tiên trung
- [ ] Real-time execution logs (WebSocket)
- [ ] Export kết quả phân tích sang PDF hoặc JSON
- [ ] Trang Analytics nâng cao: cost breakdown, token usage chart
- [ ] Tích hợp MCP server thật (GitHub, Linear, Slack)

### Ưu tiên thấp
- [ ] Export UI sang React/Tailwind code
- [ ] Tích hợp Figma
- [ ] Mobile responsive hoàn chỉnh
- [ ] Dark/light mode toggle

---

## 10. Quy Ước Code

### Thêm trang mới
```bash
# 1. Tạo page
artifacts/eios-dashboard/src/pages/TenTrang.tsx

# 2. Wiring route (App.tsx)
import TenTrang from "@/pages/TenTrang";
<Route path="/ten-duong-dan" component={TenTrang} />

# 3. Thêm nav (Sidebar.tsx)
{ name: "Tên menu", href: "/ten-duong-dan", icon: TenIcon }
```

### Thêm dữ liệu mock
```bash
# Mở src/data/mock.ts
# Thêm vào mảng tương ứng (agents[], executions[], crews[], v.v.)
```

### Thêm component
```bash
# Dùng shadcn/ui có sẵn: src/components/ui/
# Component layout: src/components/layout/
# Import: import { ComponentName } from "@/components/ui/component-name"
```

---

## 11. Lệnh Thường Dùng

```bash
# Restart dashboard sau khi thay đổi
# (Replit tự động detect, hoặc dùng nút Restart workflow)

# Kiểm tra lỗi TypeScript
pnpm --filter @workspace/eios-dashboard run tsc --noEmit

# Build production
pnpm --filter @workspace/eios-dashboard run build

# Cài package mới cho dashboard
pnpm --filter @workspace/eios-dashboard add <package-name>

# Cài package mới cho API
pnpm --filter @workspace/api-server add <package-name>
```

---

## 12. Lưu Ý Quan Trọng

1. **Không sửa tay `artifact.toml`** — file này do Replit quản lý tự động
2. **Không hard-code port** — luôn đọc từ `process.env.PORT`
3. **Dữ liệu hiện tại là mock** — toàn bộ nằm trong `src/data/mock.ts`, chưa có DB thật
4. **Theme dark-mode only** — `<body class="dark">` trong `main.tsx`, không có light mode
5. **Routing dùng wouter** — không phải React Router, cú pháp khác một chút
6. **Tailwind v4** — config trong `index.css` thay vì `tailwind.config.js`

---

*Cập nhật lần cuối: 28/04/2026 — Bao gồm: Dashboard, 15 trang, 23 agents (kể cả Eios), tính năng Phân tích UI/UX*
