# 搞钱体质测试 · 技术架构

> 变现模式：小红书店铺 → 自动/手动发激活码 → 网站激活测试 → 结果可分享

---

## 一、整体流程

```
┌─────────────────────────────────────────────────────────────┐
│                       小红书生态（外）                        │
│                                                              │
│  笔记推广 ──→ 商品链接 ──→ 用户下单 ──→ 自动/手动发激活码     │
└─────────────────────────────────────────────────────────────┘
                                    │
                                    ▼ 激活码（如 GAOQIAN-XK7M-9PLQ）
┌─────────────────────────────────────────────────────────────┐
│                       我们自己的网站                          │
│                                                              │
│  首页（输激活码）                                             │
│        │                                                     │
│        ▼ 校验：码有效 + 未使用                                │
│  测试页（24 题一题一屏）                                      │
│        │                                                     │
│        ▼ 提交答案                                             │
│  服务端：算分 + 匹配人格 + 存结果 + 生成 result_token         │
│        │                                                     │
│        ▼                                                     │
│  结果页 /r/[token]                                            │
│        │                                                     │
│        ├──→ 分享链接（任何设备可看，不能再测）                │
│        └──→ 分享海报图片下载（带二维码扫回）                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 二、技术栈

| 层 | 选型 | 原因 |
|---|---|---|
| 框架 | **Next.js 14** (App Router) + TypeScript | 一把梭，前后端同仓库 |
| 部署 | **Vercel** | 免费档够用，国内可访问（虽有抖动） |
| 数据库 | **Supabase** (Postgres) | 免费档 500MB + 5万 MAU，自带 REST API |
| 字体分包 | 中文网字计划 / fontsource | Zpix 字体分包加载 |
| 海报渲染 | **@vercel/og** | 服务端渲染，像素字体不糊 |
| 像素图 | SVG（已建） | 矢量无缩放损失 |
| 域名 | 备案或不备案的 .com | 国内访问优先备案 |

---

## 三、数据库 Schema（Supabase / Postgres）

```sql
-- 激活码表（核心）
CREATE TABLE activation_codes (
  code VARCHAR(20) PRIMARY KEY,           -- 如 GAOQIAN-XK7M-9PLQ-R2T4
  status VARCHAR(20) DEFAULT 'unused',     -- unused / used / expired / disabled
  batch_id VARCHAR(20),                    -- 批次，便于管理
  used_at TIMESTAMPTZ,
  used_ip VARCHAR(50),                     -- 防多人共用
  used_user_agent TEXT,
  result_token VARCHAR(50),                -- 关联测试结果
  expires_at TIMESTAMPTZ,                  -- 可选：码本身过期时间
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_codes_status ON activation_codes(status);

-- 测试结果表
CREATE TABLE test_results (
  token VARCHAR(50) PRIMARY KEY,           -- 如 abc123def456
  activation_code VARCHAR(20) REFERENCES activation_codes(code),
  persona_code VARCHAR(5),                 -- G1 ~ G8
  dimension_scores JSONB,                  -- {D1_RISK: 0.7, D2_SOCIAL: -0.3, ...}
  answers JSONB,                           -- 原始答案，便于后续调优算法
  share_count INT DEFAULT 0,               -- 分享次数（埋点）
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_results_token ON test_results(token);
```

---

## 四、API 设计

| 路由 | 方法 | 作用 |
|---|---|---|
| `/api/activate` | POST | 校验激活码，标记 used，返回 result_token |
| `/api/submit` | POST | 提交答案，算分，存结果，返回 persona + token |
| `/api/result/[token]` | GET | 取结果（用于分享链接访问） |
| `/api/share/[token]` | GET | @vercel/og 渲染分享海报 |
| `/api/health` | GET | 健康检查 |

---

## 五、文件结构（计划）

```
little-test/
├── ARCHITECTURE.md                  # 本文档
├── CLAUDE.md
├── content/
│   ├── questions.ts                 # ✅ 已完成
│   ├── personas.ts                  # ✅ 已完成
│   └── design-tokens.ts             # ✅ 已完成
├── public/
│   └── sprites/                     # ✅ 已完成（3/8 个像素人）
├── scripts/
│   └── generate-codes.ts            # 激活码生成脚本
├── supabase/
│   └── schema.sql                   # 数据库 schema
├── app/
│   ├── layout.tsx
│   ├── page.tsx                     # 首页（激活码输入）
│   ├── test/page.tsx                # 测试页（24 题一题一屏）
│   ├── result/[token]/page.tsx      # 结果页（分享链接直达）
│   └── api/
│       ├── activate/route.ts
│       ├── submit/route.ts
│       ├── result/[token]/route.ts
│       └── share/[token]/route.tsx  # @vercel/og
├── components/
│   ├── ActivationForm.tsx           # 激活码输入
│   ├── QuestionCard.tsx             # 题目卡片
│   ├── Progress.tsx                 # 进度条
│   ├── PersonaHero.tsx              # 结果页头图
│   ├── RadarChart.tsx               # 6 维度雷达图
│   ├── ShareButtons.tsx             # 分享按钮
│   └── PixelSprite.tsx              # 像素小人偶 SVG 包装
├── lib/
│   ├── supabase.ts                  # Supabase 客户端
│   ├── scoring.ts                   # 算分逻辑
│   └── code-generator.ts            # 激活码生成
└── package.json
```

---

## 六、激活码生成规则

```typescript
// 格式：GAOQIAN-XXXX-XXXX-XXXX
// 字符集：去除易混字符（0/O, 1/I, 5/S, 8/B）
const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
// 32 个字符，4 位一段，约 100 万种组合，足够用
```

**示例码**：`GAOQIAN-KQ7M-TP3X-NR2Y`

**特性**：
- 全大写，分段易输入
- 去除易混字符，避免客户输错
- 校验位（可选）：第 12 位是前 11 位的 hash，防止暴力枚举
- MVP 阶段先不做校验位，简单 UUID 风格就够

---

## 七、防滥用策略（分阶段）

| 阶段 | 策略 |
|---|---|
| MVP | 激活码一次作废 + IP 记录（仅记录不拦截） |
| V1 | 同 IP 1 小时内激活超过 3 次 → 验证码 |
| V2 | 异常 IP（VPN/数据中心）拒绝 |
| V3 | 激活码 + User-Agent 指纹绑定 |

---

## 八、关键决策点（已拍板 ✅）

### 决策 1：激活码发货方式 → **A · 手动发货**

- 客户下单后，你（客服）手动复制激活码私信发给客户
- 适合日出 1-30 单的 MVP 阶段
- 工具：你 + 小红书后台 + 一个本地激活码池管理脚本
- 后续日单量超 30 再考虑切到第三方发卡平台

### 决策 2：激活后时限 → **24 小时内完成**

- 激活码生效后 24 小时内必须完成测试
- 数据库 `expires_at` 字段记录截止时间
- 超时则需重新激活（消耗新码）
- 优点：制造紧迫感，避免激活码被转卖
- 缺点：万一客户临时被打断可能不爽（但能接受）

### 决策 3：分享链接访问 → **A · 任何人可看**

- `/r/[token]` 链接任何人都能看完整报告
- 最大化二次传播（朋友看到 → 也想去测 → 看到店铺链接 → 下单）
- 不需要激活码保护
- 报告完整可见（包括 Top 3 副业 + 避坑 + 90 天清单）

---

## 九、部署节奏建议

| 阶段 | 时间 | 目标 |
|---|---|---|
| 第 1 周 | MVP | 跑通激活码 → 测试 → 结果 → 分享全链路，本地可玩 |
| 第 2 周 | 内容补完 | 补完剩下 5 个像素小人偶，调优文案 |
| 第 3 周 | 上线 | Vercel 部署 + Supabase 建表 + 域名解析 |
| 第 4 周 | 投放 | 小红书发笔记测转化 |
