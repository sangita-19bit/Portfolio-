import * as THREE from "three"
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js"
import { Milestone } from "./types"
import { ROAD_CONFIG } from "./config"
import { DEFAULT_MARKER_STYLE } from "./milestones"
import { getRoadHeight } from "./terrain"

export interface MilestoneMarkersController {
  markersGroup: THREE.Group
  hitAreaMeshes: THREE.Mesh[]
  update: (carX: number, dt: number) => void
  dispose: () => void
}

/**
 * Creates circular droplet texture with saturated emerald-cyan tones
 * and slightly darker core for clear visibility on bright light-theme skies.
 */
function createDropletTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas")
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext("2d")!

  const gradient = ctx.createRadialGradient(32, 32, 2, 32, 32, 28)
  gradient.addColorStop(0, "rgba(4, 120, 87, 0.95)") // Saturated emerald core
  gradient.addColorStop(0.35, "rgba(16, 185, 129, 0.9)") // Vibrant emerald
  gradient.addColorStop(0.75, "rgba(2, 132, 199, 0.8)") // Saturated deep cyan / blue
  gradient.addColorStop(1, "rgba(2, 132, 199, 0.0)") // Soft outer fade

  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(32, 32, 28, 0, Math.PI * 2)
  ctx.fill()

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

interface FountainParticleSystem {
  points: THREE.Points
  positions: Float32Array
  velocities: Float32Array
  lifespans: Float32Array
  maxLifespans: Float32Array
  spoutY: number
  count: number
  geometry: THREE.BufferGeometry
  material: THREE.PointsMaterial
}

/**
 * Creates pooled fountain particle system
 */
