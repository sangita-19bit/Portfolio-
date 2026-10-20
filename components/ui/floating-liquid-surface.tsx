"use client"

import { useEffect, useRef } from "react"

export interface FloatingLiquidSurfaceProps {
  className?: string
  style?: React.CSSProperties
  /** Base scale of the floating membrane (default: 0.8) */
  scale?: number
  /** Animation speed multiplier (default: 1.0) */
  speed?: number
  /** Iridescent dispersion intensity (default: 0.85) */
  iridescence?: number
  /** Fluid wave turbulence on edges (default: 0.8) */
  fluidity?: number
}

const VS = `#version 300 es
layout(location = 0) in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

const FS = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform vec2 uResolution;
uniform float uTime;
uniform float uScale;
uniform float uIridescence;
uniform float uFluidity;

#define PI 3.14159265358979323846
#define TWO_PI 6.28318530717958647692
#define LOOP_PERIOD 10.0

// Simplex-style 2D noise for organic micro-ripples
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// 2D Rotation matrix
mat2 rot(float a) {
  float c = cos(a), s = sin(a);
  return mat2(c, -s, s, c);
}

// Periodic harmonic phase helper for seamless loop
// Guarantees exact C-infinity continuity over LOOP_PERIOD
vec2 periodicVec(float t, float period, float speed) {
  float phase = (mod(t, period) / period) * TWO_PI * speed;
  return vec2(cos(phase), sin(phase));
}

// Iridescent color ribbon transfer (thin-film metal interference)
float getStripeColor(float c1, float c2, float p, float blur, float bump) {
  float ch = mix(c2, c1, smoothstep(0.0, 2.0 * blur, p));
  float b1 = 0.14 * (1.0 - 0.35 * bump);
  ch = mix(ch, c2, smoothstep(b1, b1 + 2.0 * blur, p));

  float b2 = b1 + 0.08 * (1.0 + 0.4 * bump);
  ch = mix(ch, c1, smoothstep(b2, b2 + 2.0 * blur, p));

  float b3 = b2 + 0.12 * (1.0 - bump * 0.2);
  ch = mix(ch, c2, smoothstep(b3, b3 + 2.0 * blur, p));

  float gradT = clamp((p - b3) / max(0.001, (1.0 - b3)), 0.0, 1.0);
  float grad = mix(c1, c2, smoothstep(0.0, 1.0, gradT));
  ch = mix(ch, grad, smoothstep(b3, b3 + 0.5 * blur, p));
  return ch;
}

void main() {
  // Correct aspect ratio and center coordinates
  float aspect = uResolution.x / uResolution.y;
  vec2 uv = vUv;
  vec2 p = uv - 0.5;
  if (aspect > 1.0) {
    p.x *= aspect;
  } else {
    p.y /= aspect;
  }

  // Time normalized to 10-second seamless loop
  float t = uTime;
  float tau = (mod(t, LOOP_PERIOD) / LOOP_PERIOD) * TWO_PI;

  // Exact harmonic sinusoidal phase bases
  float sin1 = sin(tau);
  float cos1 = cos(tau);
  float sin2 = sin(2.0 * tau);
  float cos2 = cos(2.0 * tau);
  float sin3 = sin(3.0 * tau);
  float cos3 = cos(3.0 * tau);

  // Polar coordinates from anchored center
  float r = length(p);
  float theta = atan(p.y, p.x);

  // 1. Organic, Liquid Boundary Construction
  // Amorphous zero-gravity silhouette with asymmetric, independent flows
  float baseRadius = 0.28 * uScale;

  // Asymmetric elongation and viscous stretching (Modes 2 & 3)
  float mode2 = 0.055 * sin(2.0 * theta + sin1 * 1.1) + 0.035 * cos(2.0 * theta - cos1 * 0.8);
  float mode3 = 0.042 * cos(3.0 * theta + cos2 * 0.9) - 0.030 * sin(3.0 * theta + sin2 * 0.7);
  
  // Quadrantal independent bulges (Mode 4 & 5)
  float mode4 = 0.024 * sin(4.0 * theta - sin1 * 1.4 + cos3 * 0.5);
  float mode5 = 0.016 * cos(5.0 * theta + tau);

  // Multidirectional periodic surface noise flow
  vec2 noiseOffset1 = vec2(cos1, sin1) * 0.8;
  vec2 noiseOffset2 = vec2(sin2, cos2) * 0.5;
  float n1 = snoise(p * 4.2 + noiseOffset1);
  float n2 = snoise(p * 8.5 + noiseOffset2) * 0.5;
  float liquidWave = (n1 + n2) * 0.055 * uFluidity;

  // Asymmetric breathing offset
  float asymFlow = 0.028 * sin(theta + cos1) * sin2 + 0.022 * cos(theta - sin1) * cos2;

  // Continuous deforming liquid boundary
  float targetRadius = baseRadius + mode2 + mode3 + mode4 + mode5 + liquidWave + asymFlow;
  
  // Signed distance to the deforming perimeter
  float dist = r - targetRadius;

  // Normalized distance from center (0 at center, 1 at edge)
  float normDist = clamp(r / max(0.001, targetRadius), 0.0, 1.0);

  // Viscous fluid meniscus dome height (anchored center, flowing edges)
  float bump = pow(1.0 - normDist, 1.25);

  // Soft anti-aliased organic silhouette edge
  float edgeSoftness = 0.012;
  float edgeAlpha = 1.0 - smoothstep(-edgeSoftness, edgeSoftness * 1.5, dist);

  // Discard outside pixels for clean alpha blending
  if (edgeAlpha < 0.001) {
    fragColor = vec4(0.0);
    return;
  }

  // 2. Reflective Highlights & Iridescent Liquid Metal Surface
  // Diagonal lighting axis (top-left to bottom-right)
  vec2 rotatedP = rot(-0.35) * p;
  float diagBLtoTR = rotatedP.x - rotatedP.y;
  float diagTLtoBR = rotatedP.x + rotatedP.y;

  // Glossy metallic base colors (silver platinum highlights to deep graphite)
  vec3 color1 = vec3(0.99, 0.99, 1.0); // Specular silver-white
  vec3 color2 = vec3(0.08, 0.08, 0.09 + 0.08 * smoothstep(-0.3, 0.3, diagTLtoBR)); // Graphite

  // Surface normal distortion following the dynamic liquid flow
  vec2 flowUV = p;
  flowUV += vec2(n1, n2) * 0.04 * uFluidity;
  float flowDir = (flowUV.x - flowUV.y) * 1.4;

  // Layered wave interference
  flowDir += 0.35 * diagBLtoTR * bump;
  flowDir += (1.0 - bump) * 0.45 * sin(flowDir * 6.0 - tau);
  flowDir -= (tau / TWO_PI) * 2.0; // Continuous seamless looping motion

  // 3. Thin-Film Iridescent Rainbow Dispersion
  // Multi-colored contour bands flowing along the fluid surface
  float dispersionFactor = (1.0 - bump * 0.75) * uIridescence;
  float dispRed = dispersionFactor * 0.18 + 0.02 * sin(flowDir * 4.0 + sin1);
  float dispBlue = -dispersionFactor * 0.18 - 0.02 * cos(flowDir * 4.0 + cos1);

  float blur = 0.04 + 0.06 * (1.0 - bump);

  float stripeR = fract(flowDir + dispRed);
  float stripeG = fract(flowDir);
  float stripeB = fract(flowDir + dispBlue);

  float rCol = getStripeColor(color1.r, color2.r, stripeR, blur, bump);
  float gCol = getStripeColor(color1.g, color2.g, stripeG, blur, bump);
  float bCol = getStripeColor(color1.b, color2.b, stripeB, blur, bump);

  vec3 liquidColor = vec3(rCol, gCol, bCol);

  // Iridescent chromatic fringe boost along perimeter ripples
  float fringe = smoothstep(0.7, 0.98, normDist) * uIridescence;
  vec3 rainbow = 0.5 + 0.5 * cos(TWO_PI * (stripeG * 1.2 + vec3(0.0, 0.33, 0.67) + tau * 0.1));
  liquidColor = mix(liquidColor, liquidColor * rainbow * 1.35, fringe * 0.55);

  // Specular sheen along the fluid crests
  float sheen = pow(clamp(1.0 - abs(diagBLtoTR * 2.2), 0.0, 1.0), 3.5) * bump;
  liquidColor += vec3(sheen * 0.35);

  // Soft subtle ambient shadow beneath the floating liquid membrane
  float shadowDist = length(p + vec2(-0.015, 0.025)) - targetRadius;
  float shadowAlpha = (1.0 - smoothstep(-0.04, 0.08, shadowDist)) * 0.18;

  // Output with premultiplied alpha
  float finalAlpha = edgeAlpha;
  fragColor = vec4(liquidColor * finalAlpha, finalAlpha);
}
`

