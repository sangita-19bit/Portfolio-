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
        'a, button, [role="button"], input, textarea, select, .sh-theme, .sh-btn, .sh-txt, .sh-navcta, .sh-link, [data-interactive]'
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
          /* Classic Gaming Platform Faceted Pointer Arrow (Steam / Riot / Blizzard style) */
          <g>
            {/* Left Facet (Bright Highlight) */}
            <path
              d="M2 2 L2 24 L8 19 L13 28 L14.5 27.2 L9.5 17.8 L2 2 Z"
              fill="url(#cursor-facet-light)"
            />
            {/* Right Facet (Shaded Metallic with subtle hover tint) */}
            <path
              d="M2 2 L9.5 17.8 L14.5 27.2 L17 26 L12 17 L19 17 L2 2 Z"
              fill={isHovered ? "#93C5FD" : "url(#cursor-facet-dark)"}
            />
            {/* Sharp Outer Gaming Stroke (High Contrast for both light & dark themes) */}
            <path
              d="M2 2 L2 24 L8 19 L13 28 L17 26 L12 17 L19 17 L2 2 Z"
              stroke="#09090B"
              strokeWidth="1.5"
              strokeLinejoin="miter"
              strokeLinecap="round"
            />
            {/* Precision Center Spine Line */}
            <path
              d="M2 2 L9.5 17.8 L14.5 27.2"
              stroke={isHovered ? "#2563EB" : "#94A3B8"}
              strokeWidth="0.8"
            />
          </g>
        ) : (
          /* Modern Stealth Delta Arrow Variant (Minimalist Cyberpunk / Valorant style) */
          <g>
            {/* Left Wing Facet */}
            <path
              d="M2 2 L6 26 L13 19 Z"
              fill="url(#cursor-facet-light)"
            />
            {/* Right Wing Facet */}
            <path
              d="M2 2 L13 19 L25 15 Z"
              fill={isHovered ? "#93C5FD" : "url(#cursor-facet-dark)"}
            />
            {/* Outer Stroke */}
            <path
              d="M2 2 L6 26 L13 19 L25 15 Z"
              stroke="#09090B"
              strokeWidth="1.5"
              strokeLinejoin="miter"
              strokeLinecap="round"
            />
            {/* Spine */}
            <path
              d="M2 2 L13 19"
              stroke={isHovered ? "#2563EB" : "#94A3B8"}
              strokeWidth="0.8"
            />
          </g>
        )}
      </svg>
    </motion.div>
  )
}
