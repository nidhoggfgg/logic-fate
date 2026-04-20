import type { FateFormValues } from "@/lib/reading-schema";

export type ReadingSection = {
  id: string;
  label: string;
  signal: string;
  insight: string;
  advice: string;
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
  sections: ReadingSection[];
};

const archetypes = [
  "零界观察者",
  "高压穿透者",
  "延迟兑现体",
  "隐性共振源",
  "秩序篡改者",
  "静默增幅者"
];

const waveStates = [
  "短期高波动",
  "缓慢抬升",
  "潜伏蓄能",
  "双向拉扯",
  "节点将至"
];

const tagPool = [
  "旧回路残留",
  "信号回暖",
  "决策窗口开启",
  "延迟奖励",
  "人际重连",
  "资源再分配",
  "隐藏助力",
  "情绪噪点",
  "主线回归",
  "副本即将关闭"
];

const overallSignals = [
  "命运主线没有停滞，只是进入了重新校准的暗区。",
  "你当前的状态不是运气差，而是在为一次更大的路径切换积蓄势能。",
  "你的外部节奏看似平缓，内部其实已经接近关键节点。"
];

const overallInsights = [
  "从命运协议的轨迹来看，你正在摆脱旧习惯对未来的重复占用。过去拖住你的，并不是能力不足，而是长期把注意力耗在错误的人和错误的时机上。",
  "你的命势表现出明显的后发特征。前期会有延迟感，但只要你不在临门一脚前撤退，后续的回报往往比表面更强。",
  "你并不是没有被看见，而是总在能量开始汇聚时怀疑自己，因此错过了本应属于你的上升区间。"
];

const overallAdvice = [
  "把精力收回到最重要的一件事上。你越聚焦，命运反馈越清晰。",
  "暂停无效试探，优先处理真正影响你节奏的那个核心问题。",
  "不要再用过去的失败样本定义接下来的选择。"
];

const loveSingleSignals = [
  "情感链路正在升温，但新连接不会以你熟悉的方式出现。",
  "你近期更容易遇到能触发深层共鸣的人，而不是表面热闹的人。"
];

const loveAttachedSignals = [
  "当前关系里真正需要修复的，不是感情本身，而是沟通失真。",
  "情感轨迹显示你们之间仍有连接强度，但旧问题没有被彻底清理。"
];

const loveInsights = [
  "你的感情模式带有明显的延迟确认特征。你通常先观察、再投入，可一旦出现真实吸引，又容易因为不确定而后撤。",
  "现在不是你情感最弱的时候，反而是你最适合识别真假关系的阶段。真正靠近你的人，会让你更稳定，而不是更消耗。"
];

const loveAdvice = [
  "别把试探当成安全感。你更需要的是清晰表达边界和期待。",
  "感情上最该防备的，不是拒绝，而是反复耗损你的模糊关系。"
];

const careerSignals = [
  "事业路径显示出一次明显的分岔，你正在接近新的角色阈值。",
  "你当前的职业状态并非停滞，而是处于低噪声转场期。"
];

const careerInsights = [
  "你的工作轨迹里有一个很强的特征：越到关键时刻，你越容易用谨慎包装迟疑。命盘里更适合你的，不是继续等待完美时机，而是先占位、再放大优势。",
  "近期事业上的机会不会以“准备好了”的形式出现，而会先以额外责任、临时项目、或突发合作的形式靠近。"
];

const careerAdvice = [
  "优先答应那个会让你被更多人看见的任务，而不是最省力的任务。",
  "你的下一次提升，靠的不是拼命加班，而是更主动地出现在重要节点里。"
];

const wealthSignals = [
  "财富轨迹呈现延迟兑现，你更适合做长期增值，而不是短线冒进。",
  "你的资源流不是断掉了，而是暂时卡在输入与输出不对称的阶段。"
];

const wealthInsights = [
  "财运部分显示，你的机会常常不是“直接来钱”，而是先变成关系、信息或能力，再转化为结果。",
  "你容易在情绪疲惫的时候产生补偿性消费或仓促投入，这会削弱本该积累起来的安全感。"
];

const wealthAdvice = [
  "近期最好的财运动作不是冒险，而是识别真正值得投入的方向。",
  "守住现金流和判断力，比抓住所有机会更重要。"
];

