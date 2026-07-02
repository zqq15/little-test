// 搞钱体质测试 · 24 题题库
// 6 维度：D1 风险偏好 / D2 社交模式 / D3 时间结构 / D4 技能倾向 / D5 内驱力 / D6 抗压模式
// 每维度两端：D1 保守↔高风险 · D2 独处↔社交 · D3 固定↔灵活 · D4 创作↔资源 · D5 兴趣↔收益 · D6 低压↔高压

export type Dimension =
  | "D1_RISK" // 风险偏好：conservative(保守) ↔ risky(高风险)
  | "D2_SOCIAL" // 社交模式：solo(独处) ↔ social(社交)
  | "D3_TIME" // 时间结构：fixed(固定) ↔ flexible(灵活)
  | "D4_SKILL" // 技能倾向：creative(创作) ↔ resource(资源)
  | "D5_DRIVE" // 内驱力：interest(兴趣) ↔ profit(收益)
  | "D6_STRESS"; // 抗压模式：low(低压) ↔ high(高压)

export interface OptionWeight {
  dimension: Dimension;
  // -1 代表维度左端（如 D1 conservative），+1 代表维度右端（D1 risky）
  value: -1 | 1;
}

export interface Option {
  id: "A" | "B" | "C" | "D";
  text: string;
  weights: OptionWeight[];
}

export interface Question {
  id: number;
  scene: string; // 场景标签
  title: string;
  options: Option[];
}

