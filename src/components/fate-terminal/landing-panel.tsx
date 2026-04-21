"use client";

import { motion } from "framer-motion";
import { Activity, ArrowRight } from "lucide-react";
import { AbyssVortex } from "@/components/fate-terminal/abyss-vortex";

type LandingPanelProps = {
  onEnter: () => void;
};

const marqueeRows = [
  ["命盘", "Bazi", "塔罗", "Hexagram", "紫微", "Fortune", "卦象", "Divination", "流年"],
  ["姻缘", "Oracle", "财运", "Tarot", "运势", "Natal Chart", "签文", "Astrology", "命格"]
] as const;

function duplicated<T>(items: readonly T[]) {
  return [...items, ...items];
}

export function LandingPanel({ onEnter }: LandingPanelProps) {
  return (
    <motion.section
      key="landing"
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.015 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative min-h-[100svh] overflow-hidden bg-[#020407]"
    >
      <AbyssVortex />

      <div className="pointer-events-none absolute inset-0">
        <div className="fate-grid absolute inset-0 opacity-25" />
        <div className="noise-mask absolute inset-0 opacity-12" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 pb-4 pt-[calc(1rem+env(safe-area-inset-top))] text-[9px] uppercase tracking-[0.32em] text-white/28 sm:px-6 sm:text-[10px] sm:tracking-[0.42em] md:px-10">
        <span>Fate Singularity</span>
        <span>Event Horizon Detected</span>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-[14%] z-10 flex flex-col items-center gap-2 sm:top-[18%] sm:gap-3">
        {marqueeRows.map((row, index) => (
          <div
            key={`top-${index}`}
            className={`keyword-marquee-shell keyword-marquee-shell-top ${index === 1 ? "is-near" : "is-far"}`}
          >
            <div className={`keyword-marquee ${index % 2 === 1 ? "is-reverse" : ""}`}>
              <div className="keyword-marquee-track">
                {duplicated(row).map((label, labelIndex) => (
                  <span key={`top-${index}-${labelIndex}`} className="keyword-token">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-[16%] z-10 hidden flex-col items-center gap-3 md:flex">
        {marqueeRows.map((row, index) => (
          <div
            key={`bottom-${index}`}
            className={`keyword-marquee-shell keyword-marquee-shell-bottom ${index === 0 ? "is-near" : "is-far"}`}
          >
            <div className={`keyword-marquee ${index % 2 === 0 ? "is-reverse" : ""}`}>
              <div className="keyword-marquee-track">
                {duplicated([...row].reverse()).map((label, labelIndex) => (
                  <span key={`bottom-${index}-${labelIndex}`} className="keyword-token">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 min-h-[100svh] px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-[calc(1rem+env(safe-area-inset-top))] sm:px-6 md:px-10 md:py-8">
        <div className="flex min-h-[100svh] flex-col justify-between">
          <div className="pt-20 sm:pt-16" />

          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-300/18 to-transparent" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[48vh] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-cyan-200/14 to-transparent" />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[min(62vw,260px)] w-[min(62vw,260px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/14 sm:h-[min(40vw,360px)] sm:w-[min(40vw,360px)]"
          >
            <div className="absolute inset-[18%] rounded-full border border-white/8" />
          </motion.div>

          <motion.button
            type="button"
            onClick={onEnter}
            aria-label="进入命运终端"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="group absolute left-1/2 top-1/2 z-20 flex h-[clamp(156px,48vw,220px)] w-[clamp(156px,48vw,220px)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/18 bg-white/[0.02] shadow-[0_0_64px_rgba(0,0,0,0.36)] backdrop-blur-md outline-none sm:h-[clamp(180px,22vw,240px)] sm:w-[clamp(180px,22vw,240px)]"
          >
            <div className="absolute inset-3 rounded-full border border-cyan-200/12" />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(93,242,255,0.08),rgba(0,0,0,0.06)_28%,rgba(0,0,0,0)_62%)]" />
            <div className="absolute inset-[24%] rounded-full border border-white/10 bg-black/40 backdrop-blur-xl" />
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-[9px] uppercase tracking-[0.42em] text-white/44 transition duration-300 group-hover:text-cyan-100/80 sm:text-[10px] sm:tracking-[0.52em]">
                Enter
              </span>
              <span className="mt-2 text-lg font-medium tracking-[0.2em] text-white sm:mt-3 sm:text-xl sm:tracking-[0.28em]">
                命运终端
              </span>
              <span className="mt-2 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-cyan-200/78 sm:mt-3 sm:text-xs sm:tracking-[0.3em]">
                Begin Scan
                <ArrowRight className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </motion.button>

          <div className="grid gap-6 pb-2 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
            <div className="self-end">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/8 bg-black/24 px-3 py-2 text-[9px] uppercase tracking-[0.24em] text-white/38 backdrop-blur-md sm:px-4 sm:text-[10px] sm:tracking-[0.38em]">
                <Activity className="h-3.5 w-3.5 text-cyan-300/70" />
                Observing Anomaly // Event Horizon Detected
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
