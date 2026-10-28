"use client"

import { memo, useEffect, useRef } from "react"

interface SpeedometerGaugeProps {
  speed: number // in km/h
  maxDisplaySpeed?: number
  className?: string
}

function SpeedometerGaugeComponent({
  speed,
  maxDisplaySpeed = 100,
  className = "",
}: SpeedometerGaugeProps) {
  const needleRef = useRef<SVGGElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)

  // Spring-damper physics variables for silky needle and digital motion
  const currentAngle = useRef<number>(-120)
  const angleVelocity = useRef<number>(0)
  const currentDisplaySpeed = useRef<number>(0)
  const speedVelocity = useRef<number>(0)
  const targetSpeed = useRef<number>(0)

  targetSpeed.current = Math.min(maxDisplaySpeed, Math.max(0, speed))

  useEffect(() => {
    let animId: number
    let lastTime = performance.now()

    const updateSpring = (time: number) => {
      const dt = Math.min(0.05, (time - lastTime) / 1000)
      lastTime = time

      // 1. Target Angle: -120deg (0 km/h) to +120deg (max km/h)
      const targetRatio = targetSpeed.current / maxDisplaySpeed
      const targetA = -120 + targetRatio * 240

      // Critically damped spring simulation (k = 65, damping = 15)
      const springK = 65
      const damping = 15
      const angleForce = (targetA - currentAngle.current) * springK
      angleVelocity.current += (angleForce - angleVelocity.current * damping) * dt
      currentAngle.current += angleVelocity.current * dt

      if (needleRef.current) {
        needleRef.current.style.transform = `rotate(${currentAngle.current}deg)`
      }

      // 2. Smooth Numerical Readout Spring
      const speedForce = (targetSpeed.current - currentDisplaySpeed.current) * 55
      speedVelocity.current += (speedForce - speedVelocity.current * 14) * dt
      currentDisplaySpeed.current += speedVelocity.current * dt

      if (numberRef.current) {
        numberRef.current.textContent = String(Math.round(Math.max(0, currentDisplaySpeed.current)))
      }

      animId = requestAnimationFrame(updateSpring)
    }

    animId = requestAnimationFrame(updateSpring)
    return () => cancelAnimationFrame(animId)
  }, [maxDisplaySpeed])

  // SVG parameters
  const cx = 50
  const cy = 50
  const r = 40
  const circumference = 2 * Math.PI * r
  const arcLength = circumference * (240 / 360) // 240 degree sweep

  return (
    <div
      className={`relative flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full backdrop-blur-md bg-black/25 dark:bg-black/50 border border-white/20 select-none shadow-xl ${className}`}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full p-1 overflow-visible">
        {/* Thin Background Arc */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(255, 255, 255, 0.22)"
          strokeWidth="2.5"
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
          className="-rotate-210 origin-center"
        />

        {/* Fine Tick Marks */}
        {Array.from({ length: 9 }).map((_, i) => {
          const angle = -120 + (i / 8) * 240
          const rad = (angle - 90) * (Math.PI / 180)
          const isMajor = i % 2 === 0
          const innerR = isMajor ? r - 4 : r - 2
          const x1 = cx + (r - 0.5) * Math.cos(rad)
          const y1 = cy + (r - 0.5) * Math.sin(rad)
          const x2 = cx + innerR * Math.cos(rad)
          const y2 = cy + innerR * Math.sin(rad)

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth={isMajor ? 1.5 : 0.8}
            />
          )
        })}

        {/* Slim Needle with Small Center Hub */}
        <g
          ref={needleRef}
          style={{
            transformOrigin: "50px 50px",
            transform: "rotate(-120deg)",
            willChange: "transform",
          }}
        >
          {/* Needle Line */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="16"
            stroke="#10b981"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Subtle Tip Accent */}
          <circle cx="50" cy="17" r="1.5" fill="#34d399" />
          {/* Pivot Hub */}
          <circle cx="50" cy="50" r="3.2" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
        </g>
      </svg>

      {/* Center Digital Speed Readout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-5 pointer-events-none">
        <span
          ref={numberRef}
          className="font-mono text-lg sm:text-xl font-black text-white tracking-tighter leading-none drop-shadow-sm"
        >
          0
        </span>
        <span className="text-[8px] font-mono font-bold tracking-widest text-emerald-400 mt-0.5 uppercase">
          KM/H
        </span>
      </div>
    </div>
  )
}

export default memo(SpeedometerGaugeComponent)
