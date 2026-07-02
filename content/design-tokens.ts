// 搞钱体质测试 · 设计令牌（Design Tokens）
// 所有视觉决策的单一真理来源。开发时直接 import 使用。
// ─────────────────────────────────────────────────────────

// ========== 1. 配色系统 ==========
// 决策：背景纯白，配色基于 LEGO 经典色但形式不绑定 LEGO

export const COLORS = {
  // 背景（用户敲定：纯白，避免米黄显廉价）
  background: "#FFFFFF",
  surface: "#FFFFFF",
  muted: "#F5F5F5", // 卡片底色（如需分层）

  // 文字
  textPrimary: "#1A1A2E", // 主文字（替代纯黑，更柔和）
  textSecondary: "#6B6B7B",
  textInverted: "#FFFFFF",

  // 主色（LEGO 经典三色）
  legoYellow: "#F6EC35", // CTA、人格代号底色
  legoRed: "#D11013", // 警示、付费墙、避坑标签
  legoBlue: "#0055BF", // 信任、稳定感（少用，避免和 G2 撞）

  // 边框 / 阴影
  border: "#1A1A2E", // 厚边框，neobrutalism 招牌
  shadow: "#1A1A2E", // 偏移硬阴影（无模糊）

  // 8 种人格主题色（每种人格一色，对应主视觉、徽章、雷达图填充）
  personaColors: {
    G1: "#FF6B35", // 创造者 - 橙
    G2: "#0055BF", // 掮客 - 蓝
    G3: "#2DBE2C", // 理财师 - 绿
    G4: "#6C2E9C", // 执行机器 - 紫
    G5: "#FF00AA", // 社群教主 - 粉
    G6: "#4B9F4B", // 技术匠人 - 深绿
    G7: "#D01012", // 流量操盘 - 红
    G8: "#F2C94C", // 佛系收租公 - 金
  } as const,
} as const;

// ========== 2. 字体系统 ==========
// 决策：像素字体只用在「人格代号 / 百分比数字 / 标签徽章」，正文不用

export const FONTS = {
  // 正文（现代无衬线，确保可读性）
  body: '"Smiley Sans", "PingFang SC", "HarmonyOS Sans", system-ui, sans-serif',

  // 像素字体（英文/数字）- 用在代号、百分比、徽章
  pixel: '"Press Start 2P", "Zpix", monospace',

  // 中文像素字体 - 仅用于「人格代号」「强调短语」等极少数场景
  chinesePixel: '"Zpix", "IPix", monospace',
} as const;

// 字体使用规则（开发时严格执行）
export const FONT_USAGE_RULES = {
  // 必须用像素字体的场景
  mustUsePixel: [
    "人格代号 G1-G8（结果页头图、徽章）",
    "维度百分比数字（如 73%、94%）",
    "CTA 按钮文字（开始测试、解锁报告）",
    "进度条数字（如 12/24）",
    "页头品牌名「PIXEL PRESS」",
  ],
  // 可以用中文像素字体的场景（少量）
  canUseChinesePixel: [
    "结果页主标题（如「斜杠创造者」4 字以内）",
    "强调标签（如「付费解锁」「避坑」）",
  ],
  // 禁止用像素字体的场景
  forbidPixel: [
    "正文段落（任何超过 8 字的连续中文）",
    "题目选项",
    "副业推荐理由",
    "90 天清单内容",
    "任何需要长时间阅读的文本",
  ],
} as const;

// ========== 3. 组件样式 ==========
// 决策：Neobrutalism 风格（厚边框 + 偏移硬阴影 + 按压动效）

export const COMPONENT_STYLES = {
  card: {
    backgroundColor: COLORS.background,
    border: `2px solid ${COLORS.border}`,
    boxShadow: `4px 4px 0 ${COLORS.shadow}`,
    borderRadius: "0px", // neobrutalism 直角，不要圆角
  },

  // 人格主题色卡片（如人格代号底色）
  personaCard: (personaColor: string) => ({
    backgroundColor: personaColor,
    border: `2px solid ${COLORS.border}`,
    boxShadow: `4px 4px 0 ${COLORS.shadow}`,
  }),

  button: {
    primary: {
      backgroundColor: COLORS.legoYellow,
      color: COLORS.textPrimary,
      border: `2px solid ${COLORS.border}`,
      boxShadow: `4px 4px 0 ${COLORS.shadow}`,
      // hover: 整体下移 2px，阴影变浅
      // active: 整体下移 4px，阴影消失
    },
    danger: {
      // 付费墙按钮用红色
      backgroundColor: COLORS.legoRed,
      color: COLORS.textInverted,
      border: `2px solid ${COLORS.border}`,
      boxShadow: `4px 4px 0 ${COLORS.shadow}`,
    },
  },

  // 徽章 / 标签（如「付费解锁」「避坑」）
  badge: {
    border: `2px solid ${COLORS.border}`,
    padding: "4px 8px",
    fontFamily: FONTS.pixel,
    fontSize: "10px", // 像素字体小一点更地道
  },

  // 雷达图样式
  radarChart: {
    gridColor: COLORS.border,
    fillColor: "rgba(26, 26, 46, 0.15)",
    strokeColor: COLORS.border,
    pointColor: COLORS.legoRed,
  },
} as const;

