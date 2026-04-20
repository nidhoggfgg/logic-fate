"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type LandingPanelProps = {
  onEnter: () => void;
};

const bootLines = [
  "DESTINY HANDSHAKE ACCEPTED",
  "ORACLE FIREWALL BYPASSED",
  "TIMELINE NOISE DETECTED",
  "FUTURE RESONANCE READY"
];

export function LandingPanel({ onEnter }: LandingPanelProps) {
  return (
    <motion.section
      key="landing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative min-h-screen overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="fate-grid absolute inset-0 opacity-45" />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.24, 0.42, 0.24] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 h-[78vw] w-[78vw] max-h-[960px] max-w-[960px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/16"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 h-[54vw] w-[54vw] max-h-[720px] max-w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-cyan-300/10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 h-[32vw] w-[32vw] max-h-[420px] max-w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/16"
        />
        <div className="absolute inset-x-0 top-[16%] h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-[18%] h-px bg-gradient-to-r from-transparent via-fuchsia-300/22 to-transparent" />
        <div className="absolute left-[12%] top-[18%] h-48 w-48 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute bottom-[12%] right-[10%] h-56 w-56 rounded-full bg-fuchsia-300/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-between px-6 py-8 md:px-10 md:py-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="terminal-title text-[10px] text-cyan-100/50">Fate Terminal</p>
            <p className="mt-2 text-sm text-slate-400">Unauthorized destiny interface</p>
          </div>
          <div className="hidden rounded-full border border-cyan-300/12 bg-cyan-300/8 px-4 py-2 text-xs uppercase tracking-[0.3em] text-cyan-100/70 md:block">
            cyber oracle mvp
          </div>
        </div>

        <div className="grid items-end gap-14 pb-8 pt-10 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-7">
            <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.36em] text-cyan-100/70">
              <span className="inline-flex items-center gap-2">
                <span className="signal-dot" />
                Live
              </span>
              <span>Future Breach Protocol</span>
            </div>

            <div className="space-y-5">
              <p className="terminal-title text-xs text-cyan-100/45">No gods. No priests. Only signal.</p>
              <h1 className="max-w-4xl text-6xl font-semibold leading-[0.92] tracking-[-0.06em] text-white md:text-[6.6rem]">
                命运不是被解释，
                <span className="glow-text mt-2 block text-cyan-300">而是被入侵。</span>
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                这里不是传统的算命摊。你即将进入一套黑客式命运协议，
                它会根据你的出生坐标、现实困局与情感残响，重建一份属于你的时间线读数。
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                type="button"
                onClick={onEnter}
                className="neon-button inline-flex items-center gap-3 rounded-full border border-cyan-300/38 bg-cyan-300/12 px-6 py-3 text-sm font-medium text-cyan-50 transition hover:border-cyan-200/60 hover:bg-cyan-300/18"
              >
                进入命运终端
                <ArrowRight className="h-4 w-4" />
              </button>
              <div className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-slate-300">
                多步骤沉浸式读取 / 感情 / 事业 / 财运 / 预警
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {bootLines.map((line, index) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.08, duration: 0.36 }}
                className="flex items-center justify-between border-b border-cyan-300/10 py-3 text-sm text-slate-300"
              >
                <span>{line}</span>
                <span className="text-cyan-200/80">0{index + 1}</span>
              </motion.div>
            ))}

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
              className="mt-8 border border-cyan-300/12 bg-black/20 p-5"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-cyan-100/55">
                <span>Destiny Trace</span>
                <span>Window Open</span>
              </div>
              <div className="mt-5 h-40 overflow-hidden border border-cyan-300/10 bg-slate-950/70 p-4 font-mono text-[11px] leading-6 text-emerald-200/85">
                <p>&gt; subject status: unstable, but not broken</p>
                <p>&gt; emotional residue: detectable</p>
                <p>&gt; career divergence: imminent</p>
                <p>&gt; wealth echo: delayed reward pattern</p>
                <p>&gt; anomaly: self-doubt before breakthrough</p>
                <p className="text-cyan-200">&gt; action required: proceed with signal lock</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-cyan-300/10 pt-4 text-xs uppercase tracking-[0.28em] text-slate-500">
          <span>Signal calibration recommended before reading</span>
          <span>Best experienced in full focus mode</span>
        </div>
      </div>
    </motion.section>
  );
}
