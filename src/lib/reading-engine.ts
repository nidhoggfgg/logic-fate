import {
  decisionStyleOptions,
  focusOptions,
  getOptionLabel,
  lifeStageOptions,
  relationshipOptions,
  socialStyleOptions,
  stressResponseOptions,
  type FateFormValues
} from "@/lib/reading-schema";

export type ReadingSection = {
  id: string;
  label: string;
  signal: string;
  insight: string;
  advice: string;
};

export type ProfileFact = {
  label: string;
  value: string;
};

export type FateReading = {
  protocolId: string;
  codename: string;
  archetype: string;
  waveState: string;
  stability: number;
  resonanceTags: string[];
  timelineWindow: string;
  verdict: string;
  actionAdvice: string;
  profileMatrix: ProfileFact[];
  sections: ReadingSection[];
};

const archetypes = [
  "静水识局者",
  "逆风造势者",
  "边界感应体",
  "迟燃掌灯者",
  "内核聚能者",
  "回响捕手"
];

const waveStates = [
  "内核升温",
  "暗流蓄势",
  "判断成形",
  "节律重构",
  "窗口微张"
];

const tagPool = [
  "人格轮廓清晰",
  "慢热但稳定",
  "高感知命格",
  "判断力待释放",
  "压力阈值偏高",
  "关系边界重要",
  "长期线优先",
  "情绪恢复偏慢",
  "贵人识别力强",
  "自我校准能力高"
];

const overallSignals = [
  "你的人生主线不是混乱，而是慢热型展开。",
  "外部看起来平稳，真正的变化已经先在内核里发生。",
  "你的命运节律更像蓄能再释放，不像立刻见效的爆发型。"
];

const overallInsights = [
  "你本质上是后发型人格，越往后越能看出稳定度和判断优势。年轻阶段容易被误读成慢，但真正进入适配轨道后，反而比很多人更稳更准。",
  "你的人生推进方式并不靠一时冲劲，而是靠持续校准。命盘显示，你一旦确认方向，后续的执行力会比表面看起来强得多。",
  "你并不缺潜力，真正拖慢你的通常不是能力，而是对环境和节奏的敏感，让你在关键节点上多看了半步。"
];

const overallAdvice = [
  "别强迫自己按照别人的节奏兑现，你本来就不是那种靠快取胜的人。",
  "优先保持连续动作，而不是追求一次就做对所有事。",
  "把判断力放在真正重要的节点上，你的命势会越来越顺。"
];

const personaSignals = [
  "你给人的第一感受未必最热烈，但通常很耐读。",
  "你的命格不是强压型，而是会在相处和时间里逐渐显出分量。",
  "你身上有一种先判断再靠近的气质，这让你显得克制，也显得可靠。"
];

const personaInsights = [
  "人格标签“%PERSONA%”和你的真实命格是对得上的。你更像是靠内核组织世界的人，不太会把所有波动都放在表面。",
  "从你选择的社交与决策路径看，你不是轻率型人格。你会先观察、先吸收，再决定是否出手，这让你更少后悔，也更容易积压犹豫。",
  "你的核心魅力不在于高调，而在于稳定感。别人对你的信任，常常是在时间里慢慢长出来的。"
];

const personaAdvice = [
  "你真正需要被放大的不是存在感，而是你本来就很强的识别力。",
  "别急着把自己改成外放型，你的命势优势恰好来自深度和耐性。",
  "允许自己慢一点成型，这不是拖延，是你的自然节律。"
];

const loveSingleSignals = [
  "感情线是慢热升温型，真正适合你的人不会只停留在表面热度。",
  "桃花并不算吵闹，但你有机会遇到更能读懂你的人。"
];

const loveAttachedSignals = [
  "关系里最重要的课题不是爱不爱，而是节奏能不能对得上。",
  "你在亲密关系中更在意理解和可靠，而不是一时的情绪高涨。"
];