export const QUESTIONS: Question[] = [
  // ========== D1 风险偏好（主导） ==========
  {
    id: 1,
    scene: "刷视频",
    title: "刷到「00 后靠副业月入 5 万」的视频，你的真实反应？",
    options: [
      {
        id: "A",
        text: "默默划走，跟我有什么关系",
        weights: [{ dimension: "D1_RISK", value: -1 }],
      },
      {
        id: "B",
        text: "立刻收藏 + 关注作者，研究他怎么搞的",
        weights: [{ dimension: "D5_DRIVE", value: 1 }],
      },
      {
        id: "C",
        text: "评论区「求带」，先问问路",
        weights: [{ dimension: "D2_SOCIAL", value: 1 }],
      },
      {
        id: "D",
        text: "算他单位时间收益，看值不值得抄",
        weights: [{ dimension: "D4_SKILL", value: 1 }],
      },
    ],
  },
  {
    id: 2,
    scene: "朋友拉你",
    title: "朋友想拉你合伙开奶茶店，要你出 5 万。你的第一反应？",
    options: [
      {
        id: "A",
        text: "直接拒，5 万存余额宝不香吗",
        weights: [{ dimension: "D1_RISK", value: -1 }],
      },
      {
        id: "B",
        text: "让他先发 BP 和财务模型",
        weights: [{ dimension: "D4_SKILL", value: 1 }],
      },
      {
        id: "C",
        text: "看朋友靠谱度，人比项目重要",
        weights: [{ dimension: "D2_SOCIAL", value: 1 }],
      },
      {
        id: "D",
        text: "谈不拢就当交学费，赌一把",
        weights: [{ dimension: "D1_RISK", value: 1 }],
      },
    ],
  },
  {
    id: 3,
    scene: "存款处置",
    title: "你的存款刚到 10 万，怎么处理？",
    options: [
      {
        id: "A",
        text: "全部存定期/货基，落袋为安",
        weights: [{ dimension: "D1_RISK", value: -1 }],
      },
      {
        id: "B",
        text: "留 3 万应急，其余 all in 想做的事",
        weights: [{ dimension: "D1_RISK", value: 1 }],
      },
      {
        id: "C",
        text: "买课/报班，投资自己才是真复利",
        weights: [{ dimension: "D5_DRIVE", value: -1 }],
      },
      {
        id: "D",
        text: "分散配置，稳健为主，少量试水高风险",
        weights: [{ dimension: "D6_STRESS", value: -1 }],
      },
    ],
  },
  {
    id: 4,
    scene: "副业雷区",
    title: "选副业时，下面哪种你绝对不能接受？",
    options: [
      {
        id: "A",
        text: "三个月没收入，但后面可能爆发",
        weights: [{ dimension: "D1_RISK", value: -1 }],
      },
      {
        id: "B",
        text: "必须天天拍视频露脸，社死现场",
        weights: [{ dimension: "D2_SOCIAL", value: -1 }],
      },
      {
        id: "C",
        text: "凌晨才能干，必须熬夜",
        weights: [{ dimension: "D6_STRESS", value: -1 }],
      },
      {
        id: "D",
        text: "每天重复劳动，没有任何创造性",
        weights: [{ dimension: "D4_SKILL", value: -1 }],
      },
    ],
  },

  // ========== D2 社交模式（主导） ==========
  {
    id: 5,
    scene: "周五晚上",
    title: "周五晚上 9 点刚下班，你通常会？",
    options: [
      {
        id: "A",
        text: "看个纪录片或读本书，独处回血",
        weights: [
          { dimension: "D2_SOCIAL", value: -1 },
          { dimension: "D6_STRESS", value: -1 },
        ],
      },
      {
        id: "B",
        text: "约朋友喝酒 / 吃夜宵，狂聊一晚",
        weights: [
          { dimension: "D2_SOCIAL", value: 1 },
          { dimension: "D5_DRIVE", value: -1 },
        ],
      },
      {
        id: "C",
        text: "打开同花顺 / 交易 App 研究行情",
        weights: [{ dimension: "D4_SKILL", value: 1 }],
      },
      {
        id: "D",
        text: "趁状态好，赶完那个外包私活",
        weights: [{ dimension: "D6_STRESS", value: 1 }],
      },
    ],
  },
  {
    id: 6,
    scene: "群消息",
    title: "工作群里 99+ 未读消息，你的处理方式？",
    options: [
      {
        id: "A",
        text: "直接免打扰，反正有人 @ 我才看",
        weights: [{ dimension: "D2_SOCIAL", value: -1 }],
      },
      {
        id: "B",
        text: "立刻全部读完，怕错过信息",
        weights: [{ dimension: "D6_STRESS", value: 1 }],
      },
      {
        id: "C",
        text: "只看 @ 我和领导的，其余跳过",
        weights: [{ dimension: "D3_TIME", value: 1 }],
      },
      {
        id: "D",
        text: "顺手在水群活跃一下气氛",
        weights: [{ dimension: "D2_SOCIAL", value: 1 }],
      },
    ],
  },
  {
    id: 7,
    scene: "朋友圈",
    title: "你发朋友圈 / 小红书的频率和内容？",
    options: [
      {
        id: "A",
        text: "几乎不发，看别人就够了",
        weights: [{ dimension: "D2_SOCIAL", value: -1 }],
      },
      {
        id: "B",
        text: "偶尔发生活日常，朋友互动",
        weights: [{ dimension: "D2_SOCIAL", value: 1 }],
      },
      {
        id: "C",
        text: "经常分享专业内容 / 行业洞察",
        weights: [
          { dimension: "D4_SKILL", value: -1 },
          { dimension: "D5_DRIVE", value: -1 },
        ],
      },
      {
        id: "D",
        text: "什么火发什么，跟着流量走",
        weights: [{ dimension: "D5_DRIVE", value: 1 }],
      },
    ],
  },
  {
    id: 8,
    scene: "新环境",
    title: "公司团建走进一个全是陌生人的场子，你会？",
    options: [
      {
        id: "A",
        text: "找角落坐下，玩手机等人来搭话",
        weights: [{ dimension: "D2_SOCIAL", value: -1 }],
      },
      {
        id: "B",
        text: "30 分钟内认识 5 个新朋友",
        weights: [{ dimension: "D2_SOCIAL", value: 1 }],
      },
      {
        id: "C",
        text: "找认识的人聊，不主动扩展",
        weights: [{ dimension: "D6_STRESS", value: -1 }],
      },
      {
        id: "D",
        text: "顺手收集一波名片/微信，没准用得上",
        weights: [{ dimension: "D4_SKILL", value: 1 }],
      },
    ],
  },

  // ========== D3 时间结构（主导） ==========
  {
    id: 9,
    scene: "理想节奏",
    title: "下面哪种工作节奏最让你舒服？",
    options: [
      {
        id: "A",
        text: "每天固定 2 小时，雷打不动",
        weights: [{ dimension: "D3_TIME", value: -1 }],
      },
      {
        id: "B",
        text: "状态好干 8 小时，状态差就摆烂",
        weights: [
          { dimension: "D3_TIME", value: 1 },
          { dimension: "D6_STRESS", value: -1 },
        ],
      },
      {
        id: "C",
        text: "习惯冲刺，deadline 是第一生产力",
        weights: [{ dimension: "D6_STRESS", value: 1 }],
      },
      {
        id: "D",
        text: "完全凭兴趣，想到就做",
        weights: [
          { dimension: "D5_DRIVE", value: -1 },
          { dimension: "D3_TIME", value: 1 },
        ],
      },
    ],
  },
  {
    id: 10,
    scene: "周末",
    title: "周六上午醒来，你的标准操作？",
    options: [
      {
        id: "A",
        text: "睡到自然醒，点外卖刷剧",
        weights: [{ dimension: "D6_STRESS", value: -1 }],
      },
      {
        id: "B",
        text: "早起跑步 / 健身 / 学习，固定流程",
        weights: [{ dimension: "D3_TIME", value: -1 }],
      },
      {
        id: "C",
        text: "见朋友 / 逛街 / 体验新东西",
        weights: [{ dimension: "D2_SOCIAL", value: 1 }],
      },
      {
        id: "D",
        text: "看看上周副业数据，规划下周",
        weights: [{ dimension: "D5_DRIVE", value: 1 }],
      },
    ],
  },
  {
    id: 11,
    scene: "通勤",
    title: "每天通勤 1 小时，你通常在做什么？",
    options: [
      {
        id: "A",
        text: "听播客 / 看书，雷打不动",
        weights: [{ dimension: "D3_TIME", value: -1 }],
      },
      {
        id: "B",
        text: "刷短视频 / 网文，放空大脑",
        weights: [{ dimension: "D6_STRESS", value: -1 }],
      },
      {
        id: "C",
        text: "处理工作消息，提前进入状态",
        weights: [{ dimension: "D6_STRESS", value: 1 }],
      },
      {
        id: "D",
        text: "看心情，今天想干啥就干啥",
        weights: [{ dimension: "D3_TIME", value: 1 }],
      },
    ],
  },
  {
    id: 12,
    scene: "长假",
    title: "7 天长假你怎么安排？",
    options: [
      {
        id: "A",
        text: "做详细攻略 + 行程表，按计划执行",
        weights: [{ dimension: "D3_TIME", value: -1 }],
      },
      {
        id: "B",
        text: "完全随性，临时决定去哪",
        weights: [{ dimension: "D3_TIME", value: 1 }],
      },
      {
        id: "C",
        text: "在家闭关做副业 / 学习",
        weights: [{ dimension: "D5_DRIVE", value: 1 }],
      },
      {
        id: "D",
        text: "见各种朋友，把所有约饭清掉",
        weights: [{ dimension: "D2_SOCIAL", value: 1 }],
      },
    ],
  },

  // ========== D4 技能倾向（主导） ==========
  {
    id: 13,
    scene: "新机会",
    title: "看到风口（如 AI 工具、跨境、短剧），你的反应？",
    options: [
      {
        id: "A",
        text: "立刻动手做个 demo / 写一篇测评",
        weights: [{ dimension: "D4_SKILL", value: -1 }],
      },
      {
        id: "B",
        text: "先找供应商 / 渠道 / 一手信息源",
        weights: [{ dimension: "D4_SKILL", value: 1 }],
      },
      {
        id: "C",
        text: "看有没有大佬带，跟着喝汤",
        weights: [{ dimension: "D2_SOCIAL", value: 1 }],
      },
      {
        id: "D",
        text: "观察半年再说，怕被割",
        weights: [{ dimension: "D1_RISK", value: -1 }],
      },
    ],
  },
  {
    id: 14,
    scene: "团队角色",
    title: "项目组里你通常是哪种角色？",
    options: [
      {
        id: "A",
        text: "出方案 / 写文档 / 做设计",
        weights: [{ dimension: "D4_SKILL", value: -1 }],
      },
      {
        id: "B",
        text: "对接资源 / 跑客户 / 协调人",
        weights: [{ dimension: "D4_SKILL", value: 1 }],
      },
      {
        id: "C",
        text: "执行落地 / 干活最快的那个",
        weights: [{ dimension: "D6_STRESS", value: 1 }],
      },
      {
        id: "D",
        text: "提供情绪价值 / 活跃气氛",
        weights: [{ dimension: "D2_SOCIAL", value: 1 }],
      },
    ],
  },
  {
    id: 15,
    scene: "学新东西",
    title: "学新技能（比如剪辑、AI 绘画、Python），你的方式？",
    options: [
      {
        id: "A",
        text: "跟着教程动手做项目，边做边学",
        weights: [{ dimension: "D4_SKILL", value: -1 }],
      },
      {
        id: "B",
        text: "找付费课程，让老师把路趟好",
        weights: [{ dimension: "D5_DRIVE", value: 1 }],
      },
      {
        id: "C",
        text: "找圈子和社群，跟同行学",
        weights: [{ dimension: "D2_SOCIAL", value: 1 }],
      },
      {
        id: "D",
        text: "用到才学，不用就忘",
        weights: [{ dimension: "D3_TIME", value: 1 }],
      },
    ],
  },
  {
    id: 16,
    scene: "副业起手",
    title: "你想开始一个副业，第一件事会做什么？",
    options: [
      {
        id: "A",
        text: "写一份计划 / SWOT 分析 / 用户画像",
        weights: [{ dimension: "D4_SKILL", value: -1 }],
      },
      {
        id: "B",
        text: "找 5 个做的最好的人，研究他们的打法",
        weights: [{ dimension: "D4_SKILL", value: 1 }],
      },
      {
        id: "C",
        text: "先发条朋友圈 / 小红书探探需求",
        weights: [{ dimension: "D2_SOCIAL", value: 1 }],
      },
      {
        id: "D",
        text: "直接干，边做边调整",
        weights: [{ dimension: "D1_RISK", value: 1 }],
      },
    ],
  },

  // ========== D5 内驱力（主导） ==========
  {
    id: 17,
    scene: "选 offer",
    title: "两个 offer，你怎么选？",
    options: [
      {
        id: "A",
        text: "感兴趣的，月薪 1.5 万",
        weights: [{ dimension: "D5_DRIVE", value: -1 }],
      },
      {
        id: "B",
        text: "无聊但稳定，月薪 2.5 万",
        weights: [{ dimension: "D5_DRIVE", value: 1 }],
      },
      {
        id: "C",
        text: "都要，看哪边能让我做副业",
        weights: [{ dimension: "D3_TIME", value: 1 }],
      },
      {
        id: "D",
        text: "选有大佬的那个，跟他学",
        weights: [{ dimension: "D2_SOCIAL", value: 1 }],
      },
    ],
  },
  {
    id: 18,
    scene: "副业收入",
    title: "副业第一个月赚了 500 块，你的反应？",
    options: [
      {
        id: "A",
        text: "兴奋！请自己吃顿好的庆祝",
        weights: [{ dimension: "D5_DRIVE", value: -1 }],
      },
      {
        id: "B",
        text: "太少了，算下时薪才 10 块，要优化",
        weights: [{ dimension: "D5_DRIVE", value: 1 }],
      },
      {
        id: "C",
        text: "复盘哪个环节能放大 10 倍",
        weights: [{ dimension: "D4_SKILL", value: 1 }],
      },
      {
        id: "D",
        text: "截图发朋友圈，立「副业搞钱人」人设",
        weights: [{ dimension: "D2_SOCIAL", value: 1 }],
      },
    ],
  },
  {
    id: 19,
    scene: "看年薪",
    title: "你最羡慕下面哪种人？",
    options: [
      {
        id: "A",
        text: "做自己热爱的事还能赚大钱的（如旅行博主）",
        weights: [{ dimension: "D5_DRIVE", value: -1 }],
      },
      {
        id: "B",
        text: "靠投资 / 资产躺着赚钱的（如收租大爷）",
        weights: [{ dimension: "D1_RISK", value: -1 }],
      },
      {
        id: "C",
        text: "靠一门手艺吃到顶的（如顶流律师/医生）",
        weights: [{ dimension: "D4_SKILL", value: -1 }],
      },
      {
        id: "D",
        text: "靠资源和人脉搞大生意的（如企业家）",
        weights: [
          { dimension: "D4_SKILL", value: 1 },
          { dimension: "D5_DRIVE", value: 1 },
        ],
      },
    ],
  },
  {
    id: 20,
    scene: "工资到账",
    title: "工资到账那一天，你的标准操作？",
    options: [
      {
        id: "A",
        text: "立刻转出投资 / 还贷 / 储蓄，规划清楚",
        weights: [{ dimension: "D3_TIME", value: -1 }],
      },
      {
        id: "B",
        text: "看一眼余额，心安了，照常过",
        weights: [{ dimension: "D6_STRESS", value: -1 }],
      },
      {
        id: "C",
        text: "犒劳自己，吃顿好的 / 买个心仪的东西",
        weights: [{ dimension: "D5_DRIVE", value: -1 }],
      },
      {
        id: "D",
        text: "立刻算本月副业要补多少缺口",
        weights: [{ dimension: "D5_DRIVE", value: 1 }],
      },
    ],
  },

  // ========== D6 抗压模式（主导） ==========
  {
    id: 21,
    scene: "项目延期",
    title: "项目快 deadline 突然出大 bug，你的状态？",
    options: [
      {
        id: "A",
        text: "心跳加速，但立刻进入战斗模式",
        weights: [{ dimension: "D6_STRESS", value: 1 }],
      },
      {
        id: "B",
        text: "脑子一片空白，需要先冷静 10 分钟",
        weights: [{ dimension: "D6_STRESS", value: -1 }],
      },
      {
        id: "C",
        text: "找最熟的朋友吐槽完再回去解决",
        weights: [{ dimension: "D2_SOCIAL", value: 1 }],
      },
      {
        id: "D",
        text: "顺手开个文档记录事故，复盘素材get",
        weights: [{ dimension: "D4_SKILL", value: -1 }],
      },
    ],
  },
  {
    id: 22,
    scene: "评价自己",
    title: "朋友说你「太卷了」，你的真实心态？",
    options: [
      {
        id: "A",
        text: "卷死了，但不卷没安全感",
        weights: [{ dimension: "D6_STRESS", value: 1 }],
      },
      {
        id: "B",
        text: "其实我想躺，但怕掉队",
        weights: [
          { dimension: "D6_STRESS", value: -1 },
          { dimension: "D5_DRIVE", value: 1 },
        ],
      },
      {
        id: "C",
        text: "做的都是喜欢的事，不觉得卷",
        weights: [{ dimension: "D5_DRIVE", value: -1 }],
      },
      {
        id: "D",
        text: "我这算啥，我朋友圈比我卷 10 倍",
        weights: [{ dimension: "D2_SOCIAL", value: 1 }],
      },
    ],
  },
  {
    id: 23,
    scene: "突发焦虑",
    title: "凌晨 2 点突然焦虑「我未来怎么办」，你怎么破？",
    options: [
      {
        id: "A",
        text: "立刻打开备忘录列计划，焦虑就消失",
        weights: [{ dimension: "D3_TIME", value: -1 }],
      },
      {
        id: "B",
        text: "看搞笑视频 / 网文转移注意力",
        weights: [{ dimension: "D6_STRESS", value: -1 }],
      },
      {
        id: "C",
        text: "找朋友疯狂发消息吐槽",
        weights: [{ dimension: "D2_SOCIAL", value: 1 }],
      },
      {
        id: "D",
        text: "立刻打开电脑干点活，干活治百病",
        weights: [{ dimension: "D6_STRESS", value: 1 }],
      },
    ],
  },
  {
    id: 24,
    scene: "终极选择",
    title: "如果给你一年时间专门搞钱，你想要哪种结果？",
    options: [
      {
        id: "A",
        text: "做出来一个属于我的作品 / 品牌，圈粉无数",
        weights: [
          { dimension: "D4_SKILL", value: -1 },
          { dimension: "D5_DRIVE", value: -1 },
        ],
      },
      {
        id: "B",
        text: "攒下 100 万现金，安全感拉满",
        weights: [{ dimension: "D1_RISK", value: -1 }],
      },
      {
        id: "C",
        text: "认识 100 个能帮我搞钱的大佬",
        weights: [{ dimension: "D4_SKILL", value: 1 }],
      },
      {
        id: "D",
        text: "搞定一个年入百万的稳定系统（哪怕要爆肝）",
        weights: [{ dimension: "D6_STRESS", value: 1 }],
      },
    ],
  },
];

