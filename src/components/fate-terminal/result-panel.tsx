"use client";

import { motion } from "framer-motion";
import {
  Activity,
  BriefcaseBusiness,
  Fingerprint,
  HeartHandshake,
  ShieldAlert,
  Sparkles,
  WalletCards
} from "lucide-react";
import type { FateReading } from "@/lib/reading-engine";

type ResultPanelProps = {
  reading: FateReading;
  onRestart: () => void;
};

const sectionIcons = {
  overall: Activity,
  persona: Fingerprint,
  love: HeartHandshake,
  career: BriefcaseBusiness,
  wealth: WalletCards,
  warning: ShieldAlert
} as const;

export function ResultPanel({ reading, onRestart }: ResultPanelProps) {
  const [identityFact, personaFact, ...detailFacts] = reading.profileMatrix;
  const leadFacts = [identityFact, personaFact].filter(Boolean);

  return (
    <motion.section
      key="result"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="panel-frame rounded-[28px] p-5 sm:rounded-[32px] sm:p-6 md:p-10">
        <div className="grid gap-8 xl:grid-cols-[0.74fr_1.26fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.36em] text-cyan-100/65">
              <span className="signal-dot" />
              Fate Report Issued
            </div>
            <div>
              <p className="terminal-title text-[10px] text-cyan-100/50">Protocol ID {reading.protocolId}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
                {reading.codename}
                <span className="mt-2 block text-cyan-300">{reading.archetype}</span>
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-cyan-300/12 bg-cyan-300/8 p-4 sm:p-5">
                <p className="text-xs uppercase tracking-[0.26em] text-cyan-100/50">Wave State</p>
                <p className="mt-3 text-2xl font-semibold text-white">{reading.waveState}</p>
              </div>
              <div className="rounded-[24px] border border-emerald-300/12 bg-emerald-300/8 p-4 sm:p-5">
                <p className="text-xs uppercase tracking-[0.26em] text-emerald-100/50">Stability</p>
                <p className="mt-3 text-2xl font-semibold text-white">{reading.stability}%</p>
              </div>
            </div>

            <div className="rounded-[24px] border border-fuchsia-300/12 bg-fuchsia-300/7 p-4 sm:rounded-[28px] sm:p-5">
              <div className="flex items-center gap-3 text-sm text-fuchsia-100">
                <Sparkles className="h-4 w-4" />
                命运判词
              </div>
              <p className="mt-4 text-base leading-7 text-white sm:text-lg sm:leading-8">{reading.verdict}</p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 sm:rounded-[28px] sm:p-5">
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="terminal-title text-[10px] text-cyan-100/45">Profile Matrix</p>
                    <p className="mt-2 text-sm text-slate-400">将身份、人格与当前窗口压缩成更适合移动端阅读的命格档案。</p>
                  </div>
                  <div className="rounded-full border border-cyan-300/14 bg-cyan-300/8 px-3 py-1 text-xs text-cyan-100/75">
                    {reading.timelineWindow}
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)]">
                  <div className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {leadFacts.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-[22px] border border-cyan-300/12 bg-cyan-300/7 px-4 py-4"
                        >
                          <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-100/48">{item.label}</p>
                          <p className="mt-2 text-base font-medium leading-7 text-white">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-[22px] border border-white/8 bg-black/18 p-4 sm:p-5">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">命格档案</p>
                        <p className="text-xs text-slate-500">高密度摘要</p>
                      </div>

                      <div className="mt-4 divide-y divide-cyan-300/10">
                        {detailFacts.map((item) => (
                          <div
                            key={item.label}
                            className="grid gap-1 py-3 sm:grid-cols-[104px_minmax(0,1fr)] sm:gap-4"
                          >
                            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                              {item.label}
                            </p>
                            <p className="text-sm font-medium leading-6 text-slate-100">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                      <div
                        className="rounded-[22px] border border-emerald-300/12 bg-emerald-300/8 px-4 py-4"
                      >
                        <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-100/50">观察窗口</p>
                        <p className="mt-2 text-lg font-semibold text-white">{reading.timelineWindow}</p>
                        <p className="mt-1 text-sm text-emerald-50/78">近期波动更容易在这个时间段显形。</p>
                      </div>

                      <div
                        className="rounded-[22px] border border-cyan-300/12 bg-cyan-300/8 px-4 py-4"
                      >
                        <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-100/48">波形状态</p>
                        <p className="mt-2 text-lg font-semibold text-white">
                          {reading.waveState} · {reading.stability}%
                        </p>
                        <p className="mt-1 text-sm text-cyan-50/78">当前节律趋于稳定，适合做连续判断。</p>
                      </div>
                    </div>

                    <div className="rounded-[22px] border border-fuchsia-300/12 bg-fuchsia-300/7 p-4 sm:p-5">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-fuchsia-100/55">共振信号</p>
                        <p className="text-xs text-fuchsia-100/45">Top 3</p>
                      </div>

                      <div className="mt-4 space-y-2.5">
                        {reading.resonanceTags.map((tag, index) => (
                          <div
                            key={tag}
                            className="flex items-center gap-3 rounded-2xl border border-white/8 bg-black/15 px-3 py-3"
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-fuchsia-200/18 bg-fuchsia-200/10 text-xs font-medium text-fuchsia-50">
                              0{index + 1}
                            </span>
                            <p className="text-sm leading-6 text-white">{tag}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
            {reading.sections.map((section) => {
              const Icon = sectionIcons[section.id as keyof typeof sectionIcons];

              return (
                <div
                  key={section.id}
                  className="rounded-[24px] border border-cyan-300/12 bg-slate-950/58 p-4 shadow-[0_20px_40px_rgba(0,0,0,0.18)] sm:rounded-[28px] sm:p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/8 sm:h-11 sm:w-11">
                      <Icon className="h-5 w-5 text-cyan-200" />
                    </div>
                    <div>
                      <p className="text-base font-medium text-white sm:text-lg">{section.label}</p>
                      <p className="mt-1 text-sm text-cyan-100/75">{section.signal}</p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-slate-300">{section.insight}</p>
                  <div className="mt-5 rounded-2xl border border-emerald-300/12 bg-emerald-300/8 px-4 py-3 text-sm leading-6 text-emerald-50/90">
                    行动建议：{section.advice}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="panel-frame rounded-[24px] p-5 sm:rounded-[28px] sm:p-6 md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div>
            <p className="terminal-title text-[10px] text-cyan-100/50">Final Directive</p>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">{reading.actionAdvice}</p>
          </div>
          <button
            type="button"
            onClick={onRestart}
            className="neon-button w-full rounded-full border border-cyan-300/35 bg-cyan-300/12 px-5 py-3 text-sm text-cyan-50 transition hover:border-cyan-200/60 hover:bg-cyan-300/18 sm:w-auto"
          >
            重新接入终端
          </button>
        </div>
      </div>
    </motion.section>
  );
}
