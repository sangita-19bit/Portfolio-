export interface Milestone {
  id: string
  title: string
  subtitle: string
  year: string
  category: string
  description: string
  distance: number // World X position along the road
  tags: string[]
  badge?: string
  link?: string
  image?: string
  color?: string
  markerStyle?: "fountain" | "pillar" | "signpost"
}

export interface RoadConfig {
  length: number // Total road length in world units (X axis)
  width: number // Road width (Z axis)
  segments: number // Number of road cross-sections along X
  baseHeight: number
  hillAmplitude1: number
  hillFreq1: number
  hillAmplitude2: number
  hillFreq2: number
  hillAmplitude3: number
  hillFreq3: number
  startPlateauLength: number
  endPlateauLength: number
}

export interface CarPhysicsConfig {
  maxSpeed: number // Units per second forward
  reverseMaxSpeed: number // Units per second backward
  acceleration: number // Units per second squared
  brakeForce: number // Braking deceleration
  friction: number // Rolling resistance / air drag
}

export interface CarState {
  x: number // Current position along X
  speed: number // Current velocity along X
  pitch: number // Pitch angle in radians
  wheelAngle: number // Current rotation angle of wheels
}

export interface InputState {
  gas: boolean
  brake: boolean
}
