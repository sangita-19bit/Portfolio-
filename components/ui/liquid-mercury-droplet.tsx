"use client"

import * as React from "react"

interface Droplet {
  x: number
  y: number
  vx: number
  vy: number
  baseR: number
  r: number
  phase: number
  orbitAngle: number
  orbitRadius: number
  orbitSpeed: number
  mass: number
}

export interface LiquidMercuryDropletProps {
  className?: string
  style?: React.CSSProperties
  theme?: "light" | "dark"
  atomCount?: number
  scatterForce?: number
  gravityStrength?: number
  waveSpeed?: number
  children?: React.ReactNode
}

const VS_SRC = `#version 300 es
layout(location = 0) in vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FS_SRC = `#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_droplets[24];
uniform int u_count;
uniform float u_isDark;

out vec4 fragColor;

float getPotential(vec2 p) {
  float sum = 0.0;
  for (int i = 0; i < 24; i++) {
    if (i >= u_count) break;
    vec2 d = p - u_droplets[i].xy;
    float r = u_droplets[i].z;
    float dist2 = dot(d, d);
    // Inverse square falloff for liquid potential
    sum += (r * r) / (dist2 + 1.0);
  }
  return sum;
}

void main() {
  vec2 p = gl_FragCoord.xy;
  float v = getPotential(p);
  float threshold = 1.0;
  
  // Antialiased liquid boundary
  float edge = fwidth(v) * 1.2;
  float alpha = smoothstep(threshold - edge, threshold + edge, v);

  // Soft drop shadow beneath the droplet
  float shadowThresh = 0.72;
  vec2 shadowOffset = vec2(0.0, -14.0);
  float shadowV = getPotential(p - shadowOffset);
  float shadowAlpha = smoothstep(shadowThresh - edge * 2.5, shadowThresh + edge * 2.5, shadowV) * 0.15;

  if (alpha < 0.005 && shadowAlpha < 0.005) {
    discard;
  }

  // Calculate surface normal from gradient of potential field
  float eps = 1.8;
  float dx = getPotential(p + vec2(eps, 0.0)) - getPotential(p - vec2(eps, 0.0));
  float dy = getPotential(p + vec2(0.0, eps)) - getPotential(p - vec2(0.0, eps));
  vec3 normal = normalize(vec3(-dx, -dy, 3.2 * eps * threshold));

  // Lighting vectors
  vec3 light1 = normalize(vec3(-0.45, 0.65, 0.8));
  vec3 light2 = normalize(vec3(0.55, -0.3, 0.6));
  vec3 view = vec3(0.0, 0.0, 1.0);

  // Specular glints (liquid chrome / mercury)
  vec3 half1 = normalize(light1 + view);
  float spec1 = pow(max(dot(normal, half1), 0.0), 48.0);

  vec3 half2 = normalize(light2 + view);
  float spec2 = pow(max(dot(normal, half2), 0.0), 24.0);

  // Fresnel rim sheen (surface tension reflections)
  float fresnel = pow(1.0 - max(dot(normal, view), 0.0), 2.8);

  // Liquid mercury gradient
  vec3 baseTone;
  if (u_isDark > 0.5) {
    baseTone = mix(vec3(0.20, 0.22, 0.25), vec3(0.08, 0.09, 0.11), 1.0 - normal.z);
  } else {
    // Light mode: gleaming platinum / chrome mercury
    baseTone = mix(vec3(0.88, 0.89, 0.91), vec3(0.55, 0.57, 0.60), 1.0 - normal.z);
  }

  // Combine highlights and iridescent metallic sheen
  vec3 col = baseTone;
  col += vec3(1.0, 1.0, 1.0) * spec1 * 1.4;
  col += vec3(0.85, 0.92, 1.0) * spec2 * 0.5;
  col += vec3(0.95, 0.98, 1.0) * fresnel * 0.9;

  // Subtle liquid dispersion on edges
  vec3 dispersion = 0.04 * cos(6.28318 * (normal.z * 1.8 + vec3(0.0, 0.33, 0.67) + u_time * 0.08));
  col += dispersion;

  if (alpha > 0.005) {
    fragColor = vec4(col * alpha, alpha);
  } else {
    // Drop shadow only
    vec3 shadowCol = u_isDark > 0.5 ? vec3(0.0) : vec3(0.1, 0.1, 0.12);
    fragColor = vec4(shadowCol * shadowAlpha, shadowAlpha);
  }
}
`

export default function LiquidMercuryDroplet({
  className = "",
  style,
  theme = "light",
  atomCount = 20,
  scatterForce = 1.0,
  gravityStrength = 1.0,
  waveSpeed = 1.0,
  children,
}: LiquidMercuryDropletProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    if (!gl) return

    // Compile shaders
    const vs = gl.createShader(gl.VERTEX_SHADER)!
    gl.shaderSource(vs, VS_SRC)
    gl.compileShader(vs)

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!
    gl.shaderSource(fs, FS_SRC)
    gl.compileShader(fs)

    const program = gl.createProgram()!
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)

    // Full-screen quad
    const quadVao = gl.createVertexArray()!
    gl.bindVertexArray(quadVao)
    const quadBuffer = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

    // Uniform locations
    const uRes = gl.getUniformLocation(program, "u_resolution")
    const uTime = gl.getUniformLocation(program, "u_time")
    const uCount = gl.getUniformLocation(program, "u_count")
    const uIsDark = gl.getUniformLocation(program, "u_isDark")
    const uDroplets = gl.getUniformLocation(program, "u_droplets")

    let width = 0
    let height = 0
    let dpr = 1
    let raf = 0
    let lastTime = performance.now()
    let time = 0

    const mouse = {
      x: -9999,
      y: -9999,
      prevX: -9999,
      prevY: -9999,
      vx: 0,
      vy: 0,
      active: false,
    }

    const count = Math.min(atomCount, 24)
    let droplets: Droplet[] = []

    const spawnDroplets = () => {
      droplets = []
      const cx = width / 2
      const cy = height / 2
      const minDim = Math.min(width, height)

      // 1. Central Nucleus (the heart of the water droplet)
      droplets.push({
        x: cx,
        y: cy,
        vx: 0,
        vy: 0,
        baseR: minDim * 0.16,
        r: minDim * 0.16,
        phase: 0,
        orbitAngle: 0,
        orbitRadius: 0,
        orbitSpeed: 0,
        mass: 3.5,
      })

      // 2. Intermediate liquid layers (forming the droplet's fluid body)
      const rings = [
        { count: 5, radiusRatio: 0.08, baseR: 0.10, speed: 0.6, mass: 1.8 },
        { count: 7, radiusRatio: 0.15, baseR: 0.08, speed: -0.45, mass: 1.2 },
        { count: count - 13, radiusRatio: 0.22, baseR: 0.06, speed: 0.35, mass: 0.8 },
      ]

      let ringIdx = 0
      for (const ring of rings) {
        for (let i = 0; i < ring.count; i++) {
          if (droplets.length >= count) break
          const angle = (i / ring.count) * Math.PI * 2 + ringIdx * 0.5
          const dist = minDim * ring.radiusRatio
          droplets.push({
            x: cx + Math.cos(angle) * dist,
            y: cy + Math.sin(angle) * dist,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            baseR: minDim * ring.baseR,
            r: minDim * ring.baseR,
            phase: Math.random() * Math.PI * 2,
            orbitAngle: angle,
            orbitRadius: dist,
            orbitSpeed: ring.speed * (0.8 + Math.random() * 0.4),
            mass: ring.mass,
          })
        }
        ringIdx++
      }
    }

    const resize = () => {
      const rect = container.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      gl.viewport(0, 0, canvas.width, canvas.height)
      spawnDroplets()
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      if (mouse.prevX > -9000) {
        mouse.vx = mx - mouse.prevX
        mouse.vy = my - mouse.prevY
      }
      mouse.prevX = mouse.x = mx
      mouse.prevY = mouse.y = my
      mouse.active = true
    }

    const onPointerLeave = () => {
      mouse.active = false
      mouse.x = -9999
      mouse.y = -9999
      mouse.prevX = -9999
      mouse.prevY = -9999
      mouse.vx = 0
      mouse.vy = 0
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)
    container.addEventListener("pointermove", onPointerMove, { passive: true })
    container.addEventListener("pointerleave", onPointerLeave, { passive: true })

    // Uniform buffer for 24 droplets [x, y, r,  x, y, r, ...]
    const dropletData = new Float32Array(24 * 3)

    const tick = (now: number) => {
      const rawDt = (now - lastTime) / 1000
      lastTime = now
      const dt = Math.min(rawDt, 0.05)
      time += dt * waveSpeed

      const cx = width / 2
      const cy = height / 2
      const mouseSpeed = Math.hypot(mouse.vx, mouse.vy)
      mouse.vx *= 0.88
      mouse.vy *= 0.88

      // Physics loop: Central Gravity + Cohesion + Cursor Scattering + Idle Waves
      for (let i = 0; i < droplets.length; i++) {
        const d = droplets[i]

        // 1. Center of Gravity attraction (Zero-g nucleus cohesion)
        const toCenterX = cx - d.x
        const toCenterY = cy - d.y
        const distToCenter = Math.hypot(toCenterX, toCenterY) || 1

        // Cohesion force pulls atoms inward towards the central gravity
        const gravity = distToCenter * 0.0035 * gravityStrength
        d.vx += (toCenterX / distToCenter) * gravity
        d.vy += (toCenterY / distToCenter) * gravity

        // 2. Continuous waving animation (fluid surface tension loop)
        d.orbitAngle += d.orbitSpeed * dt * 0.7
        const waveOffset = Math.sin(time * 1.8 + d.phase) * (d.baseR * 0.22)
        const waveForceX = Math.cos(d.orbitAngle) * (waveOffset * 0.08)
        const waveForceY = Math.sin(d.orbitAngle) * (waveOffset * 0.08)
        d.vx += waveForceX
        d.vy += waveForceY

        // Dynamic pulsing radius creating the breathing liquid droplet contour
        d.r = d.baseR * (1.0 + 0.12 * Math.sin(time * 1.4 + d.phase))

        // 3. Mouse External Force (Splitting & Scattering atoms on impact)
        if (mouse.active) {
          const dx = d.x - mouse.x
          const dy = d.y - mouse.y
          const dist = Math.hypot(dx, dy)
          const scatterRadius = d.baseR * 2.8 + 80

          if (dist < scatterRadius && dist > 1) {
            // Impulse increases with cursor velocity and proximity
            const forceRatio = 1.0 - dist / scatterRadius
            const impulse = forceRatio * (mouseSpeed * 0.6 + 6.0) * scatterForce
            d.vx += (dx / dist) * (impulse / d.mass)
            d.vy += (dy / dist) * (impulse / d.mass)
          }
        }

        // 4. Viscous fluid damping (recombination deceleration)
        d.vx *= 0.935
        d.vy *= 0.935

        // Integrate position
        d.x += d.vx
        d.y += d.vy

        // Keep inside bounds with elastic bounce
        const pad = d.r * 0.5
        if (d.x < pad) { d.x = pad; d.vx *= -0.5 }
        if (d.x > width - pad) { d.x = width - pad; d.vx *= -0.5 }
        if (d.y < pad) { d.y = pad; d.vy *= -0.5 }
        if (d.y > height - pad) { d.y = height - pad; d.vy *= -0.5 }

        // Pack into shader uniforms (flip Y for WebGL screen coordinates)
        dropletData[i * 3 + 0] = d.x * dpr
        dropletData[i * 3 + 1] = (height - d.y) * dpr
        dropletData[i * 3 + 2] = d.r * dpr
      }

      // Render shader pass
      gl.useProgram(program)
      gl.bindVertexArray(quadVao)

      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, time)
      gl.uniform1i(uCount, droplets.length)
      gl.uniform1f(uIsDark, theme === "dark" ? 1.0 : 0.0)
      gl.uniform3fv(uDroplets, dropletData)

      gl.enable(gl.BLEND)
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      gl.disable(gl.BLEND)

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      container.removeEventListener("pointermove", onPointerMove)
      container.removeEventListener("pointerleave", onPointerLeave)
      gl.deleteBuffer(quadBuffer)
      gl.deleteVertexArray(quadVao)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteProgram(program)
    }
  }, [theme, atomCount, scatterForce, gravityStrength, waveSpeed])

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-screen overflow-hidden select-none ${className}`}
      style={style}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full pointer-events-none"
      />
      {children && (
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      )}
    </div>
  )
}
