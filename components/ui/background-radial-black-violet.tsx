import React from "react"
import { cn } from "@/lib/utils"
import { CursorTrailCanvas } from "@/components/ui/cursor-trail-canvas"

export type BackgroundRadialVariant = "gray" | "emerald" | "amber" | "rose"

export interface BackgroundRadialProps {
  className?: string
  children?: React.ReactNode
  variant?: BackgroundRadialVariant
  enableCursorTrail?: boolean
  trailDuration?: number
  strokeWidth?: number
  containerRef?: React.RefObject<HTMLElement | null>
}

const VARIANTS: Record<
  BackgroundRadialVariant,
  {
    bg: string
    radial: string
    bloom: string
    spotlight: string
  }
> = {
  gray: {
    bg: "bg-[#09090b]",
    radial:
      "[background:radial-gradient(125%_125%_at_50%_0%,#000000_18%,#3f3f46_100%)]",
    bloom:
      "bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(228,228,231,0.36),rgba(113,113,122,0.22)_45%,transparent_75%)]",
    spotlight:
      "bg-[radial-gradient(circle_at_center,rgba(161,161,170,0.2),transparent_70%)]",
  },
  emerald: {
    bg: "bg-[#020d08]",
    radial:
      "[background:radial-gradient(125%_125%_at_50%_0%,#000000_15%,#047857_100%)]",
    bloom:
      "bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(52,211,153,0.5),rgba(16,185,129,0.32)_45%,transparent_75%)]",
    spotlight:
      "bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.24),transparent_70%)]",
  },
  amber: {
    bg: "bg-[#0c0702]",
    radial:
      "[background:radial-gradient(125%_125%_at_50%_0%,#000000_15%,#b45309_100%)]",
    bloom:
      "bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(251,191,36,0.5),rgba(217,119,6,0.32)_45%,transparent_75%)]",
    spotlight:
      "bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.24),transparent_70%)]",
  },
  rose: {
    bg: "bg-[#0d0205]",
    radial:
      "[background:radial-gradient(125%_125%_at_50%_0%,#000000_15%,#be123c_100%)]",
    bloom:
      "bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(251,113,133,0.5),rgba(225,29,72,0.32)_45%,transparent_75%)]",
    spotlight:
      "bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.24),transparent_70%)]",
  },
}

/**
 * Background Radial Glow (ibelick background-snippets - Dark Gray / Monochromatic)
 * Reference: Background Radial Dark Gray (https://bg.ibelick.com / 21st.dev)
 * Now enhanced with real-time cursor movement path tracing (vanishing white/silver lines).
 */
export function BackgroundRadialBlackViolet({
  className,
  children,
  variant = "gray",
  enableCursorTrail = true,
  trailDuration = 1600,
  strokeWidth = 2.5,
  containerRef,
}: BackgroundRadialProps) {
  const current = VARIANTS[variant] || VARIANTS.gray

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden transition-colors duration-500",
        current.bg,
        className
      )}
      aria-hidden="true"
    >
      {/* 1. Core ibelick Radial Black to Slate/Zinc Gray Gradient */}
      <div
        className={cn(
          "absolute inset-0 h-full w-full opacity-90 transition-all duration-500",
          current.radial
        )}
      />

      {/* 2. Top-Centered Radiant Titanium/Silver Atmospheric Bloom */}
      <div
        className={cn(
          "absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[650px] blur-2xl transition-all duration-500",
          current.bloom
        )}
      />

      {/* 3. Subtle Cybernetic Mesh Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_25%,#000_65%,transparent_100%)] opacity-55" />

      {/* 4. Ambient diffuse gray spotlight directly behind 3D capability cards */}
      <div
        className={cn(
          "absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[480px] blur-3xl transition-all duration-500",
          current.spotlight
        )}
      />

      {/* 5. Smooth bottom vignette to blend seamlessly into adjacent sections */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black via-black/80 to-transparent" />

      {/* 6. Real-time Cursor Path Drawing Canvas (White / Silver lines, vanishes in 1.6s) */}
      {enableCursorTrail && (
        <CursorTrailCanvas
          trailDuration={trailDuration}
          strokeWidth={strokeWidth}
          colorRgb="245, 245, 250"
          containerRef={containerRef}
        />
      )}

      {children}
    </div>
  )
}

export default BackgroundRadialBlackViolet
