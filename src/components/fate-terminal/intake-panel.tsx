"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type RefObject } from "react";
import { createPortal } from "react-dom";
import { DayPicker } from "react-day-picker";
import type { Control, FieldErrors } from "react-hook-form";
import { Controller, useWatch } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, ChevronLeft, ChevronRight, Clock3 } from "lucide-react";
import {
  focusOptions,
  genderOptions,
  relationshipOptions,
  type FateFormValues
} from "@/lib/reading-schema";

type IntakePanelProps = {
  step: "profile" | "intent";
  control: Control<FateFormValues>;
  errors: FieldErrors<FateFormValues>;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
};

type FieldLineProps = {
  label: string;
  hint: string;
  error?: string;
  children: React.ReactNode;
};

type OptionGroupProps = {
  options: ReadonlyArray<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
};

type DateAssemblerProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

type TimeAssemblerProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

type ScrollPickerColumnProps = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

type CompactDropdownProps = {
  label: string;
  value: string;
  displayValue: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
};

type PickerPopoverProps = {
  anchorRef: RefObject<HTMLElement | null>;
  title: string;
  subtitle: string;
  valueLabel: string;
  onClose: () => void;
  maxWidth?: number;
  children: React.ReactNode;
};

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1899 }, (_, index) => String(currentYear - index));
const months = Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, "0"));
const monthLabels = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月"
];
const weekdayLabels = ["一", "二", "三", "四", "五", "六", "日"];
const hours = Array.from({ length: 24 }, (_, index) => String(index).padStart(2, "0"));
const minutes = Array.from({ length: 60 }, (_, index) => String(index).padStart(2, "0"));

function daysInMonth(year: string, month: string) {
  if (!year || !month) {
    return 31;
  }

  return new Date(Number(year), Number(month), 0).getDate();
}

function splitDate(value: string) {
  if (!value) {
    return { year: "", month: "", day: "" };
  }

  const [year = "", month = "", day = ""] = value.split("-");
  return { year, month, day };
}

function splitTime(value: string) {
  if (!value) {
    return { hour: "", minute: "" };
  }

  const [hour = "", minute = ""] = value.split(":");
  return { hour, minute };
}

