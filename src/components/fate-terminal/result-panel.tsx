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
  return (
    <motion.section
      key="result"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="panel-frame rounded-[32px] p-6 md:p-10">
        <div className="grid gap-8 xl:grid-cols-[0.78fr_1.22fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.36em] text-cyan-100/65">
              <span className="signal-dot" />
              Fate Report Issued
            </div>
            <div>
              <p className="terminal-title text-[10px] text-cyan-100/50">Protocol ID {reading.protocolId}</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
                {reading.codename}
                <span className="mt-2 block text-cyan-300">{reading.archetype}</span>
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-cyan-300/12 bg-cyan-300/8 p-5">
                <p className="text-xs uppercase tracking-[0.26em] text-cyan-100/50">Wave State</p>
                <p className="mt-3 text-2xl font-semibold text-white">{reading.waveState}</p>
              </div>
              <div className="rounded-[24px] border border-emerald-300/12 bg-emerald-300/8 p-5">
                <p className="text-xs uppercase tracking-[0.26em] text-emerald-100/50">Stability</p>
                <p className="mt-3 text-2xl font-semibold text-white">{reading.stability}%</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {reading.profileMatrix.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-4"
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
                  <p className="mt-2 text-base font-medium text-white">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[28px] border border-fuchsia-300/12 bg-fuchsia-300/7 p-5">
              <div className="flex items-center gap-3 text-sm text-fuchsia-100">
                <Sparkles className="h-4 w-4" />
                命运判词
              </div>
              <p className="mt-4 text-lg leading-8 text-white">{reading.verdict}</p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex flex-wrap gap-2">
                {reading.resonanceTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3 py-1 text-xs text-cyan-50/85"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between text-sm text-slate-300">
                <span>近期窗口</span>
                <span className="text-cyan-200">{reading.timelineWindow}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {reading.sections.map((section) => {
              const Icon = sectionIcons[section.id as keyof typeof sectionIcons];

              return (
                <div
                  key={section.id}
                  className="rounded-[28px] border border-cyan-300/12 bg-slate-950/58 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/15 bg-cyan-300/8">
                      <Icon className="h-5 w-5 text-cyan-200" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-white">{section.label}</p>
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

      <div className="panel-frame rounded-[28px] p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="terminal-title text-[10px] text-cyan-100/50">Final Directive</p>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">{reading.actionAdvice}</p>
          </div>
          <button
            type="button"
            onClick={onRestart}
            className="neon-button rounded-full border border-cyan-300/35 bg-cyan-300/12 px-5 py-3 text-sm text-cyan-50 transition hover:border-cyan-200/60 hover:bg-cyan-300/18"
          >
            重新接入终端
          </button>
        </div>
      </div>
    </motion.section>
  );
}
