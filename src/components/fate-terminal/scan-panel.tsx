"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Disc3, Orbit, ScanSearch } from "lucide-react";
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

type ScanPanelProps = {
  values: FateFormValues;
};

const scanLogs = [
  "同步命理协议...",
  "定位时间线坐标...",
  "解析人格标签映射...",
  "校验社交回路节律...",
  "模拟决策路径分岔...",
  "捕捉压力响应模式...",
  "扫描事业与关系轨迹...",
  "比对长期命势模型...",
  "生成最终命运判词..."
];

export function ScanPanel({ values }: ScanPanelProps) {
  const [visibleLogCount, setVisibleLogCount] = useState(1);
  const [progress, setProgress] = useState(8);

  const tags = useMemo(
    () => [
      values.occupation,
      getOptionLabel(lifeStageOptions, values.lifeStage),
      values.personalityType,
      getOptionLabel(socialStyleOptions, values.socialStyle),
      getOptionLabel(decisionStyleOptions, values.decisionStyle),
      getOptionLabel(stressResponseOptions, values.stressResponse),
      getOptionLabel(focusOptions, values.focusArea),
      getOptionLabel(relationshipOptions, values.relationshipStatus)
    ],
    [
      values.decisionStyle,
      values.focusArea,
      values.lifeStage,
      values.occupation,
      values.personalityType,
      values.relationshipStatus,
      values.socialStyle,
      values.stressResponse
    ]
  );

  useEffect(() => {
    const logTimer = window.setInterval(() => {
      setVisibleLogCount((count) => Math.min(count + 1, scanLogs.length));
    }, 460);

    const progressTimer = window.setInterval(() => {
      setProgress((value) => (value >= 96 ? value : value + 7));
    }, 320);

    return () => {
      window.clearInterval(logTimer);
      window.clearInterval(progressTimer);
    };
  }, []);

  return (
    <motion.section
      key="scan"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="px-4 py-6 md:px-8 md:py-8"
    >
      <div className="panel-frame noise-mask mx-auto max-w-7xl rounded-[32px] p-6 md:p-10">
        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.36em] text-cyan-100/65">
              <span className="signal-dot" />
              Deep Scan Protocol
            </div>
            <div>
              <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
                命运主机正在读取
                <span className="glow-text block text-cyan-300">{values.name}</span>
                的未来残响。
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
                系统已锁定你的出生时间、人格标签、社交方式、决策路径与压力反应，接下来会生成一份更偏向人物画像的命运报告。
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {tags.map((tag, index) => (
                <div
                  key={`${tag}-${index}`}
                  className="rounded-2xl border border-cyan-300/12 bg-cyan-300/6 px-4 py-3 text-sm text-cyan-50/85"
                >
                  {tag}
                </div>
              ))}
            </div>

            <div className="rounded-[28px] border border-cyan-300/12 bg-slate-950/55 p-5">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-slate-400">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="mt-4 h-2 rounded-full bg-white/6">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-emerald-300 to-fuchsia-400 shadow-[0_0_24px_rgba(93,242,255,0.38)]"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="panel-frame flex min-h-[280px] flex-col items-center justify-center rounded-[28px]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="flex h-44 w-44 items-center justify-center rounded-full border border-cyan-300/30"
              >
                <motion.div
                  animate={{ rotate: -360, scale: [1, 1.08, 1] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex h-28 w-28 items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-300/8"
                >
                  <Orbit className="h-9 w-9 text-cyan-200" />
                </motion.div>
              </motion.div>
              <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-cyan-100/55">
                <Disc3 className="h-4 w-4 text-cyan-300" />
                Quantum Fate Ring
              </div>
            </div>

            <div className="rounded-[28px] border border-cyan-300/12 bg-slate-950/62 p-5">
              <div className="flex items-center gap-3 text-sm text-cyan-100">
                <ScanSearch className="h-4 w-4" />
                Scan log
              </div>
              <div className="mt-5 space-y-3">
                {scanLogs.slice(0, visibleLogCount).map((log, index) => (
                  <motion.div
                    key={log}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="flex items-start gap-3 rounded-2xl border border-white/6 bg-white/[0.03] px-4 py-3 text-sm text-slate-300"
                  >
                    <Cpu className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                    <span>{log}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
