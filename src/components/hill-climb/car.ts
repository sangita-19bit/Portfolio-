import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"
import { getRoadHeight, getRoadSlope } from "./terrain"
import { CAR_CONFIG } from "./config"

export interface CarTelemetry {
  x: number
  deltaDistance: number
  speed: number
  acceleration: number
  throttle: number
  brake: number
  isReversing: boolean
  dt: number
}

export interface CarController {
  carGroup: THREE.Group
  update: (telemetry: CarTelemetry) => void
  dispose: () => void
}

/**
 * Creates soft radial blob shadow beneath the vehicle
 */
function createBlobShadow(): { shadowMesh: THREE.Mesh; dispose: () => void } {
  const canvas = document.createElement("canvas")
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext("2d")!

  const gradient = ctx.createRadialGradient(64, 64, 10, 64, 64, 60)
  gradient.addColorStop(0, "rgba(0, 0, 0, 0.55)")
  gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.22)")
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 128, 128)

  const texture = new THREE.CanvasTexture(canvas)
  const shadowGeo = new THREE.PlaneGeometry(3.6, 2.0)
  shadowGeo.rotateX(-Math.PI / 2)

  const shadowMat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.82,
    depthWrite: false,
  })

  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat)
  shadowMesh.name = "CarBlobShadow"

  const dispose = () => {
    shadowGeo.dispose()
    shadowMat.dispose()
    texture.dispose()
  }

  return { shadowMesh, dispose }
}

/**
 * Creates pooled dust puff particle system behind the rear wheels.
 * Uses normal blending with soft sandy-charcoal particles for high visibility on light background.
 */
function createExhaustDustPool(): {
  dustGroup: THREE.Group
  emitPuff: (x: number, y: number, z: number, carSpeed: number) => void
  update: (dt: number) => void
  dispose: () => void
} {
  const dustGroup = new THREE.Group()
  const poolSize = 60
  const positions = new Float32Array(poolSize * 3)
  const scales = new Float32Array(poolSize)
  const lifespans = new Float32Array(poolSize)
  const maxLifespans = new Float32Array(poolSize)
  const velocities = new Float32Array(poolSize * 3)

  let nextIndex = 0

  // Canvas circular soft dust texture
  const canvas = document.createElement("canvas")
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext("2d")!
  const gradient = ctx.createRadialGradient(16, 16, 2, 16, 16, 14)
  gradient.addColorStop(0, "rgba(100, 116, 139, 0.8)") // Soft slate gray dust
  gradient.addColorStop(0.6, "rgba(148, 163, 184, 0.4)")
  gradient.addColorStop(1, "rgba(203, 213, 225, 0.0)")
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(16, 16, 14, 0, Math.PI * 2)
  ctx.fill()

  const texture = new THREE.CanvasTexture(canvas)
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

  const material = new THREE.PointsMaterial({
    size: 0.85,
    map: texture,
    transparent: true,
    opacity: 0.65,
    blending: THREE.NormalBlending,
    depthWrite: false,
  })

  const points = new THREE.Points(geometry, material)
  points.frustumCulled = false
  dustGroup.add(points)

  const emitPuff = (originX: number, originY: number, originZ: number, carSpeed: number) => {
    const idx = nextIndex
    nextIndex = (nextIndex + 1) % poolSize

    lifespans[idx] = 0.001
    maxLifespans[idx] = 0.45 + Math.random() * 0.3
    scales[idx] = 0.4 + Math.random() * 0.4

    // Eject backwards relative to car motion
    positions[idx * 3 + 0] = originX - 0.2 + (Math.random() - 0.5) * 0.3
    positions[idx * 3 + 1] = originY + 0.15 + Math.random() * 0.2
    positions[idx * 3 + 2] = originZ + (Math.random() - 0.5) * 0.4

    velocities[idx * 3 + 0] = -Math.sign(carSpeed) * (1.2 + Math.random() * 2.0)
    velocities[idx * 3 + 1] = 0.8 + Math.random() * 1.2
    velocities[idx * 3 + 2] = (Math.random() - 0.5) * 0.8
  }

  const update = (dt: number) => {
    let hasActive = false
    for (let i = 0; i < poolSize; i++) {
      if (lifespans[i] > 0) {
        lifespans[i] += dt
        if (lifespans[i] >= maxLifespans[i]) {
          lifespans[i] = 0
          positions[i * 3 + 1] = -999 // Hide
        } else {
          hasActive = true
          positions[i * 3 + 0] += velocities[i * 3 + 0] * dt
          positions[i * 3 + 1] += velocities[i * 3 + 1] * dt
          positions[i * 3 + 2] += velocities[i * 3 + 2] * dt
          velocities[i * 3 + 1] -= 2.0 * dt // Upward drag decay
        }
      }
    }
    if (hasActive) {
      geometry.attributes.position.needsUpdate = true
    }
  }

  const dispose = () => {
    geometry.dispose()
    material.dispose()
    texture.dispose()
  }

  return { dustGroup, emitPuff, update, dispose }
}

