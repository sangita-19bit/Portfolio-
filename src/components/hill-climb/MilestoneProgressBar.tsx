"use client"

import { MILESTONES } from "./config"

interface MilestoneProgressBarProps {
  progress: number // 0 to 100
  currentDistance: number
  totalDistance: number
  onMilestoneClick?: (distance: number) => void
  className?: string
}

export default function MilestoneProgressBar({
  progress,
  currentDistance,
  totalDistance,
  onMilestoneClick,
  className = "",
}: MilestoneProgressBarProps) {
  return (
    <div
      className={`relative w-full backdrop-blur-md bg-white/90 dark:bg-zinc-950/90 border border-black/10 dark:border-white/10 px-4 py-3 rounded-2xl shadow-lg select-none ${className}`}
    >
      {/* Top Header Label & Progress Percentage */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/5 dark:border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-zinc-800 dark:text-neutral-200 uppercase tracking-wider">
            Milestone Route
          </span>
        </div>
        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
          {Math.round(progress)}% Completed
        </span>
      </div>

      {/* Main Track Ribbon */}
      <div className="relative w-full h-3 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-visible shadow-inner my-3">
        {/* Fill Line */}
        <div
          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 transition-all duration-100 ease-out shadow-sm"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />

        {/* Milestone Ticks & Badges */}
        {MILESTONES.map((m) => {
          const tickPct = (m.distance / totalDistance) * 100
          const isPassed = currentDistance >= m.distance - 2

          return (
            <div
              key={m.id}
              onClick={() => onMilestoneClick?.(m.distance)}
              title={`${m.title} (${m.year})`}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer group"
              style={{ left: `${tickPct}%` }}
            >
              {/* Vertical Tick Pin */}
              <div
                className={`w-3 h-3 rounded-full border-2 transition-all duration-200 group-hover:scale-125 ${
                  isPassed
                    ? "bg-emerald-500 border-white shadow-[0_0_8px_rgba(16,185,129,0.7)]"
                    : "bg-white dark:bg-zinc-900 border-neutral-400 dark:border-neutral-600"
                }`}
              />

              {/* Year Label Below Track */}
              <span
                className={`absolute top-5 text-[10px] font-mono whitespace-nowrap transition-colors px-1.5 py-0.5 rounded ${
                  isPassed
                    ? "font-bold text-emerald-600 dark:text-emerald-300 bg-emerald-500/10"
                    : "text-zinc-500 dark:text-neutral-400 group-hover:text-zinc-900 dark:group-hover:text-white"
                }`}
              >
                {m.year}
              </span>
            </div>
          )
        })}

        {/* Dynamic Miniature Car Icon riding along track */}
        <div
          className="absolute -top-3.5 -translate-x-1/2 z-20 transition-all duration-100 ease-out pointer-events-none drop-shadow-md"
          style={{ left: `${Math.min(99, Math.max(1, progress))}%` }}
        >
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-zinc-900 border-2 border-emerald-400 shadow-md">
            {/* Low-poly miniature car SVG */}
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-emerald-400">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Spacing clearance so year labels do not overflow bottom container */}
      <div className="h-4" />
    </div>
  )
}