const warningSignals = [
  "未来窗口开启前，会先出现一次让你想退缩的测试。",
  "近期最大的风险不来自外界阻力，而来自你对旧模式的惯性依赖。"
];

const warningInsights = [
  "你的命盘警示不是“会失败”，而是“容易在转机出现前自我中断”。这类中断通常表现为突然怀疑、逃避表态、或对结果过早下结论。",
  "当节奏开始变快时，你会本能地回到熟悉但无效的应对方式。这个习惯是目前最需要被破解的暗门。"
];

const warningAdvice = [
  "未来两到三周内，遇到反常的好消息时不要立刻否定它，先确认再判断。",
  "给自己留出复盘时间，不要在情绪最高或最低的时候做最后决定。"
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
  const map: Record<string, string> = {
    overall: "整体命势",
    love: "情感轨迹",
    career: "事业路径",
    wealth: "财富波动",
    decision: "关键抉择"
  };

  return `本次终端重点聚焦于${map[values.focusArea] ?? "命运主线"}，系统判定该维度将直接影响你接下来一段时间的行动节奏。`;
}

export function generateFateReading(values: FateFormValues): FateReading {
  const seed = createSeed(values);
  const codename = values.alias?.trim() || values.name.trim();
  const timelineDays = 9 + (seed % 23);
  const stability = 63 + (seed % 28);

  const sections: ReadingSection[] = [
    {
      id: "overall",
      label: "总体命势",
      signal: pick(overallSignals, seed, 1),
      insight: `${pick(overallInsights, seed, 2)} ${buildFocusEcho(values)}`,
      advice: pick(overallAdvice, seed, 3)
    },
    {
      id: "love",
      label: "感情回响",
      signal: relationshipSignal(values, seed),
      insight: `${pick(loveInsights, seed, 6)} 你的提问“${values.question.slice(
        0,
        26
      )}${values.question.length > 26 ? "..." : ""}”也显示出你正在寻找更确定、更少消耗的关系回应。`,
      advice: pick(loveAdvice, seed, 7)
    },
    {
      id: "career",
      label: "事业路径",
      signal: pick(careerSignals, seed, 9),
      insight: `${pick(careerInsights, seed, 10)} 结合你当前的身份“${values.occupation}”，这更像是一次角色升级前的压力测试。`,
      advice: pick(careerAdvice, seed, 11)
    },
    {
      id: "wealth",
      label: "财运波动",
      signal: pick(wealthSignals, seed, 12),
      insight: `${pick(wealthInsights, seed, 13)} 最近困扰你的“${values.recentIssue.slice(
        0,
        20
      )}${values.recentIssue.length > 20 ? "..." : ""}”说明你已经察觉到资源配置上的失衡。`,
      advice: pick(wealthAdvice, seed, 14)
    },
    {
      id: "warning",
      label: "近期预警",
      signal: pick(warningSignals, seed, 15),
      insight: pick(warningInsights, seed, 16),
      advice: pick(warningAdvice, seed, 17)
    }
  ];

  return {
    protocolId: `FT-${(seed % 9000) + 1000}-${values.birthDate.replaceAll("-", "").slice(2)}`,
    codename,
    archetype: pick(archetypes, seed, 18),
    waveState: pick(waveStates, seed, 19),
    stability,
    resonanceTags: [
      pick(tagPool, seed, 20),
      pick(tagPool, seed, 21),
      pick(tagPool, seed, 22)
    ],
    timelineWindow: `${timelineDays} 天内`,
    verdict:
      stability > 80
        ? "你真正的转机已经开始累积，接下来最重要的不是再等等，而是别在看见门的时候自己后退。"
        : "你不是命差，而是太习惯在结果兑现前怀疑自己。未来窗口已出现，只差你用行动把它固定下来。",
    actionAdvice:
      values.focusArea === "career"
        ? "事业上优先抓住能提高曝光度和决策权的机会，不要只选最安全的选项。"
        : values.focusArea === "love"
          ? "感情里减少猜测，增加清晰表达。真正的关系不会靠你独自脑补来维持。"
          : values.focusArea === "wealth"
            ? "先稳住节奏和现金流，再考虑放大收益；你的财运适合稳步放大，不适合赌一把。"
            : "保持动作连续性。你接下来最怕的不是外界阻拦，而是自己重新回到旧回路。",
    sections
  };
}