/**
 * Procedural low-poly sports buggy with vivid orange body,
 * motion-blur wheel spoke disc, brake lights, and reverse lights.
 */
function buildProceduralCar(): {
  bodyGroup: THREE.Group
  wheelNodes: THREE.Group[]
  spokeGroups: THREE.Group[]
  blurDiscs: THREE.Mesh[]
  taillightMat: THREE.MeshStandardMaterial
  reversingLightMat: THREE.MeshStandardMaterial
  disposables: { dispose: () => void }[]
} {
  const bodyGroup = new THREE.Group()
  const disposables: { dispose: () => void }[] = []
  const wheelNodes: THREE.Group[] = []
  const spokeGroups: THREE.Group[] = []
  const blurDiscs: THREE.Mesh[] = []

  // Vivid Orange body paint for maximum contrast against charcoal asphalt
  const paintMat = new THREE.MeshStandardMaterial({
    color: 0xea580c, // Vivid energetic orange
    metalness: 0.5,
    roughness: 0.25,
    flatShading: true,
  })
  disposables.push(paintMat)

  // Titanium dark trim
  const trimMat = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    metalness: 0.8,
    roughness: 0.3,
    flatShading: true,
  })
  disposables.push(trimMat)

  // Cyan & Emerald accent highlights
  const cyanMat = new THREE.MeshStandardMaterial({
    color: 0x06b6d4,
    emissive: 0x0891b2,
    emissiveIntensity: 0.5,
    metalness: 0.6,
    roughness: 0.2,
  })
  disposables.push(cyanMat)

  // Reflective tinted cockpit glass
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    metalness: 0.9,
    roughness: 0.1,
    transparent: true,
    opacity: 0.6,
  })
  disposables.push(glassMat)

  // Tire rubber
  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x27272a,
    roughness: 0.85,
    metalness: 0.1,
    flatShading: true,
  })
  disposables.push(tireMat)

  // Wheel silver rim
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    metalness: 0.95,
    roughness: 0.15,
  })
  disposables.push(rimMat)

  // Motion blur disc material
  const blurDiscMat = new THREE.MeshBasicMaterial({
    color: 0xe2e8f0,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  })
  disposables.push(blurDiscMat)

  // Taillight material (dynamically brightens on brake)
  const taillightMat = new THREE.MeshStandardMaterial({
    color: 0xf43f5e,
    emissive: 0xe11d48,
    emissiveIntensity: 1.4,
  })
  disposables.push(taillightMat)

  // Reversing lights material (glows white when reversing)
  const reversingLightMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 0,
  })
  disposables.push(reversingLightMat)

  // 1. Lower chassis
  const chassisGeo = new THREE.BoxGeometry(2.8, 0.45, 1.4)
  const chassis = new THREE.Mesh(chassisGeo, paintMat)
  chassis.position.y = 0.5
  chassis.castShadow = true
  bodyGroup.add(chassis)
  disposables.push(chassisGeo)

  // Aerodynamic nose hood
  const noseGeo = new THREE.CylinderGeometry(0.5, 0.7, 0.8, 6)
  noseGeo.rotateZ(Math.PI / 2)
  const nose = new THREE.Mesh(noseGeo, paintMat)
  nose.position.set(1.4, 0.46, 0)
  nose.castShadow = true
  bodyGroup.add(nose)
  disposables.push(noseGeo)

  // Side rocker skirts
  const skirtGeo = new THREE.BoxGeometry(2.3, 0.12, 1.48)
  const skirt = new THREE.Mesh(skirtGeo, trimMat)
  skirt.position.y = 0.34
  bodyGroup.add(skirt)
  disposables.push(skirtGeo)

  // 2. Cockpit Canopy
  const cabinGeo = new THREE.BoxGeometry(1.4, 0.56, 1.1)
  const cabin = new THREE.Mesh(cabinGeo, glassMat)
  cabin.position.set(-0.15, 0.9, 0)
  cabin.castShadow = true
  bodyGroup.add(cabin)
  disposables.push(cabinGeo)

  // Roof cap
  const roofGeo = new THREE.BoxGeometry(1.15, 0.08, 1.05)
  const roof = new THREE.Mesh(roofGeo, trimMat)
  roof.position.set(-0.15, 1.2, 0)
  bodyGroup.add(roof)
  disposables.push(roofGeo)

  // 3. Rear Spoiler
  const wingGeo = new THREE.BoxGeometry(0.35, 0.06, 1.35)
  const wing = new THREE.Mesh(wingGeo, cyanMat)
  wing.position.set(-1.3, 1.05, 0)
  wing.rotation.z = -0.12

  const strutGeo = new THREE.BoxGeometry(0.08, 0.32, 0.08)
  const strutL = new THREE.Mesh(strutGeo, trimMat)
  strutL.position.set(-1.26, 0.88, -0.45)
  const strutR = new THREE.Mesh(strutGeo, trimMat)
  strutR.position.set(-1.26, 0.88, 0.45)
  bodyGroup.add(wing, strutL, strutR)
  disposables.push(wingGeo, strutGeo)

  // 4. Front Headlights
  const lightGeo = new THREE.BoxGeometry(0.12, 0.12, 0.28)
  const headMat = new THREE.MeshStandardMaterial({
    color: 0xfef08a,
    emissive: 0xfef08a,
    emissiveIntensity: 1.8,
  })
  disposables.push(lightGeo, headMat)

  const headL = new THREE.Mesh(lightGeo, headMat)
  headL.position.set(1.5, 0.55, -0.48)
  const headR = new THREE.Mesh(lightGeo, headMat)
  headR.position.set(1.5, 0.55, 0.48)
  bodyGroup.add(headL, headR)

  const headLight = new THREE.PointLight(0xfef08a, 1.2, 16, 1.5)
  headLight.position.set(2.2, 0.7, 0)
  bodyGroup.add(headLight)

  // 5. Rear Taillights & Reversing Lights
  const tailGeo = new THREE.BoxGeometry(0.08, 0.1, 0.32)
  const tailL = new THREE.Mesh(tailGeo, taillightMat)
  tailL.position.set(-1.43, 0.6, -0.48)
  const tailR = new THREE.Mesh(tailGeo, taillightMat)
  tailR.position.set(-1.43, 0.6, 0.48)
  bodyGroup.add(tailL, tailR)
  disposables.push(tailGeo)

  const revLightGeo = new THREE.BoxGeometry(0.08, 0.08, 0.18)
  const revL = new THREE.Mesh(revLightGeo, reversingLightMat)
  revL.position.set(-1.43, 0.46, -0.48)
  const revR = new THREE.Mesh(revLightGeo, reversingLightMat)
  revR.position.set(-1.43, 0.46, 0.48)
  bodyGroup.add(revL, revR)
  disposables.push(revLightGeo)

  // 6. Detailed 4-Wheel Assemblies with Motion-Blur Discs
  const wheelRadius = CAR_CONFIG.wheelRadius
  const wheelWidth = 0.32

  const tireGeo = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelWidth, 18)
  tireGeo.rotateX(Math.PI / 2)
  disposables.push(tireGeo)

  const rimGeo = new THREE.CylinderGeometry(wheelRadius * 0.58, wheelRadius * 0.58, wheelWidth + 0.02, 10)
  rimGeo.rotateX(Math.PI / 2)
  disposables.push(rimGeo)

  const spokeGeo = new THREE.BoxGeometry(wheelRadius * 1.05, 0.06, wheelWidth + 0.03)
  disposables.push(spokeGeo)

  // Circular blur disc representing high-speed spinning spokes
  const discGeo = new THREE.CircleGeometry(wheelRadius * 0.55, 16)
  discGeo.rotateY(Math.PI / 2)
  disposables.push(discGeo)

  const createWheel = (isLeft: boolean) => {
    const wheelPivot = new THREE.Group()

    const tire = new THREE.Mesh(tireGeo, tireMat)
    tire.castShadow = true

    const rim = new THREE.Mesh(rimGeo, rimMat)

    const spokeGroup = new THREE.Group()
    const spoke1 = new THREE.Mesh(spokeGeo, rimMat)
    const spoke2 = new THREE.Mesh(spokeGeo, rimMat)
    spoke2.rotation.z = Math.PI / 2
    const spoke3 = new THREE.Mesh(spokeGeo, rimMat)
    spoke3.rotation.z = Math.PI / 4
    const spoke4 = new THREE.Mesh(spokeGeo, rimMat)
    spoke4.rotation.z = -Math.PI / 4
    spokeGroup.add(spoke1, spoke2, spoke3, spoke4)

    const blurDisc = new THREE.Mesh(discGeo, blurDiscMat)
    blurDisc.position.z = isLeft ? -0.16 : 0.16

    wheelPivot.add(tire, rim, spokeGroup, blurDisc)
    spokeGroups.push(spokeGroup)
    blurDiscs.push(blurDisc)

    return wheelPivot
  }

  const { wheelBase, trackWidth } = CAR_CONFIG
  const wheelFL = createWheel(true)
  const wheelFR = createWheel(false)
  const wheelRL = createWheel(true)
  const wheelRR = createWheel(false)

  wheelFL.position.set(wheelBase, wheelRadius, -trackWidth)
  wheelFR.position.set(wheelBase, wheelRadius, trackWidth)
  wheelRL.position.set(-wheelBase, wheelRadius, -trackWidth)
  wheelRR.position.set(-wheelBase, wheelRadius, trackWidth)

  wheelNodes.push(wheelFL, wheelFR, wheelRL, wheelRR)

  return {
    bodyGroup,
    wheelNodes,
    spokeGroups,
    blurDiscs,
    taillightMat,
    reversingLightMat,
    disposables,
  }
}