// 维度元信息
export const DIMENSION_META: Record<
  Dimension,
  { name: string; leftLabel: string; rightLabel: string; description: string }
> = {
  D1_RISK: {
    name: "风险偏好",
    leftLabel: "保守稳健",
    rightLabel: "高风险高回报",
    description: "面对不确定性，你是落袋为安还是搏一把？",
  },
  D2_SOCIAL: {
    name: "社交模式",
    leftLabel: "独处充电",
    rightLabel: "社交达人",
    description: "你的能量是从独处还是从人群中获得？",
  },
  D3_TIME: {
    name: "时间结构",
    leftLabel: "固定节奏",
    rightLabel: "碎片灵活",
    description: "你的时间是被纪律塑造，还是被灵感驱动？",
  },
  D4_SKILL: {
    name: "技能倾向",
    leftLabel: "创作输出",
    rightLabel: "资源整合",
    description: "你的核心竞争力是动手做，还是找资源？",
  },
  D5_DRIVE: {
    name: "内驱力",
    leftLabel: "兴趣驱动",
    rightLabel: "收益驱动",
    description: "你做选择时，更看「喜欢」还是「划算」？",
  },
  D6_STRESS: {
    name: "抗压模式",
    leftLabel: "低压舒适",
    rightLabel: "高压耐受",
    description: "面对压力，你是逃还是冲？",
  },
};
