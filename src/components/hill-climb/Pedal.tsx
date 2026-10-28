"use client"

import { useCallback, type PointerEvent } from "react"
import { motion } from "framer-motion"

interface PedalProps {
  type: "gas" | "brake"
  isPressed: boolean
  onPressStart: () => void
  onPressEnd: () => void
  className?: string
}

export default function Pedal({
  type,
  isPressed,
  onPressStart,
  onPressEnd,
  className = "",
}: PedalProps) {
  const isGas = type === "gas"

  const handlePointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      e.preventDefault()
      try {
        e.currentTarget.setPointerCapture(e.pointerId)
      } catch {
        // Fallback if setPointerCapture is unsupported
      }

      // Safe haptic feedback check for mobile devices
      if (typeof window !== "undefined" && "vibrate" in navigator) {
        try {
          navigator.vibrate?.(12)
        } catch {
          // Ignore vibration permission denials
        }
      }

      onPressStart()
    },
    [onPressStart]
  )

  const handlePointerUp = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      e.preventDefault()
      try {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId)
        }
      } catch {
        // Safe release fallback
      }
      onPressEnd()
    },
    [onPressEnd]
  )

  const handlePointerCancel = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      e.preventDefault()
      onPressEnd()
    },
    [onPressEnd]
  )

  return (
    <div
      className={`relative select-none touch-none cursor-pointer flex flex-col items-center justify-end ${className}`}
      style={{ touchAction: "none" }}
    >
      {/* 3D Floor Hinge / Pivot Base Plate */}
      <div className="absolute -bottom-2 w-full h-3 rounded-full bg-neutral-900/40 border border-neutral-700/50 blur-[1px]" />

      {/* Interactive Pedal Target (Min 88px touch footprint) */}
      <motion.div
        role="button"
        tabIndex={0}
        aria-label={isGas ? "Accelerate Gas Pedal" : "Brake & Reverse Pedal"}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        animate={
          isPressed
            ? {
                rotateX: 34,
                y: 12,
                scale: 0.94,
                boxShadow: "0 4px 10px rgba(0,0,0,0.35)",
              }
            : {
                rotateX: 14,
                y: 0,
                scale: 1,
                boxShadow: isGas
                  ? "0 14px 28px rgba(16,185,129,0.25), 0 6px 10px rgba(0,0,0,0.2)"
                  : "0 14px 28px rgba(239,68,68,0.25), 0 6px 10px rgba(0,0,0,0.2)",
              }
        }
        transition={{
          type: "spring",
          stiffness: 550,
          damping: 24,
          mass: 0.8,
        }}
        style={{
          transformOrigin: "bottom center",
          transformStyle: "preserve-3d",
        }}
        className={`relative flex flex-col items-center justify-between rounded-2xl border-2 transition-colors select-none ${
          isGas
            ? "w-20 h-32 sm:w-24 sm:h-38 md:w-26 md:h-40 bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 border-emerald-500/60"
            : "w-18 h-26 sm:w-22 sm:h-30 md:w-24 md:h-32 bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 border-rose-500/60"
        }`}
      >
        {/* Pedal Bezel & Metallic Screws */}
        <div className="w-full flex justify-between px-2 pt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 border border-neutral-600" />
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 border border-neutral-600" />
        </div>

        {/* Ribbed Anti-Slip Rubber Grip Pattern */}
        <div className="w-4/5 flex flex-col gap-1.5 my-auto">
          {Array.from({ length: isGas ? 6 : 4 }).map((_, i) => (
            <div
              key={i}
              className={`w-full h-1.5 sm:h-2 rounded-full border shadow-inner ${
                isGas
                  ? isPressed
                    ? "bg-emerald-400 border-emerald-300 shadow-emerald-500/50"
                    : "bg-neutral-800 border-neutral-700/80 group-hover:bg-emerald-950/40"
                  : isPressed
                  ? "bg-rose-400 border-rose-300 shadow-rose-500/50"
                  : "bg-neutral-800 border-neutral-700/80 group-hover:bg-rose-950/40"
              }`}
            />
          ))}
        </div>

        {/* Embossed Label */}
        <div className="pb-2.5 flex flex-col items-center">
          <span
            className={`font-mono font-black text-xs sm:text-sm tracking-widest ${
              isGas
                ? isPressed
                  ? "text-emerald-300"
                  : "text-emerald-400"
                : isPressed
                ? "text-rose-300"
                : "text-rose-400"
            }`}
          >
            {isGas ? "GAS" : "BRAKE"}
          </span>
          <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-tighter">
            {isGas ? "D / →" : "A / ←"}
          </span>
        </div>
      </motion.div>
    </div>
  )
}