const loveInsights = [
  "你在关系里需要的是被看懂，而不是被追赶。比起轰烈的推进，你更容易被稳定、诚实、有边界感的人打动。",
  "你的社交方式“%SOCIAL%”决定了你不会轻易把核心自我交出去，所以真正走进你世界的人，必须穿过时间和信任这两道门。"
];

const loveAdvice = [
  "感情上别急着配合别人节奏，你更适合先确认是否真的被理解。",
  "真正适合你的关系会让你更安定，不会让你一直猜。"
];

const careerSignals = [
  "事业轨迹显示你更适合走定位升级，而不是无休止地堆工作量。",
  "你当前的职业线像是在重写身份，不只是换一份任务清单。"
];

const careerInsights = [
  "结合你当前的身份“%OCCUPATION%”，你接下来最该放大的不是勤奋本身，而是你做判断和搭结构的能力。",
  "你的决策方式“%DECISION%”会直接影响职业走势。你不适合长期被迫快速反应，更适合在有空间思考的结构里发挥优势。"
];

const careerAdvice = [
  "优先进入能让判断力被看见的位置，而不只是最忙的位置。",
  "你事业上的上升感，通常来自角色升级，不来自单纯加班。"
];

const wealthSignals = [
  "你的财运更偏长期型，适合慢慢积累而不是追短线刺激。",
  "资源流并没有断，只是属于后续更稳地兑现。"
];

const wealthInsights = [
  "你的财富节律和压力反应“%STRESS%”有关。压力一来时的选择，会直接影响你是否把资源花在真正值得的地方。",
  "你本质上不是乱花型人格，但在节律失衡时容易为了缓解压力做出补偿性决定，所以财运关键不是拼胆量，而是先稳住状态。"
];

const wealthAdvice = [
  "钱这条线先求稳后求快，更适合你。",
  "维持清醒判断比抓住每一个机会更重要。"
];

const warningSignals = [
  "你近期最大的风险不是外界阻力，而是自己的旧反应先一步接管。",
  "临近变化窗口时，你容易回到最熟悉的自我保护动作。"
];

const warningInsights = [
  "你在压力下更容易进入“%STRESS%”模式，这不是缺点，但如果放任它主导，就会让你错过本该属于你的表达和行动时机。",
  "命盘真正提醒你的不是失败，而是过早缩回去。你往往不是没机会，而是太早启动了保护机制。"
];

const warningAdvice = [
  "情绪最高或最低时，先别替自己下定论。",
  "下一次想退的时候，多停半拍再决定，很多转机都卡在这半拍里。"
];

function createSeed(values: FateFormValues) {
  const source = Object.values(values).join("|");
  return [...source].reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 3), 0);
}

function pick<T>(items: T[], seed: number, offset = 0) {
  return items[(seed + offset) % items.length];
}

function relationshipSignal(values: FateFormValues, seed: number) {
  const source =
    values.relationshipStatus === "single" ? loveSingleSignals : loveAttachedSignals;
  return pick(source, seed, 5);
}

function buildFocusEcho(values: FateFormValues) {
  const focusLabel = getOptionLabel(focusOptions, values.focusArea);
  const stageLabel = getOptionLabel(lifeStageOptions, values.lifeStage);

  return `这次读取重点落在${focusLabel}，而系统判定你当前处于${stageLabel}，所以同一份命格会表现出更鲜明的阶段性差异。`;
}

function replaceToken(template: string, replacements: Record<string, string>) {
  return Object.entries(replacements).reduce(
    (result, [token, value]) => result.replaceAll(`%${token}%`, value),
    template
  );
}

