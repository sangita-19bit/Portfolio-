"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MILESTONES } from "./milestones"
import { ROAD_CONFIG } from "./config"
import { getRoadHeight } from "./terrain"
import { Milestone } from "./types"

interface ElevationTrackProps {
  currentDistance: number
  onMilestoneClick: (milestone: Milestone) => void
  className?: string
}

export default function ElevationTrack({
  currentDistance,
  onMilestoneClick,
  className = "",
}: ElevationTrackProps) {
  const [hoveredMilestone, setHoveredMilestone] = useState<Milestone | null>(null)

  const totalLength = ROAD_CONFIG.length

  // Pre-calculate sampled SVG elevation path across the full 800m road
  const { pathD, minY, maxY } = useMemo(() => {
    const samples = 90
    const samplePoints: { x: number; y: number; svgX: number; svgY: number }[] = []
    let minH = Infinity
    let maxH = -Infinity

    for (let i = 0; i <= samples; i++) {
      const wx = (i / samples) * totalLength
      const wy = getRoadHeight(wx)
      if (wy < minH) minH = wy
      if (wy > maxH) maxH = wy
      samplePoints.push({ x: wx, y: wy, svgX: 0, svgY: 0 })
    }

    const range = Math.max(1, maxH - minH)
    const svgWidth = 360
    const svgHeight = 44
    const paddingX = 14
    const paddingY = 8

    let d = ""
    samplePoints.forEach((pt, i) => {
      pt.svgX = paddingX + (pt.x / totalLength) * (svgWidth - paddingX * 2)
      pt.svgY = svgHeight - paddingY - ((pt.y - minH) / range) * (svgHeight - paddingY * 2)
      d += i === 0 ? `M ${pt.svgX.toFixed(1)} ${pt.svgY.toFixed(1)}` : ` L ${pt.svgX.toFixed(1)} ${pt.svgY.toFixed(1)}`
    })

    return { pathD: d, minY: minH, maxY: maxH }
  }, [totalLength])

  // Current car indicator position on the SVG contour
  const carY = getRoadHeight(currentDistance)
  const range = Math.max(1, maxY - minY)
  const carSvgX = 14 + (Math.max(0, Math.min(totalLength, currentDistance)) / totalLength) * (360 - 28)
  const carSvgY = 44 - 8 - ((carY - minY) / range) * (44 - 16)

  // Determine current or upcoming milestone
  const activeMilestone = useMemo(() => {
    const upcoming = MILESTONES.find((m) => m.distance >= currentDistance - 15)
    return upcoming || MILESTONES[MILESTONES.length - 1]
  }, [currentDistance])

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* Editorial Single Milestone Title (Display Font, Cross-fades cleanly) */}
      <div className="h-6 flex items-center justify-center overflow-hidden mb-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMilestone.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="flex items-center gap-2 text-xs text-neutral-800 dark:text-neutral-200"
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: activeMilestone.color || "#10b981" }}
            />
            <span className="font-serif italic text-neutral-500 dark:text-neutral-400">
              {activeMilestone.year}
            </span>
            <span className="text-neutral-400">·</span>
            <span className="font-serif font-light text-zinc-900 dark:text-white tracking-tight">
              {activeMilestone.title}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Elevation Profile Track (Thin 2px line, minimal transparent container) */}
      <div className="relative w-72 sm:w-88 md:w-96 px-2 py-1">
        <svg viewBox="0 0 360 48" className="w-full h-11 overflow-visible">
          {/* Subtle terrain fill gradient */}
          <path
            d={`${pathD} L 346 48 L 14 48 Z`}
            fill="url(#elevation-fill)"
            opacity="0.12"
          />

          {/* Thin elevation contour line */}
          <path
            d={pathD}
            fill="none"
            stroke="rgba(0, 0, 0, 0.35)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="dark:stroke-white/30"
          />

          {/* Milestone Flag Pins positioned directly on the elevation contour */}
          {MILESTONES.map((m) => {
            const mH = getRoadHeight(m.distance)
            const mSvgX = 14 + (m.distance / totalLength) * (360 - 28)
            const mSvgY = 44 - 8 - ((mH - minY) / range) * (44 - 16)
            const isCurrent = activeMilestone.id === m.id
            const isPassed = currentDistance >= m.distance - 2

            return (
              <g
                key={m.id}
                onClick={() => onMilestoneClick(m)}
                onMouseEnter={() => setHoveredMilestone(m)}
                onMouseLeave={() => setHoveredMilestone(null)}
                className="cursor-pointer group"
              >
                {/* Vertical Flag Mast */}
                <line
                  x1={mSvgX}
                  y1={mSvgY}
                  x2={mSvgX}
                  y2={mSvgY - (isCurrent ? 12 : 8)}
                  stroke={isPassed ? "#10b981" : "rgba(0,0,0,0.4)"}
                  strokeWidth="1.2"
                  className="transition-all duration-200"
                />

                {/* Flag Head Dot */}
                <circle
                  cx={mSvgX}
                  cy={mSvgY - (isCurrent ? 12 : 8)}
                  r={isCurrent ? 3.5 : 2.5}
                  fill={isPassed ? "#10b981" : "#ffffff"}
                  stroke={m.color || "#10b981"}
                  strokeWidth="1.5"
                  className="transition-transform group-hover:scale-130"
                />

                {/* Ground Contact Pin */}
                <circle
                  cx={mSvgX}
                  cy={mSvgY}
                  r="1.2"
                  fill="rgba(0,0,0,0.5)"
                />
              </g>
            )
          })}

          {/* Real Car Position Indicator (Pulsing Arrow / Dot on Contour) */}
          <g transform={`translate(${carSvgX}, ${carSvgY})`}>
            {/* Soft Ripple */}
            <circle
              r="6.5"
              fill="#10b981"
              opacity="0.25"
              className="animate-ping"
            />
            {/* Core Car Pin */}
            <circle
              r="3.2"
              fill="#10b981"
              stroke="#ffffff"
              strokeWidth="1.4"
              className="shadow-sm drop-shadow"
            />
          </g>

          <defs>
            <linearGradient id="elevation-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Hover Tooltip for Flag Pins */}
        <AnimatePresence>
          {hoveredMilestone && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="absolute -top-7 left-1/2 -translate-x-1/2 pointer-events-none px-2.5 py-1 rounded-md bg-zinc-900/90 text-white text-[10px] font-mono whitespace-nowrap shadow-md z-30"
            >
              <span>{hoveredMilestone.year} · {hoveredMilestone.title}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
