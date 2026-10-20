"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue } from "framer-motion"

export interface CustomCursorProps {
  /** Size of the gaming cursor in pixels (default: 28 for slightly enlarged gaming feel) */
  size?: number
  /** Style variant: "classic" (faceted gaming pointer) or "stealth" (minimal delta arrow) */
  variant?: "classic" | "stealth"
}

export default function CustomCursor({
  size = 28,
  variant = "classic",
}: CustomCursorProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  // Direct mouse coordinates — 1:1 hardware tracking with 0ms latency (no tail, no spring lag)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  useEffect(() => {
    // Disable custom cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true)
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Detect hover over interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const isInteractive = target.closest(
        'a, button, [role="button"], input, textarea, select, .sh-theme, .sh-btn, .sh-txt, .sh-navcta, .sh-link, [data-interactive], .cursor-pointer, [class*="cursor-pointer"], .folder-front, .group'
      )
      setIsHovered(!!isInteractive)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mousemove", handleElementHover, { passive: true })
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousemove", handleElementHover)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [mouseX, mouseY, isVisible])

  if (isTouchDevice) return null

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[999999] will-change-transform"
      style={{
        x: mouseX,
        y: mouseY,
        // Active hotspot at (2, 2) inside the SVG maps exactly to (0, 0) of the cursor position
        left: -2,
        top: -2,
        width: size,
        height: size,
        opacity: isVisible ? 1 : 0,
      }}
      animate={{
        scale: isClicked ? 0.9 : isHovered ? 1.14 : 1,
      }}
      transition={{
        scale: { duration: 0.08, ease: "easeOut" },
        opacity: { duration: 0.15 },
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
      >
        <defs>
          <linearGradient id="cursor-facet-light" x1="2" y1="2" x2="17" y2="26" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>
          <linearGradient id="cursor-facet-dark" x1="2" y1="2" x2="17" y2="26" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
        </defs>

        {variant === "classic" ? (
          /* Delta Arrowhead / Dart Cursor matching user reference image */
          <g>
            {/* Main Dart Body (Black fill with crisp white stroke) */}
            <path
              d="M2 2 L23 14 L12 16 L5 23 Z"
              fill="#09090B"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* Subtle center spine for high-craft tactile definition */}
            <path
              d="M2 2 L12 16"
              stroke={isHovered ? "#34D399" : "rgba(255, 255, 255, 0.35)"}
              strokeWidth="0.75"
              strokeLinecap="round"
            />
          </g>
        ) : (
          /* Minimalist Delta Dart (Pure black with white contrast rim) */
          <g>
            <path
              d="M2 2 L23 14 L12 16 L5 23 Z"
              fill="#09090B"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </g>
        )}
      </svg>
    </motion.div>
  )
}
