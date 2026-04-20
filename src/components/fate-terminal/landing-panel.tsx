"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";

type LandingPanelProps = {
  onEnter: () => void;
};

const orbitBands = [
  {
    radius: "min(42vw, 360px)",
    duration: 42,
    direction: 1,
    borderClass: "border-cyan-300/12",
    labelClass: "text-cyan-100/72",
    labels: ["星座", "卦象", "紫微", "塔罗", "命盘", "流年", "宫位", "月相", "行运", "星盘", "因果", "宿命"]
  },
  {
    radius: "min(31vw, 262px)",
    duration: 24,
    direction: -1,
    borderClass: "border-emerald-300/14",
    labelClass: "text-emerald-100/70",
    labels: ["八字", "五行", "六爻", "奇门", "相位", "水逆", "签文", "灵摆", "磁场", "业力"]
  },
  {
    radius: "min(21vw, 178px)",
    duration: 14,
    direction: 1,
    borderClass: "border-fuchsia-300/12",
    labelClass: "text-fuchsia-100/66",
    labels: ["乾", "兑", "离", "震", "巽", "坎", "艮", "坤"]
  }
] as const;

const marqueeRows = [
  ["ASTRAL", "星座", "HEXAGRAM", "卦象", "RETROGRADE", "命盘", "LUNAR", "塔罗", "业力", "SIGNAL"],
  ["五行", "ORBIT", "流年", "TAROT", "紫微", "PHASE", "六爻", "ASCENDANT", "奇门", "VOID"]
] as const;

const streamColumns = [
  {
    side: "left",
    offset: "4%",
    duration: "18s",
    lines: [
      "0x7F ASTRAL // 星座矩阵",
      "HEXAGRAM::01100110",
      "RETROGRADE PULSE +12",
      "宫位 / HOUSE_07 / OPEN",
      "五行校准: 火 > 水",
      "TAROT ARCANA // XIX",
      "因果索引 -> KRM_23",
      "SIGNAL LOCK // TRUE"
    ]
  },
  {
    side: "left",
    offset: "16%",
    duration: "24s",
    lines: [
      "命盘载入中...",
      "BIRTH TRACE // FOUND",
      "月相噪声: 03.2%",
      "ORACLE CACHE SYNC",
      "卦象回流 / REPEAT",
      "星体偏移 -> 4.7",
      "TIMELINE BRANCH // ACTIVE",
      "VOID INPUT ACCEPTED"
    ]
  },
  {
    side: "right",
    offset: "6%",
    duration: "20s",
    lines: [
      "SIGNATURE: 紫微",
      "LUNAR NODE // SOUTH",
      "震宫共振 +++",
      "ARCANA STREAM // LIVE",
      "六爻波形校正",
      "心念取样 / PASS",
      "ORBIT TRACE -> 0x2A",
      "ENTRY VECTOR READY"
    ]
  },
  {
    side: "right",
    offset: "18%",
    duration: "26s",
    lines: [
      "坎 / 艮 / 离 / 兑",
      "SPIRAL HASH // 88AF",
      "运势偏差: LOW",
      "SOUL LATENCY // 12ms",
      "宿命缓冲池扩张",
      "TAROT // THE STAR",
      "星尘噪声过滤完成",
      "SINGULARITY // OPEN"
    ]
  }
] as const;

