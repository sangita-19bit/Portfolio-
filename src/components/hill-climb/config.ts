import { RoadConfig, CarPhysicsConfig } from "./types"
export { MILESTONES, DEFAULT_MARKER_STYLE } from "./milestones"

export interface ThemeColors {
  skyTop: number
  skyBottom: number
  fog: number
  terrain: number
  terrainSecondary: number
  road: number
  roadMarking: number
  curbLeft: number
  curbRight: number
  treeTrunk: number
  treeFoliage1: number
  treeFoliage2: number
  rock: number
  archPost: number
  ambientLight: number
  sunLight: number
  hemisphereSky: number
  hemisphereGround: number
}

export const THEME_TOKENS: {
  light: ThemeColors
  dark: ThemeColors
} = {
  light: {
    skyTop: 0x93c5fd, // Crisp sky blue
    skyBottom: 0xf8fafc, // Bright atmospheric horizon
    fog: 0xe2e8f0, // Soft light haze matching horizon
    terrain: 0xe2e8f0, // Clean light stone / sand hills
    terrainSecondary: 0xcbd5e1, // Distant subtle contour
    road: 0x27272a, // Charcoal asphalt
    roadMarking: 0xffffff, // Crisp white dashed line
    curbLeft: 0x10b981, // Emerald accent line
    curbRight: 0x06b6d4, // Cyan accent line
    treeTrunk: 0x78716c, // Warm stone bark
    treeFoliage1: 0x059669, // Rich emerald green
    treeFoliage2: 0x10b981, // Bright emerald foliage
    rock: 0x94a3b8, // Slate rocks
    archPost: 0x475569, // Slate metal structure
    ambientLight: 0xffffff,
    sunLight: 0xfffaed, // Warm sunlight
    hemisphereSky: 0xbae6fd, // Soft sky glow
    hemisphereGround: 0xf1f5f9, // Ground bounce
  },
  dark: {
    skyTop: 0x09090b,
    skyBottom: 0x18181b,
    fog: 0x09090b,
    terrain: 0x18181b,
    terrainSecondary: 0x0f172a,
    road: 0x121215,
    roadMarking: 0xe4e4e7,
    curbLeft: 0x10b981,
    curbRight: 0x06b6d4,
    treeTrunk: 0x27272a,
    treeFoliage1: 0x064e3b,
    treeFoliage2: 0x047857,
    rock: 0x3f3f46,
    archPost: 0x27272a,
    ambientLight: 0xffffff,
    sunLight: 0xffffff,
    hemisphereSky: 0x38bdf8,
    hemisphereGround: 0x18181b,
  },
}

export const CURRENT_THEME: "light" | "dark" = "light"

export const ROAD_CONFIG: RoadConfig = {
  length: 800,
  width: 5.5,
  segments: 1400,
  baseHeight: 0,
  hillAmplitude1: 3.5,
  hillFreq1: 0.024,
  hillAmplitude2: 1.8,
  hillFreq2: 0.055,
  hillAmplitude3: 1.2,
  hillFreq3: 0.012,
  startPlateauLength: 20,
  endPlateauLength: 25,
}

export const PHYSICS_CONFIG = {
  mass: 1.15,
  engineForce: 42,
  brakeForce: 52,
  reverseForce: 24,
  maxSpeed: 28, // Fast top forward speed
  maxReverseSpeed: 11, // Controlled reverse speed
  dragCoefficient: 0.038, // Quadratic air drag
  rollingResistance: 2.2, // Linear ground resistance
  gravityConstant: 9.8, // Gravity component along hill slope
  throttleAttackTime: 0.14, // Seconds to reach full throttle
  throttleReleaseTime: 0.22, // Seconds for throttle to decay
  brakeAttackTime: 0.12, // Seconds to reach full braking
  brakeReleaseTime: 0.18, // Seconds for brake to decay
  boundarySpringK: 95, // Soft boundary spring pushback
  boundaryDampingK: 16, // Boundary damper
}

export const CAR_PHYSICS: CarPhysicsConfig = {
  maxSpeed: PHYSICS_CONFIG.maxSpeed,
  reverseMaxSpeed: PHYSICS_CONFIG.maxReverseSpeed,
  acceleration: 28,
  brakeForce: 36,
  friction: 6.5,
}

export const CAR_CONFIG = {
  // Optional external glTF / GLB model path (drop model in public/models/car.glb)
  modelPath: "/models/car.glb",
  useExternalModelIfAvailable: true,
  scale: 1.0,
  wheelRadius: 0.42,
  wheelBase: 0.95,
  trackWidth: 0.85,
  suspensionStiffness: 45,
  suspensionDamping: 6,
}

export const CAMERA_CONFIG = {
  offsetX: -10,
  offsetY: 6.5,
  offsetZ: 13,
  lookAheadX: 7,
  lookAheadY: 1.5,
  lookAheadZ: 0,
  lerpFactor: 0.08,
}