export function generateFateReading(values: FateFormValues): FateReading {
  const seed = createSeed(values);
  const timelineDays = 9 + (seed % 23);
  const stability = 63 + (seed % 28);
  const focusLabel = getOptionLabel(focusOptions, values.focusArea);
  const lifeStageLabel = getOptionLabel(lifeStageOptions, values.lifeStage);
  const relationshipLabel = getOptionLabel(relationshipOptions, values.relationshipStatus);
  const socialLabel = getOptionLabel(socialStyleOptions, values.socialStyle);
  const decisionLabel = getOptionLabel(decisionStyleOptions, values.decisionStyle);
  const stressLabel = getOptionLabel(stressResponseOptions, values.stressResponse);

  const sections: ReadingSection[] = [
    {
      id: "overall",
      label: "总体命势",
      signal: pick(overallSignals, seed, 1),
      insight: `${pick(overallInsights, seed, 2)} ${buildFocusEcho(values)}`,
      advice: pick(overallAdvice, seed, 3)
    },
    {
      id: "persona",
      label: "命格画像",
      signal: pick(personaSignals, seed, 4),
      insight: replaceToken(pick(personaInsights, seed, 6), {
        PERSONA: values.personalityType,
        SOCIAL: socialLabel
      }),
      advice: pick(personaAdvice, seed, 7)
    },
    {
      id: "love",
      label: "感情回响",
      signal: relationshipSignal(values, seed),
      insight: replaceToken(pick(loveInsights, seed, 8), {
        SOCIAL: socialLabel
      }),
      advice: pick(loveAdvice, seed, 9)
    },
    {
      id: "career",
      label: "事业路径",
      signal: pick(careerSignals, seed, 10),
      insight: replaceToken(pick(careerInsights, seed, 11), {
        OCCUPATION: values.occupation,
        DECISION: decisionLabel
      }),
      advice: pick(careerAdvice, seed, 12)
    },
    {
      id: "wealth",
      label: "财运波动",
      signal: pick(wealthSignals, seed, 13),
      insight: replaceToken(pick(wealthInsights, seed, 14), {
        STRESS: stressLabel
      }),
      advice: pick(wealthAdvice, seed, 15)
    },
    {
      id: "warning",
      label: "近期预警",
      signal: pick(warningSignals, seed, 16),
      insight: replaceToken(pick(warningInsights, seed, 17), {
        STRESS: stressLabel
      }),
      advice: pick(warningAdvice, seed, 18)
    }
  ];

  return {
    protocolId: `FT-${(seed % 9000) + 1000}-${values.birthDate.replaceAll("-", "").slice(2)}`,
    codename: values.name.trim(),
    archetype: pick(archetypes, seed, 19),
    waveState: pick(waveStates, seed, 20),
    stability,
    resonanceTags: [
      pick(tagPool, seed, 21),
      pick(tagPool, seed, 22),
      pick(tagPool, seed, 23)
    ],
    timelineWindow: `${timelineDays} 天内`,
    verdict:
      stability > 80
        ? `你的命势已经开始进入显形阶段。尤其在${focusLabel}这条线上，只要你不违背自己的天然节律，结果会比预期更稳定。`
        : `你真正需要的不是再去试探自己，而是更早承认自己的真实人格节律。${values.personalityType}这条线索已经说明，你本来就不是靠冲动推进人生的人。`,
    actionAdvice:
      values.focusArea === "career"
        ? "事业上优先争取能让判断力和结构能力被看见的位置，这比单纯堆任务更适合你。"
        : values.focusArea === "love"
          ? "感情里先看对方能不能理解你的节奏，再看热度够不够；你需要的是被读懂，不是被追赶。"
          : values.focusArea === "wealth"
            ? "财务上先稳情绪与节律，再谈放大收益；你的财运更吃长期纪律，不吃临时冲动。"
            : values.focusArea === "decision"
              ? "重大选择时，优先顺着自己的决策天性来，不要为了看起来果断而硬演成另一种人。"
              : "保持动作连续性，少和自己的天然节律对抗。你的人生运势一旦顺着本性走，反而会越来越稳。",
    profileMatrix: [
      { label: "现实身份", value: values.occupation },
      { label: "人格标签", value: values.personalityType },
      { label: "人生阶段", value: lifeStageLabel },
      { label: "社交方式", value: socialLabel },
      { label: "决策方式", value: decisionLabel },
      { label: "压力反应", value: stressLabel },
      { label: "情感状态", value: relationshipLabel }
    ],
    sections
  };
}