function parseDateString(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return undefined;
  }

  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatIsoDate(date: Date) {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDateParts(parts: { year: string; month: string; day: string }) {
  if (!parts.year) {
    return "";
  }

  if (!parts.month) {
    return parts.year;
  }

  if (!parts.day) {
    return `${parts.year}-${parts.month}`;
  }

  return `${parts.year}-${parts.month}-${parts.day}`;
}

function formatTimeParts(parts: { hour: string; minute: string }) {
  if (!parts.hour) {
    return "";
  }

  if (!parts.minute) {
    return parts.hour;
  }

  return `${parts.hour}:${parts.minute}`;
}

function formatDateLabel(value: string) {
  const { year, month, day } = splitDate(value);

  if (!year) {
    return "点击打开日期校准";
  }

  if (!month) {
    return `${year} 年`;
  }

  if (!day) {
    return `${year} 年 ${month} 月`;
  }

  return `${year} 年 ${month} 月 ${day} 日`;
}

function formatTimeLabel(value: string) {
  const { hour, minute } = splitTime(value);

  if (!hour) {
    return "点击打开时间校准";
  }

  if (!minute) {
    return `${hour} 时`;
  }

  return `${hour}:${minute}`;
}

function FieldLine({ label, hint, error, children }: FieldLineProps) {
  return (
    <div className="space-y-4 border-b border-cyan-300/10 pb-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-100/75">{label}</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">{hint}</p>
        </div>
        {error ? <span className="text-xs uppercase tracking-[0.2em] text-rose-300">{error}</span> : null}
      </div>
      {children}
    </div>
  );
}

function OptionGroup({ options, value, onChange }: OptionGroupProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => {
        const active = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              active
                ? "border-cyan-300/60 bg-cyan-300/16 text-cyan-50 shadow-[0_0_22px_rgba(93,242,255,0.18)]"
                : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-300/25 hover:text-cyan-50"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function ScrollPickerColumn({
  label,
  options,
  value,
  onChange,
  disabled = false
}: ScrollPickerColumnProps) {
  return (
    <div
      className={`terminal-picker rounded-[22px] border bg-slate-950/72 p-3 ${
        disabled ? "border-white/6 opacity-45" : "border-cyan-300/14"
      }`}
    >
      <div className="mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.26em] text-slate-500">
        <span>{label}</span>
        <span>{value || "--"}</span>
      </div>
      <div className="terminal-picker-list max-h-56 space-y-2 overflow-y-auto pr-1">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            disabled={disabled}
            onClick={() => onChange(option)}
            className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
              option === value
                ? "border border-cyan-300/45 bg-cyan-300/15 text-cyan-50 shadow-[0_0_18px_rgba(93,242,255,0.14)]"
                : "border border-transparent bg-white/[0.03] text-slate-300 hover:border-cyan-300/18 hover:bg-cyan-300/8"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function CompactDropdown({
  label,
  value,
  displayValue,
  options,
  onChange
}: CompactDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="terminal-select flex w-full items-center justify-between rounded-2xl border border-cyan-300/14 bg-slate-950/72 px-4 py-3 text-left transition hover:border-cyan-300/24"
      >
        <span className="text-sm text-slate-300">{displayValue}</span>
        <span className="text-[11px] uppercase tracking-[0.22em] text-slate-500">{label}</span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute left-0 top-[calc(100%+10px)] z-20 w-full rounded-2xl border border-cyan-300/14 bg-[rgba(6,10,18,0.98)] p-2 shadow-[0_18px_48px_rgba(0,0,0,0.36)]"
          >
            <div className="compact-dropdown-list max-h-52 space-y-1 overflow-y-auto pr-1">
              {options.map((option) => {
                const active = option.value === value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                      active
                        ? "bg-cyan-300/16 text-cyan-50"
                        : "text-slate-300 hover:bg-cyan-300/8 hover:text-cyan-50"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function PickerPopover({
  anchorRef,
  title,
  subtitle,
  valueLabel,
  onClose,
  maxWidth = 384,
  children
}: PickerPopoverProps) {
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [side, setSide] = useState<"top" | "bottom">("bottom");
  const [style, setStyle] = useState<CSSProperties>({ opacity: 0 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!isMounted || !anchorRef.current) {
      return;
    }

    const viewportPadding = 16;
    const gap = 14;

    function updatePosition() {
      const anchor = anchorRef.current;
      const popover = popoverRef.current;

      if (!anchor || !popover) {
        return;
      }

      const anchorRect = anchor.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const popoverWidth = Math.min(
        Math.max(anchorRect.width, 320),
        maxWidth,
        viewportWidth - viewportPadding * 2
      );
      const estimatedHeight = popover.offsetHeight || 420;
      const availableBelow = viewportHeight - anchorRect.bottom - gap - viewportPadding;
      const availableAbove = anchorRect.top - gap - viewportPadding;
      const shouldPlaceAbove =
        availableBelow < Math.min(estimatedHeight, 420) && availableAbove > availableBelow;
      const nextSide = shouldPlaceAbove ? "top" : "bottom";
      const maxHeight = Math.max(
        280,
        Math.min(
          viewportHeight - viewportPadding * 2,
          nextSide === "bottom" ? availableBelow : availableAbove
        )
      );
      let left = anchorRect.left;

      if (left + popoverWidth > viewportWidth - viewportPadding) {
        left = viewportWidth - viewportPadding - popoverWidth;
      }

      left = Math.max(viewportPadding, left);

      const top =
        nextSide === "bottom"
          ? Math.min(anchorRect.bottom + gap, viewportHeight - viewportPadding - maxHeight)
          : Math.max(viewportPadding, anchorRect.top - gap - maxHeight);

      setSide(nextSide);
      setStyle({
        left,
        top,
        width: popoverWidth,
        maxHeight,
        opacity: 1
      });
    }

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [anchorRef, isMounted, maxWidth]);

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <>
      <button
        type="button"
        aria-label="关闭弹出层"
        className="fixed inset-0 z-40 cursor-default"
        onClick={onClose}
      />
      <motion.div
        ref={popoverRef}
        initial={{ opacity: 0, y: side === "bottom" ? 16 : -16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: side === "bottom" ? 16 : -16, scale: 0.98 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        data-side={side}
        style={style}
        className="picker-popover fixed z-50 flex flex-col rounded-[28px] border border-cyan-300/16 bg-[rgba(5,10,18,0.96)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.48)]"
      >
        <div className="shrink-0 border-b border-cyan-300/10 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="terminal-title text-[10px] text-cyan-100/45">Fate Picker</p>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{subtitle}</p>
            </div>
            <div className="rounded-full border border-cyan-300/10 bg-cyan-300/[0.05] px-3 py-1 text-xs text-cyan-100/70">
              {valueLabel}
            </div>
          </div>
        </div>

        <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1">{children}</div>
      </motion.div>
    </>,
    document.body
  );
}

function DateAssembler({ value, onChange }: DateAssemblerProps) {
  const selectedDate = useMemo(() => parseDateString(value), [value]);
  const [displayMonth, setDisplayMonth] = useState<Date>(selectedDate ?? new Date(1998, 5, 15));

  useEffect(() => {
    if (selectedDate) {
      setDisplayMonth(selectedDate);
    }
  }, [selectedDate]);

  function handleYearChange(nextYear: string) {
    setDisplayMonth((current) => new Date(Number(nextYear), current.getMonth(), 1));
  }

  function handleMonthChange(nextMonth: string) {
    setDisplayMonth((current) => new Date(current.getFullYear(), Number(nextMonth) - 1, 1));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="grid flex-1 gap-3 sm:grid-cols-2">
          <CompactDropdown
            label="年份"
            value={String(displayMonth.getFullYear())}
            displayValue={`${displayMonth.getFullYear()} 年`}
            options={years.map((year) => ({ value: year, label: `${year} 年` }))}
            onChange={handleYearChange}
          />
          <CompactDropdown
            label="月份"
            value={String(displayMonth.getMonth() + 1).padStart(2, "0")}
            displayValue={monthLabels[displayMonth.getMonth()]}
            options={months.map((month) => ({
              value: month,
              label: monthLabels[Number(month) - 1]
            }))}
            onChange={handleMonthChange}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setDisplayMonth(
                (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1)
              )
            }
            className="rounded-full border border-white/10 bg-white/[0.03] p-2 text-slate-300 transition hover:border-cyan-300/22 hover:text-cyan-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() =>
              setDisplayMonth(
                (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1)
              )
            }
            className="rounded-full border border-white/10 bg-white/[0.03] p-2 text-slate-300 transition hover:border-cyan-300/22 hover:text-cyan-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="rounded-[24px] border border-cyan-300/12 bg-slate-950/72 p-3">
        <DayPicker
          mode="single"
          month={displayMonth}
          onMonthChange={setDisplayMonth}
          selected={selectedDate}
          onSelect={(date) => {
            if (!date) {
              return;
            }

            onChange(formatIsoDate(date));
          }}
          showOutsideDays
          weekStartsOn={1}
          formatters={{
            formatWeekdayName: (date) => weekdayLabels[(date.getDay() + 6) % 7]
          }}
          classNames={{
            root: "cyber-calendar",
            months: "w-full",
            month: "space-y-3",
            month_caption: "hidden",
            nav: "hidden",
            weekdays: "grid grid-cols-7 gap-2",
            weekday: "flex h-9 items-center justify-center text-xs uppercase tracking-[0.2em] text-slate-500",
            week: "mt-2 grid grid-cols-7 gap-2",
            day: "flex justify-center",
            day_button:
              "flex h-11 w-11 items-center justify-center rounded-2xl border border-transparent text-sm text-slate-200 transition hover:border-cyan-300/20 hover:bg-cyan-300/10",
            selected:
              "[&_button]:border-cyan-300/45 [&_button]:bg-cyan-300/18 [&_button]:text-cyan-50 [&_button]:shadow-[0_0_22px_rgba(93,242,255,0.16)]",
            today: "[&_button]:border-emerald-300/32 [&_button]:text-emerald-200",
            outside: "[&_button]:text-slate-600"
          }}
        />
      </div>
    </div>
  );
}

function TimeAssembler({ value, onChange }: TimeAssemblerProps) {
  const { hour, minute } = splitTime(value);

  function update(next: Partial<{ hour: string; minute: string }>) {
    const merged = { hour, minute, ...next };
    onChange(formatTimeParts(merged));
  }

  function handleHourChange(nextHour: string) {
    if (nextHour === hour) {
      onChange("");
      return;
    }

    update({ hour: nextHour, minute });
  }

  function handleMinuteChange(nextMinute: string) {
    if (!hour) {
      return;
    }

    update({ minute: nextMinute === minute ? "" : nextMinute });
  }

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <ScrollPickerColumn label="小时" options={hours} value={hour} onChange={handleHourChange} />
      <ScrollPickerColumn
        label="分钟"
        options={minutes}
        value={minute}
        onChange={handleMinuteChange}
        disabled={!hour}
      />
    </div>
  );
}

export function IntakePanel({ step, control, errors, onBack, onNext, onSubmit }: IntakePanelProps) {
  const isProfile = step === "profile";
  const values = useWatch({ control });
  const [activePicker, setActivePicker] = useState<"date" | "time" | null>(null);
  const dateTriggerRef = useRef<HTMLButtonElement | null>(null);
  const timeTriggerRef = useRef<HTMLButtonElement | null>(null);

  const synopsis = [
    values.name ? `对象代号：${values.alias || values.name}` : "对象代号：未写入",
    values.birthDate ? `出生坐标：${values.birthDate} ${values.birthTime || ""}` : "出生坐标：待校准",
    values.occupation ? `身份标签：${values.occupation}` : "身份标签：待录入",
    values.focusArea ? `本次焦点：${values.focusArea}` : "本次焦点：待锁定"
  ];

  return (
    <motion.section
      key={step}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative min-h-screen overflow-hidden"
    >
      <div className="fate-grid absolute inset-0 opacity-30" />
      <div className="absolute left-[8%] top-[14%] h-60 w-60 rounded-full bg-cyan-300/7 blur-3xl" />
      <div className="absolute bottom-[8%] right-[10%] h-72 w-72 rounded-full bg-emerald-300/7 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 md:px-10 md:py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyan-300/10 pb-5">
          <div>
            <p className="terminal-title text-[10px] text-cyan-100/50">Destiny Intake Sequence</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl">
              {isProfile ? "写入你的身份坐标" : "锁定你此刻最在意的命运分支"}
            </h2>
          </div>
          <div className="text-right">
            <p className="terminal-title text-[10px] text-slate-500">Phase</p>
            <p className="mt-2 text-sm text-cyan-100">{isProfile ? "01 / Signal Registration" : "02 / Oracle Lock"}</p>
          </div>
        </div>

        <div className="grid flex-1 gap-10 py-8 xl:grid-cols-[0.42fr_0.58fr]">
          <aside className="flex flex-col justify-between gap-8">
            <div className="space-y-5">
              <p className="terminal-title text-[10px] text-cyan-100/45">Ritual note</p>
              <p className="max-w-md text-2xl font-medium leading-10 tracking-[-0.03em] text-white">
                {isProfile
                  ? "系统正在建立你的命格索引。不是为了回答表面的问题，而是为了找到你命运里真正卡住的那个节点。"
                  : "把问题说清楚，让终端知道该追踪哪一条时间线。你越诚实，返回的判词就越像命运本身。"}
              </p>
              <div className="space-y-3 border-l border-cyan-300/12 pl-4 text-sm leading-7 text-slate-400">
                <p>这里的输入不需要很“标准”，但需要尽量真实。</p>
                <p>你正在提交的不是表单，而是一份用于扫描未来残响的身份样本。</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.26em] text-slate-500">
                <span>Signal snapshot</span>
                <span>{isProfile ? "42%" : "76%"}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/6">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isProfile ? "42%" : "76%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-emerald-300 to-fuchsia-400"
                />
              </div>
              <div className="space-y-3 border border-cyan-300/10 bg-black/20 p-5 font-mono text-[11px] leading-6 text-emerald-200/85">
                {synopsis.map((line) => (
                  <p key={line}>&gt; {line}</p>
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            {isProfile ? (
              <>
                <FieldLine label="名字" hint="输入你希望被读取的身份名" error={errors.name?.message}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <div className="terminal-input-line">
                        <input {...field} className="field-input" placeholder="例如：林深 / Alex" />
                      </div>
                    )}
                  />
                </FieldLine>

                <FieldLine label="代号" hint="可选，结果页会优先显示这个名字" error={errors.alias?.message}>
                  <Controller
                    name="alias"
                    control={control}
                    render={({ field }) => (
                      <div className="terminal-input-line">
                        <input {...field} className="field-input" placeholder="例如：Ghostline" />
                      </div>
                    )}
                  />
                </FieldLine>

                <FieldLine label="性别设定" hint="用于轻微调整叙事视角" error={errors.gender?.message}>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <OptionGroup options={genderOptions} value={field.value} onChange={field.onChange} />
                    )}
                  />
                </FieldLine>

                <FieldLine label="情感状态" hint="系统会据此追踪感情回路" error={errors.relationshipStatus?.message}>
                  <Controller
                    name="relationshipStatus"
                    control={control}
                    render={({ field }) => (
                      <OptionGroup
                        options={relationshipOptions}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </FieldLine>

                <FieldLine label="出生日期" hint="改为自定义选择器，避免原生控件兼容问题" error={errors.birthDate?.message}>
                  <Controller
                    name="birthDate"
                    control={control}
                    render={({ field }) => (
                      <div className="relative">
                        <button
                          ref={dateTriggerRef}
                          type="button"
                          onClick={() => setActivePicker("date")}
                          className="picker-trigger group flex w-full items-center justify-between rounded-[24px] border border-cyan-300/14 bg-slate-950/70 px-5 py-4 text-left transition hover:border-cyan-300/32 hover:bg-cyan-300/[0.06]"
                        >
                          <div className="flex items-center gap-4">
                            <div className="rounded-2xl border border-cyan-300/14 bg-cyan-300/[0.06] p-3 text-cyan-200">
                              <CalendarDays className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-sm uppercase tracking-[0.24em] text-cyan-100/55">Date Picker</p>
                              <p className="mt-2 text-base text-white">{formatDateLabel(field.value)}</p>
                            </div>
                          </div>
                          <span className="text-sm text-slate-400 transition group-hover:text-cyan-100">打开月历</span>
                        </button>

                        <AnimatePresence>
                          {activePicker === "date" ? (
                            <PickerPopover
                              anchorRef={dateTriggerRef}
                              title="校准出生日期"
                              subtitle="这是更接近主流产品的桌面日期选择：字段触发，浮层月历，直接点选具体日期。"
                              valueLabel={formatDateLabel(field.value)}
                              onClose={() => setActivePicker(null)}
                            >
                              <DateAssembler value={field.value} onChange={field.onChange} />
                            </PickerPopover>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    )}
                  />
                </FieldLine>

                <FieldLine label="出生时间" hint="用于提升命运窗口的精细度" error={errors.birthTime?.message}>
                  <Controller
                    name="birthTime"
                    control={control}
                    render={({ field }) => (
                      <div className="relative">
                        <button
                          ref={timeTriggerRef}
                          type="button"
                          onClick={() => setActivePicker("time")}
                          className="picker-trigger group flex w-full items-center justify-between rounded-[24px] border border-cyan-300/14 bg-slate-950/70 px-5 py-4 text-left transition hover:border-cyan-300/32 hover:bg-cyan-300/[0.06]"
                        >
                          <div className="flex items-center gap-4">
                            <div className="rounded-2xl border border-cyan-300/14 bg-cyan-300/[0.06] p-3 text-cyan-200">
                              <Clock3 className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-sm uppercase tracking-[0.24em] text-cyan-100/55">Time Picker</p>
                              <p className="mt-2 text-base text-white">{formatTimeLabel(field.value)}</p>
                            </div>
                          </div>
                          <span className="text-sm text-slate-400 transition group-hover:text-cyan-100">打开时间</span>
                        </button>

                        <AnimatePresence>
                          {activePicker === "time" ? (
                            <PickerPopover
                              anchorRef={timeTriggerRef}
                              title="校准出生时间"
                              subtitle="时间使用独立浮层选择，和日期保持同一套交互语义。"
                              valueLabel={formatTimeLabel(field.value)}
                              onClose={() => setActivePicker(null)}
                              maxWidth={448}
                            >
                              <TimeAssembler value={field.value} onChange={field.onChange} />
                            </PickerPopover>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    )}
                  />
                </FieldLine>
              </>
            ) : (
              <>
                <FieldLine label="当前身份 / 职业" hint="例如：前端工程师、设计师、学生" error={errors.occupation?.message}>
                  <Controller
                    name="occupation"
                    control={control}
                    render={({ field }) => (
                      <div className="terminal-input-line">
                        <input {...field} className="field-input" placeholder="输入你的职业或身份" />
                      </div>
                    )}
                  />
                </FieldLine>

                <FieldLine label="最想关注的方向" hint="结果页会围绕这个维度重点生成" error={errors.focusArea?.message}>
                  <Controller
                    name="focusArea"
                    control={control}
                    render={({ field }) => (
                      <OptionGroup options={focusOptions} value={field.value} onChange={field.onChange} />
                    )}
                  />
                </FieldLine>

                <FieldLine label="你最想问的问题" hint="越具体，终端生成的判词越像真的" error={errors.question?.message}>
                  <Controller
                    name="question"
                    control={control}
                    render={({ field }) => (
                      <div className="terminal-textarea">
                        <textarea
                          {...field}
                          className="field-input min-h-36 resize-none"
                          placeholder="例如：我现在是否该离开这份工作，去做新的选择？"
                        />
                      </div>
                    )}
                  />
                </FieldLine>

                <FieldLine label="最近最困扰的一件事" hint="这能帮助系统判断你的现实阻力" error={errors.recentIssue?.message}>
                  <Controller
                    name="recentIssue"
                    control={control}
                    render={({ field }) => (
                      <div className="terminal-textarea">
                        <textarea
                          {...field}
                          className="field-input min-h-36 resize-none"
                          placeholder="例如：最近总觉得自己卡住了，状态起伏很大，也不知道该往哪使劲。"
                        />
                      </div>
                    )}
                  />
                </FieldLine>
              </>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
              <button
                type="button"
                onClick={onBack}
                className="rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <span className="inline-flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  {isProfile ? "返回开场" : "回到上一步"}
                </span>
              </button>

              <button
                type="button"
                onClick={isProfile ? onNext : onSubmit}
                className="neon-button rounded-full border border-cyan-300/35 bg-cyan-300/12 px-6 py-3 text-sm text-cyan-50 transition hover:border-cyan-200/60 hover:bg-cyan-300/18"
              >
                <span className="inline-flex items-center gap-2">
                  {isProfile ? "继续校准" : "开始命运扫描"}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
