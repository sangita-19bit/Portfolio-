import { PHYSICS_CONFIG, ROAD_CONFIG } from "./config"
import { getRoadSlope } from "./terrain"
import { InputState, CarState } from "./types"

export class CarPhysicsEngine {
  private state: CarState = {
    x: 0,
    speed: 0,
    pitch: 0,
    wheelAngle: 0,
  }

  private inputs: InputState = {
    gas: false,
    brake: false,
  }

  // Smooth input ramping states (0 to 1)
  private currentThrottle: number = 0
  private currentBrake: number = 0

  // Dynamic state telemetry
  private currentAcceleration: number = 0
  private isReversing: boolean = false

  private readonly minX: number = 0
  private readonly maxX: number = ROAD_CONFIG.length

  constructor(startX: number = 0) {
    this.state.x = startX
  }

  public setGas(active: boolean) {
    this.inputs.gas = active
  }

  public setBrake(active: boolean) {
    this.inputs.brake = active
  }

  public getInputs(): InputState {
    return { ...this.inputs }
  }

  public getState(): CarState {
    return { ...this.state }
  }

  public getAcceleration(): number {
    return this.currentAcceleration
  }

  public getThrottleLevel(): number {
    return this.currentThrottle
  }

  public getBrakeLevel(): number {
    return this.currentBrake
  }

  public getIsReversing(): boolean {
    return this.isReversing
  }

  public setPosition(x: number) {
    this.state.x = Math.max(this.minX, Math.min(this.maxX, x))
    this.state.speed = 0
    this.currentThrottle = 0
    this.currentBrake = 0
    this.currentAcceleration = 0
  }

  /**
   * Fixed-timestep physics simulation step with smooth input ramping,
   * quadratic aerodynamic drag, rolling resistance, slope gravity, and soft boundary springs.
   */
  public update(frameDt: number): {
    x: number
    speed: number
    deltaDistance: number
    acceleration: number
    throttle: number
    brake: number
    isReversing: boolean
  } {
    // Clamp frame dt to prevent simulation explosion on tab unfocus or frame spike
    const clampedDt = Math.max(0.001, Math.min(frameDt, 0.04))

    // Sub-step physics so every render frame receives smooth, continuous, non-jittered movement
    // at any refresh rate (60Hz, 120Hz, 144Hz, 240Hz, or variable mobile fps)
    const subSteps = Math.max(1, Math.min(3, Math.ceil(clampedDt / (1 / 120))))
    const subDt = clampedDt / subSteps

    const prevX = this.state.x

    for (let i = 0; i < subSteps; i++) {
      this.stepFixedPhysics(subDt)
    }

    const deltaDistance = this.state.x - prevX

    return {
      x: this.state.x,
      speed: this.state.speed,
      deltaDistance,
      acceleration: this.currentAcceleration,
      throttle: this.currentThrottle,
      brake: this.currentBrake,
      isReversing: this.isReversing,
    }
  }

  /**
   * Internal sub-step for 120Hz deterministic simulation
   */
  private stepFixedPhysics(dt: number) {
    const {
      mass,
      engineForce,
      brakeForce,
      reverseForce,
      maxSpeed,
      maxReverseSpeed,
      dragCoefficient,
      rollingResistance,
      gravityConstant,
      throttleAttackTime,
      throttleReleaseTime,
      brakeAttackTime,
      brakeReleaseTime,
      boundarySpringK,
      boundaryDampingK,
    } = PHYSICS_CONFIG

    // 1. Smoothly ramp throttle input (attack/release)
    if (this.inputs.gas) {
      this.currentThrottle = Math.min(1, this.currentThrottle + dt / throttleAttackTime)
    } else {
      this.currentThrottle = Math.max(0, this.currentThrottle - dt / throttleReleaseTime)
    }

    // 2. Smoothly ramp brake input (attack/release)
    if (this.inputs.brake) {
      this.currentBrake = Math.min(1, this.currentBrake + dt / brakeAttackTime)
    } else {
      this.currentBrake = Math.max(0, this.currentBrake - dt / brakeReleaseTime)
    }

    // 3. Slope gravity force along the road incline (theta)
    const { pitch } = getRoadSlope(this.state.x)
    this.state.pitch = pitch
    // Force along incline: -m * g * sin(theta)
    const slopeGravityForce = -mass * gravityConstant * Math.sin(pitch)

    // 4. Drive & Brake forces (Hill Climb Racing logic)
    let driveForce = 0

    // Forward drive from throttle
    if (this.currentThrottle > 0.001) {
      driveForce += engineForce * this.currentThrottle
    }

    // Brake / Reverse behavior
    if (this.currentBrake > 0.001) {
      if (this.state.speed > 0.25) {
        // Forward braking: opposes forward motion
        driveForce -= brakeForce * this.currentBrake
        this.isReversing = false
      } else {
        // Reverse drive: accelerate backwards once stopped
        driveForce -= reverseForce * this.currentBrake
        this.isReversing = true
      }
    } else {
      if (this.state.speed >= -0.1) {
        this.isReversing = false
      }
    }

    // 5. Resistive forces: quadratic air drag and rolling friction
    const currentV = this.state.speed
    const airDragForce = -dragCoefficient * currentV * Math.abs(currentV)

    let rollingForce = 0
    if (Math.abs(currentV) > 0.02) {
      rollingForce = -rollingResistance * Math.sign(currentV)
    } else if (Math.abs(driveForce + slopeGravityForce) < rollingResistance) {
      // Static friction prevents creeping on subtle slopes when at rest
      rollingForce = -(driveForce + slopeGravityForce)
    }

    // 6. Soft boundary spring limits at road start and end
    let boundaryForce = 0
    if (this.state.x < this.minX) {
      const penetration = this.minX - this.state.x
      boundaryForce = penetration * boundarySpringK - currentV * boundaryDampingK
    } else if (this.state.x > this.maxX) {
      const penetration = this.maxX - this.state.x
      boundaryForce = penetration * boundarySpringK - currentV * boundaryDampingK
    }

    // 7. Total net force and acceleration
    const totalForce = driveForce + slopeGravityForce + airDragForce + rollingForce + boundaryForce
    this.currentAcceleration = totalForce / mass

    // Integrate velocity
    this.state.speed += this.currentAcceleration * dt

    // Clamp speed limits
    this.state.speed = Math.max(-maxReverseSpeed, Math.min(maxSpeed, this.state.speed))

    // Integrate position
    this.state.x += this.state.speed * dt
  }
}

/**
 * Attaches keyboard listeners for Left/Right and A/D keys
 */
export function setupKeyboardControls(engine: CarPhysicsEngine): () => void {
  const onKeyDown = (e: KeyboardEvent) => {
    const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase()
    if (targetTag === "input" || targetTag === "textarea") return

    if (e.code === "ArrowRight" || e.code === "KeyD") {
      engine.setGas(true)
      e.preventDefault()
    } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
      engine.setBrake(true)
      e.preventDefault()
    }
  }

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.code === "ArrowRight" || e.code === "KeyD") {
      engine.setGas(false)
    } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
      engine.setBrake(false)
    }
  }

  window.addEventListener("keydown", onKeyDown, { passive: false })
  window.addEventListener("keyup", onKeyUp)

  return () => {
    window.removeEventListener("keydown", onKeyDown)
    window.removeEventListener("keyup", onKeyUp)
  }
}