// ========== 4. 像素小人偶概念（8 种）==========
// 决策：抽象 8-bit 像素人（FC 红白机风格），不写实 LEGO Minifigure
// 规避乐高版权 + 更符合 25-40 岁中国人童年记忆
// 设计规范：16x16 或 32x32 像素，主色 = 人格主题色，识别度靠道具

export const PERSONA_SPRITES = {
  G1: {
    name: "斜杠创造者",
    concept: "戴贝雷帽的艺术家，手持调色板",
    keyProps: ["贝雷帽", "调色板", "画笔"],
    color: COLORS.personaColors.G1,
    referenceStyle: "FC 马里奥画家关底 NPC 的极简版",
  },
  G2: {
    name: "资源掮客",
    concept: "戴礼帽的中间商，手持大哥大",
    keyProps: ["礼帽", "老式手机", "西装领"],
    color: COLORS.personaColors.G2,
    referenceStyle: "FC 洛克人商人类 NPC",
  },
  G3: {
    name: "稳健理财师",
    concept: "戴圆框眼镜，手持算盘或报表",
    keyProps: ["圆框眼镜", "算盘", "领带"],
    color: COLORS.personaColors.G3,
    referenceStyle: "FC 文明类游戏的顾问角色",
  },
  G4: {
    name: "执行机器",
    concept: "戴工帽，手持扳手",
    keyProps: ["工帽", "扳手", "工装"],
    color: COLORS.personaColors.G4,
    referenceStyle: "FC 马里奥工程师路易吉的简化版",
  },
  G5: {
    name: "社群教主",
    concept: "戴皇冠，手持喇叭",
    keyProps: ["皇冠", "扩音喇叭", "披风"],
    color: COLORS.personaColors.G5,
    referenceStyle: "FC RPG 游戏的国王 NPC",
  },
  G6: {
    name: "技术匠人",
    concept: "方框眼镜，手持笔记本电脑",
    keyProps: ["方框眼镜", "笔电", "T 恤"],
    color: COLORS.personaColors.G6,
    referenceStyle: "FC 勇者斗恶龙的智者角色",
  },
  G7: {
    name: "流量操盘手",
    concept: "戴墨镜，手持火箭",
    keyProps: ["墨镜", "小火箭", "皮夹克"],
    color: COLORS.personaColors.G7,
    referenceStyle: "FC 高桥名人冒险岛的主角气质",
  },
  G8: {
    name: "佛系收租公",
    concept: "戴睡帽，手持茶杯",
    keyProps: ["睡帽", "茶杯", "拖鞋"],
    color: COLORS.personaColors.G8,
    referenceStyle: "FC 模拟人生类游戏的休闲 NPC",
  },
} as const;

// ========== 5. 动效 ==========
// 决策：克制使用，关键节点放大仪式感

export const ANIMATIONS = {
  // 题目切换：0.2s 淡入，无像素化滤镜（避免影响可读性）
  questionTransition: {
    duration: "0.2s",
    type: "fade",
  },

  // 人格揭晓：抖动 + 闪烁 0.5s（仪式感）
  personaReveal: {
    duration: "0.5s",
    type: "shake + blink",
    description: "像素抖动模拟 FC 游戏过关动画",
  },

  // 数字滚动：从 0 跳到目标值（计分牌效果）
  numberCountUp: {
    duration: "1.2s",
    type: "count-up",
    description: "像 FC 游戏计分牌",
  },

  // 按钮按压：transform translate + shadow 减少
  buttonPress: {
    hoverTransform: "translate(0, 0)",
    activeTransform: "translate(2px, 2px)",
    activeShadowOffset: "2px",
  },

  // CRT 扫描线（结果页背景叠加，opacity 极低）
  crtScanline: {
    opacity: "0.03", // 用户没要求但极低不影响阅读
    description: "可选开关，默认关闭，避免过度复古",
  },
} as const;

// ========== 6. 工具：获取人格主题色辅助函数 ==========

export function getPersonaColor(code: "G1" | "G2" | "G3" | "G4" | "G5" | "G6" | "G7" | "G8"): string {
  return COLORS.personaColors[code];
}

// ========== 7. 技术实现备忘 ==========

export const TECH_NOTES = {
  // 字体加载策略
  fontLoading: {
    strategy: "中文网字计划分包（按需加载字形）",
    fallback: "font-display: swap + system-ui 降级",
    criticalPath: "Press Start 2P 必须 preload（小，30KB）",
    chinesePixel: "Zpix 全量 3MB 太大，必须用 chinese-font-pc 工具分包",
  },

  // neobrutalism 组件复用
  componentReuse: {
    primary: "https://www.neobrutalism.dev/ 直接复制组件代码（MIT）",
    shadcn: "https://shadcn.io/template/ekmas-neobrutalism-components React 版",
    diy: "Tailwind 自定义阴影类 shadow-neo = 4px 4px 0 #1A1A2E",
  },

  // 像素图绘制工具
  pixelArt: {
    tool: "Piskel (https://www.piskelapp.com/) 网页版免费",
    export: "PNG sprite sheet + 1x/2x/3x 三倍图",
    gridSize: "16x16（用于 UI 内）/ 32x32（用于结果页头图）",
  },

  // 分享海报（@vercel/og）
  shareCard: {
    size: "1080x1920 (朋友圈/小红书适配)",
    tool: "@vercel/og 服务端渲染（保证像素字体不模糊）",
    qrCode: "右下角放置，扫码直达测试页",
  },
} as const;