const infallShards = [
  { angle: "8deg", distance: "320px", delay: "0s", duration: "8.2s", size: "92px" },
  { angle: "38deg", distance: "280px", delay: "1.1s", duration: "6.4s", size: "76px" },
  { angle: "66deg", distance: "302px", delay: "2.6s", duration: "7.8s", size: "88px" },
  { angle: "98deg", distance: "258px", delay: "0.8s", duration: "5.9s", size: "74px" },
  { angle: "126deg", distance: "330px", delay: "3.2s", duration: "8.6s", size: "96px" },
  { angle: "156deg", distance: "288px", delay: "1.9s", duration: "6.8s", size: "82px" },
  { angle: "198deg", distance: "310px", delay: "2.2s", duration: "7.4s", size: "90px" },
  { angle: "224deg", distance: "272px", delay: "0.4s", duration: "6.1s", size: "72px" },
  { angle: "252deg", distance: "322px", delay: "2.9s", duration: "8.1s", size: "94px" },
  { angle: "286deg", distance: "264px", delay: "1.4s", duration: "5.8s", size: "70px" },
  { angle: "316deg", distance: "298px", delay: "3.6s", duration: "7.2s", size: "84px" },
  { angle: "344deg", distance: "338px", delay: "1.7s", duration: "8.8s", size: "98px" }
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
      className="relative min-h-screen overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="fate-grid absolute inset-0 opacity-35" />
        <div className="noise-mask absolute inset-0 opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(3,5,9,0.32)_32%,rgba(2,4,8,0.86)_72%,rgba(1,2,5,1)_100%)]" />
        <div className="absolute left-1/2 top-1/2 h-[82vw] w-[82vw] max-h-[1120px] max-w-[1120px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/6 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[50vw] w-[50vw] max-h-[760px] max-w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-400/6 blur-3xl" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-6 text-[10px] uppercase tracking-[0.42em] text-white/28 md:px-10">
        <span>Fate Singularity</span>
        <span>Oracle Drift</span>
      </div>

      {streamColumns.map((column, columnIndex) => (
        <div
          key={`${column.side}-${column.offset}`}
          className={`void-stream ${column.side === "right" ? "void-stream-right" : ""}`}
          style={
            column.side === "left"
              ? { left: column.offset }
              : {
                  right: column.offset
                }
          }
        >
          <div
            className={`void-stream-track ${columnIndex % 2 === 0 ? "" : "is-reverse"}`}
            style={{ animationDuration: column.duration }}
          >
            {duplicated(column.lines).map((line, lineIndex) => (
              <p key={`${column.offset}-${lineIndex}`} className="void-stream-line">
                {line}
              </p>
            ))}
          </div>
        </div>
      ))}

      <div className="pointer-events-none absolute inset-x-0 top-[14%] z-10 space-y-4">
        {marqueeRows.map((row, index) => (
          <div
            key={`top-${index}`}
            className={`keyword-marquee ${index % 2 === 1 ? "is-reverse" : ""}`}
          >
            <div className="keyword-marquee-track">
              {duplicated(row).map((label, labelIndex) => (
                <span key={`top-${index}-${labelIndex}`} className="keyword-token">
                  {label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-[11%] z-10 space-y-4">
        {marqueeRows.map((row, index) => (
          <div
            key={`bottom-${index}`}
            className={`keyword-marquee ${index % 2 === 0 ? "is-reverse" : ""}`}
          >
            <div className="keyword-marquee-track">
              {duplicated([...row].reverse()).map((label, labelIndex) => (
                <span key={`bottom-${index}-${labelIndex}`} className="keyword-token">
                  {label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10 md:px-10">
        <div className="pointer-events-none relative aspect-square w-full max-w-[980px]">
          <div className="gravity-well absolute left-1/2 top-1/2 h-[min(58vw,560px)] w-[min(58vw,560px)] max-h-[560px] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full" />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 68, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 h-[min(96vw,940px)] w-[min(96vw,940px)] max-h-[940px] max-w-[940px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10"
          />

          {orbitBands.map((band, bandIndex) => (
            <motion.div
              key={band.radius}
              animate={{ rotate: band.direction > 0 ? 360 : -360 }}
              transition={{ duration: band.duration, repeat: Infinity, ease: "linear" }}
              className={`absolute left-1/2 top-1/2 rounded-full border ${band.borderClass}`}
              style={{
                width: `calc(${band.radius} * 2)`,
                height: `calc(${band.radius} * 2)`,
                transform: "translate(-50%, -50%)"
              }}
            >
              <div className="absolute inset-[10%] rounded-full border border-white/6 opacity-40" />
              {band.labels.map((label, labelIndex) => {
                const angle = (360 / band.labels.length) * labelIndex + bandIndex * 11;

                return (
                  <div
                    key={`${band.radius}-${label}`}
                    className="orbit-label absolute left-1/2 top-1/2"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(calc(-1 * ${band.radius}))`
                    }}
                  >
                    <span
                      className={`inline-flex whitespace-nowrap rounded-full border border-white/8 bg-black/22 px-3 py-1 ${band.labelClass}`}
                      style={{ transform: `rotate(${-angle}deg)` }}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          ))}

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[min(42vw,380px)] w-[min(42vw,380px)] max-h-[380px] max-w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/6"
          >
            <div className="absolute left-1/2 top-1/2 h-[36%] w-[128%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8 bg-white/[0.03] blur-[7px]" />
            <div className="absolute left-1/2 top-1/2 h-[21%] w-[94%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/55 blur-[10px]" />
            <div className="absolute left-1/2 top-1/2 h-[48%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_26%,rgba(0,0,0,0)_68%)] blur-[22px]" />
          </motion.div>

          {infallShards.map((shard, index) => (
            <span
              key={`${shard.angle}-${shard.distance}`}
              className={`infall-shard ${index % 3 === 1 ? "is-fuchsia" : index % 3 === 2 ? "is-gold" : ""}`}
              style={
                {
                  "--angle": shard.angle,
                  "--distance": shard.distance,
                  "--delay": shard.delay,
                  "--duration": shard.duration,
                  "--size": shard.size
                } as CSSProperties
              }
            />
          ))}

          <motion.button
            type="button"
            onClick={onEnter}
            aria-label="进入命运终端"
            whileHover={{ scale: 1.035 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="group pointer-events-auto absolute left-1/2 top-1/2 z-20 h-[clamp(210px,27vw,310px)] w-[clamp(210px,27vw,310px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.02] bg-transparent outline-none isolate"
          >
            <span className="vortex-ooze absolute inset-[-18%]" />
            <span className="vortex-ooze is-secondary absolute inset-[-10%]" />
            <span className="vortex-arm absolute inset-[-14%]" />
            <span className="vortex-arm is-secondary absolute inset-[-10%]" />
            <span className="vortex-arm is-tertiary absolute inset-[-6%]" />
            <span className="event-horizon absolute inset-[-4%]" />
            <span className="vortex-shear absolute inset-[-12%]" />
            <span className="singularity-swirl absolute inset-[-14%]" />
            <span className="singularity-ring absolute inset-[-10%]" />
            <span className="singularity-ring is-secondary absolute inset-[2%]" />
            <span className="vortex-collapse absolute inset-[14%]" />
            <span className="vortex-collapse is-secondary absolute inset-[22%]" />
            <span className="vortex-core absolute inset-[33%]" />
            <span className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="h-2 w-2 rounded-full bg-white/85 opacity-28 blur-[1px]" />
              <span className="mt-5 text-[10px] uppercase tracking-[0.72em] text-white/34 transition duration-300 group-hover:text-white/62">
                Enter
              </span>
            </span>
          </motion.button>

          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-300/28 to-transparent" />
          <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-fuchsia-300/18 to-transparent" />
        </div>
      </div>
    </motion.section>
  );
}
