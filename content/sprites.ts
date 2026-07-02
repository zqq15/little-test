// 像素小人偶数据 · 16×16 网格 · ASCII art 风格
// 每个字符代表 1 个像素，调色板在 palette 字段

export interface SpriteData {
  grid: string[];        // 16 行，每行严格 16 字符
  palette: Record<string, string | null>;  // 字符 → 颜色，null = 透明
}

// G1 🎨 斜杠创造者：红贝雷帽 + 橙色身体 + 调色板
const G1_SPRITE: SpriteData = {
  palette: {
    R: "#D01012",  // 红 - 贝雷帽
    S: "#FFD6A8",  // 肤色
    B: "#1A1A2E",  // 黑 - 轮廓/眼睛
    O: "#FF6B35",  // 橙 - 主题色身体
    W: "#FFFFFF",  // 白 - 调色板
    Y: "#F6EC35",  // 黄颜料
    G: "#2DBE2C",  // 绿颜料
    ".": null,
  },
  grid: [
    ".....RRRRRR.....",
    "....RRRRRRRR....",
    "...RRRRRRRRRR...",
    "...SSSSSSSSSS...",
    "...SSSSSSSSSS...",
    "...SBSSSSSSBSS..",
    "...SSSSSSSSSS...",
    "...SSSKKKKSSS...",
    "....OOOOOOOO....",
    "..OOOOOOOOOOOO..",
    ".OOOOOOOOOOOOOO.",
    ".OOOOOOOOOOOOWWW",
    ".OOOOOOOOOOOWRYW",
    ".OOOOOOOOOOOOWWW",
    "..OOOO....OOOO..",
    "..BBBB....BBBB..",
  ],
};

// G4 ⚙️ 执行机器：黄工帽 + 紫色身体 + 银扳手
const G4_SPRITE: SpriteData = {
  palette: {
    Y: "#F6EC35",  // 黄 - 工帽
    S: "#FFD6A8",
    B: "#1A1A2E",
    K: "#1A1A2E",  // 嘴
    P: "#6C2E9C",  // 紫 - 主题色
    G: "#C0C0C0",  // 银 - 扳手
    D: "#808080",  // 深灰 - 扳手细节
    ".": null,
  },
  grid: [
    ".....YYYYYY.....",
    "....YYYYYYYY....",
    "...YYYYYYYYYY...",
    "..YYYYYYYYYYYY..",
    "...SSSSSSSSSS...",
    "...SBSSSSSSBSS..",
    "...SSSSSSSSSS...",
    "...SSSKKKKSSS...",
    "....PPPPPPPP....",
    "..PPPPPPPPPPPP..",
    ".PPPPPPPPPPPPPP.",
    ".PPPPPPPPPPPPGGG",
    ".PPPPPPPPPPPGGDD",
    ".PPPPPPPPPPPPGGG",
    "..PPPP....PPPP..",
    "..BBBB....BBBB..",
  ],
};

// G7 🚀 流量操盘手：黑发墨镜 + 红皮夹克 + 小火箭
const G7_SPRITE: SpriteData = {
  palette: {
    B: "#1A1A2E",  // 黑 - 头发/墨镜/皮夹克
    S: "#FFD6A8",
    K: "#1A1A2E",  // 嘴
    R: "#D01012",  // 红 - 主题色身体 + 火箭尖
    Y: "#F6EC35",  // 黄 - 火箭身 + 火焰
    O: "#FF6B35",  // 橙 - 火焰
    ".": null,
  },
  grid: [
    "...BBBBBBBBBB...",
    "..BBBBBBBBBBBB..",
    ".BBBBBBBBBBBBBB.",
    "...SSSSSSSSSS...",
    "...SSSSSSSSSS...",
    "...BBBBBBBBBB...",
    "...SSSSSSSSSS...",
    "...SSSKKKKSSS...",
    "....RRRRRRRR....",
    "..RRRRRRRRRRRR..",
    ".RRRRRRRRRRRRRR.",
    ".RRRRRRRRRRRRRRY",
    ".RRRRRRRRRRRRRRY",
    ".RRRRRRRRRRRRRYO",
    "..RRRR....RRRRYY",
    "..BBBB....BBBB..",
  ],
};

// ============================================================
// G2 / G3 / G5 / G6 / G8 暂用 G1 占位（待绘制）
// TODO: 后续补完剩下 5 个角色的像素小人偶
// ============================================================

export const SPRITES: Record<string, SpriteData> = {
  G1: G1_SPRITE,
  G2: G1_SPRITE,  // TODO: 待画 - 礼帽 + 大哥大（蓝色调）
  G3: G1_SPRITE,  // TODO: 待画 - 圆框眼镜 + 算盘（绿色调）
  G4: G4_SPRITE,
  G5: G1_SPRITE,  // TODO: 待画 - 皇冠 + 喇叭（粉色调）
  G6: G1_SPRITE,  // TODO: 待画 - 方框眼镜 + 笔电（深绿调）
  G7: G7_SPRITE,
  G8: G1_SPRITE,  // TODO: 待画 - 睡帽 + 茶杯（金色调）
};

export function getSprite(personaCode: string): SpriteData {
  return SPRITES[personaCode] ?? G1_SPRITE;
}
