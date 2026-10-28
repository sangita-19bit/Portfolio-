"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import * as THREE from "three"
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js"
import { createTerrain, getRoadHeight, getRoadSlope } from "./terrain"
import { createCar } from "./car"
import { createMilestoneMarkers } from "./markers"
import { CarPhysicsEngine } from "./controls"
import { CAMERA_CONFIG, CAR_PHYSICS, THEME_TOKENS, CURRENT_THEME, MILESTONES } from "./config"
import { Milestone } from "./types"
import Pedal from "./Pedal"
import SpeedometerGauge from "./SpeedometerGauge"
import ElevationTrack from "./ElevationTrack"
import MilestoneModal from "./MilestoneModal"
import { RotateCcw, ListFilter } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HillClimbExperienceProps {
  className?: string
  onSwitchToTimeline?: () => void
}

export default function HillClimbExperience({
  className = "",
  onSwitchToTimeline,
}: HillClimbExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<CarPhysicsEngine | null>(null)

  // Reactive UI state for HUD
  const [speed, setSpeed] = useState<number>(0)
  const [distance, setDistance] = useState<number>(0)
  const [isGasPressed, setIsGasPressed] = useState<boolean>(false)
  const [isBrakePressed, setIsBrakePressed] = useState<boolean>(false)
  const [activeModalMilestone, setActiveModalMilestone] = useState<Milestone | null>(null)
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true)

  // Tracking refs to eliminate unnecessary React re-renders in RAF loop
  const lastSpeedVal = useRef<number>(-1)
  const lastDistanceVal = useRef<number>(-1)

  // Initialize Physics Engine once
  if (!engineRef.current) {
    engineRef.current = new CarPhysicsEngine(0)
  }

  // Pedal event triggers
  const handleGasStart = useCallback(() => {
    engineRef.current?.setGas(true)
    setIsGasPressed(true)
  }, [])

  const handleGasEnd = useCallback(() => {
    engineRef.current?.setGas(false)
    setIsGasPressed(false)
  }, [])

  const handleBrakeStart = useCallback(() => {
    engineRef.current?.setBrake(true)
    setIsBrakePressed(true)
  }, [])

  const handleBrakeEnd = useCallback(() => {
    engineRef.current?.setBrake(false)
    setIsBrakePressed(false)
  }, [])

  const handleResetCar = useCallback(() => {
    engineRef.current?.setPosition(0)
  }, [])

  // ──────────────────────────────────────────────────────────────────────────
  // Three.js Scene Setup & Lifecycle
  // ──────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // WebGL support test
    try {
      const testCanvas = document.createElement("canvas")
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl")
      if (!gl) {
        setWebGLSupported(false)
        return
      }
    } catch {
      setWebGLSupported(false)
      return
    }

    const theme = THEME_TOKENS[CURRENT_THEME]
    const width = container.clientWidth
    const height = container.clientHeight || 580

    // 1. Scene & Light Theme Background / Fog
    const scene = new THREE.Scene()
    const fogColor = new THREE.Color(theme.fog)
    scene.background = fogColor
    scene.fog = new THREE.FogExp2(theme.fog, 0.009)

    // Gradient Sky Dome
    const skyGeo = new THREE.SphereGeometry(220, 32, 16)
    const skyMat = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(theme.skyTop) },
        bottomColor: { value: new THREE.Color(theme.skyBottom) },
        offset: { value: 10 },
        exponent: { value: 0.8 },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + offset).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
        }
      `,
      side: THREE.BackSide,
      depthWrite: false,
    })
    const skyMesh = new THREE.Mesh(skyGeo, skyMat)
    scene.add(skyMesh)

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(46, width / height, 0.5, 320)
    camera.position.set(CAMERA_CONFIG.offsetX, 6, CAMERA_CONFIG.offsetZ)

    // 3. WebGL Renderer (Optimized for High Refresh Rate and Low Fill-Rate Overhead)
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: false,
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    container.appendChild(renderer.domElement)

    // CSS2DRenderer for high-DPI crisp HTML milestone labels
    const labelRenderer = new CSS2DRenderer()
    labelRenderer.setSize(width, height)
    labelRenderer.domElement.style.position = "absolute"
    labelRenderer.domElement.style.top = "0px"
    labelRenderer.domElement.style.left = "0px"
    labelRenderer.domElement.style.pointerEvents = "none"
    labelRenderer.domElement.style.zIndex = "10"
    container.appendChild(labelRenderer.domElement)

    // 4. Clean Lighting
    const ambientLight = new THREE.AmbientLight(theme.ambientLight, 0.85)
    scene.add(ambientLight)

    const hemiLight = new THREE.HemisphereLight(theme.hemisphereSky, theme.hemisphereGround, 0.6)
    scene.add(hemiLight)

    const sunLight = new THREE.DirectionalLight(theme.sunLight, 1.8)
    sunLight.position.set(22, 38, 20)
    sunLight.castShadow = true
    sunLight.shadow.mapSize.width = 512
    sunLight.shadow.mapSize.height = 512
    sunLight.shadow.camera.near = 2
    sunLight.shadow.camera.far = 110
    const d = 16
    sunLight.shadow.camera.left = -d
    sunLight.shadow.camera.right = d
    sunLight.shadow.camera.top = d
    sunLight.shadow.camera.bottom = -d
    sunLight.shadow.bias = -0.0005
    scene.add(sunLight)

    // 5. Build Subsystems: Terrain, Car, and Milestone Markers
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const { terrainGroup, dispose: disposeTerrain } = createTerrain()
    scene.add(terrainGroup)

    const { carGroup, update: updateCar, dispose: disposeCar } = createCar(prefersReducedMotion)
    scene.add(carGroup)

    const {
      markersGroup,
      hitAreaMeshes: _hitAreas,
      update: updateMarkers,
      dispose: disposeMarkers,
    } = createMilestoneMarkers(MILESTONES, prefersReducedMotion)
    scene.add(markersGroup)

    // 6. Connect Keyboard Listeners & Sync Pedal States
    const physicsEngine = engineRef.current!
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase()
      if (tag === "input" || tag === "textarea") return

      if (e.code === "ArrowRight" || e.code === "KeyD") {
        physicsEngine.setGas(true)
        setIsGasPressed(true)
        e.preventDefault()
      } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
        physicsEngine.setBrake(true)
        setIsBrakePressed(true)
        e.preventDefault()
      }
    }

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowRight" || e.code === "KeyD") {
        physicsEngine.setGas(false)
        setIsGasPressed(false)
      } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
        physicsEngine.setBrake(false)
        setIsBrakePressed(false)
      }
    }

    window.addEventListener("keydown", onKeyDown, { passive: false })
    window.addEventListener("keyup", onKeyUp)

    // 7. Motion & Chase Camera Tracking (Frame-Rate Independent)
    const targetLookAt = new THREE.Vector3()
    const currentLookAt = new THREE.Vector3(0, 2, 0)

    const clock = new THREE.Clock()
    let animationFrameId: number
    let lastUiUpdate = 0
    let lastDistanceUiUpdate = 0
    let isVisible = true

    // Off-screen pause optimization via IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting
          if (isVisible) clock.start()
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(container)

    // Main Render & Physics Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      if (!isVisible) return

      // Clamped delta time prevents teleporting/spikes on micro frame drops
      const rawDt = clock.getDelta()
      const dt = Math.max(0.001, Math.min(rawDt, 0.04))

      // Physics Simulation Step with sub-stepping (smooth monotonic progress every frame)
      const {
        x,
        speed: currentSpeed,
        deltaDistance,
        acceleration,
        throttle,
        brake,
        isReversing,
      } = physicsEngine.update(dt)

      // Update Car Ground Alignment, Wheel Rotations, Weight Transfer & Dust Puffs
      updateCar({
        x,
        deltaDistance,
        speed: currentSpeed,
        acceleration,
        throttle,
        brake,
        isReversing,
        dt,
      })

      // Update 3D Milestone Markers & CSS2D Label Visibility / Fade
      updateMarkers(x, dt)

      // Move Sky Dome with Car
      skyMesh.position.x = x

      // ──────────────────────────────────────────────────────────────────────
      // Polished Chase Camera: Frame-Rate Independent Axis-Decoupled Smoothing
      // Tight horizontal tracking keeps car anchored; smooth vertical damping absorbs hills.
      // ──────────────────────────────────────────────────────────────────────
      const posXAlpha = 1 - Math.exp(-(prefersReducedMotion ? 6.5 : 11.5) * dt)
      const posYAlpha = 1 - Math.exp(-(prefersReducedMotion ? 4.5 : 7.2) * dt)
      const posZAlpha = 1 - Math.exp(-6.5 * dt)
      const lookAlpha = 1 - Math.exp(-(prefersReducedMotion ? 4.0 : 7.5) * dt)

      // 1. Dynamic Look-ahead based on forward speed (stable under reverse)
      const forwardSpeed = Math.max(0, currentSpeed)
      const speedRatio = Math.min(1, forwardSpeed / CAR_PHYSICS.maxSpeed)
      const forwardLookAhead = 6.5 + speedRatio * 5.0

      targetLookAt.set(
        x + forwardLookAhead,
        getRoadHeight(x + forwardLookAhead) + 1.2,
        0
      )
      currentLookAt.lerp(targetLookAt, lookAlpha)
      camera.lookAt(currentLookAt)

      // 2. Dynamic FOV Widening with Velocity (throttled projection update)
      const baseFov = 46
      const targetFov = prefersReducedMotion ? baseFov : baseFov + speedRatio * 4.0
      const fovAlpha = 1 - Math.exp(-4.0 * dt)
      if (Math.abs(camera.fov - targetFov) > 0.18) {
        camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, fovAlpha)
        camera.updateProjectionMatrix()
      }

      // 3. Steep Climb Camera Framing
      const { pitch } = getRoadSlope(x)
      const climbBonus = Math.max(0, pitch) * 5.0

      // 4. Chase Camera Position Calculation
      const carY = getRoadHeight(x)
      const targetX = x + CAMERA_CONFIG.offsetX - climbBonus * 0.8
      const terrainYAtCam = getRoadHeight(targetX)
      const safeTargetY = Math.max(
        carY + CAMERA_CONFIG.offsetY + climbBonus * 0.6,
        terrainYAtCam + 3.0
      )
      const targetZ = CAMERA_CONFIG.offsetZ + climbBonus * 0.5

      // Smooth axis-specific lerp: no hard clipping snaps
      camera.position.x += (targetX - camera.position.x) * posXAlpha
      camera.position.y += (safeTargetY - camera.position.y) * posYAlpha
      camera.position.z += (targetZ - camera.position.z) * posZAlpha

      // Move Sunlight along with car to maintain local crisp shadows
      sunLight.position.set(x + 18, carY + 34, 18)
      sunLight.target.position.set(x, carY, 0)
      sunLight.target.updateMatrixWorld()

      // Throttle React HUD state updates: only trigger re-render when values actually change
      const now = performance.now()
      if (now - lastUiUpdate > 75) {
        const roundedSpeed = Math.round(Math.abs(currentSpeed) * 3.6)
        if (roundedSpeed !== lastSpeedVal.current) {
          lastSpeedVal.current = roundedSpeed
          setSpeed(roundedSpeed)
        }
        if (now - lastDistanceUiUpdate > 120 && Math.abs(x - lastDistanceVal.current) > 0.8) {
          lastDistanceVal.current = x
          setDistance(x)
          lastDistanceUiUpdate = now
        }
        lastUiUpdate = now
      }

      renderer.render(scene, camera)
      labelRenderer.render(scene, camera)
    }

    animate()

    // 8. Resize Observer Handling
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight || 580
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      labelRenderer.setSize(w, h)
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

    // 9. Teardown & Full Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      observer.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("keyup", onKeyUp)

      disposeTerrain()
      disposeCar()
      disposeMarkers()

      skyGeo.dispose()
      skyMat.dispose()
      sunLight.dispose()
      ambientLight.dispose()
      hemiLight.dispose()

      renderer.dispose()
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
      if (labelRenderer.domElement && labelRenderer.domElement.parentNode) {
        labelRenderer.domElement.parentNode.removeChild(labelRenderer.domElement)
      }
    }
  }, [])

  if (!webGLSupported) {
    return (
      <div className="w-full p-8 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-black/10 dark:border-white/10 text-zinc-800 dark:text-neutral-200 shadow-md">
        <p className="font-mono text-sm font-semibold">WebGL is not supported on this device/browser.</p>
        <p className="text-xs text-neutral-500 mt-2">Displaying accessible milestone archive below.</p>
        {onSwitchToTimeline && (
          <Button onClick={onSwitchToTimeline} variant="outline" className="mt-4 font-mono text-xs">
            Open Accessible Timeline
          </Button>
        )}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[540px] sm:h-[640px] lg:h-[700px] bg-[#f8fafc] dark:bg-[#0a0a0c] overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 select-none shadow-xl ${className}`}
    >
      {/* ──────────────────────────────────────────────────────────────────
          HUD Top: Milestone Elevation Profile Track & Header Actions
          ────────────────────────────────────────────────────────────────── */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-col pointer-events-none">
        <div className="flex items-start justify-between gap-2">
          {/* Top Left: Quick Actions */}
          <div className="pointer-events-auto flex items-center gap-1.5 shrink-0 pt-0.5">
            {onSwitchToTimeline && (
              <Button
                variant="outline"
                size="sm"
                onClick={onSwitchToTimeline}
                className="bg-white/80 hover:bg-white dark:bg-zinc-900/80 text-zinc-800 dark:text-neutral-200 border-black/10 dark:border-white/10 font-mono text-xs rounded-xl shadow-xs backdrop-blur-sm h-8 px-2.5"
              >
                <ListFilter className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                <span className="hidden sm:inline">Timeline</span>
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={handleResetCar}
              title="Reset vehicle to start line"
              className="bg-white/80 hover:bg-white dark:bg-zinc-900/80 text-zinc-800 dark:text-neutral-200 border-black/10 dark:border-white/10 font-mono text-xs rounded-xl shadow-xs backdrop-blur-sm h-8 px-2.5"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:mr-1" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          </div>

          {/* Top Center: Thin Elevation Profile Track & Editorial Milestone Heading */}
          <div className="pointer-events-auto flex-1 flex justify-center max-w-lg mx-auto">
            <ElevationTrack
              currentDistance={distance}
              onMilestoneClick={(m) => setActiveModalMilestone(m)}
            />
          </div>

          {/* Top Right Spacer to keep ElevationTrack centered */}
          <div className="w-16 sm:w-24 shrink-0 pointer-events-none" />
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────
          HUD Bottom Bar: Corner Pedals + Center Speedometer Dial
          [ BRAKE (Left) ] ──── [ Speedometer (Center) ] ──── [ GAS (Right) ]
          No overlap on any screen size (tested down to 360px mobile)!
          ────────────────────────────────────────────────────────────────── */}
      <div className="absolute bottom-3 sm:bottom-5 left-0 right-0 z-30 px-3 sm:px-6 md:px-8 flex items-end justify-between pointer-events-none">
        {/* LEFT: BRAKE PEDAL */}
        <div className="pointer-events-auto shrink-0">
          <Pedal
            type="brake"
            isPressed={isBrakePressed}
            onPressStart={handleBrakeStart}
            onPressEnd={handleBrakeEnd}
          />
        </div>

        {/* CENTER: COMPACT CIRCULAR SPEEDOMETER */}
        <div className="pointer-events-auto shrink-0 mb-1">
          <SpeedometerGauge speed={speed} />
        </div>

        {/* RIGHT: GAS PEDAL */}
        <div className="pointer-events-auto shrink-0">
          <Pedal
            type="gas"
            isPressed={isGasPressed}
            onPressStart={handleGasStart}
            onPressEnd={handleGasEnd}
          />
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────
          Interactive Milestone Modal Card
          ────────────────────────────────────────────────────────────────── */}
      <MilestoneModal
        milestone={activeModalMilestone}
        onClose={() => setActiveModalMilestone(null)}
      />
    </div>
  )
}