/**
 * Creates the complete Low-Poly Car Controller with vivid contrast,
 * motion-blur wheels, weight transfer pitch (squat/dive), suspension crest bounce,
 * engine vibration, rear wheel exhaust/dust puffs, and brake/reverse lights.
 */
export function createCar(prefersReducedMotion: boolean = false): CarController {
  const carGroup = new THREE.Group()
  carGroup.name = "HillClimbCar"

  // 1. Procedural car setup
  const {
    bodyGroup,
    wheelNodes,
    spokeGroups,
    blurDiscs,
    taillightMat,
    reversingLightMat,
    disposables,
  } = buildProceduralCar()

  const chassisSubgroup = new THREE.Group()
  chassisSubgroup.name = "ChassisSubgroup"
  chassisSubgroup.add(bodyGroup)

  carGroup.add(chassisSubgroup)
  wheelNodes.forEach((wheel) => carGroup.add(wheel))

  // 2. Soft blob shadow underneath car
  const { shadowMesh, dispose: disposeShadow } = createBlobShadow()
  carGroup.add(shadowMesh)

  // 3. Rear Wheel Dust / Exhaust Puff System
  const { dustGroup, emitPuff, update: updateDust, dispose: disposeDust } = createExhaustDustPool()
  carGroup.add(dustGroup)

  // 4. Optional external glTF (.glb) loader integration
  if (CAR_CONFIG.useExternalModelIfAvailable && CAR_CONFIG.modelPath) {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/")

    const loader = new GLTFLoader()
    loader.setDRACOLoader(dracoLoader)

    loader.load(
      CAR_CONFIG.modelPath,
      (gltf) => {
        const model = gltf.scene
        const bbox = new THREE.Box3().setFromObject(model)
        const size = new THREE.Vector3()
        bbox.getSize(size)
        const maxDim = Math.max(size.x, size.y, size.z)
        const scaleFactor = (3.2 / maxDim) * CAR_CONFIG.scale
        model.scale.set(scaleFactor, scaleFactor, scaleFactor)

        bbox.setFromObject(model)
        const center = new THREE.Vector3()
        bbox.getCenter(center)
        model.position.sub(center)
        model.position.y += bbox.max.y - bbox.min.y

        chassisSubgroup.clear()
        chassisSubgroup.add(model)
      },
      undefined,
      () => {
        // Fallback: file not provided, procedural car continues seamlessly
      }
    )
  }

  // 5. Dynamic State Tracking & Spring Physics
  let accumulatedWheelAngle = 0
  let currentPitchOffset = 0
  let currentPitchVelocity = 0
  let currentSuspensionY = 0
  let currentSuspensionVel = 0
  let engineVibrationTime = 0
  let dustTimer = 0

  const update = (telemetry: CarTelemetry) => {
    const { x, deltaDistance, speed, acceleration, throttle, brake, isReversing, dt } = telemetry

    // Exact ground elevation and slope
    const groundY = getRoadHeight(x)
    const { pitch } = getRoadSlope(x)

    // 1. Weight Transfer Simulation (Critically Damped Spring)
    // Pressing gas tilts front side UPWARDS (squat, pitch > 0)
    // Pressing brake tilts front side DOWNWARDS (nose dive, pitch < 0)
    const pedalTilt = (throttle * 0.065) - (brake * 0.08)
    const accelTilt = acceleration * 0.0028
    const targetPitchOffset = prefersReducedMotion
      ? 0
      : THREE.MathUtils.clamp(pedalTilt + accelTilt, -0.12, 0.12)

    const pitchSpringK = 52
    const pitchDampingK = 13
    const pitchForce = (targetPitchOffset - currentPitchOffset) * pitchSpringK
    currentPitchVelocity += (pitchForce - currentPitchVelocity * pitchDampingK) * dt
    currentPitchOffset += currentPitchVelocity * dt

    // 2. Suspension Bounce & Hill Crest Reaction
    // Road curvature (second derivative) causes compression in valleys and expansion at crests
    const dy1 = getRoadSlope(x - 0.5).slope
    const dy2 = getRoadSlope(x + 0.5).slope
    const roadCurvature = dy2 - dy1 // Negative on crests, positive in dips

    const targetSuspensionY = prefersReducedMotion
      ? 0
      : -roadCurvature * 0.12 * Math.min(1.5, Math.abs(speed) * 0.08)

    const suspSpringK = 55
    const suspDampingK = 14
    const suspForce = (targetSuspensionY - currentSuspensionY) * suspSpringK
    currentSuspensionVel += (suspForce - currentSuspensionVel * suspDampingK) * dt
    currentSuspensionY += currentSuspensionVel * dt

    // 3. Engine Vibration under Throttle
    engineVibrationTime += dt * 65
    const engineJitter =
      prefersReducedMotion || throttle < 0.05
        ? 0
        : Math.sin(engineVibrationTime) * 0.012 * throttle

    // 4. Ground Car to Road Surface
    carGroup.position.set(x, groundY, 0)
    carGroup.rotation.z = pitch

    // Apply combined suspension bounce, weight transfer pitch, and engine jitter
    chassisSubgroup.position.y = currentSuspensionY + engineJitter
    chassisSubgroup.rotation.z = currentPitchOffset

    // 5. Blob Shadow
    shadowMesh.position.set(0, 0.02, 0)
    shadowMesh.scale.set(1 + Math.abs(currentSuspensionY) * 2, 1, 1)

    // 6. Wheel Spin & High-Speed Motion Blur
    accumulatedWheelAngle -= deltaDistance / CAR_CONFIG.wheelRadius
    wheelNodes.forEach((wheel) => {
      wheel.rotation.z = accumulatedWheelAngle
    })

    const blurRatio = THREE.MathUtils.clamp((Math.abs(speed) - 12) / 10, 0, 0.75)
    spokeGroups.forEach((sg) => {
      sg.visible = blurRatio < 0.65
    })
    blurDiscs.forEach((disc) => {
      ;(disc.material as THREE.MeshBasicMaterial).opacity = blurRatio
    })

    // 7. Taillights & Reversing Lights Control
    if (brake > 0.08 && speed > 0.3) {
      taillightMat.emissiveIntensity = 3.6 // Bright brake lights
    } else {
      taillightMat.emissiveIntensity = 1.4
    }

    if (isReversing) {
      reversingLightMat.emissiveIntensity = 2.4 // Bright white reverse lights
    } else {
      reversingLightMat.emissiveIntensity = 0
    }

    // 8. Dust / Exhaust Puff Emission
    dustTimer += dt
    if (
      !prefersReducedMotion &&
      throttle > 0.25 &&
      Math.abs(speed) > 0.8 &&
      dustTimer > 0.065
    ) {
      dustTimer = 0
      // Emit puff behind both rear wheels
      emitPuff(-CAR_CONFIG.wheelBase - 0.2, 0.1, -CAR_CONFIG.trackWidth, speed)
      emitPuff(-CAR_CONFIG.wheelBase - 0.2, 0.1, CAR_CONFIG.trackWidth, speed)
    }
    updateDust(dt)
  }

  // Initial setup
  update({
    x: 0,
    deltaDistance: 0,
    speed: 0,
    acceleration: 0,
    throttle: 0,
    brake: 0,
    isReversing: false,
    dt: 0.016,
  })

  // 6. Cleanup
  const dispose = () => {
    disposeShadow()
    disposeDust()
    disposables.forEach((item) => item.dispose())
  }

  return { carGroup, update, dispose }
}
