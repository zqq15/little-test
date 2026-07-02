// 搞钱体质 · 8 种人格完整文案
// 文案原则：有梗、有画面、不说教、让人想截图转发

export interface SideHustle {
  rank: 1 | 2 | 3;
  emoji: string;
  name: string;
  matchScore: number; // 匹配度 %
  monthlyPotential: string; // 月入潜力
  startupCost: string; // 启动成本
  timeRequired: string; // 时间投入
  platforms: string[]; // 推荐平台
  reason: string; // 为什么适合你
  firstStep: string; // 第一步具体动作
}

export interface AvoidItem {
  emoji: string;
  name: string;
  reason: string;
}

export interface Plan90d {
  phase: string;
  weeks: string;
  goals: string[];
}

export interface Persona {
  id: string;
  code: string;
  emoji: string;
  name: string;
  archetype: string; // 一句话标签
  tagline: string; // 报告头图用一句话钩子
  populationRatio: string; // 人群占比
  portrait: string[]; // 详细画像，分段
  strengths: string[];
  fatalFlaws: string[];
  topSideHustles: SideHustle[];
  avoidList: AvoidItem[];
  plan90d: Plan90d[];
  celebritySame: string[];
  bestMatch: { code: string; reason: string }[];
  // 用于算法匹配的人格原型维度倾向（-1 到 1，对应 DIMENSION 两端）
  vector: {
    D1_RISK: number;
    D2_SOCIAL: number;
    D3_TIME: number;
    D4_SKILL: number;
    D5_DRIVE: number;
    D6_STRESS: number;
  };
}

