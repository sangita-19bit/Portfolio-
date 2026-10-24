import React, { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface Point {
  x: number
  y: number
  time: number
  isNewStroke?: boolean
}

export interface CursorTrailCanvasProps {
  className?: string
  /** Duration in milliseconds for the line to gradually vanish (default 1600ms = 1.6s) */
  trailDuration?: number
  /** Maximum stroke width in pixels */
  strokeWidth?: number
  /** Color of the line trail in RGB (default bright silver-white 240, 240, 245) */
  colorRgb?: string
  /** Target element to track cursor on (if null, tracks parent container) */
  containerRef?: React.RefObject<HTMLElement | null>
}

export function CursorTrailCanvas({
  className,
  trailDuration = 1600,
  strokeWidth = 2.5,
  colorRgb = "245, 245, 250",
  containerRef,
}: CursorTrailCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointsRef = useRef<Point[]>([])
  const animFrameRef = useRef<number | null>(null)
  const isInsideRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Target container is either explicitly passed or canvas's parent element
    const container = containerRef?.current || canvas.parentElement
    if (!container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = 0
    let height = 0

    // Handle high-DPI crisp rendering
    const updateSize = () => {
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    updateSize()

    const resizeObserver = new ResizeObserver(() => {
      updateSize()
    })
    resizeObserver.observe(container)

    // Pointer event listeners
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Check if this is the start of a new stroke (e.g., after leaving or entering)
      const isNew = !isInsideRef.current
      isInsideRef.current = true

      pointsRef.current.push({
        x,
        y,
        time: performance.now(),
        isNewStroke: isNew,
      })
    }

    const handlePointerEnter = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      isInsideRef.current = true
      pointsRef.current.push({
        x,
        y,
        time: performance.now(),
        isNewStroke: true,
      })
    }

    const handlePointerLeave = () => {
      isInsideRef.current = false
    }

    container.addEventListener("pointermove", handlePointerMove)
    container.addEventListener("pointerenter", handlePointerEnter)
    container.addEventListener("pointerleave", handlePointerLeave)

    // Render loop
    const render = (now: number) => {
      // 1. Filter out expired points older than trailDuration
      const cutoff = now - trailDuration
      pointsRef.current = pointsRef.current.filter((p) => p.time > cutoff)

      // 2. Clear canvas
      ctx.clearRect(0, 0, width, height)

      const points = pointsRef.current

      if (points.length > 1) {
        ctx.lineCap = "round"
        ctx.lineJoin = "round"

        // Draw each segment with time-decayed opacity and width
        for (let i = 1; i < points.length; i++) {
          const p1 = points[i - 1]
          const p2 = points[i]

          // Don't connect disjoint strokes
          if (p2.isNewStroke) continue

          const age = (now - p2.time) / trailDuration
          if (age >= 1) continue

          // Easing for smooth gradual vanishing (fade curve)
          const remainingLife = 1 - age
          const opacity = Math.pow(remainingLife, 1.2) * 0.85
          const currentWidth = strokeWidth * (0.3 + 0.7 * remainingLife)

          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)

          ctx.strokeStyle = `rgba(${colorRgb}, ${opacity.toFixed(3)})`
          ctx.lineWidth = currentWidth

          // Subtle glowing halo on fresher segments
          if (remainingLife > 0.4) {
            ctx.shadowBlur = 6
            ctx.shadowColor = `rgba(255, 255, 255, ${(remainingLife * 0.4).toFixed(3)})`
          } else {
            ctx.shadowBlur = 0
          }

          ctx.stroke()
        }
      }

      animFrameRef.current = requestAnimationFrame(render)
    }

    animFrameRef.current = requestAnimationFrame(render)

    return () => {
      container.removeEventListener("pointermove", handlePointerMove)
      container.removeEventListener("pointerenter", handlePointerEnter)
      container.removeEventListener("pointerleave", handlePointerLeave)
      resizeObserver.disconnect()
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [trailDuration, strokeWidth, colorRgb, containerRef])

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 z-[1]", className)}
      aria-hidden="true"
    />
  )
}

export default CursorTrailCanvas