function createFountainParticles(
  dropletTexture: THREE.CanvasTexture,
  dropletColorHex: number
): FountainParticleSystem {
  const count = 110
  const positions = new Float32Array(count * 3)
  const velocities = new Float32Array(count * 3)
  const lifespans = new Float32Array(count)
  const maxLifespans = new Float32Array(count)
  const spoutY = 0.95

  for (let i = 0; i < count; i++) {
    // Initial random life phase so fountain erupts smoothly without bursts
    const maxLife = 1.0 + Math.random() * 0.6
    maxLifespans[i] = maxLife
    lifespans[i] = Math.random() * maxLife

    // Random radial eruption velocity
    const angle = Math.random() * Math.PI * 2
    const radialSpeed = 0.25 + Math.random() * 0.55
    const upwardSpeed = 3.2 + Math.random() * 1.8

    velocities[i * 3 + 0] = Math.cos(angle) * radialSpeed
    velocities[i * 3 + 1] = upwardSpeed
    velocities[i * 3 + 2] = Math.sin(angle) * radialSpeed

    // Initial position along trajectory
    const progress = lifespans[i]
    positions[i * 3 + 0] = velocities[i * 3 + 0] * progress
    positions[i * 3 + 1] = spoutY + velocities[i * 3 + 1] * progress - 0.5 * 5.8 * progress * progress
    positions[i * 3 + 2] = velocities[i * 3 + 2] * progress
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

  const material = new THREE.PointsMaterial({
    size: 0.38,
    map: dropletTexture,
    transparent: true,
    opacity: 0.9,
    blending: THREE.NormalBlending, // Normal blending reads vividly against bright backgrounds
    depthWrite: false,
    color: dropletColorHex,
  })

  const points = new THREE.Points(geometry, material)
  points.frustumCulled = false

  return {
    points,
    positions,
    velocities,
    lifespans,
    maxLifespans,
    spoutY,
    count,
    geometry,
    material,
  }
}

/**
 * Builds all 3D milestone markers along the road with CSS2D crisp labels
 * and invisible raycasting hit-areas.
 */
export function createMilestoneMarkers(
  milestones: Milestone[],
  reducedMotion: boolean = false
): MilestoneMarkersController {
  const markersGroup = new THREE.Group()
  markersGroup.name = "MilestoneMarkersGroup"

  const hitAreaMeshes: THREE.Mesh[] = []
  const dropletTexture = createDropletTexture()
  const fountains: {
    system: FountainParticleSystem
    worldX: number
  }[] = []

  const labelElements: {
    element: HTMLElement
    worldX: number
  }[] = []

  const disposables: { dispose: () => void }[] = [dropletTexture]

  // Shared Materials
  const stoneMat = new THREE.MeshStandardMaterial({
    color: 0x475569, // Slate stone
    roughness: 0.85,
    metalness: 0.1,
    flatShading: true,
  })
  disposables.push(stoneMat)

  const waterPoolMat = new THREE.MeshStandardMaterial({
    color: 0x059669,
    emissive: 0x047857,
    emissiveIntensity: 0.5,
    roughness: 0.2,
  })
  disposables.push(waterPoolMat)

  const goldTrimMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.8,
    roughness: 0.2,
  })
  disposables.push(goldTrimMat)

  // Shared Geometries
  const basinBaseGeo = new THREE.CylinderGeometry(1.25, 1.45, 0.45, 8)
  const basinWallGeo = new THREE.CylinderGeometry(1.2, 1.25, 0.55, 8)
  const waterGeo = new THREE.CircleGeometry(1.05, 8)
  waterGeo.rotateX(-Math.PI / 2)
  const spoutGeo = new THREE.CylinderGeometry(0.18, 0.24, 0.85, 6)
  disposables.push(basinBaseGeo, basinWallGeo, waterGeo, spoutGeo)

  // Pillar Geometries
  const pillarGeo = new THREE.BoxGeometry(0.7, 2.8, 0.7)
  const pillarRingGeo = new THREE.BoxGeometry(0.78, 0.15, 0.78)
  disposables.push(pillarGeo, pillarRingGeo)

  // Signpost Geometries
  const postPoleGeo = new THREE.CylinderGeometry(0.1, 0.12, 3.2, 8)
  const boardGeo = new THREE.BoxGeometry(1.6, 0.45, 0.08)
  disposables.push(postPoleGeo, boardGeo)

  // Invisible Hit-Area Geometry (for raycasting detection)
  const hitAreaGeo = new THREE.CylinderGeometry(1.6, 1.6, 4.2, 8)
  const hitAreaMat = new THREE.MeshBasicMaterial({ visible: false })
  disposables.push(hitAreaGeo, hitAreaMat)

  // Roadside positioning parameters
  // Road width = 5.5, so road shoulder is at |Z| = 2.75. Place markers on the far shoulder (Z = -4.75)
  // so the car never collides with them and the 3/4 chase camera has an unobstructed view.
  const roadsideZ = -ROAD_CONFIG.width / 2 - 2.0

  // ──────────────────────────────────────────────────────────────────────────
  // Instantiate each milestone marker along the road
  // ──────────────────────────────────────────────────────────────────────────
  milestones.forEach((milestone) => {
    const x = milestone.distance
    const groundY = getRoadHeight(x)
    const style = milestone.markerStyle || DEFAULT_MARKER_STYLE

    const markerGroup = new THREE.Group()
    markerGroup.name = `Marker_${milestone.id}`
    markerGroup.position.set(x, groundY, roadsideZ)
    // Angle marker slightly towards the chase camera
    markerGroup.rotation.y = 0.32

    // ──────────────────────────────────────────────────────────────────────
    // 1. Marker Visual Meshes (Fountain, Pillar, or Signpost)
    // ──────────────────────────────────────────────────────────────────────
    if (style === "fountain") {
      // Pedestal base & outer basin
      const basinBase = new THREE.Mesh(basinBaseGeo, stoneMat)
      basinBase.position.y = 0.22
      basinBase.castShadow = true

      const basinWall = new THREE.Mesh(basinWallGeo, stoneMat)
      basinWall.position.y = 0.55
      basinWall.castShadow = true

      // Translucent reflective water pool
      const water = new THREE.Mesh(waterGeo, waterPoolMat)
      water.position.y = 0.76

      // Central spout column
      const spout = new THREE.Mesh(spoutGeo, goldTrimMat)
      spout.position.y = 0.55

      markerGroup.add(basinBase, basinWall, water, spout)

      // Erupting Particle Fountain
      const colorHex = milestone.color ? parseInt(milestone.color.replace("#", ""), 16) : 0x10b981
      const fountain = createFountainParticles(dropletTexture, colorHex)
      markerGroup.add(fountain.points)

      fountains.push({
        system: fountain,
        worldX: x,
      })
      disposables.push(fountain.geometry, fountain.material)
    } else if (style === "pillar") {
      // Monolith Pillar
      const base = new THREE.Mesh(basinBaseGeo, stoneMat)
      base.position.y = 0.22
      base.castShadow = true

      const pillarMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.6,
        roughness: 0.3,
        flatShading: true,
      })
      disposables.push(pillarMat)

      const pillar = new THREE.Mesh(pillarGeo, pillarMat)
      pillar.position.y = 1.6
      pillar.castShadow = true

      const ringColor = milestone.color ? parseInt(milestone.color.replace("#", ""), 16) : 0x10b981
      const ringMat = new THREE.MeshStandardMaterial({
        color: ringColor,
        emissive: ringColor,
        emissiveIntensity: 0.7,
      })
      disposables.push(ringMat)

      const ring1 = new THREE.Mesh(pillarRingGeo, ringMat)
      ring1.position.y = 1.4
      const ring2 = new THREE.Mesh(pillarRingGeo, ringMat)
      ring2.position.y = 2.4

      markerGroup.add(base, pillar, ring1, ring2)
    } else {
      // Signpost
      const base = new THREE.Mesh(basinBaseGeo, stoneMat)
      base.position.y = 0.15
      base.scale.set(0.6, 0.6, 0.6)

      const pole = new THREE.Mesh(postPoleGeo, stoneMat)
      pole.position.y = 1.6
      pole.castShadow = true

      const signMat = new THREE.MeshStandardMaterial({
        color: 0x334155,
        roughness: 0.6,
      })
      disposables.push(signMat)

      const sign1 = new THREE.Mesh(boardGeo, signMat)
      sign1.position.set(0.4, 2.4, 0)
      sign1.rotation.y = 0.15
      sign1.castShadow = true

      markerGroup.add(base, pole, sign1)
    }

    // ──────────────────────────────────────────────────────────────────────
    // 2. Invisible Hit-Area Mesh (for Stage 3 Raycasting)
    // ──────────────────────────────────────────────────────────────────────
    const hitArea = new THREE.Mesh(hitAreaGeo, hitAreaMat)
    hitArea.position.y = 2.0
    hitArea.name = `HitArea_${milestone.id}`
    hitArea.userData = { milestone, markerId: milestone.id }
    markerGroup.add(hitArea)
    hitAreaMeshes.push(hitArea)

    // ──────────────────────────────────────────────────────────────────────
    // 3. CSS2D Crisp HTML Label
    // ──────────────────────────────────────────────────────────────────────
    const labelDiv = document.createElement("div")
    labelDiv.className =
      "pointer-events-none select-none flex flex-col items-center px-3 py-1.5 rounded-xl bg-white/95 dark:bg-zinc-950/95 border border-black/15 dark:border-white/15 shadow-md backdrop-blur-sm transition-opacity duration-200"
    labelDiv.style.opacity = "0"
    labelDiv.style.visibility = "hidden"

    labelDiv.innerHTML = `
      <div class="flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full" style="background-color: ${milestone.color || "#10b981"}"></span>
        <span class="text-[10px] font-mono font-bold tracking-wider text-emerald-700 dark:text-emerald-400 uppercase">${milestone.year}</span>
      </div>
      <span class="text-xs font-serif font-medium text-zinc-900 dark:text-white whitespace-nowrap mt-0.5">${milestone.title}</span>
    `

    const label2D = new CSS2DObject(labelDiv)
    label2D.position.set(0, 3.4, 0)
    markerGroup.add(label2D)

    labelElements.push({
      element: labelDiv,
      worldX: x,
    })

    markersGroup.add(markerGroup)
  })

  // ──────────────────────────────────────────────────────────────────────────
  // Animation and Proximity Culling Update Loop
  // ──────────────────────────────────────────────────────────────────────────
  const gravity = 5.8
  const maxLabelDistance = 55

  const update = (carX: number, dt: number) => {
    // 1. Update Labels Fade-In based on distance to car
    labelElements.forEach(({ element, worldX }) => {
      const dist = Math.abs(carX - worldX)
      if (dist > maxLabelDistance) {
        element.style.opacity = "0"
        element.style.visibility = "hidden"
      } else {
        element.style.visibility = "visible"
        const opacity = Math.min(1, Math.max(0, (maxLabelDistance - dist) / 18))
        element.style.opacity = opacity.toFixed(2)
      }
    })

    // If reduced motion is requested, freeze particle physics for accessibility
    if (reducedMotion) return

    // 2. Update Fountain Particle Physics (Capped to visible markers within 65 units)
    fountains.forEach(({ system, worldX }) => {
      if (Math.abs(carX - worldX) > 65) return

      const { positions, velocities, lifespans, maxLifespans, count, spoutY, geometry } = system

      for (let i = 0; i < count; i++) {
        lifespans[i] += dt

        if (lifespans[i] >= maxLifespans[i] || positions[i * 3 + 1] < 0.6) {
          // Recycle droplet back to spout
          lifespans[i] = 0
          maxLifespans[i] = 1.0 + Math.random() * 0.6

          const angle = Math.random() * Math.PI * 2
          const radialSpeed = 0.25 + Math.random() * 0.55
          const upwardSpeed = 3.2 + Math.random() * 1.8

          velocities[i * 3 + 0] = Math.cos(angle) * radialSpeed
          velocities[i * 3 + 1] = upwardSpeed
          velocities[i * 3 + 2] = Math.sin(angle) * radialSpeed

          positions[i * 3 + 0] = 0
          positions[i * 3 + 1] = spoutY
          positions[i * 3 + 2] = 0
        } else {
          // Physics integration: dy/dt = v, dv/dt = -g
          velocities[i * 3 + 1] -= gravity * dt

          positions[i * 3 + 0] += velocities[i * 3 + 0] * dt
          positions[i * 3 + 1] += velocities[i * 3 + 1] * dt
          positions[i * 3 + 2] += velocities[i * 3 + 2] * dt
        }
      }

      geometry.attributes.position.needsUpdate = true
    })
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Disposal
  // ──────────────────────────────────────────────────────────────────────────
  const dispose = () => {
    disposables.forEach((item) => item.dispose())
    labelElements.forEach(({ element }) => {
      if (element.parentNode) element.parentNode.removeChild(element)
    })
  }

  return { markersGroup, hitAreaMeshes, update, dispose }
}
