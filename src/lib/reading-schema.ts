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

export const focusOptions = [
  { value: "overall", label: "总体命势" },
  { value: "love", label: "感情" },
  { value: "career", label: "事业" },
  { value: "wealth", label: "财运" },
  { value: "decision", label: "关键选择" }
] as const;

export const fateFormSchema = z.object({
  name: z.string().min(2, "请输入至少 2 个字符"),
  alias: z.string().max(20, "代号长度不要超过 20 个字符").optional(),
  gender: z.string().min(1, "请选择你的性别设定"),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "请选择完整出生日期"),
  birthTime: z.string().regex(/^\d{2}:\d{2}$/, "请选择完整出生时间"),
  relationshipStatus: z.string().min(1, "请选择情感状态"),
  occupation: z.string().min(2, "请输入当前身份或职业"),
  focusArea: z.string().min(1, "请选择最关注的命运维度"),
  question: z.string().min(10, "把问题写得更具体一点，至少 10 个字"),
  recentIssue: z.string().min(10, "请输入最近困扰你的事情，至少 10 个字")
});

export type FateFormValues = z.infer<typeof fateFormSchema>;