export const PERSONAS: Persona[] = [
  // ===================== G1 斜杠创造者 =====================
  {
    id: "g1",
    code: "G1",
    emoji: "🎨",
    name: "斜杠创造者",
    archetype: "用作品说话的野生艺术家",
    tagline: "白天打工，半夜创作，作品就是你的护城河",
    populationRatio: "全国 7.3% 的打工人",
    portrait: [
      "你脑子里总有 100 个想法，备忘录塞满了「以后要做」的项目清单。别人下班躺平，你下班反而像换了个人——打开 Figma、剪映、Notion，状态全开。",
      "让你做重复执行类工作，你会比死还难受。但只要给你一个能「搞创作」的题目，你能熬到凌晨三点还神采奕奕。",
      "你的搞钱逻辑是：先做我喜欢的东西，再想怎么变现。这个顺序倒过来就不成立——让你做不喜欢的项目赚再多钱，你也会摸鱼摆烂。",
      "你的危险在于：兴趣太多、聚焦不够。今天做播客，明天做 NFT，后天搞 AI 绘画。每个都浅尝辄止，没积累。",
    ],
    strengths: [
      "内驱力天然在线，不需要老板 push 也能产出",
      "对审美和趋势敏感，做出来的东西自带传播力",
      "学习能力强，新工具上手快（毕竟要折腾）",
      "作品能沉淀，今天写的内容三年后还能带流量",
    ],
    fatalFlaws: [
      "兴趣广泛但容易三分钟热度，缺少坚持的肌肉",
      "对商业逻辑和数据天然排斥，觉得「谈钱伤感情」",
      "完美主义，常常因为不够满意就发不出去",
    ],
    topSideHustles: [
      {
        rank: 1,
        emoji: "✍️",
        name: "知识付费 / 付费专栏",
        matchScore: 94,
        monthlyPotential: "¥3K – 2W",
        startupCost: "¥0",
        timeRequired: "周末 + 每晚 1-2 小时",
        platforms: ["小报童", "知识星球", "公众号", "即刻"],
        reason: "你天生会表达、有沉淀。把日常思考结构化卖就是知识产品。",
        firstStep: "在小报童开个专栏，本周内发第一篇，定价 ¥19/月",
      },
      {
        rank: 2,
        emoji: "📸",
        name: "内容种草（小红书 / 即刻）",
        matchScore: 87,
        monthlyPotential: "¥1K – 1W",
        startupCost: "¥0",
        timeRequired: "每天 30 分钟",
        platforms: ["小红书", "即刻", "B 站"],
        reason: "你的审美和捕捉生活的能力，天然适合做内容种草。",
        firstStep: "在小红书选定一个垂直方向，本周连发 5 条测试数据",
      },
      {
        rank: 3,
        emoji: "🎨",
        name: "设计 / 剪辑 / 写作接单",
        matchScore: 82,
        monthlyPotential: "¥2K – 1.5W",
        startupCost: "¥0 – 500",
        timeRequired: "按单计费，灵活",
        platforms: ["站酷", "甜薪客", "小红书接单", "熟人介绍"],
        reason: "用你已有的技能接单，最快变现，且能积累作品集。",
        firstStep: "整理 5 个代表作发到小红书 + 站酷，挂接单邮箱",
      },
    ],
    avoidList: [
      {
        emoji: "🤝",
        name: "团长 / 私域分销",
        reason: "你的社交偏好偏低，天天发圈卖货会消耗你大量情绪能量，最后副业变「负业」。",
      },
      {
        emoji: "📈",
        name: "高频交易 / 短线炒股",
        reason: "你对数字不敏感且情绪起伏大，追涨杀跌必亏。",
      },
      {
        emoji: "📦",
        name: "无货源电商 / 体力型电商",
        reason: "重复上架、客服、发货的体力活，会让你三天就摆烂。",
      },
    ],
    plan90d: [
      {
        phase: "定位期",
        weeks: "Week 1-4",
        goals: [
          "列出你 3 个最擅长 / 最感兴趣的主题",
          "在 3 个平台各发 10 条内容测数据",
          "找到「数据最好 + 你最愿意持续做」的交叉点",
        ],
      },
      {
        phase: "MVP 期",
        weeks: "Week 5-8",
        goals: [
          "选定 1 个主题深耕，停止其他尝试",
          "设计第一个付费产品（¥19-49 的轻量产品）",
          "积累第一批 50 个铁粉",
        ],
      },
      {
        phase: "放大期",
        weeks: "Week 9-12",
        goals: [
          "跑通第一个 ¥1000+ 月收入",
          "设计复购路径（更高客单产品 / 社群）",
          "开始沉淀用户私域，避免平台政策风险",
        ],
      },
    ],
    celebritySame: ["半佛仙人", "竹白主理人", "Tim（影视飓风）", "即刻上的独立创作者"],
    bestMatch: [
      { code: "G2", reason: "资源掮客帮你变现，你专心做内容" },
      { code: "G6", reason: "技术匠人帮你搭工具/系统" },
    ],
    vector: {
      D1_RISK: 0,
      D2_SOCIAL: -0.6,
      D3_TIME: 0.5,
      D4_SKILL: -0.7,
      D5_DRIVE: -0.7,
      D6_STRESS: 0,
    },
  },

  // ===================== G2 资源掮客 =====================
  {
    id: "g2",
    code: "G2",
    emoji: "🤝",
    name: "资源掮客",
    archetype: "靠人脉和信息差赚钱的中间商",
    tagline: "你赚钱的方式，是认识对的人 + 知道对的事",
    populationRatio: "全国 9.1% 的打工人",
    portrait: [
      "你微信通讯录 3000+ 人，分布在不同行业、不同层级。你天生擅长「这个人我认识」「这事我可以撮合」。",
      "别人看信息流是为了娱乐，你看信息流是在扫「这个需求我能撮合吗」「这个资源谁需要」。",
      "你的搞钱逻辑是：手上的资源 + 信息差 + 信任 = 钱。你不需要自己生产，你只需要把对的人和事连接起来。",
      "你的危险在于：你的人脉是浅社交，关键时刻没人真帮你。或者你撮合的事没有壁垒，容易被绕开。",
    ],
    strengths: [
      "人脉广，跨圈层、跨行业信息灵通",
      "天生懂得「双赢话术」，撮合能力一流",
      "对商机嗅觉极敏锐，朋友圈就是你的雷达",
      "不需要从 0 生产，杠杆率极高",
    ],
    fatalFlaws: [
      "深度不够，什么事都懂一点但都不专",
      "口碑靠信任，一次翻车可能满盘皆输",
      "容易被「赚快钱」诱惑，做一锤子买卖",
    ],
    topSideHustles: [
      {
        rank: 1,
        emoji: "🎯",
        name: "社群团购 / 私域带货",
        matchScore: 96,
        monthlyPotential: "¥5K – 5W",
        startupCost: "¥0 – 1000",
        timeRequired: "每天 1-2 小时维护",
        platforms: ["企业微信", "快团团", "小红书私域", "微信群"],
        reason: "你天生会经营关系，私域变现是为你量身定做。",
        firstStep: "梳理现有微信好友，找 100 个高信任度的拉群",
      },
      {
        rank: 2,
        emoji: "🤝",
        name: "撮合佣金 / 居间服务",
        matchScore: 91,
        monthlyPotential: "¥2K – 5W（按单）",
        startupCost: "¥0",
        timeRequired: "随时响应",
        platforms: ["行业人脉", "校友群", "专业社区"],
        reason: "猎头、招商、房产、二手奢侈品……任何信息差行业都是你的舞台。",
        firstStep: "选 1 个你最懂的品类，做 3 单成功撮合，跑通流程",
      },
      {
        rank: 3,
        emoji: "📦",
        name: "无货源电商 / 分销",
        matchScore: 84,
        monthlyPotential: "¥3K – 2W",
        startupCost: "¥500 – 3000",
        timeRequired: "每天 2 小时",
        platforms: ["拼多多", "淘宝", "抖音小店", "小红书店铺"],
        reason: "你不生产货，你只搬运和推荐。完美适配你的资源整合能力。",
        firstStep: "选 1 个高复购品类（零食/日用），开店铺上架 50 个 SKU",
      },
    ],
    avoidList: [
      {
        emoji: "✍️",
        name: "深度内容创作",
        reason: "你没耐心写长文/做精良视频，强行做会被「生产型选手」碾压。",
      },
      {
        emoji: "🔧",
        name: "独立开发 / 技术活",
        reason: "技术不是你的核心，硬上等于和匠人型选手拼短板。",
      },
      {
        emoji: "🎨",
        name: "原创艺术 / 设计",
        reason: "需要深度创作的事让你痛苦，回报周期也长。",
      },
    ],
    plan90d: [
      {
        phase: "盘点期",
        weeks: "Week 1-4",
        goals: [
          "梳理微信通讯录，按行业/价值打标签",
          "找到 3 个你能拿到的「一手货源 / 信息源」",
          "选 1 个细分品类作为主战场",
        ],
      },
      {
        phase: "试单期",
        weeks: "Week 5-8",
        goals: [
          "跑通第一笔撮合交易，建立信心",
          "建 1 个 200 人精准社群",
          "设计分润机制，避免被绕开",
        ],
      },
      {
        phase: "放大期",
        weeks: "Week 9-12",
        goals: [
          "月入稳定破万",
          "把流程 SOP 化，找助理分担",
          "建立个人 IP 提升议价权",
        ],
      },
    ],
    celebritySame: ["校友会活跃分子", "私域团购品牌主理人", "你朋友圈最会撮合的人", "跨境选品服务商"],
    bestMatch: [
      { code: "G1", reason: "创造者产出，你负责放大和变现" },
      { code: "G7", reason: "流量操盘手帮你做投流，你做承接" },
    ],
    vector: {
      D1_RISK: 0.2,
      D2_SOCIAL: 0.9,
      D3_TIME: 0,
      D4_SKILL: 0.7,
      D5_DRIVE: 0.6,
      D6_STRESS: 0.2,
    },
  },

  // ===================== G3 稳健理财师 =====================
  {
    id: "g3",
    code: "G3",
    emoji: "📊",
    name: "稳健理财师",
    archetype: "用数据和耐心慢慢变富的长期主义者",
    tagline: "你不追求暴富，你追求「不输」",
    populationRatio: "全国 12.4% 的打工人",
    portrait: [
      "你的手机第一屏有同花顺、且慢、蚂蚁财富。你Excel 比谁都熟，记账 5 年起。",
      "别人刷小红书看种草，你刷小红书看「FIRE 运动」「资产负债表」。",
      "你的搞钱逻辑是：复利 + 时间 + 纪律。你不追求一年翻倍，你要的是每年 8-15%，连续 20 年。",
      "你的危险在于：过于保守，错过爆发性机会。或者过度研究导致「分析瘫痪」，永远不行动。",
    ],
    strengths: [
      "数据敏感，决策有据可依不靠情绪",
      "纪律性强，能执行长期策略（定投等）",
      "风险意识强，不容易踩大坑",
      "记账习惯好，对现金流了如指掌",
    ],
    fatalFlaws: [
      "过度谨慎，错过「需要冒险才能抓住」的机会",
      "看不起小钱，对小副业没耐心",
      "可能陷入「永远在准备」的分析瘫痪",
    ],
    topSideHustles: [
      {
        rank: 1,
        emoji: "📈",
        name: "指数基金定投 + 资产配置",
        matchScore: 95,
        monthlyPotential: "年化 8-15%",
        startupCost: "¥500 起",
        timeRequired: "每月 1 小时复盘",
        platforms: ["且慢", "蚂蚁财富", "蛋卷基金", "雪球"],
        reason: "数据驱动 + 长期纪律，这是你的天然战场。",
        firstStep: "本周开立券商账户，下个月发薪日启动第一笔定投",
      },
      {
        rank: 2,
        emoji: "🛒",
        name: "跨境电商精品店 / 长尾电商",
        matchScore: 86,
        monthlyPotential: "¥3K – 3W",
        startupCost: "¥3000 – 1W",
        timeRequired: "周末为主",
        platforms: ["亚马逊精品店", "Shopify 独立站", "Etsy"],
        reason: "你懂数据分析，能做精细化选品和 ROI 优化。",
        firstStep: "选 1 个垂直品类，调研 100 个竞品的销量和定价",
      },
      {
        rank: 3,
        emoji: "💰",
        name: "二手捡漏 / 套利",
        matchScore: 80,
        monthlyPotential: "¥1K – 1W",
        startupCost: "¥500 起",
        timeRequired: "碎片时间",
        platforms: ["闲鱼", "得物", "多抓鱼", "回流票务"],
        reason: "你的信息整合能力让你能发现价差，套利变现。",
        firstStep: "选定一个品类（书/球鞋/票），观察 1 周价格规律",
      },
    ],
    avoidList: [
      {
        emoji: "🚀",
        name: "追风口项目（短剧/AI/链游）",
        reason: "你的稳健本能让您在风口爆发期已经犹豫，等想清楚时泡沫已破。",
      },
      {
        emoji: "👥",
        name: "高频社群运营 / 直播带货",
        reason: "需要高强度情绪输出和即时反应，会让你能量耗尽。",
      },
      {
        emoji: "🎨",
        name: "纯创作型副业（写小说/做艺术）",
        reason: "回报周期太长且不稳定，会让你焦虑到放弃。",
      },
    ],
    plan90d: [
      {
        phase: "基础期",
        weeks: "Week 1-4",
        goals: [
          "梳理家庭资产负债表，明确可投资金额",
          "学习 3 个理财博主的体系（不要碎片知识）",
          "建立 6 个月生活费的应急金",
        ],
      },
      {
        phase: "建仓期",
        weeks: "Week 5-8",
        goals: [
          "建立核心资产配置（股债比、国内外比）",
          "启动定投计划，自动扣款",
          "启动一个副业现金流（电商或套利）",
        ],
      },
      {
        phase: "稳定期",
        weeks: "Week 9-12",
        goals: [
          "副业现金流稳定月入 ¥1000+",
          "投资组合月度复盘 SOP 化",
          "开始记账/复盘年度财务报告",
        ],
      },
    ],
    celebritySame: ["孟岩（且慢）", "杨天南", "银行理财经理转型博主", "FIRE 运动践行者"],
    bestMatch: [
      { code: "G7", reason: "流量操盘手帮你放大副业电商规模" },
      { code: "G4", reason: "执行机器帮你处理电商繁琐运营" },
    ],
    vector: {
      D1_RISK: -0.8,
      D2_SOCIAL: -0.2,
      D3_TIME: -0.5,
      D4_SKILL: 0.3,
      D5_DRIVE: 0.4,
      D6_STRESS: -0.4,
    },
  },

  // ===================== G4 执行机器 =====================
  {
    id: "g4",
    code: "G4",
    emoji: "⚙️",
    name: "执行机器",
    archetype: "靠交付量和稳定性碾压对手的实用主义者",
    tagline: "你不需要灵感，你需要清单",
    populationRatio: "全国 14.8% 的打工人",
    portrait: [
      "你信奉「先做再说」。给你一个明确的任务清单，你能 8 小时不抬头的执行完毕。让你「头脑风暴」「创意发想」——你想撞墙。",
      "你可能是团队里那个最靠谱的人，什么事交给你都能按时交付。你不一定最有想法，但你的稳定性让所有人放心。",
      "你的搞钱逻辑是：稳定输出 + 规模化 = 钱。你不靠爆款，你靠每天交付 10 单、20 单、50 单。",
      "你的危险在于：做的是用时间换钱的活，单价上不去。一旦停工就停收入，永远在跑步机上。",
    ],
    strengths: [
      "执行力碾压，给清单就能交付",
      "抗压能力强，deadline 越紧越专注",
      "情绪稳定，不内耗不摆烂",
      "靠谱指数满分，复购率高",
    ],
    fatalFlaws: [
      "缺乏战略思考，容易「忙但不赚」",
      "单价天花板低，必须靠规模化",
      "不善营销，做了活不一定能接到单",
    ],
    topSideHustles: [
      {
        rank: 1,
        emoji: "💻",
        name: "外包接单（你擅长的技能）",
        matchScore: 92,
        monthlyPotential: "¥3K – 2W",
        startupCost: "¥0",
        timeRequired: "按单计费",
        platforms: ["猪八戒", "甜薪客", "自由职客", "熟客推荐"],
        reason: "把已有技能变现，最稳最直接。",
        firstStep: "整理作品集，本周在 2 个平台注册并投 10 个单",
      },
      {
        rank: 2,
        emoji: "🛵",
        name: "跑腿 / 任务型零工",
        matchScore: 85,
        monthlyPotential: "¥1K – 8K",
        startupCost: "¥0",
        timeRequired: "碎片时间",
        platforms: ["美团众包", "顺丰同城", "闪送", "代拿代排"],
        reason: "纯执行型，无脑操作，时间灵活。",
        firstStep: "本周注册 1 个平台，跑 3 单感受流程",
      },
      {
        rank: 3,
        emoji: "📞",
        name: "客服 / 远程助理 / 数据标注",
        matchScore: 81,
        monthlyPotential: "¥2K – 1W",
        startupCost: "¥0",
        timeRequired: "约定工时",
        platforms: ["远程work", "兼职猫", "数据标注平台"],
        reason: "标准流程化工作，稳定性强，适合远程。",
        firstStep: "选 1 个平台，投递 5 个远程岗位",
      },
    ],
    avoidList: [
      {
        emoji: "🚀",
        name: "做号 / 自媒体创业",
        reason: "需要长期创作和不确定性，前 6 个月没正反馈你会崩。",
      },
      {
        emoji: "🎨",
        name: "原创内容创业",
        reason: "你的优势是执行不是创意，硬刚创作赛道必输。",
      },
      {
        emoji: "🤝",
        name: "纯撮合型生意",
        reason: "需要深度社交和博弈，不是你的菜。",
      },
    ],
    plan90d: [
      {
        phase: "起量期",
        weeks: "Week 1-4",
        goals: [
          "梳理你能交付的服务清单（5 项以内）",
          "在 3 个平台同步上架",
          "完成首批 5 单，积累评价",
        ],
      },
      {
        phase: "复购期",
        weeks: "Week 5-8",
        goals: [
          "把客户沉淀到私域，做复购",
          "月稳定单量 ≥ 15",
          "把交付流程 SOP 化",
        ],
      },
      {
        phase: "提单价",
        weeks: "Week 9-12",
        goals: [
          "招 1-2 个兼职分摊简单单子",
          "把单价提高 50%（靠服务和打包）",
          "时薪从 ¥50 提到 ¥100+",
        ],
      },
    ],
    celebritySame: ["勤奋型自由职业者", "你身边那个最靠谱的同事", "猪八戒顶级服务商"],
    bestMatch: [
      { code: "G1", reason: "创造者出方案，你负责交付" },
      { code: "G2", reason: "掮客接单你交付，分润模式" },
    ],
    vector: {
      D1_RISK: -0.4,
      D2_SOCIAL: 0,
      D3_TIME: -0.6,
      D4_SKILL: 0,
      D5_DRIVE: 0.3,
      D6_STRESS: 0.7,
    },
  },

  // ===================== G5 社群教主 =====================
  {
    id: "g5",
    code: "G5",
    emoji: "👥",
    name: "社群教主",
    archetype: "靠影响力和号召力搞钱的人型磁场",
    tagline: "你能让一群人为同一个目标燃烧",
    populationRatio: "全国 4.7% 的打工人",
    portrait: [
      "你天生是「群主体质」。从大学社团到公司项目组，你总是不知不觉就成了那个组织者、号召者、IP。",
      "你享受被关注，更享受「我的群成员都很活跃」的成就感。你发的朋友圈总是互动最多，你组的局总是不缺人。",
      "你的搞钱逻辑是：信任 + 影响力 = 高客单变现。你能让一群人付 ¥1000 进你的社群、¥5000 上你的课。",
      "你的危险在于：被「割韭菜」标签反噬。或者过度消耗情绪，最后自己空虚倦怠。",
    ],
    strengths: [
      "感染力极强，能调动群体情绪",
      "天然 IP 体质，自带流量",
      "擅长经营高客单（社群/训练营）",
      "抗压能力出色，享受高强度输出",
    ],
    fatalFlaws: [
      "需要持续输出，断更就掉粉",
      "一旦翻车（言论/产品质量）反噬极大",
      "容易被「讲师」标签束缚，难做产品",
    ],
    topSideHustles: [
      {
        rank: 1,
        emoji: "🎯",
        name: "付费训练营 / 高客单社群",
        matchScore: 96,
        monthlyPotential: "¥1W – 10W+",
        startupCost: "¥0 – 2000",
        timeRequired: "高强度周期性输出",
        platforms: ["知识星球", "小报童", "私域社群", "Discord"],
        reason: "你的感染力和号召力，是付费社群的天然土壤。",
        firstStep: "本周发布一个 ¥99 体验营，招募首批 10 人测试",
      },
      {
        rank: 2,
        emoji: "🎬",
        name: "直播 + 课程",
        matchScore: 92,
        monthlyPotential: "¥5K – 5W",
        startupCost: "¥1000 – 5000",
        timeRequired: "每周固定直播",
        platforms: ["抖音", "视频号", "小红书直播", "B 站"],
        reason: "镜头表现力 + 临场反应，直播是你最强变现路径。",
        firstStep: "本周完成第一场直播（哪怕 30 人在线）",
      },
      {
        rank: 3,
        emoji: "🎤",
        name: "知识 IP / 个人品牌",
        matchScore: 89,
        monthlyPotential: "¥1W+",
        startupCost: "¥500",
        timeRequired: "持续输出",
        platforms: ["公众号", "小红书", "即刻", "B 站"],
        reason: "你的能量场比内容更重要，IP 是放大器。",
        firstStep: "锁定 1 个垂直领域 + 1 个差异化人设",
      },
    ],
    avoidList: [
      {
        emoji: "🔧",
        name: "纯技术 / 后台工作",
        reason: "你没耐心做隐形工作，需要舞台感才能发光。",
      },
      {
        emoji: "📦",
        name: "无品牌纯铺货电商",
        reason: "没有 IP 加持的电商，比拼供应链不是你的优势。",
      },
      {
        emoji: "🤫",
        name: "需要长期低调沉淀的项目",
        reason: "你享受即时反馈，闷头干半年不出声会憋疯。",
      },
    ],
    plan90d: [
      {
        phase: "起势期",
        weeks: "Week 1-4",
        goals: [
          "锁定 1 个垂直领域 + 1 个差异化标签",
          "在 2 个平台密集输出，建立识别度",
          "首批粉丝沉淀到私域（≥ 100 人）",
        ],
      },
      {
        phase: "产品期",
        weeks: "Week 5-8",
        goals: [
          "设计第一个付费产品（¥99-499 体验型）",
          "完成首期招募，跑通交付流程",
          "收集第一批用户见证",
        ],
      },
      {
        phase: "放大期",
        weeks: "Week 9-12",
        goals: [
          "推出高客单主推产品（¥1000+）",
          "月入破万",
          "建立复购路径和分级体系",
        ],
      },
    ],
    celebritySame: ["粥左罗", "知识星球头部星主", "垂直社群主理人", "即刻上的高互动博主"],
    bestMatch: [
      { code: "G1", reason: "创造者做内容底座，你做放大和变现" },
      { code: "G6", reason: "技术匠人帮你做工具/系统" },
    ],
    vector: {
      D1_RISK: 0.3,
      D2_SOCIAL: 0.9,
      D3_TIME: 0,
      D4_SKILL: -0.3,
      D5_DRIVE: -0.2,
      D6_STRESS: 0.7,
    },
  },

  // ===================== G6 技术匠人 =====================
  {
    id: "g6",
    code: "G6",
    emoji: "🔧",
    name: "技术匠人",
    archetype: "靠手艺吃饭、不靠人脉的长期主义者",
    tagline: "你的代码 / 工具 / 系统，就是你的印钞机",
    populationRatio: "全国 8.5% 的打工人",
    portrait: [
      "你享受「解决这个问题」的快感胜过「赚这笔钱」。你能为一个 bug 熬通宵，但让你去社交场合应酬你比死还难受。",
      "你信奉「一门手艺吃一辈子」。技术、设计、写作、研究——只要你能精进到顶，钱自然来。",
      "你的搞钱逻辑是：手艺 × 工具 × 时间复利 = 被动收入。你不靠人脉，你靠产品说话。",
      "你的危险在于：技术绑架身份，趋势变了你不愿意转弯。或者产品做出来了不会卖，技术好但赚不到钱。",
    ],
    strengths: [
      "深度专注能力强，能成为细分领域顶尖",
      "工具思维好，能构建自己的「印钞机」",
      "不依赖人脉，独立性高",
      "产品一旦做成，被动收入潜力大",
    ],
    fatalFlaws: [
      "对营销/销售天然排斥，常常「酒香也怕巷子深」",
      "完美主义，产品打磨 1 年还不发布",
      "技术栈绑架，错过风口（如 AI 时代还死守旧栈）",
    ],
    topSideHustles: [
      {
        rank: 1,
        emoji: "🛠️",
        name: "独立开发 / 工具站 / SaaS",
        matchScore: 95,
        monthlyPotential: "¥1K – 10W+",
        startupCost: "¥500 – 5000",
        timeRequired: "前 3 个月高强度",
        platforms: ["ProductHunt", " indiehackers", "X (Twitter)", "自有渠道"],
        reason: "你的技术 + 工具思维，是独立开发者的标准配置。",
        firstStep: "选定 1 个垂直问题，本周做 MVP 上线（哪怕只有 10 个用户）",
      },
      {
        rank: 2,
        emoji: "💻",
        name: "高端技术咨询 / 外包",
        matchScore: 90,
        monthlyPotential: "¥5K – 5W",
        startupCost: "¥0",
        timeRequired: "项目制",
        platforms: ["Upwork", "Toptal", "技术社区", "高质量人脉"],
        reason: "你的深度能力 + 宁缺毋滥的客户，能跑出高时薪。",
        firstStep: "整理 3 个深度案例，定个 ¥800+/小时 的咨询价",
      },
      {
        rank: 3,
        emoji: "🧰",
        name: "技术产品 / 模板 / API 服务",
        matchScore: 87,
        monthlyPotential: "¥1K – 3W",
        startupCost: "¥0 – 2000",
        timeRequired: "前期集中开发",
        platforms: ["Gumroad", "Lemonsqueezy", "GitHub Marketplace"],
        reason: "一次开发多次售卖，完美适配你的工具思维。",
        firstStep: "把你的某个常用工具/脚本，打包成可售卖产品",
      },
    ],
    avoidList: [
      {
        emoji: "👥",
        name: "社群运营 / 训练营",
        reason: "高频社交互动会耗尽你的能量，且交付质量难控。",
      },
      {
        emoji: "📞",
        name: "销售 / BD 类工作",
        reason: "需要大量社交博弈，会让你痛不欲生。",
      },
      {
        emoji: "🚀",
        name: "纯流量型项目（追风口）",
        reason: "你不擅长快速换方向，风口期一过你就被套牢。",
      },
    ],
    plan90d: [
      {
        phase: "MVP 期",
        weeks: "Week 1-4",
        goals: [
          "选定 1 个真实痛点（不是想象中的痛点）",
          "做最小可用产品（1-2 周内）",
          "找 10 个真实付费用户验证",
        ],
      },
      {
        phase: "迭代期",
        weeks: "Week 5-8",
        goals: [
          "根据用户反馈快速迭代",
          "建立付费转化漏斗",
          "第一个 ¥1000 MRR",
        ],
      },
      {
        phase: "增长期",
        weeks: "Week 9-12",
        goals: [
          "在 ProductHunt / X 等渠道推广",
          "MRR 突破 ¥3000",
          "建立用户社群（轻运营）",
        ],
      },
    ],
    celebritySame: ["Pieter Levels (levelsio)", "idoubi", "少楠（flomo）", "阮一峰"],
    bestMatch: [
      { code: "G5", reason: "社群教主帮你做营销放大，你专心做产品" },
      { code: "G2", reason: "资源掮客帮你找客户和渠道" },
    ],
    vector: {
      D1_RISK: -0.2,
      D2_SOCIAL: -0.7,
      D3_TIME: 0.3,
      D4_SKILL: -0.6,
      D5_DRIVE: -0.5,
      D6_STRESS: 0.2,
    },
  },

  // ===================== G7 流量操盘手 =====================
  {
    id: "g7",
    code: "G7",
    emoji: "🚀",
    name: "流量操盘手",
    archetype: "靠数据敏感和大胆下注搞钱的赌博型选手",
    tagline: "你赌对一次，胜过别人干十年",
    populationRatio: "全国 3.2% 的打工人",
    portrait: [
      "你手机里全是数据后台、ROI 报表、投流账户。你看小红书不是看内容，是看「这条数据为啥爆了」「投流成本是不是又涨了」。",
      "你享受「下注」的快感。一笔广告费砸下去，数据曲线立刻起来——这种即时反馈让你上瘾。",
      "你的搞钱逻辑是：流量 × 转化 × 客单 = 钱。你不需要做产品，你需要的是把别人的产品用流量放大。",
      "你的危险在于：赌徒心态，一次翻车亏完前面十次。或者投流成本涨得比利润快，永远在追ROI平衡点。",
    ],
    strengths: [
      "数据敏感度极高，能从噪音中抓信号",
      "敢下注，能抓住爆发性机会",
      "抗压能力顶级，亏钱不内耗",
      "懂流量就懂用户，可迁移能力强",
    ],
    fatalFlaws: [
      "赌徒心态，资金管理不当容易翻车",
      "看不起「慢钱」，对长期主义没耐心",
      "依赖平台，政策一变可能全盘归零",
    ],
    topSideHustles: [
      {
        rank: 1,
        emoji: "🎯",
        name: "投流做号 / 自媒体矩阵",
        matchScore: 96,
        monthlyPotential: "¥1W – 50W+",
        startupCost: "¥5000 – 5W",
        timeRequired: "高强度",
        platforms: ["抖音", "视频号", "小红书", "B 站"],
        reason: "你的数据 + 投流能力，是做号矩阵的标准配置。",
        firstStep: "选 1 个赛道，准备 ¥3000 测试预算，本周启动第一个号",
      },
      {
        rank: 2,
        emoji: "🛒",
        name: "直播带货 / 短视频带货",
        matchScore: 92,
        monthlyPotential: "¥5K – 30W",
        startupCost: "¥3000 – 2W",
        timeRequired: "每天 4-8 小时",
        platforms: ["抖音小店", "视频号小店", "快手"],
        reason: "投流能力 + 选品 + 直播，是最直接的搞钱组合。",
        firstStep: "选 1 个高毛利品类，签约 1 个达人或自己上",
      },
      {
        rank: 3,
        emoji: "📦",
        name: "代投代运营（DP 服务）",
        matchScore: 88,
        monthlyPotential: "¥1W – 10W",
        startupCost: "¥0 – 5000",
        timeRequired: "服务多个客户",
        platforms: ["行业人脉", "品牌方", "服务商平台"],
        reason: "你的能力产品化，卖给品牌方，无需自己承担库存风险。",
        firstStep: "找 2 个本地品牌方谈合作，按 ROI 分润",
      },
    ],
    avoidList: [
      {
        emoji: "🔧",
        name: "深度研发型项目（独立开发）",
        reason: "你受不了 6 个月没反馈的孤独，会半途而废。",
      },
      {
        emoji: "🎨",
        name: "需要长期沉淀的 IP 项目",
        reason: "你的优势是即时反馈和爆发，长周期不适合你。",
      },
      {
        emoji: "🪴",
        name: "佛系被动收入（写书/做课程）",
        reason: "你坐不住这种「冷启动 1 年才开花」的事。",
      },
    ],
    plan90d: [
      {
        phase: "试水期",
        weeks: "Week 1-4",
        goals: [
          "选定 1 个赛道 + 1 个平台",
          "准备 ¥3000-5000 测试预算",
          "跑通最小 ROI 模型",
        ],
      },
      {
        phase: "放大期",
        weeks: "Week 5-8",
        goals: [
          "把跑通的模型放大 10 倍预算",
          "建立投流 SOP 和数据看板",
          "月利润破 ¥1W",
        ],
      },
      {
        phase: "矩阵期",
        weeks: "Week 9-12",
        goals: [
          "复制到 3-5 个号 / 多品类",
          "月利润 ¥5W+",
          "开始考虑做服务（DP/培训）二次变现",
        ],
      },
    ],
    celebritySame: ["抖音头部 MCN 操盘手", "AI 带货玩家", "电商代运营（DP）服务商", "信息流投放代理商"],
    bestMatch: [
      { code: "G3", reason: "稳健理财师帮你做资金管理，避免翻车" },
      { code: "G2", reason: "资源掮客帮你做后端承接" },
    ],
    vector: {
      D1_RISK: 0.8,
      D2_SOCIAL: 0.2,
      D3_TIME: 0.4,
      D4_SKILL: 0.4,
      D5_DRIVE: 0.6,
      D6_STRESS: 0.8,
    },
  },

  // ===================== G8 佛系收租公 =====================
  {
    id: "g8",
    code: "G8",
    emoji: "🪴",
    name: "佛系收租公",
    archetype: "靠资产和被动收入慢慢回血的躺平主义者",
    tagline: "你不努力，但你有结构",
    populationRatio: "全国 6.0% 的打工人",
    portrait: [
      "你深知「卷不动」，也深信「躺有躺的法门」。你不是不搞钱，你是用最低的能量维持一个稳定的现金流。",
      "你可能是收租的、是持有指数基金的、是经营长尾内容的、是有几套数字资产的——总之，你的搞钱方式是「建好系统，让它自己跑」。",
      "你的搞钱逻辑是：资产 × 时间 = 被动收入。你不追求爆发，你追求「我下周不干活，但账户还在涨」。",
      "你的危险在于：永远在「准备建系统」但没建。或者系统建得太单一，政策/平台一变就归零。",
    ],
    strengths: [
      "投资思维好，能识别有长期价值的资产",
      "心态稳，不被短期波动影响",
      "时间自由度高，能做长期项目",
      "抗焦虑，享受「慢慢变富」的节奏",
    ],
    fatalFlaws: [
      "行动力弱，常常「想得多做得少」",
      "不擅长高强度营销和拉新",
      "资产单一化风险（如全仓单一平台）",
    ],
    topSideHustles: [
      {
        rank: 1,
        emoji: "💰",
        name: "指数基金 / 高息资产长期持有",
        matchScore: 94,
        monthlyPotential: "年化 6-12%",
        startupCost: "¥1000 起",
        timeRequired: "每月 1 小时",
        platforms: ["且慢", "蚂蚁财富", "雪球", "Boglehead 社区"],
        reason: "你的耐心 + 长期思维，最适合被动收益型资产。",
        firstStep: "梳理家庭资产，本周建立第一笔定投",
      },
      {
        rank: 2,
        emoji: "📚",
        name: "长尾内容 / 旧作品持续变现",
        matchScore: 89,
        monthlyPotential: "¥500 – 1W",
        startupCost: "¥0",
        timeRequired: "前期集中，后期零投入",
        platforms: ["公众号", "知乎", "B 站", "小红书长尾"],
        reason: "你的内容沉淀能持续带流量，适配被动收入逻辑。",
        firstStep: "把过去写过的内容整理成「常青树」结构，重发+SEO",
      },
      {
        rank: 3,
        emoji: "🏠",
        name: "数字资产 / 收租型项目（域名/模板/素材）",
        matchScore: 84,
        monthlyPotential: "¥500 – 8000",
        startupCost: "¥500 – 5000",
        timeRequired: "前期投入，后期零投入",
        platforms: ["闲置域名交易", "素材网站", "Notion 模板", "ThemeForest"],
        reason: "一次创建多次售卖，完美适配被动收入逻辑。",
        firstStep: "盘点你的资产（域名/模板/素材），本周挂上 1 个售卖",
      },
    ],
    avoidList: [
      {
        emoji: "📞",
        name: "高频服务 / 客服型副业",
        reason: "需要持续响应客户，违背了你「建系统不打工」的初衷。",
      },
      {
        emoji: "🎬",
        name: "直播 / 高强度内容输出",
        reason: "需要持续高强度产出，与你的低能耗模式冲突。",
      },
      {
        emoji: "🚀",
        name: "追风口项目",
        reason: "需要快速切换和爆发力，你的节奏跟不上。",
      },
    ],
    plan90d: [
      {
        phase: "盘点期",
        weeks: "Week 1-4",
        goals: [
          "盘点现有资产（资金/内容/技能/数字资产）",
          "选定 1 个被动收入赛道",
          "完成第一次资产投入或内容上线",
        ],
      },
      {
        phase: "建设期",
        weeks: "Week 5-8",
        goals: [
          "把选定赛道的基础设施搭好",
          "跑通第一笔被动收入（哪怕 ¥100）",
          "建立月度复盘机制",
        ],
      },
      {
        phase: "稳定期",
        weeks: "Week 9-12",
        goals: [
          "月被动收入稳定 ¥1000+",
          "考虑增加 1 个第二收入源（避免单一）",
          "把维护时间压缩到每周 2 小时以内",
        ],
      },
    ],
    celebritySame: ["孟岩", "老钱日日谈", "数字游民博主", "独立开发被动收入玩家"],
    bestMatch: [
      { code: "G7", reason: "流量操盘手帮你把内容/资产放大 10 倍" },
      { code: "G4", reason: "执行机器帮你处理维护工作" },
    ],
    vector: {
      D1_RISK: -0.6,
      D2_SOCIAL: -0.4,
      D3_TIME: 0,
      D4_SKILL: 0,
      D5_DRIVE: -0.3,
      D6_STRESS: -0.8,
    },
  },
];

// 工具函数：根据维度分数向量匹配最相似的人格
// 用户得分也是 -1 到 1 的 6 维向量，用余弦相似度找最近邻
export function findClosestPersona(userVector: Persona["vector"]): Persona {
  let best = PERSONAS[0];
  let bestScore = -Infinity;
  for (const p of PERSONAS) {
    const score = cosineSimilarity(userVector, p.vector);
    if (score > bestScore) {
      bestScore = score;
      best = p;
    }
  }
  return best;
}

function cosineSimilarity(a: Persona["vector"], b: Persona["vector"]): number {
  const keys = Object.keys(a) as (keyof Persona["vector"])[];
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (const k of keys) {
    dot += a[k] * b[k];
    normA += a[k] * a[k];
    normB += b[k] * b[k];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
