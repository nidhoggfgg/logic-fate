import { z } from "zod";

export const genderOptions = [
  { value: "male", label: "男" },
  { value: "female", label: "女" },
  { value: "nonbinary", label: "非二元 / 不设限" },
  { value: "private", label: "保密" }
] as const;

export const relationshipOptions = [
  { value: "single", label: "单身" },
  { value: "dating", label: "暧昧 / 接触中" },
  { value: "committed", label: "稳定关系中" },
  { value: "complicated", label: "关系复杂" }
] as const;

export const lifeStageOptions = [
  { value: "seed", label: "起势期" },
  { value: "rise", label: "上升期" },
  { value: "pivot", label: "转轨期" },
  { value: "settling", label: "沉淀期" }
] as const;

export const focusOptions = [
  { value: "overall", label: "总体命势" },
  { value: "love", label: "感情" },
  { value: "career", label: "事业" },
  { value: "wealth", label: "财运" },
  { value: "decision", label: "人生抉择" }
] as const;

export const socialStyleOptions = [
  { value: "solo", label: "独处蓄能" },
  { value: "fluid", label: "收放自如" },
  { value: "expressive", label: "外放连结" }
] as const;

export const decisionStyleOptions = [
  { value: "logic", label: "理性推演" },
  { value: "intuition", label: "直觉先行" },
  { value: "balance", label: "反复权衡" }
] as const;

export const stressResponseOptions = [
  { value: "endure", label: "先扛着" },
  { value: "retreat", label: "先抽离" },
  { value: "analyze", label: "先分析" },
  { value: "seek", label: "先求助" }
] as const;

export const fateFormSchema = z.object({
  name: z.string().min(2, "请输入至少 2 个字符"),
  gender: z.string().min(1, "请选择你的性别设定"),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "请选择完整出生日期"),
  birthTime: z.string().regex(/^\d{2}:\d{2}$/, "请选择完整出生时间"),
  relationshipStatus: z.string().min(1, "请选择情感状态"),
  occupation: z.string().min(2, "请输入当前身份或职业"),
  lifeStage: z.string().min(1, "请选择你目前所处的人生阶段"),
  focusArea: z.string().min(1, "请选择最关注的命运维度"),
  personalityType: z.string().min(2, "请输入你的人格标签或人格类型"),
  socialStyle: z.string().min(1, "请选择你的社交蓄能方式"),
  decisionStyle: z.string().min(1, "请选择更接近你的决策方式"),
  stressResponse: z.string().min(1, "请选择你在压力下更常见的反应")
});

export function getOptionLabel(
  options: ReadonlyArray<{ value: string; label: string }>,
  value: string
) {
  return options.find((option) => option.value === value)?.label ?? value;
}

export type FateFormValues = z.infer<typeof fateFormSchema>;