export default function FloatingLiquidSurface({
  className = "",
  style,
  scale = 1.0,
  speed = 1.0,
  iridescence = 0.9,
  fluidity = 0.85,
}: FloatingLiquidSurfaceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    })

    if (!gl) return

    // Compile Shader helper
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertShader = createShader(gl.VERTEX_SHADER, VS)
    const fragShader = createShader(gl.FRAGMENT_SHADER, FS)
    if (!vertShader || !fragShader) return

    const program = gl.createProgram()!
    gl.attachShader(program, vertShader)
    gl.attachShader(program, fragShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program))
      return
    }

    // Full-screen Quad geometry
    const quadVertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ])

    const vao = gl.createVertexArray()
    gl.bindVertexArray(vao)

    const vbo = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

    // Uniform locations
    const uResolutionLoc = gl.getUniformLocation(program, "uResolution")
    const uTimeLoc = gl.getUniformLocation(program, "uTime")
    const uScaleLoc = gl.getUniformLocation(program, "uScale")
    const uIridescenceLoc = gl.getUniformLocation(program, "uIridescence")
    const uFluidityLoc = gl.getUniformLocation(program, "uFluidity")

    let startTime = performance.now()
    let isVisible = true

    const resize = () => {
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = canvas.clientWidth * dpr
      const height = canvas.clientHeight * dpr
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        gl.viewport(0, 0, width, height)
      }
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    })
    io.observe(canvas)

    const render = (now: number) => {
      if (!isVisible) {
        animFrameRef.current = requestAnimationFrame(render)
        return
      }

      const elapsed = ((now - startTime) / 1000) * speed

      gl.useProgram(program)
      gl.bindVertexArray(vao)

      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height)
      gl.uniform1f(uTimeLoc, elapsed)
      gl.uniform1f(uScaleLoc, scale)
      gl.uniform1f(uIridescenceLoc, iridescence)
      gl.uniform1f(uFluidityLoc, fluidity)

      gl.enable(gl.BLEND)
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

      gl.drawArrays(gl.TRIANGLES, 0, 6)

      animFrameRef.current = requestAnimationFrame(render)
    }

    animFrameRef.current = requestAnimationFrame(render)

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      ro.disconnect()
      io.disconnect()
      gl.deleteBuffer(vbo)
      gl.deleteVertexArray(vao)
      gl.deleteProgram(program)
      gl.deleteShader(vertShader)
      gl.deleteShader(fragShader)
    }
  }, [scale, speed, iridescence, fluidity])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block ${className}`}
      style={{
        ...style,
      }}
    />
  )
}
